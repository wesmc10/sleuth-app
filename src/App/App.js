import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import LandingPage from '../LandingPage/LandingPage';
import LogInPage from '../LogInPage/LogInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import UserDashBoard from '../UserDashboard/UserDashboard';
import SleuthContext from '../SleuthContext';
import PageNotFound from '../PageNotFound/PageNotFound';
import AddJobModal from '../AddJobModal/AddJobModal';
import EditJobModal from '../EditJobModal/EditJobModal';

export default class App extends Component {
	state = {
		currentUser: {},
		currentJobs: [],
		clickedJob: {},
		error: null
	};

	componentDidMount() {
		this.hydrateAppStateWithSessionStorage();
	}

	hydrateAppStateWithSessionStorage() {
		for (const stateKey of ['currentUser', 'currentJobs', 'clickedJob']) {
			if (sessionStorage.hasOwnProperty(stateKey)) {
				let value = sessionStorage.getItem(stateKey);
				try {
					value = JSON.parse(value);
					this.setState({
						[stateKey]: value
					});
				} catch(error) {
					console.error(error);
				}
			}
		}
	}

	setSessionStorage(key, value) {
		sessionStorage.setItem(key, JSON.stringify(value));
	}

	handleAddCurrentUser = (user) => {
		this.setState({
			currentUser: user
		});
		this.setSessionStorage('currentUser', user);
	}

	handleAddCurrentJobs = (jobs) => {
		this.setState({
			currentJobs: jobs
		});
		this.setSessionStorage('currentJobs', jobs);
	}

	handleAddNewJob = (job) => {
		this.setState({
			currentJobs: [
				...this.state.currentJobs,
				job
			]
		});
		this.setSessionStorage('currentJobs', this.state.currentJobs);
	}

	handleDeleteJob = (jobId) => {
		const remainingJobs = this.state.currentJobs.filter(job => job.id !== jobId);
		this.setState({
			currentJobs: remainingJobs
		});

		if (this.state.currentJobs.length === 0) {
			sessionStorage.removeItem('currentJobs');
		} else {
			this.setSessionStorage('currentJobs', this.state.currentJobs);
		}
	}

	handleAddClickedJob = (job) => {
		this.setState({
			clickedJob: job
		});
		this.setSessionStorage('clickedJob', job);
	}

    render() {
		const { error } = this.state;

		const contextValue = {
			currentUser: this.state.currentUser,
			currentJobs: this.state.currentJobs,
			clickedJob: this.state.clickedJob,
			addCurrentUser: this.handleAddCurrentUser,
			addCurrentJobs: this.handleAddCurrentJobs,
			addNewJob: this.handleAddNewJob,
			deleteJob: this.handleDeleteJob,
			addClickedJob: this.handleAddClickedJob
		};

		return (
			<SleuthContext.Provider value={contextValue}>
				<main role="main" className='App_main'>
					<div role="alert">
						{error && <p className="red">{error}</p>}
					</div>
					<BrowserRouter>
						<ScrollToTop>
							<Switch>
								<Route 
									exact
									path='/'
									component={LandingPage}
								/>
								<Route
									path='/login'
									component={LogInPage}
								/>
								<Route
									path='/signup'
									component={SignUpPage}
								/>
								<Route
									path='/dashboard'
									component={UserDashBoard}
								/>
								<Route
									path='/dashboard/add-job'
									component={AddJobModal}
								/>
								<Route
									path='/dashboard/edit-job'
									component={EditJobModal}
								/>
								<Route
									component={PageNotFound}
								/>
							</Switch>
						</ScrollToTop>
					</BrowserRouter>
				</main>
			</SleuthContext.Provider>
		);
    }
}