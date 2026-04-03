import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle }) => (
  <header style={{
    background: '#0a0a0a',
    borderBottom: '2px solid #cc2222',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  }}>
    <div style={{
      margin: '0 auto',
      maxWidth: 1100,
      padding: '0 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
    }}>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <span style={{
          color: '#f5f5f5',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: '1.1rem',
          letterSpacing: '0.02em',
        }}>
          {siteTitle}
        </span>
      </Link>

      <nav>
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: '#aaa',
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            transition: 'color 0.15s',
          }}
          activeStyle={{ color: '#cc2222' }}
          onMouseEnter={e => e.currentTarget.style.color = '#2a9a2a'}
          onMouseLeave={e => e.currentTarget.style.color = '#aaa'}
        >
          Apps
        </Link>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header
