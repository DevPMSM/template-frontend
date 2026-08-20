import { ChangeEvent, useEffect, useState } from "react";

export type ImageUploadProps = {
  name?: string;
  defaultImage?: string | null;
  disabled?: boolean;
  className?: string;
  onChange?: (file: File | null) => void;
};

export function ImageUpload({
  name = "image",
  defaultImage = null,
  disabled = false,
  className = "",
  onChange,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    defaultImage
  );
  const [isImageLoading, setIsImageLoading] =
    useState<boolean>(!!defaultImage);

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setIsImageLoading(true);
      setPreview(previewUrl);
    } else {
      setIsImageLoading(!!defaultImage);
      setPreview(defaultImage);
    }

    if (onChange) {
      onChange(file);
    }
  };

  // Limpa a URL criada da memória para evitar memory leaks
  useEffect(() => {
    return () => {
      if (preview && preview !== defaultImage) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview, defaultImage]);

  return (
    <label
      htmlFor={`image-upload-${name}`}
      className={`relative flex h-48 w-full flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-[#D2D2D2] bg-gray-50 transition-colors hover:border-[#4c65ac] hover:bg-gray-100 ${
        disabled
          ? "pointer-events-none opacity-60"
          : "cursor-pointer"
      } ${className}`}
    >
      {preview ? (
        <>
          {isImageLoading && (
            <div className="absolute inset-0 animate-pulse bg-gray-300" />
          )}
          <img
            src={preview}
            alt="Preview do upload"
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
            className={`h-full w-full object-cover transition-opacity duration-200 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </>
      ) : (
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
          <svg
            className="mb-4 h-8 w-8"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-center text-sm">
            <span className="font-semibold">
              Clique para anexar
            </span>{" "}
            ou arraste a imagem
          </p>
          <p className="text-xs">SVG, PNG, JPG ou GIF</p>
        </div>
      )}

      <input
        id={`image-upload-${name}`}
        type="file"
        name={name}
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
        disabled={disabled}
      />
    </label>
  );
}
