import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import './App.css';

/**
 * Page header.
 */
export function Header() {  
  return(
    <Box id="header-box">
      <Typography variant="h1">wzlog</Typography>
      <Typography variant="body2"><i>Bare-bones ham radio logbook written in React by <a href="https://www.haywalk.ca">VE9WZ</a></i></Typography>
    </Box>
  );
}
  
/**
 * Horizontal line with text. 
 */
export function HorizontalLine({text}) {
  return(
    <div style={{marginBottom: '15px'}}>
      <Divider textAlign='left' >
        <Typography variant="body1">{text}</Typography>
      </Divider>
    </div>
  );
}
  