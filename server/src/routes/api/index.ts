import express, { Request, Response, NextFunction } from "express";
const router = express.Router();

// Include routes from the './emails' module under the '/email' route
router.use("/email", require("./emails"));

// Include routes from the './parsing' module under the '/parse' route
router.use("/parse", require("./parsing"));

// Include routes from the './users' module under the '/user' route
router.use("/user", require("./users"));

// Error handling middleware
router.use(function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "ValidationError") {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (
        errors: { [key: string]: string },
        key
      ) {
        errors[key] = err.errors[key].message;
        return errors;
      },
      {}),
    });
  }

  return next(err);
});

export = router;
