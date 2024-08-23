import Container from "react-bootstrap/Container";
import { Skeleton } from "@/components/ui/skeleton";
const DashBoardSkeleton = () => {
  return (
    <Container>
      <section className="h-[calc(100dvh-5rem)]">
        <Skeleton className="my-10 h-[calc(100dvh-10rem)] w-full"></Skeleton>
      </section>
    </Container>
  );
}
export default DashBoardSkeleton