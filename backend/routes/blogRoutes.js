import express from "express";
const router = express.Router();
import {
  getBlogEntries,
  getBlogEntryById,
  createBlogEntry,
  updateBlogEntry,
  deleteBlogEntry,
  getBlogEntryBySlug, // <- import this
} from "../controllers/blogController.js";
import { protect } from "../middlewares/authMiddleware.js";
import upload from "../config/upload.js";

// List all blogs & create blog
router
  .route("/")
  .get(getBlogEntries)
  .post(protect, upload.single("imageUrl"), createBlogEntry);

// Blog by Slug (new)
router.route("/:slug").get(getBlogEntryBySlug);

// Blog by ID (update/delete)
router
  .route("/:id")
  .get(getBlogEntryById)
  .put(protect, upload.single("imageUrl"), updateBlogEntry)
  .delete(protect, deleteBlogEntry);

export default router;
