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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A2A22]/60 backdrop-blur-sm animate-fade-in">
      <div className="parchment-card rounded-2xl w-full max-w-md overflow-hidden shadow-[0_10px_30px_rgba(58,42,34,0.15)] relative">
        <RuneCorners />
        
        {/* Header */}
        <div className="bg-[#EAE3D8] p-5 border-b border-[#DDD0BF] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Edit className="w-5 h-5 text-[#8E2D2D]" />
            <h3 className="font-cinzel text-lg font-bold text-[#3A2A22]">
              Update Match Score
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8A6444] hover:text-[#3A2A22] hover:bg-[#DDD0BF]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 font-inter text-sm">
          
          <div className="bg-[#F2ECE3] border border-[#DDD0BF] p-3 rounded-xl text-center text-xs text-[#8A6444] font-orbitron font-semibold">
            GROUP {match.group} • ROUND {match.round}
          </div>

          <div className="grid grid-cols-2 gap-4 items-center">
            {/* Home Score */}
            <div className="space-y-2 text-center">
              <label className="block text-xs font-cinzel font-bold text-[#3A2A22] truncate">
                {match.homeTeamName}
              </label>
              <input
                type="number"
                min="0"
                max="25"
                value={homeScore}
                onChange={(e) => setHomeScore(e.target.value)}
                className="w-full text-center text-2xl font-orbitron font-bold py-2 bg-[#F2ECE3] border border-[#DDD0BF] rounded-xl text-[#8E2D2D] focus:outline-none focus:border-[#B99668]"
              />
            </div>

            {/* Away Score */}
            <div className="space-y-2 text-center">
              <label className="block text-xs font-cinzel font-bold text-[#3A2A22] truncate">
                {match.awayTeamName}
              </label>
              <input
                type="number"
                min="0"
                max="25"
                value={awayScore}
                onChange={(e) => setAwayScore(e.target.value)}
                className="w-full text-center text-2xl font-orbitron font-bold py-2 bg-[#F2ECE3] border border-[#DDD0BF] rounded-xl text-[#8E2D2D] focus:outline-none focus:border-[#B99668]"
              />
            </div>
          </div>

          {/* Status Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-orbitron text-[#8A6444] font-semibold">
              Match Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as MatchStatus)}
              className="w-full py-2.5 px-3 rounded-xl bg-[#F2ECE3] border border-[#DDD0BF] text-sm text-[#3A2A22] focus:outline-none focus:border-[#B99668]"
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
              className="flex-1 py-2.5 rounded-xl bg-[#DDD0BF] hover:bg-[#B8B0A5] text-[#3A2A22] font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-[#8E2D2D] hover:bg-[#3A2A22] text-[#FAF6F0] font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save & Recalculate</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
