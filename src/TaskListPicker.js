const TaskListPicker = (props) => {
    const { lists, current } = props;
    return (
        <div className="list-picker">
            {lists.map(({id, name}) => (
                <div className="list-picker-element" key={id} onClick={() => props.onChange(id)}>
                    <span style={id === current ? {textDecoration: 'underline'} : {}}>{name}</span>
                </div>
            ))}
        </div>
    );
}
 
export default TaskListPicker;