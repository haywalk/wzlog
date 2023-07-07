/**
 * Hayden Walker, 2023-07-06
 */

import { Container } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import LogEntry from './LogEntry.jsx';
import LogTable from './LogTable.jsx';
import { Header } from './TextElements.jsx';

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



function App() {
  // create empty array of rows
  const [rows, setRows] = useState(Array(0));

  // log a QSO
  function submit() {
    setRows(rows.concat([getQSOData().asDict()]));
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