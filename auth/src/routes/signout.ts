import express, { Request, Response } from "express";
// create a router to set up routes
const router = express.Router();

router.post("/api/users/signout", (req: Request, res: Response) => {
  req.session = null;
  res.send({});
});

// export and rename --> going to have many routers so need to rename each
export { router as signoutRouter };
