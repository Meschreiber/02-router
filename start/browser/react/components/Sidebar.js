import React from 'react';
import { Link } from 'react-router';

const Sidebar = (props) => {

  const deselectAlbum = props.deselectAlbum;

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item active">
          <Link to="/albums">ALBUMS</Link>
          <br/>
          <Link to="/artists">ARTISTS</Link>         
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;

// Examples
//  <a href="#" onClick={deselectAlbum}>ALBUMS</a>
// replaced with a link
// <Link to="/albums">Go to Albums</Link>
// <Link to={`/albums/${this.props.albumId}`}>Go to an Album</Link>

