// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from '@reach/router'

import Layout from '../components/Layout'
import Container from '../components/Container'
import Button from '../components/Button'
import { Row, Column } from '../components/Grid'

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
        <div
          style={{
            height: '100vh',
            background: 'linear-gradient(to bottom right, #fff, #f5f8fe)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Container>
            <Row>
              <Column size={6} offset={3}>
                <div
                  style={{
                    background: '#fff',
                    padding: '30px',
                    border: '1px solid #eaeaef',
                    borderRadius: 4,
                  }}
                >
                  <h2
                    style={{
                      marginBottom: '2rem',
                    }}
                  >
                    Login
                  </h2>
                  {this.renderError()}
                  <form>
                    <input
                      onChange={event => {
                        this.setState({
                          email: event.target.value,
                        })
                      }}
                      value={email}
                      placeholder="Email"
                      type="text"
                      style={{
                        marginBottom: '1.8rem',
                      }}
                    />
                    <input
                      onChange={event => {
                        this.setState({
                          password: event.target.value,
                        })
                      }}
                      onKeyDown={event => {
                        if (event.keyCode === 13) {
                          this.done()
                        }
                      }}
                      value={password}
                      placeholder="Password"
                      type="password"
                      style={{
                        marginBottom: '2rem',
                      }}
                    />
                    <Button primary type="button" onClick={this.done}>
                      Login
                    </Button>
                  </form>
                  <span
                    style={{
                      color: '#a6a6ab',
                    }}
                  >
                    Don&apos;t have a login?{' '}
                    <a href="https://m.me/SupremeLeaderKabir">Message Kabir</a>
                  </span>
                </div>
              </Column>
            </Row>
          </Container>
        </div>
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
