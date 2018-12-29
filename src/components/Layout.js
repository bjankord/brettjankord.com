import React from 'react'
import { Link } from 'gatsby'

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    const headerStyles = {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'rgb(255, 255, 255)',
      backgroundImage: `linear-gradient(to bottom, rgb(247, 247, 247) 0%, rgb(243, 243, 243) 100%)`,
      color: 'rgb(56, 56, 56)',
      paddingTop: '13rem',
      paddingBottom: '13rem'
    };

    if (location.pathname === rootPath) {
      header = (
        <header className="site-hero">
          <div className="site-hero-bg" />
          <div className="site-hero-bg-overlay" />
          <div className="site-hero-content">
            <div className="site-container">
              <h1 className="site-hero-heading">Hello <span className="site-hero-wave">👋</span></h1>
              <span className="site-hero-intro">
                I'm Brett Jankord, a Front-End Developer at <a href="https://www.cerner.com/">Cerner</a>, living in Kansas City working on design systems, accessibility, responsive web design, CSS, ReactJS, and open source software.
              </span>
              <ul className="site-hero-social">
                <li>
                  <a href="https://twitter.com/bjankord">Twitter</a>
                </li>
                <li>
                  <a href="https://github.com/bjankord">GitHub</a>
                </li>
              </ul>
            </div>
          </div>
        </header>
      )
    } else {
      header = (
        <header className="site-header fade-in-down">
          <h1 className="site-name">
            <Link to={'/'} >
              {title}
              <small className="site-description">Front-End Developer</small>
            </Link>
          </h1>
        </header>
      )
    }
    return (
      <React.Fragment>
        {header}
        <div className="site-container">
          {children}
        </div>
      </React.Fragment>
    )
  }
}

export default Layout
