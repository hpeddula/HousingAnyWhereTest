import { IconButtonProps } from '@mui/material/IconButton';
export type RICK_MORTY_TYPE = {
    image: string,
    meta: Array<string>,
    originInfo: Array<string>,
    episodes: Array<string>,
    expanded: boolean,
    id: number,
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

export interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

export type PAGINATION = {
    count: number,
    pages: number,
    next: string | null,
    prev: string | null,
    page:number
}