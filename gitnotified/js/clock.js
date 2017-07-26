import React from 'react';
import ReactDOM from 'react-dom';

export class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            clicked: false,
        };

        this.clicky = this.clicky.bind(this);
    }

    clicky(e) {
        this.setState(prevState => ({
            clicked: !prevState.clicked
        }));
    }

    render() {
        return (
            <div className="clock">
              <h1 onClick={this.clicky}>Git Notified {this.state.clicked ? 'yes' : 'no'}</h1>
              {this.state.clicked == false &&
                  <p>It is {this.state.date.toLocaleTimeString()}.</p>
              }
            </div>
        );
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
}
