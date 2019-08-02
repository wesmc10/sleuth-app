import React from 'react';
import './JobOffers.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function JobOffers(props) {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let jobOffers, numberOfJobOffers;
    if (currentJobs) {
        jobOffers = currentJobs
            .filter(job => job.application_status === 'Offer')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (jobOffers.length === 0) {
            numberOfJobOffers = 0;
        } else {
            numberOfJobOffers = jobOffers.length;
            jobOffers = jobOffers.map(job =>
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
        numberOfJobOffers = 0;
    }

    return (
        <div className="Job_offers">
            <div className="Number_of_jobs">
                {numberOfJobOffers}
            </div>
            {jobOffers}
        </div>
    );
}