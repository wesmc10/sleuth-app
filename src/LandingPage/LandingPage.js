import React, { Component } from 'react';
import './LandingPage.css';
import TokenService from '../token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

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
                <FontAwesomeIcon  icon={faUserSecret} className="LandingPage_icon"/>
                <div className="LandingPage_flex_container">
                    <section className="LandingPage_content_section">
                        <h1 className="LandingPage_title">Sleuth</h1>
                        <h2 className="LandingPage_subtitle">A Tracker App for the Job Hunt</h2>
                        <h3 className="LandingPage_tagline">Your job search starts &#x2014; and ends &#x2014; here</h3>
                    </section>
                    <section className="LandingPage_buttons">
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
                    </section>
                </div>
            </div>
        );

    }
}