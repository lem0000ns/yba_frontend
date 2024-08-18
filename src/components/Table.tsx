import React from "react";

interface Props {
  columns: string[];
  body: any;
}

const Table = ({ columns, body }: Props) => {
  return (
    <table className="content-table">
      <thead>
        <tr>
          {columns.map((item) => (
            <th scope="col" key={item}>
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {body.map((row: any, index: any) =>
          React.cloneElement(row, { key: index })
        )}
      </tbody>
    </table>
  );
};

export default Table;
