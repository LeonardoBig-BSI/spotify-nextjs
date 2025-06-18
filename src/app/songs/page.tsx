import MainSong from "../components/MainSong";


export default function Songs() {
    return(
        <div className="m-0 mr-2.5 md-2.5 ml-2.5 py-5 bg-custom-gradient rounded-2xl max-w-[480px]:px-4 max-w-[480px]:py-3">
            <MainSong type="songs" />
        </div>
    )
}