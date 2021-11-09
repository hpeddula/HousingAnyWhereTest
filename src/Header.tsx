import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { HEADERS } from './constants';
import './Header.scss'

function Header() {
    return (
        <Box p={2} display={'flex'} justifyContent="space-evenly">
            {/* <Grid container spacing={2}> */}
            {HEADERS?.map((header: string, index: number) => (
                // <Grid item xs={3} key={`housingAnyWhere${index}`} className={'headerItems'}>
                <div className={'headerItems'}> {header}</div>
                //     {/* </Grid> */}
            ))}
            {/* </Grid> */}
        </Box>
    )
}

export default Header
