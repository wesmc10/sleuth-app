import React, { Component } from 'react';
import './UserDashboard.css';
import SleuthHeader from '../SleuthHeader/SleuthHeader';
import TokenService from '../token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import AddJobModal from '../AddJobModal/AddJobModal';
import dateFns from 'date-fns';

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
        let currentJobs = sessionStorage.getItem('currentJobs');
        let upcomingInterviewsSection;

        if (currentJobs) {
            currentJobs = currentJobs && JSON.parse(currentJobs);

            let upcomingInterviews = currentJobs.filter(job => 
                dateFns.parse(job.interview_date) >= today && dateFns.parse(job.interview_date) <= dateFns.addDays(today, 7)
            );
            upcomingInterviews = upcomingInterviews.map(interview => 
                <div className="User_job_interview" key={interview.id}>
                    <h4>{`${interview.position} at ${interview.company}`}</h4>
                    <p>{interview.interview_date}</p>
                </div>    
            );
            upcomingInterviewsSection = 
                <section className="UserDashboard_upcoming">
                    <h2 className="Upcoming_title">Upcoming Interviews</h2>
                    {upcomingInterviews}
                </section>
            ;
        }

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
                    {upcomingInterviewsSection}
                </div>
                <AddJobModal
                    showModal={this.state.showAddJobModal}
                    closeModal={this.handleCloseModal}
                />
            </div>
        )
    }
}