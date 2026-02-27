import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('Fetching users from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users data:', data);
        const items = data.results || data;
        setUsers(Array.isArray(items) ? items : []);
      })
      .catch((err) => console.error('Error fetching users:', err));
  }, []);

  return (
    <div>
      <h2 className="page-heading mb-4">Users</h2>
      <div className="card">
        <div className="card-header bg-dark text-white">
          <h5 className="mb-0">🧑 Registered Users</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-3">No users found.</td></tr>
              ) : (
                users.map((u, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{u.name}</td>
                    <td><a href={`mailto:${u.email}`} className="link-primary">{u.email}</a></td>
                    <td><span className="badge bg-primary">{u.team}</span></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
