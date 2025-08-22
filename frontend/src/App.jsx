import { useState } from "react";
import ConfigForm from "./components/ConfigForm";
import ScheduleTable from "./components/ScheduleTable";

function App() {
  const [schedule, setSchedule] = useState(null);

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">📅 Generador de Horarios</h1>
      <ConfigForm setSchedule={setSchedule} />
      {schedule && <ScheduleTable data={schedule} />}
    </div>
  );
}

export default App;
