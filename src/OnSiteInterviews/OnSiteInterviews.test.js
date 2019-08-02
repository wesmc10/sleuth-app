import React from 'react';
import ReactDOM from 'react-dom';
import OnSiteInterviews from './OnSiteInterviews';

describe('OnSiteInterviews component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<OnSiteInterviews />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});