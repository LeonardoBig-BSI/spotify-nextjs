import { useState } from "react";
import SongItem from "../SongItem/page";

interface SongProps {
    _id: string;
    image: string;
    name: string;
    duration: string;
    artist: string;
    audio: string;
}

interface SongsArtistsProps {
    songsArtists: SongProps[];  // Espera um array de músicas
}

export default function SongList({ songsArtists }:SongsArtistsProps) {
    const [items, setItems] = useState(5)

    return(
        <div className="max-[480px]:grid-template-columns: 1fr;">
            {songsArtists
                .filter((_currentValue, index) => index < items)
                .map((currentObj, index) => (
                    <SongItem
                        { ...currentObj }
                        index={index}
                        key={index}
                    />
                ))
            }

            <p
                className="song-list__see-more"
                onClick={() => {
                    setItems(items + 5)
                }}
            >
                Ver mais
            </p>
        </div>
    )
}