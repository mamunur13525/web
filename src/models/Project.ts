import mongoose, { Schema, Document } from "mongoose";

export interface IProjectImage {
  full: string;
  preview: string;
}

export interface IProject extends Document {
  title: string;
  icon: string;
  date: Date;
  short_description: string;
  description: string;
  live_preview: string;
  github_link: string;
  image: IProjectImage;
  technologies: string[];
  /**
   * Manual display position. Lower values appear first on the site; new
   * documents default to `0` so they sit at the top until reordered from
   * the admin panel.
   */
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectImageSchema = new Schema<IProjectImage>(
  {
    full: {
      type: String,
      default: "",
      trim: true,
    },
    preview: {
      type: String,
      default: "",
      trim: true,
    },
  },
  { _id: false }
);

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    icon: {
      type: String,
      default: "",
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    short_description: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    live_preview: {
      type: String,
      default: "",
      trim: true,
    },
    github_link: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: ProjectImageSchema,
      default: () => ({ full: "", preview: "" }),
    },
    technologies: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for faster queries
ProjectSchema.index({ order: 1, date: -1 });
ProjectSchema.index({ technologies: 1 });

export default mongoose.models.Project ||
  mongoose.model<IProject>("Project", ProjectSchema, "projects");
