"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SingleItemSong from "../SingleItemSong/SingleItemSong";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

interface SongProps {
    _id: string;
    image: string;
    name: string;
    duration: string;
    artist: string;
    audio: string;
}

interface TypeProps {
    title: string;
    items: number;
    itemsArray: () => Promise<SongProps[]>
    path: string;
    idPath: string;
}

export default function ItemListSong({ title, items, itemsArray, path, idPath }:TypeProps) {
    const pathname = usePathname()
    console.log(pathname)

    const isHome = pathname === "/"
    const finalItems = isHome ? items : Infinity

    const [songs, setSongs] = useState<SongProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        itemsArray()
            .then((data) => {
                setSongs(data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(`Error loading songs: ${error}`)
                setLoading(false)
            })
    }, [itemsArray])

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
        <div className="flex flex-col g-2.5 max-w-[480px]:gap-5">
            <div className="flex justify-between items-center leading-[1.3] px-4 max-w-[480px]:flex-col gap-2.5">
                <h2 className="font-bold text-2xl">{title} populares</h2>

                {isHome && (
                    <Link href={path} className="ml-auto flex flex-col g-2.5 px-4 hover:underline">
                        Mostrar tudo
                    </Link>
                )}

            </div>

            <div className="grid grid-cols-[repeat(auto-fit,_minmax(172px,_1fr))]">
                {songs
                    .filter((_currentValue, index) => index < finalItems)
                    .map((song) => (
                        <SingleItemSong
                            {...song}
                            idPath={idPath}
                            key={song._id}
                        />
                    ))}
            </div>
        </div>
    )
}