export const ObjectToFormData = (obj: any) => {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key])
    }
  }

  return formData
}
export const ObjectToArrayFormData = (obj: any) => {
  const formData = new FormData()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (!Array.isArray(obj[key])) {
        formData.append(key, obj[key])
      }
      if (Array.isArray(obj[key])) {
       
          for (let i = 0; i < obj[key].length; i++) {
            if (obj[key][i] instanceof File  ) {
              // If it's a File, append the file to the formData
              formData.append(`${key}[${i}]`, obj[key][i]);
            } if(typeof obj[key][i] === 'object' && !(obj[key][i] instanceof  File)) {
  
              formData.append(`${key}[${i}]`,  JSON.stringify(obj[key][i]));
            }
          
        }
      }
    }
  }

  return formData
}

// Example usage:
// const formData = ObjectToFormData(data);
