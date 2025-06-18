import Link from "next/link";

export default function Header() {
    return (
        <div className="flex justify-between items-center py-2 px-5">

            <Link href={"/"}>
                <img src="/spotify-logo.png" alt="" />
            </Link>

            <Link 
                href={"/"} 
                className="flex justify-between items-center px-1 hover:underline text-4xl font-montserrat font-bold"
            >
                <h1>Spotify</h1>
            </Link>
        </div>
    )

}