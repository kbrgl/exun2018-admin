// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

import Layout from '../components/Layout'
import Container from '../components/Container'
import Button from '../components/Button'
import Header from '../components/Header'

import { login } from '../store/actions'

type Props = {
  auth: Function,
  login: Function,
}
type State = {
  email: string,
  password: string,
}
class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
    }
  }

  done = () => {
    const { login } = this.props
    const { email, password } = this.state
    login(email, password)
  }

  renderError() {
    // caller should ensure `message' property exists
    const { auth } = this.props
    const { message } = auth
    return (
      <div
        style={{
          marginBottom: '2rem',
        }}
      >
        <strong>{message}</strong>
      </div>
    )
  }

  render() {
    const { auth } = this.props
    const { email, password } = this.state
    if (auth.ok) {
      return <Redirect noThrow to="/admin" />
    }
    return (
      <Layout>
        <Header style={{ paddingTop: '8rem' }}>
          <Container>
            <h1>Login</h1>
          </Container>
        </Header>
        <Container
          style={{
            paddingTop: '10rem',
            paddingBottom: '10rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {this.renderError()}
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <input
              onChange={event => {
                this.setState({
                  email: event.target.value,
                })
              }}
              value={email}
              placeholder="Email"
              type="text"
            />
            <br />
            <input
              onChange={event => {
                this.setState({
                  password: event.target.value,
                })
              }}
              value={password}
              placeholder="Password"
              type="password"
            />
            <br />
            <Button primary type="button" onClick={this.done}>
              Login
            </Button>
          </form>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
})

const mapDispatchToProps = dispatch => ({
  login(email, password) {
    dispatch(login(email, password))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)
