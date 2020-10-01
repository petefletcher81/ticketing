import express from "express";
// create a router to set up routes
const router = express.Router();

router.post("/api/users/signout", (req, res) => {
  res.send("Woo haa signout");
});

// export and rename --> going to have many routers so need to rename each
export { router as signoutRouter };
