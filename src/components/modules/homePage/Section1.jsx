import Image from 'next/image';
import AnimatedBackground from './bgsec1';
import Link from 'next/link';

export default function Section1() {
  return (
    <div className='relative'>
      <AnimatedBackground />

      <div className='container pb-5 pt-10 lg:py-5 lg:min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center text-white relative z-10 bg-black/30 backdrop-blur-[3px]'>
     <div>
  <div className="max-w-4xl mx-auto  py-10  text-white mt-10">
    <h1 className="text-base md:text-xl font-sans font-black mb-3">
      مدیریت هوشمند سازمان (<span className="text-[#49C5B6]">ایمن پرداز</span>)
    </h1>

    <h2 className="text-sm md:text-base font-bold text-[#49C5B6] mb-3">
      یکپارچه، هوشمند و مدرن
    </h2>

    <p className="text-gray-200 text-xs md:text-sm leading-relaxed font-medium text-justify">
      سیستم‌های مدیریت هوشمند سازمان با تمرکز بر <span className="text-[#49C5B6] font-medium">یکپارچگی فرآیندهای کاری</span>, 
      امکان مدیریت بهینه منابع انسانی، مالی و نرم‌افزاری را در یک پلتفرم فراهم می‌آورند. 
      با استفاده از این سیستم‌ها، سازمان‌ها می‌توانند تصمیم‌گیری سریع‌تر، هزینه‌های کمتر 
      و کارایی بالاتر را تجربه کنند.
    </p>

    <p className="text-gray-200 text-xs md:text-sm leading-relaxed mt-2 md:mt-3 lg:mt-4 font-sans font-medium text-justify">
      این رویکرد باعث می‌شود که تمام واحدها و فرآیندها <span className=" font-medium">هماهنگ</span> عمل کنند و 
      تبادل اطلاعات به صورت امن و سریع انجام شود. بدین ترتیب سازمان‌ها 
      به سطحی جدید از بهره‌وری و کنترل دست پیدا می‌کنند.
    </p>

    {/* دکمه بیشتر بدانید */}
    <div className="mt-8">
      <Link
        href="/learn-more"
        className="inline-flex items-center justify-center px-3 md:px-4 lg:px-6 py-2 lg:py-3
        text-xs 
                   bg-[#0CA59D] text-white font-semibold rounded-full 
                   shadow-lg hover:bg-green-400 hover:scale-105 
                   transition transform duration-300"
      >
        بیشتر بدانید
      </Link>
    </div>
  </div>
</div>

<div className='hidden lg:flex items-center gap-3 justify-center'>
  <Image
    src="/images/i2.png"
    width={400}
    height={400}
    priority
    className='w-56 h-56 lg:h-96 animate-float'
    alt='ایمن پرداز بنر'
  />
   <Image
    src="/images/i3.png"
    width={400}
    height={400}
    priority
    className='w-56 h-56 lg:h-96 animate-float'
    alt='ایمن پرداز بنر'
  />
</div>

      </div>
    </div>
  )
}
