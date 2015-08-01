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
						<p>
							Hi, {this.props.username}!&nbsp;
							<a href="" onClick={this.onLogoutClick}>Logout</a>
						</p>
					) : (
						<div>
							{this.props.error ? <span>{this.props.error}</span> : <span></span>}
							<form onSubmit={this.onLoginSubmit} className="pure-form pure-form-aligned">
								<fieldset>
									<div className="pure-control-group">
										<label>Username</label>
										<input name="username"/>
									</div>
									<div className="pure-control-group">
										<label>Password</label>
										<input name="password" type="password"/>
									</div>
									<div className="pure-controls">
										<label className="pure-checkbox">
											<input type="checkbox"/> remember me
										</label>
										<button type="submit" className="pure-button pure-button-primary">Login</button>
									</div>
								</fieldset>
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
		event.preventDefault()
		AuthActions.logout()
	}
}