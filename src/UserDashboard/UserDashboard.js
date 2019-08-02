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
import ViewJobModal from '../ViewJobModal/ViewJobModal';

export default class UserDashboard extends Component {
    state = {
        showAddJobModal: false,
        showEditJobModal: false,
        showJobModal: false,
        searchValue: '',
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

        if (this.props.location.pathname === '/dashboard/job') {
            this.setState({
                showJobModal: true
            });
        }
    }

    handleShowModal = (key, route) => {
        this.props.history.push(`/dashboard/${route}`);
        this.setState({
            [key]: true
        });
    }

    handleCloseModal = (key) => {
        this.props.history.push('/dashboard');
        this.setState({
            [key]: false
        });
    }

    handleChangeSearchValue = (e) => {
        this.setState({
            searchValue: e.target.value
        });
    }

    render() {
        const { today, showAddJobModal, showEditJobModal, showJobModal, error } = this.state;
        const renderAddJobModal = showAddJobModal
            ?   <AddJobModal
                    showModal={this.state.showAddJobModal}
                    closeModal={this.handleCloseModal}
                />
            :   ''
        ;
        const renderEditJobModal = showEditJobModal
            ?   <EditJobModal
                    showModal={this.state.showEditJobModal}
                    closeModal={this.handleCloseModal}
                />
            :   ''
        ;
        const renderViewJobModal = showJobModal
            ?   <ViewJobModal
                    showModal={this.state.showJobModal}
                    closeModal={this.handleCloseModal}
                />
            :   ''
        ;

        return (
            <div className="UserDashboard_main">
                <SleuthHeader />
                <div role="alert">
					{error && <p className="red">{error}</p>}
				</div>
                <div className="UserDashboard_flex_header">
                    <label htmlFor="UserDashboard_job_search">Search</label>
                    <input
                        type="text"
                        id="UserDashboard_job_search"
                        name="UserDashboard_job_search"
                        placeholder="Facebook"
                        onChange={this.handleChangeSearchValue}
                    />
                    <button 
                        type="button"
                        className="UserDashboard_add_job"
                        onClick={() => this.handleShowModal('showAddJobModal', 'add-job')}>
                            <FontAwesomeIcon icon={faPlusSquare} />
                    </button>
                </div>
                <div className="UserDashboard_flex_container">
                    <section className="UserDashboard_upcoming">
                        <h2 className="Upcoming_title">Upcoming Interviews</h2>
                        <UpcomingInterviews
                            today={today}
                            displayModal={this.handleShowModal}
                        />
                    </section>
                    <section className="UserDashboard_applied">
                        <h2 className="UserDashboard_applied_title">Applied</h2>
                        <AppliedJobs
                            displayModal={this.handleShowModal}
                        />
                    </section>
                    <section className="UserDashboard_phone">
                        <h2 className="UserDashboard_phone_title">Phone</h2>
                        <PhoneInterviews
                            displayModal={this.handleShowModal}
                        />
                    </section>
                    <section className="UserDashboard_technical">
                        <h2 className="UserDashboard_technical_title">Technical</h2>
                        <TechnicalInterviews
                            displayModal={this.handleShowModal}
                        />
                    </section>
                    <section className="UserDashboard_on_site">
                        <h2 className="UserDashboard_on_site_title">On-site</h2>
                        <OnSiteInterviews
                            displayModal={this.handleShowModal}
                        />
                    </section>
                    <section className="UserDashboard_offers">
                        <h2 className="UserDashboard_offers_title">Offers</h2>
                        <JobOffers
                            displayModal={this.handleShowModal}
                        />
                    </section>
                    <section className="UserDashboard_rejected">
                        <h2 className="UserDashboard_rejected_title">Rejected</h2>
                        <JobsRejected
                            displayModal={this.handleShowModal}
                        />
                    </section>
                </div>
                {renderAddJobModal}
                {renderEditJobModal}
                {renderViewJobModal}
            </div>
        )
    }
}