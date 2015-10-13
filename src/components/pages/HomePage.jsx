import React from 'react';
import {Link} from 'react-router';
import TodosView from 'components/views/TodosView';
import AuthView from 'components/views/AuthView';

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="HomePage">
                Home &nbsp;
                <Link to="/about" activeClassName="active">About</Link>

                <AuthView/>

                <TodosView/>
            </div>
        );
    }
}
