import React from 'react';
import './AppliedJobs.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function AppliedJobs() {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let appliedJobs;
    if (currentJobs) {
        appliedJobs = currentJobs
            .filter(job => job.application_status === 'Applied')
            .sort((a, b) => (dateFns.parse(a.date_applied) < dateFns.parse(b.date_applied)) ? 1 : -1)
        ;
        
        appliedJobs = appliedJobs.map(job => 
            <InterviewNode
                job={job}
                key={job.id}
                applied={job.date_applied}
            />
        );
    }

    return (
        <div className="Applied_jobs">
            {appliedJobs}
        </div>
    );
}