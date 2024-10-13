import Form from "../components/Form";
import Filter from "../components/Filters";
import TodoList from "../components/TodoList";

import { Todo } from "../types/Todo";
import { useState } from "react";

const Main: React.FC = () => {
  const [allItems, setallItems] = useState<Todo[]>([
    { id: 0, completed: false, text: "Make a text" },
    { id: 1, completed: false, text: "Finish text" },
    { id: 2, completed: true, text: "Write logic" },
  ]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleAddTask = (text: string) => {
    setallItems((prev) => [
      { id: prev.length + 1, completed: false, text },
      ...prev,
    ]);
  };

  const handleCompleteTask = (id: number) => {
    setallItems((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, completed: true } : item;
      })
    );
  };

  const handleSetFilter = (filterName: "all" | "active" | "completed") => {
    setFilter(filterName);
  };

  const handleFilter = (): Todo[] => {
    if (filter === "active") {
      return allItems.filter((item) => !item.completed);
    }
    if (filter === "completed") {
      return allItems.filter((item) => item.completed);
    }
    return allItems;
  };

  const handleDeleteCompleted = () => {
    setallItems((prev) => prev.filter((item) => !item.completed));
  };

  return (
    <main className="w-[600px] bg-gray-50 p-5">
      <h1 className="font-light text-5xl text-center text-custom-color mb-4">
        todo
      </h1>
      <Form handleAddTask={handleAddTask} />
      <TodoList
        allItems={handleFilter()}
        handleCompleteTask={handleCompleteTask}
      />
      <Filter allItems={allItems} handleSetFilter={handleSetFilter} handleDeleteCompleted={handleDeleteCompleted } />
    </main>
  );
};

export default Main;
