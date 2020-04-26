import React, { Component } from 'react'
import CardPost from '././Card/CardPost'
import { connect } from 'react-redux'
import { loadPostsHandler, loadOldPostsHandler } from '../redux/actions/postAction'

class PostList extends Component {

    state = {
        posts: [],
        fetch: false
    }

    componentDidUpdate() {
        if (this.props.fetch !== this.state.fetch) {
            this.props.getPosts(this.props.id)
            this.setState({
                fetch: true
            })
        }        
    }
   
    onClickLoadPosts = async () => {
        const index = this.props.posts.length - 1
        const lastPostId = this.props.posts[index].id
        await this.props.getOldPosts(lastPostId)
    }
    
    render() {
        return (
            <div className="mt-5 ">
                {this.props.posts && this.props.posts.map(post => {
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
                            currentUsername={this.props.username}
                        />
                    )

                })}
                <div className="btn btn-primary" onClick={this.onClickLoadPosts}>LOAD</div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: (userId) => dispatch(loadPostsHandler(userId)),
        getOldPosts: (id) => dispatch(loadOldPostsHandler(id))
    }
}
const mapStateToProps = state => {

    return {
        id: state.auth.id,
        fetch: true,
        posts: state.postReducer.posts,
        arraySize: state.postReducer.arraySize
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(PostList)