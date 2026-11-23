import React, { createContext, useState, useCallback } from 'react';
import { groupApi } from '../services/api/groupApi';

export const GroupContext = createContext(null);

export const GroupProvider = ({ children }) => {
  const [groups, setGroups] = useState([]);
  const [activeGroup, setActiveGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await groupApi.getGroups();
      setGroups(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNewGroup = async (groupData) => {
    const res = await groupApi.createGroup(groupData);
    if (res.data) {
      setGroups((prev) => [res.data, ...prev]);
    }
    return res.data;
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        activeGroup,
        setActiveGroup,
        loading,
        error,
        fetchGroups,
        createNewGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

export default GroupContext;
