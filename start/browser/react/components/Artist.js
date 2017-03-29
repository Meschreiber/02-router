import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Songs from './Songs';
import Albums from './Albums';

export default class Artist extends React.Component {

    componentDidMount() {
        const artistId = this.props.routeParams.artistId;
        const selectArtist = this.props.selectArtist;
        const findAlbums = this.props.findAlbums; // this is a method 
        const findSongs = this.props.findSongs;
        selectArtist(artistId);
        findAlbums(artistId);
        findSongs(artistId);
    }

    render() {

        const selectedArtist = this.props.selectedArtist;
        const children = this.props.children;
        const propsToPassToChildren = {
            currentSong: this.props.currentSong,
            isPlaying: this.props.isPlaying,
            toggle: this.props.toggleOne,
            albums: this.props.albums,
            songs: this.props.currentSongList
        }

        return (
            <div>
                <h3>{selectedArtist.name}</h3>
                <ul className="nav nav-tabs">
                    <li><Link activeStyle={{ color: 'red' }} to={`/artists/${selectedArtist.id}/albums`}>ALBUMS</Link></li>
                    <li><Link activeClassName="active" to={`/artists/${selectedArtist.id}/songs`}>SONGS</Link></li>
                </ul>
                { children && React.cloneElement(children, propsToPassToChildren) }
            </div>
        )
    }

}



/*

export default class Artist extends React.Component {

    componentDidMount() {
        const artistId = this.props.routeParams.artistId;
        const selectArtist = this.props.selectArtist;
        const findAlbums = this.props.findAlbums; // this is a method 
        const findSongs = this.props.findSongs;
        selectArtist(artistId);
        findAlbums(artistId);
        findSongs(artistId);
    }

    render() {
        console.log("current songs", this.props.currentSongList)
        const artist = this.props.selectedArtist
        const currentSong = this.props.currentSong;
        const isPlaying = this.props.isPlaying;
        const toggle = this.props.toggleOne;
        return (
            <div>
                <h3>{artist.name}</h3>
                <h4>ALBUMS</h4>
                <Link to={`/api/artists/${artist.id}/albums`} />
                <Albums albums={this.props.albums} />
                <h4>SONGS</h4>
                <Link to={`/api/artists/${artist.id}/songs`} />
                <Songs currentSong={currentSong} isPlaying={isPlaying} toggle={toggle} songs={this.props.currentSongList} />
            </div>
        )
    }

}

*/