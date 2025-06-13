export default function Heading({ header, desc }) {
  return (
    <>
      <h2 className="text-lg sm:text-xl font-bold text-[#2D14A0] mb-2">
        {header}
      </h2>
      <p className="text-xs sm:text-sm text-[#686868] mb-4">{desc}</p>
    </>
  );
}
