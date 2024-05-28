import iconSet from './icons.json';
import IcoMoon from 'react-icomoon';

const Icon = ({ icon, size, title, disableFill, removeInlineStyle, native, SvgComponent, PathComponent, ...props }) =>
    <IcoMoon iconSet={iconSet} {...props} {...{
        icon,
        size,
        title,
        disableFill,
        removeInlineStyle,
        native,
        SvgComponent,
        PathComponent,
    }} />;

export default Icon;
