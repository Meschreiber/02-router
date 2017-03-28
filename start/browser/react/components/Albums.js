import React from 'react';
import { Link } from 'react-router';

export default class Albums extends React.Component {
constructor(props) {
    super(props);
  }

 
  render() {
    return (

      <div>
        <h3>Albums</h3>
        <div className="row">
          {
            this.props.albums.map(album => (
              <div className="col-xs-4" key={album.id}>
                <Link className="thumbnail" to={`/albums/${album.id}`}>
                <img src={album.imageUrl} />
                <div className="caption">
                  <h5>
                    <span>{album.name}</span>
                  </h5>
                  <small>{album.songs.length} songs</small>
                </div>
                </Link>

              </div>
            ))
          }
        </div>
      </div>
    );
  }  
}


// <a className="thumbnail" href="#" onClick={() => selectAlbum(album.id)}>
