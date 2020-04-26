import React, { Component } from 'react'
import defaultSource from '../../assets/profile.png'


export default class CardPostComments extends Component {
   
    render() {
        return (
            <div className="mt-4">
                {this.props.comments.map(comment => {
                    return (
                        <div className="row mt-2" key={comment.id}>
                            <div className="ml-4">
                                <img
                                    className="rounded-circle "
                                    width="30"
                                    height="30"
                                    src={`images/${comment.user.image}` || defaultSource}
                                    alt={comment.user.userName}
                                    onError={function (event) {
                                        event.target.src = defaultSource
                                    }} />
                            </div>
                            <div className="col-md-10 card  ">
                                <div className="card-header">
                                    <span className="font-weight-bold">
                                        {comment.user.name} {comment.user.lastName}

                                    </span>
                                    <span > · {comment.date}</span>
                                </div>

                                <span className="p-2">{comment.message}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
