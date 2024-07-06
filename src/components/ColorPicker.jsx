import { COLOR } from '../theme/constants.js';
import { Menu, MenuItem } from './Menu/Menu.jsx';

const ColorPicker = ({label, value, onChange,  includeGrays = false, includeColors = true }) => {
  const getColors = () => {
    const colors = Object.values(COLOR);
    if (includeColors && includeGrays) return colors;

    const isGray = color => color === COLOR.STONE || color === COLOR.MOSS || color === COLOR.NEUTRAL || color === COLOR.SLATE || color === COLOR.ZINC || color === COLOR.COFFEE;

    let result = [];
    if (includeColors) result.push(...colors.filter(i => !isGray(i)));
    if (includeGrays) result.push(...colors.filter(i => isGray(i)));
    return result;
  };
  const getItem = color => {
    const upperCaseFirst = word => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    };
    const c = `bg-${color}-500`;
    return (
        <div className="flex items-center gap-5">
          <div className={`${c} w-5 h-5`}></div>
          <div>{upperCaseFirst(color)}</div>
        </div>
    );
  };

  return (
      <Menu color={value} renderItem={<>{label}</>}>
        {getColors().map(c => <MenuItem  key={c} label={getItem(c)} onClick={()=>onChange(c)} />)}

      </Menu>

  );
};

export default ColorPicker;