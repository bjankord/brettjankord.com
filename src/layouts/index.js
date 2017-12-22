import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import './index.scss'

const Header = () => (
  <header className="site-masthead">
    <h1 className="site-name">
      <Link to="/">Brett Jankord</Link>
      <small className="site-description">Web Developer</small>
    </h1>
  </header>
)

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Brett Jankord | Blog"
      meta={[
        {
          name: 'description',
          content:
            'Front-End Developer. HTML5, CSS, JavaScript, Responsive Web Design, Accessibility',
        },
        { name: 'author', content: 'Brett Jankord' },
      ]}
    />
    <div className="container">
      <Header />
      <main id="main">
        {children()}
      </main>
    </div>
    <div className="site-footer-wrapper">
      <div className="container">
        <footer className="site-footer">
          {/* include svg-icons.html */}
        </footer>
      </div>
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
