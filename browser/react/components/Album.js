import React from 'react';
import Songs from '../components/Songs';
import axios from 'axios';
import {convertAlbum} from '../utils';

class Album extends React.Component {
  constructor(props) {
    super();
    this.state = {
      album: {},
      currentSong: props.currentSong,
      isPlaying: props.isPlaying,
      toggleOne: props.toggleOne
    }
  }
  componentDidMount() {
    console.log('this.props', this.props);
    axios.get(`api/albums/${this.props.routeParams.albumId}`)
      .then(album => {
        console.log('returned album', album.data);
        this.setState({
          album: convertAlbum(album.data)
        })
      })
  }
  render() {
    return (<div className="album">
      <div>
        <h3>{this.state.album.name}</h3>
        <img src={this.state.album.imageUrl} className="img-thumbnail" />
      </div>
      <Songs
        songs={this.state.album.songs}
        currentSong={this.state.currentSong}
        isPlaying={this.state.isPlaying}
        toggleOne={this.state.toggleOne} />
    </div>
    )
  }
}

export default Album;
