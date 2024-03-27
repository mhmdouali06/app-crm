import React, { FC, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useQueryRequest } from '../../core/QueryRequestProvider';
import { useQueryResponsePagination } from '../../core/QueryResponseProvider';

const Paginate = () => {
  const paginations = useQueryResponsePagination();
  const { updateState } = useQueryRequest();
  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = typeof paginations.total == 'number' ? paginations.total : 0;
  const itemsPerPage = typeof paginations.per_page == 'number' ? paginations.per_page : 10; 

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    updateState({ page: newPage, items_per_page: itemsPerPage });
    setCurrentPage(newPage);
  };
  

  return (
    <div className='w-100 d-flex justify-content-center '>
      <Stack spacing={2}>
        <Pagination
          showFirstButton
          showLastButton
          count={Math.ceil(totalCount / itemsPerPage)}
          page={currentPage}
          color='primary'
          size='medium'
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default Paginate;
