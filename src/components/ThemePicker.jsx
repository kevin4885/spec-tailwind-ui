
const ThemePicker = ({ theme }) => {
  return (
    <>
      {theme && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2 px-4">
          {/*<ColorPicker label="Primary" value={theme?.primary} onChange={v => onChange("primary", v)} />*/}
          {/*<ColorPicker label="Secondary" value={theme?.secondary} onChange={v => onChange("secondary", v)} />*/}
          {/*<ColorPicker label="Tertiary" value={theme?.tertiary} onChange={v => onChange("tertiary", v)} />*/}
          {/*<ColorPicker label="Danger" value={theme?.danger} onChange={v => onChange("danger", v)} />*/}
          {/*<ColorPicker label="Warning" value={theme?.warn} onChange={v => onChange("warn", v)} />*/}
          {/*<ColorPicker label="Success" value={theme?.success} onChange={v => onChange("success", v)} />*/}
          {/*<ColorPicker label="Background" value={theme?.bg} includeColors={false} includeGrays={true} onChange={v => onChange("bg", v)} />*/}
        </div>
      )}
    </>
  );
};

export default ThemePicker;
