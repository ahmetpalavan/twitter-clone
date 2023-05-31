import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Input from "./Input";

interface ImageUploadProps {
  value: string;
  disabled?: boolean;
  onChange: (worth: string) => void;
  label?: string;
}

const ImageUpload = ({ value, disabled, onChange, label }: ImageUploadProps) => {
  const [worth, setWorth] = useState(value);

  const handleDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const { result } = event.target as any;
      setWorth(result);
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    disabled,
    accept: {
      "image/png": [],
      "image/jpeg": [],
    },
  });

  return (
    <div {...getRootProps({
        className: "w-full p-4 text-white text-center border-2 border-neutral-300 rounded-lg cursor-pointer hover:border-neutral-200 hover:bg-neutral-200",
    })}>
      <input {...getInputProps()} />
      {worth ? (
        <div className="flex items-center justify-center">
          <Image src={worth} alt="profile image" width={100} height={100} className="rounded-full" />
        </div>
      ) : (
        <p className="text-white text-center">{label}</p>
      )}
    </div>
  );
};

export default ImageUpload;
