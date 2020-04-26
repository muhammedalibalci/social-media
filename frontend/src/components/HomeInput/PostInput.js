import React, { Component } from 'react'
import { addpost } from '../../api/postCalls'
import PostInputProfile from './PostInputProfile'
import { loadPostsHandler } from '../../redux/actions/postAction'
import { connect } from 'react-redux'
class PostInput extends Component {
    state = {
        content: '',
        clickToInput: false,
        error: '',
        image: '',
        isError: false
    }

    onClickInput = (e) => {
        this.setState({
            clickToInput: true
        })
    }

    onClickCancel = () => {
        this.setState({
            content: '',
            clickToInput: false,
            isError: false
        })
        document.getElementById("input").value = ''
    }

    onChange = e => {
        this.setState({
            content: e.target.value,
            isError: false
        })
    }

    onClickSend = () => {
        const { content, image } = this.state
        const post = {
            content,
            image: image.split(',')[1],
            userLike: 0
        }

        addpost(post).then((result) => {
            this.props.getPosts()
            this.setState({
                clickToInput: false,
                image: ''
            })
            document.getElementById('input').value = ''
        }).catch((err) => {
            this.setState({
                error: err.response.data.validationErrors.content,
                isError: true
            })

        });
    }

    onChangeFile = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({
                image: fileReader.result
            })
        }
        fileReader.readAsDataURL(file)
    }

    render() {
        const { clickToInput, error, isError } = this.state

        const errorArea = (
            <div class="alert alert-danger" role="alert">
                This input {error}
            </div>
        )

        const buttonsandFile = (
            <div className=" p-2 ">
                <div >
                    <input type="file" className="mb-2" onChange={this.onChangeFile} />
                </div>
                <div className="text-right">
                    <button className="btn btn-danger shadow mr-2" onClick={this.onClickCancel}>CANCEL</button>
                    <button className="btn btn-primary shadow" onClick={this.onClickSend}>POST</button>
                </div>

            </div>
        )
        return (
            <div className="card p-4 shadow">
                <h3
                    className="text-primary"
                    style={
                        {
                            fontFamily: 'Indie Flower',
                            fontSize: 32,
                            fontStyle: "italic",
                            fontWeight: 700
                        }
                    }>Create Post</h3><hr />

                {isError && errorArea}
                <div className="row">
                    <div className="col-md-2">
                        <PostInputProfile />

                    </div>
                    <div className="col-md-10">
                        <div className="input-group input-group-lg  ">
                            <textarea
                                onClick={this.onClickInput}
                                onChange={this.onChange}
                                className="form-control"
                                id="input"
                                style={{ minHeight: "150px", fontSize: 16 }}
                                placeholder="Write anything ..."
                            />
                        </div>
                    </div>

                </div>
                {this.state.image && <img
                    className="mt-2"
                    width="600"
                    height="250"
                    src={this.state.image}
                    alt="" />}
                {clickToInput && buttonsandFile}
            </div>
        )
    }

}


const mapDispatchToProps = dispatch => {
    return {
        getPosts: (posts) => dispatch(loadPostsHandler(posts))
    }
}


export default connect(null, mapDispatchToProps)(PostInput)