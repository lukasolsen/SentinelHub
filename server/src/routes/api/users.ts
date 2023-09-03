import { Request, Response } from "express";
import express from "express";
import {
  CreateUser,
  FindUser,
  LoginUser,
  LogoutUser,
  VerifyUser,
  isUserLoggedIn,
} from "../../service/user-service";
import { IUser } from "../../models/User";
const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
  const { ip, email } = req.body;

  try {
    const user = await CreateUser(ip, email);
    res.status(201).json({ user, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/verify", async (req: Request, res: Response) => {
  const { ip, email } = req.body;

  try {
    const user = await VerifyUser(ip, email);
    if (!user) {
      return res.status(404).json({ error: "User not found", status: "error" });
    }
    res.status(200).json({ user, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { ip } = req.body;

  try {
    const user = await LoginUser(ip);
    if (!user) {
      return res.status(404).json({ error: "User not found", status: "error" });
    }
    res.status(200).json({ user, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message, status: "error" });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  const { ip } = req.body;

  try {
    const user = await LogoutUser(ip);
    if (!user) {
      return res.status(404).json({ error: "User not found", status: "error" });
    }
    res.status(200).json({ user, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message, status: "error" });
  }
});

router.param("ip", async (req: Request, res: Response, next, ip) => {
  res.body.ip = ip;
  next();
});

router.get("/check-login", async (req: Request, res: Response) => {
  const { ip } = req.query;
  console.log(ip);

  try {
    const isLogged = await isUserLoggedIn(ip);
    if (isLogged === null) {
      return res.status(404).json({ error: "User not found", status: "error" });
    }
    console.log(isLogged);
    res.status(200).json({ isLogged, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message, status: "error" });
  }
});

router.get("/me", async (req: Request, res: Response) => {
  const { ip } = req.query;
  console.log(ip);

  try {
    const user: IUser = await FindUser(ip);
    if (!user) {
      return res.status(404).json({ error: "User not found", status: "error" });
    }
    res.status(200).json({ user, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message, status: "error" });
  }
});

module.exports = router;
