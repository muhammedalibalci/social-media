import React, { Component } from 'react'
import Input from '../components/Input'
import { login } from '../api/userCalls'


export default class Login extends Component {
    state = {
        userName: '',
        password: ''
    }
    onChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    onClickLogin = async () => {
        const { userName, password } = this.state
        const { push } = this.props.history
        const user = {
            userName,
            password
        }
        await login(user).then(res => {
            localStorage.setItem("token", res.data.accessToken)
            push("/")
            window.location.reload()
        }).then(er => {
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6 mt-4">
                    <h3>Login</h3><hr />
                    <form >
                        <Input title="User Name" name="userName" onChange={this.onChange} type="text" />
                        <Input title="Password" name="password" onChange={this.onChange} type="password" />
                        <button type="button" className="btn btn-primary" onClick={this.onClickLogin}>Login</button>
                    </form>
                </div>
            </div>
        )
    }
}
