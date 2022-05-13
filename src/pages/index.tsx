import {
  Bio,
  Layout,
  ProjectsBody,
  SEO,
  Skills,
  WorkBody,
} from "@main/components"
import { FrontPageQuery, MarkdownRemark } from "@main/graphql-types"
import { graphql, PageProps } from "gatsby"
import React from "react"

const BlogIndex: React.FC<PageProps<FrontPageQuery>> = ({ data }) => {
  const siteTitle = data?.site?.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  const workPosts: MarkdownRemark[] = []
  const blogPosts: MarkdownRemark[] = []
  posts.forEach(({ ...post }) => {
    if (post?.fields?.collection === "work") {
      workPosts.push(post as MarkdownRemark)
    } else if (post?.fields?.collection === "projects") {
      blogPosts.push(post as MarkdownRemark)
    }
  })

  if (posts.length === 0) {
    return (
      <Layout titleHeader title={siteTitle}>
        <SEO title="Harris McCullers" />
        <Bio />
        <p>
          No blog posts found. Add markdown posts to &quot;content/blog&quot;
          (or the directory you specified for the
          &quot;gatsby-source-filesystem&quot; plugin in gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout titleHeader title={siteTitle}>
      <SEO title="Harris McCullers" />
      <Bio />
      <Skills />
      <div className="category-label">
        <h2>Experience:</h2>
      </div>
      <ol style={{ listStyle: `none` }}>
        {workPosts.map((post, key) => (
          <WorkBody post={post} key={key} />
        ))}
      </ol>
      <div className="category-label">
        <h2>Projects:</h2>
      </div>
      <ol style={{ listStyle: `none` }}>
        {blogPosts.map((post, key) => (
          <ProjectsBody post={post} key={key} />
        ))}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query FrontPage {
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
