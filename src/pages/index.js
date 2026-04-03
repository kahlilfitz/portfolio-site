import React from 'react'
import { Link } from 'gatsby'
import Layout from '../components/layout'
import { ZionImage } from '../components/image'

const APPS = [
  {
    title: 'Craps Sim',
    description: 'Simulate craps sessions with configurable bets and odds. Track your bankroll across multiple runs.',
    to: '/craps-sim',
  },
  {
    title: 'Sesh Stats',
    description: 'Track poker session stats for up to 10 players — hands played, VPIP, PFR, and session time.',
    to: '/sesh-stats',
  },
  {
    title: 'Robot',
    description: 'Interactive robot character.',
    to: '/robot',
  },
  {
    title: 'Dashboard',
    description: 'Live data dashboard built with computer vision and sensor integrations.',
    to: '/dashboard',
  },
]

const AppCard = ({ title, description, to }) => (
  <Link
    to={to}
    style={{ textDecoration: 'none', display: 'block' }}
    onMouseEnter={e => {
      e.currentTarget.querySelector('.app-card').style.borderColor = '#cc2222'
      e.currentTarget.querySelector('.app-card').style.transform = 'translateY(-2px)'
    }}
    onMouseLeave={e => {
      e.currentTarget.querySelector('.app-card').style.borderColor = '#1e1e1e'
      e.currentTarget.querySelector('.app-card').style.transform = 'translateY(0)'
    }}
  >
    <div
      className="app-card"
      style={{
        background: '#111',
        border: '1px solid #1e1e1e',
        borderRadius: 6,
        padding: '1.5rem',
        transition: 'border-color 0.2s, transform 0.2s',
      }}
    >
      <div style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: '#2a9a2a',
        marginBottom: '1rem',
      }} />
      <h3 style={{
        margin: '0 0 0.5rem',
        fontFamily: "'Inter', sans-serif",
        fontWeight: 600,
        fontSize: '1rem',
        color: '#f0f0f0',
      }}>
        {title}
      </h3>
      <p style={{
        margin: 0,
        fontFamily: "'Inter', sans-serif",
        fontSize: '0.85rem',
        color: '#777',
        lineHeight: 1.6,
      }}>
        {description}
      </p>
    </div>
  </Link>
)

const IndexPage = () => (
  <Layout>
    <div style={{ maxWidth: 700, marginBottom: '3rem' }}>
      <ZionImage />
      <h1 style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 700,
        fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
        color: '#f0f0f0',
        margin: '1.5rem 0 0.5rem',
        lineHeight: 1.2,
      }}>
        Kahlil Fitzgerald
      </h1>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '1rem',
        color: '#777',
        margin: 0,
      }}>
        Software Engineer
      </p>
    </div>

    <section id="apps">
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}>
        <h2 style={{
          margin: 0,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: '#cc2222',
        }}>
          Apps
        </h2>
        <div style={{ flex: 1, height: 1, background: '#1e1e1e' }} />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: '1rem',
      }}>
        {APPS.map(app => (
          <AppCard key={app.to} {...app} />
        ))}
      </div>
    </section>
  </Layout>
)

export default IndexPage
