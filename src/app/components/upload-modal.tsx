import { useState } from 'react';
import { X, Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '../../config/supabase';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

interface UploadStatus {
  fileName: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  url?: string;
  error?: string;
}

const LOGOS_TO_UPLOAD = [
  { key: 'ops-scale-logo', name: 'Ops Scale Logo', fileName: 'ops-scale-logo.png' },
  { key: 'amazon-logo', name: 'Amazon Logo', fileName: 'amazon-logo.png' },
  { key: 'cdc-logo', name: 'CDC Logo', fileName: 'cdc-logo.png' },
  { key: 'healthcare-logo', name: 'Healthcare Logo', fileName: 'healthcare-logo.png' },
  { key: 'peacock-logo', name: 'Peacock/NBCUniversal Logo', fileName: 'peacock-logo.png' },
  { key: 'jetblue-logo', name: 'JetBlue Logo', fileName: 'jetblue-logo.png' },
];

export function UploadModal({ isOpen, onClose, onComplete }: UploadModalProps) {
  const [uploads, setUploads] = useState<Record<string, UploadStatus>>(
    Object.fromEntries(
      LOGOS_TO_UPLOAD.map(logo => [
        logo.key,
        { fileName: logo.fileName, status: 'pending' as const }
      ])
    )
  );

  const handleFileUpload = async (key: string, file: File, fileName: string) => {
    setUploads(prev => ({
      ...prev,
      [key]: { ...prev[key], status: 'uploading' }
    }));

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6d0929f8/upload-asset`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Upload failed');
      }

      setUploads(prev => ({
        ...prev,
        [key]: {
          fileName,
          status: 'success',
          url: result.url
        }
      }));

      // Save to backend automatically
      await saveAssetUrl(key, result.url);

    } catch (error) {
      setUploads(prev => ({
        ...prev,
        [key]: {
          fileName,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }));
    }
  };

  const saveAssetUrl = async (key: string, url: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6d0929f8/save-asset-url`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key, url }),
        }
      );
    } catch (error) {
      console.error('Failed to save asset URL:', error);
    }
  };

  const allUploaded = Object.values(uploads).every(u => u.status === 'success');

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Upload Assets</h2>
            <p className="text-sm text-gray-600 mt-1">Upload your logo files - they'll be saved automatically</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Upload List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {LOGOS_TO_UPLOAD.map((logo) => {
            const upload = uploads[logo.key];
            return (
              <div
                key={logo.key}
                className="border rounded-lg p-4 hover:border-[#56c0ff] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold">{logo.name}</h3>
                    <p className="text-xs text-gray-500">{logo.fileName}</p>
                  </div>
                  <div>
                    {upload.status === 'pending' && (
                      <Upload className="w-5 h-5 text-gray-400" />
                    )}
                    {upload.status === 'uploading' && (
                      <div className="w-5 h-5 border-2 border-[#56c0ff] border-t-transparent rounded-full animate-spin" />
                    )}
                    {upload.status === 'success' && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                    {upload.status === 'error' && (
                      <AlertCircle className="w-5 h-5 text-red-600" />
                    )}
                  </div>
                </div>

                {upload.status === 'success' && upload.url && (
                  <div className="mb-3">
                    <img 
                      src={upload.url} 
                      alt={logo.name}
                      className="max-h-12 object-contain"
                    />
                    <p className="text-xs text-green-600 mt-1">✓ Saved automatically</p>
                  </div>
                )}

                {upload.status === 'error' && upload.error && (
                  <p className="text-sm text-red-600 mb-3">{upload.error}</p>
                )}

                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      handleFileUpload(logo.key, file, logo.fileName);
                    }
                  }}
                  disabled={upload.status === 'uploading' || upload.status === 'success'}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-[#56c0ff] file:text-white
                    hover:file:bg-[#034c7f]
                    file:cursor-pointer
                    disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          {allUploaded ? (
            <div className="text-center">
              <p className="text-green-700 font-semibold mb-3">✓ All assets uploaded successfully!</p>
              <Button
                onClick={handleComplete}
                className="bg-[#034c7f] hover:bg-[#56c0ff] text-white px-8"
              >
                Done - Refresh Site
              </Button>
            </div>
          ) : (
            <p className="text-sm text-gray-600 text-center">
              Upload all {LOGOS_TO_UPLOAD.length} files to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}