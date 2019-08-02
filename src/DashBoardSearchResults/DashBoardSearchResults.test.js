import React from 'react';
import ReactDOM from 'react-dom';
import DashBoardSearchResults from './DashBoardSearchResults';

describe('DashBoardSearchResults component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<DashBoardSearchResults />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});