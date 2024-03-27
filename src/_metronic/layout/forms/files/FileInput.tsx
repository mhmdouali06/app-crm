import React from 'react'
import { toAbsoluteUrl } from '../../../helpers'
import clsx from 'clsx'
type Props= {
    name: string
    formik: any
    isRequired?: boolean
    label: string

}
const FileInput:React.FC<Props>=({formik,name,isRequired=false,label})=> {
    const refinput = React.useRef<HTMLInputElement>(null);
    const [backgroundImage, setBackgroundImage] = React.useState<any>(null);
    const validateFile = (file: File): boolean => {
      // Check file type
      const allowedTypes = ['image/png','image/jpeg', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        formik.setFieldError(name, 'Please select a valid image file (PNG, JPEG, JPG).');
          return false;
      }

      const maxSize = 1024 * 1024; 
      if (file.size > maxSize) {
         formik.setFieldError(name, 'File size exceeds the maximum limit of 1MB.');
          return false;
      }

      return true;
  };
    const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
    
        if (file && validateFile(file)) {
          formik.setFieldValue(name, file);
          setBackgroundImage(URL.createObjectURL(file));
        }
      };
    
      const removeAvatar = () => {
        formik.setFieldValue(name, null);
        setBackgroundImage(null);
        if(refinput.current){

            refinput.current.value = "";
        }
      };
  return (
    <div>
         <label className={` ${isRequired ? 'required' : ''} d-block fw-bold fs-6 mb-5` }>{label}</label>

        <div
              className='image-input image-input-outline'
              data-kt-image-input='true'
              style={{backgroundImage: `url('${backgroundImage?backgroundImage : formik.values[name]}')`}}
            >

              <div
                className='image-input-wrapper w-125px h-125px'
                style={{backgroundImage: `url('${backgroundImage?backgroundImage : formik.values[name]}')`}}
              ></div>
            
               <label
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='change'
              data-bs-toggle='tooltip'
              title='select image'
            >
              <i className='bi bi-pencil-fill fs-7'></i>

              <input type='file' name={name} ref={refinput} accept='.png, .jpg, .jpeg' onChange={ uploadFile} className={clsx(
               
                {'is-invalid': formik.touched[name] && formik.errors[name]},
                {
                  'is-valid': formik.touched[name] && !formik.errors[name],
                }
              )}/>
            
              
              <input type='hidden' name='avatar_remove' />
            </label> 
          
               <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
              data-kt-image-input-action='cancel'
              data-bs-toggle='tooltip'
              title='Cancel avatar'
            >
              <i className='bi bi-x fs-2'></i>
            </span> 
           
              <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow bg-danger'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
              onClick={removeAvatar}
            >
              <i className='bi bi-x fs-2'></i>
            </span> 
            </div>
         
            { formik.errors[name] && (
              <div className='fv-plugins-message-container'>
                <div className='fv-help-block'>
                  <span role='alert'>{formik.errors[name]}</span>
                </div>
              </div>
            )}
           
    </div>
  )
}

export default FileInput