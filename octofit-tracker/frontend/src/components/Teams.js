import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

function Teams() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    console.log('Fetching teams from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Teams data:', data);
        const items = data.results || data;
        setTeams(Array.isArray(items) ? items : []);
      })
      .catch((err) => console.error('Error fetching teams:', err));
  }, []);

  return (
    <div>
      <h2 className="page-heading mb-4">Teams</h2>
      <div className="card">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">👥 Team Directory</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-3">No teams found.</td></tr>
              ) : (
                teams.map((t, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td><strong>{t.name}</strong></td>
                    <td>
                      {Array.isArray(t.members)
                        ? t.members.map((m, j) => (
                            <span key={j} className="badge bg-light text-dark me-1">{m}</span>
                          ))
                        : t.members}
                    </td>
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

export default Teams;
