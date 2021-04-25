import { useState } from "react";
import TaskList from './TaskList';
import TaskContent from './TaskContent';
import TaskListPicker from './TaskListPicker';

function TaskApp() {
    const [tasks, setTasks] = useState([
        {
            id: 1,
            list : 'TODO',
            tasks: [
                {id: 1, title: 'First task', description: 'Task description'},
                {id: 2, title: 'Second task', description: 'Second description'},
                {id: 3, title: 'Third task', description: 'Third description'},
            ]
        },
        {
            id: 2,
            list : 'Pending',
            tasks: [
                {id: 1, title: 'First pending task', description: 'Task description'},
                {id: 2, title: 'Second pending task', description: 'Second description'},
                {id: 3, title: 'Third pending task', description: 'Third description'},
            ]
        }, 
    ]);
    const [currentTaskIndex, setCurrentTask] = useState(0);
    const [currentListIndex, setCurrentList] = useState(0);

    const taskLists = tasks.map(t => { return {id: t.id, name: t.list} });
    const currentList = tasks[currentListIndex];

    const changeList = (id) => {
        setCurrentList(tasks.findIndex(l => l.id === id));
        setCurrentTask(0);
    }

    return (
        <div className="Task-App">
            <div className="task-app-header">
                <TaskListPicker lists={taskLists} current={currentList.id} onChange={changeList}/> 
            </div>
            <div className="task-app-content">
                <div className="task-list">
                    <TaskList tasks={currentList.tasks} onChange={(id) => setCurrentTask(currentList.tasks.findIndex(t => t.id === id))}/>
                </div>
                <div className="task-content">
                    <TaskContent task={currentList.tasks[currentTaskIndex]} />
                </div>
            </div>
        </div>
    );
}

export default TaskApp;
