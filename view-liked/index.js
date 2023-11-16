import { http } from '@google-cloud/functions-framework';
import axios from 'axios';

const SPOTIFY_BASE_URL = 'https://api.spotify.com/v1';

http('viewLiked', async (req, res) => {
  console.log(req.headers.authorization);
  const accessToken = req.headers.authorization;

  const limit = 50;

  const response = await axios.get(
    `${SPOTIFY_BASE_URL}/me/tracks?limit=${limit}`,
    { headers: { Authorization: accessToken } }
  );

  const total = response.data.total;
  const requests = [response];

  for (let i = limit; i < total; i += limit) {
    requests.push(axios.get(
      `${SPOTIFY_BASE_URL}/me/tracks?limit=${limit}`,
      { headers: { Authorization: accessToken } }
    ));
  }

  const responses = await Promise.all(requests);

  const result = responses.map(
    r => r.data.items.map(item => (
      {
        title: item.track?.name,
        artists: item.track?.artists.map(artist => artist.name)
      }))
  );

  res.send(result.flat());
});
