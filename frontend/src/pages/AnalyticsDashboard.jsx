import React, { useState, useEffect } from 'react';
import { tripService } from '../services/tripService';
import { expenseService } from '../services/expenseService';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { Compass, DollarSign, MapPin, Calendar, TrendingUp, Award, CheckCircle } from 'lucide-react';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

export default function AnalyticsDashboard() {
  const [trips, setTrips] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tripData = await tripService.getMyTrips();
        setTrips(tripData || []);

        // Fetch expenses for all user trips
        let allExpenses = [];
        for (const trip of tripData) {
          try {
            const tripExp = await expenseService.getExpensesByTripId(trip.id);
            allExpenses = [...allExpenses, ...(tripExp || [])];
          } catch (e) {
            // Ignore single trip expense errors
          }
        }
        setExpenses(allExpenses);
      } catch (err) {
        console.error('Failed to load analytics data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  // Calculate statistics
  const totalTrips = trips.length;
  const completedTrips = trips.filter((t) => t.status === 'COMPLETED').length;
  const upcomingTrips = trips.filter((t) => t.status === 'UPCOMING' || t.status === 'PLANNING').length;
  const inProgressTrips = trips.filter((t) => t.status === 'IN_PROGRESS').length;

  const totalSpent = expenses.reduce((acc, curr) => acc + (curr.amount || 0), 0);
  const totalBudgetPlanned = trips.reduce((acc, curr) => acc + (curr.budget || 0), 0);

  // Group expenses by category
  const categories = ['TRANSPORTATION', 'HOTEL', 'FOOD', 'SHOPPING', 'ENTERTAINMENT', 'MISCELLANEOUS'];
  const categoryTotals = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((acc, curr) => acc + (curr.amount || 0), 0)
  );

  const doughnutData = {
    labels: ['Transportation', 'Hotel', 'Food', 'Shopping', 'Entertainment', 'Misc'],
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: [
          '#6366f1', // indigo
          '#14b8a6', // teal
          '#f59e0b', // amber
          '#ec4899', // pink
          '#8b5cf6', // purple
          '#64748b', // slate
        ],
        borderWidth: 0,
      },
    ],
  };

  // Status chart
  const statusData = {
    labels: ['Planning', 'Upcoming', 'In Progress', 'Completed'],
    datasets: [
      {
        label: 'Trips',
        data: [
          trips.filter((t) => t.status === 'PLANNING').length,
          upcomingTrips,
          inProgressTrips,
          completedTrips,
        ],
        backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
        borderRadius: 8,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-teal-400" />
              Traveler Analytics Dashboard
            </h1>
            <p className="mt-1 text-slate-400">
              Personalized insights into your travel history, budget performance, and category spending
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Trips</p>
                <h3 className="text-3xl font-extrabold text-white mt-1">{totalTrips}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4 flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-teal-400" /> {completedTrips} completed, {upcomingTrips} upcoming
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Expenses</p>
                <h3 className="text-3xl font-extrabold text-teal-400 mt-1">${totalSpent.toLocaleString()}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <DollarSign className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Across {expenses.length} recorded items
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Total Planned Budget</p>
                <h3 className="text-3xl font-extrabold text-indigo-400 mt-1">${totalBudgetPlanned.toLocaleString()}</h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Budget Utilization: {totalBudgetPlanned > 0 ? Math.min(100, Math.round((totalSpent / totalBudgetPlanned) * 100)) : 0}%
            </p>
          </div>

          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">Top Destination</p>
                <h3 className="text-2xl font-extrabold text-amber-400 mt-1 truncate max-w-[150px]">
                  {trips.length > 0 ? trips[0].destination : 'None'}
                </h3>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
            </div>
            <p className="text-xs text-slate-400 mt-4">
              Favorite destination spot
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Category Spending Doughnut Chart */}
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Expense Breakdown by Category</h3>
            <div className="w-full h-64 flex items-center justify-center">
              {totalSpent > 0 ? (
                <Doughnut
                  data={doughnutData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: { color: '#cbd5e1' },
                      },
                    },
                  }}
                />
              ) : (
                <div className="text-center text-slate-400">
                  <p>No expenses recorded yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Trip Status Bar Chart */}
          <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Trips by Status</h3>
            <div className="w-full h-64 flex items-center justify-center">
              {totalTrips > 0 ? (
                <Bar
                  data={statusData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: { ticks: { color: '#cbd5e1' } },
                      y: { ticks: { color: '#cbd5e1' }, beginAtZero: true },
                    },
                  }}
                />
              ) : (
                <div className="text-center text-slate-400">
                  <p>No trips created yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Travel History Table */}
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700/60 rounded-2xl p-6 shadow-xl">
          <h3 className="text-lg font-bold text-white mb-4">Recent Trip Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-900/60 text-slate-400 uppercase text-xs">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Destination</th>
                  <th className="px-4 py-3">Dates</th>
                  <th className="px-4 py-3">Budget</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {trips.length > 0 ? (
                  trips.map((trip) => (
                    <tr key={trip.id} className="hover:bg-slate-700/30">
                      <td className="px-4 py-3 font-semibold text-white">{trip.title || trip.destination}</td>
                      <td className="px-4 py-3">{trip.startDate} to {trip.endDate}</td>
                      <td className="px-4 py-3 text-teal-400 font-bold">${trip.budget?.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                          trip.status === 'COMPLETED' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                          trip.status === 'IN_PROGRESS' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                          'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                        }`}>
                          {trip.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-slate-400">
                      No trips available in your portfolio.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
