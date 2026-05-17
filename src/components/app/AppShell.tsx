import { type ReactNode, useEffect, useRef, useState } from "react";
import { Sidebar } from "./Sidebar";
import { NewBatchModal } from "./NewBatchModal";
import { TEND_DATA } from "./data";

interface Props {
  active: string;
  children: ReactNode;
}

type NewBatchData = {
  template: string;
  name: string;
  start: string;
  params: Record<string, string | number>;
};

export function AppShell({ active, children }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
  }, []);

  const flash = (message: string) => {
    setToast(message);

    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }

    toastTimerRef.current = window.setTimeout(() => setToast(null), 2400);
  };

  const handleCreate = (data: NewBatchData) => {
    setModalOpen(false);
    flash(`Batch "${data.name}" started.`);
  };

  return (
    <div className="app surface-dark">
      <Sidebar active={active} overdueCount={TEND_DATA.overdue.length} onNew={() => setModalOpen(true)} />
      {children}

      {modalOpen && (
        <NewBatchModal
          templates={TEND_DATA.templates}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <span className="dot" />
          {toast}
        </div>
      )}
    </div>
  );
}
