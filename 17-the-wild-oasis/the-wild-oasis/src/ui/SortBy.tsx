import { useSearchParams } from "react-router-dom";
import Select from "./Select";

type SortByProps = {
  options: {label: string, value: string}[],
  type?: "white" | "grey"
}

export default function SortBy({options, type="white"}: SortByProps) {

  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get("sortBy") ?? options[0].value;

  const handleChange  = (event: React.ChangeEvent<HTMLOptionElement> ) => {
    searchParams.set("sortBy", event.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select  options={options} type={type} onChange={handleChange} value={value}/>
  )
}