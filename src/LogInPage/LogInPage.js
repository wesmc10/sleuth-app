import React from 'react';
import './LogInPage.css';
import { Link } from 'react-router-dom';
import SleuthHeader from '../SleuthHeader/SleuthHeader';

export default function LogInPage() {
    return (
        <div className="LogInPage_main">
            <SleuthHeader />
            <section className="LogInPage_login_section">
                <label htmlFor="LoginPage_user_name" />
                <input
                    id="LoginPage_user_name"
                    name="LoginPage_user_name"
                    type="text"
                    placeholder="User name"
                    required
                />
                <label htmlFor="LoginPage_password" />
                <input
                    id="LoginPage_password"
                    name="LoginPage_password"
                    type="password"
                    placeholder="Password"
                    required
                />

                <button type="submit" className="LogInPage_login_button">Log In</button>

                <p>Don't have an account?</p><Link>Sign Up</Link>
            </section>
        </div>
    );
}