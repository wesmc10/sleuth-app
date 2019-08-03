import React, { Component } from 'react';
import './AddJobModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import SleuthContext from '../SleuthContext';
import TokenService from '../token-service';

export default class AddJobModal extends Component {
    state = {
        company: '',
        position: '',
        location: '',
        salary: '',
        dateApplied: '',
        interviewDate: '',
        applicationStatus: 'Applied',
        notes: '',
        error: null
    };

    static contextType = SleuthContext;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleClick = (e) => {
        if (!this.node.contains(e.target)) {
            this.setState({
                company: '',
                position: '',
                location: '',
                salary: '',
                dateApplied: '',
                interviewDate: '',
                applicationStatus: 'Applied',
                notes: ''
            });
            this.props.closeModal('showAddJobModal');
        }
    }

    handleClickCloseModal = () => {
        this.setState({
            company: '',
            position: '',
            location: '',
            salary: '',
            dateApplied: '',
            interviewDate: '',
            applicationStatus: 'Applied',
            notes: ''
        });
        this.props.closeModal('showAddJobModal');
    }

    handleFormSubmission = (e) => {
        e.preventDefault();
        this.setState({
            error: null
        });
        const { 
            company,
            position, 
            location, 
            salary, 
            dateApplied, 
            interviewDate,
            applicationStatus, 
            notes 
        } = this.state;
        const newJob = {
            company,
            position,
            job_location: location,
            salary,
            date_applied: dateApplied,
            interview_date: interviewDate,
            application_status: applicationStatus,
            notes,
            user_id: this.context.currentUser.id
        };

        fetch(`${config.API_ENDPOINT}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}` 
            },
            body: JSON.stringify(newJob)
        })
        .then(res =>
            !res.ok
                ? res.json().then(e => Promise.reject(e))
                : res.json()    
        )
        .then(res => {
            this.setState({
                company: '',
                position: '',
                location: '',
                salary: '',
                dateApplied: '',
                interviewDate: '',
                applicationStatus: 'Applied',
                notes: ''
            });
            if (res.interview_date === '1969-12-31' || res.interviewDate === '1970-01-01') {
                res.interview_date = null;
            }
            this.context.addNewJob(res);
            this.props.addJob(res);
            this.props.closeModal('showAddJobModal');
        })
        .catch(res => {
            this.setState({
                error: res.error
            });
        });
    }

    handleCompanyChange = (e) => {
        this.setState({
            company: e.target.value
        });
    }

    handlePositionChange = (e) => {
        this.setState({
            position: e.target.value
        });
    }

    handleLocationChange = (e) => {
        this.setState({
            location: e.target.value
        });
    }

    handleSalaryChange = (e) => {
        this.setState({
            salary: e.target.value
        });
    }

    handleDateAppliedChange = (e) => {
        this.setState({
            dateApplied: e.target.value
        });
    }

    handleInterviewDateChange = (e) => {
        this.setState({
            interviewDate: e.target.value
        });
    }

    handleApplicationStatusChange = (e) => {
        this.setState({
            applicationStatus: e.target.value
        });
    }

    handleNotesChange = (e) => {
        this.setState({
            notes: e.target.value
        });
    }

    render() {
        const { error } = this.state;
        const { showModal } = this.props;
        const showOrHideModal = showModal ? 'Modal display' : 'Modal hide';

        return (
            <div className={showOrHideModal}>
                <section ref={node => this.node = node} className="AddJobModal_section">
                    <form className="AddJobModal_form" onSubmit={this.handleFormSubmission}>
                        <fieldset>
                            <section className="AddJobModal_add_job">
                                <legend className="AddJobModal_title">Add a Job</legend>
                                <button
                                    type="button"
                                    className="close_modal_button"
                                    onClick={this.handleClickCloseModal}>
                                        <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <div role="alert">
                                    {error && <p className="red">{error}</p>}
                                </div>
                                <label htmlFor="company">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    required
                                    onChange={this.handleCompanyChange}
                                />
                                <label htmlFor="position">Position</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    required
                                    onChange={this.handlePositionChange}
                                />
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    required
                                    onChange={this.handleLocationChange}
                                />
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    onChange={this.handleSalaryChange}
                                />
                                <label htmlFor="date_applied">Date Applied</label>
                                <input
                                    type="date"
                                    id="date_applied"
                                    name="date_applied"
                                    required
                                    onChange={this.handleDateAppliedChange}
                                />
                                <label htmlFor="interview_date">Interview Date</label>
                                <input
                                    type="date"
                                    id="interview_date"
                                    name="interview_date"
                                    onChange={this.handleInterviewDateChange}
                                />
                                <label htmlFor="application_status">Application Status</label>
                                <select id="application_status" onChange={this.handleApplicationStatusChange}>
                                    <option value="Applied">Applied</option>
                                    <option value="Phone">Phone</option>
                                    <option value="Technical">Technical</option>
                                    <option value="On-site">On-site</option>
                                    <option value="Offer">Offer</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <label htmlFor="notes">Notes</label>
                                <textarea
                                    type="text"
                                    id="notes"
                                    name="notes"
                                    cols="30"
                                    rows="5"
                                    onChange={this.handleNotesChange}
                                />

                                <button type="submit" className="AddJobModal_submit_button">Add Job</button>
                            </section>
                        </fieldset>
                    </form>
                </section>
            </div>
        );
    }
}