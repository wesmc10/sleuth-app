import React from 'react';
import './PhoneInterviews.css';
import dateFns from 'date-fns';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function PhoneInterviews(props) {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let phoneInterviews, numberOfPhoneInterviews;
    if (currentJobs) {
        phoneInterviews = currentJobs
            .filter(job => job.application_status === 'Phone')
            .sort((a, b) => (dateFns.parse(a.interview_date) < dateFns.parse(b.interview_date)) ? -1 : 1)
        ;

        if (phoneInterviews.length === 0) {
            numberOfPhoneInterviews = 0;
        } else {
            numberOfPhoneInterviews = phoneInterviews.length;
            phoneInterviews = phoneInterviews.map(job =>
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
        numberOfPhoneInterviews = 0;
    }

    return (
        <div className="Phone_interviews">
            <div className="Number_of_jobs">
                {numberOfPhoneInterviews}
            </div>
            {phoneInterviews}
        </div>
    );
}