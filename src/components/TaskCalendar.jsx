import React from 'react';
import './css/TaskCalendar.css';
import { FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa'; // Icons for tasks

function TaskCalendar({ tasks }) {
    const today = new Date().toDateString();

    // Get the first day of the current month
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startingDayOfWeek = firstDayOfMonth.getDay(); // Get the weekday index (0 = Sun, 6 = Sat)
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate(); // Total days in current month

    // Render days of the calendar with correct alignment
    const renderDays = () => {
        const totalCalendarCells = startingDayOfWeek + daysInMonth; // Total cells to render including blanks before the 1st
        const days = Array.from({ length: totalCalendarCells }, (_, i) => {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - startingDayOfWeek + 1);

            // Check if the cell is part of the current month
            const isCurrentMonth = i >= startingDayOfWeek;
            const dayNumber = isCurrentMonth ? date.getDate() : null;
            const isToday = date.toDateString() === today;

            // Find tasks due on this date
            const dayTasks = tasks.filter(task => new Date(task.dueDate).toDateString() === date.toDateString());

            // Check if there are any overdue or pending tasks
            const isOverdue = dayTasks.some(task => !task.completed && new Date(task.dueDate) < new Date());
            const hasPendingTasks = dayTasks.some(task => !task.completed);

            return (
                <div
                    key={i}
                    className={`calendar-day ${isToday ? 'today' : ''} ${isOverdue ? 'overdue' : ''} ${isCurrentMonth ? '' : 'inactive'}`}
                >
                    {isCurrentMonth && <span className="day-number">{dayNumber}</span>}
                    <div className="task-list">
                        {isCurrentMonth &&
                            dayTasks.map((task, index) => (
                                <div
                                    key={index}
                                    className={`task-item ${task.completed ? 'completed' : hasPendingTasks ? 'pending' : ''}`}
                                >
                                    {task.completed ? (
                                        <FaCheckCircle className="task-icon completed-icon" />
                                    ) : isOverdue ? (
                                        <FaTimesCircle className="task-icon overdue-icon" />
                                    ) : (
                                        <FaClock className="task-icon pending-icon" />
                                    )}
                                    <span className="task-name">{task.name}</span>
                                </div>
                            ))}
                    </div>
                </div>
            );
        });

        return days;
    };

    return (
        <div className="calendar-container">
            {renderDays()}
        </div>
    );
}

export default TaskCalendar;
