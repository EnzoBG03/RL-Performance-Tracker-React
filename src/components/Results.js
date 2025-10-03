import React from 'react';
import '../styles/Results.css';
import '../styles/theme-variables.css';

function Results({ players, onReturn, onClose }) {
    const getBestPlayer = (critereFn) => {
        return Object.entries(players).reduce((best, [name, stats]) => 
            critereFn(stats) > critereFn(best[1]) ? [name, stats] : best
        );
    };

    const bestOverall = getBestPlayer(stats => stats.scoreTotal);
    const bestScorer = getBestPlayer(stats => stats.nbBut);
    const bestAssist = getBestPlayer(stats => stats.nbDecisive);
    const bestGoalkeeper = getBestPlayer(stats => stats.nbArret);

    // Classement des joueurs par points
    const sortedPlayers = Object.entries(players).sort((a, b) => b[1].scoreTotal - a[1].scoreTotal);

    return (
        <div className="results-page">
            <h2 className="results-title">Résultats de la partie</h2>
            
            <div className="results-grid">
                {/* Encart des meilleurs joueurs */}
                <div className="results-card best-players-card">
                    <h3>Meilleurs joueurs</h3>
                    <div className="best-player-item">
                        <span className="label">Meilleur joueur :</span>
                        <span className="value">{bestOverall[0]} ({bestOverall[1].scoreTotal} {bestOverall[1].scoreTotal > 1 ? 'pts' : 'pt'})</span>
                    </div>
                    <div className="best-player-item">
                        <span className="label">Meilleur buteur :</span>
                        <span className="value">{bestScorer[0]} ({bestScorer[1].nbBut} {bestScorer[1].nbBut > 1 ? 'buts' : 'but'})</span>
                    </div>
                    <div className="best-player-item">
                        <span className="label">Meilleur passeur :</span>
                        <span className="value">{bestAssist[0]} ({bestAssist[1].nbDecisive} {bestAssist[1].nbDecisive > 1 ? 'passes' : 'passe'})</span>
                    </div>
                    <div className="best-player-item">
                        <span className="label">Meilleur gardien :</span>
                        <span className="value">{bestGoalkeeper[0]} ({bestGoalkeeper[1].nbArret} {bestGoalkeeper[1].nbArret > 1 ? 'arrêts' : 'arrêt'})</span>
                    </div>
                </div>

                {/* Encart du classement complet */}
                <div className="results-card ranking-card">
                    <h3>Classement général</h3>
                    <div className="ranking-list">
                        {sortedPlayers.map(([name, stats], index) => (
                            <div key={name} className={`ranking-item ${index === 0 ? 'first-place' : ''}`}>
                                <span className="rank">#{index + 1}</span>
                                <span className="player-name">{name}</span>
                                <div className="player-stats">
                                    <span className="stat">{stats.nbBut}B</span>
                                    <span className="stat">{stats.nbDecisive}P</span>
                                    <span className="stat">{stats.nbArret}A</span>
                                </div>
                                <span className="total-score">{stats.scoreTotal} pts</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Encart du barème */}
                <div className="results-card scoring-card">
                    <h3>Barème des points</h3>
                    <div className="scoring-table">
                        <div className="scoring-row">
                            <span className="scoring-label">Touche de balle</span>
                            <span className="scoring-value">2 points</span>
                        </div>
                        <div className="scoring-row">
                            <span className="scoring-label">Tir cadré</span>
                            <span className="scoring-value">10 points</span>
                        </div>
                        <div className="scoring-row">
                            <span className="scoring-label">Arrêt</span>
                            <span className="scoring-value">50 points</span>
                        </div>
                        <div className="scoring-row">
                            <span className="scoring-label">Sauvetage miraculeux</span>
                            <span className="scoring-value">Arrêt+25 points</span>
                        </div>
                        <div className="scoring-row">
                            <span className="scoring-label">Passe décisive</span>
                            <span className="scoring-value">50 points</span>
                        </div>
                        <div className="scoring-row">
                            <span className="scoring-label">But</span>
                            <span className="scoring-value">100 points</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="button-container">
                <button className="return-button" onClick={onReturn}>Retour à l'accueil</button>
            </div>

            <style jsx>{`
                .results-page {
                    max-width: 1400px;
                    margin: 0 auto;
                    padding: 30px 20px;
                }

                .results-title {
                    color: var(--text-primary);
                    text-align: center;
                    margin-bottom: 30px;
                    font-size: 2em;
                }

                .results-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    gap: 25px;
                    margin-bottom: 30px;
                }

                .results-card {
                    background-color: var(--card-bg);
                    padding: 25px;
                    border-radius: 12px;
                    box-shadow: 0 4px 8px var(--shadow-color);
                }

                .results-card h3 {
                    color: var(--text-primary);
                    margin: 0 0 20px 0;
                    font-size: 1.3em;
                    border-bottom: 2px solid var(--button-primary);
                    padding-bottom: 10px;
                }

                /* Meilleurs joueurs */
                .best-player-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px;
                    margin-bottom: 10px;
                    background-color: var(--results-bg-alt);
                    border-radius: 6px;
                    color: var(--text-primary);
                }

                .best-player-item .label {
                    font-weight: 500;
                }

                .best-player-item .value {
                    font-weight: bold;
                    color: var(--button-primary);
                }

                /* Classement */
                .ranking-list {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }

                .ranking-item {
                    display: grid;
                    grid-template-columns: 40px 1fr auto auto;
                    gap: 12px;
                    align-items: center;
                    padding: 12px;
                    background-color: var(--results-bg-alt);
                    border-radius: 6px;
                    border-left: 4px solid var(--border-color);
                    color: var(--text-primary);
                }

                .ranking-item.first-place {
                    border-left-color: #ffd700;
                    background-color: rgba(255, 215, 0, 0.1);
                }

                .rank {
                    font-weight: bold;
                    font-size: 1.1em;
                    color: var(--text-secondary);
                }

                .player-name {
                    font-weight: 600;
                    color: var(--text-primary);
                }

                .player-stats {
                    display: flex;
                    gap: 8px;
                }

                .stat {
                    font-size: 0.85em;
                    padding: 2px 8px;
                    background-color: var(--input-bg);
                    border-radius: 4px;
                    color: var(--text-secondary);
                }

                .total-score {
                    font-weight: bold;
                    font-size: 1.1em;
                    color: var(--button-primary);
                    min-width: 70px;
                    text-align: right;
                }

                /* Barème */
                .scoring-table {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .scoring-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px;
                    background-color: var(--results-bg-alt);
                    border-radius: 6px;
                    color: var(--text-primary);
                }

                .scoring-label {
                    font-weight: 500;
                }

                .scoring-value {
                    font-weight: bold;
                    color: var(--button-primary);
                    font-size: 1.1em;
                }

                .button-container {
                    text-align: center;
                    margin-top: 30px;
                }

                @media (max-width: 1100px) {
                    .results-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 480px) {
                    .results-page {
                        padding: 20px 10px;
                    }

                    .results-card {
                        padding: 20px;
                    }

                    .ranking-item {
                        grid-template-columns: 30px 1fr auto;
                        gap: 8px;
                    }

                    .player-stats {
                        grid-column: 2;
                        margin-top: 5px;
                    }

                    .total-score {
                        grid-column: 3;
                        grid-row: 1;
                    }
                }
            `}</style>
        </div>
    );
}

export default Results;