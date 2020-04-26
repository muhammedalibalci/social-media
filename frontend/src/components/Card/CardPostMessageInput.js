import React, { Component } from 'react'
import defaultSource from '../../assets/profile.png'
import { connect } from 'react-redux'
class CardPostMessageInput extends Component {
    render() {
        const { onClickPost, onChange } = this.props
        return (
            <div className="row mt-2">
                <img
                    className="rounded-circle ml-5 mr-2"
                    width="20"
                    height="20"
                    src={`images/${this.props.image}` || defaultSource}

                    alt=""
                    onError={function (event) {
                        event.target.src = defaultSource
                    }} />
                <textarea
                    className="form-control  w-75 "
                    rows="2"
                    id="message"
                    onChange={onChange}
                    style={{ border: 0, boxShadow: "none", backgroundColor: "#F0F3F4" }} />
                <p className="mt-4 ml-2 badge badge-primary text-wrap " onClick={onClickPost}>
                    Post</p>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state);

    return {
        username: state.auth.username,
        image: state.auth.image
    }
}

export default connect(mapStateToProps)(CardPostMessageInput)