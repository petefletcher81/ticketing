import express from "express";

import { currentUser } from "../middlewares/current-user";
// create a router to set up routes
const router = express.Router();

router.get("/api/users/currentuser", currentUser, (req, res) => {
  // we put in the or null so that the use is never comes back as undefined
  res.send({ currentUser: req.currentUser || null });
});

// export and rename --> going to have many routers so need to rename each
export { router as currentUserRouter };
