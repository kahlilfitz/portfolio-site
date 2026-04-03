import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from './header'
import './layout.css'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div style={{
        margin: '0 auto',
        maxWidth: 1100,
        padding: '2.5rem 1.5rem 4rem',
        minHeight: 'calc(100vh - 56px)',
      }}>
        <main>{children}</main>
        <footer style={{
          marginTop: '4rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid #1e1e1e',
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.8rem',
          color: '#555',
          textAlign: 'center',
        }}>
          © {new Date().getFullYear()} Kahlil Fitzgerald
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
