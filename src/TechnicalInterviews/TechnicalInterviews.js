import React from 'react';
import './TechnicalInterviews.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function TechnicalInterviews() {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let technicalInterviews;
    if (currentJobs) {
        technicalInterviews = currentJobs
            .filter(job => job.application_status === 'Technical')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (technicalInterviews.length === 0) {
            technicalInterviews = 'No technical interviews are currently scheduled';
        } else {
            technicalInterviews = technicalInterviews.map(job =>
                <li key={job.id}>
                    <InterviewNode
                        job={job}
                        interview={job.interview_date}
                    />
                </li>
            );
        }
    }

    return (
        <div className="Technical_interviews">
            {technicalInterviews}
        </div>
    );
}