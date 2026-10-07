import Image from "next/image";
import ctaBackground from "@/assests/cta.webp";
import { Button, Heading, Paragraph } from "../ui";

export default function Cta() {
    return (
        <section id="contact" className="section">
            <div className="container">
                <div className="relative mx-auto flex w-full max-w-[1297px] items-center justify-center overflow-hidden rounded-[20px] px-5 py-16 text-center sm:py-20 md:py-[120px]">
                    <Image
                        src={ctaBackground}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="absolute inset-0 size-full object-cover"
                    />

                    <div className="relative z-10 mx-auto w-full max-w-[900px]">
                        <span data-reveal-step="badge" className="inline-flex rounded-full bg-[linear-gradient(124deg,var(--theme-hex-fcdbe5)_6.56%,var(--theme-hex-a06ef3)_93.44%)] px-[14px] py-[5px] font-sans text-[14px] font-normal uppercase leading-[21.7px] tracking-[0px] text-white shadow-[var(--shadow-badge)] backdrop-blur-[12px]">
                            Ready to grow your readership?
                        </span>

                        <Heading data-reveal-step="heading" className="my-5 max-w-[700px]">
                            Keep Readers Engaged Even When You&apos;re Offline
                        </Heading>

                        <Paragraph data-reveal-step="paragraph" className="mb-5 ">
                            AuthorBot answers questions, recommends the right books, and
                            guides readers toward their next purchase 24/7, even when you&apos;re offline.
                        </Paragraph>



                        <Button href="#contact" data-reveal-step="action">
                            Get In Touch
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
