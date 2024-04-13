import {ListViewProvider, useListView} from './core/ListViewProvider'
import {QueryRequestProvider} from './core/QueryRequestProvider'
import {QueryResponseProvider} from './core/QueryResponseProvider'
import {ListHeader} from './components/header/ListHeader'
import {EditModal} from './edit-modal/EditModal'
import {KTCard} from '../../../../../_metronic/helpers'
import {SuppliersTable} from './table/SuppliersTable'

const SuppliersList = () => {
  const {itemIdForUpdate} = useListView()
  return (
    <>
      <KTCard>
        <ListHeader />
        <SuppliersTable />
      </KTCard>
      {itemIdForUpdate !== undefined && <EditModal />}
    </>
  )
}

const SuppliersListWrapper = () => (
  <QueryRequestProvider>
    <QueryResponseProvider>
      <ListViewProvider>
        <SuppliersList />
      </ListViewProvider>
    </QueryResponseProvider>
  </QueryRequestProvider>
)

export {SuppliersListWrapper}
