import React, { Component } from 'react';
import './SleuthHeader.css';
import TokenService from '../token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import SleuthContext from '../SleuthContext';
import { withRouter } from 'react-router-dom';

class SleuthHeader extends Component {
    static contextType = SleuthContext;

    handleLogOutClick = () => {
        this.context.addCurrentUser({});
        this.context.addCurrentJobs([]);
        TokenService.clearStorage();
        this.props.history.push('/');
    }

    render() {
        const sleuthHeader = TokenService.hasAuthToken()
            ?   <header className="SleuthHeader_header">
                    <h2 className="SleuthHeader_title">Sleuth</h2>
                    <button 
                        type="button" 
                        className="SleuthHeader_logout"
                        onClick={this.handleLogOutClick}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
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

export default withRouter(SleuthHeader);