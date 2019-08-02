import React, { Component } from 'react';
import './EditJobModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import SleuthContext from '../SleuthContext';
import TokenService from '../token-service';

export default class EditJobModal extends Component {
    state = {
        company: '',
        position: '',
        location: '',
        salary: '',
        dateApplied: '',
        interviewDate: '',
        applicationStatus: '',
        notes: '',
        error: null
    };

    static contextType = SleuthContext;

    componentDidMount() {
        if (!TokenService.hasAuthToken()) {
            this.props.history.push('/');
        }

        document.addEventListener('mousedown', this.handleClick);

        let clickedJob = sessionStorage.getItem('clickedJob');
        clickedJob = JSON.parse(clickedJob);

        this.setState({
            company: clickedJob ? clickedJob.company : '',
            position: clickedJob ? clickedJob.position : '',
            location: clickedJob ? clickedJob.job_location : '',
            salary: clickedJob ? clickedJob.salary : '',
            dateApplied: clickedJob ? clickedJob.date_applied : '',
            interviewDate: clickedJob ? clickedJob.interview_date : '',
            applicationStatus: clickedJob ? clickedJob.application_status : '',
            notes: clickedJob ? clickedJob.notes : ''
        });
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
                applicationStatus: '',
                notes: ''
            });
            this.props.closeModal('showEditJobModal');
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
            applicationStatus: '',
            notes: ''
        });
        this.props.closeModal('showEditJobModal');
    }

    handleFormSubmission = (e) => {
        e.preventDefault();
        this.setState({
            error: null
        });

        let clickedJob = sessionStorage.getItem('clickedJob');
        clickedJob = JSON.parse(clickedJob);

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
        const editedJob = {
            company,
            position,
            job_location: location,
            salary,
            date_applied: dateApplied,
            interview_date: interviewDate,
            application_status: applicationStatus,
            notes
        };

        fetch(`${config.API_ENDPOINT}/jobs/${clickedJob.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}` 
            },
            body: JSON.stringify(editedJob)
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }   
        })
        .then(noContent => {
            this.setState({
                company: '',
                position: '',
                location: '',
                salary: '',
                dateApplied: '',
                interviewDate: '',
                applicationStatus: '',
                notes: ''
            });
            this.context.editJob({
                ...editedJob,
                id: clickedJob.id
            });
            this.props.closeModal('showEditJobModal');
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
        const { 
            company, 
            position, 
            location, 
            salary, 
            dateApplied, 
            interviewDate,
            applicationStatus,
            notes, 
            error 
        } = this.state;
        const { showModal } = this.props;
        const showOrHideModal = showModal ? 'Modal display' : 'Modal hide';

        return (
            <div className={showOrHideModal}>
                <section ref={node => this.node = node} className="EditJobModal_section">
                    <form className="EditJobModal_form" onSubmit={this.handleFormSubmission}>
                        <fieldset>
                            <section className="EditJobModal_add_job">
                                <legend className="EditJobModal_title">Edit Job</legend>
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
                                    value={company}
                                    required
                                    onChange={this.handleCompanyChange}
                                />
                                <label htmlFor="position">Position</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    value={position}
                                    required
                                    onChange={this.handlePositionChange}
                                />
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={location}
                                    required
                                    onChange={this.handleLocationChange}
                                />
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={salary}
                                    onChange={this.handleSalaryChange}
                                />
                                <label htmlFor="date_applied">Date Applied</label>
                                <input
                                    type="date"
                                    id="date_applied"
                                    name="date_applied"
                                    value={dateApplied}
                                    required
                                    onChange={this.handleDateAppliedChange}
                                />
                                <label htmlFor="interview_date">Interview Date</label>
                                <input
                                    type="date"
                                    id="interview_date"
                                    name="interview_date"
                                    value={interviewDate}
                                    onChange={this.handleInterviewDateChange}
                                />
                                <label htmlFor="application_status">Application Status</label>
                                <select 
                                    id="application_status" 
                                    value={applicationStatus} 
                                    onChange={this.handleApplicationStatusChange}>
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
                                    value={notes}
                                    cols="30"
                                    rows="5"
                                    onChange={this.handleNotesChange}
                                />

                                <button type="submit" className="EditJobModal_submit_button">Edit Job</button>
                            </section>
                        </fieldset>
                    </form>
                </section>
            </div>
        );
    }
}