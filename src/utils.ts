import { CHARACTER, ORIGIN, RICK_MORTY_TYPE } from "./types";

/**
 * Author : Harsha Peddula ,Date: 9-11-2021
 * @param origin 
 * @returns 
 * Name of the character if url is present
 * else returns the dimensions,type and resident count
 */
export const getOriginInfo = async (origin: ORIGIN): Promise<Array<string>> => {
    const { name, url } = origin;
    if (url) {
        const originResponse = await fetch(url);
        const originUrlData = await originResponse.json();
        const { dimension, type, residents } = originUrlData;
        return [name, dimension, type, `Resident Count : ${residents?.length}`]
    } else {
        return [name]
    }
}

/**
 * Author : Harsha Peddula ,Date: 9-11-2021
 * @param episodeInfo 
 * @returns 
 * Names of the episode the character is invloved in
 */
export const getEpisodeNames = async (episodeInfo: Array<string>): Promise<Array<string>> => {
    let requests = episodeInfo.map((url: string) => fetch(url))
    const episodeNames = await Promise.all(requests);
    const names = (await Promise.all(episodeNames)).map(response => response.json())
    const finalNames = await Promise.all(names)
    return finalNames.map((name => name.name))
}

/**
 * Author : Harsha Peddula ,Date: 9-11-2021
 * @param response 
 * @returns 
 * object of type RICK_MORTY_TYPE, which is rendered on the UI
 */
export const formatResponse = async (response: CHARACTER[]): Promise<Promise<RICK_MORTY_TYPE>[]> => {
    return response.map(async ({ id,image, name, species, status, origin, episode }: CHARACTER) => {
        const originData = await getOriginInfo(origin)
        const names = await getEpisodeNames(episode)
        return { image, meta: [name, species, status], originInfo: [...originData], episodes: names,expanded:false,id }
    })
}