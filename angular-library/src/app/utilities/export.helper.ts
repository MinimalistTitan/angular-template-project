import { saveAs } from 'file-saver';
export function exportToCSV(
  data: unknown[],
  fileName: string,
  separator = ';'
) {
  const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
  const header = Object.keys(data[0]);
  let csv = data.map((row) =>
    header
      .map((fieldName) => JSON.stringify(row[fieldName], replacer))
      .join(separator)
  );
  csv.unshift(header.join(separator));
  let csvArray = csv.join('\r\n');
  csvArrayToFile(csvArray, fileName);
}

function csvArrayToFile(csvArray: string, fileName: string) {
  var blob = new Blob([csvArray], { type: 'text/csv' });
  saveAs(blob, `${fileName}.csv`);
}
