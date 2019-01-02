import React from 'react';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';
import SEO from '../components/Seo';

import Layout from '../components/Layout';

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    );
    const posts = get(this, 'props.data.allMarkdownRemark.edges');

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title="Front-End Developer" keywords={['blog', 'brett jankord', 'jankord', 'javascript', 'design systems', 'accessibility', 'responsive web design', 'CSS', 'ReactJS', 'open source software']} />
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug;
          const postDate = new Date(node.frontmatter.date);
          const convertedPostDate = `${postDate.getFullYear()}-${postDate.getMonth() +
            1}-${postDate.getDate()}`;
          return (
            <div className="post-listing" key={node.fields.slug}>
              <h2 className="post-listing-title">
                <Link to={node.frontmatter.permalink}>{title}</Link>
              </h2>
              <time dateTime={convertedPostDate}>{node.frontmatter.date}</time>
              <span className="post-time-divider">-</span>
              <span className="post-readtime">
                {node.fields.readingTime.text}
              </span>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          );
        })}
      </Layout>
    );
  }
}

export default BlogIndex;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
            readingTime {
              text
            }
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            permalink
          }
        }
      }
    }
  }
`;
