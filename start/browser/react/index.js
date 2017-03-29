import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Artists from './components/Artists.js'
import Albums from './components/Albums.js';
import Album from './components/Album.js';
import Artist from './components/Artist.js';
import Songs from './components/Songs.js';
import My404 from './components/My404.js';

import {
  Router
  , Route
  , hashHistory
  , IndexRedirect
  , browserHistory
} from 'react-router';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/albums" />
      <Route path="/albums" component={Albums} />
      <Route path="albums/:albumId" component={Album} />
      <Route path="/artists" component={Artists} />
      <Route path="artists/:artistId" component={Artist}>
        <Route path="albums" component={Albums} />
        <Route path="songs" component={Songs} />
      </Route>
    </Route>
    <Route path='*' component={My404} />
  </Router>,
  document.getElementById('app')
);

/*

Load one artist:

Routes to hit:
  /api/artists/[artist id]
  /api/artists/[artist id]/albums
  /api/artists/[artist id]/songs 

+ transform data in same way we've done for album image URL and audio URL
*/