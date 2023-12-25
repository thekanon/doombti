import React from 'react';
import ButtonComponent from '../Atoms/ButtonComponent';
import { IConfirmDialogProps } from '@/app/lib/definitions';

const ConfirmDialog: React.FC<IConfirmDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title,
  message,
  confirmText,
  cancelText,
}) => {
  const messageLines = message
    .split('\n')
    .map((line, index) => <p key={index}>{line}</p>);

  return (
    <div
      className={`fixed inset-0 flex items-end justify-center ${
        isOpen ? 'bg-gray-600 bg-opacity-50' : ''
      } transition-opacity duration-300`}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'all' : 'none',
      }}
    >
      <div
        className="w-full transform rounded-t-lg bg-white p-4 transition-transform duration-300 ease-out "
        style={{ transform: isOpen ? 'translateY(0)' : 'translateY(100%)' }}
      >
        {title && <h2 className="Heading3 text-center">{title}</h2>}
        <div className="my-2 break-keep text-center text-lg">
          {messageLines}
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
          <ButtonComponent
            colorType="primary"
            state="active"
            styleType="filled"
            customStyle="w-full max-w-xl py-2"
            text={confirmText || 'Confirm'}
            onClick={() => {
              onConfirm();
            }}
          ></ButtonComponent>
          <ButtonComponent
            colorType="secondary"
            state="active"
            customStyle="w-full max-w-xl py-2"
            styleType="filled"
            text={cancelText || 'Cancel'}
            onClick={() => {
              onCancel();
            }}
          ></ButtonComponent>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
