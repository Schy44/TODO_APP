import React from 'react';
import { Pie } from 'react-chartjs-2';
import './css/AnalyticsDashboard.css';

function AnalyticsDashboard({ tasks }) {
    const completedTasks = tasks.filter(task => task.completed).length;
    const pendingTasks = tasks.length - completedTasks;

    // Calculate points (e.g., 10 XP per completed task)
    const points = completedTasks * 10;

    // Calculate percentage of completed tasks for the progress bar
    const completionRate = (completedTasks / tasks.length) * 100 || 0;

    const data = {
        labels: ['Completed', 'Pending'],
        datasets: [
            {
                data: [completedTasks, pendingTasks],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverOffset: 4, // Adds a hover effect
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allows us to control the size
        plugins: {
            legend: {
                position: 'bottom', // Move legend below the chart for compact view
                labels: {
                    boxWidth: 10, // Smaller legend boxes
                },
            },
        },
    };

    return (
        <div className="analytics-dashboard">
            <h3>Task Analytics</h3>
            <div className="pie-container">
                <Pie data={data} options={options} />
            </div>

            <div className="task-summary">
                <p>{completedTasks === tasks.length && tasks.length > 0 ? 'All tasks completed!' : 'There are tasks to complete.'}</p>

                <div className="task-stats">
                    <p>Total Tasks: {tasks.length}</p>
                    <p>Completed Tasks: {completedTasks}</p>
                    <p>Pending Tasks: {pendingTasks}</p>
                </div>

                <div className="task-points">
                    <h4>Points</h4>
                    <p>{points} XP</p>

                    <div className="progress-bar">
                        <div className="progress-bar-inner" style={{ width: `${completionRate}%` }}></div>
                    </div>
                    <p>Completion: {Math.round(completionRate)}%</p>
                </div>
            </div>
        </div>
    );
}

export default AnalyticsDashboard;
