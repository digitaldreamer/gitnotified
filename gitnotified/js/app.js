import React from 'react';
import ReactDOM from 'react-dom';


class Welcome extends React.Component {
    render() {
        return <h1>Hello, {this.props.name}!</h1>;
    }
}

export function App() {
    return (
        <div>
            <Welcome name="Chris" />
        </div>
    );
}
