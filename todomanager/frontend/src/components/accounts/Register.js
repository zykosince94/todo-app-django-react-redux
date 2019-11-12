import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { registerUser } from '../../actions/auth';

export class Register extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        password2: ''
    }

    static propTypes = {
        registerUser: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    onSubmit = e => {
        e.preventDefault();
        const { username, email, password, password2 } = { ...this.state };

        if (password == password2) {
            this.props.registerUser({ username, email, password });
        } else {
            console.log("Passwords do not match");
        }
    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        const { username, email, password, password2 } = this.state
        return (

            <div className="m-4">
                <div className="card col-4">
                    <div className="card-body">
                        <form className="form-horizontal" onSubmit={this.onSubmit}>

                            <legend>Register</legend>

                            <div className="form-group">
                                <label className=" control-label">Username</label>
                                <div className="">
                                    <input id="username" name="username" type="text" className="form-control input-md" value={username} onChange={this.onChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className=" control-label">Email</label>
                                <div className="">
                                    <input id="email" name="email" type="text" className="form-control input-md" value={email} onChange={this.onChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className=" control-label">Password</label>
                                <div className="">
                                    <input id="password" name="password" type="text" className="form-control input-md" value={password} onChange={this.onChange} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className=" control-label">Confirm Password</label>
                                <div className="">
                                    <input id="password2" name="password2" type="text" className="form-control input-md" value={password2} onChange={this.onChange} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary my-3">Register</button>

                            <p>Already have an account ? <Link to="/login">Login</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { registerUser })(Register)