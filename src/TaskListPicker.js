import { useState } from 'react';
import { Button, Icon, Input } from 'semantic-ui-react';

const TaskListPicker = (props) => {
    const { lists, current } = props;
    const [editing, setEditing] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleNew = () => {
        if(props.onNewList)
            props.onNewList(inputValue)
        setEditing(false);
        setInputValue('');
    }       

    return (
        <div className="list-picker">
            <Button.Group floated='left' size="mini" vertical={props.vertical}>
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
                {
                    editing && (
                        <Button 
                            style={{borderRadius: '0px'}}
                        >
                            <Input
                                size="tiny" 
                                autoFocus
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)} 
                                onBlur={handleNew}
                            />
                        </Button>
                    )
                }
                <Button
                    style={{borderRadius: '0px'}}
                    onClick={() => {!props.chooseOne && setEditing(true)}}
                    icon
                >
                    <Icon name={props.chooseOne ? 'cancel' : 'add'} />
                </Button>
            </Button.Group>
        </div>
    );
}
 
export default TaskListPicker;