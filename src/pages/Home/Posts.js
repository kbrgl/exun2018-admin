// @flow
import React from 'react'

import PostForm from './PostForm'
import Post from './Post'
import type { Post as PostType } from '../../types'

type Props = {
  posts: PostType[],
}
class Posts extends React.Component<Props> {
  render() {
    const { posts } = this.props
    return (
      <div>
        <PostForm />
        {posts.map(post => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    )
  }
}

export default Posts
