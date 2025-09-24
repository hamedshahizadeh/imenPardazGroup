import cards from "@/data/datas";
import { FaSearch } from "react-icons/fa";
import Card from "@/components/modules/card/Card";

export default async function SearchPage(props) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const results = cards.filter((card) =>
    card.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="bg-gray-950 min-h-screen pt-24 pb-10">
      <div className=" container">
        <h1 className="text-white font-bold text-sm lg:text-base mb-6 flex items-center gap-2">
          <FaSearch className="text-[#49C5B6]" />
          نتایج جستجو برای: <span className="text-[#49C5B6]">{query}</span>
        </h1>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((item) => (
              <Card key={item.id} {...item} />
            ))}
          </div>
        ) : (
          <p className="text-white text-sm bg-[#49C5B6] py-3 px-3 rounded-md">
            نتیجه‌ای یافت نشد.
          </p>
        )}
      </div>
    </div>
  );
}
