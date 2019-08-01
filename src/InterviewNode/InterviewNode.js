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
            // this.props.history.push('/dashboard');
        })
        .catch(error =>
            console.error(error)
        );
    }

    render() {
        const { interview } = this.props;

        return (
            <div className="User_upcoming_interview">
                <button 
                    type="button" 
                    className="Job_delete_button"
                    onClick={this.handleDeleteJobNode}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                </button>
                <h3>{interview.company}</h3>
                <p>{interview.position}</p>
                <p>{dateFns.format(interview.interview_date, 'MMMM Do')}</p>
            </div>   
        );
    }
}

export default withRouter(InterviewNode);