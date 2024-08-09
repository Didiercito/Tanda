import pool from "../../../../database/mysql/mysqlDB";
import { User } from "../../../domain/User";
import { UserRepository } from "../../../domain/UserRepository";

export class MySQLUserRepository implements UserRepository {

    async getAll(): Promise<User[]> {
        try {
            const [rows] = await pool.query('SELECT * FROM Users');
            return (rows as any[]).map((row: any) => new User(
                row.id,
                row.first_name,
                row.second_name,
                row.lastnames,
                row.age,
                row.email,
                row.phone_number,
                row.date_of_birth,
                row.role_id
            ));
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    async getById(id: any): Promise<User | null> {
        try {
            const [rows] = await pool.query('SELECT * FROM Users WHERE id = ?', [id]);
            if ((rows as any[]).length === 0) {
                return null;
            }

            const user = (rows as any[])[0];
            return new User(
                user.id,
                user.first_name,
                user.second_name,
                user.lastnames,
                user.age,
                user.email,
                user.phone_number,
                user.date_of_birth,
                user.role_id
            );
        } catch (error) {
            console.error('Error fetching user by id:', error);
            throw error;
        }
    }
}
