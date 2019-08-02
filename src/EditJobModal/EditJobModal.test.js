import React from 'react';
import ReactDOM from 'react-dom';
import EditJobModal from './EditJobModal';
import { BrowserRouter } from 'react-router-dom';

describe('EditJobModal component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <BrowserRouter>
                <EditJobModal />
            </BrowserRouter>, 
            div
        );
        ReactDOM.unmountComponentAtNode(div);
    });
});