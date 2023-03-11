import { useState } from 'react';
import { processQuery, useWizardState } from './useWizardState';
import styles from './wizard.module.scss';

type WizardProps = {
  current: ReturnType<typeof useWizardState>[0];
  send: ReturnType<typeof useWizardState>[1];
};

export const Wizard = ({ current, send }: WizardProps) => {
  const onQuerySubmit = (value: string) => {
    send({ type: 'PROCEED', value });
    processQuery(
      value,
      current.context.database!,
      (result) => send({ type: 'SUCCESS', value: result }),
      (error) => send({ type: 'ERROR', value: error })
    );
  };

  if (current.matches('describe-database')) {
    return (
      <Form
        key={'describe-database'}
        label={'Describe your database'}
        initialValue={current.context.database}
        submitLabel={'Next'}
        onSubmit={(value) => send({ type: 'PROCEED', value })}
      />
    );
  }

  if (current.matches('describe-query')) {
    return (
      <Form
        key={'describe-query'}
        label={'Describe your query'}
        submitLabel={'Next'}
        onSubmit={(value) => onQuerySubmit(value)}
        onCancel={() => send('CANCEL')}
      />
    );
  }

  if (current.matches('process')) {
    return <div>Processing...</div>;
  }

  return <></>;
};

type FormProps = {
  label: string;
  initialValue?: string;
  onSubmit: (value: string) => void;
  onCancel?: () => void;
  submitLabel?: string;
};

const Form = ({
  label,
  submitLabel,
  onSubmit,
  onCancel,
  initialValue,
}: FormProps) => {
  const [value, setValue] = useState(initialValue ?? '');

  return (
    <div className={styles.container}>
      <label>
        {label}
        <textarea
          value={value}
          draggable={false}
          wrap='hard'
          name={label}
          placeholder={label}
          onChange={(e) => setValue(e.target.value)}
        />
      </label>

      <div>
        {onCancel && (
          <button type='button' onClick={onCancel}>
            Back
          </button>
        )}
        <button type='submit' onClick={() => onSubmit(value)}>
          {submitLabel}
        </button>
      </div>
    </div>
  );
};
