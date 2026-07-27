import React, { useState } from 'react';
import { Match, MatchStatus } from '../types';
import { X, Save, Edit } from 'lucide-react';
import { RuneCorners } from './RuneCorners';

interface EditMatchModalProps {
  match: Match | null;
  onClose: () => void;
  onSave: (updatedMatch: Match) => void;
}

export const EditMatchModal: React.FC<EditMatchModalProps> = ({
  match,
  onClose,
  onSave
}) => {
  if (!match) return null;

  const [homeScore, setHomeScore] = useState<string>(
    match.homeScore !== null ? String(match.homeScore) : '0'
  );
  const [awayScore, setAwayScore] = useState<string>(
    match.awayScore !== null ? String(match.awayScore) : '0'
  );
  const [status, setStatus] = useState<MatchStatus>(match.status);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hScore = parseInt(homeScore, 10);
    const aScore = parseInt(awayScore, 10);

    const updated: Match = {
      ...match,
      homeScore: isNaN(hScore) ? 0 : hScore,
      awayScore: isNaN(aScore) ? 0 : aScore,
      status: status
    };

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B132B]/80 backdrop-blur-md animate-fade-in">
      <div className="parchment-card rounded-2xl w-full max-w-md overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)] relative bg-[#111D3A] border border-[#38BDF8]/40">
        <RuneCorners />
        
        {/* Header */}
        <div className="bg-[#1C2541] p-5 border-b border-[#38BDF8]/20 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Edit className="w-5 h-5 text-[#38BDF8]" />
            <h3 className="font-cinzel text-lg font-bold text-[#FFFFFF]">
              Update Match Score
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-[#94A3B8] hover:text-[#FFFFFF] hover:bg-[#283655] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 font-inter text-sm">
          
          <div className="bg-[#1C2541] border border-[#38BDF8]/20 p-3 rounded-xl text-center text-xs text-[#38BDF8] font-orbitron font-semibold">
            GROUP {match.group} • ROUND {match.round}
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Home Score */}
            <div className="space-y-2 text-center">
              <label className="block text-xs font-cinzel font-bold text-[#FFFFFF] truncate">
                {match.homeTeamName}
              </label>
              <input
                type="number"
                min="0"
                max="25"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                className="w-full text-center text-2xl font-orbitron font-bold py-2 bg-[#1C2541] border border-[#38BDF8]/30 rounded-xl text-[#38BDF8] focus:outline-none focus:border-[#38BDF8]"
              />
            </div>

            {/* Away Score */}
            <div className="space-y-2 text-center">
              <label className="block text-xs font-cinzel font-bold text-[#FFFFFF] truncate">
                {match.awayTeamName}
              </label>
              <input
                type="number"
                min="0"
                max="25"
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
                className="w-full text-center text-2xl font-orbitron font-bold py-2 bg-[#1C2541] border border-[#38BDF8]/30 rounded-xl text-[#38BDF8] focus:outline-none focus:border-[#38BDF8]"
              />
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-orbitron text-[#94A3B8] font-semibold">
              Match Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as MatchStatus)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#1C2541] border border-[#38BDF8]/25 text-sm text-[#E2E8F0] focus:outline-none focus:border-[#38BDF8]"
            >
              <option value="finished">Finished (Full Time)</option>
              <option value="live">Live in Progress</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-[#1C2541] hover:bg-[#283655] text-[#94A3B8] hover:text-[#FFFFFF] border border-[#38BDF8]/20 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#0284C7] to-[#1E3A8A] hover:brightness-110 text-white font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 shadow-md border border-[#38BDF8]/40 transition-all"
            >
              <Save className="w-4 h-4 text-[#F59E0B]" />
              <span>Save & Recalculate</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

