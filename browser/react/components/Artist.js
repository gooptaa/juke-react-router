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
        this.setState({
          name: artist.name,
          albums: convertAlbums(albums),
          songs: convertSongs(songs)
        })
      }))
      .catch(console.error);
  }
  render() {
    return (<div>
      <h3>{this.state.name}</h3>
      <Albums albums={this.state.albums} />
      <Songs
        songs={this.state.songs}
        currentSong={this.state.currentSong}
        isPlaying={this.state.isPlaying}
        toggleOne={this.state.toggleOne} />
    </div>)
  }
}
