import clsx from 'clsx'
import React from 'react'
type Prop = {
  label?: string
  formik: any
  isUserLoading: boolean
  name: string
  type: string
  placeholder?: string
  isRequired?: boolean
  isDisabled?: boolean
}
const ColorZone: React.FC<Prop> = ({
  formik,
  isUserLoading,
  name,
  type,
  placeholder,
  label,
  isRequired = false,
  isDisabled = false,
}) => {
  const [colors, setColors] = React.useState<any>([])
  const refColor = React.useRef<any>()
  const addColor = () => {
    setColors([...colors, refColor.current.value])
  }
  const removeColor = (color: any) => {
    setColors(colors.filter((c: any) => c !== color))
    formik.setFieldValue(name, '')
  }
  return (
    <div>
      {label && (
        <label className={` ${isRequired ? 'required' : ''} fw-bold fs-6 mb-5`}>{label}</label>
      )}
      <div className='d-flex gap-4 mb-5'>
        {colors.map((color: any, index: number) => (
          <div key={index} style={{backgroundColor: color, width: '40px', height: '40px'}}>
            <span
              className='btn btn-icon btn-circle btn-active-color-primary w-15px h-15px bg-body shadow bg-danger'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
              onClick={() => removeColor(color)}
            >
              <i className='bi bi-x fs-3'></i>
            </span>
          </div>
        ))}
      </div>
      <div className='d-flex justify-content-between gap-3'>
        <input
          ref={refColor}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          type={type}
          name={name}
          className={clsx('form-control form-control-color w-100 mb-3 mb-lg-0')}
          autoComplete='off'
          disabled={formik.isSubmitting || isUserLoading || isDisabled}
        />
        <button className='btn btn-primary' type='button' onClick={addColor}>
          Ajouter
        </button>
      </div>
    </div>
  )
}

export default ColorZone
