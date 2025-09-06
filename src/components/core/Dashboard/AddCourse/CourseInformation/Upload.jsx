import React, { useCallback, useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import ReactPlayer from "react-player"

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  editData,
})




{
  
  const [preview, setPreview] = useState(editData || null)
  console.log(preview);
  
  // handle file drop
  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedFile = acceptedFiles[0]
      if (!selectedFile) return

      setPreview(URL.createObjectURL(selectedFile))
      
      setValue(name, selectedFile, { shouldValidate: true })
    },
    [setValue, name]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
    multiple: false,
  })

  // register field with react-hook-form once
  useEffect(() => {
    register(name, { required: true })
  }, [register, name])

  // preload edit data if exists
  useEffect(() => {
    if (editData) {
      setPreview(editData)
     
      setValue(name, editData)
    }
  }, [editData, setValue, name])
  
       const isVideo = (url) =>
  url && (url.endsWith(".mp4") || url.endsWith(".mov") || url.endsWith(".webm"));

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-sm text-white">
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
          ${isDragActive ? "border-yellow-400 bg-gray-800" : "border-gray-500 bg-gray-900"}`}
      >
        <input {...getInputProps()} />
        
     {
  !preview ? (
    <p className="text-gray-400">Drag & drop or click to upload</p>
  ) : isVideo(
      typeof preview === "string" ? preview : preview.name || ""
    ) ? (
    <video
      key={typeof preview === "string" ? preview : preview.name}
      src={typeof preview === "string" ? preview : URL.createObjectURL(preview)}
      controls
      width="100%"
      height="240"
      className="rounded-md"
      crossOrigin="anonymous"
    />
  ) : (
       <p>Data is Uploaded</p>
  )
}
      </div>

      {errors[name] && (
        <span className="text-xs text-pink-200">{label} is required</span>
      )}
    </div>
  )
}
