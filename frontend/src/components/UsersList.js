import React, { Component } from 'react'
import { getusers } from '../api/userCalls'
import { connect } from 'react-redux'
import '../assets/index.css'
import InnerUsersList from './InnerUsersList'

class UsersList extends Component {

    state = {
        users: [],
        filter: "",
        visibleFriends: false
    }

    loadUsers = async () => {
        const { username } = this.props

        let users = []
        await getusers().then(res => {
            
            res.data.filter((data => data.username !== username))
                .map(item => {
                    return users.push(item)
                })
            this.setState({
                users,
                visibleFriends:true
            })
        })
    }
    componentDidMount() {
        this.loadUsers()
    }

  
    onChangeSearch = e => {
        this.setState({
            filter: e.target.value
        })
    }
    render() {
        const { users, filter, visibleFriends } = this.state

        return (
            <div className="card p-4 shadow">
                <h6
                    className="text-primary"
                    style={
                        {
                            fontFamily: 'Indie Flower',
                            fontSize: 32,
                            fontStyle: "italic",
                            fontWeight: 700
                        }
                    }>Users</h6>
                {visibleFriends ? <InnerUsersList users={users} filter={filter} onChangeSearch={this.onChangeSearch} />
                    : <div className="circle mx-auto mt-4"></div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        id: state.auth.id
    }
}

export default connect(mapStateToProps)(UsersList)