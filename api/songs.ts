import { fetchFromAPI } from "./api";

export const getAllSongs = async () => {
    return fetchFromAPI("/songs")
}