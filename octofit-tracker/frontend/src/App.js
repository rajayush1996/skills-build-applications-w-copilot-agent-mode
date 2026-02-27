import React from 'react';
import { Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import logo from './octofitapp-small.png';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function Home() {
  const cards = [
    { title: 'Activities', desc: 'Log and track your workouts and fitness activities.', to: '/activities', icon: '🏃' },
    { title: 'Leaderboard', desc: 'See how teams rank against each other.', to: '/leaderboard', icon: '🏆' },
    { title: 'Teams', desc: 'Create and manage your fitness teams.', to: '/teams', icon: '👥' },
    { title: 'Users', desc: 'Browse registered users and profiles.', to: '/users', icon: '🧑' },
    { title: 'Workouts', desc: 'Discover and share workout routines.', to: '/workouts', icon: '💪' },
  ];
  return (
    <div className="text-center">
      <h1 className="display-4 page-heading mb-3">Welcome to OctoFit Tracker</h1>
      <p className="lead text-muted mb-5">Track activities, compete on leaderboards, and crush your fitness goals with your team.</p>
      <div className="row g-4">
        {cards.map((c) => (
          <div className="col-md-4" key={c.title}>
            <div className="card home-card h-100 text-center">
              <div className="card-body">
                <div style={{ fontSize: '2.5rem' }}>{c.icon}</div>
                <h5 className="card-title mt-2">{c.title}</h5>
                <p className="card-text text-muted">{c.desc}</p>
                <Link to={c.to} className="btn btn-primary btn-sm">View {c.title}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="OctoFit Logo" width="36" height="36" /> OctoFit Tracker
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><NavLink className="nav-link" to="/activities">Activities</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/teams">Teams</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/users">Users</NavLink></li>
              <li className="nav-item"><NavLink className="nav-link" to="/workouts">Workouts</NavLink></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
