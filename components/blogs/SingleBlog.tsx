import Link from "next/link";
import Image from "next/image";
import { BlogType } from "@/types/types";

const SingleBlog = ({ blog }: { blog: BlogType }) => {
  return (
    <Link
      href={blog?.slug ? `/blog/${blog.slug}` : "#"}
      className="group block h-full w-full"
    >
      <div className="border border-border rounded-3xl overflow-hidden hover:shadow-lg transition-shadow duration-300 p-2">
        {/* Image */}
        <div className="relative w-full h-[200px] rounded-xl overflow-hidden  bg-gray-100">
          <Image
            src={blog?.image}
            alt={blog?.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="py-6 px-1">
          <h3 className="text-lg leading-5 font-semibold mb-2 group-hover:text-primary transition-colors">
            {blog?.title}
          </h3>
          <p className="text-sm text-muted-foreground">{blog?.category}</p>
        </div>
      </div>
    </Link>
  );
};

export default SingleBlog;
