import TodoItem from "./Todo";
import { Todo } from "../types/types";

interface TodosListProps {
  todos: Todo[];
}

const TodoList = ({ todos }: TodosListProps) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodoList;
