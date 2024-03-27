export const ObjectToUrlEncoded = (obj:any) => {
    const urlSearchParams = new URLSearchParams();
  
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        urlSearchParams.append(key, obj[key]);
      }
    }
  
    return urlSearchParams.toString();
  };