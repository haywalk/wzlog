import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import './LogEntry.jsx';
import { QSO } from './QSO.js';
import { HorizontalLine } from './TextElements.jsx';


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
 * Form for entering log data.
 */
function LogEntry({submitQSO}) {
  // date
  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);

  // time
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState(false);

  // callsign
  const [call, setCall] = useState("");
  const [callError, setCallError] = useState(false);

  // location
  const [qth, setQTH] = useState("");

  // signal report
  const [rstsent, setRSTSent] = useState("");
  const [rstrcvd, setRSTRcvd] = useState("");
  
  // mode
  const [mode, setMode] = useState("");
  
  // comment
  const [comment, setComment] = useState("");
  
  
  /**
   * Clear the form.
   */
  function clearForm() {
    setDate("");
    setTime("");
    setCall("");
    setQTH("");
    setRSTSent("");
    setRSTRcvd("");
    setMode("");
    setComment("");
  }
  
  /**
   * Check whether required fields are filled in.
   */
  function validate() {
    var valid = true;

    // validate date
    if(date === "") {
      valid = false;
      setDateError(true);
    } else {
      setDateError(false);
    }

    // validate time
    if(time === "") {
      valid = false;
      setTimeError(true);
    } else {
      setTimeError(false);
    }

    // validate callsign
    if(call === "") {
      valid = false;
      setCallError(true);
    } else {
      setCallError(false);
    }

    return valid;
  }
  
  function makeQSO() {
    return new QSO(
      date, time, call, qth, rstsent, rstrcvd, mode, comment
    );
  }

  /**
   * Validate and submit the form.
   */
  function submit() {
    if(validate()) {
      submitQSO(makeQSO());
      clearForm();
    }
  }
  
  return(
    <Box id="log-entry">
      <HorizontalLine text="Log a QSO" />

      <Box
        id="log-entry-boxes"
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
          value={date}
          onChange={(event) => setDate(event.target.value)}
          error={dateError}
        />

        <TextField
          required
          id="time-field"
          label="UTC"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          error={timeError}
        />

        <TextField
          required
          id="call-field"
          label="Callsign"
          value={call}
          onChange={(event) => setCall(event.target.value)}
          error={callError}
        />

        <TextField
          id="qth-field"
          label="QTH"
          value={qth}
          onChange={(event) => setQTH(event.target.value)}
        />

        <TextField
          id="rst-sent-field"
          label="RST Sent"
          value={rstsent}
          onChange={(event) => setRSTSent(event.target.value)}
        />


        <TextField
          id="rst-received-field"
          label="RST Received"
          value={rstrcvd}
          onChange={(event) => setRSTRcvd(event.target.value)}
        />

        <TextField
          id="mode-field"
          label="Mode"
          value={mode}
          onChange={(event) => setMode(event.target.value)}
        />

        <TextField        
          id="comment-field"
          label="Comments"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
      </Box>

      <Box textAlign='center'>
        <ButtonGroup variant="contained" id="logbuttons">
          <Button onClick={() => setDate(getDate())}>Fill Date</Button>
          <Button onClick={() => setTime(getUTC())}>Fill UTC</Button>
          <Button style={{backgroundColor: "green"}} onClick={submit}>Log</Button>
        </ButtonGroup>
      </Box>

    </Box>
  );
}

export default LogEntry;