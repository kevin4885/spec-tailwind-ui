import iconSet from './icons.json';
import IcoMoon from 'react-icomoon';

const Icon = ({ icon="insert_emoticon", size=16, title, disableFill, removeInlineStyle, native, SvgComponent, PathComponent, ...props }) =>
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
