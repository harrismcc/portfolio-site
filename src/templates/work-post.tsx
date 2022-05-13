import { Bio, Layout, SEO } from "@main/components"
import { WorkPostBySlugQuery } from "@main/graphql-types"
import { graphql, Link, PageProps } from "gatsby"
import React from "react"

/* eslint-disable react/no-danger */
const WorkPostTemplate: React.FC<PageProps<WorkPostBySlugQuery>> = ({
  data: {
    site: {
      siteMetadata: { title: siteTitle },
    },
    markdownRemark: {
      html,
      frontmatter: { title, start, description },
    },
    ...data
  },
}) => {
  // Convert all null to undefined
  const previous = data.previous ?? undefined
  const next = data.next ?? undefined

  return (
    <Layout title={siteTitle}>
      <SEO title={title} description={description} />
      <article
        className="work-post"
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
      <nav className="work-post-nav">
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
            {previous && previous.fields && previous.frontmatter && (
              <Link to={previous.fields.slug as string} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && next.fields && next.frontmatter && (
              <Link to={next.fields.slug as string} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}
/* eslint-enable react/no-danger */

export default WorkPostTemplate

// This is defining the query for the page
export const pageQuery = graphql`
  query WorkPostBySlug(
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
        description
        roll
        start(formatString: "MMMM DD, YYYY")
        end(formatString: "MMMM DD, YYYY")
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
