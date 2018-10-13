// @flow
import React from 'react'
import styled from 'styled-components'
import { Redirect } from '@reach/router'
import { connect } from 'react-redux'

import Container from '../../components/Container'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import { Row, Column } from '../../components/Grid'
import Posts from './Posts'
import Admins from './Admins'
import type { Post, Admin } from '../../types'
import { fetchPosts, fetchAdmins, createAdmin, logout } from '../../store/actions'

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

type Props = {
  auth: Object,
  posts: Post[],
  admins: Admin[],
  fetchPosts: Function,
  fetchAdmins: Function,
  createAdmin: Function,
  logout: Function,
}
class Home extends React.Component<Props> {
  componentDidMount() {
    const { fetchPosts, fetchAdmins } = this.props
    fetchPosts()
    fetchAdmins()
  }

  render() {
    const { auth, posts, admins, createAdmin, logout } = this.props
    if (!auth.ok) {
      return <Redirect noThrow to="/admin/login" />
    }
    return (
      <Layout>
        <Header style={{ paddingTop: '8rem' }}>
          <Container
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <h1
              style={{
                marginBottom: 0,
              }}
            >
              Admin
            </h1>
            <ActionButton onClick={logout}>Logout</ActionButton>
          </Container>
        </Header>
        <Container
          style={{
            paddingTop: '6rem',
          }}
        >
          <Row>
            <Column size={4}>
              <Admins createAdmin={createAdmin} admins={admins} />
            </Column>
            <Column size={8}>
              <Posts posts={posts} />
            </Column>
          </Row>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  posts: state.posts,
  admins: state.admins,
})

const mapDispatchToProps = dispatch => ({
  fetchPosts: () => {
    dispatch(fetchPosts())
  },
  fetchAdmins: () => {
    dispatch(fetchAdmins())
  },
  createAdmin: (email, password) => {
    dispatch(createAdmin(email, password))
  },
  logout: () => {
    dispatch(logout())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
