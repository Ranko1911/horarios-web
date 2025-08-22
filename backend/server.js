import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { generateSchedule } from "./generateSchedule.js";
import ExcelJS from "exceljs";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { apertura, cierre, trabajadores, numTurnos, fechaInicio } = req.body;
    const { df, horasPorPersona } = generateSchedule({
      apertura,
      cierre,
      trabajadores,
      numTurnos,
      fechaInicio,
    });
    res.json({ table: df, totales: horasPorPersona });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/export", async (req, res) => {
  try {
    const { apertura, cierre, trabajadores, numTurnos, fechaInicio } = req.body;
    const { df } = generateSchedule({
      apertura,
      cierre,
      trabajadores,
      numTurnos,
      fechaInicio,
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Horarios");

    worksheet.addRow(["Trabajador", ...Object.keys(df[0].horarios)]);
    df.forEach((row) => {
      worksheet.addRow([row.trabajador, ...Object.values(row.horarios)]);
    });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=horarios.xlsx"
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log("✅ Backend en http://localhost:4000"));
