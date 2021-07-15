import './index.css'

const NotFound = props => {
  const {history} = props
  const onclickHome = () => {
    history.push('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dmnrh67gl/image/upload/v1626358885/My%20Projects/spotify-remix/Pngtree_web_page_return_404_error_6186266_vxns5b.png"
        alt="not-found"
        className="not-found-img"
      />
      <button onClick={onclickHome} type="button" className="go-home-btn">
        Go Home
      </button>
    </div>
  )
}

export default NotFound
