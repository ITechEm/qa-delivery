export default function SectionHeaders({subHeader,mainHeader}) {
  return (
    <>
      <p className="uppercase  font-semibold leading-4">
        {subHeader}
      </p>
      <h2 className="text-4xl neucha bold">
        {mainHeader}
      </h2>
    </>
  );
}