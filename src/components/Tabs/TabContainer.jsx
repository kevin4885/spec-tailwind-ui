import React from 'react';
import Tabs, { Tab } from './Tabs';
import Select from '../controls/Select';
import { useMediaQuery } from 'react-responsive';

const TabContainer = ({ children, selected, onChange, scrollOnMobile = true, autoScroll = true }) => {
  const isLg = useMediaQuery({
    query: '(min-width: 1024px)',
  });
  return (
    <div className="flex flex-col w-full">
      {!scrollOnMobile && !isLg && (
        <div>
          <Select value={selected} onChange={(e) => onChange(e.value)}>
            {React.Children.map(
              children,
              (child) =>
                child.props.value &&
                child.props.title && <option value={child.props.value}>{child.props.title}</option>,
            )}
          </Select>
        </div>
      )}
      {isLg && (
        <Tabs selected={selected} onChange={onChange}>
          {React.Children.map(
            children,
            (child) =>
              child.props.value && child.props.title && <Tab value={child.props.value}>{child.props.title}</Tab>,
          )}
        </Tabs>
      )}
      <div className="flex flex-col h-full overflow-hidden">
        <div className={` ${(isLg || !scrollOnMobile) && autoScroll && 'overflow-auto'}`}>
          {React.Children.map(
            children,
            (c) =>
              ((!isLg && scrollOnMobile) || c.props.value === selected) &&
              React.cloneElement(c, {
                key: c.props.value,
                hideTitle: isLg || !scrollOnMobile,
              }),
          )}
        </div>
      </div>
    </div>
  );
};

export const TabPanel = ({ title, children, containerClass = 'py-4 lg:px-4', ...rest }) => {
  return (
    <div className="flex flex-col">
      {!rest.hideTitle && <div className="lg:hidden flex items-center text-lg pt-4 pb-2">{title}</div>}
      <div className={containerClass}>{children}</div>
    </div>
  );
};

export default TabContainer;

//<Tabs selected="props">{tabs && tabs.map((t) => <Tab key={t.name}>t.name</Tab>)}</Tabs>
