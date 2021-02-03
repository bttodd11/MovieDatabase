import React from "react";
import Button from "react-bootstrap/Button";
import './Error.css';

const Error = () => {

  const reloadPage = () => {
    window.location.reload()
  }
  return (
    <div>
      <h2 className="errorMessage">Movie Not Found</h2>
      <div className="d-flex justify-content-center">
      <Button onClick={() => reloadPage()} className="reloadButton" variant="outline-info">Reload Search</Button> 
      </div>
    </div>
  )
}

export default Error;
