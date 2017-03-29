import React, { Component } from 'react';
import axios from 'axios';

import initialState from '../initialState';
import AUDIO from '../audio';

import Albums from '../components/Albums.js';
import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import Artist from '../components/Artist';
import Artists from '../components/Artists';

import { convertAlbum, convertAlbums, skip } from '../utils';

export default class AppContainer extends Component {

  constructor(props) {
    super(props);
    this.state = initialState;

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.selectAlbum = this.selectAlbum.bind(this);
    this.deselectAlbum = this.deselectAlbum.bind(this);
    this.selectArtist = this.selectArtist.bind(this);
    this.findAlbums = this.findAlbums.bind(this);
    this.findSongs = this.findSongs.bind(this);
  }

  componentDidMount() {
    // THESE AXIOS REQUESTS MAKE INFO AVAILABLE

    // sets image urls and song audio urls
    axios.get('/api/albums/')
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)));

    // puts artists on this.state -- line 145ish passes this to child components
    axios.get('/api/artists/')
      .then(res => res.data)
      .then(artists => {
        this.onArtistLoad(artists)
      });

    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
  }

  onLoad(albums) {
    this.setState({
      albums: albums
    });
  }

  onArtistLoad(artists) {
    this.setState({
      artists: artists
    });
  }

  play() {
    AUDIO.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    AUDIO.pause();
    this.setState({ isPlaying: false });
  }

  load(currentSong, currentSongList) {
    AUDIO.src = currentSong.audioUrl;
    AUDIO.load();
    this.setState({
      currentSong: currentSong,
      currentSongList: currentSongList
    });
  }

  startSong(song, list) {
    this.pause();
    this.load(song, list);
    this.play();
  }

  toggleOne(selectedSong, selectedSongList) {
    if (selectedSong.id !== this.state.currentSong.id)
      this.startSong(selectedSong, selectedSongList);
    else this.toggle();
  }

  toggle() {
    if (this.state.isPlaying) this.pause();
    else this.play();
  }

  next() {
    this.startSong(...skip(1, this.state));
  }

  prev() {
    this.startSong(...skip(-1, this.state));
  }

  setProgress(progress) {
    this.setState({ progress: progress });
  }

  selectAlbum(albumId) {
    axios.get(`/api/albums/${albumId}`)
      .then(res => res.data)
      .then(album => this.setState({
        selectedAlbum: convertAlbum(album)
      }));
  }

  selectArtist(artistId) {
    // this URL will display all albums/songs from a particular artists
    axios.get(`/api/artists/${artistId}`)
      .then(res => res.data)
      .then(artist => {
        this.setState({
          selectedArtist: artist
        });
      });
  }

  findAlbums(artistId){
    // getting information to display relevant albums for a particular artist
    axios.get(`/api/artists/${artistId}/albums`)
      .then(res => res.data)
      .then(album => this.onLoad(convertAlbums(album)))
  }

    findSongs(artistId){
    // getting information to display relevant albums for a particular artist
    axios.get(`/api/artists/${artistId}/songs`)
      .then(res => res.data)
      .then(songs=> {
        this.setState({
        currentSongList: songs
      })
    })
  }
  


  deselectAlbum() {
    this.setState({ selectedAlbum: {} });
  }

  render() {
    // console.log('this.props.children', this.props.children);
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar deselectAlbum={this.deselectAlbum} />
        </div>
        <div className="col-xs-10">
          {
            this.props.children ?
              React.cloneElement(this.props.children, {

                // Album (singular) component's props
                album: this.state.selectedAlbum,
                currentSong: this.state.currentSong,
                isPlaying: this.state.isPlaying,
                toggle: this.toggleOne,

                // Albums (plural) component's props
                albums: this.state.albums,
                selectAlbum: this.selectAlbum, // note that this.selectAlbum is a method, and this.state.selectedAlbum is the chosen album

                // Artists component's props
                artists: this.state.artists,
                selectArtist: this.selectArtist, // this is a method; analogous to selectAlbum
                selectedArtist: this.state.selectedArtist,
                findAlbums: this.findAlbums,
                findSongs: this.findSongs,
                currentSongList: this.state.currentSongList

              })
              : null
          }
        </div>
        <Player
          currentSong={this.state.currentSong}
          currentSongList={this.state.currentSongList}
          isPlaying={this.state.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}
