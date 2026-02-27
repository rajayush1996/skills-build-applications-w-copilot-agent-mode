import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    console.log('Fetching leaderboard from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard data:', data);
        const items = data.results || data;
        setEntries(Array.isArray(items) ? items : []);
      })
      .catch((err) => console.error('Error fetching leaderboard:', err));
  }, []);

  return (
    <div>
      <h2 className="page-heading mb-4">Leaderboard</h2>
      <div className="card">
        <div className="card-header bg-warning text-dark">
          <h5 className="mb-0">🏆 Team Rankings</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>Team</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr><td colSpan="3" className="text-center text-muted py-3">No leaderboard data.</td></tr>
              ) : (
                entries.map((e, i) => (
                  <tr key={i}>
                    <td><span className="badge bg-secondary">{i + 1}</span></td>
                    <td>{e.team}</td>
                    <td><strong>{e.points}</strong></td>
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

export default Leaderboard;
