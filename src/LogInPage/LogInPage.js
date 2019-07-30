import React,{ Component } from 'react';
import './LogInPage.css';
import { Link } from 'react-router-dom';
import SleuthHeader from '../SleuthHeader/SleuthHeader';
import SleuthContext from '../SleuthContext';
import TokenService from '../token-service';

export default class LogInPage extends Component {
    state = {
        userName: '',
        password: '',
        error: null
    };

    static contextType = SleuthContext;

    componentDidMount() {
        if (TokenService.hasAuthToken()) {
            this.props.history.push('/dashboard');
        }
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
            <div className="LogInPage_main">
                <SleuthHeader />
                <div role="alert">
					{error && <p className="red">{error}</p>}
				</div>
                <section className="LogInPage_login_section">
                    <label htmlFor="LoginPage_user_name" />
                    <input
                        id="LoginPage_user_name"
                        name="LoginPage_user_name"
                        type="text"
                        placeholder="User name"
                        required
                        onChange={this.handleUserNameChange}
                    />
                    <label htmlFor="LoginPage_password" />
                    <input
                        id="LoginPage_password"
                        name="LoginPage_password"
                        type="password"
                        placeholder="Password"
                        required
                        onChange={this.handlePasswordChange}
                    />
    
                    <button type="submit" className="LogInPage_login_button">Log In</button>
    
                    <p className="Account_question">Don't have an account?<Link to='/signup' className="SignUp_link">Sign Up</Link></p>
                </section>
            </div>
        );
    }
}