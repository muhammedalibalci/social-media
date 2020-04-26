import React, { Component } from 'react'
import { signup } from '../api/userCalls'
import Input from '../components/Input'
export default class Signup extends Component {
    state = {
        name: undefined,
        lastName: undefined,
        password: undefined,
        username: undefined,
        about: undefined,
        location: undefined,
        token: undefined,
        errors: {}
    }
    onChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
            errors:{}
        })
    }
    onClickSignup = async () => {
        const { name, lastName, username, password, location, about } = this.state
        const { push } = this.props.history
        const user = {
            name,
            lastName,
            username,
            password,
            location,
            about
        }
        console.log(user);
        
        await signup(user).then(res => {
            this.setState({
                isLogin: true
            })
            push("/login")
            window.location.reload()
        }).catch(error => {
            console.log();
            this.setState({
                errors: error.response.data.validationErrors
            })
        })
    }

    render() {
        const { errors } = this.state
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 mt-4">
                    <h3>Sign Up</h3><hr />
                    <form >
                        <Input
                            title="Name"
                            name="name"
                            onChange={this.onChange}
                            type="text"
                            error={errors.name} />
                        <Input
                            title="Last Name"
                            name="lastName"
                            onChange={this.onChange}
                            type="text"
                            error={errors.lastName} />
                        <Input
                            title="User Name"
                            name="username"
                            onChange={this.onChange}
                            type="text"
                            error={errors.userName} />
                        <Input
                            title="About"
                            name="about"
                            onChange={this.onChange}
                            type="text"
                            error={errors.about} />
                        <Input
                            title="Location"
                            name="location"
                            onChange={this.onChange}
                            type="text"
                            error={errors.location}
                        />
                        <Input
                            title="Password"
                            name="password"
                            onChange={this.onChange}
                            type="password"
                            error={errors.password} />
                        <button type="button" className="btn btn-primary" onClick={this.onClickSignup}>Signup</button>
                    </form>
                </div>
            </div>
        )
    }
}
