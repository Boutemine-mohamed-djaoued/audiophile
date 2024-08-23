"use client";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useMutation } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import { useUserDataContext } from "../context/userContext";

const AddBalance = () => {
  const [amount, setAmount] = useState(0);
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const { user, setUser } = useUserDataContext();
  const { mutate } = useMutation(
    async (data: { amount: number }) => {
      await axios.post("/api/user/addBalance", data);
    },
    {
      onSuccess: () => {
        toast({
          description: "Balance Added Successfully",
        });
        setOpen(false);
        if (user) setUser({ ...user, balance: user.balance + amount });
      },
      onError: (error: any) => {
        toast({
          description: error.response.data,
          variant: "destructive",
        });
      },
    }
  );
  const addBalance = (e: any) => {
    e.preventDefault();
    mutate({ amount });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <IoAddCircle className="hover:text-accent" size={20}></IoAddCircle>
      </DialogTrigger>
      <DialogContent className="max-md:max-w-[calc(100%-2.5rem)] rounded-md">
        <DialogHeader>
          <DialogTitle>Not Enought Balace?</DialogTitle>
          <DialogDescription>feel free to add as much as you like</DialogDescription>
        </DialogHeader>
        <div className="flex gap-3">
          <input value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} className="form-input" type="number" min={0} max={10000000} />
          <button onClick={addBalance} className="bg-accent text-white rounded-md px-4">
            Add
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddBalance;
