import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

function Workouts() {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    console.log('Fetching workouts from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts data:', data);
        const items = data.results || data;
        setWorkouts(Array.isArray(items) ? items : []);
      })
      .catch((err) => console.error('Error fetching workouts:', err));
  }, []);

  return (
    <div>
      <h2 className="page-heading mb-4">Workouts</h2>
      <div className="card">
        <div className="card-header bg-danger text-white">
          <h5 className="mb-0">💪 Workout Routines</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Workout</th>
                <th>Reps</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-3">No workouts found.</td></tr>
              ) : (
                workouts.map((w, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{w.user}</td>
                    <td><span className="badge bg-danger">{w.workout}</span></td>
                    <td>{w.reps}</td>
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

export default Workouts;
