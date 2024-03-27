import React from 'react'
type Prop = {
    value?: string
    stl?: string
}
const  ColorInfo: React.FC<Prop> = ({value, stl})=> {    
  return (
    <p className={`${stl} badge`} style={{backgroundColor: value }}> {value}</p>
  )
}

export default ColorInfo