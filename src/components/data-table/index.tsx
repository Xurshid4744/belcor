import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  IconButton,
  Collapse,
  TextField,
  Box,
  Paper,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  Edit,
  Save,
} from "@mui/icons-material";
import debounce from "@/utils/debounce";

// TypeScript turlari
type Order = "asc" | "desc";

interface Column {
  id: string;
  label: string;
}

interface DataTableProps<T> {
  columns: Column[];
  data: T[];
  renderRowDetails: (row: T) => React.ReactNode;
}

export const DataTable = <T,>({
  columns,
  data,
  renderRowDetails,
}: DataTableProps<T>) => {
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof T | "">("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<T[]>(data);

  const handleSortRequest = (property: keyof T) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExpandClick = (rowIndex: number) => {
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex);
  };

  const handleEditClick = (rowIndex: number) => {
    setEditingRow(rowIndex);
  };

  const handleSaveClick = (rowIndex: number) => {
    setEditingRow(null);
    console.log(rowIndex)
    // Ma'lumotlarni saqlash logikasi
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    const filtered = data.filter((row: any) =>
      Object.values(row).some((cell) =>
        String(cell).toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };

  const debouncedHandleFilterChange = React.useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      handleFilterChange(event);
    }, 300),
    []
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (orderBy) {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer
      component={Paper}
      sx={{
        padding: "20px",
        borderRadius: "20px",
      }}
    >
      <TextField
        placeholder="Search..."
        variant="outlined"
        onChange={debouncedHandleFilterChange}
        fullWidth
        margin="normal"
        autoComplete="off"
      />
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.id}>
                <TableSortLabel
                  active={orderBy === column.id}
                  direction={orderBy === column.id ? order : "asc"}
                  onClick={() => handleSortRequest(column.id as keyof T)}
                >
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paginatedData.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>
                    {column.id === "orderNumber" ? (
                      String(row[column.id as keyof T])
                    ) : column.id === "status" ? (
                      String(row[column.id as keyof T]) === "2" ? (
                        "Отправлен"
                      ) : String(row[column.id as keyof T]) === "3" ? (
                        "Доставлен"
                      ) : String(row[column.id as keyof T]) === "5" ? (
                        "Ожидает оплаты"
                      ) : (
                        ""
                      )
                    ) : editingRow === rowIndex ? (
                      <TextField
                        defaultValue={String(row[column.id as keyof T])}
                        variant="standard"
                        fullWidth
                      />
                    ) : (
                      String(row[column.id as keyof T])
                    )}
                  </TableCell>
                ))}
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => handleExpandClick(rowIndex)}
                  >
                    {expandedRow === rowIndex ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() =>
                      editingRow === rowIndex
                        ? handleSaveClick(rowIndex)
                        : handleEditClick(rowIndex)
                    }
                  >
                    {editingRow === rowIndex ? <Save /> : <Edit />}
                  </IconButton>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={columns.length + 1}
                >
                  <Collapse
                    in={expandedRow === rowIndex}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>{renderRowDetails(row)}</Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default DataTable;
