import { MyEditor } from "./components/editor";

function App() {
  return (
    <main className="container mx-auto px-10 grid gap-10">
      <h1 className="text-3xl font-bold underline">
        Vite + Tailwind + Lexical
      </h1>
      <MyEditor />
    </main>
  );
}

export default App;
