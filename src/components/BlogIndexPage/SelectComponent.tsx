import { keyframes } from "@emotion/react";

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
        className="w-40 px-3  py-2  m-1 text-[15px] leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
        id={name}
        placeholder="select category"
        onChange={onChange}
        value={value}
        name={name}
        {...rest}

      >
        {options.map((option: { [key: string]: number|string }) =>{
          const entries = Object.entries(option)
          const [key, value] = entries[0];
          return (
          <option key={key} value={value}>
            {key}
          </option>
        )
})}
      </select>
    </div>
  );
};

export default SelectComponent;
