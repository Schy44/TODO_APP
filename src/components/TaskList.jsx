import React from 'react';
import './css/TaskList.css';
function TaskList({ tasks, toggleTaskCompletion, removeTask }) {
    return (
        <ul>
            {tasks.map((task, index) => (
                <li key={index} className="task">
                    <span className={task.completed ? 'completed' : ''}>
                        {task.name}
                    </span>
                    <span>{task.completed ? 'Done' : 'Pending'}</span>
                    <div>
                        <button onClick={() => toggleTaskCompletion(index)}>
                            Complete
                        </button>
                        <button onClick={() => removeTask(index)}>Delete</button>
                    </div>
                </li>
            ))}
            {tasks.length === 0 && <p>No tasks available.</p>}
        </ul>
    );
}

export default TaskList;
