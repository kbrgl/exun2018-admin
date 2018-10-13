import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import { deleteAdmin } from '../../../store/actions'
import type { Admin as AdminType } from '../../../types'

import Button from '../../../components/Button'

const AdminWrapper = styled.div`
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #eee;
  position: relative;

  &:last-child {
    border: 0;
  }

  &:hover div[data-type='action-box'] {
    display: flex;
  }
`

const Actions = styled.div.attrs({
  'data-type': 'action-box',
})`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  line-height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;
`

type Props = AdminType
class Admin extends React.Component<Props> {
  del = () => {
    const { deleteAdmin, id, email } = this.props
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Are you sure you want to delete admin '${email}'?`)) return
    deleteAdmin(id)
  }

  render() {
    // eslint-disable-next-line camelcase
    const { email } = this.props
    return (
      <AdminWrapper>
        {email}
        <Actions>
          <Button
            style={{
              background: 'rgba(255, 255, 255, 0.6)',
            }}
            type="button"
            onClick={this.del}
          >
            Delete
          </Button>
        </Actions>
      </AdminWrapper>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  deleteAdmin: id => {
    dispatch(deleteAdmin(id))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Admin)
