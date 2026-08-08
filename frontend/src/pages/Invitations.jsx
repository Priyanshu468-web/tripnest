import React, { useState, useEffect } from 'react';
import { memberService } from '../services/memberService';
import { Mail, CheckCircle, XCircle, Users, MapPin } from 'lucide-react';

export const Invitations = () => {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvitations();
  }, []);

  const loadInvitations = async () => {
    try {
      const data = await memberService.getMyInvitations();
      setInvitations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRespond = async (id, accept) => {
    try {
      if (accept) {
        await memberService.acceptInvitation(id);
      } else {
        await memberService.rejectInvitation(id);
      }
      setInvitations(invitations.filter(i => i.id !== id));
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to process invitation');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-extrabold text-white flex items-center space-x-3">
          <Mail className="w-8 h-8 text-indigo-400" />
          <span>Trip Invitations</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Accept or decline invitations to join group itineraries and shared trip budgets.
        </p>
      </div>

      {loading ? (
        <div className="glass-card p-12 text-center text-slate-400 text-sm">
          Loading invitations...
        </div>
      ) : invitations.length === 0 ? (
        <div className="glass-card p-12 text-center border border-dashed border-slate-800 space-y-3">
          <Mail className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-bold text-white">No Pending Invitations</p>
          <p className="text-xs text-slate-400">You are up to date on all trip collaboration invites.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {invitations.map((inv) => (
            <div key={inv.id} className="glass-card p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl text-purple-400 shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-indigo-400" />
                    <span>{inv.tripDestination}</span>
                  </h3>
                  <div className="flex items-center space-x-2 text-xs text-slate-400 mt-1">
                    <span>Role: <strong className="text-indigo-300">{inv.role}</strong></span>
                    <span>•</span>
                    <span>Status: <strong className="text-amber-400">{inv.status}</strong></span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 self-end sm:self-center">
                <button
                  onClick={() => handleRespond(inv.id, false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-rose-500/20 hover:text-rose-400 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Decline</span>
                </button>
                <button
                  onClick={() => handleRespond(inv.id, true)}
                  className="gradient-button text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-lg shadow-indigo-500/20"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Accept Invite</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
