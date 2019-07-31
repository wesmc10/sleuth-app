import React, { Component } from 'react';
import './UserDashboard.css';
import SleuthHeader from '../SleuthHeader/SleuthHeader';
import TokenService from '../token-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import AddJobModal from '../AddJobModal/AddJobModal';

export default class UserDashboard extends Component {
    state = {
        showAddJobModal: false,
        error: null
    };

    componentDidMount() {
        if (!TokenService.hasAuthToken()) {
            this.props.history.push('/');
        }
    }

    handleClickAddJobButton = () => {
        this.setState({
            showAddJobModal: true
        });
    }

    handleCloseModal = () => {
        this.setState({
            showAddJobModal: false
        });
    }

    render() {
        const { error } = this.state;

        return (
            <div className="UserDashboard_main">
                <SleuthHeader />
                <div role="alert">
					{error && <p className="red">{error}</p>}
				</div>
                <button 
                    type="button"
                    className="UserDashboard_add_job"
                    onClick={this.handleClickAddJobButton}>
                        <FontAwesomeIcon icon={faPlusSquare} />
                </button>
                <div className="UserDashboard_flex_container">
                    <section className="UserDashboard_upcoming">
                        <h2 className="Upcoming_title">Upcoming Interviews</h2>
                    </section>
                </div>
                <AddJobModal
                    showModal={this.state.showAddJobModal}
                    closeModal={this.handleCloseModal}
                />
            </div>
        )
    }
}