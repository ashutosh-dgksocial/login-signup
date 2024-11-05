import "./App.css";
// import TodoList from "./sections/Todolist/TodoList";
import ToDo from './sections/ToDo/ToDo'
function App() {
  return (
    <>
      <div className="mx-auto max-w-screen-2xl border">
        {/* <TodoList /> */}
        <ToDo />
      </div>
    </>
  );
}

export default App;
