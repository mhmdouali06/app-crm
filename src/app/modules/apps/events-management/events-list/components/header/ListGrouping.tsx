import { useQueryClient, useMutation } from 'react-query';
import { QUERIES } from '../../../../../../../_metronic/helpers';
import { useListView } from '../../core/ListViewProvider';
import { useQueryResponse } from '../../core/QueryResponseProvider';
import { deleteSelectedEvent } from '../../core/_requests';
import { useContext } from 'react';
import { AppContext } from '../../../../../../../AppContext';

const ListGrouping = () => {
  const {CustomAlert}=useContext(AppContext)
  const { selected, clearSelected } = useListView();
  const queryClient = useQueryClient();
  const { query } = useQueryResponse();

  const deleteSelectedItems = useMutation(() => deleteSelectedEvent(selected), {
    // 💡 response of the mutation is passed to onSuccess
    onSuccess: () => {
      // ✅ update detail view directly
      queryClient.invalidateQueries([`${QUERIES.USERS_LIST}-${query}`]);
      clearSelected();
    },
  });

  return (
    <div className='d-flex justify-content-end align-items-center'>
      <div className='fw-bolder me-5'>
        <span className='me-2'>{selected.length}</span>  Sélectionné(s)
      </div>

      <button
        type='button'
        className='btn btn-danger'
        onClick={async () => {
          if (await CustomAlert()) {
            await deleteSelectedItems.mutateAsync();
          }
        }}   
        disabled={deleteSelectedItems.isLoading} 
      >
        {deleteSelectedItems.isLoading ? (
          'Suppression en cours...'
        ) : (
          'Supprimer la sélection'
        )}
      </button>
    </div>
  );
};

export { ListGrouping };
