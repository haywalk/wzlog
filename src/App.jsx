/**
 * Hayden Walker, 2023-07-06
 */

import React from 'react';

import { Box, Button, ButtonGroup, Container, Divider, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import './App.css';

class QSO {
  QSO(date, time, call, qth, rstSent, rstRecd, comments) {
    this.date = date;
    this.time = time;
    this.call = call;
    this.qth = qth;
    this.rstSent = rstSent;
    this.rstRecd = rstRecd;
    this.comments = comments;
  }
}

/**
 * Automatically fill in the 'date' field.
 */
function fillDate() {
  const date = new Date();
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  document.getElementById("date-field").value = year + "-" + month + "-" + day;
}

/**
 * Automatically fill in the 'UTC' field.
 */
function fillUTC() {
  const date = new Date();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');

  document.getElementById("time-field").value = hours + ":" + minutes + ":" + seconds;
}

function getQSOData() {
  return(new QSO(
    document.getElementById('date-field').value,
    document.getElementById('time-field').value,
    document.getElementById('call-field').value,
    document.getElementById('qth-field').value,
    document.getElementById('rst-sent-field').value,
    document.getElementById('rst-received-field').value,
    document.getElementById('comment-field').value,
  ));
}

/**
 * Page header.
 */
function Header() {
  const title = "wzlog";
  const desc = "Amateur radio logbook by VE9WZ"

  return(
    <Box id="header-box">
      <Typography variant="h1">{title}</Typography>
      <Typography variant="body1">{desc}</Typography>
    </Box>
  );
}

/**
 * Horizontal line with text. 
 */
function HorizontalLine({text}) {
  return(
    <div style={{marginBottom: '15px'}}>
      <Divider textAlign='left' >
        <Typography variant="body1">{text}</Typography>
      </Divider>
    </div>
  );
}

/**
 * Text fields for entering log data.
 */
function LogEntryTextFields() {
  return(
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      
      noValidate
      autoComplete="off"
    >

      <TextField
        required
        id="date-field"
        label="Date"
        defaultValue=""
      />

      <TextField
        required
        id="time-field"
        label="UTC"
        defaultValue=""
      />

      <TextField
        required
        id="call-field"
        label="Callsign"
        defaultValue=""
      />

      <TextField
        required
        id="qth-field"
        label="QTH"
        defaultValue=""
      />

      <TextField
        required
        id="rst-sent-field"
        label="RST Sent"
        defaultValue=""
      />


      <TextField
        required
        id="rst-received-field"
        label="RST Received"
        defaultValue=""
      />

    <TextField        
        id="comment-field"
        label="Comments"
        defaultValue=""
      />
    </Box>
  );
}

/**
 * Buttons for entering log data.
 */
function LogEntryButtons() {
  return(
    <Box textAlign='center'>
      <ButtonGroup variant="contained" id="logbuttons">
        <Button onClick={fillDate}>Fill Date</Button>
        <Button onClick={fillUTC}>Fill UTC</Button>
        <Button style={{backgroundColor: "green"}}>Log</Button>
      </ButtonGroup>
    </Box>
  );
}

/**
 * Log entry form.
 */
function LogEntry() {
  return(
    <Box id="log-entry">
      <HorizontalLine text="Log a QSO" />
      <LogEntryTextFields />      
      <LogEntryButtons />
    </Box>
  );
}

/**
 * Table of entered logs.
 */
function LogTable() {
  const rows = [
    { id: 1, date: '2023-07-06', utc: '17:07', call: 'VE9WZ', grid: 'FN57fr', comment: 'First QSO!'}
  ];
  
  const columns = [
    { field: 'date', headerName: 'Date', width: 100 },
    { field: 'utc', headerName: 'UTC', width: 75 },
    { field: 'call', headerName: 'Callsign', width: 150 },
    { field: 'grid', headerName: 'Grid Square', width: 100 },
    { field: 'comment', headerName: 'Comment', width: 500 },
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

function App() {
  return(
    <Container>
      <Header />
      <LogEntry />
      <LogTable />
    </Container>
  );
}

export default App;