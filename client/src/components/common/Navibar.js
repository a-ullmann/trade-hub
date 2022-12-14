import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import { isAuthenticated, handleLogout, getToken, getPayload } from '../../helpers/auth'
import axios from 'axios'






const Navibar = () => {


  const navigate = useNavigate()
  const [userId, setUserId] = useState(() => {
    if (getToken()) return getPayload().sub
    return ''
  })
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)






  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.search-container') && isDropdownVisible) {
        setIsDropdownVisible(false)
      }
    }
    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [search, isDropdownVisible])

  const handleFocus = () => {
    setIsDropdownVisible(true)
  }

  const handleClickItem = () => {
    setIsDropdownVisible(false)
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.get(`/api/items/${search}/`)
      setSearchResults(data)
    } catch (err) {
      console.log(err)
    }
  }







  return (
    <Navbar bg='dark' variant='dark' className='navbar'>
      <Container>
        <Navbar.Brand as={Link} to='/'>TRADE</Navbar.Brand>
        <div className='search-container'>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                type='text'
                placeholder='Search'
                value={search}
                onChange={handleChange}
                onFocus={handleFocus}
                className='search-input'
              />
            </div>
          </form>
          {isDropdownVisible && searchResults.length > 0 && (
            <div className='search-dropdown'>
              {searchResults.map((result) => (
                <div key={result.id} className='text-decoration-none' onClick={handleClickItem}>
                  <ul onClick={() => navigate(`${result.id}`)} className='search-dropdown-item'>{result.name}</ul>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className='nav-items'>
          {isAuthenticated() ?
            <>
              <Nav.Link as={Link} to={`/users/${userId}`} className='navbar-link'>Profile</Nav.Link>
              <span onClick={() => handleLogout(navigate)} className='navbar-link'>Logout</span>
            </>
            :
            <>
              <Nav.Link as={Link} to='/login' className='navbar-link'>Login</Nav.Link>
              <Nav.Link as={Link} to='/register' className='navbar-link'>Register</Nav.Link>
            </>
          }
        </div>
      </Container>
    </Navbar>
  )
}

export default Navibar