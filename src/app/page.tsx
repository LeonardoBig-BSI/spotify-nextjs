import MainArtist from "./components/MainArtist";
import MainSong from "./components/MainSong";

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
