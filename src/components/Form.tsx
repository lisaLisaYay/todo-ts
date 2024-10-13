import { useState } from "react";

interface FormProps {
  handleAddTask: (text: string) => void;
}

const Form: React.FC<FormProps> = ({ handleAddTask }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleAddTask(inputValue);
      setInputValue("");
    }
  };

  return (
      <form onSubmit={handleSubmit} >
        <input
          type="text"
          id="todo"
          name="todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full text-lg text-gray-400 placeholder-gray-300  py-4 px-6 border-b border-gray-200 focus:outline-none"
        />
      </form>
  );
};

export default Form;
