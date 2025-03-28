import { Schema, model, models } from "mongoose";
import slugify from "slugify";

interface ICategory {
  name: string;
  slug: string;
  description: string;
  image: string;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
  },
  {
    timestamps: true,
  }
);

categorySchema.pre("save", async function (next) {
  if (this.isModified("name")) {
    this.slug = slugify(this.name).toLocaleLowerCase();
  }
  next();
});

const Category = models.Category || model("Category", categorySchema);

export default Category;
