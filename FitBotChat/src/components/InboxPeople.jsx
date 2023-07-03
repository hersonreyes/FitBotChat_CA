import React from 'react'
import SearchBox from './SearchBox';
import Sidebar from './Sidebar';

//Componente que contiene la barra lateral de la aplicación de chat
const InboxPeople = () => {
  return (
    
    <div className="inbox_people">

        <SearchBox />

        <Sidebar />

    </div>

  )
}

export default InboxPeople