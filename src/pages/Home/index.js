// @flow
import React from 'react'
import { Redirect } from '@reach/router'
import { connect } from 'react-redux'

import Container from '../../components/Container'
import Header from '../../components/Header'
import Layout from '../../components/Layout'
import { Row, Column } from '../../components/Grid'
import Posts from './Posts'
import Admins from './Admins'
import type { Post, Admin } from '../../types'
import { fetchPosts, fetchAdmins, createAdmin } from '../../store/actions'

type Props = {
  auth: Object,
  posts: Post[],
  admins: Admin[],
  fetchPosts: Function,
  fetchAdmins: Function,
  createAdmin: Function,
}
class Home extends React.Component<Props> {
  componentWillMount() {
    const { fetchPosts, fetchAdmins } = this.props
    fetchPosts()
    fetchAdmins()
  }

  render() {
    const { auth, posts, admins, createAdmin } = this.props
    if (!auth.ok) {
      return <Redirect noThrow to="/admin/login" />
    }
    return (
      <Layout>
        <Header style={{ paddingTop: '8rem' }}>
          <Container>
            <h1>Admin</h1>
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
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home)
