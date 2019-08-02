import React from 'react';

const SleuthContext = React.createContext({
    currentUser: {},
    currentJobs: [],
    clickedJob: {},
    addCurrentUser: () => {},
    addCurrentJobs: () => {},
    addNewJob: () => {},
    deleteJob: () => {},
    addClickedJob: () => {}
});

export default SleuthContext;