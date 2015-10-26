import React from 'react';
import 'styles/views/TodosView.scss';

import {connect} from 'react-redux';
import * as TodosActions from 'actions/TodosActions';

@connect(
    state => ({todos: state.todos}),
    TodosActions
)
export default class TodosView extends React.Component {
    static propTypes = {
        addTodo: React.PropTypes.func,
        editTodo: React.PropTypes.func,
        todos: React.PropTypes.any,
        items: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                id: React.PropTypes.number,
                done: React.PropTypes.bool,
                summary: React.PropTypes.string
            }))
    };

    render() {
        const {todos, addTodo, editTodo} = this.props;

        return (
            <div className="Todos">
            <h4>Proverbial Todo List Example:</h4>
                <form className="Todos-newItemForm" onSubmit={(event) => {
                    event.preventDefault();
                    addTodo(event.target.summary.value);
                    event.target.reset(); // blank the input box by resetting the form
                }}>
                    <input type="text" name="summary"/>
                    <button>Add</button>
                </form>
                <ol className="Todos-items">
                    {todos.map((item, index) => {
                        return (
                            <li data-id={item.id} key={index}>
                                <label>
                                    <input type="checkbox" checked={item.done} onChange={() => {
                                        editTodo(index, !item.done, item.summary);
                                    }}/>
                                    &nbsp;
                                    <span>{item.summary}</span>
                                </label>
                            </li>
                        );
                    })}
                </ol>
            </div>
        );
    }
}
