import React from 'react';
import './UpcomingInterviews.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function UpcomingInterviews(props) {
    const { today } = props;
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let upcomingInterviews, numberOfUpcomingInterviews;
    if (currentJobs) {
        upcomingInterviews = currentJobs
            .filter(job => dateFns.parse(job.interview_date) > dateFns.subDays(today, 1) 
                && dateFns.parse(job.interview_date) <= dateFns.addDays(today, 7))
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;
        
        if (upcomingInterviews.length === 0) {
            numberOfUpcomingInterviews = 0;
            upcomingInterviews = 'No interviews scheduled within the next week';
        } else {
            numberOfUpcomingInterviews = upcomingInterviews.length;
            upcomingInterviews = upcomingInterviews.map(job =>
                <li key={job.id}>
                    <InterviewNode
                        job={job}
                        interview={job.interview_date}
                        editModal={props.editModal}
                    />
                </li>
            );
        }
    } else {
        numberOfUpcomingInterviews = 0;
        upcomingInterviews = 'No interviews scheduled within the next week';
    }

    return (
        <div className="Upcoming_jobs">
            <div className="Number_of_jobs">
                {numberOfUpcomingInterviews}
            </div>
            {upcomingInterviews}
        </div>
    );
}