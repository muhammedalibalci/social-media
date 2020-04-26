import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

class CardProfile extends Component {
    render() {
        const { user, date, onClickDeletePost } = this.props
        const deleteVisible = user.username === this.props.currentUsername

        return (
            <div>
                <Link to={`/profile/${user.username}`} className="font-weight-bold">
                    {user.name} {user.lastName}
                </Link>
                <span className="text-muted"> @{user.username} </span>
                <span className="text-muted">· {date}</span>
                {deleteVisible &&
                    <button className="btn btn-sm btn-danger float-right" onClick={onClickDeletePost}>
                        <i className="far fa-trash-alt"></i>
                    </button>}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        currentUsername: state.auth.username
    }
}

export default connect(mapStateToProps)(CardProfile)