import React, { Component } from 'react';
import './UserDashboard.css';
import SleuthHeader from '../SleuthHeader/SleuthHeader';
import TokenService from '../token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import AddJobModal from '../AddJobModal/AddJobModal';
import UpcomingInterviews from '../UpcomingInterviews/UpcomingInterviews';
import AppliedJobs from '../AppliedJobs/AppliedJobs';
import PhoneInterviews from '../PhoneInterviews/PhoneInterviews';
import TechnicalInterviews from '../TechnicalInterviews/TechnicalInterviews';

export default class UserDashboard extends Component {
    state = {
        showAddJobModal: false,
        today: new Date(),
        error: null
    };

    componentDidMount() {
        if (!TokenService.hasAuthToken()) {
            this.props.history.push('/');
        }

        if (this.props.location.pathname === '/dashboard/add-job') {
            this.setState({
                showAddJobModal: true
            });
        }
    }

    handleClickAddJobButton = () => {
        this.props.history.push('/dashboard/add-job');
        this.setState({
            showAddJobModal: true
        });
    }

    handleCloseModal = () => {
        this.props.history.push('/dashboard');
        this.setState({
            showAddJobModal: false
        });
    }

    render() {
        const { today, error } = this.state;

        return (
            <div className="UserDashboard_main">
                <SleuthHeader />
                <div role="alert">
					{error && <p className="red">{error}</p>}
				</div>
                <button 
                    type="button"
                    className="UserDashboard_add_job"
                    onClick={this.handleClickAddJobButton}>
                        <FontAwesomeIcon icon={faPlusSquare} />
                </button>
                <div className="UserDashboard_flex_container">
                    <section className="UserDashboard_upcoming">
                        <h2 className="Upcoming_title">Upcoming Interviews</h2>
                        <UpcomingInterviews
                            today={today}
                        />
                    </section>
                    <section className="UserDashboard_applied">
                        <h2 className="UserDashboard_applied_title">Applied</h2>
                        <AppliedJobs />
                    </section>
                    <section className="UserDashboard_phone">
                        <h2 className="UserDashboard_phone_title">Phone</h2>
                        <PhoneInterviews />
                    </section>
                    <section className="UserDashboard_technical">
                        <h2 className="UserDashboard_technical_title">Technical</h2>
                        <TechnicalInterviews />
                    </section>
                </div>
                <AddJobModal
                    showModal={this.state.showAddJobModal}
                    closeModal={this.handleCloseModal}
                />
            </div>
        )
    }
}