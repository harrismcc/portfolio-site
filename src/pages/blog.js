import React, {useState} from "react"
import { Link, graphql } from "gatsby"

import Skills from "../components/skills"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectsBody from "../components/projectsBody"



const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes.filter((post) => post.fields.collection !== 'work')

  // Pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const numPages = Math.ceil(posts.length / pageSize)
  const paginate  = (array) => {
    return array.slice(
      (page - 1) * pageSize,
      page !== numPages ? 
        page * pageSize : page.length
    );
  }

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
      <div className="category-label">
        <h2>Projects:</h2>
      </div>
      <ol style={{ listStyle: `none` }}>
        {paginate(posts).map(post => {
          return(
            <ProjectsBody
              post={post}
            />
          )
        })}
      </ol>
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
            {page !== 1 && (
              <a onClick={() => setPage(page - 1)}>
                ← Previous
              </a>
            )}
          </li>
          <li>
            {page !== numPages && (
              <a onClick={() => setPage(page + 1)}>
                {page === 1 ? 'See More' : 'Next'} →
              </a>
            )}
          </li>
        </ul>
      </nav>
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


