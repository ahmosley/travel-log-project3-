import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditLogEntry from "./EditLogEntry";

class LogDetails extends Component {
  state = {
    // logEntry: {}
  }
  componentDidMount() {
    this.getSingleLog();
  }

  getSingleLog = () => {
    const { params } = this.props.match;
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URI}/api/logs/logentry/${params.id}`
      )
      .then((responseFromApi) => {
        const logEntry = responseFromApi.data;
        console.log(`${logEntry}`)
        this.setState(logEntry);
  
      })
      .catch((err) => {
        console.log(err);
      });
  };

  renderEditForm = () => {
    if (!this.state.title) {
      this.getSingleLog();
    } else {
      //
      //
      //
      return (
        <EditLogEntry
          theLog={this.state}
          getTheLog={this.getSingleLog}
          {...this.props}
        />
      );
    }
  };

  // DELETE log:
  /*deleteLog = () => {
    //const { id } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URI}/api/logs/logentries/${id}`)
      .then(() => {
        props.history.push("/map"); // !!!
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <div>{this.renderEditForm} </div>
        {/* <== !!! */}
        <br />
        <Link to={"/home"}>Back home</Link>
      </div>
    );
  }
}

export default LogDetails;
