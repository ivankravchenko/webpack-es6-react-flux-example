export default {
	login: (username, password) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (Math.random() > .5) {
					resolve(username)
				} else {
					reject("what's going on with your credentials?")
				}
			}, 1000)
		})
	}
}