import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import Img from 'gatsby-image';
import kebabCase from "lodash/kebabCase";

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import SEO from '../components/Seo';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteDescription = post.excerpt;
    const { previous, next } = this.props.pageContext;
    const postDate = new Date(post.frontmatter.date);
    const convertedPostDate = `${postDate.getFullYear()}-${postDate.getMonth() +
      1}-${postDate.getDate()}`;

    const discussUrl = `https://mobile.twitter.com/search?q=${encodeURIComponent(
      `https://brettjankord.com${post.frontmatter.permalink}`
    )}`;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={`${post.frontmatter.title} | ${siteTitle}`} description={siteDescription} />
        <article className="fade-in-down">
          <div className="site-container">
            <h1 className="post-title">{post.frontmatter.title}</h1>
            <time dateTime={convertedPostDate}>{post.frontmatter.date}</time>
            <span className="post-time-divider">-</span>
            <span className="post-readtime">{post.fields.readingTime.text}</span>
          </div>
          {post.frontmatter.featuredImage != null && <figure className="post-featured-image">
            <Img sizes={post.frontmatter.featuredImage.childImageSharp.fluid} />
          </figure>}
          <div className="site-container">
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
          </div>
        </article>
        <div className="site-container">
          <a href={discussUrl} target="_blank" rel="noopener noreferrer">
            Discuss on Twitter
          </a>
          <p>Tags:{' '}
            {post.frontmatter.tags.map((tag, i) =>
              <span className="post-tags" key={i}>
                <a href={`/tags/${kebabCase(tag)}`}>{tag}</a>
              </span>
            )}
          </p>
          <hr style={{ margin: '6rem 0 3rem' }} />
          <Bio />
          <ul className="pagination">
            <li className="pagination-previous">
              {previous && (
                <Link to={previous.frontmatter.permalink} rel="prev">
                  <small>← Previous Post</small>
                  {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li className="pagination-next">
              {next && (
                <Link to={next.frontmatter.permalink} rel="next">
                  <small>Next Post →</small>
                  {next.frontmatter.title}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </Layout>
    );
  }
}

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        permalink
        tags
        featuredImage {
          childImageSharp{
            fluid(maxWidth: 2000) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }

      }
    }
  }
`;
