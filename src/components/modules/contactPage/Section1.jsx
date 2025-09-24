import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import AnimatedBackground from "../homePage/bgsec1";

export default function Section1() {
  return (
    <div className="relative">
      <AnimatedBackground />

      <div className="container pb-5 pt-10 lg:py-5 lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center text-white relative z-10 bg-black/30 backdrop-blur-[3px]">
        <div>
          <div className="mx-auto px-2 py-10  text-white mt-10 space-y-2 lg:space-y-3">
            <h1 className="text-sm md:text-base font-sans font-black mb-3">
              تماس با ما
            </h1>

            <div className="flex items-start flex-wrap gap-2">
              <FaPhoneAlt className="text-[#49C5B6]  text-sm" />
              <span className="text-sm">شماره تماس : </span>
              <span className="text-xs">۰۴۵۳۳۲۳۱۸۳۶</span>
            </div>

            <div className="flex flex-wrap items-start gap-3">
              <FaEnvelope className="text-[#49C5B6]  text-sm" />
              <span className=" text-sm"> پست الکترونیکی : </span>

              <span className="text-xs">info@imenpardazgroup.ir</span>
            </div>

            <div className="flex flex-wrap  gap-2 items-start">
              <div className="flex gap-1 items-center">
                <FaMapMarkerAlt className="text-[#49C5B6]  text-sm" />
                <span className=" text-sm whitespace-nowrap"> آدرس : </span>
              </div>

              <span className="text-xs">
                اردبیل، میدان شریعتی، ساختمان الماس شهر، طبقه ششم واحد 2
              </span>
            </div>

            <div className="flex  gap-2 items-start flex-wrap">
              <div className="flex gap-1 items-center">
                <FaMapMarkerAlt className="text-[#49C5B6]  text-sm" />
                <span className=" text-sm whitespace-nowrap"> آدرس : </span>
              </div>

              <span className="text-xs">
                ردبیل - میدان باکری - پارک علم و فناوری
              </span>
            </div>
          </div>
        </div>

        <div className="">
          <div className="w-full h-96 rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.562819809878!2d48.29083!3d38.24139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x401fea691b1c3d2d%3A0x8a3e02f6a6d1f9ff!2z2YXZhti32YfYp9mE2Ycg2KfZhNiq2YjZhtiv2KfYjCDYp9mE2KfZhNis2YbZitiz2KfZhNip!5e0!3m2!1sen!2s!4v1694449500000!5m2!1sen!2s"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="border-0"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
