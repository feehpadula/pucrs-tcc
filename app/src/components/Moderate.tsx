import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { GetToken } from "../services/Auth";
import { useGet } from "../hooks/useGet";
import { usePost } from "../hooks/usePost";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HorizontalList from "../components/HorizontalList";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import "./Moderate.scss";

const Moderate = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const token = GetToken();

  const [rowSelection, setRowSelection] = useState({});

  const item = props.item && props.item[0];

  /* eslint-disable */
  const { postData, data, isLoading, error } = usePost();
  /* eslint-disable */

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleCancelModerate = () => {
    props.onHandleCancelModerate();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let deleteId = [];

    table.getSelectedRowModel().flatRows.map((data) => deleteId.push(data.original.id));

    await postData({
      method: "post",
      url: "/data/delete",
      headers: { Authorization: `Bearer ${token}` },
      data: {
        deleteId: deleteId,
      },
    });

    navigate(0);
  };

  /* eslint-disable */
  const {
    data: itemData,
    isLoading: itemDataIsLoading,
    error: itemDataError,
  } = useGet({
    method: "get",
    url: `/data/${params.id}/full`,
    headers: { Authorization: `Bearer ${token}` },
  });

  const {
    data: fences,
    isLoading: fencesIsLoading,
    error: fencesDataError,
  } = useGet({
    method: "get",
    url: `/data/${params.id}/fences`,
    headers: { Authorization: `Bearer ${token}` },
  });
  /* eslint-disable */

  type Data = {
    id: number;
    field01data: number;
    field02data: number;
    combined: float;
    date: string;
  };

  const columns = useMemo<ColumnDef<Person>[]>(() => [
    {
      id: "select",
      cell: ({ row }) => (
        <div className="px-1">
          <IndeterminateCheckbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
      enableColumnFilter: false,
    },
    {
      accessorKey: "date",
      header: "Data",
      cell: (info) => new Date(info.getValue()).toLocaleDateString("pt-br"),
      enableColumnFilter: false,
    },
    {
      accessorKey: "field01data",
      header: item.field01name,
      cell: (info) => info.getValue(),
    },
    ...(item.field02name
      ? [
          {
            accessorKey: "field02data",
            header: item.field02name,
            cell: (info) => info.getValue(),
          },
          {
            accessorKey: "combined",
            header: "%",
            cell: (info) => Math.round(info.getValue()) + "%",
          },
        ]
      : []),
  ]);

  const table = useReactTable({
    data: itemData,
    columns,
    state: {
      rowSelection,
    },
    enableRowSelection: Object.keys(rowSelection).length <= 3,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    itemData && (
      <form onSubmit={handleSubmit}>
        <Row>
          <Col sm={12}>
            <HorizontalList>
              <div></div>
              <Select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                  table.setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize} itens / página
                  </option>
                ))}
              </Select>
            </HorizontalList>
          </Col>
        </Row>
        <Row className="pt-15">
          <Col sm={12}>
            <div className="table">
              <div className="table-heading">
                {table.getHeaderGroups().map((headerGroup) => (
                  <div className="table-row" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <div
                          className="table-cell"
                          key={header.id}
                          colSpan={header.colSpan}
                        >
                          {header.isPlaceholder ? null : (
                            <div>
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              <div className="table-body">
                {table.getRowModel().rows.map((row) => {
                  return (
                    <div className="table-row" key={row.id}>
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <div className="table-cell" key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            {fences &&
                              ((cell.column.id === "field01data" &&
                                item.dataPresentation !== 2) ||
                                (cell.column.id === "combined" &&
                                  item.dataPresentation === 2)) &&
                              (cell.getValue() < fences[0][0].q1 ||
                                cell.getValue() > fences[0][0].q3) && <strong>*</strong>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="table-outliers">
              {fences && item.dataOutliers !== 0 && (
                <>
                  <strong>*</strong>
                  {` outliers: (<= ${fences[0][0].q1}) e (>= ${fences[0][0].q3})`}
                </>
              )}
            </div>

            <div className="table-pagination">
              <div className="table-pagination-buttons">
                <Button
                  type="button"
                  title={"<<"}
                  onClick={() => table.setPageIndex(0)}
                  disabled={table.getState().pagination.pageIndex === 0}
                />
                <Button
                  type="button"
                  title={"<"}
                  onClick={() => table.previousPage()}
                  disabled={table.getState().pagination.pageIndex === 0}
                />
                <Button
                  type="button"
                  title={">"}
                  onClick={() => table.nextPage()}
                  disabled={
                    table.getState().pagination.pageIndex === table.getPageCount() - 1
                  }
                />
                <Button
                  type="button"
                  title={">>"}
                  onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                  disabled={
                    table.getState().pagination.pageIndex === table.getPageCount() - 1
                  }
                />
              </div>

              <div className="table-pagination-info">
                <div>
                  <span>
                    Página{" "}
                    <strong>
                      {table.getState().pagination.pageIndex + 1} de{" "}
                      {table.getPageCount()}
                    </strong>
                  </span>
                </div>
                <div>
                  - Ir para:
                  <Input
                    type="number"
                    value={table.getState().pagination.pageIndex + 1}
                    max={table.getPageCount()}
                    onChange={(e) => {
                      const page = e.target.value ? Number(e.target.value) - 1 : 0;
                      table.setPageIndex(page);
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col sm={12} className="pt-lg-30">
            <HorizontalList>
              <div></div>
              <div className="actions">
                <Button type="button" title="Cancelar" onClick={handleCancelModerate} />
                <Button
                  type="submit"
                  title={`Deletar (${table.getSelectedRowModel().flatRows.length})`}
                  disabled={
                    table.getSelectedRowModel().flatRows.length > 0 ? false : true
                  }
                />
              </div>
            </HorizontalList>
          </Col>
        </Row>
      </form>
    )
  );
};

export default Moderate;

function IndeterminateCheckbox({
  indeterminate,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return <input type="checkbox" ref={ref} {...rest} />;
}
