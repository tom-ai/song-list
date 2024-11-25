export default function SearchBox({
  value,
  onChange,
}: {
  value: string;
  onChange: (e: string) => void;
}) {
  return (
    <input
      type="search"
      name="search"
      placeholder="Search repertoire"
      aria-label="Search"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
