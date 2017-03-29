import React from 'react';
import {Link} from 'react-router';

const Sidebar = () => {

  // const deselectAlbum = props.deselectAlbum;

  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <Link href="#" activeClassName="active" to={'/albums'}>ALBUMS</Link>
        </h4>
        <h4 className="menu-item">
          <Link href="#" activeClassName="active" to={'/artists'}>ARTISTS</Link>
        </h4>
      </section>
    </sidebar>
  );
}

export default Sidebar;

          // <a href="#" onClick={deselectAlbum}>ALBUMS</a>
