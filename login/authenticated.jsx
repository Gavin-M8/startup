import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    props.onLogout();
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <Button className="btn btn-dark shadow" variant='primary' onClick={() => navigate('/cook')}>
        Cook
      </Button>
      <Button className="btn btn-dark shadow" variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
} 