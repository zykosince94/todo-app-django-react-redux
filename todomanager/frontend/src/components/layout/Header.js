import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import {logout} from '../../actions/auth';

export class Header extends Component {
    static propTypes = {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <span className="navbar-text mr-3">
                    <strong>{user ? `Welcome ${user.username}` : ""}</strong>
                </span>
                <li className="nav-item">
                    <span className="btn btn-link" onClick={this.props.logout}>
                        Logout
                    </span>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <span className="nav-link">
                        <Link to="/login">Login</Link>
                    </span>
                </li>

                <li className="nav-item">
                    <span className="nav-link">
                        <Link to="/register">Register</Link>
                    </span>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <a className="navbar-brand" href="#">TO DO Manager</a>
                <span className="mx-2 text-muted">by Rishabh Pandey (zykoksince94@gmail.com)</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">

                {isAuthenticated ? authLinks : guestLinks}

                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.authReducer
})

export default connect(mapStateToProps, {logout})(Header)
