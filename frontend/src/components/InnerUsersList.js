import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import defaultSource from '../assets/profile.png'
export default class InnerUsersList extends Component {
    render() {
        const { users, filter, onChangeSearch } = this.props
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = users.filter(item => {
            return Object.keys(item.name + item.lastName).some(key =>
                (item.name + " " + item.lastName).toLowerCase().includes(lowercasedFilter)
            );
        });

        return (
            <div>

                <div className="input-group input-group-sm mb-3">
                    <div className="input-group-prepend ">
                        <span className="input-group-text text-danger" id="inputGroup-sizing-sm searchInput">Search : </span>
                    </div>
                    <input type="text" onChange={onChangeSearch} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" />
                </div>
                <ul className="list-group">
                    {filteredData.map(user => {
                        return (
                            <li key={user.id} className="list-group-item">
                                <div className="row">
                                    <div className="col-md-8">
                                        <img
                                            className="rounded-circle mr-2"
                                            width="30"
                                            height="30"
                                            src={`images/${user.image}` || defaultSource}
                                            alt={user.userName}
                                            onError={function (event) {
                                                event.target.src = defaultSource
                                            }} />
                                        <span style={{ color: 'black' }}>{user.name} {user.lastName}</span>

                                    </div>
                                    <div className="col-md-4">
                                        {user.visibleFriend && <span>Your Friend</span>}
                                        <Link to={`/profile/${user.username}`}>
                                            <button className="btn btn-primary btn-sm ml-2" onClick={this.onClickFollow}>
                                                Look
                                        </button>
                                        </Link>

                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
