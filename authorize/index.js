import { http } from "@google-cloud/functions-framework";
import querystring from "querystring";

http("authorize", async (req, res) => {
  res.redirect(
    `https://accounts.spotify.com/authorize?${querystring.stringify(
      req.query,
    )}`,
  );
});
