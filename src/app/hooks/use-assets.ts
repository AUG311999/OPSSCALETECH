import { useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../../config/supabase';

// Default placeholder image - a simple SVG data URL
const PLACEHOLDER = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="60" viewBox="0 0 200 60"%3E%3Crect fill="%23f3f4f6" width="200" height="60"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="system-ui" font-size="12"%3ELogo%3C/text%3E%3C/svg%3E';

export interface Assets {
  'ops-scale-logo': string;
  'amazon-logo': string;
  'cdc-logo': string;
  'healthcare-logo': string;
  'peacock-logo': string;
  'jetblue-logo': string;
}

const DEFAULT_ASSETS: Assets = {
  'ops-scale-logo': PLACEHOLDER,
  'amazon-logo': PLACEHOLDER,
  'cdc-logo': PLACEHOLDER,
  'healthcare-logo': PLACEHOLDER,
  'peacock-logo': PLACEHOLDER,
  'jetblue-logo': PLACEHOLDER,
};

export function useAssets() {
  const [assets, setAssets] = useState<Assets>(DEFAULT_ASSETS);
  const [loading, setLoading] = useState(true);

  const loadAssets = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6d0929f8/get-assets`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.assets && Object.keys(data.assets).length > 0) {
          setAssets({ ...DEFAULT_ASSETS, ...data.assets });
        }
      }
    } catch (error) {
      console.error('Failed to load assets:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshAssets = () => {
    setLoading(true);
    loadAssets();
  };

  useEffect(() => {
    loadAssets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { assets, loading, refreshAssets };
}