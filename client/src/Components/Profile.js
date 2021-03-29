import React, { Component } from 'react';
import actions from '../api'

class Profile extends Component {

    state = {
        posts: []
    }

    async componentDidMount() {
        let res = await actions.getMyPosts()
        console.log(res)
        this.setState({ posts: res.data })
    }


    logOut = () => {
        localStorage.removeItem('token')
        this.props.setUser({})
    }


    showMyPosts = () => {
        return this.state.posts.map(eachPost => {
            return <li key={eachPost._id}> {eachPost.message} </li>
        })
    }

    render() {
        console.log(this)
        return (
            <div>
                Profile

                <h2>{this.props.user?.email}</h2>
                {this.showMyPosts()}
                <button onClick={this.logOut}>Log out</button>
            </div>
        );
    }
}

export default Profile;