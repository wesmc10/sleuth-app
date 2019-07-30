import React,{ Component } from 'react';
import './LogInPage.css';
import { Link } from 'react-router-dom';
import SleuthHeader from '../SleuthHeader/SleuthHeader';
import SleuthContext from '../SleuthContext';
import TokenService from '../token-service';
import config from '../config';

export default class LogInPage extends Component {
    state = {
        userName: '',
        password: '',
        buttonText: 'Log In',
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
        const { userName, password } = this.state;

        fetch(`${config.API_ENDPOINT}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
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
                userName: '',
                password: ''
            });
            this.context.addCurrentUser(res.dbUser);
            if (res.dbUserJobs) {
                this.context.addCurrentJobs(res.dbUserJobs);
                TokenService.saveAuthToken(res.authToken);
                this.props.history.push('/dashboard');
            } else {
                TokenService.saveAuthToken(res.authToken);
                this.props.history.push('/dashboard');
            }
        })
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
            <div className="LogInPage_main">
                <SleuthHeader />
                <form className="LogInPage_form" onSubmit={this.handleFormSubmission}>
                    <fieldset>
                        <section className="LogInPage_login_section">
                            <legend>Log In Form</legend>
                            <div role="alert">
                                {error && <p className="red">{error}</p>}
                            </div>
                            <label htmlFor="LoginPage_user_name">User Name</label>
                            <input
                                id="LoginPage_user_name"
                                name="LoginPage_user_name"
                                type="text"
                                placeholder="User name"
                                required
                                onChange={this.handleUserNameChange}
                            />
                            <label htmlFor="LoginPage_password">Password</label>
                            <input
                                id="LoginPage_password"
                                name="LoginPage_password"
                                type="password"
                                placeholder="Password"
                                required
                                onChange={this.handlePasswordChange}
                            />
            
                            <button type="submit" className="LogInPage_login_button">{buttonText}</button>            
                        </section>
                    </fieldset>
                </form>

                <p className="Account_question">Don't have an account?<Link to='/signup' className="SignUp_link">Sign Up</Link></p>
            </div>
        );
    }
}