import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { format } from 'date-fns'

import { deletePost } from '../../store/actions'
import type { Post as PostType } from '../../types'

const formatDate = date => format(date, 'd MMM yyyy, hh:mm:ss')

const PostWrapper = styled.div`
  border-bottom: 1px solid #eaeaef;
  padding: 6rem 0;
  overflow: hidden;

  &:last-child {
    border: 0;
  }
`

const PostMetadata = styled.div`
  color: #84849b;
  font-size: 1.5rem;
`

const Box = styled.span`
  border: 1px solid #84849b44;
  padding: 2px 4px;
  border-radius: 2px;
`

const Actions = styled.div`
  margin-top: 2rem;
`

const ActionButton = styled.button.attrs({
  type: 'button',
})`
  color: #2977f5;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
  font-size: 0.8em;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 100px;
  border: 1px solid #eaeaef;
  cursor: pointer;
  transition: box-shadow 0.2s, color 0.2s;

  &:hover {
    color: #2977f5aa;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.05);
  }
`

type Props = PostType
class Post extends React.Component<Props> {
  del = () => {
    const { deletePost, id, title } = this.props
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Are you sure you want to delete post '${title}'?`)) return
    deletePost(id)
  }

  render() {
    // eslint-disable-next-line camelcase
    const { id, title, body, created_at, updated_at } = this.props
    return (
      <PostWrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <h2
            style={{
              fontSize: '2rem',
            }}
          >
            {title}
          </h2>
          <span
            style={{
              color: '#2977f5',
              fontWeight: 'bold',
              fontSize: '0.8em',
            }}
          >
            #{id}
          </span>
        </div>
        <p>{body}</p>
        <PostMetadata>
          Published <Box>{formatDate(created_at)}</Box>, updated at{' '}
          <Box>{formatDate(updated_at)}</Box>
        </PostMetadata>
        <Actions>
          <ActionButton onClick={this.del}>Delete</ActionButton>
        </Actions>
      </PostWrapper>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  deletePost: id => {
    dispatch(deletePost(id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post)
