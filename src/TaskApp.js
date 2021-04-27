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
                {id: 1, title: 'First task', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque erat massa, aliquet eu lobortis nec, efficitur sit amet ipsum. Phasellus at quam sodales, rhoncus velit vitae, venenatis mauris. Sed pharetra.'},
                {id: 2, title: 'Second task', description: 'Nullam nec commodo quam. Maecenas eget feugiat odio. Morbi feugiat eleifend dictum. Quisque egestas ligula vitae tellus sagittis convallis.'},
                {id: 3, title: 'Third task', description: 'Aenean sodales neque lorem, vel maximus felis lobortis a. Duis lobortis mauris leo, sed pharetra augue condimentum nec. Praesent dictum leo vel sem consectetur, eget blandit nisl blandit.'},
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

    const newTask = () => {
        const newT = {id: currentList.tasks.length + 1, title: 'New task', description: 'New task description.'};
        const l = currentList.tasks;
        const newTs = [newT, ...l];
        const tasksAux = [...tasks];
        tasksAux[currentListIndex].tasks = newTs;
        setTasks(tasksAux);
        setCurrentTask(0);
    }

    const changeList = (id) => {
        if(currentList.id !== id){
            setCurrentList(tasks.findIndex(l => l.id === id));
            setCurrentTask(0);
        }
    }

    const updateCurrentTask = ({title, description}) => {
        const updT = Object.assign({...currentList.tasks[currentTaskIndex]}, {title, description});
        const tasksAux = [...tasks];
        tasksAux[currentListIndex].tasks[currentTaskIndex] = updT;
        setTasks(tasksAux);
    }

    return (
        <div className="Task-App">
            <div className="task-app-header">
                <TaskListPicker 
                    lists={taskLists} 
                    current={currentList.id} 
                    onChange={changeList}
                /> 
            </div>
            <div className="task-app-content">
                <div className="task-list">
                    <TaskList 
                        tasks={currentList.tasks}
                        current={currentList.tasks[currentTaskIndex].id} 
                        onChange={(id) => setCurrentTask(currentList.tasks.findIndex(t => t.id === id))}
                        onNewTask={newTask}
                    />
                </div>
                <div className="task-content">
                    <TaskContent 
                        task={currentList.tasks[currentTaskIndex]} 
                        onChange={(v) => updateCurrentTask(v)}
                    />
                </div>
            </div>
        </div>
    );
}

export default TaskApp;
