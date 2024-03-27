import React, {useCallback, useEffect, useState} from 'react'
import {useDropzone} from 'react-dropzone'

type Props = {
  formik: any
  name: string
  label?: string
  isUserLoading: boolean
}

const DropZone: React.FC<Props> = ({formik, name, label, isUserLoading}) => {
  const [files, setFiles] = useState<File[]>([])
  const [removeFiles, setRemoveFiles] = useState<any[]>([])
  const [defaultFiles, setDefaultFiles] = useState<File[]>(formik.getFieldProps(name).value)
  const [error, setError] = useState<string[]>([])
  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   setFiles((prevFiles) => [...prevFiles, ...acceptedFiles])

  // }, [])
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError([])
    const validFiles: File[] = []
    acceptedFiles.forEach((file) => {
      if (file.type.startsWith('image/')) {
        if (file.size <= 1024 * 1024) {
          validFiles.push(file)
        } else {
          setError((prevError) => [
            ...prevError,
            `File ${file.name} exceeds the maximum size of 1MB.`,
          ])
          console.error(`File ${file.name} exceeds the maximum size of 1MB.`)
        }
      } else {
        setError((prevError) => [...prevError, `File ${file.name} is not an image.`])
        console.error(`File ${file.name} is not an image.`)
      }
    })
    setFiles((prevFiles) => [...prevFiles, ...validFiles])
  }, [])

  const removeFile = (id: number) => {
    const data = defaultFiles.filter((file: any) => file.id !== id)
    setRemoveFiles((prevFiles) => [...prevFiles, {id: id}])
    setDefaultFiles(data)
  }
  useEffect(() => {
    formik.setFieldValue(name, files)
  }, [files])
  useEffect(() => {
    formik.setFieldValue('removeFiles', removeFiles)
  }, [removeFiles])
  const removeAvatar = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles]
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div>
      <div {...getRootProps()} style={dropzoneStyles}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Faites glisser-déposez des fichiers ici, ou cliquez pour sélectionner des fichiers.</p>
        )}
      </div>

      <div className='row d-flex '>
        {files.map((file, index) => (
          <div key={index} className='col-3 my-5 position-relative '>
            <img
              width={100}
              height={100}
              src={URL.createObjectURL(file)}
              className='w-100'
              alt=''
            />
            <span
              className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow bg-danger position-absolute top-0 end-0'
              data-kt-image-input-action='remove'
              data-bs-toggle='tooltip'
              title='Remove avatar'
              onClick={() => removeAvatar(index)}
            >
              <i className='bi bi-x fs-2'></i>
            </span>
          </div>
        ))}
        {defaultFiles &&
          defaultFiles.map((file: any, index: number) => (
            <div key={file.id} className='col-3 my-5 position-relative '>
              <img width={100} height={100} src={file?.image_url} className='w-100' alt='' />
              <span
                className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow bg-danger position-absolute top-0 end-0'
                data-kt-image-input-action='remove'
                data-bs-toggle='tooltip'
                title='Remove avatar'
                onClick={() => removeFile(file.id)}
              >
                <i className='bi bi-x fs-2'></i>
              </span>
            </div>
          ))}
      </div>
      {formik.errors[name] && (
        <div className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{formik.errors[name]}</span>
          </div>
        </div>
      )}
      {error.map((err, index) => (
        <div key={index} className='fv-plugins-message-container'>
          <div className='fv-help-block'>
            <span role='alert'>{err}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

const dropzoneStyles: React.CSSProperties = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
}

export default DropZone
