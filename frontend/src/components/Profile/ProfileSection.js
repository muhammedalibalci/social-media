import React, { Component } from 'react'
import ProfileEdit from './ProfileEdit'
import defaultPicture from '../../assets/profile.png'
import { connect } from 'react-redux'
import { follow } from '../../api/friendCalls'
import { getFriendsOfUser } from '../../api/friendCalls'
import UserFriends from './UserFriends'
import { withRouter } from 'react-router-dom'
class ProfileSection extends Component {

    state = {
        friends: [],
        friendsClick: false,
        visibleAddFriendButton: true
    }
    componentDidMount() {
        if (this.props.username === this.props.match.params.username) {
            this.setState({
                visibleAddFriendButton: false
            })
        }
        this.loadFriendsOfUser()
    }
    loadFriendsOfUser = async () => {
        await getFriendsOfUser(this.props.user.id).then(res => {
            const statuVisibleButton = res.data.friendUsers.filter(item => item.username === this.props.username)
            if (statuVisibleButton.length !== 0) {
                this.setState({
                    visibleAddFriendButton: false
                })
            }
            this.setState({
                friends: res.data.friendUsers
            })
        })
    }
    onClickFollow = () => {
        follow(this.props.user.id).then(res => {
            this.loadFriendsOfUser()
            this.setState({
                visibleAddFriendButton: false
            })
        })
    }
    onClickFriends = () => {
        this.setState({
            friendsClick: true
        })
    }
    onClickCloseFriends = () => {
        this.setState({
            friendsClick: false
        })
    }

    render() {
        const { user, username } = this.props
        const { friends, friendsClick, visibleAddFriendButton } = this.state

        let editable = user.username === username

        let imageSource = defaultPicture
        if (user.image) {
            imageSource = "/images/" + user.image
        }

        return (
            <div className="card p-3 shadow">
                {this.state.friendsClick && <UserFriends
                    friends={friends}
                    friendsClick={friendsClick}
                    onClickCloseFriends={this.onClickCloseFriends} />}
                <div className="text-center">
                    <img
                        className="rounded-circle mb-3"
                        width="200"
                        height="200"
                        src={user.newImage || imageSource}
                        alt={user.username} />
                </div>
                <div>
                    <h3>{user.name} {user.lastName}</h3>
                    <p>@{user.username}</p>
                    <div >
                        {visibleAddFriendButton && <button className="btn btn-sm font-weight-bold badge badge-success p-3 " onClick={this.onClickFollow}>
                            <i className="far fa-plus-square"></i> Add Friend
                    </button>}
                        <button
                            className="btn btn-sm font-weight-bold badge badge-primary p-3 ml-2"
                            onClick={this.onClickFriends}>
                            {friends.length} Friends</button>

                    </div>

                    {friendsClick && <UserFriends friends={friends} />}

                    <p className="text-justify mt-2">{user.about}</p>

                    <p><i className="fas fa-map-marker-alt"></i> {user.location}</p>


                    {editable && <div className="btn btn-danger" onClick={this.props.onClickEditButton}>
                        <i className="fas fa-edit"></i> Edit
                    </div>}
                </div>

                {user.editVisible && <ProfileEdit name={user.name} lastName={user.lastName} username={user.username}
                    image={user.image} about={user.about} location={user.location}
                    onChangeFile={this.props.onChangeFile}
                    onChange={this.props.onChange}
                    onClickUpdate={this.props.onClickUpdate}
                    onClickCancel={this.props.onClickCancel}
                />}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
}

export default withRouter(connect(mapStateToProps)(ProfileSection))