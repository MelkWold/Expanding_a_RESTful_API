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
    });

// Get comments with Id
router
.route("/:id")
.get((req, res, next) => {
    const id = parseInt(req.params.id);
    
    const comment = comments.find(comment => comment.id == id);
    
    if (comment) res.json(comment); 
    
    else next();

})
.patch((req, res, next) => {
    const id = req.params.id;
    const data = req.body;
    const comment = comments.find((comment, i) => {
      if (comment.id == id) {
        for (const item in data) {
          // in the posts array grab the post that the client wants to change
          comments[i][item] = data[item]; // make the change
        }
        return true;
      }
        });
        // send a response
        if (comment) {
            res.json(comments);
        } else next();
})

.delete((req, res, next) => {
    const id = req.params.id;
    const comment = comments.find((comment, i) => {
      if (comment.id == id) {
        comments.splice(i, 1); // remove the post at index i
        return true;
      }
    });

    // send the client a response
    if (comment) {
      res.json(comments);
    } else next();
});

export default router;