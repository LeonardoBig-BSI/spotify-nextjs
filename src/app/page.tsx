import MainArtist from "../components/MainArtist/MainArtist";
import MainSong from "../components/MainSong/MainSong";

const componentsToShow = [
  <MainArtist key="artists" type="artists" />,
  <MainSong key="songs" type="songs" />
]

export default function Home() {
  return (
    <>
      {componentsToShow}
    </>
  );
}
