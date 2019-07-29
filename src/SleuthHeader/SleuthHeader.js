import React from 'react';
import './SleuthHeader.css';

export default function SleuthHeader() {
    // render header with or without logout depending on whether
    // user is logged in
    return (
        <div className="SleuthHeader_main">
            <header className="Sleuthheader_header">
                <h2 className="SleuthHeader_title">Sleuth</h2>
            </header>
        </div>
    );
}