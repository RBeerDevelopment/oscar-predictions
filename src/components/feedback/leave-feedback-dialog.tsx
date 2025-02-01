"use client";

import { FC, useState } from "react";
import { useUser } from "@clerk/nextjs";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Button } from "../ui/button";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { shareFeedback } from "@/db/actions/share-feedback";
import { useFormStatus } from "react-dom";

const formSchema = z.object({
  feedback: z.string().min(2),
  shareEmail: z.boolean(),
});

export const LeaveFeedbackDialog: FC = () => {
  const { pending } = useFormStatus();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { user } = useUser();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: "",
      shareEmail: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await shareFeedback(
      values.feedback,
      values.shareEmail ? user?.primaryEmailAddress?.emailAddress ?? null : null
    );
    setIsSubmitted(true);
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="text-white w-fit self-center text-sm">
          Leave Feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Leave Feedback</DialogTitle>
          <DialogDescription asChild>
            <div>
              This is a new project, I started because I could not find any good
              website to store your own oscar predictions and compare them with
              your friends.
              <br />
              <br />I would love to improve it for next year so if you have any
              feedback, please let me know. I would love to hear from you.
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8 mt-6"
                >
                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Feedback</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {Boolean(user?.id) ? (
                    <FormField
                      control={form.control}
                      name="shareEmail"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Share my email</FormLabel>
                            <FormDescription>
                              If you want me to get back to you, please share
                              your email address.
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  ) : null}
                  <Button
                    disabled={pending}
                    aria-disabled={pending}
                    onSubmit={form.handleSubmit(onSubmit)}
                    type="submit"
                  >
                    Send
                  </Button>
                </form>
              </Form>
              {isSubmitted && (
                <p className="text-xs pt-2">Thank you for your feedback!</p>
              )}
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
