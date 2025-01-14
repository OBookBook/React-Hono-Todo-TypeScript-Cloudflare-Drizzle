import TodoItem from "./Todo";
import { Todo } from "../types/types";

interface TodosListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

const TodoList = ({ todos, onDelete }: TodosListProps) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TodoList;
