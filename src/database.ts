import * as mongodb from 'mongodb';
import { Employee } from './employee';

export let employeesCollection: mongodb.Collection<Employee>;

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("meanStackProject");
    await applySchemaValidation(db);

    employeesCollection = db.collection<Employee>('employees');
}

async function applySchemaValidation(db: mongodb.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["name", "position", "level"],
            additionalProperties: false,
            properties: {
                _id: {},
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                position: {
                    bsonType: "string",
                    description: "'position' is required and is a string",
                },
                level: {
                    bsonType: "string",
                    description: "'level' is required and is one of 'junior', 'mid', and 'senior'",
                    enum: ["junior", "mid", "senior"]
                }
            }
        }
    };

    await db.command({
        collMod: 'employees',
        validator: jsonSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection('employees', { validator: jsonSchema });
        }
    });
}

// Export the find method for direct usage in other files
export async function findEmployees(filter: any) {
    try {
        const employees = await employeesCollection.find(filter).toArray();
        return employees;
    } catch (error) {
        console.error(error);
        throw error;
    }
}