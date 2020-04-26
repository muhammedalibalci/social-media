import React, { Component } from 'react'
import CardPost from '../Card/CardPost'
import { connect } from 'react-redux'
import { loadPostsHandler } from '../../redux/actions/postAction'
import { withRouter } from 'react-router-dom'
import { loadUserHandler } from '../../redux/actions/userAction'

class UserPosts extends Component {

    state = {
        fetch: false
    }
    componentDidMount() {
        if (!this.props.id) {
            this.props.getUser(this.props.username)
        }
    }
    componentDidUpdate() {
        if (this.props.fetch !== this.state.fetch) {
            this.props.getPosts(this.props.id)
            this.setState({
                fetch: true
            })
        }
    }
    render() {
        const { username } = this.props.match.params

        return (
            <div className="card p-3 shadow">
                <h3
                    className="text-center text-primary"
                    style={
                        {
                            fontFamily: 'Indie Flower',
                            fontSize: 32,
                            fontStyle: "italic",
                            fontWeight: 700
                        }
                    }>Posts</h3>
                {this.props.posts && this.props.posts.filter(post => post.user.username === username).map(post => {
                    return (
                        <CardPost
                            key={post.id}
                            postId={post.id}
                            useridInPost={post.userId}
                            content={post.content}
                            user={post.user}
                            postLike={post.postLike}
                            liked={post.liked}
                            date={post.date}
                            image={post.image}
                            comments={post.comment}
                            postUserLikes={post.likeUsers}
                        />
                    )
                })}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: (userId) => dispatch(loadPostsHandler(userId)),
        getUser: (username) => dispatch(loadUserHandler(username))
    }
}
const mapStateToProps = state => {
    return {
        id: state.auth.id,
        username: state.auth.username,
        fetch: true,
        posts: state.postReducer.posts
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserPosts))