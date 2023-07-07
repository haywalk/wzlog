/**
 * Hayden Walker, 2023-07-06
 */

import { Container } from '@mui/material';
import React, { useState } from 'react';
import './App.css';
import LogEntry from './LogEntry.jsx';
import LogTable from './LogTable.jsx';
import { Header } from './TextElements.jsx';

function App() {
  // create empty array of rows
  const [rows, setRows] = useState(Array(0));
  var loggedQSOs = Array(0);

  /**
   * Given a submitted QSO, add it to the logs
   */
  function submit(qso) {
    setRows(rows.concat([qso.asDict()]));
    loggedQSOs.push(qso);
  }

  return(
    <Container>
      <Header />
      <LogEntry submitQSO={submit} />
      <LogTable rows={rows} />
    </Container>
  );
}

export default App;