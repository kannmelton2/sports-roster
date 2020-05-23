import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getPlayersByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/players.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allPlayersObject = result.data;
      const players = [];
      if (allPlayersObject !== null) {
        Object.keys(allPlayersObject).forEach((player) => {
          const newPlayer = allPlayersObject[player];
          newPlayer.id = player;
          players.push(newPlayer);
        });
      }
      resolve(players);
    })
    .catch((err) => reject(err));
});

const deletePlayer = (playerId) => axios.delete(`${baseUrl}/players/${playerId}.json`);

export default { getPlayersByUid, deletePlayer };
