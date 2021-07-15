import {Route, Switch, Redirect} from 'react-router-dom'
// import SpotifyClone from './components/SpotifyClone'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

import YourMusicSection from './components/YourMusicSection'
import PlaylistsSection from './components/PlaylistsSection'
import ProfileSection from './components/ProfileSection'
import HomeSection from './components/HomeSection'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={HomeSection} />
    <ProtectedRoute exact path="/profile" component={ProfileSection} />
    <ProtectedRoute exact path="/yourmusic" component={YourMusicSection} />
    <ProtectedRoute exact path="/playlists" component={PlaylistsSection} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
