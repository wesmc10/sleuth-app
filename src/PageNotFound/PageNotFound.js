import React from 'react';
import './PageNotFound.css';
import SleuthHeader from '../SleuthHeader/SleuthHeader';

export default function PageNotFound() {
    return (
        <div className="PageNotFound_main">
            <SleuthHeader />
            <section className="PageNotFound_content_section">
                <h1 className="PageNotFound_title">404 - Page Not Found</h1>
                <h4 className="PageNotFound_suggestion">Try going back to the previous page</h4>
            </section>
        </div>
    );
}