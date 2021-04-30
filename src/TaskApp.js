import { useState } from "react";
import TaskList from './TaskList';
import TaskContent from './TaskContent';
import TaskListPicker from './TaskListPicker';

function TaskApp() {
    const [lists, setLists] = useState([
        { id: 1, name : 'TODO' }, { id: 2, name : 'Pending'}, { id: 3, name: 'Prueba'}
    ]);

    const [nonCurrentTasks, setNonCurrentTasks] = useState([
        {
            listId: 2,
            tasks: [
                {id: 4, title: 'PENDING task', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque erat massa, aliquet eu lobortis nec, efficitur sit amet ipsum. Phasellus at quam sodales, rhoncus velit vitae, venenatis mauris. Sed pharetra.'},
                {id: 5, title: 'PENDING task', description: 'Nullam nec commodo quam. Maecenas eget feugiat odio. Morbi feugiat eleifend dictum. Quisque egestas ligula vitae tellus sagittis convallis.'},
                {id: 6, title: 'PENDING task', description: 'Aenean sodales neque lorem, vel maximus felis lobortis a. Duis lobortis mauris leo, sed pharetra augue condimentum nec. Praesent dictum leo vel sem consectetur, eget blandit nisl blandit.'},
            ]
        },
        {
            listId: 3,
            tasks: [
                {id: 7, title: 'Prueba task', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque erat massa, aliquet eu lobortis nec, efficitur sit amet ipsum. Phasellus at quam sodales, rhoncus velit vitae, venenatis mauris. Sed pharetra.'},
            ]
        }
    ])
    const [currentTasks, setCurrentTasks] = useState([
            {id: 1, title: 'How to move a task?', description: 'Right click in the task u want to move. Then select the target list. Just like that'},
            {id: 2, title: 'TODO task', description: 'Nullam nec commodo quam. Maecenas eget feugiat odio. Morbi feugiat eleifend dictum. Quisque egestas ligula vitae tellus sagittis convallis.'},
            {id: 3, title: 'TODO task', description: 'Aenean sodales neque lorem, vel maximus felis lobortis a. Duis lobortis mauris leo, sed pharetra augue condimentum nec. Praesent dictum leo vel sem consectetur, eget blandit nisl blandit.'},
    ])
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
    const [currentListIndex, setCurrentListIndex] = useState(0);

    const [moveTaskId, setMoveTaskId] = useState(null);

    const currentTask = currentTasks[currentTaskIndex];
    const currentList = lists[currentListIndex];


    const newTask = () => {
        const newT = {id: currentTasks.length + 1, title: 'New task', description: 'New task description.'};
        const tasks = [newT, ...currentTasks];
        setCurrentTasks(tasks);
        setCurrentTaskIndex(0);
    }

    const changeList = (id) => {
        if(currentList.id !== id){
            let ncurrTasks = nonCurrentTasks.filter(({listId}) => listId !== id);
            ncurrTasks.push({listId: currentList.id, tasks: currentTasks});
            const newCurrentTasks = nonCurrentTasks.find(({listId}) => listId === id).tasks;

            setNonCurrentTasks(ncurrTasks);
            setCurrentTasks(newCurrentTasks);
            setCurrentListIndex(lists.findIndex(l => l.id === id));
            setCurrentTaskIndex(0);
        }
    }

    const updateCurrentTask = ({title, description}) => {
        const updT = Object.assign({...currentTask}, {title, description});
        const currTasks = [...currentTasks];
        currTasks[currentTaskIndex] = updT;
        setCurrentTasks(currTasks);
    }

    const newList = (name) => {
        if(name === '')
            name = `List ${lists.length + 1}`;
        setLists([...lists, {id: lists.length + 1, name}]);
        setNonCurrentTasks([...nonCurrentTasks, {
            listId: lists.length + 1,
            tasks : [{id: currentTasks.length + 1, title: 'New task', description: 'New task description.'}]
        }]);
    }

    const deleteTask = (id) => {
        const indexOfTask = currentTasks.findIndex(t => t.id === id);
        if(indexOfTask < currentTaskIndex)
            setCurrentTaskIndex(currentTaskIndex - 1);
        else if(indexOfTask === currentTaskIndex){
            const newI = currentTasks.length - 1 > indexOfTask ? indexOfTask : indexOfTask - 1;
            setCurrentTaskIndex(newI);
        }

        const newCurrentTasks = [...currentTasks];
        newCurrentTasks.splice(indexOfTask, 1);
        setCurrentTasks(newCurrentTasks);
    }

    const moveTaskHandler = (listId) => {
        if(!moveTaskId || currentList.id === listId)
            return;

        const newNonCurrentTasks = [...nonCurrentTasks];
        let l = newNonCurrentTasks.find(l => l.listId === listId);
        l.tasks.push(currentTasks.find(t => t.id === moveTaskId));

        setNonCurrentTasks(newNonCurrentTasks);
        deleteTask(moveTaskId);
        setMoveTaskId(null);
    }

    return (
        <div className="Task-App">
            <div className="task-app-header">
                <TaskListPicker 
                    lists={lists} 
                    current={currentList.id} 
                    onChange={changeList}
                    onNewList={newList}
                /> 
            </div>
            <div className="task-app-content">
                <div className="task-list">
                    <TaskList 
                        tasks={currentTasks}
                        current={currentTask.id} 
                        onChange={(id) => setCurrentTaskIndex(currentTasks.findIndex(t => t.id === id))}
                        onTaskContextMenu={(id) => setMoveTaskId(id)}
                        onNewTask={newTask}
                        onDeleteTask={deleteTask}
                    >
                        <TaskListPicker
                            lists={lists} 
                            current={currentList.id} 
                            onChange={moveTaskHandler}
                            chooseOne
                            vertical
                        /> 
                    </TaskList>
                </div>
                <div className="task-content">
                    <TaskContent 
                        task={currentTask} 
                        onChange={(v) => updateCurrentTask(v)}
                    />
                </div>
            </div>
        </div>
    );
}

export default TaskApp;
