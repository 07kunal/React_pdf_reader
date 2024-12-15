import React from "react";
import RouteList from "./routes/RouteList"
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

function App() {
  return (
    <div className="App">
      <RouteList />
    </div>
  );
}

export default App;
