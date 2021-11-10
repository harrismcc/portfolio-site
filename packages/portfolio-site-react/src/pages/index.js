import React from "react"
import { Link, graphql } from "gatsby"

import {
  Skills,
  Bio,
  Layout,
  SEO,
  ProjectsBody,
  WorkBody
} from '@main/shared-components'

const PortfolioIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes


  const workPosts = posts.filter((post) => post.fields.collection === 'work')
  const blogPosts = posts.filter((post) => post.fields.collection === 'projects')
  const displayedBlogPosts = 2;

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="Harris McCullers" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }
  
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Harris McCullers" />
      <Bio />
	    <Skills />
      <div className="category-label">
        <h2>Experience:</h2>
      </div>
      <ol style={{ listStyle: `none` }}>
        {workPosts.map(post => {
          return(
            <WorkBody
              post={post}
            />
            )
        })}
      </ol>
      <div className="category-label">
        <h2>Projects:</h2>
      </div>
      <ol style={{ listStyle: `none` }}>
        {blogPosts.slice(0, displayedBlogPosts).map(post => {
          return(
            <ProjectsBody
              post={post}
            />
          )
        })}
      </ol>
      {blogPosts.length > displayedBlogPosts && (
        <Link to={'blog'} rel="next">
          See More Projects →
        </Link>
      )}
    </Layout>
  )
}

export default PortfolioIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___start], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
          collection
        }
        html
        frontmatter {
          title
          description
          roll
          url
          start(formatString: "MMMM, YYYY")
          end(formatString: "MMMM, YYYY")
        }
      }
    }
  }
`


