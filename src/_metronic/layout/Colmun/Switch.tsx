import React, {FC, useEffect, useState} from 'react'
import { AppContext } from '../../../AppContext'
import { ObjectToFormData } from '../../helpers/function/ObjectToFormData'


type Props = {
  checked?: boolean
  id?: any
  func: any 
  query:string
  
}

export const Switch: FC<Props> = ({checked, func, id,query}) => {
  const [isLoading, setIsloading] = React.useState(false)
  const {successToast} = React.useContext(AppContext)
  const [isChecked, setIsChecked] = useState(checked)
  

useEffect(() => {
  setIsChecked(checked)
}, [checked])
const handleSwitchChange = async () => {
    const newCheckedValue = !isChecked;
    await setIsChecked(newCheckedValue);
    await HandelerUpdate(newCheckedValue);
  }
  
  const HandelerUpdate = async (newCheckedValue: boolean) => {
    try {
      const datTosend = ObjectToFormData({ [query]: newCheckedValue });
      await func(datTosend, id);
      successToast('success');
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsloading(false);
    }
  }
  

  return (
    <div>
      <div className='form-check form-check-custom form-check-solid form-switch form-switch-sm mb-2 d-flex'>
        <input
          className='form-check-input'
          type='checkbox'
          disabled={isLoading}
          name='model.app.header.default.fixed.desktop'
          checked={isChecked}
          onChange={handleSwitchChange}
        />
        {isLoading ? (
          <div className='spinner-border spinner-border-sm ms-2' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}