import clsx from 'clsx'
import React from 'react'
type Prop={
    label:string
    formik:any
    isUserLoading:boolean
    name:string
    placeholder?:string
    isRequired?:boolean
    isDisabled?:boolean
}
const Switch:React.FC<Prop>=({formik, isUserLoading, name, placeholder, label,isRequired=false,isDisabled=false})=> {
  return (
    <div>
                    <div className="form-check form-switch">

        <input className="form-check-input" type="checkbox" role="switch" checked={formik.values[name]} id={name} 
           
         {...formik.getFieldProps(name)}         
        disabled={formik.isSubmitting || isUserLoading||isDisabled}
        />
                            <label className={` ${isRequired ? 'required' : '' } fw-bold fs-6 mb-4 ` } htmlFor={name}>{label}</label>

        {formik.touched[name] && formik.errors[name] && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors[name]}</span>
                </div>
              </div>
            )}
    </div>

    </div>
  
  )
}

export default Switch