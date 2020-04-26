import React, { Component } from 'react'
import defaultSource from '../../assets/profile.png'
import CardPostMessageInput from './CardPostMessageInput'
import CardPostComments from './CardPostComments'
import { addcomment } from '../../api/commentCalls'
import { connect } from 'react-redux'
import { deletepost, likepost, dislikepost } from '../../api/postCalls'
import { loadPostsHandler, loadPostHandler } from '../../redux/actions/postAction'
import CardProfile from './CardProfile'
import CardImage from './CardImage'
import CardHandler from './CardHandler'

class CardPost extends Component {

    state = {
        commentsVisible: false,
        like: false
    }

    onClickComment = () => {
        this.setState({
            commentsVisible: !this.state.commentsVisible
        })
    }

    onClickPost = () => {
        const comment = {
            message: this.state.message,
            like: 0,
        }
        addcomment(comment, this.props.postId).then(res => {
            this.props.getPosts()
            document.getElementById('message').value = ''
        })
    }

    onChange = (e) => {
        this.setState({
            message: e.target.value
        })
    }
    onClickDeletePost = (e) => {
        deletepost(this.props.postId).then(res => {
            this.props.getPosts(this.props.postId)
        })
    }

    onClickLikeOrDislike = async () => {
        if (this.props.liked) {
           await dislikepost(this.props.postId).then(res => {
                this.setState({
                    like: false
                })
                this.props.getPosts(this.props.id)
              
            }).catch(er => {

            })
        }
        else {
          await likepost(this.props.postId).then(res => {
                this.setState({
                    like: true
                })
                this.props.getPosts(this.props.id)
               

            }).catch(er => {

            })
        }

    }

    render() {

        const { content, user, date, postId, postLike, comments, image, liked } = this.props
        
        let likeSection = (
            <div>
                {this.state.like ? <i className="fas fa-heart mr-1"></i> : <i className="far fa-heart mr-1"></i>}
            </div>
        )
        if (liked) {
            likeSection = (
                <div>
                    {liked ? <i className="fas fa-heart mr-1"></i> : <i className="far fa-heart mr-1"></i>}
                </div>
            )
        }
        return (
            <div className="card mb-2 p-4 shadow">
                <div className="row">
                    <div className="col-md-1">
                        <img
                            className="rounded-circle "
                            width="50"
                            height="50"
                            src={`images/${user.image}` || defaultSource}
                            alt={user.userName}
                            onError={function (event) {
                                event.target.src = defaultSource
                            }} />
                    </div>
                    <div className="col-md-11">
                        <CardProfile user={user} date={date} onClickDeletePost={this.onClickDeletePost} />

                        <p className="text-justify mt-1 ">{content}</p>

                        {image && <CardImage image={image} />}
                    </div>
                </div>
                <hr />

                <CardHandler
                    likeSection={likeSection}
                    postLike={postLike}
                    onClickComment={this.onClickComment}
                    comments={comments}
                    onClickLikeOrDislike={this.onClickLikeOrDislike}
                />

                <hr />
                {this.state.commentsVisible && <div>
                    <CardPostMessageInput
                        onChange={this.onChange}
                        onClickPost={this.onClickPost}
                    />
                    <CardPostComments postId={postId} comments={comments} />
                </div>}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: (userId) => dispatch(loadPostsHandler(userId)),
        getPost: (postId) => dispatch(loadPostHandler(postId))
    }
}
const mapStateToProps = state => {
    return {
        id: state.auth.id,
        posts: state.postReducer,
        currentUsername: state.auth.username
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(CardPost)