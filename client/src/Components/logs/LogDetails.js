import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditLogEntry from "./EditLogEntry"


class LogDetails extends Component {
  state = {};

  componentDidMount() {
    this.getSingleLog();
  }

  getSingleLog = () => {
    const { params } = this.props.match;
    axios
      .get(`${process.env.REACT_APP_BACKEND_URI}/api/logs/${params.id}`)
      .then((responseFromApi) => {
        const theLog = responseFromApi.data;
        this.setState(theLog);
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

  // DELETE PROJECT:
  //deleteLog = (id) => {
    //const { id } = this.props.match;
    // axios
     // .delete(`http://localhost:1337/api/logs/${id}`)
     // .then(() => {
      //  this.props.history.push("/projects"); // !!!
     // })
      //.catch((err) => {
        //onsole.log(err);
      //});
  //};

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <div>{this.renderEditForm()} </div>
        <button onClick={() => this.deleteLog()}>
          Delete project
        </button>{" "}
        {/* <== !!! */}
        <br />
        <Link to={"/map"}>Back to map</Link>
      </div>
    );
  }
}

export default LogDetails;
