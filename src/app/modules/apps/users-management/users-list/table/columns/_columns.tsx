// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'

import SimpleInfo from '../../../../../../../_metronic/layout/Colmun/SimpleInfo'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },

  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Nom' className='min-w-125px' />,
    id: 'last_name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },

  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Role' className='min-w-125px' />,
    id: 'role',
    Cell: ({...props}) => <SimpleInfo value={props.data[props.row.index]?.roles[0]?.name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Téléphone' className='min-w-125px' />
    ),
    id: 'phone',
    Cell: ({...props}) => <SimpleInfo value={props.data[props.row.index].phone} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Adresse' className='min-w-125px' />
    ),
    id: 'address',
    Cell: ({...props}) => <SimpleInfo value={props.data[props.row.index].address} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} />,
  },
]

export {usersColumns}
