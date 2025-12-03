import React from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    })
      .catch(() => {
        // Logout failed. Assuming offline
      })
      .finally(() => {
        socket.close();
        localStorage.removeItem('userName');
        props.onLogout();
      });
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