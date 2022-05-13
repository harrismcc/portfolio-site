import { Bio, Layout, SEO } from "@main/components"
import { BlogPostBySlugQuery } from "@main/graphql-types"
import { graphql, Link, PageProps } from "gatsby"
import React from "react"

/* eslint-disable react/no-danger */
const BlogPostTemplate: React.FC<PageProps<BlogPostBySlugQuery>> = ({
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
    markdownRemark: {
      html,
      frontmatter: { title, start, description },
    },
    previous: { ...previous },
    next: { ...next },
  },
  location,
}) => (
  <Layout title={siteTitle}>
    <SEO title={title} description={description} />
    <article
      className="blog-post"
      itemScope
      itemType="http://schema.org/Article"
    >
      <header>
        <h1 itemProp="headline">{title}</h1>
        <p>{start}</p>
      </header>
      <section
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
      />
      <hr />
      <footer>
        <Bio />
      </footer>
    </article>
    <nav className="blog-post-nav">
      <ul
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          justifyContent: `space-between`,
          listStyle: `none`,
          padding: 0,
        }}
      >
        <li>
          {previous && previous.fields && (
            <Link to={previous.fields.slug} rel="prev">
              ← {previous.frontmatter.title}
            </Link>
          )}
        </li>
        <li>
          {next && next.fields && (
            <Link to={next.fields.slug} rel="next">
              {next.frontmatter.title} →
            </Link>
          )}
        </li>
      </ul>
    </nav>
  </Layout>
)
/* eslint-enable react/no-danger */

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        start(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
