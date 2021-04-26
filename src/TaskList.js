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
            {props.tasks.map(task => (
                <Draggable 
                    key={task.id}
                >
                    <div
                        className="task-list-element" 
                        onClick={() => props.onChange(task.id)}
                    >
                        <h1>{task.title}</h1>
                        <p>{resume(task.description)}</p>
                    </div>
                </Draggable>
            ))}
        </>       
    );
}
 
export default TaskList;