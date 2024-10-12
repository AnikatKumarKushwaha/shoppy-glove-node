import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  //we split and get the token part
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });

  try {
    const decoded = jwt.verify(token, "firstJwtAuthPractice");

    //storing decoded payload to req.user
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
