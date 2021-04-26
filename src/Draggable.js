import { useRef, useState } from "react";

const Draggable = (props) => {
    const [dragged, setDragged] = useState(false);
    const [offsets, setOffsets] = useState({x: null, y: null, width: null, height: null});
    const el = useRef(null);

    const drag = (e) => {
        e.preventDefault();
        setDragged(true);
        const {x, y, width, height} = el.current.getBoundingClientRect();
        setOffsets({x, y, width, height});
        if(props.onDrag)
            props.onDrag()
    }

    const move = (e) => {
        if(!dragged)
            return;
        const {width, height} = el.current.getBoundingClientRect();
        setOffsets({x: e.clientX - (width / 2), y:e.clientY - (height / 2), width, height});
    }

    const end = (e) => {
        setDragged(false);
        setOffsets({x: null, y:null});
    }

    let styles = {
        position: dragged ? 'absolute' : 'static',
    };
    if(dragged){
        const offs = {left: offsets.x, top: offsets.y, width: offsets.width, height: offsets.height, zIndex: 10};
        styles = {...styles, ...offs, backgroundColor: 'white'};
    }

    return ( 
        <div
            ref={el}
            onDragStart={(e) => drag(e)} 
            onMouseMove={(e) => move(e)} 
            onMouseUp={(e) => end(e)}
            style={styles}
            draggable={true}
        >
            {props.children}
        </div>
     );
}
 
export default Draggable;