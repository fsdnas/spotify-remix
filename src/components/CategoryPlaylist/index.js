import {Component} from 'react'

import {AiOutlineArrowLeft} from 'react-icons/ai'
import './index.css'
import Player from '../Player'
import AlbumsSection from '../AlbumsSection'

const accessToken = localStorage.getItem('pa_token')

class CategoryPlaylist extends Component {
  state = {
    categoryPlaylistData: [],
    selectedPlaylistImageUrl: '',
    currentTrackUri: '',
    isPlaying: false,
  }

  componentDidMount() {
    this.getCategoryPlaylist()
  }

  getCategoryPlaylist = async () => {
    const {selectedItemId} = this.props

    if (accessToken === 'undefined') return
    const apiUrl = `https://api.spotify.com/v1/playlists/${selectedItemId}/tracks`
    const apiPlaylistImageUrl = `https://api.spotify.com/v1/playlists/${selectedItemId}/images`

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
        name: eachItem.track.name,
        albumName: eachItem.track.album.name,
        artist: eachItem.track.artists[0].name,
        imageUrl: eachItem.track.album.images[0].url,
        trackUri: eachItem.track.uri,
        duration: millisToMinutesAndSeconds(eachItem.track.duration_ms),
        addedOn: eachItem.added_at.slice(0, 10),
      }))
      const image = await fetch(apiPlaylistImageUrl, options)
      if (image.ok) {
        const fetchUrl = await image.json()
        const imageUrl = fetchUrl[0].url
        this.setState({selectedPlaylistImageUrl: imageUrl})
      }
      this.setState({categoryPlaylistData: updatedData})
    }
  }

  onclickBackButton = () => {
    const {getBackToHome} = this.props
    getBackToHome()
  }

  onSelectTrack = event => {
    const {isPlaying} = this.state
    this.setState({
      currentTrackUri: event.target.getAttribute('data-value'),
      isPlaying: !isPlaying,
    })
  }

  renderCategoryPlaylistBody = () => {
    const {categoryPlaylistData, selectedPlaylistImageUrl} = this.state
    const {detailsPageTitle} = this.props

    return (
      <div className="playlist-body-container">
        <div className="playlist-body-top-container">
          <img
            className="category-playlist-image"
            src={selectedPlaylistImageUrl}
            alt="thumb"
          />
          <div className="category-playlist-text-container">
            <h3 className="category-playlist-name">Editor&apos;s Pick</h3>
            <h1 className="category-playlist-description">
              {detailsPageTitle}
            </h1>
            <h3 className="category-playlist-artist-name">Mickey J.Meyer</h3>
          </div>
        </div>
        <div className="playlist-body-bottom-container">
          <ul className="column-container">
            <li className="track">Track</li>
            <li className="album">Album</li>
            <li className="time">Time</li>
            <li className="artist">Artist</li>
            <li className="added">Added</li>
          </ul>
          <hr />
          <table className="playlist-tracks-list">
            {categoryPlaylistData.map(track => (
              <tr className="playlist-track">
                <td
                  onClick={this.onSelectTrack}
                  data-value={track.trackUri}
                  value={track.trackUri}
                >
                  {track.serialNumber}
                </td>
                <td
                  onClick={this.onSelectTrack}
                  data-value={track.trackUri}
                  value={track.trackUri}
                  className="track-item-bt"
                >
                  {track.name}
                </td>
                <td
                  onClick={this.onSelectTrack}
                  data-value={track.trackUri}
                  value={track.trackUri}
                  className="track-item-bt"
                >
                  {track.albumName}
                </td>
                <td
                  onClick={this.onSelectTrack}
                  data-value={track.trackUri}
                  value={track.trackUri}
                  className="track-item-bt"
                >
                  {track.duration}
                </td>
                <td
                  onClick={this.onSelectTrack}
                  data-value={track.trackUri}
                  value={track.trackUri}
                  className="track-item-bt"
                >
                  {track.artist}
                </td>
                <td
                  onClick={this.onSelectTrack}
                  data-value={track.trackUri}
                  value={track.trackUri}
                  className="track-item-bt"
                >
                  {track.addedOn}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }

  onSelectingAlTrack = value => {
    const {isPlaying} = this.state
    this.setState({currentTrackUri: value, isPlaying: !isPlaying})
  }

  renderAlbum = () => {
    const {selectedItemId, coverPhoto} = this.props
    return (
      <div>
        <AlbumsSection
          coverPhoto={coverPhoto}
          selectedItemId={selectedItemId}
          onSelectingAlTrack={this.onSelectingAlTrack}
        />
      </div>
    )
  }

  render() {
    const {currentTrackUri, isPlaying} = this.state
    const {selectedSection} = this.props
    return (
      <div>
        <div className="back-btn-container">
          <button
            onClick={this.onclickBackButton}
            className="back-btn"
            id="back-btn"
            type="button"
          >
            <AiOutlineArrowLeft className="back-arrow" />
            <label className="back-btn-label" htmlFor="back-btn">
              Back
            </label>
          </button>
        </div>
        {selectedSection === 'newreleases'
          ? this.renderAlbum()
          : this.renderCategoryPlaylistBody()}

        <Player
          isPlaying={isPlaying}
          accessToken={accessToken}
          trackUri={currentTrackUri}
          key={currentTrackUri}
        />
      </div>
    )
  }
}

export default CategoryPlaylist
