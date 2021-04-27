import { Button } from 'semantic-ui-react';

const TaskListPicker = (props) => {
    const { lists, current } = props;
    return (
        <div className="list-picker">
            <Button.Group floated='left' size="mini">
                {lists.map(({id, name}) => (
                    <Button 
                        color={id === current && 'active'} 
                        onClick={() => props.onChange(id)}
                        key={id}
                        style={{borderRadius: '0px'}}
                    >
                        {name}
                    </Button>
                ))}
            </Button.Group>
        </div>
    );
}
 
export default TaskListPicker;