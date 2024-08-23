import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "react-bootstrap";
const OneProduct = ({ index }: { index: number }) => {
  return (
    <div className={`my-16 lg:my-32 lg:flex items-center gap-24 ${index % 2 == 1 ? "flex-row-reverse" : null}`}>
      <div className="aspect-square flex-1 max-lg:mb-5">
        <Skeleton className="h-full w-full"></Skeleton>
      </div>
      <div className="flex-1">
        <Skeleton className="max-lg:mx-auto mb-3 h-6 w-40"></Skeleton>
        <Skeleton className="max-lg:mx-auto h-12 w-72"></Skeleton>
        <Skeleton className="max-lg:mx-auto mt-2 h-12 w-60"></Skeleton>
        <Skeleton className="max-lg:mx-auto mt-8 h-6 w-full"></Skeleton>
        <Skeleton className="max-lg:mx-auto my-2 h-6 w-full"></Skeleton>
        <Skeleton className="max-lg:mx-auto h-6 w-40"></Skeleton>
        <Skeleton className="max-lg:mx-auto mt-5 h-16 w-72"></Skeleton>
      </div>
    </div>
  );
};

const ProductsSkeleton = () => {
  return (
    <Container>
      <section>
        {[1, 2, 3].map((_, index) => {
          return <OneProduct key={index} index={index}></OneProduct>;
        })}
      </section>
    </Container>
  );
};
export default ProductsSkeleton;
