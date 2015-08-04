import React from 'react';
import AuthStore from 'stores/AuthStore';
import AuthActions from 'actions/AuthActions';
import connectToStores from 'alt/utils/connectToStores';
import classnames from 'classnames';

const displayName = 'AuthForm';
const propTypes = {
    isWaiting: React.PropTypes.bool,
    isLoggedIn: React.PropTypes.bool,
    username: React.PropTypes.string,
    error: React.PropTypes.string
};

@connectToStores
export default class AuthForm extends React.Component {
    static getStores() {
        return [AuthStore];
    }

    static getPropsFromStores() {
        return AuthStore.getState();
    }

    onLoginSubmit(event) {
        console.log('Login submit', event);
        event.preventDefault();
        const form = event.target;
        AuthActions.loginAttempt(form.username.value, form.password.value);
    }

    onLogoutClick() {
        AuthActions.logout();
    }

    render() {
        console.log('Hello from AuthForm.jsx');
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
        );
    }
}

AuthForm.displayName = displayName;
AuthForm.propTypes = propTypes;
