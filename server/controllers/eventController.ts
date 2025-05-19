import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getAllEvents = async (req: Request, res: Response) => {
  const events = await prisma.event.findMany({
    orderBy: { dateTime: 'asc' },
  });
  res.json(events);
};

export const createEvent = async (req: Request, res: Response) => {
  const { title, description, dateTime, totalSeats, seatsBooked, ticketPrice, ticketsSold } = req.body;
  const event = await prisma.event.create({
    data: { title, description, dateTime: new Date(dateTime), totalSeats, seatsBooked, ticketPrice, ticketsSold },
  });
  res.status(201).json(event);
};

export const getUniqueEvent = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const event = await prisma.event.findUnique({
    where: { id: parseInt(id, 10) },
  });
  if (!event) {
    res.status(404).json({ error: 'Event not found' });
    return;
  }
  res.json(event);
};