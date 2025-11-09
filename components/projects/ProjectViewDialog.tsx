import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Image from "next/image";

const ProjectViewDialog = ({
  thumbnail,
  slug,
}: {
  thumbnail: string;
  slug: string;
}) => {
  console.log(thumbnail);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button
            className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full cursor-pointer duration-500 scale-90 group-hover:scale-120"
            variant={"secondary"}
          >
            <Eye />
            Full View
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full h-full max-h-11/12! max-w-11/12!">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="px-1 w-full h-full flex justify-center items-center over">
            <Image
              className="w-full"
              src={thumbnail}
              alt={slug}
              width={500}
              height={500}
            />
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default ProjectViewDialog;
