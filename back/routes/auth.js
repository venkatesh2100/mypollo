import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import cookieParser from 'cookie-parser';
const prisma = new PrismaClient();
const { sign, verify } = jwt;
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const isPassValid = await bcrypt.compare(password, admin.password);
    if (!isPassValid) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    const token = sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    return res.json({ message: "Login successful" });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});
//HACK: verify the admin via dashboard. {works well}
router.get("/verify", (req, res) => {
  const token = req.cookies.token;
  console.log(req.cookies)
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    verify(token, process.env.JWT_SECRET);
    res.json({ message: "Valid token" });
  } catch {
    res.status(403).json({ message: "Token invalid" });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: "Logged out" });
});

export default router;
