import React, { Component, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getTodos, deleteTodo, updateTodo } from '../../../actions/todos';
import { getBuckets } from '../../../actions/buckets';

export class List extends Component {
    static propTypes = {
        todos: PropTypes.array.isRequired,
        getTodos: PropTypes.func.isRequired,
        deleteTodo: PropTypes.func.isRequired,
        updateTodo: PropTypes.func.isRequired,
        getBuckets: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            editingTodo: null
        }
    }

    componentDidMount() {
        this.props.getTodos();
        this.props.getBuckets();
    }

    componentDidUpdate() {
        if (this.state.isEditing) {
            this.inputRef.focus()
        }
    }

    editTodo(todo) {
        this.setState({
            isEditing: true,
            editingTodo: { ...todo }
        });
    }

    clearEdit() {
        this.setState({
            isEditing: false,
            editingTodo: null
        })
    }

    updateTodo(todo) {
        this.props.updateTodo(this.state.editingTodo);
        this.clearEdit();
    }

    onChange = e => {
        let todo = this.state.editingTodo;
        todo.name = e.target.value;
        this.setState({
            isEditing: true,
            editingTodo: todo
        });
    }

    toggleTodoComplete(todo, isComplete) {
        const updatedTodo = { ...todo };
        updatedTodo.is_complete = isComplete;
        this.props.updateTodo(updatedTodo);
        this.clearEdit();
    }

    render() {
        return (
            <div className="card mt-4">
                <div className="card-body">
                    <h3 className="text-center">Buckets</h3>
                    <Fragment>
                        {this.props.buckets.map(bucket => (
                            <Fragment key={bucket.id}>
                                <h4 className="mt-4">{bucket.name}</h4>
                                <table className="table table-dark">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.getRowItems(bucket.id)}
                                    </tbody>
                                </table>
                            </Fragment>
                        ))}

                        <Fragment key={null}>
                            <h4 className="mt-4">Items not in a bucket</h4>
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.getRowItems(null)}
                                </tbody>
                            </table>
                        </Fragment>
                    </Fragment>
                </div>
            </div>
        )
    }

    getRowItems(bucketId) {
        const rowItems = [];
        const todos = this.props.todos.filter(todo => todo.bucket_Id == (bucketId ? bucketId : null));
        todos.forEach(todo => {
            rowItems.push(<tr key={todo.id}>
                {this.state.isEditing && this.state.editingTodo.id == todo.id ?
                    <td>
                        <input name="name"
                            className="form-control"
                            ref={(input) => { this.inputRef = input; }}
                            value={this.state.editingTodo.name}
                            onChange={(e) => this.onChange(e)}
                            onBlur={() => this.clearEdit()}
                            onKeyDown={(e) => { (e.keyCode == 13 ? this.updateTodo(todo) : null) }}
                        />
                    </td>
                    : <td>{todo.name}</td>}
                <td>{todo.is_complete ?
                    <Fragment><span className="text-success mr-4">COMPLETE</span>
                        <button className="btn btn-secondary" onClick={() => this.toggleTodoComplete(todo, false)}>Mark Pending</button>
                    </Fragment>
                    :
                    <Fragment><span className="text-white-50 mr-4">PENDING</span>
                        <button className="btn btn-success" onClick={() => this.toggleTodoComplete(todo, true)}>Mark Complete</button>
                    </Fragment>
                }</td>
                <td>{new Date(todo.created_at).toLocaleDateString()}</td>
                <td>
                    <button
                        onClick={() => this.editTodo(todo)}
                        className="btn btn-secondary mr-2">Edit</button>
                    <button
                        onClick={this.props.deleteTodo.bind(this, todo.id)}
                        className="btn btn-danger">Delete</button>
                </td></tr>)
        })

        return rowItems;
    }
}

const mapStateToProps = state => ({
    todos: state.todoReducer.todos,
    buckets: state.bucketReducer.buckets
})

export default connect(mapStateToProps, { getTodos, deleteTodo, updateTodo, getBuckets })(List)
