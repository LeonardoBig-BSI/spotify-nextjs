"use client"

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useEffect, useState } from "react"
import { getAllArtists } from "../../../../api/artists";
import { useParams } from "next/navigation";
import SongList from "@/components/SongList/SongList";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { getAllSongs } from "../../../../api/songs";

interface ArtistProps {
    _id: string;
    name: string;
    banner: string;
}

interface SongProps {
    _id: string;
    image: string;
    name: string;
    duration: string;
    artist: string;
    audio: string;
}

export default function Artist() {
    const { id } = useParams() // obtendo o ID da URL
    const [artist, setArtist] = useState<ArtistProps | null>(null)

    const [song, setSong] = useState<SongProps[]>([])

    useEffect(() => {
        if(!id) {
            return console.log("ID not found")
        }

        const fetchArtist = async () => {
            try {
                // fecth artists
                const artists = await getAllArtists()
                const foundArtist = artists.find((data: ArtistProps) => data._id === id)

                setArtist(foundArtist || null)

                // fetch songs from artists
                const allSongs = await getAllSongs()
                if(foundArtist) {
                    const songsArtists = allSongs.filter((song: SongProps) => song.artist === foundArtist.name)
                    setSong(songsArtists)                    
                }
            }
            catch (error) {
                console.log("Error loading artists or songs: ", error)
            }
        }

        fetchArtist()

    }, [id])

    if (!artist) {
        return (
            <Stack
                sx={{
                    color: 'grey.500',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '90vh',
                }}
                spacing={2}
                direction="row"
            >
                <CircularProgress color="success" />
            </Stack>
        )
    }

    return (
        <div className="artist">
            <div className="artist__header" style={{
                backgroundImage: `linear-gradient(to bottom, var(--_shade), var(--_shade)), url(${artist.banner})`,
            }}
            >
                <h2 className="text-8xl font-bold max-[480px]:text-3xl max-[1280px]:text-[7.5vw] max-[1280px]:leading-[100%] max-w-full h-auto">
                    {artist.name}
                </h2>
            </div>

            <div className="artist__body">
                <h2 className="text-2xl font-bold">Populares</h2>
                {/* <SongList songsArtists={} /> */}

                <SongList songsArtists={song} />
            </div>

            <Link href={""}>
                <FontAwesomeIcon
                    className="single-item__icon single-item__icon--artist"
                    icon={faCirclePlay}
                />
            </Link>
        </div>
    )
}