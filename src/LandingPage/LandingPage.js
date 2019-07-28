import React from 'react';
import './LandingPage.css';

export default function LandingPage() {
    return (
        <div className="LandingPage_main">
            <div className="LandingPage_flex_container">
                <h1 className="LandingPage_title">Sleuth</h1>
                <h2 className="LandingPage_subtitle">A Tracker App for the Job Hunt</h2>
                <h3 className="LandingPage_tagline">Your job search starts &#x2014; and ends &#x2014; here</h3>

                <button type="submit" className="LandingPage_login_button">Login</button>
                <button type="submit" className="LandingPage_signup_button">Sign Up</button>
            </div>
        </div>
    );
}