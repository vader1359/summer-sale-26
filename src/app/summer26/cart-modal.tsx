"use client";

import React, { useEffect, useRef, useState, useCallback, type FormEvent } from "react";
import Image from "next/image";
import { X, Check, User, Phone, Mail, Headphones, ArrowRight, ChevronUp } from "lucide-react";
import { getDictionary, type Language } from "@/lib/i18n";
import { trackFillForm } from "@/lib/analytics/meta-events";
import { useCart, type CartItem } from "./cart-context";
import { localizePreorderProductText } from "./i18n";

interface FormValues {
  name: string;
  phone: string;
  email: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
}

const PRICE_LOCALES: Record<Language, string> = {
  vi: "vi-VN",
  en: "en-US",
  ko: "ko-KR",
};

function formatVndPrice(value: number, language: Language): string {
  return new Intl.NumberFormat(PRICE_LOCALES[language], {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function getDiscountPercent(retailPrice: number, preorderPrice: number): number {
  if (retailPrice <= 0) return 0;
  return Math.max(0, Math.round((1 - preorderPrice / retailPrice) * 100));
}

function getLocalizedCartItem(item: CartItem, language: Language): CartItem {
  if (!item.sourceName || !item.sourceDescription) return item;

  const localized = localizePreorderProductText(
    {
      category: item.category,
      shortName: item.sourceName,
      productName: item.sourceDescription,
    },
    language,
  );

  return {
    ...item,
    categoryLabel: localized.category,
    name: localized.shortName,
    subtitle: localized.productName,
  };
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim()) errors.name = "name";
  if (!values.phone.trim()) {
    errors.phone = "phone";
  } else if (!/^[0-9+\-\s()]{9,15}$/.test(values.phone.trim())) {
    errors.phone = "phoneFormat";
  }
  if (!values.email.trim()) {
    errors.email = "email";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "emailFormat";
  }
  return errors;
}

function hasErrors(errors: FormErrors): boolean {
  return Object.keys(errors).length > 0;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
}

export function CartModal({ isOpen, onClose, language = "vi" }: CartModalProps) {
  const { items, removeItem, clearCart, getItemCount } = useCart();
  const [values, setValues] = useState<FormValues>({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    phone: false,
    email: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [isFormExpanded, setIsFormExpanded] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const touchStartY = useRef<number>(0);
  const touchCurrentY = useRef<number>(0);
  const hasTrackedFormFillRef = useRef(false);

  const t = getDictionary(language).cartModal;
  const localizedItems = items.map((item) => getLocalizedCartItem(item, language));
  const total = items.reduce((sum, item) => sum + item.preorderPrice * item.quantity, 0);

  useEffect(() => {
    document.body.dataset.preorderCartState = isOpen
      ? isFormExpanded
        ? "expanded"
        : "collapsed"
      : "closed";

    return () => {
      if (document.body.dataset.preorderCartState !== "closed") {
        delete document.body.dataset.preorderCartState;
      }
    };
  }, [isOpen, isFormExpanded]);

  // Track the opening element & lock scroll
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement as HTMLElement;
      queueMicrotask(() => {
        setStatus("idle");
        setValues({ name: "", phone: "", email: "" });
        setErrors({});
        setTouched({ name: false, phone: false, email: false });
        setServerError(null);
        setIsFormExpanded(false);
        hasTrackedFormFillRef.current = false;
      });

      // Body scroll lock
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus first focusable
      const timer = setTimeout(() => {
        firstFocusableRef.current?.focus();
      }, 50);

      return () => {
        document.body.style.overflow = previousOverflow;
        clearTimeout(timer);
      };
    }
  }, [isOpen]);

  // Restore focus on close
  useEffect(() => {
    if (!isOpen && triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen]);

  // ESC key listener
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Focus trap
  const handleTabKey = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !modalRef.current) return;
      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [],
  );

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && status !== "submitting") {
      onClose();
    }
  };

  const handleFieldChange = (field: keyof FormValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const next = { ...values, [field]: value };
    setValues(next);
    if (!hasTrackedFormFillRef.current && value.trim()) {
      hasTrackedFormFillRef.current = true;
      trackFillForm({ form_name: "preorder-cart", field_name: field, num_items: items.length });
    }
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleFieldBlur = (field: keyof FormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const v = validate(values);
    setErrors(v);
    setTouched({ name: true, phone: true, email: true });
    if (hasErrors(v)) return;

    setStatus("submitting");
    setServerError(null);

    try {
      const res = await fetch("/api/cart/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          source: "preorder-cart",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
          cartItems: localizedItems.map((item) => ({
            ...item,
            lineTotal: item.preorderPrice * item.quantity,
          })),
          total,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      setStatus("success");
      clearCart();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "unknown");
      setStatus("error");
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchCurrentY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaY = touchStartY.current - touchCurrentY.current;
    if (deltaY > 50) {
      setIsFormExpanded(true);
    } else if (deltaY < -50 && isFormExpanded) {
      setIsFormExpanded(false);
    }
  };

  const fieldError = (field: keyof FormErrors): string | null => {
    const code = errors[field];
    if (!code) return null;
    const map: Record<string, string> = {
      name: t.errorName,
      phone: t.errorPhone,
      phoneFormat: t.errorPhoneFormat,
      email: t.errorEmail,
      emailFormat: t.errorEmailFormat,
    };
    return map[code] ?? null;
  };

  if (!isOpen) return null;

  const itemCount = getItemCount();
  const formLabels = {
    name: t.name,
    phone: t.phone,
    email: t.email,
  };
  const consultationNote = t.description;

  const renderField = ({
    id,
    name,
    label,
    type,
    autoComplete,
    inputMode,
    placeholder,
    icon,
  }: {
    id: string;
    name: keyof FormValues;
    label: string;
    type: string;
    autoComplete: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    placeholder: string;
    icon: React.ReactNode;
  }) => {
    const error = fieldError(name);

    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={id} className="text-[13px] font-medium leading-5 text-[#111111]">
          <span className="text-[#C70500]">*</span> {label}
        </label>
        <div
          className={`flex h-12 items-center gap-3 border-b transition-colors ${
            error ? "border-[#930000]" : "border-[#D8D2CA] focus-within:border-[#111111]"
          }`}
        >
          <span className="grid size-5 shrink-0 place-items-center text-[#777777]" aria-hidden="true">
            {icon}
          </span>
          <input
            id={id}
            name={name}
            type={type}
            inputMode={inputMode}
            autoComplete={autoComplete}
            required
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${id}-error` : undefined}
            placeholder={placeholder}
            value={values[name]}
            onChange={handleFieldChange(name)}
            onBlur={handleFieldBlur(name)}
            className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#111111] outline-none placeholder:text-[#9A9A9A] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "submitting"}
          />
        </div>
        {error && (
          <span id={`${id}-error`} role="alert" className="text-[11px] font-medium text-[#930000]">
            {error}
          </span>
        )}
      </div>
    );
  };

  const renderCartItem = (item: CartItem) => {
    const discountPercent = getDiscountPercent(item.retailPrice, item.preorderPrice);

    return (
      <article key={item.id} className="relative flex gap-4 border border-[#E7E2DD] bg-white p-4 shadow-[0_8px_22px_rgba(17,17,17,0.04)]">
        <div className="relative size-[92px] shrink-0 border border-[#EFEFEF] bg-[#FAFAFA] sm:size-[112px]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="112px"
            className="object-contain p-2"
          />
        </div>
        <div className="min-w-0 flex-1 pr-6">
          <h3 className="overflow-hidden break-words text-[14px] font-semibold leading-5 text-[#111111] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {item.name}
          </h3>
          <p className="mt-1 overflow-hidden break-words text-[12px] leading-4 text-[#777777] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {item.subtitle || item.categoryLabel || item.category}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-[12px] leading-4">
            <span className="text-[#777777] line-through">{formatVndPrice(item.retailPrice, language)}</span>
            {discountPercent > 0 && (
              <span className="inline-flex min-h-5 items-center bg-[#C70500] px-1.5 text-[11px] font-bold leading-none text-white">
                -{discountPercent}%
              </span>
            )}
          </div>
          <p className="mt-1 text-[15px] font-bold leading-5 text-[#111111]">
            {formatVndPrice(item.preorderPrice, language)}
          </p>
        </div>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="absolute right-3 top-3 grid size-7 place-items-center text-[#777777] transition hover:text-[#C70500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
          aria-label={`${t.deleteItem} ${item.name}`}
        >
          <X size={15} />
        </button>
      </article>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch justify-center bg-black/55 md:items-center md:p-6"
      onClick={handleBackdropClick}
      onKeyDown={handleTabKey}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-modal-title"
    >
      <div
        ref={modalRef}
        className="relative flex h-full w-full flex-col overflow-hidden bg-white text-[#111111] shadow-2xl md:h-[min(760px,calc(100vh-48px))] md:max-w-[1180px]"
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-[#EFEFEF] px-5 py-5 sm:px-8 md:px-10 md:py-8">
          <div>
            <h2 id="cart-modal-title" className="text-[32px] font-semibold leading-none tracking-[-0.04em] text-[#111111] sm:text-[40px]">
              {t.cartTitle}
            </h2>
            {itemCount > 0 && (
              <p className="mt-2 text-[13px] leading-5 text-[#777777]">
                {itemCount} · {formatVndPrice(total, language)}
              </p>
            )}
          </div>
          <button
            ref={firstFocusableRef}
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center text-[#111111] transition hover:text-[#C70500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
            aria-label={t.close}
            type="button"
            disabled={status === "submitting"}
          >
            <X size={22} />
          </button>
        </header>

        {status === "success" ? (
          <div className="flex flex-1 items-center justify-center overflow-y-auto px-5 py-10 text-center sm:px-8">
            <div className="w-full max-w-[420px] border border-[#E7E2DD] bg-white p-8 shadow-[0_20px_60px_rgba(17,17,17,0.08)]">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full border-2 border-[#67674B] bg-[#F3F4EE] text-[#67674B]">
                <Check size={26} />
              </div>
              <h3 className="mt-5 text-[22px] font-bold leading-7 tracking-[-0.02em] text-[#111111]">{t.successTitle}</h3>
              <p className="mx-auto mt-3 max-w-[320px] whitespace-pre-line text-[14px] leading-6 text-[#555555]">
                {t.successDescription}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-7 inline-flex h-11 items-center justify-center bg-[#111111] px-7 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
              >
                {t.close}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="hidden flex-1 overflow-y-auto px-5 py-6 sm:px-8 md:grid md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-9 md:px-10 md:py-8 lg:gap-12">
              <form onSubmit={handleSubmit} noValidate className="flex min-h-[520px] flex-col" aria-busy={status === "submitting"}>
                <div className="space-y-5">
                  {renderField({
                    id: "cart-desktop-name",
                    name: "name",
                    label: formLabels.name,
                    type: "text",
                    autoComplete: "name",
                    placeholder: t.namePlaceholder,
                    icon: <User size={18} strokeWidth={1.7} />,
                  })}
                  {renderField({
                    id: "cart-desktop-phone",
                    name: "phone",
                    label: formLabels.phone,
                    type: "tel",
                    autoComplete: "tel",
                    inputMode: "tel",
                    placeholder: t.phonePlaceholder,
                    icon: <Phone size={18} strokeWidth={1.7} />,
                  })}
                  {renderField({
                    id: "cart-desktop-email",
                    name: "email",
                    label: formLabels.email,
                    type: "email",
                    autoComplete: "email",
                    placeholder: t.emailPlaceholder,
                    icon: <Mail size={18} strokeWidth={1.7} />,
                  })}
                </div>

                <div className="mt-7 flex items-center gap-3 rounded-none bg-[#F7F5F1] px-4 py-3 text-[#666666]">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#67674B]" aria-hidden="true">
                    <Headphones size={18} strokeWidth={1.7} />
                  </span>
                  <p className="text-[13px] leading-5">{consultationNote}</p>
                </div>

                {serverError && (
                  <div className="mt-5 border border-[#F1C4C4] bg-[#FFF5F5] p-3 text-[12px] font-medium text-[#930000]" role="alert">
                    {t.errorGeneric} ({serverError})
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-auto flex h-[52px] min-h-[52px] w-full items-center justify-center gap-3 bg-[#67674B] px-5 text-[14px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#4E4E37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67674B] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span>{status === "submitting" ? t.submitting : t.submit}</span>
                  <span className="grid size-7 place-items-center rounded-full bg-white text-[#67674B]" aria-hidden="true">
                    <ArrowRight size={15} strokeWidth={2} />
                  </span>
                </button>
              </form>

              <section className="flex min-h-[420px] flex-col" aria-label={t.cartTitle}>
                <div className="mb-4 flex min-h-8 items-center justify-between gap-4">
                  <p className="text-[14px] font-semibold leading-5 text-[#111111]">
                    {itemCount > 0 ? `${t.cartTitle} (${itemCount})` : t.cartTitle}
                  </p>
                  {items.length > 0 && (
                    <button
                      type="button"
                      onClick={clearCart}
                      disabled={status === "submitting"}
                      className="text-[12px] font-medium text-[#777777] underline underline-offset-2 transition hover:text-[#C70500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {t.deleteTotal}
                    </button>
                  )}
                </div>

                <div className="flex-1 overflow-y-auto pr-1">
                  {localizedItems.length === 0 ? (
                    <div className="flex min-h-[220px] items-center justify-center border border-dashed border-[#D8D2CA] bg-[#FAFAFA] p-6 text-center text-[14px] leading-5 text-[#666666]">
                      {t.cartEmpty}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {localizedItems.map(renderCartItem)}
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="flex flex-1 flex-col overflow-hidden px-5 py-5 pb-24 md:hidden">
              <div className="mb-4 flex min-h-8 items-center justify-between gap-4">
                <p className="text-[14px] font-semibold leading-5 text-[#111111]">
                  {itemCount > 0 ? `${t.cartTitle} (${itemCount})` : t.cartTitle}
                </p>
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    disabled={status === "submitting"}
                    className="text-[12px] font-medium text-[#777777] underline underline-offset-2 transition hover:text-[#C70500] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t.deleteTotal}
                  </button>
                )}
              </div>

              <div className="flex-1 overflow-y-auto">
                {localizedItems.length === 0 ? (
                  <div className="flex min-h-[220px] items-center justify-center border border-dashed border-[#D8D2CA] bg-[#FAFAFA] p-6 text-center text-[14px] leading-5 text-[#666666]">
                    {t.cartEmpty}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {localizedItems.map(renderCartItem)}
                  </div>
                )}
              </div>
            </div>

            <div
              className={`fixed bottom-0 left-0 right-0 z-10 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.14)] transition-transform duration-300 md:hidden ${
                isFormExpanded ? "translate-y-0" : "translate-y-[calc(100%-64px)]"
              }`}
              style={{
                maxHeight: isFormExpanded ? "85vh" : "64px",
                borderTopLeftRadius: "18px",
                borderTopRightRadius: "18px",
              }}
            >
              <button
                type="button"
                className={`flex min-h-16 w-full items-center px-5 text-left transition-colors ${
                  isFormExpanded ? "bg-white" : "bg-[#67674B] text-white"
                }`}
                onClick={() => setIsFormExpanded(true)}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                aria-expanded={isFormExpanded}
              >
                <div className="flex w-full items-center justify-between gap-4">
                  <h3 className={`text-[15px] font-bold uppercase tracking-[0.08em] ${isFormExpanded ? "text-[#111111]" : "text-white"}`}>
                    {isFormExpanded ? t.title : t.collapsedTitle}
                  </h3>
                  {!isFormExpanded ? (
                    <span className="shrink-0 bg-white px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-[#67674B]">
                      {t.collapsedCta}
                    </span>
                  ) : (
                    <ChevronUp size={24} className="shrink-0 text-[#111111]" />
                  )}
                </div>
              </button>

              <div className={`overflow-y-auto px-5 pb-6 ${isFormExpanded ? "max-h-[calc(85vh-80px)]" : "hidden"}`}>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col pt-1" aria-busy={status === "submitting"}>
                  <div className="space-y-5">
                    {renderField({
                      id: "cart-mobile-name",
                      name: "name",
                      label: formLabels.name,
                      type: "text",
                      autoComplete: "name",
                      placeholder: t.namePlaceholder,
                      icon: <User size={18} strokeWidth={1.7} />,
                    })}
                    {renderField({
                      id: "cart-mobile-phone",
                      name: "phone",
                      label: formLabels.phone,
                      type: "tel",
                      autoComplete: "tel",
                      inputMode: "tel",
                      placeholder: t.phonePlaceholder,
                      icon: <Phone size={18} strokeWidth={1.7} />,
                    })}
                    {renderField({
                      id: "cart-mobile-email",
                      name: "email",
                      label: formLabels.email,
                      type: "email",
                      autoComplete: "email",
                      placeholder: t.emailPlaceholder,
                      icon: <Mail size={18} strokeWidth={1.7} />,
                    })}
                  </div>

                  <div className="mt-7 flex items-center gap-3 rounded-none bg-[#F7F5F1] px-4 py-3 text-[#666666]">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-[#67674B]" aria-hidden="true">
                      <Headphones size={18} strokeWidth={1.7} />
                    </span>
                    <p className="text-[13px] leading-5">{consultationNote}</p>
                  </div>

                  {serverError && (
                    <div className="mt-5 border border-[#F1C4C4] bg-[#FFF5F5] p-3 text-[12px] font-medium text-[#930000]" role="alert">
                      {t.errorGeneric} ({serverError})
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="mt-6 flex h-[52px] min-h-[52px] w-full items-center justify-center gap-3 bg-[#67674B] px-5 text-[14px] font-bold uppercase tracking-[0.08em] text-white transition hover:bg-[#4E4E37] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#67674B] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span>{status === "submitting" ? t.submitting : t.submit}</span>
                    <span className="grid size-7 place-items-center rounded-full bg-white text-[#67674B]" aria-hidden="true">
                      <ArrowRight size={15} strokeWidth={2} />
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
