import React, { Component } from 'react'

export default class Input extends Component {
    render() {
        const { name, type, onChange, title, value, error } = this.props
        let errorCheck = (
            <div></div>
        )
        let className = "form-control "
        if (error !== undefined) {
            className = "form-control is-invalid"
            errorCheck = (
                <div className="invalid-feedback">{title} {error}</div>
            )
        }
        return (
            <div className="form-group">
                <label >{title}</label>
                <input
                    type={type}
                    className={className}
                    name={name}
                    onChange={onChange}
                    value={value} />
                {errorCheck}
            </div>
        )
    }
}
