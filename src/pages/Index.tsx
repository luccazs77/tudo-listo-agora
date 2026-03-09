import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, ListChecks } from "lucide-react";
import TodoItem from "@/components/TodoItem";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Index = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", text: "Criar um projeto incrível ✨", completed: false },
    { id: "2", text: "Tomar um café ☕", completed: true },
  ]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: trimmed, completed: false },
      ...prev,
    ]);
    setInput("");
  };

  const toggleTodo = (id: string) =>
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

  const deleteTodo = (id: string) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  const pending = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-background flex items-start justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <ListChecks className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Minhas Tarefas</h1>
            <p className="text-sm text-muted-foreground">
              {pending === 0
                ? "Tudo feito! 🎉"
                : `${pending} tarefa${pending > 1 ? "s" : ""} pendente${pending > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addTodo();
          }}
          className="flex gap-2 mb-6"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Adicionar nova tarefa..."
            className="flex-1 rounded-xl border border-input bg-card px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 transition"
          />
          <button
            type="submit"
            className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity shadow-md"
          >
            <Plus className="w-5 h-5" />
          </button>
        </form>

        {/* List */}
        <div className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                {...todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </AnimatePresence>
        </div>

        {todos.length === 0 && (
          <p className="text-center text-muted-foreground text-sm mt-12">
            Nenhuma tarefa ainda. Adicione uma acima! 👆
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default Index;
