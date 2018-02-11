import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Navigation from './Navigation';
import MissingPage from './MissingPage';
import SkillsPage from './SkillsPage';
import ProfileSheet from './ProfileSheet';

const Root = () => (
    <main>
        <Route component={Navigation} />
        <Switch>
            <Route path="/" exact><Redirect to="/accounts" /></Route>
            <Route path="/accounts" exact component={ProfileSheet} />
            <Route path="/skills" exact component={SkillsPage} />
            <Route component={MissingPage} />
        </Switch>
    </main>
);

export default Root;
