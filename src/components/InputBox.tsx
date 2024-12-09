import React from "react";
import { Input } from "./ui/input"
import { Label } from "./ui/label"

type inputBoxProps = {
  title : string;
  name : string;
  type : string;
  id : string;
  placeholder ?: string;
  value ?: string | number | undefined;
  onChange : (event : React.ChangeEvent<HTMLInputElement>) => void;
}

export function InputBox({title, name, type, id, placeholder, value, onChange} : inputBoxProps) {

  return (
    <div className="grid w-full max-w-sm items-center gap-2">
      <Label htmlFor={id}>{title}</Label>
      <Input className="bg-white" name={name} type={type} id={id} placeholder={placeholder} value={value} onChange={onChange}/>
    </div>
  )
}