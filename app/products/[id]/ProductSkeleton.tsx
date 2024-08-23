import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "react-bootstrap";
const ProductSkeleton = () => {
  return (
    <Container>
      <div className={`max-lg:my-4 lg:my-32 lg:flex items-center gap-24`}>
      <Skeleton className="lg:hidden mb-3 h-6 w-24"></Skeleton>
        <div className="aspect-square flex-1 max-lg:mb-5">
          <Skeleton className="h-full w-full "></Skeleton>
        </div>
        <div className="flex-1">
          <Skeleton className="mb-3 h-6 w-40"></Skeleton>
          <Skeleton className="h-12 w-72"></Skeleton>
          <Skeleton className="mt-2 h-12 w-60"></Skeleton>
          <Skeleton className="mt-8 h-6 w-full"></Skeleton>
          <Skeleton className="my-2 h-6 w-full"></Skeleton>
          <Skeleton className="h-6 w-40"></Skeleton>
          <Skeleton className="mt-5 h-16 w-72"></Skeleton>
        </div>
      </div>
      <div className="lg:flex gap-10">
        <div className="flex-1">
          <Skeleton className="mb-3 h-8 w-48"></Skeleton>
          <Skeleton className="mb-3 h-32 w-full"></Skeleton>
          <Skeleton className="mb-3 h-32 w-full"></Skeleton>
        </div>
        <div className="max-lg:mt-16">
          <Skeleton className="mb-3 h-8 w-32"></Skeleton>
          <Skeleton className="mb-2 h-12 w-72"></Skeleton>
          <Skeleton className="my-2 h-12 w-72"></Skeleton>
          <Skeleton className="my-2 h-12 w-72"></Skeleton>
          <Skeleton className="my-2 h-12 w-72"></Skeleton>
          <Skeleton className="my-2 h-12 w-72"></Skeleton>
        </div>
      </div>
      <div className="my-16 lg:my-32 lg:grid aspect-video grid-cols-[40%_60%] grid-rows-2">
        <Skeleton className="max-lg:aspect-video mb-4"></Skeleton>
        <Skeleton className="max-lg:aspect-video row-span-2 lg:ms-4 max-lg:mb-5"></Skeleton>
        <Skeleton className="max-lg:aspect-square"></Skeleton>
      </div>
    </Container>
  );
};
export default ProductSkeleton;
