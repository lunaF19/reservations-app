import React from 'react'
import { AppRouter } from "../router"

import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AppReservations = () => {
  
  return (<>
    <ToastContainer
      toastStyle={{backgroundColor: '#212529'}} 
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Flip}

    />
    <AppRouter />
  </>
  )
}

export default AppReservations