import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ScrollToTop from '../ScrollToTop/ScrollToTop';
import LandingPage from '../LandingPage/LandingPage';
import LogInPage from '../LogInPage/LogInPage';

export default class App extends Component {

	state = {
		error: null
	};

    render() {
		const { error } = this.state;
		return (
			<main role="main" className='App_main'>
				{error && <p className="red">{error}</p>}
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
						</Switch>
					</ScrollToTop>
				</BrowserRouter>
			</main>
		);
    }
}