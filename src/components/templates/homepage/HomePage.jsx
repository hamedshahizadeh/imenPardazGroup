import TestimonialsSlider from "@/components/modules/homePage/ReviewsSection";
import Section1 from "@/components/modules/homePage/Section1";
import TopInfiniteSlider from "@/components/modules/homePage/Section2";
import Section3 from "@/components/modules/homePage/Section3";
import Section4 from "@/components/modules/homePage/Section4";
import Section5 from "@/components/modules/homePage/Section5";
import Section6 from "@/components/modules/homePage/Section6";

export default function HomePage() {
  return (
    <div className="bg-gray-950 font-sans">
      <Section1 />
      <TopInfiniteSlider />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <TestimonialsSlider />
    </div>
  );
}
