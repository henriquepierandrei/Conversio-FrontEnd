import React from 'react'
import '../account/Account.css'
import Header from '../../components/header/Header';


function Account() {
  return (
    <div className='container-user-principal'>
      <div><Header /></div>
      <div className='container-user'>
        <div className='container-img-logo-account'><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSf6gyYEfVhCy3jRSOABExt9KH_bcUA725Ixw&s" alt="" /></div>
      </div>
    </div>
  )
}

export default Account
