import React from 'react'
import TodosStore from 'stores/TodosStore'
import TodosActions from 'actions/TodosActions'
import connectToStores from 'alt/utils/connectToStores'

@connectToStores
export default class TodosView extends React.Component {
	static getStores() {
		return [TodosStore]
	}

	static getPropsFromStores() {
		return TodosStore.getState()
	}

	render() {
		return (
			<div className="Todos">
				<form className="Todos-newItemForm pure-form" onSubmit={this.onSubmitNewItemForm}>
					<fieldset>
						<input type="text" name="summary" placeholder="New task..."/>
						<button type="submit" className="pure-button pure-button-primary">Add</button>
					</fieldset>
				</form>
				<ul className="Todos-items">
					{this.props.items.map((item) => {
						return (
							<li key={item.id} data-id={item.id}>
								<label className="pure-checkbox">
									<input type="checkbox" checked={item.done} onChange={this.onChangeDoneCheckbox}/>
									&nbsp;
									{item.summary}
								</label>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}

	onSubmitNewItemForm(event) {
		event.preventDefault()
		let form = event.target
		TodosActions.addItem(form.summary.value)
		form.reset()
	}

	onChangeDoneCheckbox(event) {
		TodosActions.updateItem(parseInt(event.target.parentElement.parentElement.attributes["data-id"].value), {
			done: event.target.checked
		})
	}
}
