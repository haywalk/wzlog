import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { HorizontalLine } from './TextElements';

/**
 * Table of entered logs.
 */
function LogTable({rows}) {

    // define the table's columns
    const columns = [
      { field: 'date', headerName: 'Date and Time', width: 200 },
      { field: 'call', headerName: 'Callsign', width: 100 },
      { field: 'qth', headerName: 'QTH', width: 100 },
      { field: 'rstSent', headerName: 'RST Sent', width: 100 },
      { field: 'rstRcvd', headerName: 'RST Rcvd', width: 100 },
      { field: 'name', headerName: 'Name', width: 100 },
      { field: 'comment', headerName: 'Comments', width: 100 },
    ];
  
    return(
      <Box id="log-display">
        <HorizontalLine text="Logged QSOs" />
  
        <div style={{ height: 300, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </Box>
    );
}

export default LogTable;