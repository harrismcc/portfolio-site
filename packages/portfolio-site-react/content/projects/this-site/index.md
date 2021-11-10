---
title: This Site
start: '2020-12-28T22:40:32.169Z'
description: Developed using React + Gatsby and Netlify CMS, this page was a learning experiance in front-end web development and design
---

Developed using React + Gatsby and Netlify CMS, this page was a learning experiance in front-end web development and design

#### Dynamic Content (Posts)

Using gatsby, all of the dynamic content on the page (like the work experiance or the projects) are rendered from markdown files and accessed using `graphql` queries, like the one shown below.

```graphql
query {
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
        start(formatString: "MMMM, YYYY")
        end(formatString: "MMMM, YYYY")
      }
    }
  }
}
```

This data is accessed when constructing the posts inside the react elements as follows:

```javascript
const post = data.allMarkdownRemark.nodes;
const title = post.frontmatter.title;

return <h1>{title}</h1>;
```

#### Animations

To make the subtle animations happen I used the `react-spring` library. An example of that code is shown below.

```javascript
import { useSpring, animated } from 'react-spring';

const ProjectsBody = (props) => {
  const [itemHoverProps, itemHoverSet] = useSpring(() => ({
    fontSize: '2rem',
  }));
  const handleItemHover = () => {
    itemHoverSet({ fontSize: '2.5rem' });
  };
  const handleItemUnhover = () => {
    itemHoverSet({ fontSize: '2rem' });
  };

  return <animated.h2 style={itemHoverProps}>Project Title</animated.h2>;
};
```
