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

    // close modal if user clicks outside of it
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
                            <legend className="AddJobModal_title" align="center">Add a Job</legend>
                            <section className="AddJobModal_add_job">
                                <button
                                    type="button"
                                    className="close_modal_button"
                                    onClick={this.handleClickCloseModal}>
                                        <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <div role="alert">
                                    {error && <p className="red">{error}</p>}
                                </div>
                                <section className="Add_company">
                                    <label htmlFor="company" className="company add_label">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        placeholder="Company"
                                        required
                                        onChange={this.handleCompanyChange}
                                    />
                                </section>
                                <section className="Add_position">
                                    <label htmlFor="position" className="position add_label">Position</label>
                                    <input
                                        type="text"
                                        id="position"
                                        name="position"
                                        placeholder="Position"
                                        required
                                        onChange={this.handlePositionChange}
                                    />
                                </section>
                                <section className="Add_location">
                                    <label htmlFor="location" className="location add_label">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        placeholder="Location"
                                        required
                                        onChange={this.handleLocationChange}
                                    />
                                </section>                                
                                <section className="Add_dates">
                                    <div className="Row_date_applied">
                                        <label htmlFor="date_applied" className="date_applied add_label">Applied</label>
                                        <input
                                            type="date"
                                            id="date_applied"
                                            name="date_applied"
                                            required
                                            onChange={this.handleDateAppliedChange}
                                        />
                                    </div>
                                    <div className="Row_interview_date">
                                        <label htmlFor="interview_date" className="interview_date add_label">Interview</label>
                                        <input
                                            type="date"
                                            id="interview_date"
                                            name="interview_date"
                                            onChange={this.handleInterviewDateChange}
                                        />
                                    </div>
                                </section>
                                <section className="Add_status_and_salary">
                                    <div className="Row_salary">
                                        <label htmlFor="salary" className="salary add_label">Salary</label>
                                        <input
                                            type="text"
                                            id="salary"
                                            name="salary"
                                            placeholder="Salary"
                                            onChange={this.handleSalaryChange}
                                        />
                                    </div>
                                    <div className="Row_status">
                                        <label htmlFor="application_status" className="application_status add_label">Status</label>
                                        <select id="application_status" onChange={this.handleApplicationStatusChange}>
                                            <option value="Applied">Applied</option>
                                            <option value="Phone">Phone</option>
                                            <option value="On-site">On-site</option>
                                            <option value="Offer">Offer</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </section>
                                <section className="Add_notes">
                                    <label htmlFor="notes" className="notes add_label">Notes</label>
                                    <textarea
                                        type="text"
                                        id="notes"
                                        name="notes"
                                        cols="26"
                                        rows="5"
                                        onChange={this.handleNotesChange}
                                    />
                                </section>

                                <button type="submit" className="AddJobModal_submit_button">Add Job</button>
                            </section>
                        </fieldset>
                    </form>
                </section>
            </div>
        );
    }
}