"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SingleItemArtist from "../SingleItemArtist/SingleItemArtist";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

interface ArtistProps {
    _id: string;
    image: string;
    name: string;
    banner: string;
}

interface TypeProps {
    title: string;
    items: number;
    itemsArray: () => Promise<ArtistProps[]>
    path: string;
    idPath: string;
}

export default function ItemListArtist({ title, items, itemsArray, path, idPath }:TypeProps) {
    const pathname = usePathname()
    console.log(pathname)

    const isHome = pathname === "/"
    const finalItems = isHome ? items : Infinity

    const [artists, setArtists] = useState<ArtistProps[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        itemsArray()
            .then((data) => {
                setArtists(data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(`Error loading artists: ${error}`)
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
                    height: '20vh'
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
                {artists
                    .filter((_currentValue, index) => index < finalItems)
                    .map((artist) => (
                        <SingleItemArtist
                            {...artist}
                            idPath={idPath}
                            key={artist._id}
                        />
                    ))}
            </div>
        </div>
    )
}