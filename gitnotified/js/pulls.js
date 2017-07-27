import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export class RepoList extends React.Component {
    constructor(props) {
        super(props);

        console.log('construct Pull Repos');
        let repos = props.repos.map((repo) => {
            console.log(JSON.stringify(repo));

            return (
                <Repo repo={repo} key={repo.id.toString()} settings={this.props.settings} />
            );
        });

        this.state = {
            repos: repos
        }
    }

    render() {
        return (
            <div id="pull-requests">{this.state.repos}</div>
        );
    }
}

class Repo extends React.Component {
    constructor(props) {
        super(props);

        const settings = props.settings;
        let pulls = this.genPulls();

        this.state = {
            pulls: pulls
        };
    }

    genPulls(data) {
        const settings = this.props.settings;
        let prs = data || [];
        let pulls = prs.map((data) => {
            return (
                <PullRequest key={data.number.toString()} repo={this.props.repo} settings={settings} commits="0" comments="0" number={data.number} id={data.id} title={data.title} />
            )
        });

        return pulls
    }

    componentDidMount() {
        this.tick();

        this.timerID = setInterval(
            () => this.tick(), 2 * 60 * 1000 // seconds
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const repo = this.props.repo;
        const settings = this.props.settings;

        console.log("get pulls", this.props.repo.full_name);
        $.ajax({
            url: 'https://api.github.com/repos/' + repo.full_name + '/pulls',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Authorization': 'token ' + settings.token
            },
            success: function(data, status, xhr) {
                console.log('X-RateLimit-Remaining', xhr.getResponseHeader('X-RateLimit-Remaining'));

                this.setState({
                    pulls: this.genPulls(data)
                });
            }.bind(this)
        });

        this.setState({
            date: new Date()
        });
    }

    render() {
        const repo = this.props.repo;

        return (
            <div className="repo">
                <a className="main" href={'https://github.com/' + repo.full_name}>{repo.name}</a>

                <ul>{this.state.pulls}</ul>
            </div>
        );
    }
}

class PullRequest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            commits: props.commits,
            comments: props.comments,
            number: props.number,
            title: props.title
        }
    }
    render() {
        const repo = this.props.repo;

        return (
            <li>
                <a href={'https://github.com/' + repo.full_name + '/pull/' + this.state.number }>
                    <span className="number">{this.state.number} -</span>
                    <span className="commits">{this.state.commits}</span>
                    <span className="comments">{this.state.comments}</span>
                    <p>{this.state.title}</p>
                </a>
            </li>
        );
    }
}
