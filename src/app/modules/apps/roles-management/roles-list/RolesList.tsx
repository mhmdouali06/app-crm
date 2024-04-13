import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ListHeader} from './components/header/ListHeader'
import {EditModal} from './edit-modal/EditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import {RolesTable} from './table/RolesTable'

const RolesList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ListHeader />
        <RolesTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <EditModal />}
    </>
  )
}

const RolesListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <RolesList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {RolesListWrapper}
