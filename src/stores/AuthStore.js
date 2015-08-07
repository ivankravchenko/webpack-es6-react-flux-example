import flux from 'flux/flux';
import {createStore, bind} from 'alt/utils/decorators';
import AuthActions from 'actions/AuthActions';

@createStore(flux)
export default class AuthStore {
    constructor() {
        this.isLoggedIn = false;
        this.isWaiting = false;
        this.username = null;
        this.error = null;
    }

    @bind(AuthActions.loginAttempt)
    loginAttempt({username}) {
        this.isWaiting = true;
        this.username = username;
    }

    @bind(AuthActions.successfulAuthorization)
    successfulAuthorization({username}) {
        this.username = username;
        this.isWaiting = false;
        this.error = null;
        this.isLoggedIn = true;
    }

    @bind(AuthActions.failedAuthorization)
    failedAuthorization({error}) {
        this.error = error;
        this.isWaiting = false;
    }

    @bind(AuthActions.logout)
    logout() {
        this.isWaiting = false;
        this.isLoggedIn = false;
        this.username = null;
    }

}
