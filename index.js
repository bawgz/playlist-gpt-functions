import { http } from '@google-cloud/functions-framework';
import axios from 'axios';

http('createPlaylist', async (req, res) => {
  const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';
  console.log(req.headers.authorization);

  const accessToken = req.headers.authorization;

  const profileResponse = await axios.get(
    `${SPOTIFY_BASE_URL}/me`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  console.log('------------profileResponse----------------');
  console.log(profileResponse);

  const profileId = profileResponse.data.id;

  res.send(`Hello, ${profileId}`);
});
