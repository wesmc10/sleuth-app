import React from 'react';
import './OnSiteInterviews.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function OnSiteInterviews() {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let onSiteInterviews;
    if (currentJobs) {
        onSiteInterviews = currentJobs
            .filter(job => job.application_status === 'On-site')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (onSiteInterviews.length === 0) {
            onSiteInterviews = 'No on-site interviews are currently scheduled';
        } else {
            onSiteInterviews = onSiteInterviews.map(job =>
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
        <div className="On_site_interviews">
            {onSiteInterviews}
        </div>
    );
}