import React from 'react'
import AuthStore from '../stores/AuthStore'
import AuthActions from '../actions/AuthActions'
import connectToStores from 'alt/utils/connectToStores'
import classnames from 'classnames'

@connectToStores
export default class AuthForm extends React.Component {
	static getStores() {
		return [AuthStore]
	}

	static getPropsFromStores() {
		return AuthStore.getState()
	}

	render() {
		return (
			<div className={classnames({
				AuthForm: true,
				AuthForm_isWaiting: this.props.isWaiting,
				AuthForm_isLoggedIn: this.props.isLoggedIn
			})}>
				{this.props.isWaiting ? (
					<span>Logging in...</span>
				) : (this.props.isLoggedIn ? (
						<div>
							<span>Hi, {this.props.username}!</span>
							<button onClick={this.onLogoutClick}>Logout</button>
						</div>
					) : (
						<div>
							{this.props.error ? <span>{this.props.error}</span> : <span></span>}
							<form onSubmit={this.onLoginSubmit}>
								<div>
									<label>
										<span>Username: </span>
										<input name="username"/>
									</label>
								</div>
								<div>
									<label>
										<span>Password: </span>
										<input name="password" type="password"/>
									</label>
								</div>
								<button>Login</button>
							</form>
						</div>
					)
				)}
			</div>
		)
	}

	onLoginSubmit(event) {
		event.preventDefault()
		let form = event.target
		AuthActions.loginAttempt(form.username.value, form.password.value)
	}

	onLogoutClick(event) {
		AuthActions.logout()
	}
}