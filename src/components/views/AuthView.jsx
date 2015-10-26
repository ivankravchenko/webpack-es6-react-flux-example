import React from 'react';
import AuthStore from 'stores/AuthStore';
import AuthActions from 'actions/AuthActions';
import classnames from 'classnames';
import TextBox from 'components/pure/TextBox';

export default class AuthView extends React.Component {
    static propTypes = {
        isWaiting: React.PropTypes.bool,
        isLoggedIn: React.PropTypes.bool,
        username: React.PropTypes.string,
        error: React.PropTypes.string
    }

    static getStores() {
        return [AuthStore];
    }

    static getPropsFromStores() {
        return AuthStore.getState();
    }

    onLoginSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
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
                            <form ref="loginForm" onSubmit={this.onLoginSubmit} className="form-group">
                                <fieldset className="form-group">
                                    <label>Username</label>
                                    <TextBox name="username" type="text" />
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Password </label>
                                    <TextBox name="password" type="password"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>
                                        <input name="remember" type="checkbox"/> remember me
                                    </label>
                                </fieldset>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                        </div>
                    )
                )}
            </div>
        );
    }
}
