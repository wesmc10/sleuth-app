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
import SleuthContext from '../SleuthContext';
import DashBoardSearchResults from '../DashBoardSearchResults/DashBoardSearchResults';

export default class UserDashboard extends Component {
    state = {
        showAddJobModal: false,
        showEditJobModal: false,
        showJobModal: false,
        searchValue: '',
        matchingJobs: [],
        today: new Date(),
        error: null
    };

    static contextType = SleuthContext;

    static defaultProps = {
        history: {
            push: () => {}
        },

        location: {
            pathname: () => {}
        }
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
        const matchingJobs = e.target.value
            ? this.context.currentJobs.filter(job => 
                job.company.substring(0, e.target.value.length).toLowerCase() === e.target.value.toLowerCase())
            : []
        ;
        this.setState({
            matchingJobs
        });
    }

    handleAddMatchingJob = (newJob) => {
        this.setState({
            matchingJobs: [
                ...this.state.matchingJobs,
                newJob
            ]
        });
    }

    handleEditMatchingJob = (editedJob) => {
        const newMatchingJobs = this.state.matchingJobs.map(job =>
            job.id === editedJob.id
                ? editedJob
                : job
        );
        this.setState({
            matchingJobs: newMatchingJobs
        });
    }

    handleDeleteAMatchingJob = (jobId) => {
        const matchingJobs = this.state.matchingJobs.filter(job => job.id !== jobId);
        this.setState({
            matchingJobs
        });
    }

    render() {
        const { today, showAddJobModal, showEditJobModal, showJobModal, searchValue, matchingJobs, error } = this.state;
        const renderAddJobModal = showAddJobModal
            ?   <AddJobModal
                    showModal={this.state.showAddJobModal}
                    closeModal={this.handleCloseModal}
                    addJob={this.handleAddMatchingJob}
                />
            :   ''
        ;
        const renderEditJobModal = showEditJobModal
            ?   <EditJobModal
                    showModal={this.state.showEditJobModal}
                    closeModal={this.handleCloseModal}
                    editJob={this.handleEditMatchingJob}
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

        const userDashboard = !searchValue
            ?   <div className="Dashboard_no_search">
                    <SleuthHeader />
                    <div role="alert">
                        {error && <p className="red">{error}</p>}
                    </div>
                    <section className="Search_user_jobs">
                        <label htmlFor="UserDashboard_job_search" className="search label">Search</label>
                        <input
                            type="text"
                            id="UserDashboard_job_search"
                            name="UserDashboard_job_search"
                            placeholder="Company name"
                            onChange={this.handleChangeSearchValue}
                        />
                    </section>
                    <button 
                        type="button"
                        className="UserDashboard_add_job"
                        onClick={() => this.handleShowModal('showAddJobModal', 'add-job')}>
                            <FontAwesomeIcon icon={faPlusSquare} />
                    </button>
                    <div className="UserDashboard_flex_container">
                        <section className="UserDashboard_upcoming flex">
                            <h2 className="Upcoming title">Upcoming</h2>
                            <UpcomingInterviews
                                today={today}
                                displayModal={this.handleShowModal}
                            />
                        </section>
                        <section className="UserDashboard_applied flex">
                            <h2 className="Applied title">Applied</h2>
                            <AppliedJobs
                                displayModal={this.handleShowModal}
                            />
                        </section>
                        <section className="UserDashboard_phone flex">
                            <h2 className="Phone title">Phone</h2>
                            <PhoneInterviews
                                displayModal={this.handleShowModal}
                            />
                        </section>
                        <section className="UserDashboard_technical flex">
                            <h2 className="Technical title">Technical</h2>
                            <TechnicalInterviews
                                displayModal={this.handleShowModal}
                            />
                        </section>
                        <section className="UserDashboard_on_site flex">
                            <h2 className="On_site title">On-site</h2>
                            <OnSiteInterviews
                                displayModal={this.handleShowModal}
                            />
                        </section>
                        <section className="UserDashboard_offers flex">
                            <h2 className="Offers title">Offers</h2>
                            <JobOffers
                                displayModal={this.handleShowModal}
                            />
                        </section>
                        <section className="UserDashboard_rejected flex">
                            <h2 className="Rejected title">Rejected</h2>
                            <JobsRejected
                                displayModal={this.handleShowModal}
                            />
                        </section>
                    </div>
                    {renderAddJobModal}
                    {renderEditJobModal}
                    {renderViewJobModal}
                </div>

            :   <div className="Dashboard_search">
                    <SleuthHeader />
                    <div role="alert">
                        {error && <p className="red">{error}</p>}
                    </div>
                    <section className="Search_user_jobs">
                        <label htmlFor="UserDashboard_job_search" className="search label">Search</label>
                        <input
                            type="text"
                            id="UserDashboard_job_search"
                            name="UserDashboard_job_search"
                            placeholder="Company name"
                            onChange={this.handleChangeSearchValue}
                        />
                    </section>
                    <button 
                        type="button"
                        className="UserDashboard_add_job"
                        onClick={() => this.handleShowModal('showAddJobModal', 'add-job')}>
                            <FontAwesomeIcon icon={faPlusSquare} />
                    </button>
                    <div className="UserDashboard_flex_container">
                        <section className="UserDashboard_upcoming">
                            <h2 className="Search title">Search Results</h2>
                            <DashBoardSearchResults
                                searchResults={matchingJobs}
                                deleteJob={this.handleDeleteAMatchingJob}
                                displayModal={this.handleShowModal}
                            />
                        </section>
                    </div>
                    {renderAddJobModal}
                    {renderEditJobModal}
                    {renderViewJobModal}
                </div>

        return (
            <div className={!searchValue ? "UserDashboard_main" : "UserDashboard_main_search"}>
                {userDashboard}
            </div>
        );
    }
}