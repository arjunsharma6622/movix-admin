import { Label } from "./ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select"


type selectBoxProps = {
    title: string;
    placeholder: string;
    defaultValue ?: string | number | boolean;
    optionsData: {
        value: string | number | boolean;
        name: string;
    }[];
    onChange: (value: string | boolean | number) => void;
}

export function SelectBox({ title, defaultValue, placeholder, optionsData, onChange }: selectBoxProps) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label>{title}</Label>

            <Select 
                value={defaultValue as string}
                onValueChange={(value) => {
                    const selected = optionsData.find(
                        (option) => option.value.toString() === value
                    );
                    onChange(selected?.value ?? "" );
                }}
            >
                <SelectTrigger className="w-full bg-white">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {optionsData.map((item, index) => (
                        <SelectItem key={index} value={item.value as string}>{item.name}</SelectItem>
                    ))
                    }
                </SelectContent>
            </Select>
        </div>
    )
}
