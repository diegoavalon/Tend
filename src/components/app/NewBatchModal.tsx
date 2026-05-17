import { useState, useEffect } from "react";
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
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <div className="modal-head">
          <h2 className="modal-title">New batch</h2>
          <button type="button" className="btn-secondary modal-close" onClick={onClose} aria-label="Close">
            <Icon name="x" size={14} />
          </button>
        </div>

        <div>
          <label>1 · Pick a template</label>
          <div className="template-grid">
            {templates.map((t) => (
              <button type="button" key={t.id} className={"template-pick" + (picked === t.id ? " selected" : "")} onClick={() => setPicked(t.id)}>
                <span className="name">{t.name}</span>
                <span className="blurb">{t.blurb}</span>
              </button>
            ))}
          </div>
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
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary">Start batch <span aria-hidden="true">→</span></button>
        </div>
      </form>
    </div>
  );
}
