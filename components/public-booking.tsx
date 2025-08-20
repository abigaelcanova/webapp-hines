"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface PublicBookingButtonProps {
  label?: string;
  spaceName: string;
  className?: string;
}

export function PublicBookingButton({
  label = "Book now",
  spaceName,
  className = "",
}: PublicBookingButtonProps) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={className}>{label}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {submitted ? "Request sent" : `Request to book ${spaceName}`}
          </DialogTitle>
        </DialogHeader>
        {!submitted ? (
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid gap-2">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" placeholder="Jane Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Preferred date</Label>
              <Input id="date" type="date" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" placeholder="Tell us about your event..." />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="bg-[#BF1231] hover:bg-[#9f0e28] text-white"
              >
                Submit request
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="grid gap-4">
            <p className="text-sm text-gray-700">
              Thanks! Our team will reach out shortly to confirm availability
              for {spaceName}. If you need anything else, you can also contact
              us from the Contact page.
            </p>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
