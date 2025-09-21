import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';

const topPlayers = [
  { rank: 1, name: "Alex Chen", points: 15000, level: 42 },
  { rank: 2, name: "Sarah Smith", points: 14200, level: 38 },
  { rank: 3, name: "Mike Johnson", points: 13800, level: 35 },
];

export function Leaderboard() {
  return (
    <section className="py-16 bg-white" id="leaderboard">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Top Coders</h2>
          <div className="space-y-4">
            {topPlayers.map((player) => (
              <div key={player.rank} className="bg-gray-50 rounded-lg p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {player.rank === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
                  {player.rank === 2 && <Medal className="w-6 h-6 text-gray-400" />}
                  {player.rank === 3 && <Award className="w-6 h-6 text-amber-700" />}
                  <div>
                    <h3 className="font-semibold">{player.name}</h3>
                    <p className="text-sm text-gray-600">Level {player.level}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-indigo-600">{player.points.toLocaleString()} pts</p>
                  <p className="text-sm text-gray-600">Rank #{player.rank}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}