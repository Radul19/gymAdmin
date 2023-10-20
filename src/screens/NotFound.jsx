import React from 'react'
import { useRouteError } from 'react-router-dom';
import '../sass/var.sass'
function NotFound() {
  const error = useRouteError();
  console.error(error);
  return (
    <div className='ErrorPage' id="error-page" >aaaaaaaaaaaaaaaaaaaaa</div>
  )
}

export default NotFound