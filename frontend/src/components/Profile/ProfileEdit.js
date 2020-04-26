import React, { Component } from 'react'
import Input from '../Input'

export default class ProfileEdit extends Component {
    render() {
        const { name, lastName, username,
            about, location, onChange,
            onClickUpdate, onChangeFile, onClickCancel } = this.props
            
        return (
            <div className="w-100">
                <p>Image</p><input type="file" className="mb-2" onChange={onChangeFile} />

                <Input title="Name" name="name" onChange={onChange} type="text" value={name} />
                <Input title="Last Name" name="lastName" onChange={onChange} type="text" value={lastName} />
                <Input title="User Name" name="username" onChange={onChange} type="text" value={username} />
                <Input title="About" name="about" onChange={onChange} type="text" value={about} />
                <Input title="Location" name="location" onChange={onChange} type="text" value={location} />
                <div className="float-right">
                    <button className="btn btn-danger  mr-2" onClick={onClickCancel}>Cancel</button>
                    <button className="btn btn-primary  " onClick={onClickUpdate}>Update</button>
                </div>
            </div>
        )
    }
}
