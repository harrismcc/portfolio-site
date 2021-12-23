import React, { useState, useWindowDimensions } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import { Layout, ProjectsBody } from '@main/shared-components';
import { Bio } from '../components/Bio';
import { SEO } from '../components/Seo';

///// Styled Sub-Components /////
const Title = styled.h1`
  font-size: 1.5em;
  text-align: left;
  color: #000000;
`;

const Subtitle = styled.h1`
  font-size: 1.0em;
  text-align: left;
  color: #000000;
`;

const BodyText = styled.p`
  color: #000000;
  margin-bottom: 0.25rem;
`;

const PrintableContainer = styled.div`
  width: 1100px;
  //height: 800px;
  overflow: hidden;
  background-color: #ffffff;
  `;

const PrintablePage = ({ data, location }) => {
  const { innerWidth: width, innerHeight: height } = window;
  if (width < 1100){
    return (
      <div>
        <Title>
          Window Too Small.
        </Title>
        <p>This window is too small to print, please increase your window size.</p>
      </div>
    )
  }

  //get posts
  const posts = data && data.allMarkdownRemark.nodes;
  console.log('posts', posts);
  if (!posts) return null;

  const workPosts = posts.filter((post) => post.fields.collection === 'work');
  const projectPosts = posts.filter(
    (post) => post.fields.collection === 'projects',
  );

  const test = [0,1,2,3,4,5,6,7]
  return (

    <PrintableContainer>
      <Title>Printable Page</Title>

      {workPosts.map(post => <PrintableWorkPost post={post} />)}
    </PrintableContainer>

  );
};

export default PrintablePage;

const PrintableWorkPost = ({ post }) => {
  const { title, description, roll, url, date, start, end, isCurrent } =
    post.frontmatter;
  console.log(post)
  return (
    <div>
      <Title>{title}</Title>
      <Subtitle>
        {start} - {end || 'Present'}
      </Subtitle>
      <section>
        <BodyText>
          <div
            dangerouslySetInnerHTML={{
              __html: post.html,
            }}
            itemProp="description"
          />
        </BodyText>
      </section>


    </div>
  );
};

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
`;
