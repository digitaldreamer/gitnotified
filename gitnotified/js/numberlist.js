import React from 'react';
import ReactDOM from 'react-dom';

export function NumberList(props) {
    const listItems = props.numbers.map((number) => {
        return <li key={number.toString()}>{number}</li>;
    });

    return (
        <ul>{listItems}</ul>
    );
}
