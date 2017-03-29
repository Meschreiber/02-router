import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Artists from './components/Artists.js'
import Albums from './components/Albums.js';
import Album from './components/Album.js';
import Artist from './components/Artist.js';
import Songs from './components/Songs.js';
import {  Router
        , Route
        , hashHistory
        , IndexRedirect } from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRedirect to="/albums" />
      <Route path="/albums" component={Albums} />
      <Route path="albums/:albumId" component={Album} />
      <Route path="/artists" component={Artists} />
      <Route path="artists/:artistId" component={Artist} /> 
      <Route path="artists/:artistId/albums" component={Albums} />
      <Route path="artists/:artistId/songs" component={Songs} />
    </Route>
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