import { fetchFromAPI } from "./api"; 

export const getAllArtists = async () => {
    return fetchFromAPI("/artists")
}
