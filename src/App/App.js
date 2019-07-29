import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import LandingPage from '../LandingPage/LandingPage';
import LogInPage from '../LogInPage/LogInPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import UserDashBoard from '../UserDashboard/UserDashboard';
import SleuthContext from '../SleuthContext';

export default class App extends Component {
	state = {
		currentUser: {},
		currentJobs: [],
		error: null
	};

	componentDidMount() {
		this.hydrateAppStateWithSessionStorage();
	}

	hydrateAppStateWithSessionStorage() {
		for (const stateKey of ['currentUser', 'currentJobs']) {
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

    render() {
		const { error } = this.state;

		const contextValue = {
			currentUser: this.state.currentUser,
			currentJobs: this.state.currentJobs,
			addCurrentUser: this.handleAddCurrentUser,
			addCurrentJobs: this.handleAddCurrentJobs
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
							</Switch>
						</ScrollToTop>
					</BrowserRouter>
				</main>
			</SleuthContext.Provider>
		);
    }
}