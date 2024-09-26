import React, { useState } from "react";
import FilesIcon from "./ui/icons/FilesIcon";
import Image from "next/image";

type Props = {
  file: File | null;
  onChange: (file: File | null) => void;
  description?: string;
};

export default function DragAndDrop({
  file,
  onChange,
  description = "클릭 혹은 파일을 이곳에 드롭하세요.",
}: Props) {
  const [dragOver, setDragOver] = useState(false);

  // 드래그한 객체가 특정 요소 위로 처음 진입할 때
  // 드래그한 객체가 특정 요소에서 벗어날 때
  const handleDrag = () => {
    setDragOver((prev) => !prev);
  };

  // 드래그한 객체가 특정 요소 위에 계속해서 머무를 때
  // preventDefault를 호출해야 해당 요소가 드롭 가능하다는 것을 브라우저에 알릴 수 있다.
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    // e.preventDefault();
  };

  // 드래그한 객체가 특정 요소에 드롭될 때
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragOver(false);

    // 드래그되는 데이터 정보와 메서드를 제공하는 dataTransfer 객체 사용
    if (e.dataTransfer) {
      const file = e.dataTransfer.files[0];
      onChange(file);
    }
  };

  // 클릭 이벤트로 업로드하는 기능도 추가
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      onChange(files[0]);
    }
  };
  return (
    <div className="w-full">
      <label
        className={`w-full flex-col gap-3 h-full max-h-96 min-h-60 border-2 border-dotted border-sky-500 ${
          dragOver && "text-sky-700 bg-blue-100"
        } rounded-md flex items-center justify-center cursor-pointer transition-all`}
        htmlFor="file-upload"
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="relative w-full aspect-square">
            <Image
              className="object-contain"
              src={URL.createObjectURL(file)}
              alt="local file"
              fill
              sizes="650px"
            />
          </div>
        ) : (
          <>
            <div
              className={`${
                dragOver ? "text-sky-600" : "text-gray-300"
              } transition-all pointer-events-none`}
            >
              <FilesIcon />
            </div>
            {description}
          </>
        )}
      </label>
      <input
        id="file-upload"
        name="file"
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
}
