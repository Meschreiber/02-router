import React from 'react';
import Songs from '../components/Songs';

export default class Album extends React.Component {
  constructor(props) {
    super(props);
  }
  // access to props.params.albumId

  componentDidMount() {
    const albumId = this.props.routeParams.albumId;
    const selectAlbum = this.props.selectAlbum; // this is a method

    selectAlbum(albumId);
  }

  render() {
    const props = this.props;
    // const {props} = this;  // Equivalent to the top
    const album = props.album;
    const currentSong = props.currentSong;
    const isPlaying = props.isPlaying;
    const toggleOne = props.toggleOne;

    return (
      <div className="album">
        <div>
          <h3>{album.name}</h3>
          <img src={album.imageUrl} className="img-thumbnail" />
        </div>
        <Songs
          songs={album.songs}
          currentSong={currentSong}
          isPlaying={isPlaying}
          toggleOne={toggleOne} />
      </div>
    );
  }
}

