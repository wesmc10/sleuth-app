import React, { Component } from 'react';
import './SleuthHeader.css';
import TokenService from '../token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserSecret } from '@fortawesome/free-solid-svg-icons';
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
            ?   <header className="SleuthHeader_header_logout">
                    <div className="SleuthHeader_icon_title">
                        <FontAwesomeIcon icon={faUserSecret} className="SleuthHeader_icon" />
                        <h2 className="SleuthHeader_title_logout">Sleuth</h2>
                    </div>
                    <button 
                        type="button" 
                        className="SleuthHeader_logout"
                        onClick={this.handleLogOutClick}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                    </button>
                </header>
            :   <header className="SleuthHeader_header_nologout">
                    <FontAwesomeIcon icon={faUserSecret} className="SleuthHeader_icon_nologout" />
                    <h2 className="SleuthHeader_title">Sleuth</h2>
                </header>
        ;

        return (
            <div className={TokenService.hasAuthToken() ? "SleuthHeader_main_color" : "SleuthHeader_main"}>
                {sleuthHeader}
            </div>
        );
    }
}

export default withRouter(SleuthHeader);