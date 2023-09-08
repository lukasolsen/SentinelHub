import { Request, Response, Router } from "express";
import { CreateUser, FindUser, VerifyUser } from "../../service/user-service";
import { IUser } from "../../models/User";

const router = Router();

// Parameter middleware to set 'ip' in the request
router.param("ip", async (req: Request, res: Response, next, ip) => {
  req.body.ip = ip;
  next();
});

// Route to create a new user
router.post("/user", async (req: Request, res: Response) => {
  const { ip, email, token } = req.body as {
    ip: string;
    email: string;
    token: string;
  };

  try {
    //verify token
    const Tuser: IUser = await VerifyUser(token);
    if (!Tuser) {
      return res.status(404).json({ error: "No permissions", status: "error" });
    }

    const user: IUser = await CreateUser(ip, email);
    res.status(201).json({ user, status: "ok" });
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
      return res.status(401).json({ error: "User not found", status: "error" });
    }
    res.status(200).json({ user, status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message, status: "error" });
  }
});

export = router;
