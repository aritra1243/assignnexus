import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase, User, Mail, Calendar, Shield, Clock, Download } from 'lucide-react';

const UserDashboard = () => {
  const { user, token, API_URL } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('jobs');

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (!user?.isApproved && user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center py-20 animate-fadeIn">
        <div className="max-w-md w-full mx-4 bg-white rounded-2xl shadow-2xl p-8 text-center border border-amber-200">
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
            <Clock className="w-10 h-10 text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Account Pending Approval</h2>
          <p className="text-gray-600 mb-6">
            Your account is currently under review. An admin will approve your registration shortly.
            You'll receive a notification once approved.
          </p>
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
            <p className="text-amber-700 text-sm font-medium">
              ⏳ Please check back later or wait for an email notification.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <svg className="animate-spin w-12 h-12 text-indigo-600" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name}</h1>
              <p className="text-gray-500">Your dashboard</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-white rounded-xl p-2 shadow-sm border border-gray-100">
          <button
            onClick={() => setActiveTab('jobs')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'jobs'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Available Jobs
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-sm transition-all ${
              activeTab === 'profile'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
        </div>

        {/* Jobs Tab */}
        {activeTab === 'jobs' && (
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Jobs</h2>
            {jobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">No jobs available yet</p>
                <p className="text-gray-400 text-sm mt-1">Check back later for new opportunities</p>
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
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="max-w-xl">
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
              <div className="text-center mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold text-4xl mx-auto mb-4 shadow-lg">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase()
                  )}
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{user?.name}</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold mt-2">
                  <Shield className="w-3.5 h-3.5" />
                  Approved User
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Mail className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Email</p>
                    <p className="text-gray-800 font-medium">{user?.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <Calendar className="w-5 h-5 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Member Since</p>
                    <p className="text-gray-800 font-medium">{new Date(user?.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
