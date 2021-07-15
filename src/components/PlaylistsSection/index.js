import {Component} from 'react'
import Sidebar from '../Sidebar'
import CategoryPlaylist from '../CategoryPlaylist'
import './index.css'

const accessToken = localStorage.getItem('pa_token')
class PlaylistsSection extends Component {
  state = {
    playlistData: [],
    selectedPlaylistId: '',
    isSelected: false,
    detailsPageTitle: '',
    detailsPageheading: '',
    selectedSection: 'myPlaylist',
    coverPhoto: '',
  }

  componentDidMount() {
    this.getPlaylistPage()
  }

  getPlaylistPage = async () => {
    const {history} = this.props
    if (accessToken === 'undefined') {
      history.replace('/login')
    }
    const apiUrl = 'https://api.spotify.com/v1/me/playlists'

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.images[0].url,
        tracksUri: eachItem.uri,
        totalTracks: eachItem.tracks.total,
      }))
      console.log(updatedData)
      this.setState({playlistData: updatedData})
    }
  }

  onclickPlaylist = event => {
    const {isSelected} = this.state
    this.setState({
      selectedPlaylistId: event.target.getAttribute('data-playlist'),
      isSelected: !isSelected,
      detailsPageTitle: event.target.getAttribute('data-name'),
      coverPhoto: event.target.getAttribute('data-imageUrl'),
    })
  }

  renderPlaylistItems = () => {
    const {playlistData} = this.state

    return (
      <div className="playlist-content-container">
        <h1 className="playlist-heading">Your Playlists</h1>
        <ul className="playlists-items-container">
          {playlistData.map(eachItem => (
            <li className="playlist-item">
              <img
                className="thumbnail"
                alt="tracksThumbnail"
                src={eachItem.imageUrl}
                onClick={this.onclickPlaylist}
                data-playlist={eachItem.id}
                data-name={eachItem.name}
                data-imageUrl={eachItem.imageUrl}
              />
              <h1 className="playlist-name">{eachItem.name}</h1>
              <p className="tracks">{`${eachItem.totalTracks} Tracks`}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  getBackToHome = () => {
    this.setState({isSelected: false})
  }

  renderBodyComponent = () => {
    const {
      selectedPlaylistId,
      isSelected,
      detailsPageTitle,
      detailsPageheading,
      selectedSection,
      coverPhoto,
    } = this.state

    return isSelected ? (
      <CategoryPlaylist
        selectedItemId={selectedPlaylistId}
        getBackToHome={this.getBackToHome}
        detailsPageTitle={detailsPageTitle}
        detailsPageheading={detailsPageheading}
        selectedSection={selectedSection}
        coverPhoto={coverPhoto}
        key={selectedPlaylistId}
      />
    ) : (
      <div>{this.renderPlaylistItems()}</div>
    )
  }

  render() {
    return (
      <div className="playlist-background">
        <Sidebar />
        {this.renderBodyComponent()}
      </div>
    )
  }
}

export default PlaylistsSection
