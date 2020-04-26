import React, { Component } from 'react'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default class UserFriends extends Component {


    render() {
        const { friends, friendsClick, onClickCloseFriends } = this.props
        return (
            <Modal show={friendsClick} onHide={onClickCloseFriends}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h3
                            className="text-center text-primary"
                            style={
                                {
                                    fontFamily: 'Indie Flower',
                                    fontSize: 32,
                                    fontStyle: "italic",
                                    fontWeight: 700
                                }
                            }>Friends</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {friends.map(user => {
                        return (
                            <div key={user.id}>
                                <ul>
                                    <li>
                                        <img
                                            className="rounded-circle mr-2"
                                            width="30"
                                            height="30"
                                            src={`images/${user.image}`}
                                            alt={user.userName}
                                        />
                                        <Link to={`/profile/${user.username}`}>
                                            <span
                                                style={{ color: 'black' }}
                                            >{user.name} {user.lastName}</span>
                                        </Link>
                                    </li>
                                </ul>

                            </div>
                        )
                    })}
                </Modal.Body>

            </Modal>
        )
    }
}
