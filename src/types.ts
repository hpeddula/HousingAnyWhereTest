export type RICK_MORTY_TYPE = {
    image: string,
    meta: Array<string>,
    originInfo: Array<string>,
    episodes: Array<string>,
    [x: string]: Array<string> | string
}

export type CHARACTER = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: ORIGIN,
    location: {},
    image: string,
    episode: Array<string>,
    url: string,
    created: string
}

export type ORIGIN = {
    name: string,
    url: string
}