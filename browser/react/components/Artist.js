import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

import Albums from './Albums'
import Songs from './Songs'
import {convertAlbums, convertSongs} from '../utils';

export default class Artist extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      albums: [],
      songs: [],
      currentSong: props.currentSong,
      isPlaying: props.isPlaying,
      toggleOne: props.toggleOne,
    }
  }
  componentDidMount() {
    const artistRequest = () => {
      return axios.get(`api/artists/${this.props.routeParams.artistId}`)
        .then(res => res.data);
    }
    const artistAlbumsRequest = () => {
      return axios.get(`api/artists/${this.props.routeParams.artistId}/albums`)
        .then(res => res.data);
    }
    const artistSongsRequest = () => {
      return axios.get(`api/artists/${this.props.routeParams.artistId}/songs`)
        .then(res => res.data);
    }

    axios.all([artistRequest(), artistAlbumsRequest(), artistSongsRequest()])
      .then(axios.spread((artist, albums, songs) => {
        console.log(artist)
        this.setState({
          name: artist.name,
          albums: convertAlbums(albums),
          songs: convertSongs(songs)
        })
      }))
      .catch(next());
  }
  render() {
    return (
      <div>
        <h3>{this.state.name}</h3>
        <ul className="nav nav-tabs">
          <li><Link to={`/artists/${this.props.routeParams.artistId}/albums`} >ALBUMS</Link></li>
          <li><Link to={`/artists/${this.props.routeParams.artistId}/songs`}>SONGS</Link></li>
        </ul>
        {this.props.children && React.cloneElement(this.props.children, this.state)}
      </div>
    )
  }
}



