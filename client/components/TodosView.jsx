import React from 'react';
import TodosStore from '../stores/TodosStore';
import TodosActions from '../actions/TodosActions';
import connectToStores from 'alt/utils/connectToStores';

@connectToStores
export default class TodosView extends React.Component {

    static displayName = 'TodosView';

    static propTypes = {
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.string,
                done: React.PropTypes.bool,
                summary: React.PropTypes.string
            }))
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    static getStores() {
        return [TodosStore];
    }

    static getPropsFromStores() {
        return TodosStore.getState();
    }

    render() {
        return (
            <div className="Todos">
                <form className="Todos-newItemForm" onSubmit={this.onSubmitNewItemForm}>
                    <input type="text" name="summary"/>
                    <button>Add</button>
                </form>
                <ol className="Todos-items">
                    {this.props.items.map((item) => {
                        return (
                            <li data-id={item.id}>
                                <label>
                                    <input type="checkbox" checked={item.done} onChange={this.onChangeDoneCheckbox}/>
                                    <span>{item.summary}</span>
                                </label>
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }

    onSubmitNewItemForm(event) {
        event.preventDefault();

        const form = event.target;
        TodosActions.addItem(form.summary.value);
        form.reset();
    }

    onChangeDoneCheckbox(event) {
        TodosActions.updateItem(parseInt(event.target.parentElement.parentElement.attributes['data-id'].value), {
            done: event.target.checked
        });
    }
}
