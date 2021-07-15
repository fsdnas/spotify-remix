import {Component} from 'react'

import Sidebar from '../Sidebar'
import './index.css'
import CategoryPlaylist from '../CategoryPlaylist'

class HomeSection extends Component {
  state = {
    categoriesData: [],
    selectedItemId: '',
    isSelected: false,
    editorsPickData: [],
    newReleasesData: [],
    detailsPageTitle: '',
    detailsPageheading: '',
    selectedSection: '',
    coverPhoto: '',
  }

  componentDidMount() {
    this.getEditorsPickComponents()
    this.getCategoryComponents()
    this.getNewReleaseComponents()
  }

  getNewReleaseComponents = async () => {
    const accessToken = localStorage.getItem('pa_token')
    const {history} = this.props
    if (accessToken === 'undefined') {
      history.replace('/login')
    }
    const apiUrl = 'https://api.spotify.com/v1/browse/new-releases?country=IN'

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.albums.items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        releaseDate: eachItem.release_date,
        imageUrl: eachItem.images[0].url,
        externalUrl: eachItem.external_urls,
      }))
      this.setState({newReleasesData: updatedData})
    }
  }

  getEditorsPickComponents = async () => {
    const accessToken = localStorage.getItem('pa_token')
    const {history} = this.props
    if (accessToken === 'undefined') {
      history.replace('/login')
    }
    const apiUrl = 'https://api.spotify.com/v1/browse/featured-playlists'

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedData = fetchedData.playlists.items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.images[0].url,
      }))
      this.setState({editorsPickData: updatedData})
    }
  }

  getCategoryComponents = async () => {
    const accessToken = localStorage.getItem('pa_token')
    const {history} = this.props
    if (accessToken === 'undefined') {
      history.replace('/login')
    }
    const apiUrl = 'https://api.spotify.com/v1/browse/categories'

    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.categories.items.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.name,
        imageUrl: eachItem.icons[0].url,
      }))
      this.setState({
        categoriesData: updatedData,
      })
    }
  }

  onclickItem = event => {
    const selectedValue = event.target.getAttribute('data-value')
    const {isSelected} = this.state

    this.setState({
      isSelected: !isSelected,
      selectedItemId: selectedValue,
      detailsPageheading: event.target.id,
      detailsPageTitle: event.target.id,
      selectedSection: event.target.getAttribute('data-section'),
      coverPhoto: event.target.getAttribute('data-imgUrl'),
    })
  }

  renderNewReleasesData = () => {
    const {newReleasesData} = this.state
    return (
      <>
        <div className="home-body-container">
          <h3 className="category-name">New Releases</h3>
          <ul className="home-category-items-container">
            {newReleasesData.map(eachItem => (
              <li className="home-category-item">
                <img
                  className="home-category-item-thumbnail"
                  src={eachItem.imageUrl}
                  alt={eachItem.name}
                  data-value={eachItem.id}
                  onClick={this.onclickItem}
                  key={eachItem.name}
                  id={eachItem.name}
                  data-section="newreleases"
                  data-imgUrl={eachItem.imageUrl}
                />
                <p className="home-category-list-name">{eachItem.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderEditorsPickData = () => {
    const {editorsPickData} = this.state
    return (
      <>
        <div className="home-body-container">
          <h3 className="category-name">Editor&apos;s picks</h3>
          <ul className="home-category-items-container">
            {editorsPickData.map(eachPlaylist => (
              <li className="home-category-item">
                <img
                  className="home-category-item-thumbnail"
                  src={eachPlaylist.imageUrl}
                  alt={eachPlaylist.name}
                  onClick={this.onclickItem}
                  data-value={eachPlaylist.id}
                  key={eachPlaylist.name}
                  id={eachPlaylist.name}
                  data-section="editorspicks"
                  data-imgUrl={eachPlaylist.imageUrl}
                />
                <p className="home-category-list-name">{eachPlaylist.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderCategoriesData = () => {
    const {categoriesData} = this.state
    return (
      <>
        <div className="home-body-container">
          <h3 className="category-name">Categories</h3>
          <ul className="home-category-items-container">
            {categoriesData.map(each => (
              <li className="home-category-item">
                <img
                  className="home-category-item-thumbnail"
                  src={each.imageUrl}
                  alt={each.id}
                  //   onClick={this.onclickItem}
                  data-value={each.id}
                  key={each.id}
                  id={each.name}
                  data-section="categories"
                  data-imgUrl={each.imageUrl}
                />
                <p className="home-category-list-name">{each.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  getBackToHome = () => {
    this.setState({isSelected: false})
  }

  renderBodyComponent = () => {
    const {
      isSelected,
      selectedItemId,
      detailsPageTitle,
      detailsPageheading,
      selectedSection,
      coverPhoto,
    } = this.state
    console.log(selectedSection)

    return isSelected ? (
      <CategoryPlaylist
        selectedItemId={selectedItemId}
        getBackToHome={this.getBackToHome}
        detailsPageTitle={detailsPageTitle}
        detailsPageheading={detailsPageheading}
        selectedSection={selectedSection}
        coverPhoto={coverPhoto}
        key={selectedItemId}
      />
    ) : (
      <div>
        {this.renderEditorsPickData()} {this.renderCategoriesData()}
        {this.renderNewReleasesData()}
      </div>
    )
  }

  render() {
    return (
      <div className="home-bg-container">
        <Sidebar />
        {this.renderBodyComponent()}
      </div>
    )
  }
}

export default HomeSection
