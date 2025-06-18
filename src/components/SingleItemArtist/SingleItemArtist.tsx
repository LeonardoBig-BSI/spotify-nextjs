import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

interface ArtistProps {
    _id: string;
    image: string;
    name: string;
    banner: string;
}

interface TypeProps extends ArtistProps {
    idPath: string;
}

export default function SingleItemArtist({ _id, image, name, idPath }:TypeProps) {
    return (
        <Link
            href={`${idPath}/${_id}`}
            className="single-item"
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
                    Artista
                </p>
            </div>
        </Link>
    )
}