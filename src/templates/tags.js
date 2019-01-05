import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import Layout from '../components/Layout';
import SEO from '../components/Seo';


class Tags extends React.Component {
  render() {
    const { pageContext, data } = this.props;
    const { tag } = pageContext
    const { edges, totalCount } = data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
      } tagged with "${tag}"`

    return (
      <Layout location={this.props.location}>
        <SEO title={tagHeader} />
        <div className="site-container">
          <h1>{tagHeader}</h1>
          <ul>
            {edges.map(({ node }) => {
              const { permalink, title } = node.frontmatter
              return (
                <li key={permalink}>
                  <Link to={permalink}>{title}</Link>
                </li>
              )
            })}
          </ul>
          <Link to="/tags">All tags</Link>
        </div>
      </Layout>
    )
  }
};

Tags.propTypes = {
  pageContext: PropTypes.shape({
    tag: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              permalink: PropTypes.string.isRequired,
              title: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          frontmatter {
            title
            permalink
          }
        }
      }
    }
  }
`