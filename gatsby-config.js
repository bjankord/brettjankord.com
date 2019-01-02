module.exports = {
  siteMetadata: {
    title: 'Brett Jankord',
    author: 'Brett Jankord',
    description: 'Brett Jankord - Front-End Developer',
    siteUrl: 'https://brettjankord.com',
    social: {
      twitter: 'bjankord',
      github: 'bjankord'
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: 'assets',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-reading-time',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     //trackingId: `ADD YOUR TRACKING ID HERE`,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => allMarkdownRemark.edges.map(edge => Object.assign({}, edge.node.frontmatter, {
              description: edge.node.excerpt,
              date: edge.node.frontmatter.date,
              url: site.siteMetadata.siteUrl + edge.node.frontmatter.permalink, // Use permalink url to maintain prior URL structure
              guid: site.siteMetadata.siteUrl + edge.node.frontmatter.permalink, // Use permalink url to maintain prior URL structure
              custom_elements: [{ 'content:encoded': edge.node.html }],
            })),
            query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                      permalink
                    }
                  }
                }
              }
            }
          `,
            output: '/rss.xml',
            title: "Brett Jankord's Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Brett Jankord\'s Blog',
        short_name: 'Brett Jankord',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'content/assets/blog-icon.png',
      },
    },
    // `gatsby-plugin-offline`,
    'gatsby-plugin-react-helmet',
  ],
};
