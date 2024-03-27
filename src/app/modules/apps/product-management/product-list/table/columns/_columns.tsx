// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import SimpleInfo from '../../../../../../../_metronic/layout/Colmun/SimpleInfo'
import {Switch} from '../../../../../../../_metronic/layout/Colmun/Switch'
import {updateProduct} from '../../core/_requests'
import ListeVariant from './ListeVariant'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index]?.id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Nom' className='min-w-125px' />,
    id: 'name',
    Cell: ({...props}) => <UserInfoCell user={props.data[props.row.index]} />,
  },

  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Prix' className='min-w-125px' />,
    id: 'price',
    Cell: ({...props}) => <SimpleInfo value={`${props.data[props.row.index]?.price} DH`} />,
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Afficher' className='min-w-125px' />
    ),
    id: 'dsiplay',
    Cell: ({...props}) => (
      <Switch
        checked={props.data[props.row.index]?.display}
        query={'display'}
        id={props.data[props.row.index].id}
        func={updateProduct}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Ventes' className='min-w-125px' />
    ),
    id: 'dsiplayBy',
    Cell: ({...props}) => (
      <Switch
        checked={props.data[props.row.index]?.dsiplayBy}
        query={'dsiplayBy'}
        id={props.data[props.row.index].id}
        func={updateProduct}
      />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Description' className='min-w-125px' />
    ),
    id: 'description',
    Cell: ({...props}) => (
      <SimpleInfo value={props.data[props.row.index]?.description?.slice(0, 20)} />
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Taille' className='min-w-125px' />
    ),
    id: 'variantes',
    Cell: ({...props}) => (
      <ListeVariant
        variantes={props.data[props.row.index]?.variants}
        id={props.data[props.row.index].id}
      />
    ),
  },

  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index]?.id} />,
  },
]

export {usersColumns}
