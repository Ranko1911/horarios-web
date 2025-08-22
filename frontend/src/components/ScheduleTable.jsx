function ScheduleTable({ data }) {
  const headers = Object.keys(data[0].horarios);

  return (
    <table className="border-collapse border border-gray-400 mt-4">
      <thead>
        <tr>
          <th className="border p-2">Trabajador</th>
          {headers.map((h, idx) => (
            <th key={idx} className="border p-2">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            <td className="border p-2 font-bold">{row.trabajador}</td>
            {headers.map((h, i) => (
              <td key={i} className="border p-2 whitespace-pre">{row.horarios[h]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ScheduleTable;
