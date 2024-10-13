import { Todo } from "../types/Todo"

import { motion } from "framer-motion";

interface TodoListProps {
    allItems: Todo[],
    handleCompleteTask: (id:number)=>void
}

const incompleteCheck = <span className="border border-gray-300 w-6 h-6 inline-block rounded-full"></span>
const completeCheck =<span className="flex items-center justify-center border border-gray-200 text-green-500 w-6 h-6 rounded-full">✓</span>

const TodoList: React.FC<TodoListProps> = ({allItems, handleCompleteTask})=>{
    return (
      <section className="bg-white h-60 overflow-y-auto">
        {allItems.length===0? <p className="p-6">No items left in this category</p>
        :(allItems.map((item) => (
          <motion.div
            key={item.id}
            className="flex items-center py-4 px-6 border-b border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="mr-4"
              onClick={() => handleCompleteTask(item.id)}>
              {item.completed ? completeCheck : incompleteCheck}
            </button>
            <p className={`transition-all duration-300 ${item.completed ? "line-through text-gray-200" : ""}`}>
              {item.text}
            </p>
          </motion.div>
        )))}
      </section>
    );
}

export default TodoList