// Main.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Main from "../pages/Main";
import { Todo } from "../types/Todo";

// Mockup initial todos
const mockTodos: Todo[] = [
  { id: 0, completed: false, text: "Make a text" },
  { id: 1, completed: false, text: "Finish text" },
  { id: 2, completed: true, text: "Write logic" },
];

describe("Main Component", () => {
  beforeEach(() => {
    // Render the Main component before each test
    render(<Main />);
  });


  test("Render initial tasks", () => {
    // Check if initial tasks are rendered
    expect(screen.getByText("Make a text")).toBeInTheDocument();
    expect(screen.getByText("Finish text")).toBeInTheDocument();
    expect(screen.getByText("Write logic")).toBeInTheDocument();
  });



  test("add a new task", () => {
    // Add a new task
    const input = screen.getByPlaceholderText("What needs to be done?");
    if (input) {
      fireEvent.change(input, { target: { value: "New Task" } });
      fireEvent.submit(input.closest("form")!); // Submit the form
    }
    // Check if the new task is rendered
    expect(screen.getByText("New Task")).toBeInTheDocument();
  });



  test("completes a task", () => {
    // Click to complete the first task
    const completeButton = screen.getAllByRole("button")[0];
    fireEvent.click(completeButton);

    // Check if the task is completed
    expect(screen.getByText("Make a text")).toHaveClass("line-through");
  });



  test("filters tasks", () => {
    // Set filter to active
    const filterActiveButton = screen.getByTestId("filter-active");
    fireEvent.click(filterActiveButton);

    // Check that only active tasks are displayed
    expect(screen.queryByText("Write logic")).not.toBeInTheDocument(); // completed task should not be displayed
    expect(screen.getByText("Make a text")).toBeInTheDocument(); // active task should still be displayed
    expect(screen.getByText("Finish text")).toBeInTheDocument(); // active task should still be displayed

    // Set filter to completed
    const filterCompletedButton = screen.getByTestId("filter-completed");
    fireEvent.click(filterCompletedButton);

    // Check that only completed tasks are displayed
    expect(screen.queryByText("Make a text")).not.toBeInTheDocument(); // active task should not be displayed
    expect(screen.queryByText("Finish text")).not.toBeInTheDocument(); // active task should not be displayed
    expect(screen.getByText("Write logic")).toBeInTheDocument(); // completed task should be displayed
  });

});
