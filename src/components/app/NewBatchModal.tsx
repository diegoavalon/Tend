import { useState, useEffect } from "react";
import { Dialog, Radio, RadioGroup } from "@base-ui/react";
import { Icon } from "./Icons";

interface Template {
  id: string;
  name: string;
  blurb: string;
  defaultParams: Record<string, string | number>;
}

interface Props {
  templates: readonly Template[];
  onClose: () => void;
  onCreate: (data: { template: string; name: string; start: string; params: Record<string, string | number> }) => void;
}

export function NewBatchModal({ templates, onClose, onCreate }: Props) {
  const [picked, setPicked] = useState(templates[0].id);
  const [name, setName] = useState("");
  const [start, setStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [params, setParams] = useState<Record<string, string | number>>(templates[0].defaultParams);

  const tpl = templates.find((t) => t.id === picked)!;

  useEffect(() => {
    setParams(tpl.defaultParams);
    setName((n) => n || `${tpl.name.split(" ")[0].toLowerCase()} ${new Date().toLocaleDateString("en-US", { weekday: "short" }).toLowerCase()}`);
  }, [picked]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ template: picked, name: name.trim() || `New ${tpl.name}`, start, params });
  };

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Backdrop className="modal-backdrop" />
        <div className="modal-shell">
          <Dialog.Popup className="modal">
            <form className="modal-form" onSubmit={submit}>
              <div className="modal-head">
                <Dialog.Title className="modal-title">New batch</Dialog.Title>
                <Dialog.Close aria-label="Close" className="btn-secondary modal-close" type="button">
                  <Icon name="x" size={14} />
                </Dialog.Close>
              </div>

              <div>
                <label>1 · Pick a template</label>
                <RadioGroup
                  className="template-grid"
                  name="batch-template"
                  value={picked}
                  onValueChange={(nextValue) => setPicked(String(nextValue))}
                >
                  {templates.map((t) => (
                    <Radio.Root key={t.id} className="template-pick" value={t.id}>
                      <span className="template-pick-copy">
                        <span className="name">{t.name}</span>
                        <span className="blurb">{t.blurb}</span>
                      </span>
                      <Radio.Indicator className="template-pick-indicator">
                        <Icon name="check" size={12} strokeWidth={2.5} />
                      </Radio.Indicator>
                    </Radio.Root>
                  ))}
                </RadioGroup>
              </div>

              <div>
                <label>2 · Parameters</label>
                <div className="params-grid">
                  {Object.entries(params).map(([k, v]) => (
                    <div key={k}>
                      <label className="label-inline">{k.replace(/_/g, " ")}</label>
                      <input value={v} onChange={(e) => setParams({ ...params, [k]: e.target.value })} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-grid-2">
                <div>
                  <label>3 · Start date</label>
                  <input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                </div>
                <div>
                  <label>4 · Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. mung beans jar A" />
                </div>
              </div>

              <div className="modal-actions">
                <Dialog.Close className="btn-secondary" type="button">Cancel</Dialog.Close>
                <button type="submit" className="btn-primary">Start batch <span aria-hidden="true">→</span></button>
              </div>
            </form>
          </Dialog.Popup>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
