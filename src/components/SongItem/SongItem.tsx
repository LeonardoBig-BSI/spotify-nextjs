import Link from "next/link";

interface SongProps {
    _id: string;
    image: string;
    name: string;
    duration: string;
    artist: string;
    audio: string;
}

interface TypeProps extends SongProps {
    index: number
}

export default function SongItem({ _id, image, name, duration, artist, audio, index }:TypeProps) {
    return(
        <Link href={`/song/${_id}`} className="song-item">
            <div className="flex items-center gap-[25px]">
                <p>{index + 1}</p>

                <div className="flex items-center gap-2.5">
                    <img 
                        src={image} 
                        alt={`Song Image: ${name}`}
                        className="song-item__image"
                     />

                     <p className="hover:underline">{name}</p>
                </div>
            </div>

            <p>{duration}</p>
        </Link>
    )
}