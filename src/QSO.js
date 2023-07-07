/**
 * Store QSO data.
 */
export class QSO {
    /**
     * Create a new QSO.
     */
    constructor(date, time, call, qth, rstSent, rstRecd, mode, comments) {
      this.date = date;
      this.time = time;
      this.call = call;
      this.qth = qth;
      this.rstSent = rstSent;
      this.rstRecd = rstRecd;
      this.mode = mode;
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
          mode: this.mode,
          comment: String(this.comments)
      }
  
      return newRow;
    }
  }