import React from 'react';

const SleuthContext = React.createContext({
    currentUser: {},
    currentJobs: [],
    addCurrentUser: () => {},
    addCurrentJobs: () => {}
});

export default SleuthContext;