import {useListView} from '../../core/ListViewProvider'
import {ListToolbar} from './ListToolbar'
import {ListGrouping} from './ListGrouping'
import {ListSearchComponent} from './ListSearchComponent'
import {useContext} from 'react'
import {AppContext} from '../../../../../../../AppContext'

const ListHeader = () => {
  const {hasPermission} = useContext(AppContext)
  const {selected} = useListView()
  return (
    <div className='card-header border-0 pt-6'>
      <ListSearchComponent />
      {/* begin::Card toolbar */}
      <div className='card-toolbar'>
        {/* begin::Group actions */}
        {selected.length > 0 ? (
          hasPermission('delete_category') && <ListGrouping />
        ) : (
          <ListToolbar />
        )}
        {/* end::Group actions */}
      </div>
      {/* end::Card toolbar */}
    </div>
  )
}

export {ListHeader}
