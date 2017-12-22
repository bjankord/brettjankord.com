import React from 'react'
import Link from 'gatsby-link'

export default ({ data }) => {
  return (
    <div>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <article key={node.id}>
          <span>{node.fields.date}</span>
          <h2>
            <Link to={node.fields.slug}>
              {node.frontmatter.title}{' '}
            </Link>
          </h2>
        </article>
      ))}
    </div>
  )
}

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [fields___date] }) {
      edges {
        node {
          id
          frontmatter {
            title
          }
          fields {
            slug
            date
          }
        }
      }
    }
  }
`
