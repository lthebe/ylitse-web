import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Navigation from './Navigation';
import MissingPage from './MissingPage';
import SkillsPage from './SkillsPage';
import ProfileSheet from './ProfileSheet';

class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: undefined,
        };
    }

    componentWillMount() {
        this.fetchVersion();
    }

    fetchVersion = async () => {
        try {
            const resp = await fetch('/api/user', {
                credentials: 'include',
                redirect: 'follow',
            });
            if (resp.redirected) {
                window.location.replace(resp.url);
            }
            const data = await resp.json();

            this.setState({ username: data.username });
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        const { username } = this.state;

        if (username === undefined) {
            return <div />;
        }

        return (
            <main>
                <Route
                    render={props => (
                        <Navigation {...props} username={username} />
                    )}
                />
                <Switch>
                    <Route path="/" exact><Redirect to="/accounts" /></Route>
                    <Route path="/accounts" exact component={ProfileSheet} />
                    <Route path="/skills" exact component={SkillsPage} />
                    <Route component={MissingPage} />
                </Switch>
            </main>
        );
    }
}

export default Root;
