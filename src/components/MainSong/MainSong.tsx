'use client'

import { getAllSongs } from "../../../api/songs";
import ItemListSong from "../ItemListSongs/ItemListSongs";

interface TypeProps {
    type: string;
}

export default function MainSong( { type }:TypeProps ) {
    return(
        <>
            {type === "songs" || type === undefined ? (
                <ItemListSong 
                    title="Músicas"
                    items={20}
                    itemsArray={getAllSongs}
                    path="/songs"
                    idPath="/song"
                />
            ) : (
                <></>
            )}
        </>
    )
}