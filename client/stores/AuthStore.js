import flux from '../flux';
import {createStore, bind} from 'alt/utils/decorators';
import AuthActions from '../actions/AuthActions'

@createStore(flux)
export default class AuthStore {
	state = {
		isLoggedIn: false,
		isWaiting: false,
		username: null,
		error: null
	}

	@bind(AuthActions.loginAttempt)
	loginAttempt({username}) {
		this.state.isWaiting = true
		this.state.username = username
		let state = this.state
	}

	@bind(AuthActions.successfulAuthorization)
	successfulAuthorization({username}) {
		this.state.username = username
		this.state.isWaiting = false
		this.state.error = null
		this.state.isLoggedIn = true
	}

	@bind(AuthActions.failedAuthorization)
	failedAuthorization({error}) {
		this.state.error = error
		this.state.isWaiting = false
	}

	@bind(AuthActions.logout)
	logout() {
		this.state.isWaiting = false
		this.state.isLoggedIn = false
		this.state.username = null
	}

}
