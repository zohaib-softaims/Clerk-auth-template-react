import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const makeRequest = async (url, options = {}) => {
    const token = await getToken();

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  };

  return {
    get: (url) => makeRequest(url, { method: "GET" }),
    post: (url, data) =>
      makeRequest(url, {
        method: "POST",
        body: JSON.stringify(data),
      }),
    put: (url, data) =>
      makeRequest(url, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    delete: (url) => makeRequest(url, { method: "DELETE" }),
  };
};
