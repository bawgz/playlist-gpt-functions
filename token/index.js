import { http } from "@google-cloud/functions-framework";
import axios from "axios";

http("token", async (req, res) => {
  try {
    console.log("------------------------------------");
    console.log(req.body);
    console.log("------------------------------------");
    const result = await axios.post(
      "https://accounts.spotify.com/api/token",
      req.body,
      {
        headers: {
          Authorization: req.headers.authorization,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    console.log(result);
    res.send(result.data);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});
