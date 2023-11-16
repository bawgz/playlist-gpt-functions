import { http } from '@google-cloud/functions-framework';

http('spec', async (req, res) => {
  res.send(SPEC);
});

const SPEC =
{
  openapi: '3.1.0',
  info: {
    title: 'Modify Spotify playlists',
    description: 'Allows you to create playlists and add songs to existing playlists',
    version: 'v1.0.0'
  },
  servers: [
    {
      url: 'https://us-central1-playlistgpt-405003.cloudfunctions.net'
    }
  ],
  paths: {
    '/create-playlist': {
      post: {
        description: 'Create a playlist',
        operationId: 'CreatePlaylist',
        parameters: [
          {
            name: 'theme',
            in: 'body',
            description: 'The theme of the playlist',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'songs',
            in: 'body',
            description: 'The songs in the following format: {title} {artist}',
            required: false,
            schema: {
              type: 'string[]'
            }
          }
        ]
      }
    },
    '/view-playlist/{id}': {
      get: {
        description: 'View a playlist',
        operationId: 'ViewPlaylist',
        parameters: [
          {
            name: 'id',
            in: 'path',
            description: 'The id of the playlist',
            required: true,
            schema: {
              type: 'string'
            }
          }
        ]
      }
    },
    '/add-songs': {
      patch: {
        description: 'Update a playlist',
        operationId: 'UpdatePlaylist',
        parameters: [
          {
            name: 'playlistId',
            in: 'body',
            description: 'The id of the playlist',
            required: true,
            schema: {
              type: 'string'
            }
          },
          {
            name: 'songs',
            in: 'body',
            description: "The list of songs in the format of '{title} {artist}'",
            required: true,
            schema: {
              type: 'string[]'
            }
          }
        ]
      }
    }
  },
  components: {
    schemas: {}
  }
};
