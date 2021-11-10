import React, { useState, useEffect } from 'react';
import './App.scss';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { GET_CHARACTERS } from './constants';
import { formatResponse } from './utils';
import { ExpandMoreProps, PAGINATION, RICK_MORTY_TYPE } from './types';
import Paper from '@mui/material/Paper';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Avatar, CardHeader, CardMedia, CardActions, Tooltip, Pagination } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';


const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  marginRight: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const darkTheme = createTheme({ palette: { mode: 'dark' } });

function App() {
  const [rickAndMontyInfo, setRickAndMontyInfo] = useState<RICK_MORTY_TYPE[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [paginationInfo, setPaginationInfo] = useState<PAGINATION>({ count: 0, pages: 0, next: '', prev: '', page: 1 });
  const [error,setErrorMessage] = useState<string>('');

  const handleExpandClick = (characterInfo: RICK_MORTY_TYPE) => {
    const { id } = characterInfo;
    let localDataCopy = [...rickAndMontyInfo];
    let expandedCharacter = rickAndMontyInfo.find((char: RICK_MORTY_TYPE) => char.id === id);
    let expandedCharacterIndex = rickAndMontyInfo.findIndex((char: RICK_MORTY_TYPE) => char.id === id);
    if (expandedCharacter) {
      expandedCharacter['expanded'] = !expandedCharacter['expanded']
      localDataCopy[expandedCharacterIndex] = expandedCharacter
      setRickAndMontyInfo([...localDataCopy])
    }
  };

  const fetchCharacters = (url: string, page: number) => {
    fetch(url)
      .then(response => response.json())
      .then(async charactersData => {
        const formatedCharacterResponse = await (formatResponse(charactersData.results))
        const fullyResolvedCharacterData = await Promise.all(formatedCharacterResponse)
        setRickAndMontyInfo([...fullyResolvedCharacterData] as Array<RICK_MORTY_TYPE>)
        setPaginationInfo({ ...charactersData.info, page })
        setLoader(false);
      })
      .catch(err => {
        setLoader(false);
        setErrorMessage(err?.message)
      })
  }

  const handlePagination = (event: React.ChangeEvent<unknown>, page: number) => {
    setLoader(true);
    setRickAndMontyInfo([])
    fetchCharacters(`${GET_CHARACTERS}?page=${page}`, page)
  }

  useEffect(() => {
    setLoader(true);
    fetchCharacters(GET_CHARACTERS, 1)
    return () => {
      setRickAndMontyInfo([]);
      setPaginationInfo({ count: 0, pages: 0, next: '', prev: '', page: 1 });
      setErrorMessage('')
    }
  }, [])
  return (
    <div className="bodyBackground">
      <Box p={2}>
        {loader && <Box className="loader"><Typography variant="h1">Loading....</Typography></Box>}
        {error && <Box className="loader"><Typography variant="h1">{error}</Typography></Box>}
        {!error && <Paper elevation={4} className="pagination">
          <Pagination
            count={paginationInfo.pages}
            page={paginationInfo.page}
            color="primary"
            onChange={handlePagination}
            variant="outlined"
            sx={{ display: 'flex', justifyContent: 'center' }}
            hideNextButton
            hidePrevButton
            disabled={loader}
          />
        </Paper>}
        <Grid container spacing={3} mx={1}>
         
          {rickAndMontyInfo?.map((characterInfo: RICK_MORTY_TYPE, index: number) => {
            const [name, species, status] = characterInfo?.meta;
            const [planetName, planetDimmension, planetType, count] = characterInfo?.originInfo;
            return (
              <Grid item key={index}>
                <ThemeProvider theme={darkTheme}>
                  <Paper elevation={6}>
                    <Card sx={{ width: 400 }}>
                      <CardHeader
                        avatar={<Avatar
                          alt="rickandmortyimages"
                          src={characterInfo.image as string}
                          sx={{ width: 56, height: 56 }}
                        />}
                        title={name}
                      />
                      <CardMedia
                        component="img"
                        image={characterInfo.image as string}
                        alt="rickandmortyimages"
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>Meta Information</Typography>
                        <Typography variant="body2" component="div" gutterBottom>{`Character Name : ${name}`}</Typography>
                        <Typography variant="body2" component="div" gutterBottom>{`Species : ${species}`}</Typography>
                        <Typography variant="body2" component="div" gutterBottom>{`Status : ${status}`}</Typography>
                        <Typography variant="h6" gutterBottom>Origin and Location Information</Typography>
                        <Typography variant="body2" component="div" gutterBottom>{`Name : ${planetName}`}</Typography>
                        {planetDimmension && <Typography variant="body2" component="div" gutterBottom>{`Dimension : ${planetDimmension}`}</Typography>}
                        {planetType && <Typography variant="body2" component="div" gutterBottom>{`Type : ${planetType}`}</Typography>}
                        {count && <Typography variant="body2" component="div" gutterBottom>{count}</Typography>}
                        <CardActions>
                          <ExpandMore
                            expand={characterInfo.expanded}
                            onClick={() => handleExpandClick(characterInfo)}
                            aria-expanded={characterInfo.expanded}
                            aria-label="show more"
                          >
                            <Tooltip title="Expand to see the episodes character has been invloved in">
                              <ExpandMoreIcon />
                            </Tooltip>
                          </ExpandMore>
                        </CardActions>
                        {characterInfo.expanded && (
                          <>
                            <Typography variant="h5" gutterBottom>Episodes</Typography>
                            <ol>
                              {characterInfo.episodes.map((episode: string, index: number) => (
                                <li key={`${episode}${index}`}><Typography variant="body2">{episode}</Typography></li>
                              ))}
                            </ol>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  </Paper>
                </ThemeProvider>
              </Grid>
            )
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default App;
