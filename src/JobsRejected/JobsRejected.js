import React from 'react';
import './JobsRejected.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function JobsRejected(props) {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let jobsRejected, numberOfJobsRejected;
    if (currentJobs) {
        jobsRejected = currentJobs
            .filter(job => job.application_status === 'Rejected')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (jobsRejected.length === 0) {
            numberOfJobsRejected = 0;
        } else {
            numberOfJobsRejected = jobsRejected.length;
            jobsRejected = jobsRejected.map(job =>
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
        numberOfJobsRejected = 0;
    }

    return (
        <div className="Jobs_rejected">
            <div className="Number_of_jobs">
                {numberOfJobsRejected}
            </div>
            {jobsRejected}
        </div>
    );
}