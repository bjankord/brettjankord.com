import React from 'react'

import profilePic from '../assets/profile-pic.jpg'

class Bio extends React.Component {
  render() {
    return (
      <div className="bio">
        <img
          className="bio-img"
          src={profilePic}
          alt={`Brett Jankord`}
        />
        <p className="bio-content">
          Written by <strong>Brett Jankord</strong>.
          <br />
          Follow me on:
          {' '}
          <a className="bio-social-link bio-social-link-twitter" href="https://twitter.com/bjankord">
            Twitter
          </a>
          {' '}
          <a className="bio-social-link bio-social-link-github" href="https://github.com/bjankord">
            GitHub
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
