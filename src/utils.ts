import { CHARACTER, ORIGIN, RICK_MORTY_TYPE } from "./types";

export const getOriginInfo = async (origin: ORIGIN): Promise<Array<string>> => {
    const { name, url } = origin;
    // console.log('Got Origin URL', url, i + 1)
    if (url) {
        const originResponse = await fetch(url);
        const originUrlData = await originResponse.json();
        // console.log('Got Origin Data', originUrlData, i + 1)
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
    console.log('Final Names', finalNames)
    //  Promise.all(requests)
    // .then(responses => responses)
    // .then(responses => Promise.all(responses.map((r:any) => r.json())))
    // .then(episodeNames => episodes.push(episodeNames));
    // console.log('Episodes before returning',episodes)
    return finalNames.map((name => name.name))
}


export const formatResponse = async (response: CHARACTER[]): Promise<Promise<RICK_MORTY_TYPE>[]> => {
    console.log('Inside Format Response')
    return response.map(async ({ id,image, name, species, status, origin, episode }: CHARACTER) => {
        const originData = await getOriginInfo(origin)
        const names = await getEpisodeNames(episode)
        console.log('Data from Inside Origin Method', [...originData])
        return { image, meta: [name, species, status], originInfo: [...originData], episodes: names,expanded:false,id }
    })
}