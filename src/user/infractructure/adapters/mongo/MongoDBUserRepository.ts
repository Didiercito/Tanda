import { dbMongo } from "../../../../database/mongo/mongodb";
import { ObjectId } from "mongodb";
import { User } from "../../../domain/User";
import { UserRepository } from "../../../domain/UserRepository";

export class MongoDBUserRepository implements UserRepository {

    async getAll(): Promise<User[]> {
        const collection = dbMongo.collection('Users');
        const users = await collection.find().toArray();

        return users.map(user => new User(
            user._id,
            user.first_name,
            user.second_name,
            user.lastnames,
            user.age,
            user.email,
            user.phone_number,
            user.date_of_birth,
            user.role_id
        ));
    }

    async getById(id: any): Promise<User | null> {
        const collection = dbMongo.collection('Users');
        const user = await collection.findOne({ _id: new ObjectId(id) });

        if (!user) {
            return null;
        }

        return new User(
            user._id, 
            user.first_name,
            user.second_name,
            user.lastnames,
            user.age,
            user.email,
            user.phone_number,
            user.date_of_birth,
            user.role_id
        );
    }
}
