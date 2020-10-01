import express from "express";
// create a router to set up routes
const router = express.Router();

router.post("/api/users/signup", (req, res) => {
  res.send("Woo haa");
});

// export and rename --> going to have many routers so need to rename each
export { router as signupRouter };
