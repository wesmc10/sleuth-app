import React from 'react';
import './DashBoardSearchResults.css';
import InterviewNode from '../InterviewNode/InterviewNode';

export default function DashBoardSearchResults(props) {
    let currentJobs = sessionStorage.getItem('currentJobs');
    currentJobs = currentJobs && JSON.parse(currentJobs);

    let searchResults, numberOfSearchResults;
    if (currentJobs) {
        searchResults = props.searchResults;
        
        if (searchResults.length === 0) {
            numberOfSearchResults = 0;
            searchResults = 'No jobs match that company';
        } else {
            numberOfSearchResults = searchResults.length;
            searchResults = searchResults.map(job =>
                <li key={job.id}>
                    <InterviewNode
                        job={job}
                        applied={job.date_applied}
                        deleteJob={props.deleteJob}
                        displayModal={props.displayModal}
                    />
                </li>
            );
        }
    } else {
        numberOfSearchResults = 0;
        searchResults = 'No jobs match that company';
    }

    return (
        <div className="Applied_jobs">
            <div className="Number_of_jobs">
                {numberOfSearchResults}
            </div>
            {searchResults}
        </div>
    );
}