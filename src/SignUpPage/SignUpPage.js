import React, { Component } from 'react';
import './SignUpPage.css';
import { Link } from 'react-router-dom';
import SleuthHeader from '../SleuthHeader/SleuthHeader';
import SleuthContext from '../SleuthContext';
import config from '../config';
import TokenService from '../token-service';

export default class SignUpPage extends Component {
    state = {
        firstName: '',
        lastName: '',
        userName: '',
        password: '',
        buttonText: 'Sign Up',
        error: null
    };

    static contextType = SleuthContext;

    componentDidMount() {
        if (TokenService.hasAuthToken()) {
            this.props.history.push('/dashboard');
        }
    }

    handleFormSubmission = (e) => {
        e.preventDefault();
        this.setState({
            buttonText: 'Loading...',
            error: null
        });
        const { firstName, lastName, userName, password } = this.state;

        fetch(`${config.API_ENDPOINT}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                user_name: userName,
                password
            })
        })
        .then(res =>
            !res.ok
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        )
        .then(res => {
            this.setState({
                firstName: '',
                lastName: '',
                userName: '',
                password: ''
            });
            this.context.addCurrentUser(res.user);
            TokenService.saveAuthToken(res.authToken);
            this.props.history.push('/dashboard');
        })
        .catch(res => {
            this.setState({
                error: res.error
            });
        })
    }

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
        const { buttonText, error } = this.state;

        return (
            <div className="SignUpPage_main">
                <SleuthHeader />              
                <form className="SignUpPage_form" onSubmit={this.handleFormSubmission}>
                    <fieldset>
                        <legend align="center">Sign Up</legend>
                        <section className="SignUpPage_signup_section">
                            <div role="alert">
					            {error && <p className="red">{error}</p>}
				            </div>  
                            <section className="Signup_first_name">
                                <label htmlFor="SignUpPage_first_name" className="label">First Name</label>
                                <input
                                    id="SignUpPage_first_name"
                                    name="SignUpPage_first_name"
                                    type="text"
                                    placeholder="First name"
                                    required
                                    onChange={this.handleFirstNameChange}
                                />
                            </section>
                            <section className="Signup_last_name">
                                <label htmlFor="SignUpPage_last_name" className="label">Last Name</label>
                                <input
                                    id="SignUpPage_last_name"
                                    name="SignUpPage_last_name"
                                    type="text"
                                    placeholder="Last name"
                                    required
                                    onChange={this.handleLastNameChange}
                                />
                            </section>
                            <section className="Signup_user_name">
                                <label htmlFor="SignUpPage_user_name" className="label">User Name</label>
                                <input
                                    id="SignUpPage_user_name"
                                    name="SignUpPage_user_name"
                                    type="text"
                                    placeholder="User name"
                                    required
                                    onChange={this.handleUserNameChange}
                                />
                            </section>
                            <section className="Signup_password">
                                <label htmlFor="SignUpPage_password" className="label">Password</label>
                                <input
                                    id="SignUpPage_password"
                                    name="SignUpPage_password"
                                    type="password"
                                    placeholder="Password"
                                    required
                                    onChange={this.handlePasswordChange}
                                />
                            </section>
            
                            <button type="submit" className="SignUpPage_signup_button">{buttonText}</button>
                        </section>
                    </fieldset>
                </form>

                <p className="Account_question">Already have an account?<Link to='/login' className="LogIn_link">Log In</Link></p>
            </div>
        );
    }
}