import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

import {notify} from './notify';

export class Ledgers extends React.Component {
    constructor(props) {
        super(props);

        console.log('construct Repo Ledgers');
        let repos = props.repos.map((repo) => {
            return (
                <Ledger repo={repo} key={repo.full_name} settings={this.props.settings} />
            );
        });

        this.state = {
            repos: repos
        }
    }

    render() {
        return (
            <div id="ledgers">{this.state.repos}</div>
        );
    }
}

class Ledger extends React.Component {
    constructor(props) {
        super(props);

        const settings = props.settings;
        // TODO: init from state

        this.state = {
            eventsKeys: [],
            events: [],
            etag: "",
        };

        this.mainClick = this.mainClick.bind(this);
    }

    mainClick(e) {
        e.preventDefault();
        this.clearEvents();
    }

    clearEvents() {
        this.setState({
            events: []
        });
    }

    genEvents(data) {
        const settings = this.props.settings;
        data = data || [];
        let newKeys = [];
        let evts = [];

        // only add ids that we do not have
        for (var i in data) {
            let el = data[i];

            if (this.state.eventsKeys.includes(el.id) == false) {
                newKeys.push(el.id);
                evts.push(el);
            }
        }

        // generate only the new events
        let events = evts.map((data) => {
            return (
                <LedgerEvent key={data.id} repo={this.props.repo} settings={settings} type={data.type} id={data.id} data={data} hidden={false} />
            )
        });

        return {events: events, keys: newKeys};
    }

    componentDidMount() {
        this.tick();

        this.timerID = setInterval(
            () => this.tick(), 1 * 60 * 1000 // seconds
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        const repo = this.props.repo;
        const settings = this.props.settings;
        let headers = {
            'Authorization': 'token ' + settings.token
        }

        if (this.state.etag != "") {
            headers['If-None-Match'] = this.state.etag;
        }

        console.log("get events", this.props.repo.full_name);
        $.ajax({
            url: 'https://api.github.com/repos/' + repo.full_name + '/events?per_page=300',
            method: 'GET',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            headers: headers,
            success: function(data, status, xhr) {
                const repo = this.props.repo;
                let etag = xhr.getResponseHeader('ETag');

                console.log('X-RateLimit-Remaining ETag',
                    xhr.getResponseHeader('X-RateLimit-Remaining'),
                    etag
                );

                let event_data = this.genEvents(data);
                let events = event_data.events;
                let eventsKeys = event_data.keys;

                if (events.length > 0) {
                    notify("ledger updates", repo.full_name);

                    this.setState(prevState => ({
                        eventsKeys: prevState.eventsKeys.concat([data.id])
                    }));

                    this.setState((prevState) => ({
                        etag: etag,
                        eventsKeys: prevState.eventsKeys.concat(eventsKeys),
                        events: prevState.events.concat(events)
                    }));
                }
            }.bind(this)
        });

        this.setState({
            date: new Date()
        });
    }

    render() {
        const repo = this.props.repo;

        if (this.state.events.length === 0) {
            return (null);
        }

        return (
            <div className="ledger">
                <a className="main" onClick={this.mainClick}>{repo.name}</a>

                <ul>{this.state.events}</ul>
            </div>
        );
    }
}

class LedgerEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            data: props.data,
            type: props.type,
            hidden: props.hidden
        }
    }

    render() {
        let repo = this.props.repo;
        let data = this.state.data;
        let type = this.state.type;

        if (this.state.hidden) {
            return (null);
        }

        if (type === "PullRequestReviewCommentEvent") {
            return <PullRequestReviewCommentEvent settings={this.props.settings} repo={repo} data={data} />;
        } else if (type === "IssueCommentEvent") {
            return <IssueCommentEvent settings={this.props.settings} repo={repo} data={data} />;
        } else {
            return <DefaultEvent repo={repo} data={data} />;
        }
    }
}

class IssueCommentEvent extends React.Component {
    constructor(props) {
        super(props);

        let payload = this.props.data.payload;
        let username = this.props.settings.username;
        let highlight = false;

        if (payload.comment.body.indexOf('@' + username) != -1) {
            highlight = true;
        }
        this.state = {
            highlight: highlight
        }
    }

    render() {
        let repo = this.props.repo;
        let actor = this.props.data.actor;
        let org = this.props.data.org;
        let data = this.props.data;
        let className = "";

        if (this.state.highlight) {
            className = "highlight";
        }

        return (
            <li className={className}>
                <a href={data.payload.comment.html_url}>
                <img src={actor.avatar_url} />
                {data.created_at} {actor.login} <br/>
                {data.type}<br/>
                </a>
            </li>
        );

    }
}

class PullRequestReviewCommentEvent extends React.Component {
    constructor(props) {
        super(props);

        let payload = this.props.data.payload;
        let username = this.props.settings.username;
        let highlight = false;

        if (payload.comment.body.indexOf('@' + username) != -1) {
            highlight = true;
        }
        this.state = {
            highlight: highlight
        }
    }

    render() {
        let repo = this.props.repo;
        let actor = this.props.data.actor;
        let org = this.props.data.org;
        let data = this.props.data;
        let className = "";

        if (this.state.highlight) {
            className = "highlight";
        }

        return (
            <li className={className}>
                <a href={data.payload.comment.html_url}>
                <img src={actor.avatar_url} />
                {data.created_at} {actor.login} <br/>
                {data.type}<br/>
                </a>
            </li>
        );

    }
}

class DefaultEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            highlight: false
        }
    }

    render() {
        let repo = this.props.repo;
        let actor = this.props.data.actor;
        let org = this.props.data.org;
        let data = this.props.data;

        return (
            <li>
                <a href={'https://github.com/' + repo.full_name }>
                <img src={actor.avatar_url} />
                {data.created_at} {actor.login} <br/>
                {data.type}<br/>
                </a>
            </li>
        );

    }
}
