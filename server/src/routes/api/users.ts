import { Request, Response, Router } from "express";
import {
  CreateUser,
  FindUser,
  LoginUser,
  LogoutUser,
  VerifyUser,
  isUserLoggedIn,
} from "../../service/user-service";
import { IUser } from "../../models/User";

const router = Router();

// Route to register a user
router.post("/register", async (req: Request, res: Response) => {
  const { ip, email } = req.body;

  try {
    const user = await CreateUser(ip, email);
    res.status(201).json({ user, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to verify a user
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

// Route to login a user
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

// Route to logout a user
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

// Parameter middleware to set 'ip' in the request
router.param("ip", async (req: Request, res: Response, next, ip) => {
  req.body.ip = ip;
  next();
});

// Route to check if a user is logged in
router.get("/check-login", async (req: Request, res: Response) => {
  const { ip } = req.query as { ip: string };

  try {
    const isLogged = await isUserLoggedIn(ip);
    if (isLogged === null) {
      return res.status(404).json({ error: "User not found", status: "error" });
    }
    res.status(200).json({ isLogged, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message, status: "error" });
  }
});

// Route to get user information
router.get("/me", async (req: Request, res: Response) => {
  const { ip } = req.query as { ip: string };

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

export = router;
