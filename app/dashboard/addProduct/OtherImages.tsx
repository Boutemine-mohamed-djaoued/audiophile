import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useRef, useState } from "react";
import { LuUpload } from "react-icons/lu";

interface otherImagesProps {
  setOtherImages: (arg: any) => void;
}

const handleFileUpload = (e: any, setImgs: React.Dispatch<React.SetStateAction<string[]>>, index: number) => {
  const file = e.target.files[0];
  if (file) {
    const localUrl = URL.createObjectURL(file);
    setImgs((prevImgs) => {
      const newImgs = [...prevImgs];
      newImgs[index] = localUrl; // Update the specific index
      return newImgs;
    });
  }
};
const saveImageToFirebase = async (file: File) => {
  const storageRef = firebase.storage().ref();
  const timestamp = Date.now();
  const fileRef = storageRef.child(`${timestamp}-${file.name}`);
  const snapshot = await fileRef.put(file);
  const downloadURL = await snapshot.ref.getDownloadURL();
  return downloadURL;
};
const deleteImage = (e: any, index: number, setImgs: any) => {
  e.preventDefault();
  setImgs((prevImgs: string[]) => {
    const newImgs = [...prevImgs];
    newImgs[index] = "";
    return newImgs;
  });
};

const OtherImages = ({ setOtherImages }: otherImagesProps) => {
  const [imgs, setImgs] = useState<string[]>(["", "", ""]);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([null, null, null]); // Create a ref array for each input
  const [loading, setLoading] = useState([false, false, false]);
  const [uploaded, setUploaded] = useState([false, false, false]);
  const handleSave = async (e: any) => {
    e.preventDefault();
    for (let i = 0; i < fileInputRefs.current.length; i++) {
      setLoading((prev: boolean[]) => {
        const newLoading = [...prev];
        newLoading[i] = true;
        return newLoading;
      });
      const fileInput = fileInputRefs.current[i];
      if (fileInput?.files?.[0]) {
        try {
          const file = fileInput.files[0];
          const downloadURL = await saveImageToFirebase(file);
          console.log(`Image ${i + 1} saved and URL is`, downloadURL);
          setOtherImages((prev: string[]) => {
            const newImgs = [...prev];
            newImgs[i] = downloadURL;
            return newImgs;
          });
          setUploaded((prev: boolean[]) => {
            const newUploaded = [...prev];
            newUploaded[i] = true;
            return newUploaded;
          });
          setLoading((prev: boolean[]) => {
            const newLoading = [...prev];
            newLoading[i] = false;
            return newLoading;
          });
        } catch (err) {
          console.error(`Error saving image ${i + 1}:`, err);
        }
      }
    }
  };
  return (
    <div>
      <h3 className="mb-3 text-accent">Other Images</h3>

      <div className="relative grid aspect-video grid-cols-[40%_60%] grid-rows-2">
        <div className="absolute -top-10 right-0">
          {loading.some((load) => load) && (
            <div>
              <span className="opacity-60">Uploading...</span>
            </div>
          )}{" "}
          {uploaded.some((load) => load) || loading.some((load) => load) ? (
            <div>
              {uploaded.map((up, index) => {
                return up ? <span className="ms-4 text-accent">Img {index + 1} Uploaded</span> : null;
              })}
            </div>
          ) : (
            <div>
              {new Array(3).fill(null).map((_, index) => {
                return (
                  <button key={index} className="me-2 underline opacity-60 hover:text-accent" onClick={(e) => deleteImage(e, index, setImgs)}>
                    delete{index + 1}
                  </button>
                );
              })}
              <button className="me-2 underline opacity-60" onClick={handleSave}>
                save
              </button>
            </div>
          )}
        </div>
        {imgs.map((img, index) => (
          <div
            key={index}
            className={`${index === 1 ? "col-start-2 row-span-2 ms-7" : ""} mb-3 rounded-lg overflow-clip grid place-items-center bg-grey`}
            style={{
              backgroundImage: img ? `url(${img})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}>
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, setImgs, index)}
              className="hidden"
              ref={(el) => {
                fileInputRefs.current[index] = el;
              }}
            />
            {!img && (
              <div>
                <label
                  htmlFor={`image-${index}`}
                  onClick={() => fileInputRefs.current[index]?.click()} // Trigger file input click
                  className="rounded-full border-2 border-dashed border-off-black border-opacity-60 px-3 py-1 hover:cursor-pointer">
                  Upload Image {index + 1}
                  <LuUpload className="ms-2 inline-block" />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherImages;
