import React from 'react';
import { Link } from 'gatsby';

import Hero from "./Hero";

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props;
    const rootPath = `${__PATH_PREFIX__}/`;
    let header;

    if (location.pathname === rootPath) {
      header = (
        <Hero />
      );
    } else {
      header = (
        <header className="site-header fade-in-down">
          <h1 className="site-name">
            <Link to={'/'}>
              Brett Jankord
              <small className="site-description">Front-End Developer</small>
            </Link>
          </h1>
        </header>
      );
    }
    return (
      <React.Fragment>
        {header}
        {children}
        <footer style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="site-container">
            Brett Jankord Copyright © 2011 - Present.{' '}
            <a href="https://www.brettjankord.com/rss.xml">RSS Feed</a>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default Layout;
