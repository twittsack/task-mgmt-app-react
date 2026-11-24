import React, { Component useState } from 'react';
import './Task.css';

export default class Task extends Component {
    const [isChecked, setIsChecked] = useState(false);

    state = {
        isFocus: false
    }

    handleEdit = (e) => {
        this.setState({ isFocus: !this.state.isFocus });
    }

    handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.deleteTask(this.props.isComplete);
    }

    handleComplete = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.props.completeTask(this.props.isComplete);
    }

    render() {
        const taskContent = 
            this.state.isComplete ?
            <div className="task-open">Task: {this.props.task}  {this.props.open}</div>:
            <div className="task-closed">Status: {this.props.task} {this.props.closed}</div>;

        return (
            <div className="task-card" onClick={this.handleEdit}>
             <span className="delete-task" onClick={this.handleDelete}>X</span>
             <button onClick={() => setIsChecked(!isChecked)}>
                {isChecked ? "&#x2713;" : "Not Checked"}
             </button>
            </div>
        )
    }

}