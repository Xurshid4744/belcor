import { Box, Button } from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "@/store/store";
import { cleaning, filtering } from "@/store/slices/filter";

const FilterTable: React.FC = () => {
  const { status, date } = useSelector((state: any) => state.filter);
  const dispatch = useDispatch();
  // function currentDate() {
  //   return new Date().toISOString().split("T")[0];
  // }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      filtering({
        date: event.target.value,
      })
    );
  };

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(
      filtering({
        status: event.target.value as string,
      })
    );
  };

  const clean = () => {
    dispatch(cleaning());
  };

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        marginBottom: "20px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr auto",
        gap: "20px",
      }}
    >
      <FormControl>
        <InputLabel id="demo-simple-select-label">Статусы</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value={"0"}>Все статусы</MenuItem>
          <MenuItem value={"5"}>Ожидает оплаты</MenuItem>
          <MenuItem value={"2"}>Отправлен</MenuItem>
          <MenuItem value={"3"}>Доставлен</MenuItem>
        </Select>
      </FormControl>
      <input
        type="date"
        id="data-time"
        value={date}
        onChange={handleDateChange}
      />
      <Button fullWidth variant="contained" color="primary" onClick={clean}>
        Сбросить фильтры
      </Button>
    </Box>
  );
};

export default FilterTable;
