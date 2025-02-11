"use client";

type Props = {
  options: string[];
  selected: string | null;
  onSelect: (selected: string) => void;
  placeholder: string;
};
export default function Dropdown({
  onSelect,
  options,
  selected,
  placeholder,
}: Props) {
  return (
    <select
      className="font-poppins"
      onChange={(e) => onSelect(e.target.value)}
      style={{
        fontSize: "1rem",
        borderWidth: "1px",
        borderColor: "var(--primary)",
        borderRadius: "5px",
        height: "38px",
        color: "var(--primary)",
      }}
      title={`Select ${placeholder}`}
      value={selected ?? ""}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => {
        return (
          <option value={o} key={o}>
            {o}
          </option>
        );
      })}
    </select>
  );
}
