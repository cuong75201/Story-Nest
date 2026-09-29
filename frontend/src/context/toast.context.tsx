import { CircleCheck, CircleX, Info, TriangleAlert, X } from "lucide-react";
import { createContext, useContext, useRef, useState } from "react";

type Toast = {
  id: number;
  title: string;
  detail: string;
  type: "success" | "warning" | "error" | "info";
};

type ToastContext = {
  showToast: (title: string, detail: string, type: Toast["type"]) => void;
  closeToast: () => void;
};
const ToastContext = createContext<ToastContext>({
  showToast: () => {},
  closeToast: () => {},
});

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toast, setToast] = useState<Toast | null>(null);

  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearToastTimeOut = () => {
    if (timeOutRef.current != null) {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;
    }
  };

  const showToast = (title: string, detail: string, type: Toast["type"]) => {
    closeToast();
    setToast({ id: Date.now(), title, detail, type });
    timeOutRef.current = setTimeout(() => {
      closeToast();
    }, 5000);
  };

  const closeToast = () => {
    clearToastTimeOut();
    setToast(null);
  };

  const ToastIcon = ({ type }: { type: Toast["type"] }) => {
    switch (type) {
      case "success":
        return <CircleCheck className="size-4" />;

      case "warning":
        return <TriangleAlert className="size-4" />;

      case "error":
        return <CircleX className="size-4" />;

      case "info":
        return <Info className="size-4" />;

      default:
        return null;
    }
  };

  return (
    <ToastContext value={{ showToast, closeToast }}>
      {" "}
      {children}
      <button
        onClick={() =>
          showToast(
            "demo",
            "This is demo, click button X to close Toast           xdqwedw  sdfcwefwe cfsefvesrfs sfwefewf",
            "success",
          )
        }
      >
        Show Toast
      </button>
      {toast && (
        <div key={toast.id} className="fixed top-4 right-4 z-100 max-w-87.5 ">
          <div
            className={`relative overflow-hidden rounded-xl bg-white border shadow-toast p-4 mb-5 ${toast.type == "error" ? "border-rose-200/80 " : ""} ${toast.type == "success" ? "border-green-200/80 " : ""} ${toast.type == "warning" ? "border-amber-200/80 " : ""} ${toast.type == "info" ? "border-sky-200/80 " : ""} `}
          >
            <div
              className={`absolute  left-0 top-0 bottom-0 w-1.5 ${toast.type == "error" ? "bg-rose-500 " : ""} ${toast.type == "success" ? "bg-green-500 " : ""} ${toast.type == "warning" ? "bg-amber-500 " : ""} ${toast.type == "info" ? "bg-sky-500 " : ""}`}
            ></div>
            <div className="pl-2 flex items-start gap-3">
              {/* Icon */}
              <div
                className={`shrink-0 w-8 h-8 rounded-full  flex items-center border justify-center mt-0.5 ${toast.type == "error" ? "bg-rose-50 border-rose-100 text-rose-600" : ""} ${toast.type == "success" ? "bg-green-50 border-green-100 text-green-600 " : ""} ${toast.type == "warning" ? "bg-amber-50 border-amber-100 text-amber-600" : ""} ${toast.type == "info" ? "bg-sky-50 border-sky-100 text-sky-600 " : ""}`}
              >
                <ToastIcon type={toast.type} />
              </div>
              {/* Title & Content  */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm  font-bold text-slate-900 leading-snug">
                  {toast.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {toast.detail}
                </p>
              </div>
              <button
                type="button"
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md -mr-1 transition-colors"
                onClick={closeToast}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div
              className={`absolute bottom-0 left-0 right-0 h-0.5 ${toast.type == "error" ? "bg-rose-100 " : ""} ${toast.type == "success" ? "bg-green-100 " : ""} ${toast.type == "warning" ? "bg-amber-100 " : ""} ${toast.type == "info" ? "bg-sky-100 " : ""}`}
            >
              <div
                className={`h-full ${toast.type == "error" ? "bg-rose-500 " : ""} ${toast.type == "success" ? "bg-green-500 " : ""} ${toast.type == "warning" ? "bg-amber-500 " : ""} ${toast.type == "info" ? "bg-sky-500 " : ""} animate-progress`}
              ></div>
            </div>
          </div>
        </div>
      )}
    </ToastContext>
  );
};
const useToast = ()=>{
    const context= useContext(ToastContext)

    if(!context){
        throw new Error("useToast phải nằm trong ToastProvider")
    }
    return context;
}
export {useToast,ToastProvider};
