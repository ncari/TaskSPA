import { Button, Icon } from 'semantic-ui-react';
import Draggable from './Draggable';

const resumeLength = 100;
const TaskList = (props) => {
    const resume = (text) => {
        if(text.length > resumeLength)
            return `${text.substring(0, resumeLength)}...`;
        return text;
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
                        >
                            <h1>{task.title}</h1>
                            <p>{resume(task.description)}</p>
                        </div>
                    </Draggable>
                )
            })}
        </>       
    );
}
 
export default TaskList;