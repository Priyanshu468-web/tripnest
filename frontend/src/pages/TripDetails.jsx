import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { tripService } from '../services/tripService';
import { activityService } from '../services/activityService';
import { expenseService } from '../services/expenseService';
import { memberService } from '../services/memberService';
<<<<<<< HEAD
import { documentService } from '../services/documentService';
import {
  MapPin, Calendar, Users, DollarSign, Plus, Trash2, Edit3, Clock,
  PieChart, UserPlus, Shield, CheckCircle, AlertCircle, ArrowLeft,
  Utensils, Navigation, Home as HomeIcon, Camera, Compass, ShoppingBag, Loader2,
  FileText, Download, Share2, Copy, Check
=======
import {
  MapPin, Calendar, Users, DollarSign, Plus, Trash2, Edit3, Clock,
  PieChart, UserPlus, Shield, CheckCircle, AlertCircle, ArrowLeft,
  Utensils, Navigation, Home as HomeIcon, Camera, Compass, ShoppingBag, Loader2
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
} from 'lucide-react';
import { Modal } from '../components/Modal';

export const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [activities, setActivities] = useState([]);
  const [expenseSummary, setExpenseSummary] = useState(null);
  const [members, setMembers] = useState([]);
<<<<<<< HEAD
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'expenses' | 'members' | 'documents'
=======
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'expenses' | 'members'
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e

  // Modals state
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [activityForm, setActivityForm] = useState({
    dayNumber: 1,
    title: '',
    description: '',
    location: '',
    startTime: '09:00',
    endTime: '10:30',
    activityType: 'SIGHTSEEING',
    notes: '',
  });

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [expenseForm, setExpenseForm] = useState({
    amount: '',
    category: 'FOOD',
    description: '',
    expenseDate: new Date().toISOString().split('T')[0],
    paidBy: '',
  });

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('MEMBER');
<<<<<<< HEAD

  // Document modal
  const [showDocModal, setShowDocModal] = useState(false);
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState('TICKET');
  const [selectedFile, setSelectedFile] = useState(null);

  // Share modal
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
  const [actionError, setActionError] = useState('');

  const loadData = useCallback(async () => {
    try {
<<<<<<< HEAD
      const [tripData, activityList, summary, memberList, docList] = await Promise.all([
        tripService.getTripById(id),
        activityService.getActivitiesByTrip(id),
        expenseService.getExpenseSummary(id),
        memberService.getMembersByTrip(id),
        documentService.getDocumentsByTripId(id).catch(() => [])
      ]);
      setTrip(tripData);
      setActivities(activityList || []);
      setExpenseSummary(summary);
      setMembers(memberList || []);
      setDocuments(docList || []);
=======
      const [tripData, activityList, summary, memberList] = await Promise.all([
        tripService.getTripById(id),
        activityService.getActivitiesByTrip(id),
        expenseService.getExpenseSummary(id),
        memberService.getMembersByTrip(id)
      ]);
      setTrip(tripData);
      setActivities(activityList);
      setExpenseSummary(summary);
      setMembers(memberList);
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    } catch (err) {
      console.error('Error loading trip details:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Activity Submit
  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    setActionError('');
    try {
      if (editingActivity) {
        await activityService.updateActivity(editingActivity.id, activityForm);
      } else {
        await activityService.addActivity(id, activityForm);
      }
      setShowActivityModal(false);
      setEditingActivity(null);
      resetActivityForm();
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to save activity');
    }
  };

  const handleDeleteActivity = async (actId) => {
    if (!window.confirm('Delete this itinerary activity?')) return;
    try {
      await activityService.deleteActivity(actId);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete activity');
    }
  };

  const resetActivityForm = () => {
    setActivityForm({
      dayNumber: 1,
      title: '',
      description: '',
      location: '',
      startTime: '09:00',
      endTime: '10:30',
      activityType: 'SIGHTSEEING',
      notes: '',
    });
  };

  const openEditActivity = (act) => {
    setEditingActivity(act);
    setActivityForm({
      dayNumber: act.dayNumber || 1,
      title: act.title || '',
      description: act.description || '',
      location: act.location || '',
      startTime: act.startTime || '09:00',
      endTime: act.endTime || '10:00',
      activityType: act.activityType || 'SIGHTSEEING',
      notes: act.notes || '',
    });
    setShowActivityModal(true);
  };

  // Expense Submit
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    setActionError('');
    try {
      if (editingExpense) {
        await expenseService.updateExpense(id, editingExpense.id, expenseForm);
      } else {
        await expenseService.addExpense(id, expenseForm);
      }
      setShowExpenseModal(false);
      setEditingExpense(null);
      resetExpenseForm();
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to save expense');
    }
  };

  const handleDeleteExpense = async (expId) => {
    if (!window.confirm('Delete this expense record?')) return;
    try {
      await expenseService.deleteExpense(id, expId);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete expense');
    }
  };

  const resetExpenseForm = () => {
    setExpenseForm({
      amount: '',
      category: 'FOOD',
      description: '',
      expenseDate: new Date().toISOString().split('T')[0],
      paidBy: '',
    });
  };

  const openEditExpense = (exp) => {
    setEditingExpense(exp);
    setExpenseForm({
      amount: exp.amount || '',
      category: exp.category || 'FOOD',
      description: exp.description || '',
      expenseDate: exp.expenseDate || new Date().toISOString().split('T')[0],
      paidBy: exp.paidBy || '',
    });
    setShowExpenseModal(true);
  };

  // Member Invite Submit
  const handleInviteSubmit = async (e) => {
    e.preventDefault();
    setActionError('');
    try {
      await memberService.inviteUser(id, { email: inviteEmail, role: inviteRole });
      setShowInviteModal(false);
      setInviteEmail('');
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to send invitation');
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!window.confirm('Remove this member from trip?')) return;
    try {
      await memberService.removeMember(id, memberId);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to remove member');
    }
  };

<<<<<<< HEAD
  // Document Upload Submit
  const handleDocSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setActionError('Please select a file to upload');
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setActionError('File size exceeds 5MB limit');
      return;
    }
    setActionError('');
    try {
      await documentService.uploadDocument(id, docTitle, docType, selectedFile);
      setShowDocModal(false);
      setDocTitle('');
      setSelectedFile(null);
      loadData();
    } catch (err) {
      setActionError(err.response?.data?.message || 'Failed to upload document');
    }
  };

  const handleDeleteDoc = async (docId) => {
    if (!window.confirm('Delete this document?')) return;
    try {
      await documentService.deleteDocument(docId);
      loadData();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete document');
    }
  };

  // Share Trip Modal
  const handleShareTrip = async () => {
    try {
      const shareData = await tripService.shareTrip(id);
      const url = `${window.location.origin}/trips/${id}?shareToken=${shareData.shareToken || 'nest-share'}`;
      setShareUrl(url);
      setShowShareModal(true);
    } catch (err) {
      const url = `${window.location.origin}/trips/${id}`;
      setShareUrl(url);
      setShowShareModal(true);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
  // Group Activities by Day Number
  const groupedActivities = activities.reduce((acc, act) => {
    const dayKey = act.dayNumber || 1;
    if (!acc[dayKey]) acc[dayKey] = [];
    acc[dayKey].push(act);
    return acc;
  }, {});

  const sortedDays = Object.keys(groupedActivities).map(Number).sort((a, b) => a - b);

<<<<<<< HEAD
  // Calculate Expense Settlement
  const calculateSettlements = () => {
    if (!expenseSummary?.expenses || expenseSummary.expenses.length === 0) return [];
    const totalExp = expenseSummary.totalExpenses || 0;
    const memberCount = Math.max(1, members.length);
    const perMemberShare = totalExp / memberCount;

    // Track total paid by each person
    const paidMap = {};
    members.forEach((m) => { paidMap[m.userName || m.userEmail] = 0; });

    expenseSummary.expenses.forEach((e) => {
      const payer = e.paidBy || 'Owner';
      paidMap[payer] = (paidMap[payer] || 0) + (e.amount || 0);
    });

    return Object.entries(paidMap).map(([person, paidAmount]) => {
      const netBalance = paidAmount - perMemberShare;
      return {
        person,
        paidAmount,
        perMemberShare,
        netBalance,
      };
    });
  };

  const settlements = calculateSettlements();

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
  const getActivityIcon = (type) => {
    switch (type) {
      case 'DINING': return <Utensils className="w-4 h-4 text-amber-400" />;
      case 'TRANSPORTATION': return <Navigation className="w-4 h-4 text-blue-400" />;
      case 'ACCOMMODATION': return <HomeIcon className="w-4 h-4 text-purple-400" />;
      case 'ADVENTURE': return <Compass className="w-4 h-4 text-emerald-400" />;
      case 'SHOPPING': return <ShoppingBag className="w-4 h-4 text-pink-400" />;
      case 'SIGHTSEEING':
      default: return <Camera className="w-4 h-4 text-indigo-400" />;
    }
  };

  if (loading) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm max-w-4xl mx-auto my-12">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin mx-auto mb-3" />
        Loading trip itinerary & expense metrics...
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="glass-card p-12 text-center text-slate-400 text-sm max-w-2xl mx-auto my-12">
        Trip not found. <Link to="/trips" className="text-indigo-400 underline">Return to My Trips</Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16">
<<<<<<< HEAD
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/trips')}
          className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to My Trips</span>
        </button>

        <button
          onClick={handleShareTrip}
          className="inline-flex items-center space-x-2 text-xs font-bold text-teal-400 bg-teal-500/10 border border-teal-500/30 px-3.5 py-1.5 rounded-xl hover:bg-teal-500/20 transition-all"
        >
          <Share2 className="w-4 h-4" />
          <span>Share Trip</span>
        </button>
      </div>
=======
      {/* Back Button */}
      <button
        onClick={() => navigate('/trips')}
        className="inline-flex items-center space-x-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to My Trips</span>
      </button>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e

      {/* Trip Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-950 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                {trip.status}
              </span>
              <span className="text-xs text-slate-400 flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-indigo-400" />
                <span>{trip.travelers} Travelers</span>
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 flex items-center space-x-3">
              <MapPin className="w-8 h-8 text-indigo-400 shrink-0" />
<<<<<<< HEAD
              <span>{trip.title || trip.destination}</span>
=======
              <span>{trip.destination}</span>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            </h1>

            <div className="flex items-center space-x-2 text-xs text-slate-300">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{trip.startDate} to {trip.endDate}</span>
              <span className="text-slate-600">•</span>
<<<<<<< HEAD
              <span>Destination: <strong className="text-teal-300">{trip.destination}</strong></span>
=======
              <span>Owner: <strong className="text-indigo-300">{trip.ownerName}</strong></span>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            </div>

            {trip.description && (
              <p className="text-xs text-slate-400 mt-4 leading-relaxed max-w-2xl">
                {trip.description}
              </p>
            )}
          </div>

          {/* Quick Budget Badge Card */}
          <div className="glass-card p-5 rounded-2xl border border-indigo-500/20 bg-slate-900/90 text-right min-w-[240px]">
            <div className="text-xs text-slate-400 font-medium mb-1">Total Trip Budget</div>
<<<<<<< HEAD
            <div className="text-2xl font-extrabold text-white mb-2">${(trip.budget || 0).toLocaleString()}</div>
            <div className="text-xs flex justify-end space-x-3">
              <span className="text-emerald-400">Spent: ${(expenseSummary?.totalExpenses || 0).toLocaleString()}</span>
=======
            <div className="text-2xl font-extrabold text-white mb-2">₹{(trip.budget || 0).toLocaleString()}</div>
            <div className="text-xs flex justify-end space-x-3">
              <span className="text-emerald-400">Spent: ₹{(expenseSummary?.totalExpenses || 0).toLocaleString()}</span>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
              <span className="text-indigo-400 font-bold">{(expenseSummary?.budgetUtilization || 0).toFixed(1)}% Used</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
<<<<<<< HEAD
        <div className="flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-6 mt-8">
=======
        <div className="flex items-center space-x-2 border-t border-slate-800/80 pt-6 mt-8">
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'itinerary'
<<<<<<< HEAD
                ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg shadow-indigo-500/20'
=======
                ? 'gradient-button text-white shadow-lg shadow-indigo-500/20'
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Day-Wise Itinerary</span>
          </button>

          <button
            onClick={() => setActiveTab('expenses')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'expenses'
<<<<<<< HEAD
                ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg shadow-indigo-500/20'
=======
                ? 'gradient-button text-white shadow-lg shadow-indigo-500/20'
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <PieChart className="w-4 h-4" />
<<<<<<< HEAD
            <span>Budget & Expenses</span>
=======
            <span>Budget & Expense Dashboard</span>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'members'
<<<<<<< HEAD
                ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg shadow-indigo-500/20'
=======
                ? 'gradient-button text-white shadow-lg shadow-indigo-500/20'
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Group Members ({members.length})</span>
          </button>
<<<<<<< HEAD

          <button
            onClick={() => setActiveTab('documents')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'documents'
                ? 'bg-gradient-to-r from-indigo-600 to-teal-500 text-white shadow-lg shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Documents ({documents.length})</span>
          </button>
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
        </div>
      </div>

      {/* TAB 1: DAY-WISE ITINERARY */}
      {activeTab === 'itinerary' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Trip Timeline & Schedule</h2>
            <button
              onClick={() => {
                resetActivityForm();
                setEditingActivity(null);
                setShowActivityModal(true);
              }}
<<<<<<< HEAD
              className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
=======
              className="gradient-button text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            >
              <Plus className="w-4 h-4" />
              <span>Add Activity</span>
            </button>
          </div>

          {sortedDays.length === 0 ? (
            <div className="glass-card p-12 text-center border border-dashed border-slate-800 space-y-4">
              <Clock className="w-12 h-12 text-slate-600 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-white">No Itinerary Activities</h3>
                <p className="text-xs text-slate-400 mt-1">Start building your day-by-day travel plan.</p>
              </div>
              <button
                onClick={() => setShowActivityModal(true)}
<<<<<<< HEAD
                className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center space-x-1.5"
=======
                className="gradient-button text-white px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center space-x-1.5"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
              >
                <Plus className="w-4 h-4" />
                <span>Add First Activity</span>
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDays.map((dayNum) => (
                <div key={dayNum} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
                    <span className="px-3 py-1 bg-indigo-600 text-white rounded-lg text-xs font-black uppercase tracking-wider">
                      DAY {dayNum}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      {groupedActivities[dayNum].length} Scheduled Activities
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {groupedActivities[dayNum].map((act) => (
                      <div
                        key={act.id}
                        className="p-4 bg-slate-900/80 rounded-xl border border-slate-800/80 hover:border-indigo-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-start space-x-4">
                          <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700/60 shrink-0 mt-0.5">
                            {getActivityIcon(act.activityType)}
                          </div>

                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-bold text-indigo-400 font-mono">
                                {act.startTime || '09:00'} - {act.endTime || '10:00'}
                              </span>
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-800 text-slate-300 border border-slate-700">
                                {act.activityType}
                              </span>
                            </div>

                            <h4 className="text-base font-bold text-white mt-1">{act.title}</h4>

                            {act.location && (
                              <div className="text-xs text-slate-400 flex items-center space-x-1 mt-1">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                <span>{act.location}</span>
                              </div>
                            )}

                            {act.description && (
                              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{act.description}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2 self-end sm:self-center">
                          <button
                            onClick={() => openEditActivity(act)}
                            className="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteActivity(act.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: BUDGET & EXPENSES DASHBOARD */}
      {activeTab === 'expenses' && (
        <div className="space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-1">TOTAL BUDGET</div>
<<<<<<< HEAD
              <div className="text-2xl font-extrabold text-white">${(expenseSummary?.totalBudget || 0).toLocaleString()}</div>
=======
              <div className="text-2xl font-extrabold text-white">₹{(expenseSummary?.totalBudget || 0).toLocaleString()}</div>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-1">TOTAL SPENT</div>
<<<<<<< HEAD
              <div className="text-2xl font-extrabold text-emerald-400">${(expenseSummary?.totalExpenses || 0).toLocaleString()}</div>
=======
              <div className="text-2xl font-extrabold text-emerald-400">₹{(expenseSummary?.totalExpenses || 0).toLocaleString()}</div>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-1">REMAINING</div>
              <div className={`text-2xl font-extrabold ${(expenseSummary?.remainingBudget || 0) < 0 ? 'text-rose-400' : 'text-indigo-400'}`}>
<<<<<<< HEAD
                ${(expenseSummary?.remainingBudget || 0).toLocaleString()}
=======
                ₹{(expenseSummary?.remainingBudget || 0).toLocaleString()}
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-slate-800">
              <div className="text-xs font-semibold text-slate-400 mb-1">BUDGET USED</div>
              <div className="text-2xl font-extrabold text-purple-400">{(expenseSummary?.budgetUtilization || 0).toFixed(1)}%</div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
                  style={{ width: `${Math.min(expenseSummary?.budgetUtilization || 0, 100)}%` }}
                />
              </div>
            </div>
          </div>

<<<<<<< HEAD
          {/* Shared Expense Settlement Calculation */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-teal-400" />
              Shared Expense Balance & Debt Settlement
            </h3>
            <p className="text-xs text-slate-400">
              Equal split calculation across all {Math.max(1, members.length)} registered trip members (Individual Target Share: ${(expenseSummary?.totalExpenses ? (expenseSummary.totalExpenses / Math.max(1, members.length)).toFixed(2) : '0.00')})
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {settlements.map((set, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{set.person}</span>
                    <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                      set.netBalance >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                    }`}>
                      {set.netBalance >= 0 ? `Gets back $${set.netBalance.toFixed(2)}` : `Owes $${Math.abs(set.netBalance).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex justify-between">
                    <span>Paid total: ${set.paidAmount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category breakdown & Add Expense */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white mb-2">Category Breakdown</h3>
=======
          {/* Category breakdown & Add Expense */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white mb-2">Category-Wise Breakdown</h3>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
              {expenseSummary?.categoryWiseExpenses &&
                Object.entries(expenseSummary.categoryWiseExpenses).map(([category, amount]) => (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-semibold">{category}</span>
<<<<<<< HEAD
                      <span className="text-indigo-300 font-mono font-bold">${amount.toLocaleString()}</span>
=======
                      <span className="text-indigo-300 font-mono font-bold">₹{amount.toLocaleString()}</span>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                    </div>
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${expenseSummary.totalExpenses > 0 ? (amount / expenseSummary.totalExpenses) * 100 : 0}%`
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>

            <div className="lg:col-span-2 glass-card p-6 rounded-2xl border border-slate-800 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white">Expense Records ({expenseSummary?.expenses?.length || 0})</h3>
                <button
                  onClick={() => {
                    resetExpenseForm();
                    setEditingExpense(null);
                    setShowExpenseModal(true);
                  }}
<<<<<<< HEAD
                  className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
=======
                  className="gradient-button text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Expense</span>
                </button>
              </div>

              {expenseSummary?.expenses?.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">No expenses logged yet for this trip.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300">
                    <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Description</th>
                        <th className="py-3 px-4">Paid By</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {expenseSummary?.expenses?.map((exp) => (
                        <tr key={exp.id} className="hover:bg-slate-900/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-slate-400">{exp.expenseDate}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-800 text-indigo-300 border border-slate-700">
                              {exp.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-white">{exp.description || '-'}</td>
<<<<<<< HEAD
                          <td className="py-3.5 px-4 text-slate-400">{exp.paidBy || 'Owner'}</td>
                          <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">${exp.amount.toLocaleString()}</td>
=======
                          <td className="py-3.5 px-4 text-slate-400">{exp.paidBy}</td>
                          <td className="py-3.5 px-4 font-bold text-emerald-400 font-mono">₹{exp.amount.toLocaleString()}</td>
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              onClick={() => openEditExpense(exp)}
                              className="p-1 text-slate-400 hover:text-indigo-400 rounded"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteExpense(exp.id)}
                              className="p-1 text-slate-400 hover:text-rose-400 rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GROUP MEMBERS */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Group Roster & Collaborators</h2>
            <button
              onClick={() => setShowInviteModal(true)}
<<<<<<< HEAD
              className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
=======
              className="gradient-button text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
            >
              <UserPlus className="w-4 h-4" />
              <span>Invite Member</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((m) => (
              <div key={m.id} className="glass-card p-6 rounded-2xl border border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                    {m.userName ? m.userName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{m.userName}</h4>
                    <p className="text-xs text-slate-400">{m.userEmail}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                        {m.role}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
                        m.status === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' :
                        m.status === 'REJECTED' ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' :
                        'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                  </div>
                </div>

                {m.role !== 'OWNER' && (
                  <button
                    onClick={() => handleRemoveMember(m.id)}
                    className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                    title="Remove Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

<<<<<<< HEAD
      {/* TAB 4: DOCUMENTS & FILE STORAGE */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Travel Documents & Files</h2>
            <button
              onClick={() => setShowDocModal(true)}
              className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 shadow-lg shadow-indigo-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Upload Document</span>
            </button>
          </div>

          {documents.length === 0 ? (
            <div className="glass-card p-12 text-center border border-dashed border-slate-800 space-y-4">
              <FileText className="w-12 h-12 text-slate-600 mx-auto" />
              <div>
                <h3 className="text-base font-bold text-white">No Documents Uploaded</h3>
                <p className="text-xs text-slate-400 mt-1">Upload flight tickets, hotel reservations, passports, or travel photos (max 5MB).</p>
              </div>
              <button
                onClick={() => setShowDocModal(true)}
                className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white px-5 py-2 rounded-xl text-xs font-bold inline-flex items-center space-x-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Upload First File</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {documents.map((doc) => (
                <div key={doc.id} className="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-bold">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white truncate max-w-[160px]">{doc.title}</h4>
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-slate-800 text-teal-400 border border-slate-700">
                          {doc.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteDoc(doc.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-400 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                    <span>Size: {(doc.fileSizeBytes ? (doc.fileSizeBytes / 1024).toFixed(1) : 0)} KB</span>
                    <a
                      href={doc.fileUrl.startsWith('http') ? doc.fileUrl : `/api/documents/download/${doc.fileUrl.replace('/uploads/', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
      {/* ACTIVITY MODAL */}
      <Modal
        isOpen={showActivityModal}
        onClose={() => {
          setShowActivityModal(false);
          setEditingActivity(null);
        }}
        title={editingActivity ? "Edit Activity" : "Add Itinerary Activity"}
      >
        <form onSubmit={handleActivitySubmit} className="space-y-4">
          {actionError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
              {actionError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Day Number *</label>
              <input
                type="number"
                min={1}
                required
                value={activityForm.dayNumber}
                onChange={(e) => setActivityForm({ ...activityForm, dayNumber: parseInt(e.target.value) || 1 })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Activity Type *</label>
              <select
                value={activityForm.activityType}
                onChange={(e) => setActivityForm({ ...activityForm, activityType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white cursor-pointer"
              >
                <option value="SIGHTSEEING">Sightseeing</option>
                <option value="DINING">Dining</option>
                <option value="TRANSPORTATION">Transportation</option>
                <option value="ACCOMMODATION">Accommodation</option>
                <option value="ADVENTURE">Adventure Activities</option>
                <option value="SHOPPING">Shopping</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Activity Title *</label>
            <input
              type="text"
              required
              value={activityForm.title}
              onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })}
              placeholder="e.g. Visit Eiffel Tower Observation Deck"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Start Time</label>
              <input
                type="text"
                value={activityForm.startTime}
                onChange={(e) => setActivityForm({ ...activityForm, startTime: e.target.value })}
                placeholder="09:00"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">End Time</label>
              <input
                type="text"
                value={activityForm.endTime}
                onChange={(e) => setActivityForm({ ...activityForm, endTime: e.target.value })}
                placeholder="11:00"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
            <input
              type="text"
              value={activityForm.location}
              onChange={(e) => setActivityForm({ ...activityForm, location: e.target.value })}
              placeholder="e.g. Champ de Mars, 5 Av. Anatole France"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              rows={3}
              value={activityForm.description}
              onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })}
              placeholder="Notes or special instructions..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
            />
          </div>

          <button
            type="submit"
<<<<<<< HEAD
            className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20"
=======
            className="w-full gradient-button text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
          >
            {editingActivity ? "Save Activity Updates" : "Add Activity to Schedule"}
          </button>
        </form>
      </Modal>

      {/* EXPENSE MODAL */}
      <Modal
        isOpen={showExpenseModal}
        onClose={() => {
          setShowExpenseModal(false);
          setEditingExpense(null);
        }}
        title={editingExpense ? "Edit Expense" : "Log New Expense"}
      >
        <form onSubmit={handleExpenseSubmit} className="space-y-4">
          {actionError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
              {actionError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
<<<<<<< HEAD
              <label className="block text-xs font-semibold text-slate-300 mb-1">Amount ($) *</label>
              <input
                type="number"
                min={0}
                step={1}
                required
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({ ...expenseForm, amount: parseFloat(e.target.value) || 0 })}
                placeholder="150"
=======
              <label className="block text-xs font-semibold text-slate-300 mb-1">Amount (₹) *</label>
              <input
                type="number"
                min={0}
                step={10}
                required
                value={expenseForm.amount}
                onChange={(e) => setExpenseForm({ ...expenseForm, amount: parseFloat(e.target.value) || 0 })}
                placeholder="1500"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category *</label>
              <select
                value={expenseForm.category}
                onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white cursor-pointer"
              >
                <option value="TRANSPORTATION">Transportation</option>
                <option value="HOTEL">Hotel / Stay</option>
                <option value="FOOD">Food & Dining</option>
                <option value="SHOPPING">Shopping</option>
                <option value="ENTERTAINMENT">Entertainment</option>
                <option value="MISCELLANEOUS">Miscellaneous</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <input
              type="text"
              value={expenseForm.description}
              onChange={(e) => setExpenseForm({ ...expenseForm, description: e.target.value })}
              placeholder="e.g. Museum entry tickets"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Expense Date</label>
              <input
                type="date"
                value={expenseForm.expenseDate}
                onChange={(e) => setExpenseForm({ ...expenseForm, expenseDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Paid By</label>
              <input
                type="text"
                value={expenseForm.paidBy}
                onChange={(e) => setExpenseForm({ ...expenseForm, paidBy: e.target.value })}
                placeholder="Payer name"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
              />
            </div>
          </div>

          <button
            type="submit"
<<<<<<< HEAD
            className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20"
=======
            className="w-full gradient-button text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
          >
            {editingExpense ? "Save Expense Updates" : "Log Expense Record"}
          </button>
        </form>
      </Modal>

      {/* INVITE MEMBER MODAL */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite Collaborator to Trip"
      >
        <form onSubmit={handleInviteSubmit} className="space-y-4">
          {actionError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
              {actionError}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">User Email Address *</label>
            <input
              type="email"
              required
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="friend@example.com"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Assign Group Role</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white cursor-pointer"
            >
              <option value="MEMBER">MEMBER (View & Contribute)</option>
              <option value="GROUP_ADMIN">GROUP_ADMIN (Manage Itinerary & Expenses)</option>
            </select>
          </div>

          <button
            type="submit"
<<<<<<< HEAD
            className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20"
=======
            className="w-full gradient-button text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20"
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
          >
            Send Trip Invitation
          </button>
        </form>
      </Modal>
<<<<<<< HEAD

      {/* DOCUMENT MODAL */}
      <Modal
        isOpen={showDocModal}
        onClose={() => setShowDocModal(false)}
        title="Upload Travel Document / File"
      >
        <form onSubmit={handleDocSubmit} className="space-y-4">
          {actionError && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs rounded-xl">
              {actionError}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Document Title *</label>
            <input
              type="text"
              required
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g. Flight Tickets to Paris (PDF)"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Type *</label>
            <select
              value={docType}
              onChange={(e) => setDocType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white cursor-pointer"
            >
              <option value="TICKET">Flight / Train Ticket</option>
              <option value="HOTEL_BOOKING">Hotel / Stay Reservation</option>
              <option value="PASSPORT">Passport / ID Document</option>
              <option value="PHOTO">Travel Photo / Receipt</option>
              <option value="OTHER">Other Document</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Select File (Max 5MB) *</label>
            <input
              type="file"
              required
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full text-xs text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white py-3 rounded-xl font-bold text-xs shadow-lg shadow-indigo-500/20"
          >
            Upload File to Trip Storage
          </button>
        </form>
      </Modal>

      {/* SHARE TRIP MODAL */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        title="Share Trip Itinerary"
      >
        <div className="space-y-4 text-slate-300 text-sm">
          <p>Share this link with your fellow travelers to view the live trip itinerary and schedule:</p>
          <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-700">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="w-full bg-transparent text-xs text-teal-300 outline-none font-mono"
            />
            <button
              onClick={copyShareLink}
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold shrink-0 flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </Modal>
=======
>>>>>>> 5a903c8e3c6b95ec1bfdcf58f147b9e0cd0a337e
    </div>
  );
};
