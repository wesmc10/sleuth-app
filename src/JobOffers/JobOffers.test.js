import React from 'react';
import ReactDOM from 'react-dom';
import JobOffers from './JobOffers';

describe('JobOffers component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<JobOffers />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});