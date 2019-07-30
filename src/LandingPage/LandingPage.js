import React, { Component } from 'react';
import './LandingPage.css';
import TokenService from '../token-service';

export default class LandingPage extends Component {
    componentDidMount() {
        if (TokenService.hasAuthToken()) {
            this.props.history.push('/dashboard');
        }
    }

    handleClickLogin = () => {
        this.props.history.push('/login');
    }

    handleClickSignUp = () => {
        this.props.history.push('/signup');
    }

    render() {

        return (
            <div className="LandingPage_main">
                <div className="LandingPage_flex_container">
                    <h1 className="LandingPage_title">Sleuth</h1>
                    <h2 className="LandingPage_subtitle">A Tracker App for the Job Hunt</h2>
                    <h3 className="LandingPage_tagline">Your job search starts &#x2014; and ends &#x2014; here</h3>
    
                    <button 
                        type="button" 
                        className="LandingPage_login_button"
                        onClick={this.handleClickLogin}>
                            Login
                    </button>
                    <button 
                        type="button" 
                        className="LandingPage_signup_button"
                        onClick={this.handleClickSignUp}>
                            Sign Up
                    </button>
                </div>
            </div>
        );

    }
}