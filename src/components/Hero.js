import React from "react"
import { StaticQuery, graphql } from 'gatsby';
import Image from "gatsby-image"

function Hero() {
  return (
    <StaticQuery
      query={heroQuery}
      render={data => {
        const { author, social } = data.site.siteMetadata;
        return (
          <header className="site-hero">
            <Image
              className="site-hero-bg"
              fadeIn
              fluid={data.hero.childImageSharp.fluid}
              alt={author}
            />
            <div className="site-hero-bg-overlay" />
            <div className="site-hero-content">
              <div className="site-container">
                <h1 className="site-hero-heading">
                  Hello <span className="site-hero-wave">👋</span>
                </h1>
                <span className="site-hero-intro">
                  I'm Brett Jankord, a Front-End Developer at{' '}
                  <a href="https://www.cerner.com/" target="_blank" rel="noopener noreferrer">Cerner</a>, living in Kansas
                  City working on design systems, accessibility, responsive web
                  design, CSS, ReactJS, and open source software.
                </span>
                <ul className="site-hero-social">
                  <li>
                    <a
                      href={`https://twitter.com/${social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href={`https://github.com/${social.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a href="https://www.brettjankord.com/rss.xml">RSS</a>
                  </li>
                </ul>
              </div>
            </div>
          </header>
        );
      }}
    />
  );
}

const heroQuery = graphql`
  query HeroQuery {
    hero: file(absolutePath: { regex: "/hero.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          github
        }
      }
    }
  }
`;

export default Hero;