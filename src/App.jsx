/**
 * Hayden Walker, 2023-07-06
 */

import { Box, Button, ButtonGroup, Container, Divider, TextField, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import './App.css';

/**
 * Store QSO data.
 */
class QSO {
  /**
   * Create a new QSO.
   */
  constructor(date, time, call, qth, rstSent, rstRecd, name, comments) {
    this.date = date;
    this.time = time;
    this.call = call;
    this.qth = qth;
    this.rstSent = rstSent;
    this.rstRecd = rstRecd;
    this.name = name;
    this.comments = comments;
    this.id = new Date().getTime;
  }

  /**
   * Return the QSO as a dictionary (for the DataGrid).
   */
  asDict() {
    const newRow = { 
        id: new Date().getTime(),
        date: this.date + " " + this.time,
        utc: String(this.time),
        call: String(this.call),
        qth: String(this.qth),
        rstSent: this.rstSent,
        rstRcvd: this.rstRecd,
        name: this.name,
        comment: String(this.comments)
    }

    return newRow;
  }
}

class Field {

  constructor(id, label, required=false, helperText="", value="", error=false) {
    this.isRequired = required;
    this.helperText = helperText;
    this.id = id;
    this.label = label;
    this.value = value;
    this.error = error
  }

  update(event) {
    this.value = event.target.value
  }
}

/**
 * Return the current date.
 */
function getDate() {
  const date = new Date();
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return year + "-" + month + "-" + day;

}

/**
 * Return the current time.
 */
function getUTC() {
  const date = new Date();
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  return hours + ":" + minutes + ":" + seconds;
}

/**
 * Create a new QSO from the form inputs.
 * 
 * @returns New QSO
 */
function getQSOData() {
  const newQSO = new QSO(
    String(document.getElementById('date-field').value),
    String(document.getElementById('time-field').value),
    String(document.getElementById('call-field').value),
    String(document.getElementById('qth-field').value),
    String(document.getElementById('rst-sent-field').value),
    String(document.getElementById('rst-received-field').value),
    String(document.getElementById('name-field').value),
    String(document.getElementById('comment-field').value)
  );

  return(newQSO);
}

/**
 * Clear the form.
 */
function clearForm() {
  document.getElementById('date-field').value = "";
  document.getElementById('time-field').value = "";
  document.getElementById('call-field').value = "";
  document.getElementById('qth-field').value = "";
  document.getElementById('rst-sent-field').value = "";
  document.getElementById('rst-received-field').value = "";
  document.getElementById('name-field').value = "";
  document.getElementById('comment-field').value = "";
}



/**
 * Page header.
 */
function Header() {
  const title = "Logbook";
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
function HorizontalLine({text}) {
  return(
    <div style={{marginBottom: '15px'}}>
      <Divider textAlign='left' >
        <Typography variant="body1">{text}</Typography>
      </Divider>
    </div>
  );
}

function LogEntryTextFields({fields}) {
  const [value, setValue] = useState("");


  return(
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      
      noValidate
      autoComplete="off"
    >
      {fields.map(field => 
        <TextField
          required = {field.isRequired}
          helperText = {field.helperText}
          id = {field.id}
          label = {field.label}
          value = {field.value}
          error = {field.error}
          onChange={field.update}
        />
      )}

      <TextField 
        value={value}
        onChange={(event) => setValue(event.target.value)}
        label="hello"
        id="test"
      />
    </Box>
  );
}

/**
 * Text fields for entering log data.
 *
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
        helperText="Enter a date."
        id="date-field"
        label="Date"
        defaultValue=""
      />

      <TextField
        required
        helperText="Enter a time."
        id="time-field"
        label="UTC"
        defaultValue=""
      />

      <TextField
        required
        helperText="Enter a callsign."
        id="call-field"
        label="Callsign"
        defaultValue=""
      />

      <TextField
        id="qth-field"
        label="QTH"
        defaultValue=""
      />

      <TextField
        id="rst-sent-field"
        label="RST Sent"
        defaultValue=""
      />


      <TextField
        id="rst-received-field"
        label="RST Received"
        defaultValue=""
      />

      <TextField
        id="name-field"
        label="Name"
        defaultValue=""
      />

    <TextField        
        id="comment-field"
        label="Comments"
        defaultValue=""
      />
    </Box>
  );
}*/

/**
 * Buttons for entering log data.
 */
function LogEntryButtons({onSubmit, onFillUTC, onFillDate}) {
  return(
    <Box textAlign='center'>
      <ButtonGroup variant="contained" id="logbuttons">
        <Button onClick={onFillDate}>Fill Date</Button>
        <Button onClick={onFillUTC}>Fill UTC</Button>
        <Button style={{backgroundColor: "green"}} onClick={onSubmit}>Log</Button>
      </ButtonGroup>
    </Box>
  );
}

/**
 * Log entry form.
 */
function LogEntry({onSubmit}) {
  const [fields, setFields] = useState([
    new Field("date-field", "Date", true),
    new Field("time-field", "UTC", true),
    new Field("call-field", "Callsign", true),
    new Field("qth-field", "QTH"),
    new Field("rst-sent-field", "RST Sent"),
    new Field("rst-received-field", "RST Rcvd"),
    new Field("name-field", "Name"),
    new Field("comment-field", "Comments")
  ]);

  function submit() {
    document.getElementById('test').value = "ASDF";
  }

  //const fillUTC = () => fields[1].value = getUTC();
  //const fillDate = () => fields[0].value = getDate();


  return(
    <Box id="log-entry">
      <HorizontalLine text="Log a QSO" />
      <LogEntryTextFields fields={fields} />      
      <LogEntryButtons onSubmit={submit} onFillUTC={() => fields[1].value = getUTC()} onFillDate={() => fields[0].value = getDate()}/>
    </Box>
  );
}

/**
 * Table of entered logs.
 */
function LogTable({rows}) {

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

function App() {
  const [rows, setRows] = useState(Array(0));

  function submit() {
    setRows(rows.concat([getQSOData().asDict()]));
    clearForm();
  }


  return(
    <Container>
      <Header />
      <LogEntry onSubmit={submit} />
      <LogTable rows={rows} />
    </Container>
  );
}

export default App;