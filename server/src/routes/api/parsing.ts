import { Request, Response } from "express";
import express from "express";
import { getEmailContent } from "../../utils/Util";
const router = express.Router();

const emailParsing = async (req: Request, res: Response) => {
  const { emailContent } = req.body;

  try {
    const parsed = await getEmailContent(emailContent);
    res.send({ content: parsed, status: "ok" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

router.post("/email", emailParsing);

module.exports = router;
