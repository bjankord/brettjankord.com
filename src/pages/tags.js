import React from "react"
import PropTypes from "prop-types"
import kebabCase from "lodash/kebabCase";
import { Link, graphql } from "gatsby";

import Layout from '../components/Layout';
import SEO from '../components/Seo';

class TagsPage extends React.Component {
  render() {
    const {
      data: {
        allMarkdownRemark: { group },
        site: {
          siteMetadata: { title },
        },
      },
    } = this.props;

    return (
      <Layout location={this.props.location}>
        <SEO title="Tags" />
        <div className="site-container">
          <h1>Tags</h1>
          <ul>
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
              </Link>
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    );
  }
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`