import React from 'react';
import AuthStore from 'stores/AuthStore';
import AuthActions from 'actions/AuthActions';
import connectToStores from 'alt/utils/connectToStores';
import classnames from 'classnames';

@connectToStores
export default class AuthForm extends React.Component {
    static propTypes = {
        isWaiting: React.PropTypes.bool,
        isLoggedIn: React.PropTypes.bool,
        username: React.PropTypes.string,
        error: React.PropTypes.string
    };

    static getStores() {
        return [AuthStore];
    }

    static getPropsFromStores() {
        return AuthStore.getState()
    }

    onLoginSubmit = (event) => {
        event.preventDefault();
        const form = event.target
        AuthActions.loginAttempt(form.username.value, form.password.value);
    }

    onLogoutClick = (event) => {
        event.preventDefault();
        AuthActions.logout();
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
                            &nbsp;
                            <a href="" onClick={this.onLogoutClick}>Logout</a>
                        </div>
                    ) : (
                        <div>
                            {this.props.error ? <span>{this.props.error}</span> : <span></span>}
                            <form ref="loginForm" onSubmit={this.onLoginSubmit} className="pure-form pure-form-aligned">
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
                                            <input name="remember" type="checkbox"/> remember me
                                        </label>
                                        <button type="submit" className="pure-button pure-button-primary">Login</button>
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                    )
                )}
            </div>
        );
    }
}
