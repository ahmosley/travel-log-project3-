import React, { Component } from "react";
import axios from "axios";

class EditLogEntry extends Component {
  state = {
    title: "",
    description: "",
  };

  componentDidMount() {
    if (this.props.logData) {
      this.setState({
        title: this.props.logData.title,
        description: this.props.logData.description,
      });
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;

    console.log({ editProps: this.props });

    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URI}/api/logs/logentries/${this.props.logData._id}`,
        {
          title,
          description,
        }
      )
      .then(() => {
        console.log({ thenProps: this.props });
        // this.props.getThelog();
        // after submitting the form, redirect to '/logs'
        this.props.history.push("/map");
      })
      .catch((error) => console.log(error));
  };

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <hr />
        <h3>Edit: {this.state.title}</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={this.state.title}
            onChange={(e) => this.handleChangeTitle(e)}
          />
          <label>Description:</label>
          <textarea
            name="description"
            value={this.state.description}
            onChange={(e) => this.handleChangeDesc(e)}
          />

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default EditLogEntry;
