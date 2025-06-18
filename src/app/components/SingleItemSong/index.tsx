import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
    idPath: string;
}

export default function SingleItemSong({ _id, image, name, artist, idPath }:TypeProps) {
    return (
        <Link
            href={`${idPath}/${_id}`}
            className="single-item "
        >
            <div className="single-item__div-image-button">
                <div className="single-item__div-image">
                    <img
                        src={image}
                        alt={`Imagem do Artista ${name}`}
                        className="single-item__image"
                    />
                </div>

                <FontAwesomeIcon
                    icon={faCirclePlay}
                    className="single-item__icon"
                />
            </div>

            <div className="flex flex-col gap-[5px]">
                <div className="single-item__2lines">
                    <p className="font-bold">{name}</p>
                </div>

                <p className="text-[13px]">
                    {artist}
                </p>
            </div>
        </Link>
    )
}