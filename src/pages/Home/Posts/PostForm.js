import React from 'react'
import { connect } from 'react-redux'

import { createPost, editPost } from '../../../store/actions'

import Button from '../../../components/Button'

type Props = {
  createPost: Function,
  editPost: Function,
}
class PostForm extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      id: '',
      title: '',
      body: '',
      shouldPost: true,
      shouldNotify: false,
      isTest: false,
    }
  }

  post = () => {
    const { createPost } = this.props
    const { title, body, shouldPost, shouldNotify, isTest } = this.state
    createPost(title, body, {
      shouldPost,
      shouldNotify,
      isTest,
    })
    // TODO: handle error.
    this.setState(this.getInitialState())
  }

  edit = () => {
    const { editPost } = this.props
    const { id, title, body } = this.state
    editPost(id, title, body)
    // TODO: handle error.
    this.setState(this.getInitialState())
  }

  render() {
    const { id, title, body, shouldPost, shouldNotify, isTest } = this.state
    return (
      <form
        style={{
          padding: '50px 30px',
          border: '1px solid #eaeaef',
          borderRadius: 4,
          boxShadow: '0 2px 8px 2px rgba(0, 0, 0, 0.025)',
        }}
      >
        {/* TODO: show error */}
        <input
          type="number"
          style={{
            width: 125,
            borderWidth: 1,
            borderRadius: 100,
            padding: 20,
          }}
          placeholder="#"
          value={id}
          onChange={event => {
            this.setState({
              id: event.target.value,
            })
          }}
        />
        <br />
        <br />
        <input
          style={{
            width: '100%',
          }}
          type="text"
          placeholder="Title"
          value={title}
          onChange={event => {
            this.setState({
              title: event.target.value,
            })
          }}
        />
        <br />
        <br />
        <textarea
          style={{
            width: '100%',
          }}
          placeholder="Body"
          value={body}
          onChange={event => {
            this.setState({
              body: event.target.value,
            })
          }}
        />
        <br />
        <br />
        {id ? null : (
          <div>
            <input
              type="checkbox"
              checked={shouldPost}
              onChange={event => {
                this.setState({
                  shouldPost: event.target.checked,
                })
              }}
            />{' '}
            Post &nbsp;
            <input
              type="checkbox"
              checked={shouldNotify}
              onChange={event => {
                this.setState({
                  shouldNotify: event.target.checked,
                })
              }}
            />{' '}
            Notify &nbsp;
            {shouldNotify ? (
              <span>
                <input
                  type="checkbox"
                  checked={isTest}
                  onChange={event => {
                    this.setState({
                      isTest: event.target.checked,
                    })
                  }}
                />{' '}
                Test
              </span>
            ) : null}
            <br />
            <br />
          </div>
        )}

        <Button type="button" primary onClick={id ? this.edit : this.post}>
          {id ? 'Edit' : 'Publish'}
        </Button>
      </form>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  createPost: (title, body, options) => {
    dispatch(createPost(title, body, options))
  },
  editPost: (id, title, body) => {
    dispatch(editPost(id, title, body))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostForm)
