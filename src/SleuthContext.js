import React from 'react';

const SleuthContext = React.createContext({
    currentUser: {},
    currentJobs: [],
    addCurrentUser: () => {},
    addCurrentJobs: () => {},
    addNewJob: () => {},
    deleteJob: () => {}
});

export default SleuthContext;