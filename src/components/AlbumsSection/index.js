import {Component} from 'react'

class AlbumsSection extends Component {
  state = {albumData: []}

  componentDidMount() {
    this.getAlbumTracks()
  }

  getAlbumTracks = async () => {
    const {selectedItemId} = this.props
    console.log(selectedItemId)
    const accessToken = localStorage.getItem('pa_token')
    if (accessToken === 'undefined') return
    const apiUrl = `https://api.spotify.com/v1/albums/${selectedItemId}/tracks`

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.items.map((eachItem, count) => ({
        serialNumber: count,
        name: eachItem.name,
        albumName: eachItem.name,
        artist: eachItem.artists[0].name,
        trackUri: eachItem.uri,
      }))
      this.setState({albumData: updatedData})
    }
  }

  onSelectAlbumTrack = e => {
    const {onSelectingAlTrack} = this.props
    onSelectingAlTrack(e.target.getAttribute('data-value'))
  }

  renderAlbumComponent = () => {
    const {albumData} = this.state
    const {coverPhoto} = this.props

    return (
      <div className="playlist-body-container">
        <div className="playlist-body-top-container">
          <img
            className="category-playlist-image"
            src={coverPhoto}
            alt="CoverPhoto"
          />
          <div className="category-playlist-text-container">
            <h3 className="category-playlist-name">Editor&apos;s Pick</h3>
            <h1 className="category-playlist-description">Play the Beat Yo!</h1>
            <h3 className="category-playlist-artist-name">Mickey J.Meyer</h3>
          </div>
        </div>
        <div className="playlist-body-bottom-container">
          <ul className="column-container">
            <li className="track">Track</li>
            <li className="album">Album</li>
            <li className="time">Time</li>
            <li className="artist">Artist</li>
          </ul>
          <table className="playlist-tracks-list">
            {albumData.map(eachItem => (
              <tr value={eachItem.trackUri} className="playlist-track">
                <td
                  onClick={this.onSelectAlbumTrack}
                  data-value={eachItem.trackUri}
                  className="track-item-bt"
                >
                  {eachItem.serialNumber}
                </td>
                <td
                  onClick={this.onSelectAlbumTrack}
                  data-value={eachItem.trackUri}
                  className="track-item-bt"
                >
                  {eachItem.name}
                </td>
                <td
                  onClick={this.onSelectAlbumTrack}
                  data-value={eachItem.trackUri}
                  className="track-item-bt"
                >
                  {eachItem.albumName}
                </td>
                <td
                  onClick={this.onSelectAlbumTrack}
                  data-value={eachItem.trackUri}
                  className="track-item-bt"
                >
                  3:05
                </td>
                <td
                  onClick={this.onSelectAlbumTrack}
                  data-value={eachItem.trackUri}
                  className="track-item-bt"
                >
                  {eachItem.artist}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    )
  }

  render() {
    return <div>{this.renderAlbumComponent()}</div>
  }
}

export default AlbumsSection
