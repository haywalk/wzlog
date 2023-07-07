import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import './App.css';

/**
 * Page header.
 */
export function Header() {
    const title = "wzlog";
    //const desc = "Amateur radio logbook by VE9WZ"
  
    return(
      <Box id="header-box">
        <Typography variant="h1">{title}</Typography>
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
  