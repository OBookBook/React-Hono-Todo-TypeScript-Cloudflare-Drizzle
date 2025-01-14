import TodoItem from "./Todo";
import { Todo } from "../types/types";

interface TodosListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
  onEdit: (id: number, title: string, isCompleted: boolean) => void;
}

const TodoList = ({ todos, onDelete, onEdit }: TodosListProps) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default TodoList;
