import * as React from 'react'
import {ID} from '../../../../../../../_metronic/helpers'

type Props = {
  id: ID
  data: any
}

const DetailOrder: React.FC<Props> = ({id, data}) => {
  console.log(data)

  return (
    <>
      <div
        className='modal fade'
        id={`detailOrder${id}`}
        tabIndex={-1}
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                Detail Commande #Ref{data.id}
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              />
            </div>
            <div className='modal-body'>
              <table className='table text-center '>
                <thead className='table table-bordered'>
                  <tr>
                    <th scope='col'>Bougie</th>
                    <th scope='col'>Taille</th>
                    <th scope='col'>Quantite</th>
                    <th scope='col'>Prix</th>
                    <th scope='col'>Total</th>
                  </tr>
                </thead>
                <tbody className='table text-center vertical-align-middle '>
                  {data.details_order?.map((variant: any, index: number) => (
                    <tr key={index}>
                      <td>
                        {variant?.variant?.product?.name}
                        {variant?.packs?.name}
                      </td>
                      <td scope={'row'} style={{verticalAlign: 'middle'}}>
                        {variant.size == 'S'
                          ? 'Petite'
                          : variant.size == 'M'
                          ? 'Moyenne'
                          : variant.size == 'G'
                          ? 'Grande'
                          : ''}
                      </td>
                      <td>{variant.qty}</td>
                      <td>{variant.price} DH </td>
                      <td>{(variant.price * variant.qty).toFixed(2)} DH </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Close
              </button>
              {/* <button type='button' className='btn btn-primary'>
                Save changes
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailOrder
