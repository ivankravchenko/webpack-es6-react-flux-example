import TodosView from '../../../client/components/TodosView.jsx';

describe('TodosView', () => {
    let renderedTodosView;

    before('Render TodosView', () => {
        renderedTodosView = TestUtils.renderIntoDocument(<TodosView />);
    });

    it('renders div with Todos as a class', () => {
        let todosDiv = TestUtils.findRenderedDOMComponentWithClass(renderedTodosView, 'Todos');
        assert.ok(todosDiv,'Todos div rendered');
    });

    it('renders a form', () => {
        let form = TestUtils.findRenderedDOMComponentWithTag(renderedTodosView, 'form');
        assert.ok(form, 'Form is rendered');
    });

});
