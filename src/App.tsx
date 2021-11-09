import React, { useState, useEffect } from 'react';
import './App.scss';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { GET_CHARACTERS } from './constants';
import { formatResponse } from './utils';
import { RICK_MORTY_TYPE } from './types';
import Header from './Header';
// import { DataGrid } from '@mui/x-data-grid';
// import Container from '@mui/material/Container';


const getRenderElement = (key: string, characterInfo: RICK_MORTY_TYPE): string | JSX.Element | string[] => {
  return key === 'image' ? <img src={characterInfo[key] as string} alt="rickandmorty" /> : Array.isArray(characterInfo[key]) ? (characterInfo[key] as Array<string>).join(', ') : characterInfo[key]
}

function App() {
  const [rickAndMontyInfo, setRickAndMontyInfo] = useState<RICK_MORTY_TYPE[]>([])
  useEffect(() => {
    fetch(GET_CHARACTERS)
      .then(response => response.json())
      .then(async charactersData => {
        // console.log(data.results)
        const formatedCharacterResponse = await (formatResponse(charactersData.results))
        const fullyResolvedCharacterData = await Promise.all(formatedCharacterResponse)
        console.log('Formatted Data', fullyResolvedCharacterData)
        setRickAndMontyInfo([...fullyResolvedCharacterData] as Array<RICK_MORTY_TYPE>)
        // setData({
        //   rows: data.results.map(async ({ image, name, species, status, origin, episode }: any, i: any) => {
        //     const orginalData = await getOriginInfo(origin)
        //     console.log('Data from Origin Method',[...orginalData])
        //     return { image, meta: [name, species, status], originInfo: [...orginalData], episode: episode[0] }
        //   })
        // })
      })
      .catch(err => console.log('Error', err))
    return () => {

    }
  }, [])
  return (
    // <Box display={'flex'}  className={'bodyBackground'}>

    // <div style={{ width: '100%' }}>
    //   <div style={{ display: 'flex'}}>
    //     <div style={{ flexGrow: 1 }}>
    //       <DataGrid columns={Columns} rows={data.rows} disableColumnFilter />
    //     </div>
    //   </div>
    // </div>

    //  </Box>
    <>
      <Header />
      <Box p={2}>
        <Grid container spacing={2}>
          {rickAndMontyInfo?.map((characterInfo: RICK_MORTY_TYPE, index: number) => (
            Object.keys(characterInfo).map((key: string) => (
              <Grid item xs={3} key={`housingAnyWhere${index}`}>
                {getRenderElement(key, characterInfo)}
              </Grid>
            ))
          ))}
        </Grid>
      </Box>
    </>
  );
}

export default App;
