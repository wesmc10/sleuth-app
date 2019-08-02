import React from 'react';
import ReactDOM from 'react-dom';
import AddJobModal from './AddJobModal';

describe('AddJobModal component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AddJobModal />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});