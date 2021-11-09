import React from "react"
import { graphql } from "gatsby"

import Skills from "../components/skills"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectsBody from "../components/projectsBody"
import WorkBody from "../components/workBody"



const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes


  let workPosts = []
  let blogPosts = []
  posts.map(post => {
    if (post.fields.collection === 'work'){
      workPosts.push(post)
    } else if (post.fields.collection === 'projects'){
      blogPosts.push(post)
    } else{
      console.log(posts.fields.collection)
    }
  })

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
        {blogPosts.map(post => {
          return(
            <ProjectsBody
              post={post}
            />
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

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


