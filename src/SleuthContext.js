import React from 'react';

const SleuthContext = React.createContext({
    currentUser: {},
    currentJobs: [],
    addCurrentUser: () => {},
    addCurrentJobs: () => {},
    addNewJob: () => {}
});

export default SleuthContext;