import React from 'react';
import './PhoneInterviews.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function PhoneInterviews() {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let phoneInterviews;
    if (currentJobs) {
        phoneInterviews = currentJobs
            .filter(job => job.application_status === 'Phone')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (!phoneInterviews) {
            phoneInterviews = 'No phone interviews are currently scheduled';
        } else {
            phoneInterviews = phoneInterviews.map(job =>
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
        <div className="Phone_interviews">
            {phoneInterviews}
        </div>
    );
}