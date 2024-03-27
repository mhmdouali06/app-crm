import React from 'react'
type Prop = {
    value?: string
    stl?: string
}
const  SimpleInfo: React.FC<Prop> = ({value, stl})=> {    
  return (
    <p className={stl}>{value}</p>
  )
}

export default SimpleInfo