import { http } from '@google-cloud/functions-framework';
import axios from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

http('viewPlaylist', async (req, res) => {
  console.log(req);
  const accessToken = req.headers.authorization;
  const playlistId = req.params['0'].replace('/', '');

  console.log(playlistId);

  const response = await axios.get(
    `${SPOTIFY_BASE_URL}/playlists/${playlistId}`,
    { headers: { Authorization: accessToken } }
  );

  res.send(response.data);
});
