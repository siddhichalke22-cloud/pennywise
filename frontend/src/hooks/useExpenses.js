import { useState, useCallback } from 'react';
import { expenseApi } from '../services/api/expenseApi';

export const useExpenses = (groupId) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchExpenses = useCallback(async () => {
    if (!groupId) return;
    setLoading(true);
    setError(null);
    try {
      const res = await expenseApi.getGroupExpenses(groupId);
      setExpenses(res.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const addExpense = async (data) => {
    const res = await expenseApi.createExpense({ ...data, groupId });
    if (res.data) {
      setExpenses((prev) => [res.data, ...prev]);
    }
    return res.data;
  };

  const removeExpense = async (expenseId) => {
    await expenseApi.deleteExpense(expenseId);
    setExpenses((prev) => prev.filter((item) => item._id !== expenseId));
  };

  return {
    expenses,
    loading,
    error,
    fetchExpenses,
    addExpense,
    removeExpense,
  };
};

export default useExpenses;
