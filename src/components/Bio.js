import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

function Bio() {
  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata
        return (
          <div className="bio">
            <Image
              className="bio-img"
              fixed={data.avatar.childImageSharp.fixed}
              alt={author}
            />
            <p className="bio-content">
              Written by <strong>{author}</strong>.
              <br />
              Follow me on:
              {' '}
              <a
                className="bio-social-link bio-social-link-twitter"
                href={`https://twitter.com/${social.twitter}`}
              >
                Twitter
               </a>
              <a
                className="bio-social-link bio-social-link-github"
                href={`https://github.com/${social.github}`}
              >
                GitHub
              </a>
            </p>
          </div>
        )
      }}
    />
  )
}

const bioQuery = graphql`
   query BioQuery {
     avatar:file(absolutePath: { regex: "/profile-pic.jpg/" }) {
       childImageSharp {
         fixed(width: 50, height: 50) {
           ...GatsbyImageSharpFixed
         }
       }
     }
     site {
       siteMetadata {
         author
         social {
           twitter,
           github
         }
       }
     }
   }
 `

export default Bio;
