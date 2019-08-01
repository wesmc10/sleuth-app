import React from 'react';
import './UpcomingInterviews.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function UpcomingInterviews(props) {
    const { today } = props;
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let upcomingInterviews = currentJobs
        .filter(job => dateFns.parse(job.interview_date) >= today && dateFns.parse(job.interview_date) <= dateFns.addDays(today, 7))
        .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
    ;
    
    upcomingInterviews = upcomingInterviews.map(job => 
        <InterviewNode
            job={job}
            key={job.id}
            interview={job.interview_date}
        />  
    );

    return (
        // <section className="UserDashboard_upcoming">
        //     <h2 className="Upcoming_title">Upcoming Interviews</h2>
        <div className="Upcoming_jobs">
            {upcomingInterviews}
        </div>
        // </section>
    );
}