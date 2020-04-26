import React, { Component } from 'react'
import { updateuser, getuser  } from '../api/userCalls'
import { connect } from 'react-redux'
import ProfileSection from '../components/Profile/ProfileSection'
import UserPosts from '../components/Profile/UserPosts'
import '../assets/index.css'

class Profile extends Component {

    state = {
        id: "",
        username: "",
        name: "",
        lastName: "",
        image: "",
        about: "",
        location: "",
        editVisible: false,
        newImage: "",
        pendingApiCall:true
    }

    componentDidMount() {
        const username = this.props.match.params.username
        this.loadUser(username)
    }
   
    componentWillReceiveProps(prevProps){
        const {username} = prevProps.match.params
        if (username !== this.state.username) {
            this.loadUser(username)
        }
        
    }

    loadUser= async(username)=>{
       await getuser(username).then(res => {
            this.setState({
                id: res.data.id,
                name: res.data.name,
                username: res.data.userName,
                lastName: res.data.lastName,
                image: res.data.image,
                about: res.data.about,
                location: res.data.location,
                pendingApiCall:false
            })
        })
    }
    onClickUpdate = async () => {
        const { id, name, lastName, username, about, location, newImage } = this.state
        let image
        if (newImage) {
            image = newImage.split(',')[1]
        }
        const user = {
            id,
            name,
            lastName,
            username,
            about,
            location,
            image,
        }
        
        await updateuser(user).then(res => {
            window.location.reload()
        }).catch(er=>{console.log(er.response)})
    }
    onChangeFile = (e) => {
        const file = e.target.files[0]
        const fileReader = new FileReader()
        fileReader.onloadend = () => {
            this.setState({
                newImage: fileReader.result
            })
        }
        fileReader.readAsDataURL(file)
    }
    onChange = (e) => {
        let { value, name } = e.target
        this.setState({
            [name]: value
        })
    }
    onClickEditButton = () => {
        this.setState({
            editVisible: true
        })
    }

    onClickCancel = () => {
        this.setState({
            editVisible: false
        })
    }

    render() {
        const {pendingApiCall,id} = this.state
        const user = {
            id : this.state.id,
            name: this.state.name,
            lastName: this.state.lastName,
            username: this.state.username,
            image: this.state.image,
            about: this.state.about,
            location: this.state.location,
            editVisible: this.state.editVisible,
            newImage: this.state.newImage,
        }

        return (
            <div className="mt-4 ">

                <div className="row">
                    <div className="col-md-4 mt-2">
                        {!pendingApiCall ? <ProfileSection
                            user={user}
                            onClickEditButton={this.onClickEditButton}
                            onClickUpdate={this.onClickUpdate}
                            onChangeFile={this.onChangeFile}
                            onChange={this.onChange}
                            onClickCancel={this.onClickCancel}
                        />: <div className="circle mx-auto mt-4"></div>}
                    </div>
                    <div className="col-md-8">
                        <UserPosts userId={id} />
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.username
    }
}

export default connect(mapStateToProps)(Profile)