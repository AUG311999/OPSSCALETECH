import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../config/supabase';

interface Submission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  projectType: string;
  timeline: string;
  message: string;
  submittedAt: string;
  status: string;
}

export function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadSubmissions = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6d0929f8/contact-submissions`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to load submissions');
      }

      const result = await response.json();
      setSubmissions(result.submissions || []);
    } catch (err) {
      console.error('Error loading submissions:', err);
      setError(err instanceof Error ? err.message : 'Failed to load submissions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getProjectTypeLabel = (value: string) => {
    const labels: Record<string, string> = {
      'operational-media': 'Operational Media Systems',
      'content-production': 'Enterprise Content Production',
      'distribution-platform': 'Distribution & Enablement Platform',
      'safety-compliance': 'Safety & Compliance Enablement',
      'full-solution': 'Full Operational Solution',
      'consultation': 'Initial Consultation',
      'other': 'Other'
    };
    return labels[value] || value;
  };

  const getTimelineLabel = (value: string) => {
    const labels: Record<string, string> = {
      'immediate': 'Immediate (0-30 days)',
      'short-term': 'Short-term (1-3 months)',
      'medium-term': 'Medium-term (3-6 months)',
      'long-term': 'Long-term (6+ months)',
      'exploratory': 'Exploratory'
    };
    return labels[value] || value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#56c0ff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading submissions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border border-red-200 p-8 rounded-lg max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={loadSubmissions}
            className="px-4 py-2 bg-[#034c7f] text-white hover:bg-[#56c0ff] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact Form Submissions</h1>
              <p className="text-gray-600 mt-1">
                Total submissions: {submissions.length}
              </p>
            </div>
            <button
              onClick={loadSubmissions}
              className="px-4 py-2 bg-[#034c7f] text-white hover:bg-[#56c0ff] transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>

        {/* Submissions List */}
        {submissions.length === 0 ? (
          <div className="bg-white border border-gray-200 p-12 text-center">
            <p className="text-gray-600">No submissions yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white border border-gray-200 hover:border-[#56c0ff] transition-colors"
              >
                {/* Summary */}
                <div
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
                >
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Name</p>
                      <p className="font-semibold text-gray-900">
                        {submission.firstName} {submission.lastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Company</p>
                      <p className="text-gray-900">{submission.company}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                      <p className="text-gray-900">{submission.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Submitted</p>
                      <p className="text-gray-900">{formatDate(submission.submittedAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedId === submission.id && (
                  <div className="border-t border-gray-200 p-6 bg-gray-50">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Role</p>
                        <p className="text-gray-900 mb-4">{submission.role}</p>

                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Project Type</p>
                        <p className="text-gray-900 mb-4">{getProjectTypeLabel(submission.projectType)}</p>

                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Timeline</p>
                        <p className="text-gray-900">{getTimelineLabel(submission.timeline)}</p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Project Details</p>
                        <p className="text-gray-900 whitespace-pre-wrap">{submission.message}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-6 border-t border-gray-200 flex gap-3">
                      <a
                        href={`mailto:${submission.email}?subject=Re: Your Ops Scale Inquiry`}
                        className="px-4 py-2 bg-[#034c7f] text-white hover:bg-[#56c0ff] transition-colors"
                      >
                        Reply via Email
                      </a>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(submission.email);
                        }}
                        className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Copy Email
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
