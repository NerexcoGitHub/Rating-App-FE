const SelectComponent = (props: {
  [x: string]: any;
  options: any;
  onChange: any;
  value: any;
  label: any;
  name: any;
  className: any;
}) => {
  const { options, onChange, value, label, name, className, ...rest } = props;
  return (
    <div className="m-2">
      <label
        className="block mb-2 text-sm font-bold text-gray-700"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        className="w-full px-6 py-3 m-1 text-md leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id={name}
        placeholder="select category"
        onChange={onChange}
        value={value}
        name={name}
        {...rest}
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
