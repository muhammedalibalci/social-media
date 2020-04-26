import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
class TopBar extends Component {

    onClickLogout = () => {
        localStorage.clear("token")
        window.location.reload()
    }

    render() {
        
        let rightMenu = (
            <div className="form-inline my-2 my-lg-0">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">
                            <i className="fas fa-home"></i> Home
                            </Link>
                    </li>
                    <li className="nav-item active ">
                        <Link className="nav-link" to="/login">
                            Login
                        </Link>
                    </li>
                    <li className="nav-item active">
                        <Link className="nav-link" to="/sign-up">Signup</Link>
                    </li>
                </ul>
            </div>

        )

        if (this.props.isLogin) {
            rightMenu = (
                <div className="form-inline my-2 my-lg-0">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
                        <li className="nav-item active" >
                            <Link className="nav-link" to="/" >
                                <i className="fas fa-home " ></i> Home
                            </Link>
                        </li>
                        <li className="nav-item active ">
                            <Link className="nav-link"                           
                                 to={`/profile/${this.props.username}`}>
                                <i className="fas fa-user"></i> {this.props.username} Profile
                            </Link>
                        </li>
                        <li className="nav-item active" onClick={this.onClickLogout}>
                            <Link className="nav-link" to="/">
                                <i className="fas fa-sign-out-alt"></i> Log-out
                            </Link>
                        </li>
                    </ul>
                </div>
            )
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-primary p-3 shadow" style={{fontFamily: 'Indie Flower',fontSize:18}}>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active mr-5" style={{fontSize:24}}>
                            <Link className="nav-link" to="/">
                                <i className="fas fa-allergies"></i> Social Media
                            </Link>
                        </li>

                    </ul>
                    <div >
                        {rightMenu}
                    </div>

                </div>

            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        isLogin: state.auth.isLogin
    }
}

export default withRouter(connect(mapStateToProps)(TopBar))