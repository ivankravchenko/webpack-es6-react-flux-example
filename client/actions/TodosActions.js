import flux from '../flux';

var lastId = 0

class TodosActions {
	addItem(summary) {
		return {
			id: ++lastId,
			done: false,
			summary: summary,
			timestamp: new Date()
		}
	}

	updateItem(id, updates) {
		return {
			id: id,
			updates: updates
		}
	}
}

export default flux.createActions(TodosActions);