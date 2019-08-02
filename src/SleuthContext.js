import React from 'react';

const SleuthContext = React.createContext({
    currentUser: {},
    currentJobs: [],
    clickedJob: {},
    addCurrentUser: () => {},
    addCurrentJobs: () => {},
    addNewJob: () => {},
    deleteJob: () => {},
    editJob: () => {},
    addClickedJob: () => {}
});

export default SleuthContext;