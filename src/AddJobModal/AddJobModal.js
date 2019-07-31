import React, { Component } from 'react';
import './AddJobModal.css';

export default class AddJobModal extends Component {
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

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleClick = (e) => {
        if (!this.node.contains(e.target)) {
            this.props.closeModal();
        }
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
                    <form className="AddJobModal_form">
                        <fieldset>
                            <section className="AddJobModal_add_job">
                                <legend>Add a Job</legend>
                                <div role="alert">
                                    {error && <p className="red">{error}</p>}
                                </div>
                                <label htmlFor="company">Company</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    placeholder="Company"
                                    required
                                    onChange={this.handleCompanyChange}
                                />
                                <label htmlFor="position">Position</label>
                                <input
                                    type="text"
                                    id="position"
                                    name="position"
                                    placeholder="Position"
                                    required
                                    onChange={this.handlePositionChange}
                                />
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    placeholder="Location"
                                    required
                                    onChange={this.handleLocationChange}
                                />
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    placeholder="Salary"
                                    onChange={this.handleSalaryChange}
                                />
                                <label htmlFor="date_applied">Date Applied</label>
                                <input
                                    type="date"
                                    id="date_applied"
                                    name="date_applied"
                                    placeholder="Date Applied"
                                    required
                                    onChange={this.handleDateAppliedChange}
                                />
                                <label htmlFor="interview_date">Interview Date</label>
                                <input
                                    type="date"
                                    id="interview_date"
                                    name="interview_date"
                                    placeholder="Interview Date"
                                    onChange={this.handleInterviewDateChange}
                                />
                                <label htmlFor="application_status">Application Status</label>
                                <input
                                    type="text"
                                    id="application_status"
                                    name="application_status"
                                    placeholder="Application Status"
                                    required
                                    onChange={this.handleApplicationStatusChange}
                                />
                                <label htmlFor="notes">Notes</label>
                                <input
                                    type="text"
                                    id="notes"
                                    name="notes"
                                    placeholder="Notes"
                                    onChange={this.handleNotesChange}
                                />
                            </section>
                        </fieldset>
                    </form>
                </section>
            </div>
        );
    }
}