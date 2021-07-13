import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'

import {
  BsPersonFill,
  BsFillHouseDoorFill,
  BsMusicNoteList,
} from 'react-icons/bs'

import {FaMusic} from 'react-icons/fa'
import './index.css'

const sideBarItems = [
  {
    id: 'profile',
    iconName: BsPersonFill,
    itemName: 'Profile',
    name: 'PROFILE',
  },
  {
    id: '',
    iconName: BsFillHouseDoorFill,
    itemName: 'Home',
    name: 'HOME',
  },
  {
    id: 'yourmusic',
    iconName: FaMusic,
    itemName: 'Your Music',
    name: 'YOURMUSIC',
  },
  {
    id: 'playlists',
    iconName: BsMusicNoteList,
    itemName: 'Playlists',
    name: 'PLAYLISTS',
  },
]

class Sidebar extends Component {
  renderSidebarItemsList = () => {
    const {history} = this.props
    const currentPath = history.location.pathname.slice(1)

    const {followersCount} = this.props
    console.log(followersCount)

    return sideBarItems.map(Item => {
      const IconName = Item.iconName
      const buttonClassName = Item.id === currentPath ? 'active-item' : ''

      return (
        <Link to={`/${Item.id}`} style={{textDecoration: 'none'}}>
          <li
            className={`sidebar-list-item ${buttonClassName}`}
            value={Item.id}
            key={Item.id}
          >
            <IconName
              followersCount={followersCount}
              key={Item.id}
              className="icon"
            />
            <p className="icon-txt">{Item.itemName}</p>
          </li>
        </Link>
      )
    })
  }

  render() {
    return (
      <nav className="side-nav-bar">
        <Link to="/">
          <img
            className="sidebar-logo"
            alt="remix logo"
            src="https://res.cloudinary.com/dmnrh67gl/image/upload/v1625948012/My%20Projects/spotify-remix/spotify-remix-logo_r5i1lt.png"
          />
        </Link>
        <ul className="side-nav-items-container">
          {this.renderSidebarItemsList()}
        </ul>
      </nav>
    )
  }
}

export default withRouter(Sidebar)
