interface numberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  isLoading?: boolean;
}

const NumberInput = ({ value, min = 0, max = 100, onChange, isLoading = false }: numberInputProps) => {
  const handleAdd = () => {
    if (!isLoading) onChange(value + 1);
  };
  const handleSubtract = () => {
    if (!isLoading) onChange(value - 1);
  };
  return (
    <div className="flex max-w-[10rem] gap-2 bg-grey px-4 py-1">
      <button className="opacity-60 hover:text-accent" onClick={handleSubtract} disabled={value <= min}>
        -
      </button>
      <input value={value} onChange={(e) => onChange(parseInt(e.target.value))} disabled className="min-w-0 bg-inherit text-center font-semibold" type="number" />
      <button className="opacity-60 hover:text-accent" onClick={handleAdd} disabled={value >= max}>
        +
      </button>
    </div>
  );
};
export default NumberInput;
