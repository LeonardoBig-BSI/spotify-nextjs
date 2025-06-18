'use client'

import { getAllArtists } from "../../../api/artists";
import ItemListArtist from "../ItemListArtist/ItemListArtist";

interface TypeProps {
    type: string;
}

export default function MainArtist( { type }:TypeProps ) {
    return(
        // className="flex flex-1 m-0 mr-2.5 md-2.5 ml-2.5 py-5 bg-custom-gradient"
        <div className="m-0 mr-2.5 md-2.5 ml-2.5 py-5 bg-custom-gradient rounded-2xl max-w-[480px]:px-4 max-w-[480px]:py-3">
            {type === "artists" || type === undefined ? (
                <ItemListArtist 
                    title="Artistas"
                    items={10}
                    itemsArray={getAllArtists}
                    path="/artists"
                    idPath="/artist"
                />
            ) : (
                <></>
            )}
        </div>
    )
}