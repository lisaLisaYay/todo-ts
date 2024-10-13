import { Todo } from "../types/Todo";

import { useState } from "react";

interface TodoListProp {
  allItems: Todo[];
  handleSetFilter: (filterName: "all" | "active" | "completed") => void;
  handleDeleteCompleted: ()=>void}

const Filter: React.FC<TodoListProp> = ({ allItems, handleSetFilter, handleDeleteCompleted }) => {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "active" | "completed"
  >("all");

  const handleFilterClick = (filterName: "all" | "active" | "completed") => {
    handleSetFilter(filterName);
    setActiveFilter(filterName);
  };

  return (
    <section className="flex justify-between py-4 px-6 items-center custom-page-effect  bg-white">
      <p>{allItems.filter((item) => !item.completed).length} items left</p>
      <div className="flex justify-between gap-2">
        <button
          data-testid="filter-all"
          onClick={() => handleFilterClick("all")}
          className={`${
            activeFilter === "all" ? "border border-custom-color rounded" : ""
          } px-2 py-1`}
        >
          All
        </button>
        <button
          data-testid="filter-active"
          onClick={() => handleFilterClick("active")}
          className={`${
            activeFilter === "active"
              ? "border border-custom-color rounded"
              : ""
          } px-2 py-1`}
        >
          Active
        </button>
        <button
          data-testid="filter-completed"
          onClick={() => handleFilterClick("completed")}
          className={`${
            activeFilter === "completed"
              ? "border border-custom-color rounded"
              : ""
          } px-2 py-1`}
        >
          Completed
        </button>
      </div>
      <button data-testid="clear-completed" onClick={handleDeleteCompleted}>Clear Completed</button>
    </section>
  );
};

export default Filter;
