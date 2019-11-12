
import React, { Component } from 'react';
import List from './List';
import Form from './Form';

export class Dashboard extends Component {
    render() {
        return (
            <div className="m-4">
                <div className="card">
                    <div className="card-body">
                        <Form />
                        <List />
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard
