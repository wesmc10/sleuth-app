import React from 'react';
import './InterviewNode.css';
import dateFns from 'date-fns';

export default function InterviewNode(props) {
    const { interview } = props;

    return (
        <div className="User_upcoming_interview" key={interview.id}>
            <h3>{interview.company}</h3>
            <p>{interview.position}</p>
            <p>{dateFns.format(interview.interview_date, 'MMMM Do')}</p>
        </div>   
    );
}