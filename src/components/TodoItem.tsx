import { motion } from "framer-motion";
import { Check, Trash2 } from "lucide-react";

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.25 }}
      className="group flex items-center gap-3 rounded-xl bg-card px-4 py-3.5 shadow-sm border border-border hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => onToggle(id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
          completed
            ? "bg-primary border-primary"
            : "border-muted-foreground/40 hover:border-primary"
        }`}
      >
        {completed && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Check className="w-3.5 h-3.5 text-primary-foreground" />
          </motion.div>
        )}
      </button>

      <span
        className={`flex-1 text-sm font-medium transition-all duration-200 ${
          completed ? "line-through text-muted-foreground" : "text-foreground"
        }`}
      >
        {text}
      </span>

      <button
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all duration-200"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

export default TodoItem;
