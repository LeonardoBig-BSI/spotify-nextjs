"use client"

import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllSongs } from "../../../../api/songs";
import { getAllArtists } from "../../../../api/artists";
import Link from "next/link";
import PlayerSong from "@/components/PlayerSong/PlayerSong";

interface SongProps {
    _id: string;
    image: string;
    name: string;
    duration: string;
    artist: string;
    audio: string;
}

interface ArtistProps {
    _id: string;
    image: string;
    name: string;
    banner: string;
}

export default function Song() {
    const { id } = useParams()

    const [songs, setSongs] = useState<SongProps[]>([])
    const [currentSongs, setCurrentSongs] = useState<SongProps | null>(null);
    const [artists, setArtists] = useState<ArtistProps | null>(null)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) {
            return console.log("ID not found")
        }

        const fetchSongsAndArtists = async () => {
            try {
                // fetch al songs
                const allSongs = await getAllSongs()
                setSongs(allSongs)

                // Find the current song by ID
                const foundSong = allSongs.find((data: SongProps) => data._id === id)
                setCurrentSongs(foundSong || null)

                setLoading(false)
                // if the song is found, fetch the artist
                if (foundSong) {
                    const allArtist = await getAllArtists()
                    const foundArtist = allArtist.find((dataArtist: ArtistProps) => dataArtist.name === foundSong.artist)

                    setArtists(foundArtist || null)
                    setLoading(false)
                }
            }
            catch (error) {
                console.log("Error loading artists or songs: ", error)
            }
        }

        fetchSongsAndArtists()
    }, [id])

    // Generates random indexes for songs, if there are available songs
    const randomIndex = songs.length > 0 ? Math.floor(Math.random() * songs.length) : 0;
    const randomIndex2 = songs.length > 0 ? Math.floor(Math.random() * songs.length) : 0;

    const randomIdFromArtist = songs.length > 0 ? songs[randomIndex]._id : "";
    const randomId2FromArtist = songs.length > 0 ? songs[randomIndex2]._id : "";

    if (loading) {
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
        <div className="song">
            <div className="song__container">
                <div className="song__image-container">
                    <img src={currentSongs?.image} alt={`Music image: ${currentSongs?.name}`} />
                </div>
            </div>

            <div className="song__bar">
                <Link
                    href={`/artist/${artists?._id}`}
                    className="song__artist-image"
                >
                    <img
                        width={75}
                        height={75}
                        src={artists?.image}
                        alt={`Artist image: ${currentSongs?.artist}`}
                    />
                </Link>

                {/* Player */}
                  <PlayerSong
                    duration={currentSongs?.duration || ""}
                    randomIdFromArtist={randomIdFromArtist}
                    randomId2FromArtist={randomId2FromArtist}
                    audio={currentSongs?.audio || ""}
                />

                <div>
                    <p className="song__name">{currentSongs?.name}</p>
                    <p>{currentSongs?.artist}</p>
                </div>
            </div>
        </div>
    )
}