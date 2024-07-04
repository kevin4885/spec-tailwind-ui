import { COLOR } from '../theme/constants.js';
import CenterSelect from './centerSelect/CenterSelect.jsx';

const getItem = color => {
  if (!color?.id) return;
  const c = `bg-${color.id}-500`;
  return (
    <div className="flex items-center gap-5">
      <div className={`${c} w-5 h-5`}></div>
      <div>{color.name}</div>
    </div>
  );
};
const upperCaseFirst = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const ColorPicker = ({ onChange, value, label = "Color", description, includeGrays = false, includeColors = true }) => {
  const getColors = () => {
    const colors = Object.values(COLOR);
    if (includeColors && includeGrays) return colors;

    const isGray = color => color === COLOR.STONE || color === COLOR.METAL || color === COLOR.NEUTRAL || color === COLOR.SLATE || color === COLOR.ZINC || color === COLOR.COFFEE;

    let result = [];
    if (includeColors) result.push(...colors.filter(i => !isGray(i)));
    if (includeGrays) result.push(...colors.filter(i => isGray(i)));
    return result;
  };

  return <CenterSelect label={label} description={description} onChange={onChange} value={value} items={getColors().map(c => ({ name: upperCaseFirst(c), id: c }))} renderItem={getItem}></CenterSelect>;
};

export default ColorPicker;

/*     */
