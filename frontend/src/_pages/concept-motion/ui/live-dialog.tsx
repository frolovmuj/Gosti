'use client';

import { type ReactNode, useEffect, useId, useRef } from 'react';

import { cn } from 'cn';
import { X } from 'lucide-react';

type LiveDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  sheet?: boolean;
};

export function LiveDialog({
  open,
  title,
  onClose,
  children,
  sheet,
}: LiveDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    // Native modality provides focus containment, Escape and focus restoration.
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    // Deleting the focused selection row must not leave focus on the document.
    const dialog = ref.current;
    if (open && dialog?.open && !dialog.contains(document.activeElement)) {
      dialog.querySelector('button')?.focus();
    }
  });

  return (
    <dialog
      ref={ref}
      className={cn('wow-dialog', sheet && 'wow-dialog-sheet')}
      aria-labelledby={titleId}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input:not([disabled]), [tabindex="0"]',
          ),
        ).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          event.currentTarget.close();
        }
      }}
    >
      <div className="wow-dialog-heading">
        <h2 id={titleId}>{title}</h2>
        <button
          type="button"
          className="wow-icon-button"
          aria-label="Закрыть окно"
          onClick={() => ref.current?.close()}
        >
          <X size={22} aria-hidden />
        </button>
      </div>
      {children}
    </dialog>
  );
}
