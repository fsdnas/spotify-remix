import {Route, Switch} from 'react-router-dom'
// import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

import YourMusicSection from './components/YourMusicSection'
import PlaylistsSection from './components/PlaylistsSection'
import ProfileSection from './components/ProfileSection'
import HomeSection from './components/HomeSection'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={HomeSection} />
    <ProtectedRoute exact path="/profile" component={ProfileSection} />
    <ProtectedRoute exact path="/yourmusic" component={YourMusicSection} />
    <ProtectedRoute exact path="/playlists" component={PlaylistsSection} />
  </Switch>
)

export default App
