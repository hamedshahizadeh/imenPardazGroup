import { FaInstagram, FaTelegram, FaLinkedin, FaFacebook, FaMapMarkerAlt, FaEnvelope, FaPhone, FaFax } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-xs font-sans border-t border-gray-800 ">
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h4 className="text-[#49C5B6] font-semibold mb-2 text-sm">آدرس</h4>
          <p className="flex items-start gap-2">
            <FaMapMarkerAlt className="text-[hsl(173,52%,53%)] mt-0.5" />
            اردبیل، میدان شریعتی، ساختمان الماس شهر، طبقه ششم واحد 2
          </p>
          <p className="flex items-start gap-2 mt-1">
            <FaMapMarkerAlt className="text-[#49C5B6] mt-0.5" />
            اردبیل - میدان باکری - پارک علم و فناوری
          </p>
        </div>

        <div>
          <h4 className="text-[#49C5B6] font-semibold mb-2 text-sm">تماس با ما</h4>
          <p className="flex items-center gap-2">
            <FaEnvelope className="text-[#49C5B6]" />
            <a href="mailto:info@imenpardazgroup.ir" className="hover:text-[#31ccba]">
              info@imenpardazgroup.ir
            </a>
          </p>
          <p className="flex items-center gap-2 mt-1">
            <FaPhone className="text-[#49C5B6]" />
            <a href="tel:04533231836" className="hover:text-[#31ccba]">
              04533231836
            </a>
          </p>
          <p className="flex items-center gap-2 mt-1">
            <FaFax className="text-[#49C5B6]" />
            <a href="tel:04533231836" className="hover:text-[#31ccba]">
              04533231836
            </a>
          </p>
        </div>

    
        <div>
          <h4 className="text-[#49C5B6] font-semibold mb-2 text-sm">ما را در فضای مجازی دنبال کنید</h4>
          <div className="flex gap-4 text-lg">
            <a href="#" className="hover:text-[#31ccba]"><FaInstagram /></a>
            <a href="#" className="hover:text-[#31ccba]"><FaTelegram /></a>
            <a href="#" className="hover:text-[#31ccba]"><FaLinkedin /></a>
            <a href="#" className="hover:text-[#31ccba]"><FaFacebook /></a>
          </div>
        </div>
      </div>

      {/* کپی‌رایت */}
      <div className="border-t border-gray-800 text-center py-3 text-[11px] text-gray-400">
        © {new Date().getFullYear()} شرکت ایمن پرداز اردبیل. کلیه حقوق محفوظ است.
      </div>
    </footer>
  );
}
