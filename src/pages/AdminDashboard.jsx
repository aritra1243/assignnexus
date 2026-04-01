import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';
import { 
  Users, UserCheck, UserX, Plus, Briefcase, Calendar, FileText, Upload, Download, Trash2,
  CheckCircle, XCircle, AlertCircle, Clock, BarChart3, Shield
} from 'lucide-react';

const AdminDashboard = () => {
  const { user, token, API_URL } = useAuth();
  const { socket } = useSocket();
  const [activeTab, setActiveTab] = useState('overview');
  const [pendingUsers, setPendingUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({ jobId: '', date: '', description: '' });
  const [jobFile, setJobFile] = useState(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handleNewNotification = () => fetchPendingUsers();
    socket.on('new_notification', handleNewNotification);
    return () => socket.off('new_notification', handleNewNotification);
  }, [socket]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchPendingUsers(), fetchAllUsers(), fetchJobs()]);
    setLoading(false);
  };

  const fetchPendingUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setPendingUsers(data.users);
      }
    } catch (err) { console.error(err); }
  };

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setAllUsers(data.users);
      }
    } catch (err) { console.error(err); }
  };

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs);
      }
    } catch (err) { console.error(err); }
  };

  const handleApprove = async (userId) => {
    try {
      const res = await fetch(`${API_URL}/users/${userId}/approve`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setPendingUsers(prev => prev.filter(u => u._id !== userId));
        fetchAllUsers();
      }
    } catch (err) { console.error(err); }
  };

  const handleReject = async (userId) => {
    if (!window.confirm('Are you sure you want to reject this user?')) return;
    try {
      const res = await fetch(`${API_URL}/users/${userId}/reject`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setPendingUsers(prev => prev.filter(u => u._id !== userId));
      }
    } catch (err) { console.error(err); }
  };

  const handleJobSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setFormLoading(true);

    try {
      const formDataObj = new FormData();
      formDataObj.append('jobId', jobForm.jobId);
      formDataObj.append('date', jobForm.date);
      formDataObj.append('description', jobForm.description);
      if (jobFile) formDataObj.append('file', jobFile);

      const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: formDataObj
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setFormSuccess('Job created successfully!');
      setJobForm({ jobId: '', date: '', description: '' });
      setJobFile(null);
      const fileInput = document.getElementById('job-file');
      if (fileInput) fileInput.value = '';
      setShowJobForm(false);
      setJobs(prev => [data.job, ...prev]);
    } catch (err) {
      setFormError(err.message);
    }
    setFormLoading(false);
  };

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`${API_URL}/jobs/${jobId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setJobs(prev => prev.filter(j => j._id !== jobId));
      }
    } catch (err) { console.error(err); }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'pending', label: `Pending (${pendingUsers.length})`, icon: <Clock className="w-4 h-4" /> },
    { id: 'users', label: 'All Users', icon: <Users className="w-4 h-4" /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase className="w-4 h-4" /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="animate-spin w-12 h-12 text-indigo-600 mx-auto mb-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">
              <Shield className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <p className="text-gray-500 ml-14">Welcome back, {user?.name}. Manage users and jobs.</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {formSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <p className="text-green-700 font-medium">{formSuccess}</p>
          </div>
        )}

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Pending Approvals', value: pendingUsers.length, icon: <Clock className="w-8 h-8" />, color: 'from-amber-500 to-orange-500', onClick: () => setActiveTab('pending') },
              { label: 'Total Users', value: allUsers.length, icon: <Users className="w-8 h-8" />, color: 'from-blue-500 to-cyan-500', onClick: () => setActiveTab('users') },
              { label: 'Approved Users', value: allUsers.filter(u => u.isApproved).length, icon: <UserCheck className="w-8 h-8" />, color: 'from-green-500 to-emerald-500' },
              { label: 'Total Jobs', value: jobs.length, icon: <Briefcase className="w-8 h-8" />, color: 'from-purple-500 to-pink-500', onClick: () => setActiveTab('jobs') },
            ].map((stat, idx) => (
              <div
                key={idx}
                onClick={stat.onClick}
                className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 ${stat.onClick ? 'cursor-pointer hover:-translate-y-1' : ''}`}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-4 shadow-lg`}>
                  {stat.icon}
                </div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Pending Users Tab */}
        {activeTab === 'pending' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Pending User Approvals</h2>
            {pendingUsers.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <UserCheck className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No pending approvals</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {pendingUsers.map(u => (
                  <div key={u._id} className="bg-white rounded-xl shadow-md p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-gray-100 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {u.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{u.name}</h3>
                        <p className="text-gray-500 text-sm">{u.email}</p>
                        <p className="text-gray-400 text-xs mt-0.5">
                          Registered {new Date(u.createdAt).toLocaleDateString()}
                          {u.googleId && ' • Google Account'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(u._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-sm"
                      >
                        <UserCheck className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(u._id)}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm"
                      >
                        <UserX className="w-4 h-4" />
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* All Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Users</h2>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">User</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Joined</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {allUsers.map(u => (
                      <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                              {u.name?.charAt(0)?.toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-800">{u.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 text-sm">{u.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                            u.isApproved ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {u.isApproved ? <CheckCircle className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                            {u.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td className="px-6 py-4">
                          {!u.isApproved && (
                            <button onClick={() => handleApprove(u._id)} className="text-green-600 hover:text-green-700 font-medium text-sm hover:underline">
                              Approve
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {allUsers.length === 0 && (
                <div className="p-12 text-center text-gray-400">
                  <Users className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p>No users registered yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Job Management</h2>
              <button
                onClick={() => { setShowJobForm(!showJobForm); setFormError(''); setFormSuccess(''); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              >
                <Plus className="w-5 h-5" />
                Add New Job
              </button>
            </div>

            {showJobForm && (
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-indigo-600" />
                  Create New Job
                </h3>
                {formError && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <p className="text-red-700 text-sm">{formError}</p>
                  </div>
                )}
                <form onSubmit={handleJobSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Job ID *</label>
                      <input type="text" value={jobForm.jobId} onChange={(e) => setJobForm({ ...jobForm, jobId: e.target.value })} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" placeholder="e.g., JOB-001" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Date *</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                        <input type="date" value={jobForm.date} onChange={(e) => setJobForm({ ...jobForm, date: e.target.value })} required className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                    <textarea value={jobForm.description} onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })} required rows={4} className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all resize-none" placeholder="Enter job description..." />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Attachment (Optional)</label>
                    <div className="relative">
                      <input type="file" onChange={(e) => setJobFile(e.target.files[0])} className="hidden" id="job-file" />
                      <label htmlFor="job-file" className="flex items-center gap-3 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-all">
                        <Upload className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-500 text-sm">{jobFile ? jobFile.name : 'Click to upload a file'}</span>
                      </label>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={formLoading} className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg disabled:opacity-60">
                      {formLoading ? 'Creating...' : 'Create Job'}
                    </button>
                    <button type="button" onClick={() => setShowJobForm(false)} className="px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all font-medium">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Jobs Table View */}
            {jobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No jobs created yet</p>
                <p className="text-gray-400 text-sm mt-1">Click "Add New Job" to create your first job</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-indigo-50 to-purple-50">
                      <tr>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Job ID</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Date</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600 min-w-[300px]">Description</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">File</th>
                        <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Created</th>
                        <th className="text-center px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {jobs.map(job => (
                        <tr key={job._id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 bg-indigo-50 rounded-full text-sm font-bold text-indigo-700">
                              {job.jobId}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-600 text-sm whitespace-nowrap">
                            {new Date(job.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                          </td>
                          <td className="px-6 py-4 text-gray-700 text-sm">
                            <p className="line-clamp-2">{job.description}</p>
                          </td>
                          <td className="px-6 py-4">
                            {job.file ? (
                              <a
                                href={`http://localhost:5000${job.file}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors text-xs font-medium"
                              >
                                <Download className="w-3.5 h-3.5" />
                                <span className="max-w-[120px] truncate">{job.fileName}</span>
                              </a>
                            ) : (
                              <span className="text-gray-400 text-xs">No file</span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-gray-400 text-xs whitespace-nowrap">
                            {new Date(job.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleDeleteJob(job._id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                              title="Delete Job"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
