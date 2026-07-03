"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Mail, Phone, User } from "lucide-react";
import { trackFillForm } from "@/lib/analytics/meta-events";
import type { Language } from "./i18n";

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

const CONTACT_GATE_STORAGE_KEY = "summer26_contact_gate_completed_v1";
const CONTACT_GATE_PROFILE_STORAGE_KEY = "summer26_contact_gate_profile_v1";
const CONTACT_GATE_WISTIA_SRC =
  "https://fast.wistia.net/embed/iframe/09rnmxq8yg?videoFoam=true&fitStrategy=contain&autoPlay=true&silentAutoPlay=allow&muted=true&volume=0&endVideoBehavior=loop&controlsVisibleOnLoad=false&playbar=false&fullscreenButton=false&smallPlayButton=false&volumeControl=false";

const CONTACT_GATE_TEXT: Record<
  Language,
  {
    eyebrow: string;
    title: string;
    description: string;
    validity: string;
    name: string;
    phone: string;
    email: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDescription: string;
    errorGeneric: string;
    errorName: string;
    errorPhone: string;
    errorPhoneFormat: string;
    errorEmail: string;
    errorEmailFormat: string;
  }
> = {
  vi: {
    eyebrow: "SUMMER SALE",
    title: "Đăng ký để xem ưu đãi",
    description: "Để lại thông tin để tiếp tục xem danh sách sản phẩm Summer Sale và nhận tư vấn từ nanoHome.",
    validity: "Chương trình diễn ra từ 03/07/2026 đến 05/07/2026.",
    name: "Họ và tên",
    phone: "Số điện thoại",
    email: "Email",
    namePlaceholder: "Nhập họ và tên",
    phonePlaceholder: "Nhập số điện thoại",
    emailPlaceholder: "Nhập email của bạn",
    submit: "Tiếp tục xem ưu đãi",
    submitting: "Đang gửi...",
    successTitle: "Cảm ơn bạn!",
    successDescription: "Thông tin đã được ghi nhận. Bạn có thể tiếp tục xem ưu đãi.",
    errorGeneric: "Đã có lỗi xảy ra. Vui lòng thử lại.",
    errorName: "Vui lòng nhập họ và tên",
    errorPhone: "Vui lòng nhập số điện thoại",
    errorPhoneFormat: "Số điện thoại không hợp lệ (9-11 chữ số)",
    errorEmail: "Vui lòng nhập email",
    errorEmailFormat: "Email không hợp lệ",
  },
  en: {
    eyebrow: "SUMMER SALE",
    title: "Register to view the sale",
    description: "Leave your contact details to continue viewing the Summer Sale list and receive advice from nanoHome.",
    validity: "The event runs from 03/07/2026 to 05/07/2026.",
    name: "Full name",
    phone: "Phone number",
    email: "Email",
    namePlaceholder: "Enter your full name",
    phonePlaceholder: "Enter your phone number",
    emailPlaceholder: "Enter your email",
    submit: "Continue to the sale",
    submitting: "Submitting...",
    successTitle: "Thank you!",
    successDescription: "Your information has been received. You can continue viewing the sale.",
    errorGeneric: "Something went wrong. Please try again.",
    errorName: "Please enter your full name",
    errorPhone: "Please enter your phone number",
    errorPhoneFormat: "Phone number is invalid (9-11 digits)",
    errorEmail: "Please enter your email",
    errorEmailFormat: "Email is invalid",
  },
  ko: {
    eyebrow: "SUMMER SALE",
    title: "혜택을 보려면 정보를 입력하세요",
    description: "Summer Sale 상품 목록을 계속 보고 nanoHome 상담을 받으려면 연락처를 남겨 주세요.",
    validity: "행사는 2026.07.03부터 2026.07.05까지 진행됩니다.",
    name: "성함",
    phone: "전화번호",
    email: "이메일",
    namePlaceholder: "성함을 입력하세요",
    phonePlaceholder: "전화번호를 입력하세요",
    emailPlaceholder: "이메일을 입력하세요",
    submit: "혜택 계속 보기",
    submitting: "전송 중...",
    successTitle: "감사합니다!",
    successDescription: "정보가 접수되었습니다. 혜택을 계속 확인하실 수 있습니다.",
    errorGeneric: "오류가 발생했습니다. 다시 시도해 주세요.",
    errorName: "성함을 입력해 주세요",
    errorPhone: "전화번호를 입력해 주세요",
    errorPhoneFormat: "전화번호가 올바르지 않습니다 (9-11자리)",
    errorEmail: "이메일을 입력해 주세요",
    errorEmailFormat: "이메일이 올바르지 않습니다",
  },
};

