import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ImportTable } from "./import-table";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOutput = ["amount", "date", "payee"];

interface SelectedColumnState {
  [key: string]: string | null;
}

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data: any) => void;
};

export const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnState>(
    {}
  );

  const headers = data[0];
  const body = data.slice(1);

  const onTableHeadSelectChange = (columnIndex: number, value: string | null) =>
    setSelectedColumns((prev) => {
      const newSelectedColumn = { ...prev };

      for (const key in newSelectedColumn) {
        if (newSelectedColumn[key] === value) {
          newSelectedColumn[key] = null;
        }
      }

      if (value === "skip") {
        value = null;
      }

      newSelectedColumn[`column_${columnIndex}`] = value;
      return newSelectedColumn;
    });

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button size="sm" className="cursor-pointer" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            headers={headers}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={onTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};
