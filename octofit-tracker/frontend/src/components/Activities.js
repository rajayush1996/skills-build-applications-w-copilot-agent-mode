import React, { useEffect, useState } from 'react';

const API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    console.log('Fetching activities from:', API_URL);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities data:', data);
        const items = data.results || data;
        setActivities(Array.isArray(items) ? items : []);
      })
      .catch((err) => console.error('Error fetching activities:', err));
  }, []);

  return (
    <div>
      <h2 className="page-heading mb-4">Activities</h2>
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Activity Log</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Activity</th>
                <th>Duration (min)</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr><td colSpan="4" className="text-center text-muted py-3">No activities found.</td></tr>
              ) : (
                activities.map((a, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{a.user}</td>
                    <td><span className="badge bg-info text-dark">{a.activity}</span></td>
                    <td>{a.duration}</td>
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

export default Activities;
