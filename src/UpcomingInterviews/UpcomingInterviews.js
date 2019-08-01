import React from 'react';
import './UpcomingInterviews.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function UpcomingInterviews(props) {
    const { today } = props;
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let upcomingInterviews;
    if (currentJobs) {
        upcomingInterviews = currentJobs
            .filter(job => dateFns.parse(job.interview_date) > dateFns.subDays(today, 1) 
                && dateFns.parse(job.interview_date) <= dateFns.addDays(today, 7))
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;
        
        upcomingInterviews = upcomingInterviews.map(job =>
            <li key={job.id}>
                <InterviewNode
                    job={job}
                    interview={job.interview_date}
                />
            </li>
        );
    }

    return (
        <div className="Upcoming_jobs">
            {upcomingInterviews}
        </div>
    );
}