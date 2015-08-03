import flux from '../flux';
import AuthService from '../services/AuthService';

class AuthActions {
    loginAttempt(username, password) {
        AuthService
            .login(username, password)
            .then(() => {
                this.actions.successfulAuthorization(username);
            })
            .catch(error => {
                this.actions.failedAuthorization(error);
            });

        return {
            username: username,
            password: password
        };
    }

    successfulAuthorization(username) {
        return {
            username: username
        };
    }

    failedAuthorization(error) {
        return {
            error: error
        };
    }

    logout() {
        return {};
    }
}

export default flux.createActions(AuthActions);
