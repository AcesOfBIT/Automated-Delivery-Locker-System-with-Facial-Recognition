import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import API from '../../api/api.js';
import DashboardLayout from '../../components/layout/DashboardLayout';

const UserDashboard = () => {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await API.get('/api/sessions/my/active');
        setSessions(res.data);
      } catch (error) {
        console.error('Failed to fetch active sessions', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchSessions();
  }, [user]);

  if (!user) return <DashboardLayout><div>Loading user...</div></DashboardLayout>;
  if (loading) return <DashboardLayout><div>Loading sessions...</div></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">User Dashboard</h2>

        <div className="bg-white p-4 rounded shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-2">Profile Info</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="text-xl font-semibold mb-2">Active Sessions</h3>
          {sessions.length === 0 ? (
            <p>No active sessions found.</p>
          ) : (
            <ul className="list-disc ml-5">
              {sessions.map((session) => (
                <li key={session._id} className="mb-2">
                  <p><strong>IP Address:</strong> {session.ipAddress}</p>
                  <p><strong>Device:</strong> {session.device || 'Unknown'}</p>
                  <p><strong>Last Active:</strong> {new Date(session.updatedAt).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
