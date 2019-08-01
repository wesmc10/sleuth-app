import React from 'react';
import './JobsRejected.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function JobsRejected() {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let jobsRejected;
    if (currentJobs) {
        jobsRejected = currentJobs
            .filter(job => job.application_status === 'Rejected')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (jobsRejected.length === 0) {
            jobsRejected = 'No current rejections';
        } else {
            jobsRejected = jobsRejected.map(job =>
                <li key={job.id}>
                    <InterviewNode
                        job={job}
                        interview={job.interview_date}
                    />
                </li>
            );
        }
    } else {
        jobsRejected = 'No current rejections';
    }

    return (
        <div className="Jobs_rejected">
            {jobsRejected}
        </div>
    );
}