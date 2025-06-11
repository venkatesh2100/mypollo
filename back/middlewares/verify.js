
import jwt from "jsonwebtoken";
//MIDDware
export function verifyAdmin(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Un Auth User" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "codered");
    req.admin = decoded;
    next();
  } catch (err) {
    console.log(err)
    return res.status(403).json({ message: "Invalid token" });
  }
}
