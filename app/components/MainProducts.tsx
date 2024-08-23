import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Button from "../util/components/Button";
const MainProducts = () => {
  return (
    <section className="my-24 lg:my-40">
      <Container>
        <div className="speaker-circles justify-evenly gap-5 rounded-lg bg-accent text-white max-md:p-10 md:flex md:pt-20">
          <div className="box-border pt-0">
            <Image className="w-full max-md:mx-auto max-md:max-w-[15rem]" src="/mainSpeaker.svg" alt="" height={100} width={400}></Image>
          </div>
          <div className="mt-4">
            <h2 className="text-700 max-md:text-center">
              ZX9
              <br />
              SPEAKER
            </h2>
            <p className="mt-4 max-w-[40ch] max-md:mx-auto max-md:text-center">Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.</p>
            <Button className="mt-5 max-md:mx-auto" role="secondary-dark" href="/products/66bf88e5b05d254fa9b49741">
              see product
            </Button>
          </div>
        </div>
        <div className="second-speaker my-4 overflow-clip rounded-lg max-lg:px-10 max-lg:pb-48 max-lg:pt-10 lg:my-10 lg:p-24">
          <h2 className="mb-3 lg:mb-5">ZX7 SPEAKER</h2>
          <Button role="secondary-light" href="/products/66bf89c3b05d254fa9b4980e">
            see product
          </Button>
        </div>
        <div className="gap-8 md:flex">
          <Image className="flex-1 rounded-lg max-md:w-full" src="/mainEarPhones.svg" alt="" width={100} height={100}></Image>
          <div className="grid flex-1 items-center rounded-lg bg-grey max-md:mt-5">
            <div className="m-5 lg:ms-24">
              <h2 className="max-lg:mb-3 lg:mb-5">YX1 EARPHONES</h2>
              <Button role="secondary-light" href="/products/66bf8c14b05d254fa9b4990f">
                see product
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
export default MainProducts;
