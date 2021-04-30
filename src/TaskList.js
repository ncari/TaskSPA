import { useState } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import Draggable from './Draggable';

const resumeLength = 100;
const TaskList = (props) => {

    const [listPicker, setListPicker] = useState({show: false, id: null, left: null, top: null});

    const resume = (text) => {
        if(text.length > resumeLength)
            return `${text.substring(0, resumeLength)}...`;
        return text;
    }

    const deleteTask = (id) => {
        if(props.onDeleteTask)
            props.onDeleteTask(id);
    }

    return (
        <>  
            <div style={{display: 'flex', justifyContent: 'center', padding: '5px 0px', borderBottom: '1px solid lightgray'}}>
                <Button icon circular onClick={props.onNewTask}>
                    <Icon name="add" />
                </Button>
            </div> 
            {props.tasks.map(task => {
                let classes = 'task-list-element';
                classes += task.id === props.current ? ' active' : '';
                return (
                    <Draggable 
                        key={task.id}
                    >
                        <div
                            className={classes}
                            onClick={() => props.onChange(task.id)}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                setListPicker({show: true, id: task.id, left: e.clientX, top: e.clientY});
                                props.onTaskContextMenu(task.id)
                            }}
                        >
                            <h1>
                                {task.title}
                                <span style={{float: 'right'}}>
                                    <Button 
                                        icon
                                        circular 
                                        size="mini"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteTask(task.id)
                                        }}
                                    >
                                        <Icon name="trash alternate outline" />
                                    </Button>
                                </span>
                            </h1>
                            <p>{resume(task.description)}</p>
                            {(listPicker.show && listPicker.id === task.id) &&
                                <div
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setListPicker({show: false, id: null, left: null, top: null})}
                                    } 
                                    style={{position: 'absolute', left: listPicker.left, top: listPicker.top}}
                                >
                                    {props.children}
                                </div>
                            }
                        </div>
                    </Draggable>
                )
            })}
        </>       
    );
}
 
export default TaskList;