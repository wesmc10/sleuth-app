import React from 'react';
import './TechnicalInterviews.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function TechnicalInterviews(props) {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let technicalInterviews, numberOfTechnicalInterviews;
    if (currentJobs) {
        technicalInterviews = currentJobs
            .filter(job => job.application_status === 'Technical')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (technicalInterviews.length === 0) {
            numberOfTechnicalInterviews = 0;
        } else {
            numberOfTechnicalInterviews = technicalInterviews.length;
            technicalInterviews = technicalInterviews.map(job =>
                <li key={job.id}>
                    <InterviewNode
                        job={job}
                        interview={job.interview_date}
                        displayModal={props.displayModal}
                    />
                </li>
            );
        }
    } else {
        numberOfTechnicalInterviews = 0;
    }

    return (
        <div className="Technical_interviews">
            <div className="Number_of_jobs">
                {numberOfTechnicalInterviews}
            </div>
            {technicalInterviews}
        </div>
    );
}