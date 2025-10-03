import React, { useState } from 'react';
import PlayerInput from './PlayerInput';
import Results from './Results';
import '../styles/Game.css';

const CADRE = 10;
const TOUCHE = 2;
const ARRET = 50;
const PASSE_DECISIVE = 50;
const BONUS_SAUVE_MIRACLE = 25;
const BUT = 100;

function Game({ onReturn, onClose }) {
    const [players, setPlayers] = useState({});
    const [gameStage, setGameStage] = useState('input');
    const [error, setError] = useState('');

    const addPlayer = (playerName, stats) => {
        setPlayers(prevPlayers => {
            const updatedPlayers = { ...prevPlayers };
            if (updatedPlayers[playerName]) {
                for (let key in stats) {
                    updatedPlayers[playerName][key] += stats[key];
                }
            } else {
                updatedPlayers[playerName] = stats;
            }
            return updatedPlayers;
        });
        setError('');
    };

    const calculateScore = (stats) => {
        return (TOUCHE * stats.nbTouche) + (CADRE * stats.nbCadre) + stats.scoreArrets +
               (PASSE_DECISIVE * stats.nbDecisive) + (BUT * stats.nbBut);
    };

    const handlePlayerSubmit = (playerName, stats) => {
        const scoreArrets = (stats.nbArret * ARRET) + (stats.nbMiracle * BONUS_SAUVE_MIRACLE);
        const scoreTotal = calculateScore({ ...stats, scoreArrets });
        addPlayer(playerName, { ...stats, scoreArrets, scoreTotal });
    };

    const finishGame = () => {
        if (Object.keys(players).length % 2 !== 0) {
            setError('Le nombre de joueurs doit être pair pour terminer la saisie.');
        } else {
            setGameStage('results');
        }
    };

    if (gameStage === 'input') {
        return (
            <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
                    <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <PlayerInput onSubmit={handlePlayerSubmit} />
                    </div>
                    
                    <div style={{ backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '8px' }}>
                                <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2em' }}>Joueurs ajoutés</h3>
                                <span style={{ fontSize: '2.5em', fontWeight: 'bold', color: '#34a853' }}>
                                    {Object.keys(players).length}
                                </span>
                            </div>
                            
                            {Object.keys(players).length > 0 && (
                                <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
                                    <h4 style={{ margin: '0 0 10px 0', fontSize: '1.1em' }}>Liste des joueurs :</h4>
                                    <ul style={{ listStyle: 'none', padding: '0', margin: '0' }}>
                                        {Object.keys(players).map((playerName, index) => (
                                            <li 
                                                key={index} 
                                                style={{ 
                                                    padding: '8px 12px', 
                                                    margin: '5px 0', 
                                                    backgroundColor: '#fff', 
                                                    borderRadius: '4px', 
                                                    borderLeft: '4px solid #34a853',
                                                    position: 'relative',
                                                    cursor: 'pointer'
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#e8e8e8';
                                                    e.currentTarget.querySelector('.tooltip').style.display = 'block';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = '#fff';
                                                    e.currentTarget.querySelector('.tooltip').style.display = 'none';
                                                }}
                                            >
                                                {playerName}
                                                <div 
                                                    className="tooltip"
                                                    style={{
                                                        display: 'none',
                                                        position: 'absolute',
                                                        left: '105%',
                                                        top: '50%',
                                                        transform: 'translateY(-50%)',
                                                        backgroundColor: '#fff',
                                                        border: '2px solid #34a853',
                                                        borderRadius: '8px',
                                                        padding: '15px',
                                                        minWidth: '250px',
                                                        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                                                        zIndex: '1000',
                                                        whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    <strong style={{ display: 'block', marginBottom: '10px', paddingBottom: '8px', borderBottom: '2px solid #34a853', color: '#34a853', fontSize: '1.1em' }}>
                                                        {playerName}
                                                    </strong>
                                                    <div style={{ padding: '5px 0', color: '#333' }}>Ballons touchés: {players[playerName].nbTouche}</div>
                                                    <div style={{ padding: '5px 0', color: '#333' }}>Tirs cadrés: {players[playerName].nbCadre}</div>
                                                    <div style={{ padding: '5px 0', color: '#333' }}>Arrêts: {players[playerName].nbArret}</div>
                                                    <div style={{ padding: '5px 0', color: '#333' }}>Sauvetages miraculeux: {players[playerName].nbMiracle}</div>
                                                    <div style={{ padding: '5px 0', color: '#333' }}>Passes décisives: {players[playerName].nbDecisive}</div>
                                                    <div style={{ padding: '5px 0', color: '#333' }}>Buts: {players[playerName].nbBut}</div>
                                                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #ccc', fontWeight: 'bold', color: '#34a853', fontSize: '1.1em' }}>
                                                        Score total: {players[playerName].scoreTotal} pts
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {error && (
                                <p style={{ color: '#dc3545', fontWeight: 'bold', textAlign: 'center', padding: '10px', backgroundColor: 'rgba(220, 53, 69, 0.1)', borderRadius: '6px', border: '1px solid #dc3545' }}>
                                    {error}
                                </p>
                            )}
                            
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                <button 
                                    onClick={finishGame}
                                    disabled={Object.keys(players).length === 0}
                                    style={{
                                        padding: '12px 20px',
                                        fontSize: '1.1em',
                                        color: '#fff',
                                        backgroundColor: Object.keys(players).length === 0 ? '#ccc' : '#34a853',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: Object.keys(players).length === 0 ? 'not-allowed' : 'pointer',
                                        fontWeight: '600',
                                        opacity: Object.keys(players).length === 0 ? '0.6' : '1'
                                    }}
                                >
                                    Terminer la saisie
                                </button>
                                
                                <button 
                                    onClick={onReturn}
                                    style={{
                                        padding: '10px 20px',
                                        fontSize: '1em',
                                        color: '#fff',
                                        backgroundColor: '#234399',
                                        border: 'none',
                                        borderRadius: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Retour à l'accueil
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <Results players={players} onReturn={onReturn} onClose={onClose} />;
    }
}

export default Game;