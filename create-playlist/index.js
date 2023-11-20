import { http } from "@google-cloud/functions-framework";
import axios from "axios";

const SPOTIFY_BASE_URL = "https://api.spotify.com/v1";

http("createPlaylist", async (req, res) => {
  console.log(req.headers.authorization);
  console.log(req.body);

  const accessToken = req.headers.authorization;

  const profileResponse = await axios.get(`${SPOTIFY_BASE_URL}/me`, {
    headers: { Authorization: accessToken },
  });

  const profileId = profileResponse.data.id;

  const playlistRequestData = {
    name: req.body.theme,
    public: false,
  };

  const createPlaylistResponse = await axios.post(
    `${SPOTIFY_BASE_URL}/users/${profileId}/playlists`,
    playlistRequestData,
    { headers: { Authorization: accessToken } },
  );

  if (req.body.songs) {
    const promises = req.body.songs.map((song) =>
      searchSpotify(song, accessToken),
    );
    const searchResults = await Promise.all(promises);

    console.log(JSON.stringify(searchResults));

    await addSongs(createPlaylistResponse.data.id, searchResults, accessToken);
  }

  res.status(200).json({
    url: `https://open.spotify.com/playlist/${createPlaylistResponse.data.id}`,
  });
});

async function searchSpotify(song, accessToken) {
  const resp = await axios.get(
    `${SPOTIFY_BASE_URL}/search?q=${song}&type=track&limit=1`,
    { headers: { Authorization: accessToken } },
  );

  return resp.data.tracks.items[0]?.id;
}

async function addSongs(playlistId, songIds, accessToken) {
  const addSongsRequest = {
    uris: songIds.map((id) => `spotify:track:${id}`),
  };

  await axios.post(
    `${SPOTIFY_BASE_URL}/playlists/${playlistId}/tracks`,
    addSongsRequest,
    { headers: { Authorization: accessToken } },
  );
}
