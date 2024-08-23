import React from "react";
import { IoAddCircle } from "react-icons/io5";

interface featuresProps {
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}

export function Features({ features, setFeatures }: featuresProps) {
  const addFeature = (e: any) => {
    e.preventDefault();
    setFeatures([...features, ""]);
  };
  const handleFeatureChange = (index: number, newFeature: string) => {
    setFeatures((prev: string[]) => {
      const newFeatures = [...prev];
      newFeatures[index] = newFeature;
      return newFeatures;
    });
  };
  return (
    <div className="flex-1">
      <div className="flex justify-between">
        <h3 className="text-accent">Features</h3>
        <button onClick={addFeature} className="aspect-square">
          <IoAddCircle className="hover:text-accent" size={30}></IoAddCircle>
        </button>
      </div>
      <div>
        {features.map((feature: string, index) => {
          return (
            <textarea
              key={index}
              className="my-1 min-h-[10rem] w-full rounded-md p-4 ring-2 ring-black ring-opacity-15 focus:outline-accent"
              value={feature}
              onChange={(e) => {
                handleFeatureChange(index, e.target.value);
              }}
              required
              minLength={10}></textarea>
          );
        })}
      </div>
    </div>
  );
}
