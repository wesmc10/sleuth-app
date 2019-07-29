import React, { Component } from 'react';
import './SignUpPage.css';
import { Link } from 'react-router-dom';
import SleuthHeader from '../SleuthHeader/SleuthHeader';

export default class SignUpPage extends Component {
    state = {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        error: null
    };

    handleFirstNameChange = (e) => {
        this.setState({
            firstName: e.target.value
        });
    }

    handleLastNameChange = (e) => {
        this.setState({
            lastName: e.target.value
        });
    }

    handleUserNameChange = (e) => {
        this.setState({
            userName: e.target.value
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            password: e.target.value
        });
    }

    render() {
        const { error } = this.state;

        return (
            <div className="SignUpPage_main">
                <SleuthHeader />
                <div role="alert">
					{error && <p className="red">{error}</p>}
				</div>
                <section className="SignUpPage_signup_section">
                    <label htmlFor="SignUpPage_first_name" />
                    <input
                        id="SignUpPage_first_name"
                        name="SignUpPage_first_name"
                        type="text"
                        placeholder="First name"
                        required
                        onChange={this.handleFirstNameChange}
                    />
                    <label htmlFor="SignUpPage_last_name" />
                    <input
                        id="SignUpPage_last_name"
                        name="SignUpPage_last_name"
                        type="text"
                        placeholder="Last name"
                        required
                        onChange={this.handleLastNameChange}
                    />
                    <label htmlFor="SignUpPage_user_name" />
                    <input
                        id="SignUpPage_user_name"
                        name="SignUpPage_user_name"
                        type="text"
                        placeholder="User name"
                        required
                        onChange={this.handleUserNameChange}
                    />
                    <label htmlFor="SignUpPage_password" />
                    <input
                        id="SignUpPage_password"
                        name="SignUpPage_password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={this.handlePasswordChange}
                    />
    
                    <button type="submit" className="SignUpPage_signup_button">Sign Up</button>
    
                    <p className="Account_question">Don't have an account?<Link to='/login' className="LogIn_link">Log In</Link></p>
                </section>
            </div>
        );
    }
}