import Image from "next/image"
import { Container } from "react-bootstrap"
const Story = () => {
  return (
    <Container>
      <section className="flex max-lg:flex-col-reverse items-center lg:gap-20">
        <div className="flex-1">
          <h2 className="text-600 max-lg:my-7 max-lg:text-center uppercase">
            Bringing you the
            <br />
            <span className="text-accent">best </span>
            audio gear
          </h2>
          <p className="lg:mt-4 max-lg:mx-auto max-lg:text-center max-w-[50ch] text-350 opacity-60">Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
        </div>
        <Image className="flex-1 max-lg:max-w-[30rem] w-full" src="/storyMan.svg" alt="" width={100} height={100}></Image>
      </section >
    </Container>
  )
}
export default Story