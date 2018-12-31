import React from 'react';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import get from 'lodash/get';

import Bio from '../components/Bio';
import Layout from '../components/Layout';

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark;
    const siteTitle = get(this.props, 'data.site.siteMetadata.title');
    const siteDescription = post.excerpt;
    const { previous, next } = this.props.pageContext;
    const postDate = new Date(post.frontmatter.date);
    const convertedPostDate = `${postDate.getFullYear()}-${postDate.getMonth() +
      1}-${postDate.getDate()}`;

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={`${post.frontmatter.title} | ${siteTitle}`}
        />
        <article className="fade-in-down">
          <h1 className="post-title">{post.frontmatter.title}</h1>
          <time dateTime={convertedPostDate}>{post.frontmatter.date}</time>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </article>
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
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        permalink
      }
    }
  }
`;
