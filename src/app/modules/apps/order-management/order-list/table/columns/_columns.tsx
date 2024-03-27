// @ts-nocheck
import {Column} from 'react-table'
import {UserInfoCell} from './UserInfoCell'
import {UserActionsCell} from './UserActionsCell'
import {UserSelectionCell} from './UserSelectionCell'
import {UserCustomHeader} from './UserCustomHeader'
import {UserSelectionHeader} from './UserSelectionHeader'
import {User} from '../../core/_models'
import SimpleInfo from '../../../../../../../_metronic/layout/Colmun/SimpleInfo'
import ChangeStatus from './ChangeStatus'

const usersColumns: ReadonlyArray<Column<User>> = [
  {
    Header: (props) => <UserSelectionHeader tableProps={props} />,
    id: 'selection',
    Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='références  ' className='min-w-125px' />,
    id: 'ref',
    Cell: ({...props}) => <SimpleInfo value={`Ref${props.data[props.row.index].id}`} />,
  },
 
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Client' className='min-w-125px' />
    ),
    id: 'user.name',
    Cell: ({...props}) => <SimpleInfo value={props.data[props.row.index].user.name} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Numéro de téléphone ' className='min-w-125px' />
    ),
    id: 'user.phone',
    Cell: ({...props}) => <SimpleInfo value={props.data[props.row.index].user.phone} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Total' className='min-w-125px' />
    ),
    id: 'total',
    Cell: ({...props}) => <SimpleInfo value={props.data[props.row.index].total} />,
  },
  
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Total' className='min-w-125px' />
    ),
    id: 'totalAfterPromo',
    Cell: ({...props}) => <SimpleInfo value={props.data[props.row.index].totalAfterPromo?props.data[props.row.index].totalAfterPromo:props.data[props.row.index].total} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Remise' className='min-w-125px' />
    ),
    id: 'code_promo.id',
    Cell: ({ ...props }) => (
      <SimpleInfo
        value={
          props.data[props.row.index]?.code_promo?.code
            ? `Code: ${props.data[props.row.index]?.code_promo?.code} , Percentage: ${props.data[props.row.index]?.percentage}%`
            : ''
        }
      /> )
      },
      {
        Header: (props) => (
          <UserCustomHeader tableProps={props} title='Status de la commande' className='min-w-125px' />
        ),
        id: 'status',
        Cell: ({ ...props }) => (
          <SimpleInfo
            value={props.data[props.row.index].status}
            stl={`d-flex  justify-content-center w-50 rounded ${
              props.data[props.row.index].status === "En cours"
                ? "badge-light-warning"
                : props.data[props.row.index].status === "En livraison"
                ? "badge-light-primary"
                : props.data[props.row.index].status === "Livré"
                ? "badge-light-success"
                : "badge-light-danger"
            }`}
          />
        )
              },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Status' className=' min-w-100px' />
    ),
    id: 'actionsStatus',
    Cell: ({...props}) => <ChangeStatus id={props.data[props.row.index].id} />,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Actions' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => <UserActionsCell id={props.data[props.row.index].id} data={props.data[props.row.index]} />,
  },
]

export {usersColumns}
