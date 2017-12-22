import React from 'react'

export default ({ data, pathContext }) => {
  const post = data.markdownRemark
  const { date } = pathContext
  return (
    <article className="post">
      <header className="post-header">
        <h1 className="post-title">{post.frontmatter.title}</h1>
        <div className="post-meta">
          <time dateTime="{date}">{date}</time>
        </div>
      </header>
      <div
        className="post__body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
