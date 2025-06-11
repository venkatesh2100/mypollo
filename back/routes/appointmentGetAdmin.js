import express from "express"
import { PrismaClient } from "@prisma/client"
import { verifyAdmin } from "../middlewares/verify.js"

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', verifyAdmin, async (req, res) => {
  //HACK: Try to get the Oldest First order.
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'asc' },
    });
    res.json(appointments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

//HACK: NOw update the appointment.
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { stats, notes, review } = req.body;
  console.log(id)
  if (!stats && !notes && !review) {
    return res.status(400).json({ error: "No update given" })
  }

  try {
    const updated = await prisma.appointment.update({
      where: { id },
      data: {
        ...(stats && { stats }),
        ...(notes && { notes }),
        ...(review && { review }),
      }
    })
    res.json({ success: true, appointment: updated });
  } catch (e) {
    console.log(e);
    res.status(500).josn({ error: "Failed to Update" })
  }
})

//HACK: New route for admin Content
router.get('/stats', async (req, res) => {
  try {
    const paidUsers = await prisma.appointment.count({
      where: { paid: "YES" }
    });
    const NewAppointments = await prisma.appointment.count({
      where: { stats: "NEW" }
    });
    const CompletedAppointments = await prisma.appointment.count({
      where: { stats: "COMPLETED" }
    });
    const FailedAppointments = await prisma.appointment.count({
      where: { stats: "CANCELLED" }
    });
    const totalAppointments = await prisma.appointment.count();

    const departments = await prisma.appointment.findMany({
      distinct: ['deparment'],
      select: { deparment: true }
    });

    res.json({
      paidUsers,
      CompletedAppointments,
      FailedAppointments,
      totalAppointments,
      NewAppointments,
      departments: departments.map(d => d.deparment)
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load statistics' });
  }
});

export default router;
