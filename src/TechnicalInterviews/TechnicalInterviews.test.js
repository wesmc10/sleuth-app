import React from 'react';
import ReactDOM from 'react-dom';
import TechnicalInterviews from './TechnicalInterviews';

describe('TechnicalInterviews component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TechnicalInterviews />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});