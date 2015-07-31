const React = require("react")
import { Link } from "react-router"
import TodosView from "../components/TodosView"
import AuthForm from "../components/AuthForm"

export default React.createClass({
	render () {
		return (
			<div className="HomePage">
				Home
				<Link to="about">About</Link>

				<AuthForm/>

				<TodosView/>
			</div>
		)
	}
})