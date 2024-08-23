"use client";
import { LuUpload } from "react-icons/lu";
import React, { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import Image from "next/image";

// Function to delete the image and clear the state
const deleteImage = (e: React.MouseEvent<HTMLButtonElement>, setImg: React.Dispatch<React.SetStateAction<string>>) => {
  e.preventDefault();
  setImg("");
};

// Function to handle the file upload and set the local image URL
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, setImg: React.Dispatch<React.SetStateAction<string>>) => {
  const file = e.target.files?.[0];
  if (file) {
    const localUrl = URL.createObjectURL(file);
    setImg(localUrl);
  }
};

// Function to handle the image saving to Firebase
const saveImageToFirebase = async (file: File) => {
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child(file.name);
  const snapshot = await fileRef.put(file);
  const downloadURL = await snapshot.ref.getDownloadURL();
  return downloadURL;
};

interface mainImageProps {
  onChange: (url: string) => void;
}

export function MainImage({ onChange }: mainImageProps) {
  const [img, setImg] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleSave = (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      saveImageToFirebase(file)
        .then((downloadURL) => {
          onChange(downloadURL);
          setUploaded(true);
          setLoading(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="relative box-border grid aspect-square flex-1 place-items-center rounded-lg bg-grey">
      <div className="absolute -top-10 right-0">
        {loading ? (
          <p className="opacity-60">Uploading...</p>
        ) : uploaded ? (
          <p className="text-accent">Image Uploaded</p>
        ) : (
          <div>
            <button className="me-2 underline opacity-60 hover:text-accent" onClick={(e) => deleteImage(e, setImg)}>
              delete
            </button>
            <button className="me-2 underline opacity-60 hover:text-accent" onClick={handleSave}>
              save
            </button>
          </div>
        )}
      </div>
      <input
        type="file"
        onChange={(e) => handleFileUpload(e, setImg)}
        className="hidden"
        id="main-image"
        ref={fileInputRef} // Attach the ref
      />

      {img === "" ? (
        <div>
          <label htmlFor="main-image" className="rounded-full border-2 border-dashed border-off-black border-opacity-60 px-3 py-1 hover:cursor-pointer">
            Upload Main Image
            <LuUpload className="ms-2 inline-block" />
          </label>
        </div>
      ) : (
        <div className="h-full p-20">
          <Image className="h-full w-auto" src={img} alt="" width={200} height={200} />
        </div>
      )}
    </div>
  );
}
