import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import SearchBar from './components/SearchBar';
import VideoList from './components/VideoList';
import VideoMain from './components/VideoMain';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      activeVideo: {},
      defaultSearchTerm: 'monkeys'
    };
  }

  componentWillMount() {
    this.search(this.state.defaultSearchTerm);
  }

  searchTermChanged(e) {
    this.search(e.target.value);
  }

  search(term) {
    axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        q: term,
        key: process.env.REACT_APP_YOUTUBE_API_KEY,
        part: 'snippet',
        type: 'video'
      }
    })
    .then(response => {
      const videos = response.data.items;

      this.setState({
        videos: videos,
        activeVideo: videos[0]
      });
    })
    .catch(error => {
      console.log('Error: ', error);
    });
  }

  videoClicked(video) {
    this.setState({
      activeVideo: video
    });
  }

  render() {
    return (
      <div className="container">
        <SearchBar
          searchTermChanged={ this.searchTermChanged.bind(this) } />
        <VideoMain
          video={ this.state.activeVideo } />
        <VideoList
          videoClicked={ this.videoClicked.bind(this) }
          videos={ this.state.videos } />
      </div>
    );
  }
}

export default App;
