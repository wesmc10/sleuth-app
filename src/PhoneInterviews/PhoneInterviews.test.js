import React from 'react';
import ReactDOM from 'react-dom';
import PhoneInterviews from './PhoneInterviews';

describe('PhoneInterviews component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<PhoneInterviews />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});