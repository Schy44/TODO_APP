import React, { useState } from 'react';
import './css/TaskInput.css';

function TaskInput({ addTask }) {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleAddTask = () => {
        addTask(taskName, dueDate);
        setTaskName('');
        setDueDate('');
    };

    return (
        <div className="task-input">
            <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Add a new task"
            />
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due Date"
            />
            <button onClick={handleAddTask}>Add Task</button>
        </div>
    );
}

export default TaskInput;
