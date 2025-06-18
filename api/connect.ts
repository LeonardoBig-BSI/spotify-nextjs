import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';

dotenv.config()

const URI = process.env.DATABASE_URL

if(!URI) {
    throw new Error(`'DATABASE_URL' não definida. Por favor, verifique seu arquivo .env`)
}

const client = new MongoClient(URI)

export const db = client.db("project-spotify")
