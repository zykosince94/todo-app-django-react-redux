import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { addTodo } from "../../../actions/todos";
import { getBuckets, createBucket } from '../../../actions/buckets';

export class Form extends Component {
    state = {
        name: '',
        selectedBucketId: null,
        creatingBucket: false,
        bucketName: ''
    }

    static propTypes = {
        addTodo: PropTypes.func.isRequired,
        getBuckets: PropTypes.func.isRequired,
        createBucket: PropTypes.func.isRequired
    }

    componentDidMount() {
        this.props.getBuckets();
    }

    onChange = e => this.setState({
        [e.target.name]: e.target.value
    });

    onSubmit = e => {
        e.preventDefault();
        const todo = { name: this.state.name, bucket_Id: this.state.selectedBucketId };
        this.props.addTodo(todo);
        this.setState({
            name: '',
            selectedBucketId: null,
            creatingBucket: false,
            bucketName: ''
        })
    }

    toggleCreateBucket(isCreating) {
        const newState = { ...this.state };
        newState.selectedBucketId = null;
        newState.creatingBucket = isCreating;
        this.setState(newState);
    }

    createBucket() {
        this.props.createBucket({ name: this.state.bucketName });
        this.toggleCreateBucket(false);
    }

    selectBucket = (id) => {
        const state = { ...this.state };
        state.selectedBucketId = id;
        this.setState(state);
    }

    render() {
        const { name } = this.state;
        return (
            <div className="m-4">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">ADD TODO</h2>
                        <form className="form-horizontal" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label className="control-label">Name</label>
                                <div className="">
                                    <input id="name" name="name" type="text" placeholder="Name or description of the task" className="form-control input-md" value={name} onChange={this.onChange} />

                                </div>
                            </div>

                            {this.state.creatingBucket ?
                                <Fragment>
                                    <h6 className="mt-3">Create bucket</h6>
                                    <div>
                                        <input name='bucketName'
                                            className="form-control input-md"
                                            value={this.state.bucketName}
                                            placeholder="Bucket Name"
                                            onChange={(e) => this.onChange(e)}
                                            onKeyDown={(e) => { (e.keyCode == 13 ? this.createBucket() : null) }} />
                                    </div>
                                    <span className="btn btn-link mt-2 p-0" onClick={() => this.toggleCreateBucket(false)}>Cancel</span>
                                </Fragment>
                                :
                                <Fragment>
                                    <h6 className="mt-3">Select a bucket <span className="text-muted">(optional)</span></h6>
                                    <div>
                                        {this.props.buckets.map(bucket => (
                                            <div className="mt-2" key={bucket.id}>
                                                {this.state.selectedBucketId == bucket.id
                                                    ? <span className="btn btn-primary" onClick={() => this.selectBucket(null)}>{bucket.name}</span>
                                                    : <span className="btn btn-secondary" onClick={() => this.selectBucket(bucket.id)}>{bucket.name}</span>
                                                }
                                            </div>
                                        ))}
                                        <span className="btn btn-link mt-2 p-0" onClick={() => this.toggleCreateBucket(true)}>Create new Bucket</span>
                                    </div>
                                </Fragment>}
                            <div>

                            </div>

                            {!this.state.creatingBucket ? <button type="submit" className="btn btn-success mt-4">Add</button> : ""}
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    buckets: state.bucketReducer.buckets
})

export default connect(mapStateToProps, { addTodo, getBuckets, createBucket })(Form);
