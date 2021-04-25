const TaskList = (props) => {
    return (
        <>  
            {props.tasks.map(task => (
                <div key={task.id} className="task-list-element" onClick={() => props.onChange(task.id)}>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                </div>
            ))}
        </>       
    );
}
 
export default TaskList;