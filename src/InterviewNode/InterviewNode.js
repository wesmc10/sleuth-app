import React, { Component } from 'react';
import './InterviewNode.css';
import dateFns from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import TokenService from '../token-service';
import SleuthContext from '../SleuthContext';
import { withRouter } from 'react-router-dom';

class InterviewNode extends Component {
    static contextType = SleuthContext;

    handleDeleteJobNode = (e) => {
        e.preventDefault();
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
        })
        .catch(error => console.error(error));
    }

    render() {
        const { job, applied, interview } = this.props;
        const jobStatus = interview 
            ? <p>{`Interview on ${dateFns.format(interview, 'MMMM Do')}`}</p>
            : applied
                ? <p>{`Applied on ${dateFns.format(applied, 'MMMM Do')}`}</p>
                : ''
        ;

        return (
            <div className="User_upcoming_interview">
                <button 
                    type="button" 
                    className="Job_delete_button"
                    onClick={this.handleDeleteJobNode}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <h3>{job.company}</h3>
                <p>{job.position}</p>
                {jobStatus}
            </div>   
        );
    }
}

export default withRouter(InterviewNode);