export function hasCompletedContactGate(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.localStorage.getItem(CONTACT_GATE_STORAGE_KEY) === "true" ||
    window.sessionStorage.getItem(CONTACT_GATE_STORAGE_KEY) === "true" ||
    hasStoredContactGateProfile()
  );
}

function getStoredContactGateProfile(): FormValues {
  if (typeof window === "undefined") return { name: "", phone: "", email: "" };
  try {
    const raw = window.localStorage.getItem(CONTACT_GATE_PROFILE_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      phone: typeof parsed.phone === "string" ? parsed.phone : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
    };
  } catch {
    return { name: "", phone: "", email: "" };
  }
}

function hasStoredContactGateProfile(): boolean {
  return !hasErrors(validate(getStoredContactGateProfile()));
}

function markContactGateCompleted(values: FormValues) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    CONTACT_GATE_PROFILE_STORAGE_KEY,
    JSON.stringify({
      name: values.name.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
    }),
  );
  window.localStorage.setItem(CONTACT_GATE_STORAGE_KEY, "true");
  window.sessionStorage.setItem(CONTACT_GATE_STORAGE_KEY, "true");
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

interface ContactGateModalProps {
  isOpen: boolean;
  language: Language;
  onUnlock: () => void;
}

export function ContactGateModal({ isOpen, language, onUnlock }: ContactGateModalProps) {
  const t = CONTACT_GATE_TEXT[language];
  const [values, setValues] = useState<FormValues>(() => getStoredContactGateProfile());
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormValues, boolean>>({
    name: false,
    phone: false,
    email: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const hasTrackedFormFillRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => nameInputRef.current?.focus(), 80);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;
    const modal = modalRef.current;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const focusable = modal.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    modal.addEventListener("keydown", handleKeyDown);
    return () => modal.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

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

  const handleFieldChange = (field: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...values, [field]: event.target.value };
    setValues(next);
    if (!hasTrackedFormFillRef.current && event.target.value.trim()) {
      hasTrackedFormFillRef.current = true;
      trackFillForm({ form_name: "summer26-contact-gate", field_name: field });
    }
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleFieldBlur = (field: keyof FormValues) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate(values));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, email: true });
    if (hasErrors(nextErrors)) return;

    setStatus("submitting");
    setServerError(null);
    try {
      const res = await fetch("/api/contact-gate/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          phone: values.phone.trim(),
          email: values.email.trim(),
          source: "summer26-contact-gate",
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      setStatus("success");
      markContactGateCompleted(values);
      window.setTimeout(onUnlock, 800);
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "unknown");
      setStatus("error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 p-4 backdrop-blur-[5px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="summer26-contact-gate-title"
    >
      <div
        ref={modalRef}
        className="relative flex max-h-[calc(100vh-32px)] w-full max-w-[860px] overflow-hidden rounded-[8px] bg-white text-[#111111] shadow-[0_24px_60px_rgba(0,0,0,0.25)] md:min-h-[560px] md:flex-row"
      >
        <div className="hidden w-[454px] shrink-0 items-center justify-center bg-white p-8 md:flex">
          <div className="relative aspect-[9/16] w-full max-w-[315px] overflow-hidden bg-white">
            <iframe
              src={CONTACT_GATE_WISTIA_SRC}
              title="nanoHome Summer Sale video"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0 outline-none"
            />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto p-6 md:p-7">
          {status === "success" ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
              <span className="grid size-14 place-items-center rounded-full border-2 border-[#5A5B3D] text-[#5A5B3D]">
                <Check size={30} strokeWidth={2.4} />
              </span>
              <h2 className="text-[22px] font-bold leading-7 text-[#111111]">{t.successTitle}</h2>
              <p className="max-w-[310px] text-[14px] leading-6 text-[#666666]">
                {t.successDescription}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-1 flex-col" aria-busy={status === "submitting"}>
              <span className="mb-2 inline-flex w-fit rounded-full bg-black/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black">
                {t.eyebrow}
              </span>
              <h2 id="summer26-contact-gate-title" className="text-[24px] font-bold leading-[1.2] tracking-[-0.02em] text-[#111111]">
                {t.title}
              </h2>
              <p className="mt-3 text-[14px] leading-6 text-[#666666]">{t.description}</p>

              <div className="mt-6 flex flex-col gap-4">
                <GateField
                  id="summer26-gate-name"
                  name="name"
                  label={t.name}
                  type="text"
                  autoComplete="name"
                  placeholder={t.namePlaceholder}
                  value={values.name}
                  onChange={handleFieldChange("name")}
                  onBlur={handleFieldBlur("name")}
                  error={fieldError("name")}
                  inputRef={nameInputRef}
                  icon={<User size={18} strokeWidth={1.7} />}
                />
                <GateField
                  id="summer26-gate-phone"
                  name="phone"
                  label={t.phone}
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder={t.phonePlaceholder}
                  value={values.phone}
                  onChange={handleFieldChange("phone")}
                  onBlur={handleFieldBlur("phone")}
                  error={fieldError("phone")}
                  icon={<Phone size={18} strokeWidth={1.7} />}
                />
                <GateField
                  id="summer26-gate-email"
                  name="email"
                  label={t.email}
                  type="email"
                  autoComplete="email"
                  placeholder={t.emailPlaceholder}
                  value={values.email}
                  onChange={handleFieldChange("email")}
                  onBlur={handleFieldBlur("email")}
                  error={fieldError("email")}
                  icon={<Mail size={18} strokeWidth={1.7} />}
                />
              </div>

              {status === "error" && serverError ? (
                <p role="alert" className="mt-4 border border-[#F1C4C4] bg-[#FFF5F5] p-3 text-[12px] font-medium leading-4 text-[#930000]">
                  {t.errorGeneric} ({serverError})
                </p>
              ) : null}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-[6px] bg-black px-4 text-[14px] font-semibold text-white transition-colors hover:bg-[#333333] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span>{status === "submitting" ? t.submitting : t.submit}</span>
                <ArrowRight size={18} strokeWidth={2} />
              </button>

              <p className="mt-3 text-[11px] leading-4 text-[#666666]">{t.validity}</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

interface GateFieldProps {
  id: string;
  name: string;
  label: string;
  type: "text" | "tel" | "email";
  autoComplete: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  placeholder: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  error: string | null;
  icon: React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

function GateField({
  id,
  name,
  label,
  type,
  autoComplete,
  inputMode,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  icon,
  inputRef,
}: GateFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[13px] font-medium leading-5 text-[#111111]">
        <span className="text-[#C70500]">*</span> {label}
      </label>
      <div
        className={`flex h-12 items-center gap-3 border-b transition-colors ${
          error ? "border-[#C70500]" : "border-[#DADADA] focus-within:border-[#5A5B3D]"
        }`}
      >
        <span className="grid size-5 shrink-0 place-items-center text-[#777777]" aria-hidden="true">
          {icon}
        </span>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          required
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#111111] outline-none placeholder:text-[#9A9A9A] disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[11px] font-medium leading-4 text-[#930000]">
          {error}
        </p>
      ) : null}
    </div>
  );
}
