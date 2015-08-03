export default {
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > 0.5) {
                    resolve(username, password);
                } else {
                    reject('what\'s going on with your credentials?');
                }
            }, 1000);
        });
    }
};
