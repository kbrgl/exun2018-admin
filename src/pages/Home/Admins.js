/* eslint-disable no-alert */
import React from 'react'
import styled from 'styled-components'

import type { Admin as AdminType } from '../../types'
import Admin from './Admin'

import Button from '../../components/Button'

const AdminList = styled.div`
  max-height: 250px;
  overflow: auto;
  border: 1px solid #eaeaef;
  border-left: 0;
  border-right: 0;
`

type Props = {
  admins: AdminType[],
  createAdmin: Function,
}
class Admins extends React.Component<Props> {
  create = () => {
    const { createAdmin } = this.props
    const email = window.prompt('Enter email')
    if (!email) {
      return
    }
    const password = window.prompt('Set a password')
    if (!password) {
      return
    }
    const data = {
      email,
      password,
    }
    let confirmation = window.prompt('Confirm password')
    while (confirmation !== data.password) {
      if (!confirmation) {
        return
      }
      confirmation = window.prompt('Wrong password, try again')
    }
    createAdmin(email, password)
  }

  render() {
    const { admins } = this.props
    return (
      <div>
        <h2
          style={{
            fontSize: '2rem',
          }}
        >
          Admins
        </h2>
        <AdminList>
          {admins.map(admin => (
            <Admin key={admin.id} {...admin} />
          ))}
        </AdminList>
        <Button style={{ paddingLeft: 0 }} type="button" onClick={this.create}>
          Create
        </Button>
      </div>
    )
  }
}

export default Admins
