import React, { Component } from 'react';
import './SleuthHeader.css';
import { Link } from 'react-router-dom';
import TokenService from '../token-service';

export default class SleuthHeader extends Component {   

    render() {
        const sleuthHeader = TokenService.hasAuthToken()
            ?   <header className="SleuthHeader_header">
                    <h2 className="SleuthHeader_title">Sleuth</h2>
                    <Link to='/' className="SleuthHeader_logout">Log Out</Link>
                </header>
            :   <header className="SleuthHeader_header">
                    <h2 className="SleuthHeader_title">Sleuth</h2>
                </header>
        ;

        return (
            <div className="SleuthHeader_main">
                {sleuthHeader}
            </div>
        );
    }
}