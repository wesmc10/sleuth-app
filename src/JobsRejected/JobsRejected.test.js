import React from 'react';
import ReactDOM from 'react-dom';
import JobsRejected from './JobsRejected';

describe('JobsRejected component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<JobsRejected />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});