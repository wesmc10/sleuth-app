import React, { Component } from 'react';
import './EditJobModal.css';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import SleuthContext from '../SleuthContext';
import TokenService from '../token-service';

class EditJobModal extends Component {
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

        let clickedJob = sessionStorage.getItem('clickedJob');
        clickedJob = JSON.parse(clickedJob);

        // do not open modal to edit job if the user has not clicked on a job
        // for use if user searches edit job route
        if (clickedJob && Object.entries(clickedJob).length === 0) {
            this.props.closeModal('showEditJobModal');
            this.props.history.push('/dashboard');
        }

        document.addEventListener('mousedown', this.handleClick);

        this.setState({
            company: clickedJob ? clickedJob.company : '',
            position: clickedJob ? clickedJob.position : '',
            location: clickedJob ? clickedJob.job_location : '',
            salary: clickedJob ? clickedJob.salary : '',
            dateApplied: clickedJob ? clickedJob.date_applied : '',
            // since values for state shouldn't be null, we check to see if there's a clickedJob,
            // and if so we check to see if it has an interview date. If so, we return the date, and if
            // not, we return an empty string rather than null
            interviewDate: clickedJob 
                ? clickedJob.interview_date 
                    ? clickedJob.interview_date 
                    : '' 
                : ''
            ,
            applicationStatus: clickedJob ? clickedJob.application_status : '',
            notes: clickedJob ? clickedJob.notes : ''
        });
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
                applicationStatus: '',
                notes: ''
            });
            this.props.closeModal('showEditJobModal');
            this.context.addClickedJob({});
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
        this.context.addClickedJob({});
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
            this.props.editJob({
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
                            <legend className="EditJobModal_title" align="center">Edit Job</legend>
                            <section className="EditJobModal_edit_job">
                                <button
                                    type="button"
                                    className="close_modal_button"
                                    onClick={this.handleClickCloseModal}>
                                        <FontAwesomeIcon icon={faTimes} />
                                </button>
                                <div role="alert">
                                    {error && <p className="red">{error}</p>}
                                </div>
                                <section className="Edit_company">
                                    <label htmlFor="company" className="company edit_label">Company</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        value={company}
                                        required
                                        onChange={this.handleCompanyChange}
                                    />
                                </section>
                                <section className="Edit_position">
                                    <label htmlFor="position" className="position edit_label">Position</label>
                                    <input
                                        type="text"
                                        id="position"
                                        name="position"
                                        value={position}
                                        required
                                        onChange={this.handlePositionChange}
                                    />
                                </section>
                                <section className="Edit_location">
                                    <label htmlFor="location" className="location edit_label">Location</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={location}
                                        required
                                        onChange={this.handleLocationChange}
                                    />
                                </section>
                                <section className="Edit_dates">
                                    <div className="Row_date_applied">
                                        <label htmlFor="date_applied" className="date_applied edit_label">Applied</label>
                                        <input
                                            type="date"
                                            id="date_applied"
                                            name="date_applied"
                                            value={dateApplied}
                                            required
                                            onChange={this.handleDateAppliedChange}
                                        />
                                    </div>
                                    <div className="Row_interview_date">
                                        <label htmlFor="interview_date" className="interview_date edit_label">Interview</label>
                                        <input
                                            type="date"
                                            id="interview_date"
                                            name="interview_date"
                                            value={interviewDate}
                                            onChange={this.handleInterviewDateChange}
                                        />
                                    </div>
                                </section>
                                <section className="Edit_status_and_salary">
                                    <div className="Row_salary">
                                        <label htmlFor="salary" className="salary edit_label">Salary</label>
                                        <input
                                            type="text"
                                            id="salary"
                                            name="salary"
                                            value={salary}
                                            onChange={this.handleSalaryChange}
                                        />
                                    </div>
                                    <div className="Row_status">
                                        <label htmlFor="application_status" className="application_status edit_label">Status</label>
                                        <select 
                                            id="application_status" 
                                            value={applicationStatus} 
                                            onChange={this.handleApplicationStatusChange}>
                                                <option value="Applied">Applied</option>
                                                <option value="Phone">Phone</option>
                                                <option value="On-site">On-site</option>
                                                <option value="Offer">Offer</option>
                                                <option value="Rejected">Rejected</option>
                                        </select>
                                    </div>
                                </section>
                                <section className="Edit_notes">
                                    <label htmlFor="notes" className="notes edit_label">Notes</label>
                                    <textarea
                                        type="text"
                                        id="notes"
                                        name="notes"
                                        value={notes}
                                        cols="26"
                                        rows="5"
                                        onChange={this.handleNotesChange}
                                    />
                                </section>

                                <button type="submit" className="EditJobModal_submit_button">Edit Job</button>
                            </section>
                        </fieldset>
                    </form>
                </section>
            </div>
        );
    }
}

export default withRouter(EditJobModal);