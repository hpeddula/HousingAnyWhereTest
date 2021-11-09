export const GET_CHARACTERS = 'https://rickandmortyapi.com/api/character';

export const Columns = [{
    field: "id",
    hide: true,
},
{
    header: 'Image',
    field: 'image',
    width: 110
}, {
    header: 'Info',
    field: 'name',
    width: 120
}, {
    header: 'Origin',
    field: 'origin',
    width: 130
}, {
    header: 'Chapters',
    field: 'episode',
    width: 140
}]

export const HEADERS = ['IMAGE','META','LOCATION','EPISODES']