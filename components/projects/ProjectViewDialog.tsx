import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Image from "next/image";

const ProjectViewDialog = ({
  fullImage,
  slug,
}: {
  fullImage: string;
  slug: string;
}) => {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <button
            className="h-42 w-42 flex items-center justify-center absolute top-1/2 left-1/2 -translate-1/2 rounded-full cursor-pointer duration-500 scale-90 group-hover:scale-120 text-sm gap-2 bg-[radial-gradient(circle,rgba(255,255,255,1)_65%,rgba(255,255,255,0.49)_68%)]"
            type="button"
          >
            <Eye className="w-4 h-4" />
            Full View
          </button>
        </DialogTrigger>
        <DialogContent className="w-full h-fit max-h-11/12! max-w-11/12!  overflow-auto bg-white border-none">
          <DialogHeader>
            <DialogTitle>Details</DialogTitle>
            <DialogDescription className="sr-only"></DialogDescription>
          </DialogHeader>
          <div className="bg-white relative top-0 p-0! rounded-2xl overflow-hidden w-full h-fit">
            {fullImage ? (
              <Image
                className="w-full"
                src={fullImage}
                alt={slug}
                width={500}
                height={500}
              />
            ) : (
              "No Image Found!"
            )}
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ProjectViewDialog;
