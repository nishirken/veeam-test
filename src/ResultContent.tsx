import React, { ButtonHTMLAttributes, FormEventHandler } from 'react';
import { Config, ButtonType, InputField } from './Config';
import {v4} from 'uuid';

const FormField: React.FunctionComponent<{field: InputField; el: React.ReactElement; id: string}> = ({field, el, id}) => {
    return <div className="FormField">
        {field.label && <label className="FormField__label" htmlFor={id}>{field.label}</label>}
        <div className="FormField__element">{React.cloneElement(el, {id})}</div>
    </div>;
};

const FormElement: React.FunctionComponent<{field: InputField; id?: string}> = ({field, id}) => {
    switch (field.type) {
        case 'text':
            return <input type="text" id={id} name={field.name} />;
        case 'number':
            return <input type="number" id={id} name={field.name} />;
        case 'checkbox':
            return <input type="checkbox" id={id} name={field.name} />;
        case 'textarea':
            return <textarea id={id} name={field.name} />;
        case 'date':
            return <input type="date" id={id} name={field.name} />;
        case 'radio':
            return (
                <div className="FormField__radio">
                    {
                        field.items.map(({value, label}) => (
                            <span key={value}>
                                <label htmlFor={value}>{label}</label><input name={field.name} type="radio" value={value} id={value} />
                            </span>
                        ))
                    }
                </div>
            )
    }
};

const buttonTypes: Record<ButtonType, ButtonHTMLAttributes<HTMLButtonElement>['type']> = {
    [ButtonType.Submit]: 'submit',
    [ButtonType.Reset]: 'reset',
};

type Props = {
    config: Config | null;
    onSubmit(data: Record<string, string>): void;
};

export const ResultContent: React.FunctionComponent<Props> = ({config, onSubmit}) => {
    const hanldeSubmit: FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        const data: Record<string, string> = {};
        [...(event.target as any).elements].forEach(({name, value}: any) => {
            if (name) {
                data[name] = value;
            }
        });
        onSubmit(data);
    };
    return (
        <div className="Content">
            {config?.title && <div className="Content__header">{config.title}</div>}
            {config && <form className='Content__form' id="form" onSubmit={hanldeSubmit} target="">
                {config.fields.map((field) => {
                    const id = v4();
                    return <FormField id={id} key={id} field={field} el={<FormElement field={field} />} />;
                })}
            </form>}
            <div className="Content__buttons">
                {config?.resetButton && <input form="form" className="Button" type="reset" value={config.resetButton.text ?? 'Reset'}></input>}
                {config?.submitButton && <button form="form" className="Button" type="submit">{config.submitButton.text ?? 'Submit'}</button>}
            </div>
        </div>
    );
};