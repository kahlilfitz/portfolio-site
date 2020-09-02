import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

const IndexPage = () => (
  <Layout>
    <Link to='/book-loader'>Book loader</Link><br />
    <Link to="/dashboard/">Dashboard</Link> <br />
  </Layout>
)

export default IndexPage
