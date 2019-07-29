import React, { Component } from 'react';
import './UserDashboard.css';
import SleuthHeader from '../SleuthHeader/SleuthHeader';

export default class UserDashboard extends Component {
    render() {
        return (
            <div className="UserDashboard_main">
                <SleuthHeader />
                <div className="UserDashboard_flex_container">
                    <section className="UserDashboard_upcoming">
                        <h2 className="Upcoming_title">Upcoming Interviews</h2>
                    </section>
                </div>
            </div>
        )
    }
}