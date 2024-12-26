import { Request, Response, NextFunction } from "express";

export const verifyAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const userRole = req.headers["user-role"]; // Assuming user role is passed in headers

  if (userRole !== "admin") {
    res.status(403).json({ message: "Access denied. Admins only." });
    return; // Ensure the function ends here
  }

  next(); // Call the next middleware if the user is an admin
};
