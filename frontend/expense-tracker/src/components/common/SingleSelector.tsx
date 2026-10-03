import { TextField, Select, MenuItem } from "@mui/material";

interface Props {
  items: { text: string; value: string }[];
  selectedItem: { text: string; value: string };
  onSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function SingleSelector({ items, selectedItem, onSelection }: Props) {
  return (
    <div>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={selectedItem.value}
        size="small"
        onChange={onSelection}
      >
        {items.map((item) => {
          return <MenuItem value={item.value}>{item.text}</MenuItem>;
        })}
      </Select>
    </div>
  );
}

export default SingleSelector;
