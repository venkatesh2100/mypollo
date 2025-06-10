import { z } from 'zod'
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();
//HACK: Before going to enter the DB ZOD check imp 

const appSchmea = z.object({
  name: z.string().min(1, "Name req"),
  email: z.string().email("Invalid Email"),
  phone: z.string().regex(/^\d{10}$/, "Must 10 digit"),
  department: z.string().min(1, "Deap req"),
  date: z.string().refine((d) => !isNaN(Date.parse(d))),
  time: z.string().min(1, "slot req"),
  message: z.string().optional()
});
router.post('/', async (req, res) => {

  const parsed = appSchmea.safeParse(req.body);
  if (!parsed.success) {
    const error = parsed.error.flatten().fieldErrors;
    console.log(error)
    return res.status(400).json({ error: "Failed ZOD" })
  }
  const { name, email, phone, department, date, time, message } = parsed.data;
  try {
    const appointment = await prisma.appointment.create({
      data: {
        name: name,
        email: email,
        phonenumber: phone,
        deparment: department,
        date: new Date(date),
        time: time,
        message: message
      }
    });

    return res.status(201).json({ success: true, appointment });
  } catch (error) {
    console.error('Appointment creation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
