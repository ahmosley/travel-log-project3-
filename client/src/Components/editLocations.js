import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { listLogEntries } from "../API";
import EditLogEntry from "./logs/EditLogEntry";

class EditLocation extends Component {
  state = { listLogEntries: [], entryDescription: "" };

  async getLogEntries() {
    const entries = await listLogEntries();

    console.log({ entries });

    // this.props.history.push("/map");

    this.setState({ listLogEntries: entries });
  }

  render() {
    if (this.state.listLogEntries.length === 0) {
      this.getLogEntries();
    }
    return (
      <div>
        {this.state.listLogEntries.map((log) => {
          return (
            <div key={log._id}>
              {/* <Link to={`/logentries/${log._id}`}>
                <h3>{log.title}</h3>
              </Link> */}
              <EditLogEntry {...this.props} logData={log} />
              {<p style={{ maxWidth: "400px" }}>{log.description} </p>}
            </div>
          );
        })}
      </div>
    );
  }
}

export default EditLocation;
