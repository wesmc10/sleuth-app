import React from 'react';
import './JobOffers.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function JobOffers() {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let jobOffers;
    if (currentJobs) {
        jobOffers = currentJobs
            .filter(job => job.application_status === 'Offer')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (jobOffers.length === 0) {
            jobOffers = 'No current job offers';
        } else {
            jobOffers = jobOffers.map(job =>
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
        <div className="Job_offers">
            {jobOffers}
        </div>
    );
}