"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Loader, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message should be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitting(true);
    try {
      // Defensive: safeParse to prevent an uncaught ZodError from somewhere
      const parsed = contactSchema.safeParse(values);
      if (!parsed.success) {
        console.warn("Validation (safeParse) failed:", parsed.error);
        // optionally show UI feedback
        setSubmitting(false);
        return;
      }

      // Replace this with real submit (fetch to your API)
      await new Promise((r) => setTimeout(r, 600));
      console.log("Contact form submitted:", parsed.data);
      toast.success("Form Submited.", {
        description: "Thanks for your email.",
      });
      reset();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card
      className={cn(
        "relative border-4 p-0 border-white shadow-2xl shadow-zinc-400/20 rounded-4xl min-h-[270px] h-auto w-full bg-white overflow-hidden",
        "sm:col-span-2 mt-10"
      )}
    >
      <div className="p-6 ">
        <h1 className="text-full font-medium mb-10">Send Email:</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" grid grid-cols-1 gap-4 md:grid-cols-2"
          noValidate
        >
          <div className="col-span-1">
            <Label className="mb-2">Name</Label>
            <Input
              {...register("name")}
              placeholder="Your name"
              aria-invalid={errors.name ? "true" : "false"}
              className="py-6 rounded-full"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="col-span-1">
            <Label className="mb-2">Email</Label>
            <Input
              {...register("email")}
              placeholder="you@example.com"
              type="email"
              aria-invalid={errors.email ? "true" : "false"}
              className="py-6 rounded-full"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2">
            <Label className="mb-2">Message</Label>
            <Textarea
              {...register("message")}
              placeholder="Write your message"
              rows={6}
              className={cn(
                "w-full rounded-md border bg-transparent px-3 py-2 text-base outline-none",
                "file:text-foreground placeholder:text-muted-foreground border-input",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] rounded-2xl"
              )}
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-end">
            <Button
              className="px-6! py-6 rounded-full cursor-pointer bg-[#000000]"
              type="submit"
              disabled={submitting}
            >
              {submitting? <Loader className="animate animate-spin"/>:<Send />}
              {submitting ? "Sending..." : "Send message"}
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ContactForm;
