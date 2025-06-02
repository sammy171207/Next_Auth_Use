import React from 'react'
import Navbar from '../components/Navbar';
import { SessionProvider } from 'next-auth/react';


type PropsChildren = {
  children: React.ReactNode;
}
const layout = ({children}:PropsChildren) => {
  return (
     <div>
    
           <Navbar/>
    
     
        {children}
     </div>
  )
}

export default layout