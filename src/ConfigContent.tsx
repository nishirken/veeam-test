import React, { MouseEventHandler, useRef, useState } from 'react';
import { Config } from './Config';

type Props = {
    onApply(newConfig: Config): void;
    value: string;
    onChange(val: string): void;
};

export const ConfigContent: React.FunctionComponent<Props> = ({onApply, value, onChange}) => {
    const [err, setErr] = useState('');
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const handleApply: MouseEventHandler<HTMLButtonElement> = () => {
        if (!textAreaRef.current?.value) {
            return;
        }
        try {
            const content = JSON.parse(textAreaRef.current.value);
            onApply(content);
        } catch (e) {
            setErr((e as Error).message);
        }
    };

    return (
        <div className="Content">
            <textarea className="Content__textarea" rows={20} ref={textAreaRef} value={value} onChange={(ev) => onChange(ev.target.value)} />
            {err && <div>{err}</div>}
            <div className="Content__buttons">
                <button className="Button" onClick={handleApply}>Apply</button>
            </div>
        </div>
    );
};