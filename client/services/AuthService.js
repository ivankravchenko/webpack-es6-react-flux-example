import request from 'superagent';

export default {
    login: (username, password) => {
        return new Promise((resolve, reject) => {
            request
                .post('/auth')
                .send({ username: username, password: password })
                .end((err, res) => {
                    err ? reject(err) : resolve(res)
                });
        });
    }
};
