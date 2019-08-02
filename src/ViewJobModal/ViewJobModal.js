import React, { Component } from 'react';
import './ViewJobModal.css';
import { withRouter } from 'react-router-dom';
import SleuthContext from '../SleuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

class ViewJobModal extends Component {
    static contextType = SleuthContext;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClick);

        let clickedJob = sessionStorage.getItem('clickedJob');
        clickedJob = JSON.parse(clickedJob);

        if (clickedJob && Object.entries(clickedJob).length === 0) {
            this.props.closeModal('showJobModal');
            this.props.history.push('/dashboard');
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick);
    }

    handleClick = (e) => {
        if (!this.node.contains(e.target)) {
            this.props.closeModal('showJobModal');
            this.context.addClickedJob({});
        }
    }

    handleClickCloseModal = () => {
        this.props.closeModal('showJobModal');
        this.context.addClickedJob({});
    }

    render() {
        const { showModal } = this.props;
        const showOrHideModal = showModal ? 'Modal display' : 'Modal hide';

        let clickedJob = sessionStorage.getItem('clickedJob');
        clickedJob = JSON.parse(clickedJob);

        return (
            <div className={showOrHideModal}>
                <section ref={node => this.node = node} className="ViewJobModal_section">
                    <button
                        type="button"
                        className="close_job_modal_button"
                        onClick={this.handleClickCloseModal}>
                            <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <section className="ViewJobModal_company">
                        <p>{clickedJob && clickedJob.company}</p>
                        <p>{clickedJob && clickedJob.position}</p>
                        <p>{clickedJob && clickedJob.job_location}</p>
                        <p>{(clickedJob && clickedJob.salary) ? `Salary: ${clickedJob.salary}` : ''}</p>
                        <p>{`Date applied: ${clickedJob && clickedJob.date_applied}`}</p>
                        <p>{(clickedJob && clickedJob.interview_date) ? `Interview date: ${clickedJob.interview_date}` : ''}</p>
                        <p>{(clickedJob && clickedJob.application_status) ? `Application status: ${clickedJob.application_status}` : ''}</p>
                        <p>{(clickedJob && clickedJob.notes) ? `Notes: ${clickedJob.notes}` : ''}</p>
                    </section>
                </section>
            </div>
        );
    }
}

export default withRouter(ViewJobModal);