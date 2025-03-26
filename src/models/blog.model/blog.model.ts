import { Schema, model, models } from "mongoose";
import moment from "moment";

const blogSchema = new Schema(
  {
    title: {
      type: String,
    },
    content: {
      type: String,
    },
    author: {
      type: String,
    },
    authorImage: {
      type: String,
    },
    image: {
      type: String,
    },

    category: {
      type: String,
      enum: ["news", "technology", "business", "lifestyle"],
      default: "news",
    },

    slug: {
      type: String,
      lowercase: true,
    },
    createdAt: {
      type: String,
      default: moment().format("MMM Do YYYY"),
    },
  },
  {
    timestamps: true,
  }
);

const Blog = models.Blog || model("Blog", blogSchema);

export default Blog;
