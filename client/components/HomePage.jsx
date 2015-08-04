import React from 'react';
import {Link} from 'react-router';
import TodosView from 'components/TodosView';
import AuthForm from 'components/AuthForm';

export default class HomePage extends React.Component {
    render() {
        return (
            <div className="HomePage">
                Home
                <Link to="about">About</Link>

                <AuthForm/>

                <TodosView/>
            </div>
        );
    }
}
