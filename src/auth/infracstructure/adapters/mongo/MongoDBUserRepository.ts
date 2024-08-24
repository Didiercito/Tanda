import { UserRepository } from "../../../domain/UserRepository";
import { User } from "../../../domain/User";
import { dbMongo } from "../../../../database/mongo/mongodb";
import { ObjectId } from "mongodb";

export class MongoUserRepository implements UserRepository {

    async getAll(): Promise<User[]> {
        const db = dbMongo.db; 
        const usersCollection = db.collection('users');

        try {
            const users = await usersCollection.find().toArray();
            return users.map(user => new User(
                user._id.toString(),
                user.names,
                user.lastnames,
                user.email,
                user.password,
                user.numberTelefonic,
                user.address,
                user.date_of_briath
            ));
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw error;
        }
    }

    async getById(id: string): Promise<User | null> {
        const db = dbMongo.db;
        const usersCollection = db.collection('users');

        try {
            const user = await usersCollection.findOne({ _id: new ObjectId(id) });
            if (user) {
                return new User(
                    user._id.toString(),
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
        }
    }

    async update(id: string, user: Partial<User>): Promise<User | null> {
        const db = dbMongo.db;
        const usersCollection = db.collection('users');

        try {
            const result = await usersCollection.updateOne(
                { _id: new ObjectId(id) },
                { $set: user }
            );
            if (result.modifiedCount > 0) {
                return this.getById(id); 
            }
            return null;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    }

    async delete(id: string): Promise<boolean> {
        const db = dbMongo.db;
        const usersCollection = db.collection('users');

        try {
            const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
            return result.deletedCount > 0;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    }

    async register(user: User): Promise<User | null> {
        const db = dbMongo.db
        const usersCollection = db.collection('users');

        try {
            const result = await usersCollection.insertOne({
                names: user.names,
                lastnames: user.lastnames,
                email: user.email,
                password: user.password,
                numberTelefonic: user.numberTelefonic,
                address: user.address,
                date_of_briath: user.date_of_briath
            });

            if (result.insertedId) {
                return this.getById(result.insertedId.toString());
            }
            return null;
        } catch (error) {
            console.error("Error registering user:", error);
            throw error;
        }
    }

    async login(email: string, password: string): Promise<User | null> {
        const db = dbMongo.db;
        const usersCollection = db.collection('users');

        try {
            const user = await usersCollection.findOne({ email, password });
            if (user) {
                return new User(
                    user._id.toString(),
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
            console.error("Error logging in user:", error);
            throw error;
        }
    }
}
