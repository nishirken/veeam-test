export type InputFieldType = 'number' | 'text' | 'textarea' | 'checkbox' | 'date';

export enum ButtonType {
    Submit = 'submit',
    Reset = 'reset',
}

export type InputRadioField = {
    type: 'radio';
    label: string;
    items: {
        label: string;
        value: string;
    }[];
    name: string;
};

export type InputField = {
    type: InputFieldType;
    label: string;
    name: string;
} | InputRadioField;

export type ButtonField = {
    type: ButtonType;
    text: string;
};

export type TitleField = {
    type: 'title';
    text: string;
};

export type Config = {
    title?: string;
    submitButton?: {
        text?: string;
    };
    resetButton?: {
        text?: string;
    };
    fields: InputField[];
};
