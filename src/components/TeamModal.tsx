import React from 'react';
import { Team, Match, Player } from '../types';
import { X, Shield, Flame } from 'lucide-react';
import { RuneCorners } from './RuneCorners';

interface TeamModalProps {
  team: Team | null;
  onClose: () => void;
  matches: Match[];
  players: Player[];
}

export const TeamModal: React.FC<TeamModalProps> = ({
  team,
  onClose,
  matches,
  players
}) => {
  if (!team) return null;

  const teamMatches = matches.filter(
    (m) => m.homeTeamId === team.id || m.awayTeamId === team.id
  );

  const teamPlayers = players.filter((p) => p.teamId === team.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#3A2A22]/60 backdrop-blur-sm animate-fade-in">
      <div className="parchment-card rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_10px_30px_rgba(58,42,34,0.15)] relative">
        <RuneCorners />
        
        {/* Modal Header */}
        <div className="bg-[#EAE3D8] p-5 border-b border-[#DDD0BF] flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8E2D2D] text-[#FAF6F0] flex items-center justify-center font-cinzel font-black text-xl shadow-sm">
              {team.shortName.slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#8E2D2D] text-[#FAF6F0] font-orbitron text-[11px] font-bold">
                  GROUP {team.group}
                </span>
                <span className="text-xs text-[#8A6444] font-orbitron font-semibold">{team.shortName}</span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl font-extrabold text-[#3A2A22] mt-0.5">
                {team.name}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#8A6444] hover:text-[#3A2A22] hover:bg-[#DDD0BF]/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          
          {/* Key Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-[#F2ECE3] border border-[#DDD0BF] rounded-xl">
              <div className="text-[11px] text-[#8A6444] font-orbitron uppercase font-semibold">Points</div>
              <div className="font-orbitron text-xl font-extrabold text-[#8E2D2D] mt-1">{team.points}</div>
            </div>
            <div className="p-3 bg-[#F2ECE3] border border-[#DDD0BF] rounded-xl">
              <div className="text-[11px] text-[#8A6444] font-orbitron uppercase font-semibold">Record</div>
              <div className="font-orbitron text-sm font-bold text-[#3A2A22] mt-1">
                {team.won}W - {team.drawn}D - {team.lost}L
              </div>
            </div>
            <div className="p-3 bg-[#F2ECE3] border border-[#DDD0BF] rounded-xl">
              <div className="text-[11px] text-[#8A6444] font-orbitron uppercase font-semibold">Goal Diff</div>
              <div className="font-orbitron text-sm font-bold text-[#B99668] mt-1">
                {team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}
              </div>
            </div>
            <div className="p-3 bg-[#F2ECE3] border border-[#DDD0BF] rounded-xl">
              <div className="text-[11px] text-[#8A6444] font-orbitron uppercase font-semibold">Form</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                {team.form?.map((f, i) => (
                  <span
                    key={i}
                    className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-orbitron font-bold text-white ${
                      f === 'W' ? 'bg-[#B99668]' : f === 'D' ? 'bg-[#8A6444]' : 'bg-[#8E2D2D]'
                    }`}
                  >
                    {f}
                  </span>
                )) ?? <span className="text-[#8A6444] text-xs">N/A</span>}
              </div>
            </div>
          </div>

          {/* Key Players */}
          <div>
            <h3 className="font-orbitron font-bold text-xs text-[#8E2D2D] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#8E2D2D]" /> Star Players
            </h3>

            {teamPlayers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {teamPlayers.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-[#F2ECE3] border border-[#DDD0BF] flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#DDD0BF] text-[#3A2A22] flex items-center justify-center font-bold text-xs">
                      {p.name.slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-[#3A2A22] truncate">{p.name}</div>
                      <div className="text-xs text-[#8A6444]">{p.position}</div>
                    </div>
                    <div className="text-right font-orbitron text-xs">
                      <div className="text-[#8E2D2D] font-bold">{p.goals} Goals</div>
                      <div className="text-[#B99668] font-semibold">{p.assists} Assists</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[#8A6444] font-inter">No key players logged for this squad yet.</p>
            )}
          </div>

          {/* Recent Matches */}
          <div>
            <h3 className="font-orbitron font-bold text-xs text-[#8E2D2D] uppercase tracking-wider mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#8E2D2D]" /> Match History
            </h3>

            <div className="space-y-2">
              {teamMatches.map((m) => (
                <div key={m.id} className="p-3 rounded-xl bg-[#F2ECE3] border border-[#DDD0BF] flex items-center justify-between text-xs font-inter">
                  <span className="text-[#8A6444] font-orbitron font-semibold">Round {m.round}</span>
                  <div className="font-bold text-[#3A2A22]">
                    {m.homeTeamName} <span className="font-orbitron text-[#8E2D2D] px-2">{m.homeScore ?? '-'} : {m.awayScore ?? '-'}</span> {m.awayTeamName}
                  </div>
                  <span className={`font-orbitron font-bold uppercase text-[11px] ${m.status === 'finished' ? 'text-[#8E2D2D]' : 'text-[#8A6444]'}`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="bg-[#EAE3D8] p-4 border-t border-[#DDD0BF] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#3A2A22] hover:bg-[#8E2D2D] text-[#FAF6F0] text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
