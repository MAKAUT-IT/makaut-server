import { Request, Response } from "express";
import Announcement from "../models/Announcement";

export const getAnnouncements = async (req: Request, res: Response) => {
  try {
    const announcements = await Announcement.find({}).sort({ date: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createAnnouncement = async (req: Request, res: Response) => {
  const { title, content, type } = req.body;

  try {
    const announcement = await Announcement.create({
      title,
      content,
      type,
    });
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAnnouncement = async (req: Request, res: Response) => {
  const { title, content, type } = req.body;

  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      announcement.title = title || announcement.title;
      announcement.content = content || announcement.content;
      announcement.type = type || announcement.type;

      const updatedAnnouncement = await announcement.save();
      res.json(updatedAnnouncement);
    } else {
      res.status(404).json({ message: "Announcement not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      await announcement.deleteOne();
      res.json({ message: "Announcement removed" });
    } else {
      res.status(404).json({ message: "Announcement not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
