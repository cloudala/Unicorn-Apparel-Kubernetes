import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function Dropdown({ value, onChange, options }) {
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    onChange(selectedValue);
  };

  return (
    <div>
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{ 'aria-label': 'Without label' }}
        className='h-10'
        displayEmpty
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.value}>
            {option.userValue}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
}
