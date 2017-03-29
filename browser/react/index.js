import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import { Router, Route, hashHistory, IndexRedirect } from 'react-router';
import Albums from './components/Albums';
import Album from './components/Album';
import Artists from './components/Artists';
import Artist from './components/Artist';
import Songs from './components/Songs';
import NotFound from './components/NotFound'





ReactDOM.render(
  <div>
    <Router history={hashHistory}>
      <Route path="/" component={AppContainer}>


        // IndexRedirect usage: http://stackoverflow.com/questions/42322399/react-router-how-to-indexredirect-to-dynamic-route
        <Route path="albums" component={Albums} />
        <Route path="albums/:albumId" component={Album} />
        <Route path="artists" component={Artists} />
        <Route path="artists/:artistId" component={Artist}>
          <Route path="albums" component={Albums} />
          <Route path="songs" component={Songs} />
        </Route>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </div>,
  document.getElementById('app')
);

        // <IndexRedirect to="/albums" />
