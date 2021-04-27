import { useState } from "react";

import { Button, Icon, Input } from "semantic-ui-react"

const TaskContent = (props) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);

    let editButton = (
        <span style={{marginLeft: '5px'}}>
            <Button 
                icon 
                circular 
                basic 
                onClick={() => {
                    setEditing(!editing)
                    if(!editing){
                        setTitle(props.task.title);
                        setDescription(props.task.description);
                    }
                    else
                        props.onChange({title, description});
                    
                }}
            >
                <Icon name={editing ? "check" : "edit"} />
            </Button>
        </span>
    )

    return ( 
        <>
        {props.task &&  
            <>
                <div className="task-content-main">
                        {editing ? 
                            <>
                                <Input
                                    transparent
                                    type="text" value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                /> 
                                {editButton}
                            </>
                            : 
                            <h1>
                                {props.task.title}
                                {editButton}
                            </h1>
                        }
                        {editing ?
                                <textarea
                                    style={
                                        {
                                            background: 'transparent',
                                            border: '0 none',
                                            width: '100%',
                                            outline: 'none',
                                            height: '100%',
                                          }
                                    }
                                    type="text" value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                /> :
                            <p>
                                {props.task.description}
                            </p>
                        }
                </div>
                <div className="task-content-footer">
                    <div className="task-content-functions">
                        <span><Button color="red" size="mini">Cancel</Button></span>
                        <span><Button color="green" size="mini">Approve</Button></span>
                    </div>
                    <div className="task-content-status">
                        <span><strong>Creation Date: </strong>04/26/2021</span>
                        <span><strong>Created by: </strong>Me</span>
                        <span><strong>Status: </strong>Pending</span>
                    </div>
                </div>
            </>
        }  
        </>
    );
}
 
export default TaskContent;