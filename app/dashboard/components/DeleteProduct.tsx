import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";
import { useMutation } from "react-query";
interface DeleteProductProps {
  productId: string;
}
const DeleteProduct = ({ productId }: DeleteProductProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { isLoading, mutate } = useMutation(
    "deleteProduct",
    async () => {
      const response = await axios.delete(`/api/product/${productId}`);
      return response.data;
    },
    {
      onSuccess: () => {
        toast({
          description: "Product deleted successfully",
        });
        setOpen(false);
      },
      onError: (error) => {
        setOpen(false);
        toast({
          description: "Failed delete product",
          variant: "destructive",
        });
      },
    }
  );
  const handleDelete = () => {
    mutate();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>delete</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-left text-[#EA5555]">Delete Product</DialogTitle>
          <div className="flex items-center">
            <DialogDescription className="m-0 text-left">Are you sure you want to delete this product because this action cannot be reversed.</DialogDescription>
            <button className="rounded-md bg-[#EA5555] p-2 text-white hover:opacity-50" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default DeleteProduct;
