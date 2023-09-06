import { Request, Response, Router } from "express";
import { getEmailContent } from "../../utils/Util";

const router = Router();

/**
 * Parses the email content provided in the request body and sends the parsed content.
 * @param req - Express Request object
 * @param res - Express Response object
 */
const emailParsing = async (req: Request, res: Response) => {
  const { emailContent } = req.body;

  try {
    const parsed = await getEmailContent(emailContent);
    res.send({ content: parsed, status: "ok" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// Define the route for parsing email content
router.post("/email", emailParsing);

module.exports = router;
