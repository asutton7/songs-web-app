import React from 'react';
import classes from './ToolboxSlider.module.css';

const ToolboxSlider = (props) => {
    return (
        <div className={classes.ToolboxSlider}>
            <div className={classes.tool}></div>
            <div className={classes.tool}></div>
            <div className={classes.tool}></div>
        </div>
    )
}

export default ToolboxSlider;