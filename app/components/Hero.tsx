import Image from "next/image";
import Container from "react-bootstrap/Container";
import Button from "../util/components/Button";
const Hero = () => {
  return (
    <section className="bg-off-black">
      <Container className="flex flex-col justify-center overflow-clip border-t-[2px] border-[#333] max-lg:min-h-[calc(100svh-3rem)] lg:min-h-[calc(100svh-4rem)]">
        <div className="grid h-full items-center gap-[2rem] max-lg:mb-24 lg:grid-cols-[40%_60%] xl:gap-[5rem]">
          <div className="max-lg:z-10 max-lg:col-start-1 max-lg:row-start-1">
            <p className="text-350 tracking-[4px] text-white opacity-40 max-lg:text-center lg:tracking-[10px]">NEW PRODUCT</p>
            <h1 className="text-700 uppercase text-white max-lg:text-center lg:my-4 xl:text-800">
              XX99 Mark II
              <br />
              Headphones
            </h1>
            <p className="max-w-[40ch] text-350 text-white opacity-70 max-lg:mx-auto max-lg:text-center">Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.</p>
            <Button className="mt-4 max-lg:mx-auto lg:mt-5" href="/products/66c382c778fc3cc177ae49e3">
              SEE PRODUCT
            </Button>
          </div>
          <Image className="h-full w-full max-lg:col-start-1 max-lg:row-start-1 max-lg:mx-auto max-lg:max-w-[30rem] max-lg:scale-150 max-lg:opacity-50 lg:w-[calc(100%-5rem)]" src="/heroHeadSet.svg" width={300} height={300} alt=""></Image>
        </div>
      </Container>
    </section>
  );
};
export default Hero;
