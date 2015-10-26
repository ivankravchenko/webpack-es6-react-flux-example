import Immutable from 'immutable';
import {ADD_TODO, EDIT_TODO} from 'actions/TodosActions';

const defaultState = Immutable.List();

export default function todos(state = defaultState, action) {
    switch (action.type) {
        case ADD_TODO:
            return state.concat(action.payload);
        case EDIT_TODO:
            return state.set(action.payload.id, {
                summary: action.payload.summary,
                done: action.payload.done
            });
        default:
            return state;
    }
}
