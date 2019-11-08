import React from 'react';
import classes from './word.module.css';

const Word = (props) => (
    <button key={props.word} value={props.word} className={classes.word}>{props.word}</button>
); 

export default Word;
