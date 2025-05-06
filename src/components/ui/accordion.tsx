import * as React from "react";

export function Accordion({ type, collapsible, className, children }: { type?: string; collapsible?: boolean; className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}

export function AccordionItem({ value, children }: { value: string; children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="border-b last:border-b-0">
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { open, setOpen })
          : child
      )}
    </div>
  );
}

export function AccordionTrigger({ children, open, setOpen }: { children: React.ReactNode; open?: boolean; setOpen?: (v: boolean) => void }) {
  return (
    <button type="button" className="w-full flex justify-between items-center py-3 font-medium text-left transition hover:text-indigo-600" onClick={() => setOpen && setOpen(!open)}>
      {children}
      <span className={`ml-2 transition-transform ${open ? "rotate-90" : "rotate-0"}`}>▶</span>
    </button>
  );
}

export function AccordionContent({ children, open }: { children: React.ReactNode; open?: boolean }) {
  return (
    <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
      <div className="pb-4">{children}</div>
    </div>
  );
}