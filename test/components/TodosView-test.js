import TodosView from 'components/views/TodosView.jsx';

describe('TodosView', () => {
    let renderedTodosView;

    before('Render TodosView', () => {
        renderedTodosView = TestUtils.renderIntoDocument(<TodosView />);
    });

    it('renders div with TodosView as a class', () => {
        let todosDiv = TestUtils.findRenderedDOMComponentWithClass(renderedTodosView, 'TodosView');
        assert.ok(todosDiv,'Todos div rendered');
    });

    it('renders a form', () => {
        let form = TestUtils.findRenderedDOMComponentWithTag(renderedTodosView, 'form');
        assert.ok(form, 'Form is rendered');
    });

});
