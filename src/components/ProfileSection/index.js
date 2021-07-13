import {BsPersonFill} from 'react-icons/bs'
import {Component} from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

import './index.css'
import Sidebar from '../Sidebar'

class ProfileSection extends Component {
  state = {followersCount: 0, playlistsCount: 0, displayName: ''}

  componentDidMount() {
    this.getProfilePage()
  }

  getProfilePage = async () => {
    const accessToken = localStorage.getItem('pa_token')

    const spotifyApi = new SpotifyWebApi()
    const {history} = this.props
    if (!accessToken || accessToken === 'undefined') {
      history.replace('/login')
    }
    spotifyApi.setAccessToken(accessToken)

    const profileResponse = await spotifyApi.getMe()
    const followers = profileResponse.body.followers.total
    const userName = profileResponse.body.display_name

    const playlistsResponse = await spotifyApi.getUserPlaylists()
    const playlists = playlistsResponse.body.items.length
    this.setState({
      displayName: userName,
      followersCount: followers,
      playlistsCount: playlists,
    })
  }

  onClickLogout = () => {
    const {history} = this.props
    localStorage.removeItem('pa_token')
    history.replace('/login')
  }

  render() {
    const {followersCount, playlistsCount, displayName} = this.state

    return (
      <>
        <Sidebar />
        <div className="profileSection-bg-container">
          <div className="profile-icon-container">
            <BsPersonFill className="profileSection-icon" />
          </div>
          <h1 className="profileSection-heading">{displayName}</h1>
          <div className="profileSection-followers-container">
            <div className="followers-container">
              <p className="followers-count">{followersCount}</p>
              <p className="followers-txt">FOLLOWERS</p>
            </div>
            <div className="playlists-container">
              <p className="playlists-count">{playlistsCount}</p>
              <p className="followers-txt">PLAYLISTS</p>
            </div>
          </div>
          <button
            onClick={this.onClickLogout}
            className="logout-btn"
            type="button"
          >
            LOGOUT
          </button>
        </div>
      </>
    )
  }
}

export default ProfileSection
