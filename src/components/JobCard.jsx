import React from 'react';
import { Calendar, FileText, Download, Trash2 } from 'lucide-react';

const JobCard = ({ job, isAdmin, onDelete }) => {
  const formattedDate = new Date(job.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200">
      {/* Gradient top bar */}
      <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
      
      <div className="p-6">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 rounded-full mb-2">
              <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase">Job ID</span>
              <span className="text-sm font-bold text-indigo-800">{job.jobId}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
          
          {isAdmin && onDelete && (
            <button
              onClick={() => onDelete(job._id)}
              className="opacity-0 group-hover:opacity-100 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all duration-200"
              title="Delete Job"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-4">{job.description}</p>

        {/* File attachment */}
        {job.file && (
          <a
            href={`http://localhost:5000${job.file}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl text-indigo-700 hover:from-indigo-100 hover:to-purple-100 transition-all duration-200 group/file"
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium truncate max-w-[200px]">{job.fileName || 'Download File'}</span>
            <Download className="w-4 h-4 group-hover/file:translate-y-0.5 transition-transform" />
          </a>
        )}

        {/* Footer */}
        {job.createdBy && (
          <div className="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-400">
            Created by {job.createdBy.name} • {new Date(job.createdAt).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
