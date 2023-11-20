import { http } from "@google-cloud/functions-framework";
import axios from "axios";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

http("addSongs", async (req, res) => {
  console.log(req.headers.authorization);

  const accessToken = req.headers.authorization;

  if (req.body.songs) {
    const promises = req.body.songs.map((song) =>
      searchSpotify(song, accessToken),
    );
    const searchResults = await Promise.all(promises);

    console.log(JSON.stringify(searchResults));

    const addSongsRequest = {
      uris: searchResults.map((id) => `spotify:track:${id}`),
    };

    const response = await axios.post(
      `${SPOTIFY_BASE_URL}/playlists/${req.body.playlistId}/tracks`,
      addSongsRequest,
      { headers: { Authorization: accessToken } },
    );

    console.log(response);
  }

  res
    .status(200)
    .json({ url: `https://open.spotify.com/playlist/${req.body.playlistId}` });
});

async function searchSpotify(song, accessToken) {
  const resp = await axios.get(
    `${SPOTIFY_BASE_URL}/search?q=${song}&type=track&limit=1`,
    { headers: { Authorization: accessToken } },
  );

  return resp.data.tracks.items[0]?.id;
}
