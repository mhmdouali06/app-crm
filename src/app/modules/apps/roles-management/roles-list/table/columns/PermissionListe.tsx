import React from 'react'
type Props = {
  permissions: any
}
const PermissionListe: React.FC<Props> = ({permissions}) => {
  return (
    <div>
      {permissions &&
        permissions.length > 0 &&
        permissions.map((permission: any) => (
          <div key={permission.id} className='badge badge-light fw-bolder me-2 mb-2'>
            {permission.label}
          </div>
        ))}
    </div>
  )
}

export default PermissionListe
