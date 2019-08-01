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

    handleDeleteJobNode = () => {
        const { id } = this.props.interview;

        fetch(`${config.API_ENDPOINT}/jobs/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            this.context.deleteJob(id);
            this.props.history.push('/dashboard'); // look into this
        })
        .catch(error =>
            console.error(error)
        );
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
                {/* <p>{dateFns.format(job.interview_date, 'MMMM Do')}</p> */}
            </div>   
        );
    }
}

export default withRouter(InterviewNode);