import React, { Component } from 'react';
import axios from 'axios'
import actions from '../api'

class AddPost extends Component {

    state = {
        message: ''
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        // let res = await axios.post(`http://localhost:5000/api/addAPost`, this.state)

        let res = await actions.addPost(this.state)
        this.props.history.push('/')

    }



    render() {
        return (
            <div>

                <form onSubmit={this.handleSubmit} >
                    <input onChange={(e) => this.setState({ message: e.target.value })} name="message" type="text" placeholder="Add A Post" />
                    <button> 💌 </button>
                </form>
            </div>
        );
    }
}

export default AddPost;