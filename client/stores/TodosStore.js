import flux from '../flux';
import {createStore, bind} from 'alt/utils/decorators';
import TodosActions from '../actions/TodosActions'

@createStore(flux)
export default class TodosStore {
	items = []

	@bind(TodosActions.addItem)
	addItem(item) {
		this.items.push(item)
	}

	@bind(TodosActions.updateItem)
	updateItem({id, updates}) {
		this.items.forEach((item) => {
			if (item.id == id) {
				for (let k of Object.keys(updates)) {
					item[k] = updates[k]
				}
			}
		})
	}
}
