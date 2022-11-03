import classNames from 'classnames';
import React from 'react';

type Props = {
    name: string;
    selected: boolean;
    onClick(): void;
};

export const Tab: React.FunctionComponent<Props> = ({name, selected, onClick}) => {
    return <div className={classNames('Tab', selected && 'Tab--selected')} onClick={onClick}>{name}</div>;
};