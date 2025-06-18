import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import { db } from './connect';

const app = express()
// const PORT = 3001

app.use(cors())
dotenv.config()

app.get("/",(_request, response) => {
    response.send({
        data: "Server online!"
    })
     .json()
})

app.get("/artists", async (_request, response) => {
    response.send(await db.collection('artists').find({}).toArray())
})

app.get("/songs", async (_request, response) => {
    response.send(await db.collection('songs').find({}).toArray())
})

app.listen(process.env.PORT, () => {
    console.log(`Server online on port ${process.env.PORT}!`)
})