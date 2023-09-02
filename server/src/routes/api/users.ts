import express from "express";
import { Request, Response, NextFunction } from "express";
const router = express.Router();

const users = [
  {
    id: 1,
    name: "John Doe",
    ip: "127.0.0.1",
    role: "admin",
  },
];

router.get(
  "/users",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    res.send(users);
  }
);

router.param("id", (req, res, next, id) => {
  req.body.id = id;
  next();
});

router.get(
  "/user/:id",
  auth.optional,
  function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.body;
    const user = users.find((item) => item.id === parseInt(id));
    res.send(user);
  }
);
