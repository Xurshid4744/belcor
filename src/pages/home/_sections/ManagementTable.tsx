import { DataTable } from "@/components";
import { useOrdersQuery } from "@/store/endpoints/order";
import { useSelector } from "@/store/store";
import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface RowData {
  createdAt: string;
  fullName: string;
  id: string;
  orderNumber: string;
  status: string;
  price: number;
}

const columns = [
  { id: "orderNumber", label: "Order Number" },
  { id: "fullName", label: "FullName" },
  { id: "price", label: "Price" },
  { id: "status", label: "status" },
];

const renderRowDetails = (row: RowData) => (
  <div>
    <p>
      <strong>ID:</strong> {row.id}
    </p>
    <p>
      <strong>fullName:</strong> {row.fullName}
    </p>
    <p>
      <strong>Price:</strong> {row.price}
    </p>
    <p>
      <strong>orderNumber:</strong> {row.orderNumber}
    </p>
  </div>
);

const ManagementTable: React.FC = () => {
  const { status } = useSelector((state: any) => state.filter);
  const { data, isFetching, refetch } = useOrdersQuery({
    status: status === "0" ? "" : status,
  });

  React.useEffect(() => {
    refetch();
  }, [status, refetch]);

  return (
    <Box>
      {!isFetching ? (
        <DataTable<RowData>
          columns={columns}
          data={data}
          renderRowDetails={renderRowDetails}
        />
      ) : (
        <Box
          sx={{
            borderRadius: "20px",
            backgroundColor: "#fff",
            height: "570px",
            display: "grid",
            placeItems: "center"
          }}
        >
          <CircularProgress size={100} />
        </Box>
      )}
    </Box>
  );
};

export default ManagementTable;
