import React, { useCallback } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Button from "./Button";

interface Props {
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLabel: string;
  disabled?: boolean;
}

const Modal: React.FC<Props> = ({ isOpen, onClose, onSubmit, title, body, footer, actionLabel, disabled }) => {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    onClose();
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) {
      return;
    }
    onSubmit();
  }, [disabled, onSubmit]);

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed 
      inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-70"
      >
        <div className="relative w-full lg:w-3/6 my-6 mx-auto lg:max-w-3xl h-full lg:h-auto">
          {/* Content */}
          <div className="h-full lg:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-black outline-none focus:outline-none">
            {/* Header */}
            <div className="flex items-center justify-between p-10 rounded-t">
              <h3 className="text-3xl font-semibold text-white">{title}</h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-white opacity-50 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={handleClose}
              >
                <AiOutlineClose size={20} />
              </button>
            </div>
            {/* Body */}
            <div className="relative p-6 flex-auto">{body}</div>
            {/* Footer */}
            <div className="flex flex-col gap-2 p-10">
              <Button disabled={disabled} onClick={handleSubmit} label={actionLabel} fullWidth large secondary />
              {footer}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
