import { CHARACTER, ORIGIN, RICK_MORTY_TYPE } from "./types";

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

export const getEpisodeNames = async (episodeInfo: Array<string>): Promise<Array<string>> => {
    let requests = episodeInfo.map((url: string) => fetch(url))
    const episodeNames = await Promise.all(requests);
    const names = (await Promise.all(episodeNames)).map(response => response.json())
    const finalNames = await Promise.all(names)
    return finalNames.map((name => name.name))
}


export const formatResponse = async (response: CHARACTER[]): Promise<Promise<RICK_MORTY_TYPE>[]> => {
    return response.map(async ({ id,image, name, species, status, origin, episode }: CHARACTER) => {
        const originData = await getOriginInfo(origin)
        const names = await getEpisodeNames(episode)
        return { image, meta: [name, species, status], originInfo: [...originData], episodes: names,expanded:false,id }
    })
}