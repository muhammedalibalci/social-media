import React, { Component } from 'react'
import PostInput from '../components/HomeInput/PostInput'
import PostList from '../components/PostList'
import UsersList from '../components/UsersList'
import { connect } from 'react-redux'
import { loadUserHandler } from '../redux/actions/userAction'

class Home extends Component {

    componentDidMount(){
       this.loadUser()
    }
    loadUser =async()=>{
        if (this.props.isLogin) {
          await  this.props.getUser(this.props.username)
        }
    }

    render() {
        
        let initialSection = (
            <div className="col-md-7">
                <PostInput />
                <PostList username={this.props.username} />
            </div>
        )
        if (!this.props.isLogin ) {
           initialSection=  <div className="col-md-7">Please! Login</div>
        }
        return (
            <div className="row mt-5">
                {initialSection}
                <div className="col-md-5">
                    <UsersList />
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getUser: (username) => dispatch(loadUserHandler(username))
    }
}
const mapStateToProps = state => {

    return {
        isLogin: state.auth.isLogin,
        username:state.auth.username,
        posts:state.postReducer
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Home)
