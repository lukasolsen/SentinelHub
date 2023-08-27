import React, { useEffect, useState } from "react";
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_Row,
} from "material-react-table";
import { Box, Button, Tooltip } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { ExportToCsv } from "export-to-csv"; //or use your library of choice here
import { getEmails } from "../service/api-service";
import Statistics from "../components/Statistics";
import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function Dashboard() {
  const [data, setData] = useState<ResponseData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const emails = await getEmails();
        setData(emails);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //defining columns outside of the component is fine, is stable
  const columns: MRT_ColumnDef<ResponseData>[] = [
    {
      accessorKey: "id",
      header: "ID",
      size: 40,
    },
    {
      accessorKey: "ip",
      header: "Sender IP",
      size: 150,
    },
    {
      accessorKey: "lastUpdated",
      header: "Last Updated",
      size: 150,
    },
    {
      accessorKey: "threat",
      header: "Threat",
      size: 150,
    },
  ];

  const csvOptions = {
    fieldSeparator: ",",
    quoteStrings: '"',
    decimalSeparator: ".",
    showLabels: true,
    useBom: true,
    useKeysAsHeaders: false,
    headers: columns.map((c) => c.header),
  };

  const csvExporter = new ExportToCsv(csvOptions);

  const handleExportRows = (rows: MRT_Row<Report>[]) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };

  return (
    <>
      <div className="w-11/12 mx-auto">
        {/* make body be transparent */}
        <MaterialReactTable
          columns={columns}
          data={data}
          enableRowSelection
          positionToolbarAlertBanner="bottom"
          positionActionsColumn="last"
          enableColumnActions
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export All Data
              </Button>
              <Button
                disabled={table.getPrePaginationRowModel().rows.length === 0}
                //export all rows, including from the next page, (still respects filtering and sorting)
                onClick={() =>
                  handleExportRows(table.getPrePaginationRowModel().rows)
                }
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export All Rows
              </Button>
              <Button
                disabled={table.getRowModel().rows.length === 0}
                //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
                onClick={() => handleExportRows(table.getRowModel().rows)}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Page Rows
              </Button>
              <Button
                disabled={
                  !table.getIsSomeRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                //only export selected rows
                onClick={() =>
                  handleExportRows(table.getSelectedRowModel().rows)
                }
                startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Export Selected Rows
              </Button>
            </Box>
          )}
          renderRowActions={({ row }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Open Report">
                <Link to={`/report/${row.original.id}`}>
                  <FaPaperPlane />
                </Link>
              </Tooltip>
            </Box>
          )}
          enableRowActions
        />
      </div>
      <hr className="my-12 w-10/12 mx-auto bg-hr-kaspersky" />
      <div className="mt-12">
        <Statistics />
      </div>
    </>
  );
}
