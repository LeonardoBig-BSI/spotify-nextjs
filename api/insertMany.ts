import { artistArray } from "../database/artists";
import { songsArray } from "../database/songs";
import { db } from "./connect";

async function insertData() {
    try {
        const newArrayArtist = artistArray.map(({ id, ...newArtistObj }) => newArtistObj); //This line of code deletes the id property since MongoDB already has a pre-existing _id.
        const newArraySong = songsArray.map(({ id, ...newSongObj }) => newSongObj); //This line of code deletes the id property since MongoDB already has a pre-existing _id.

        const responseArtist = await db.collection('artists').insertMany(newArrayArtist)
        console.log("Artists inserted:", responseArtist);

        const responseSong = await db.collection('songs').insertMany(newArraySong)
        console.log("Songs inserted:", responseSong);

    }
    catch(error) {
        console.error("Error inserting data:", error);
    }
}

insertData()
