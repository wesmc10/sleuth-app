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
import OnSiteInterviews from '../OnSiteInterviews/OnSiteInterviews';
import JobOffers from '../JobOffers/JobOffers';
import JobsRejected from '../JobsRejected/JobsRejected';
import EditJobModal from '../EditJobModal/EditJobModal';

export default class UserDashboard extends Component {
    state = {
        showAddJobModal: false,
        showEditJobModal: false,
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

        if (this.props.location.pathname === '/dashboard/edit-job') {
            this.setState({
                showEditJobModal: true
            });
        }
    }

    handleClickAddJobButton = () => {
        this.props.history.push('/dashboard/add-job');
        this.setState({
            showAddJobModal: true
        });
    }

    handleCloseAddJobModal = () => {
        this.props.history.push('/dashboard');
        this.setState({
            showAddJobModal: false
        });
    }

    handleClickEditJobButton = () => {
        this.props.history.push('/dashboard/edit-job');
        this.setState({
            showEditJobModal: true
        });
    }

    handleCloseEditJobModal = () => {
        this.props.history.push('/dashboard');
        this.setState({
            showEditJobModal: false
        });
    }

    render() {
        const { today, showAddJobModal, showEditJobModal, error } = this.state;
        const renderAddJobModal = showAddJobModal
            ?   <AddJobModal
                    showModal={this.state.showAddJobModal}
                    closeModal={this.handleCloseAddJobModal}
                />
            :   ''
        ;
        const renderEditJobModal = showEditJobModal
            ?   <EditJobModal
                    showModal={this.state.showEditJobModal}
                    closeModal={this.handleCloseEditJobModal}
                />
            :   ''
        ;

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
                            editModal={this.handleClickEditJobButton}
                        />
                    </section>
                    <section className="UserDashboard_applied">
                        <h2 className="UserDashboard_applied_title">Applied</h2>
                        <AppliedJobs
                            editModal={this.handleClickEditJobButton}
                        />
                    </section>
                    <section className="UserDashboard_phone">
                        <h2 className="UserDashboard_phone_title">Phone</h2>
                        <PhoneInterviews
                            editModal={this.handleClickEditJobButton}
                        />
                    </section>
                    <section className="UserDashboard_technical">
                        <h2 className="UserDashboard_technical_title">Technical</h2>
                        <TechnicalInterviews
                            editModal={this.handleClickEditJobButton}
                        />
                    </section>
                    <section className="UserDashboard_on_site">
                        <h2 className="UserDashboard_on_site_title">On-site</h2>
                        <OnSiteInterviews
                            editModal={this.handleClickEditJobButton}
                        />
                    </section>
                    <section className="UserDashboard_offers">
                        <h2 className="UserDashboard_offers_title">Offers</h2>
                        <JobOffers
                            editModal={this.handleClickEditJobButton}
                        />
                    </section>
                    <section className="UserDashboard_rejected">
                        <h2 className="UserDashboard_rejected_title">Rejected</h2>
                        <JobsRejected
                            editModal={this.handleClickEditJobButton}
                        />
                    </section>
                </div>
                {renderAddJobModal}
                {renderEditJobModal}
            </div>
        )
    }
}