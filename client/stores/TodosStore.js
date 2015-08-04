import flux from 'flux';
import {createStore, bind} from 'alt/utils/decorators';
import TodosActions from 'actions/TodosActions';

@createStore(flux)
export default class TodosStore {
    constructor() {
        this.state = {
            items: []
        };
    }

    @bind(TodosActions.addItem)
    addItem(item) {
        this.state.items.push(item);
    }

    @bind(TodosActions.updateItem)
    updateItem({id, updates}) {
        this.state.items.forEach((item) => {
            if (item.id === id) {
                for (const k of Object.keys(updates)) {
                    item[k] = updates[k];
                }
            }
        });
    }
}
