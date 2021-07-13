import {Component} from 'react'

import './index.css'
import Sidebar from '../Sidebar'
import Player from '../Player'

const accessToken = localStorage.getItem('pa_token')

class YourMusicSection extends Component {
  state = {yourMusicData: [], currentTrack: '', isPlaying: false}

  componentDidMount() {
    this.getYourMusicComponents()
  }

  getYourMusicComponents = async () => {
    const {history} = this.props
    if (accessToken === 'undefined') {
      history.replace('/login')
    }
    const apiUrl = 'https://api.spotify.com/v1/me/tracks?market=IN'

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const millisToMinutesAndSeconds = millis => {
      const minutes = Math.floor(millis / 60000)
      const seconds = ((millis % 60000) / 1000).toFixed(0)
      const zero = seconds < 10 ? '0' : ''
      const time = `${minutes}:${zero}${seconds}`
      return time
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.items.map((eachItem, count) => ({
        serialNumber: count,
        id: eachItem.track.id,
        artist: eachItem.track.artists[0].name,
        name: eachItem.track.name,
        album: eachItem.track.album.name,
        duration: millisToMinutesAndSeconds(eachItem.track.duration_ms),
        releaseDate: eachItem.added_at,
        imageUrl: eachItem.track.album.images[2].url,
        trackUri: eachItem.track.uri,
      }))
      this.setState({yourMusicData: updatedData})
    }
  }

  onClickYourMusicTrack = event => {
    const {isPlaying} = this.state
    const track = event.target.getAttribute('data-track')
    this.setState({
      currentTrack: track,
      isPlaying: !isPlaying,
    })
  }

  renderYourMusic = () => {
    const {yourMusicData} = this.state
    return (
      <div className="your-music-bg-container">
        <h1 className="your-music-heading">Your Music</h1>
        <ul className="your-music-tracks-container">
          {yourMusicData.map(each => (
            <li
              className="your-music-track"
              onClick={this.onClickYourMusicTrack}
              data-track={each.trackUri}
            >
              <div className="your-music-track-left-container">
                <img
                  className="your-music-track-thumbnail"
                  src={each.imageUrl}
                  alt={each.album}
                />
                <div className="your-music-track-details-container">
                  <h1 className="your-music-track-artist">{each.artist}</h1>
                  <p className="your-music-track-details">
                    {each.artist} - {each.name}, {each.album}
                  </p>
                </div>
              </div>

              <div className="your-music-track-right-container">
                <p className="duration">{each.duration}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {currentTrack, isPlaying} = this.state
    return (
      <div>
        <Sidebar />
        {this.renderYourMusic()}
        <Player
          accessToken={accessToken}
          isPlaying={isPlaying}
          trackUri={currentTrack}
          key={currentTrack}
        />
      </div>
    )
  }
}

export default YourMusicSection
