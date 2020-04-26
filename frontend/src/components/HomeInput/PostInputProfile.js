import React, { Component } from 'react'
import defaultSource from '../../assets/profile.png'
import { connect } from 'react-redux'
class PostInputProfile extends Component {
    render() {
        const { name, image } = this.props
        return (
            <div className="text-center">
                <img
                    className=" rounded-circle mx-auto "
                    width="70"
                    height="70"
                    src={`images/${image}` || defaultSource}
                    alt={name}
                    onError={function (event) {
                        event.target.src = defaultSource
                    }} />
                <div className=" font-size-lg">
                    <span className="text-muted">@{this.props.username}</span>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.username,
        name: state.auth.name,
        image: state.auth.image,
    }
}

export default connect(mapStateToProps)(PostInputProfile)