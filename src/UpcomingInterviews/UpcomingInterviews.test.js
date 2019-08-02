import React from 'react';
import ReactDOM from 'react-dom';
import UpcomingInterviews from './UpcomingInterviews';

describe('UpcomingInterviews component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UpcomingInterviews />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});