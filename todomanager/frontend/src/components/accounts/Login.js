import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {login} from '../../actions/auth';

export class Login extends Component {
    state = {
        username : '',
        password : '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        if(this.props.isAuthenticated){
            return <Redirect to="/" />
        }
        const { username, password } = this.state
        return (
            <div className="m-4">
                <div className="card col-4">
                    <div className="card-body">
                        <form className="form-horizontal" onSubmit={this.onSubmit}>

                            <legend>Login</legend>

                            <div className="form-group">
                                <label className="control-label">Username</label>
                                <div>
                                    <input id="username" name="username" type="text" className="form-control input-md" value={username} onChange={this.onChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Password</label>
                                <div>
                                    <input id="password" name="password" type="text" className="form-control input-md" value={password} onChange={this.onChange} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary my-3">Login</button>

                            <p>Don't have an account ? <Link to="/register">Register</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated : state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)
