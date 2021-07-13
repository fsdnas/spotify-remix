import {Component} from 'react'

import SpotifyPlayer from 'react-spotify-web-playback'
import './index.css'

class Player extends Component {
  renderSpotifyPlayer = () => {
    const {accessToken, trackUri, isPlaying} = this.props
    if (!accessToken) return null
    console.log(accessToken)
    console.log(trackUri)

    return (
      <div className="spotify-player-container">
        <SpotifyPlayer
          styles={{
            activeColor: '#1DB954',
            bgColor: '#181818',
            color: '#ffffff',
            loaderColor: '#fff',
            sliderColor: '#1DB954',
            sliderTrackBorderRadius: '80px',
            sliderHandleColor: '#ffffff',
            trackArtistColor: '#9B9B9B',
            trackNameColor: '#ffffff',
            errorColor: 'red',
            sliderTrackColor: '#9B9B9B',
          }}
          token={accessToken}
          uris={trackUri ? [trackUri] : []}
          play={isPlaying}
          showSaveIcon
        />
      </div>
    )
  }

  render() {
    return <div>{this.renderSpotifyPlayer()}</div>
  }
}

export default Player
