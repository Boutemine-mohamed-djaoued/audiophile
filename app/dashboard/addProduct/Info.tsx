import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface infoProps {
  info: {
    name: string;
    description: string;
    price: number;
    inStock: number;
    category: string;
  };
  setInfo: (arg: any) => void;
}

export function Info({ info, setInfo }: infoProps) {
  const handleInfoChange = (value: string | number, key: string) => {
    setInfo((prev: any) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  return (
    <div className="flex-1">
      <label className="mb-2 font-medium" htmlFor="name">
        Name
      </label>
      <br />
      <input value={info.name} onChange={(e) => handleInfoChange(e.target.value, "name")} className="form-input" type="text" id="name"  required minLength={3} maxLength={100}/>
      <br />
      <label className="mb-2 mt-4 font-medium" htmlFor="description">
        Description
      </label>
      <br />
      <textarea value={info.description} onChange={(e) => handleInfoChange(e.target.value, "description")} className="form-input min-h-[7rem]" id="description" required minLength={10} maxLength={1000}/>
      <br />
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="mb-2 mt-4 font-medium" htmlFor="price">
            Price
          </label>
          <br />
          <input value={info.price} onChange={(e) => handleInfoChange(e.target.value, "price")} className="form-input" type="number" id="price" required min={0}/>
          <br />
        </div>
        <div className="flex-1">
          <label className="mb-2 mt-4 font-medium" htmlFor="stock">
            Stock
          </label>
          <br />
          <input value={info.inStock} onChange={(e) => handleInfoChange(e.target.value, "inStock")} className="form-input" type="number" id="stock" required min={0}/>
          <br />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 mt-4 font-medium" htmlFor="category">
            Category
          </label>
          <br />
          <Select value={info.category} onValueChange={(value) => handleInfoChange(value, "category")}>
            <SelectTrigger className="w-full min-w-0 rounded-md p-4 font-medium outline-none ring-1 ring-black ring-opacity-15 focus:!ring-accent">
              <SelectValue placeholder="HEADPHONES" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="hover:text-white" value="HEADPHONES">
                HEADPHONES
              </SelectItem>
              <SelectItem className="hover:text-white" value="SPEAKERS">
                SPEAKERS
              </SelectItem>
              <SelectItem className="hover:text-white" value="EARPHONES">
                EARPHONES
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div></div>
      </div>
    </div>
  );
}
