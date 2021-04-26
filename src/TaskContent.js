const TaskContent = (props) => {
    return ( 
        <>
        {props.task &&  
            <>
                <div className="task-content-main">
                    <h1>{props.task.title}</h1>
                    <p>{props.task.description}</p>
                </div>
                <div className="task-content-status">
                    <span><strong>Status1:</strong> Pending</span>
                    <span><strong>Status2:</strong> other</span>
                    <span><strong>Status3:</strong> last</span>
                </div>
            </>
        }  
        </>
    );
}
 
export default TaskContent;