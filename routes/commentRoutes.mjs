import express from "express";
import { comments } from "../data/comments.mjs";

const router = express();

router
.route("/")
.get((req, res) => {
    res.json(comments)
})
.post((req, res) => {
    // Get the content (userId, postId and body from the request)
        const { userId, postId, body} = req.body;
        let id = comments[comments.length - 1].id + 1;
    // create a post by initializing an id
    if (userId && postId && body) {
        const comment = {
          id: id,
          userId: userId,
          postId: postId,
          body: body,
        };
        comments.push(comment);
        res.json(comments[comments.length - 1]);
      } else {
        res.json({ error: "Insufficient Data" });
      }
    })



export default router;