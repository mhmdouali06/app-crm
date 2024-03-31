import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ListHeader} from './components/header/ListHeader'
import {EditModal} from './edit-modal/EditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import {UsersTable} from './table/UsersTable'

const UsersList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ListHeader />
        <UsersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <EditModal />}
    </>
  )
}

const UsersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <UsersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {UsersListWrapper}
