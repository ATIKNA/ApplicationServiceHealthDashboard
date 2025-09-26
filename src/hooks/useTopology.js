import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "../constants";

/**
 * Custom hook for fetching topology data
 * @returns {Object} Data, loading state, and error state
 */
export const useTopology = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(API_ENDPOINTS.DATA);

        if (!response.ok) {
          throw new Error(`Failed to load data: ${response.status}`);
        }

        const json = await response.json();

        if (!cancelled) {
          setData(json);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  return { data, loading, error };
};
