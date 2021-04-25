const TaskContent = (props) => {
    return ( 
        <>
        {props.task &&  
            <div>
                <h1>{props.task.title}</h1>
                <p>{props.task.description}</p>
            </div>
        }  
        </>
    );
}
 
export default TaskContent;