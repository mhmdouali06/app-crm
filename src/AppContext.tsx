import {title} from 'process'
import React, {createContext, useContext, ReactNode, useState} from 'react'
import {toast} from 'react-toastify'
import Swal from 'sweetalert2'

// Define the type for your context value
interface AppContextValue {
  mydate: string
}

// Create a new context with the correct type
export const AppContext = createContext<AppContextValue | undefined | any>(undefined)

// Update the type for children prop
interface AppProviderProps {
  children: ReactNode
}

// Create a context provider component
export const AppProvider: React.FC<AppProviderProps> = ({children}) => {
  const [permission, setPermission] = useState<any>([])
  const errorToast = (message: string) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
  const successToast = (message: string) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    })
  }
  const CustomAlert = async () => {
    try {
      const result = await Swal.fire({
        title: 'Vous êtes sur de vouloir supprimer cet élément?',
        text: 'Vous ne pourrez pas revenir en arrière!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Oui, supprimer!',
        cancelButtonText: 'Annuler',
      })

      if (result.isConfirmed) {
        return true
      } else {
        return false
      }
    } catch (error) {
      console.error('Error showing SweetAlert:', error)
    }
  }

  const hasPermission = (key: string) => {
    for (const role of permission) {
      for (const per of role.permissions) {
        if (per.name === key) {
          return true
        }
      }
    }
    return false
  }

  const value: any = {
    errorToast,
    successToast,
    CustomAlert,
    setPermission,
    permission,
    hasPermission,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
