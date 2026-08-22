import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";

const Highlights = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  useGSAP(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#highlights",
        start: isMobile ? "bottom bottom" : "top center",
        scrub: 1,
      },
    });

    timeline.to([".left-column", ".right-column"], {
      y: 0,
      opacity: 1,
      stagger: 0.5,
      duration: 1,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <section id="highlights">
      <h2>There's never been a better time to upgrade</h2>
      <h3>Here's what you get with the new MacBook Pro.</h3>

      <div className="masonry">
        <div className="left-column">
          <div className="first-highlight">
            <img className="z-10" src="/laptop.png" alt="Laptop" />
            <p className="z-10">
              Fly through demanding tasks up to 9.8x faster.
            </p>
            <div className="bg-black/50 w-full h-full absolute inset-0 -z-1"></div>
            <img
              src="/highlight-bg.png"
              alt="Highlight Background"
              className="w-full absolute inset-0 -z-10"
            />
          </div>
          <div>
            <img src="/sun.png" alt="Sun" />
            <p>
              A stunning Liquid Retina XDR <br /> display.
            </p>
          </div>
        </div>
        <div className="right-column">
          <div className="apple-gradient">
            <img src="/ai.png" alt="AI" />
            <p>
              Built for <br /> <span>Apple Intelligence</span>
            </p>
          </div>
          <div>
            <img src="/battery.png" alt="Battery" />
            <p>
              Up to <span className="green-gradient"> 14 more hours</span>{" "}
              battery life.{" "}
              <span className="text-dark-100">(Up to 24 hours total.)</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
