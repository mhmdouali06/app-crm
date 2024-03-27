import clsx from 'clsx'
import React from 'react'
type Prop={
    label?:string
    formik:any
    isUserLoading:boolean
    name:string
    type:string
    placeholder?:string
    isRequired?:boolean
    isDisabled?:boolean
}
const Input:React.FC<Prop>=({formik, isUserLoading, name, type, placeholder, label,isRequired=false,isDisabled=false})=> {
  return (
          <div>
            {label && (
              
            <label className={` ${isRequired ? 'required' : '' } fw-bold fs-6 mb-2` }>{label}</label>
            )}
      
            <input
              placeholder={placeholder}
              {...formik.getFieldProps(name)}
              type={type}
              name={name}

              className={clsx(
                `form-control ${type=='color'?'form-control-color w-50':'form-control-solid'} mb-3 mb-lg-0`,
                {'is-invalid': formik.touched[name] && formik.errors[name]},
                {
                  'is-valid': formik.touched[name] && !formik.errors[name],
                }
              )}
              autoComplete='off'
              disabled={formik.isSubmitting || isUserLoading||isDisabled}
            />
            {formik.touched[name] && formik.errors[name] && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors[name]}</span>
                </div>
              </div>
            )}
            {/* end::Input */}
          </div>
  )
}

export default Input