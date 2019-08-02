import React from 'react';
import './AppliedJobs.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function AppliedJobs(props) {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let appliedJobs, numberOfAppliedJobs;
    if (currentJobs) {
        appliedJobs = currentJobs
            .filter(job => job.application_status === 'Applied')
            .sort((a, b) => (dateFns.parse(a.date_applied) < dateFns.parse(b.date_applied)) ? 1 : -1)
        ;
        
        if (appliedJobs.length === 0) {
            numberOfAppliedJobs = 0;
        } else {
            numberOfAppliedJobs = appliedJobs.length;
            appliedJobs = appliedJobs.map(job =>
                <li key={job.id}>
                    <InterviewNode
                        job={job}
                        applied={job.date_applied}
                        displayModal={props.displayModal}
                    />
                </li>
            );
        }
    } else {
        numberOfAppliedJobs = 0;
    }

    return (
        <div className="Applied_jobs">
            <div className="Number_of_jobs">
                {numberOfAppliedJobs}
            </div>
            {appliedJobs}
        </div>
    );
}