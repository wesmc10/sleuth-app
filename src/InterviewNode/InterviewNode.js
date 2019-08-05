import React, { Component } from 'react';
import './InterviewNode.css';
import dateFns from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import TokenService from '../token-service';
import SleuthContext from '../SleuthContext';
import { withRouter } from 'react-router-dom';

class InterviewNode extends Component {
    static contextType = SleuthContext;

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickJobNode);
    }

    // if the user clicks on the node, but not on any of the buttons on the node
    handleClickJobNode = (e) => {
        if (this.node && this.node.contains(e.target) && !this.edit_button.contains(e.target) && !this.delete_button.contains(e.target)) {
            this.context.addClickedJob(this.props.job);
            this.props.displayModal('showJobModal', 'job');
            this.props.history.push('/dashboard/job');
        }
    }

    handleDeleteJobNode = () => {
        const { id } = this.props.job;

        fetch(`${config.API_ENDPOINT}/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e));
            }
        })
        .then(noContent => {
            this.context.deleteJob(id);
            if (this.props.deleteJob) {
                this.props.deleteJob(id);
            }
            this.props.history.push('dashboard');
        })
        .catch(error => console.error(error));
    }

    handleClickEdit = () => {
        this.context.addClickedJob(this.props.job);
        this.props.displayModal('showEditJobModal', 'edit-job');
        this.props.history.push('/dashboard/edit-job');
    }

    render() {
        const { job, applied, interview } = this.props;
        const jobStatus = interview 
            ? <p className="Job_status">{`Interview on ${dateFns.format(interview, 'MMMM Do')}`}</p>
            : applied
                ? <p className="Job_status">{`Applied on ${dateFns.format(applied, 'MMMM Do')}`}</p>
                : ''
        ;
        const colorOfNode = job.application_status === 'Applied'
            ? 'orange'
            : job.application_status === 'Phone'
                ? 'purple'
                : job.application_status === 'On-site'
                    ? 'blue'
                    : job.application_status === 'Offer'
                        ? 'green'
                        : 'bright_red'
        ;

        return (
            <div ref={node => this.node = node} className={`User_upcoming_interview ${colorOfNode}`} onClick={this.handleClickJobNode}>
                <button 
                    ref={button => this.delete_button = button}
                    type="button" 
                    className="Job_delete_button"
                    onClick={this.handleDeleteJobNode}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <button
                    ref={button => this.edit_button = button}
                    type="button"
                    className="Job_edit_button"
                    onClick={this.handleClickEdit}>
                        <FontAwesomeIcon icon={faEdit} />
                </button>
                <p className="Job_company">{job && job.company}</p>
                <p className="Job_position">{job && job.position}</p>
                {jobStatus}
            </div>   
        );
    }
}

export default withRouter(InterviewNode);