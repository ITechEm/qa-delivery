export default function SectionHeaders({subHeader,mainHeader,menuHeader}) {
  return (
    <>
      <p className="uppercase  font-semibold leading-4">
        {subHeader}
      </p>
      <h2 className="text-4xl neucha bold">
        {mainHeader}
      </h2>
      <h2 className="text-4xl neucha bold">
        {menuHeader}
      </h2>
    </>
  );
}