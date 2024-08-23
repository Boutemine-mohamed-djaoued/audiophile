import React from "react";
import { IoAddCircle } from "react-icons/io5";

interface inBoxProps {
  inBox: {
    item: string;
    quantity: number;
  }[];
  setInBox: (arg: any) => void;
}
export function InBox({ inBox, setInBox }: inBoxProps) {
  const addInBox = (e: any) => {
    e.preventDefault();
    setInBox([...inBox, { item: "", quantity: 0 }]);
  };

  const handleInBoxChange = (index: number, newItem: string, newQuantity: number) => {
    setInBox((prev: any) => {
      const newInBox = [...prev];
      newInBox[index] = { item: newItem, quantity: newQuantity };
      return newInBox;
    });
  };
  return (
    <div className="min-w-[30rem]">
      <div className="flex justify-between">
        <h3 className="text-accent">In Box</h3>
        <button onClick={addInBox} className="aspect-square">
          <IoAddCircle className="hover:text-accent" size={30}></IoAddCircle>
        </button>
      </div>
      <div>
        {inBox.map(({ item: string, quantity: number }, index) => {
          return (
            <div key={index} className="my-2 flex gap-4">
              <input className="form-input !w-[4rem] text-center" type="number" value={number} onChange={(e) => handleInBoxChange(index, string, parseInt(e.target.value))} required min={0}/>
              <input className="form-input flex-1" type="text" value={string} onChange={(e) => handleInBoxChange(index, e.target.value, number)} required minLength={3}/>
            </div>
          );
        })}
      </div>
    </div>
  );
}
