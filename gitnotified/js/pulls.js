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
                <Repo repo={repo} key={repo.full_name} settings={this.props.settings} />
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
                <PullRequest key={data.number.toString()} repo={this.props.repo} settings={settings} data={data} />
            )
        });

        return pulls;
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
            commits: 0,
            comments: 0,
            pull_comments: 0,
            issue_comments: 0
        }
    }

    componentDidMount() {
        this.tick();

        this.timerID = setInterval(
            () => this.tick(), 15 * 60 * 1000 // minutes
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const repo = this.props.repo;
        const settings = this.props.settings;
        const number = this.props.data.number;

        console.log("get PR stats", this.props.repo.full_name);

        $.ajax({
            url: 'https://api.github.com/repos/' + repo.full_name + '/pulls/' + number + '/comments?per_page=300',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Authorization': 'token ' + settings.token
            },
            success: function(data, status, xhr) {
                console.log('X-RateLimit-Remaining', xhr.getResponseHeader('X-RateLimit-Remaining'));

                this.setState(prevState => ({
                    pull_comments: data.length,
                    comments: prevState.issue_comments + data.length
                }));
            }.bind(this)
        });

        $.ajax({
            url: 'https://api.github.com/repos/' + repo.full_name + '/issues/' + number + '/comments?per_page=300',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Authorization': 'token ' + settings.token
            },
            success: function(data, status, xhr) {
                console.log('X-RateLimit-Remaining', xhr.getResponseHeader('X-RateLimit-Remaining'));

                this.setState(prevState => ({
                    issue_comments: data.length,
                    comments: prevState.pull_comments + data.length
                }));
            }.bind(this)
        });

        $.ajax({
            url: 'https://api.github.com/repos/' + repo.full_name + '/pulls/' + number + '/commits?per_page=300',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: {
                'Authorization': 'token ' + settings.token
            },
            success: function(data, status, xhr) {
                console.log('X-RateLimit-Remaining', xhr.getResponseHeader('X-RateLimit-Remaining'));

                this.setState(prevState => ({
                    commits: data.length,
                }));
            }.bind(this)
        });
    }
    render() {
        const repo = this.props.repo;
        let actor = this.props.data.user;

        return (
            <li>
                <a href={'https://github.com/' + repo.full_name + '/pull/' + this.props.data.number }>
                    <img src={actor.avatar_url} />
                    <span className="number">#{this.props.data.number} -</span>
                    <span className="commits"><i className="fa fa-share-alt" aria-hidden="true"></i> {this.state.commits}</span>
                    <span className="comments"><i className="fa fa-comment"></i> {this.state.comments}</span>
                    {actor.login}
                    <p>{this.props.data.title}</p>
                </a>
            </li>
        );
    }
}
