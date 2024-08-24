import { UserRepository } from "../../../domain/UserRepository";
import { User } from "../../../domain/User";
import { dbMySQL } from "../../../../database/mysql/mysqlDB";
import { RowDataPacket, ResultSetHeader } from "mysql2/promise";
import bcrypt from 'bcrypt';

export class MySQLUserRepository implements UserRepository {

    async getAll(): Promise<User[]> {
        const connection = await dbMySQL();
        try {
            const query = 'SELECT * FROM users';
            const [rows] = await connection.execute<RowDataPacket[]>(query);
            const users = rows.map(user => new User(
                user.id,
                user.names,
                user.lastnames,
                user.email,
                user.password,
                user.numberTelefonic,
                user.address,
                user.date_of_briath
            ));

            return users;
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        } finally {
            connection.end();
        }
    }

    async getById(id: string): Promise<User | null> {
        const connection = await dbMySQL();
        try {
            const [rows] = await connection.execute<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [id]);
            if (rows.length > 0) {
                const user = rows[0];
                return new User(
                    user.id,
                    user.names,
                    user.lastnames,
                    user.email,
                    user.password,
                    user.numberTelefonic,
                    user.address,
                    user.date_of_briath
                );
            }
            return null;
        } catch (error) {
            console.error("Error fetching user by ID:", error);
            throw error;
        } finally {
            connection.end();
        }
    }

    async update(id: string, user: Partial<User>): Promise<User | null> {
        const connection = await dbMySQL();
        try {
            const [result] = await connection.execute<ResultSetHeader>("UPDATE users SET ? WHERE id = ?", [user, id]);
            if (result.affectedRows > 0) {
                return this.getById(id); 
            }
            return null;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        } finally {
            connection.end();
        }
    }

    async register(user: User): Promise<User | null> {
        const connection = await dbMySQL();
        try {
            // Reemplaza valores undefined con null
            const userData = {
                names: user.names ?? null,
                lastnames: user.lastnames ?? null,
                email: user.email ?? null,
                password: user.password ?? null,
                numberTelefonic: user.numberTelefonic ?? null,
                address: user.address ?? null,
                date_of_briath: user.date_of_briath ?? null
            };
    
            const [result] = await connection.execute<ResultSetHeader>(
                "INSERT INTO users (names, lastnames, email, password, numberTelefonic, address, date_of_briath) VALUES (?, ?, ?, ?, ?, ?, ?)", 
                [
                    userData.names,
                    userData.lastnames,
                    userData.email,
                    userData.password,
                    userData.numberTelefonic,
                    userData.address,
                    userData.date_of_briath
                ]
            );
    
            if (result.insertId) {
                return this.getById(result.insertId.toString());
            }
            return null;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        } finally {
            connection.end(); 
        }
    }
    

    
    async delete(id: string): Promise<boolean> {
        const connection = await dbMySQL();
        try {
            const [result] = await connection.execute<ResultSetHeader>("DELETE FROM users WHERE id = ?", [id]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        } finally {
            connection.end();
        }
    }

    async login(email: string, password: string): Promise<User | null> {
        const connection = await dbMySQL();
        try {
            const sql = 'SELECT * FROM users WHERE email = ?';
            const [rows] = await connection.execute<RowDataPacket[]>(sql, [email]);
            const users = rows as RowDataPacket[];
    
            if (users.length === 0) {
                return null;
            }
    
            const user = users[0];
            return new User(
                user.id,
                user.names,
                user.lastnames,
                user.email,
                user.password,
                user.numberTelefonic,
                user.address, 
                user.date_of_birth 
            );
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        } finally {
            connection.end();
        }
    }
    


}

