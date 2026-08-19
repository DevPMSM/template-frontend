"use client";

/**
 * Select.tsx
 * ------------------------------------------------------------------------
 * Componente de Select construído do zero (sem Radix, sem headlessui).
 * Suporta seleção única e múltipla, é 100% estilizável via Tailwind
 * (nenhuma classe fica "presa" — tudo pode ser sobrescrito pela prop
 * `classNames`) e é totalmente acessível (teclado + ARIA).
 *
 * Dependências necessárias (leves e muito comuns em projetos Next.js):
 *   npm install clsx tailwind-merge
 *
 * Uso básico:
 *   <Select
 *     options={[{ value: "a", label: "Opção A" }]}
 *     value={value}
 *     onChange={setValue}
 *   />
 *
 * Uso múltiplo:
 *   <Select
 *     multiple
 *     options={options}
 *     value={values}
 *     onChange={setValues}
 *   />
 * ------------------------------------------------------------------------
 */

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
  useId,
  useCallback,
} from "react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createPortal } from "react-dom";

// ---------------------------------------------------------------------------
// Utilitário de classes (mescla defaults + overrides sem conflito)
// ---------------------------------------------------------------------------

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ---------------------------------------------------------------------------
// Ícones (inline, sem dependência de lib de ícones)
// ---------------------------------------------------------------------------

function ChevronIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 7.5L10 12.5L15 7.5" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 10.5L8 14.5L16 6" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 5L15 15M15 5L5 15" />
    </svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="M17 17L13.5 13.5" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Tipos públicos
// ---------------------------------------------------------------------------

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  description?: string;
}

interface OptionState {
  selected: boolean;
  active: boolean;
  disabled: boolean;
}

/** Todas as classes são opcionais: o que não for passado usa o visual padrão. */
export interface SelectClassNames {
  wrapper?: string;
  label?: string;
  trigger?: string;
  triggerOpen?: string;
  triggerDisabled?: string;
  triggerError?: string;
  valueContainer?: string;
  placeholder?: string;
  chip?: string;
  chipRemove?: string;
  chevron?: string;
  clearButton?: string;
  dropdown?: string;
  searchWrapper?: string;
  searchInput?: string;
  optionsList?: string;
  option?: string;
  optionActive?: string;
  optionSelected?: string;
  optionDisabled?: string;
  optionIcon?: string;
  checkIcon?: string;
  emptyMessage?: string;
  errorMessage?: string;
}

interface BaseSelectProps<T> {
  /** Lista de opções disponíveis. */
  options: SelectOption<T>[];
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  /** Exibe um campo de busca dentro do dropdown. */
  searchable?: boolean;
  /** Exibe um botão para limpar a seleção. */
  clearable?: boolean;
  /** Altura máxima (px) da lista de opções antes de rolar. Padrão: 260. */
  maxHeight?: number;
  /** Mensagem exibida quando a busca não encontra nada. */
  emptyMessage?: string;
  /** Usado se o select estiver dentro de um <form> nativo (input hidden). */
  name?: string;
  id?: string;
  /** Mensagem de erro exibida abaixo do campo (também estiliza a borda). */
  error?: string;
  /** Sobrescreve qualquer classe interna do componente. */
  classNames?: SelectClassNames;
  /** Quantos chips mostrar antes de agrupar em "+N" (modo múltiplo). */
  maxVisibleChips?: number;
}

interface SingleSelectProps<T> extends BaseSelectProps<T> {
  multiple?: false;
  value: T | null;
  onChange: (value: T | null) => void;
  renderOption?: (
    option: SelectOption<T>,
    state: OptionState
  ) => React.ReactNode;
  renderValue?: (
    selected: SelectOption<T> | null
  ) => React.ReactNode;
}

interface MultiSelectProps<T> extends BaseSelectProps<T> {
  multiple: true;
  value: T[];
  onChange: (value: T[]) => void;
  /** Fecha o dropdown a cada seleção. Padrão: false (fica aberto p/ marcar vários). */
  closeOnSelect?: boolean;
  renderOption?: (
    option: SelectOption<T>,
    state: OptionState
  ) => React.ReactNode;
  renderValue?: (
    selected: SelectOption<T>[]
  ) => React.ReactNode;
}

export type SelectProps<T> =
  SingleSelectProps<T> | MultiSelectProps<T>;

// ---------------------------------------------------------------------------
// Classes padrão (paleta neutra + acento configurável via CSS var opcional)
// ---------------------------------------------------------------------------

const defaultClasses: Required<
  Pick<
    SelectClassNames,
    | "wrapper"
    | "label"
    | "trigger"
    | "triggerOpen"
    | "triggerDisabled"
    | "triggerError"
    | "valueContainer"
    | "placeholder"
    | "chip"
    | "chipRemove"
    | "chevron"
    | "clearButton"
    | "dropdown"
    | "searchWrapper"
    | "searchInput"
    | "optionsList"
    | "option"
    | "optionActive"
    | "optionSelected"
    | "optionDisabled"
    | "optionIcon"
    | "checkIcon"
    | "emptyMessage"
    | "errorMessage"
  >
> = {
  wrapper: "relative flex w-full flex-col gap-1.5",
  label: "text-sm font-medium text-slate-700",
  trigger:
    "flex w-full min-h-[42px] items-center justify-between gap-2 rounded-lg border border-input bg-white px-3 py-2 text-left text-sm text-slate-900 outline-none transition-colors  duration-100 hover:border-[#4c65ac] focus:border-[#4c65ac]",
  triggerOpen: "border-[#4c65ac]",
  triggerDisabled:
    "cursor-not-allowed bg-slate-50 text-slate-400 opacity-70",
  triggerError:
    "border-red-400 focus:border-red-500 focus:ring-red-200",
  valueContainer:
    "flex flex-1 flex-wrap items-center gap-1.5 overflow-hidden",
  placeholder: "select-none text-slate-400",
  chip: "flex items-center gap-1 rounded-md bg-[#4c65ac]/10 px-2 py-0.5 text-xs font-medium text-[#4c65ac]",
  chipRemove: "rounded-full p-0.5 hover:bg-[#4c65ac]/20",
  chevron:
    "h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200",
  clearButton:
    "shrink-0 rounded-full p-0.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600",
  dropdown:
    "absolute z-50 w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg",
  searchWrapper:
    "flex items-center gap-2 border-b border-slate-100 px-3 py-2",
  searchInput:
    "w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400",
  optionsList: "overflow-y-auto py-1",
  option:
    "flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 transition-colors",
  optionActive: "bg-slate-100",
  optionSelected:
    "bg-[#4c65ac]/10 text-[#4c65ac] font-medium",
  optionDisabled: "cursor-not-allowed text-slate-300",
  optionIcon:
    "flex h-4 w-4 items-center justify-center text-slate-400",
  checkIcon: "h-4 w-4 text-[#4c65ac]",
  emptyMessage:
    "px-3 py-6 text-center text-sm text-slate-400",
  errorMessage: "text-xs font-medium text-red-500",
};

// ---------------------------------------------------------------------------
// Implementação interna (recebe o union type já "achatado")
// ---------------------------------------------------------------------------

function SelectImpl<T>(props: SelectProps<T>) {
  const {
    options,
    placeholder = "Selecione...",
    label,
    disabled = false,
    searchable = false,
    clearable = false,
    maxHeight = 260,
    emptyMessage = "Nenhuma opção encontrada",
    name,
    id,
    error,
    classNames = {},
    maxVisibleChips = 3,
    multiple,
  } = props;

  const cx = defaultClasses;
  const c = classNames;

  const selectedValues: T[] = multiple
    ? ((props.value as T[]) ?? [])
    : props.value != null
      ? [props.value as T]
      : [];

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuRect, setMenuRect] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  const generatedId = useId();
  const baseId = id ?? generatedId;
  const listboxId = `${baseId}-listbox`;

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const optionRefs = useRef<Array<HTMLDivElement | null>>(
    []
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || search.trim() === "") return options;
    const q = search.trim().toLowerCase();
    return options.filter((o) =>
      o.label.toLowerCase().includes(q)
    );
  }, [options, search, searchable]);

  const isSelected = useCallback(
    (opt: SelectOption<T>) =>
      selectedValues.includes(opt.value),
    [selectedValues]
  );

  // -- Fechar ao clicar fora --------------------------------------------
  useEffect(() => {
    function handlePointerDown(e: MouseEvent) {
      if (!containerRef.current) return;
      if (
        !containerRef.current.contains(e.target as Node) &&
        !dropdownRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener(
      "mousedown",
      handlePointerDown
    );
    return () =>
      document.removeEventListener(
        "mousedown",
        handlePointerDown
      );
  }, []);

  // -- Posiciona o dropdown fixo na viewport (sobrepõe dialogs) ----------
  const updateMenuPosition = useCallback(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const searchHeight = searchable ? 44 : 0;
    const estimated =
      Math.min(maxHeight, 320) + searchHeight;
    const spaceBelow = window.innerHeight - rect.bottom;
    const shouldDropUp =
      spaceBelow < estimated && rect.top > estimated;

    const listMaxHeight = Math.min(
      maxHeight,
      Math.max(
        100,
        (shouldDropUp ? rect.top : spaceBelow) -
          6 -
          searchHeight
      )
    );
    const totalHeight = listMaxHeight + searchHeight;

    setMenuRect({
      top: shouldDropUp
        ? rect.top - totalHeight - 6
        : rect.bottom + 6,
      left: rect.left,
      width: rect.width,
      maxHeight: listMaxHeight,
    });
  }, [open, maxHeight, searchable]);

  useLayoutEffect(() => {
    if (!open) return;
    updateMenuPosition();
    const onScroll = () => updateMenuPosition();
    const onResize = () => updateMenuPosition();
    document.addEventListener("scroll", onScroll, {
      capture: true,
    });
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("scroll", onScroll, {
        capture: true,
      });
      window.removeEventListener("resize", onResize);
    };
  }, [open, updateMenuPosition]);

  // -- Foca a busca (ou o trigger) ao abrir -------------------------------
  useEffect(() => {
    if (!open) return;
    setActiveIndex(0);
    if (searchable) {
      requestAnimationFrame(() =>
        searchInputRef.current?.focus()
      );
    }
  }, [open, searchable]);

  // -- Garante que a opção ativa fique visível ----------------------------
  useEffect(() => {
    optionRefs.current[activeIndex]?.scrollIntoView({
      block: "nearest",
    });
  }, [activeIndex]);

  const commitChange = useCallback(
    (
      option: SelectOption<T>,
      opts?: { forceClose?: boolean }
    ) => {
      if (option.disabled) return;

      if (multiple) {
        const exists = selectedValues.includes(
          option.value
        );
        const next = exists
          ? selectedValues.filter((v) => v !== option.value)
          : [...selectedValues, option.value];
        (props as MultiSelectProps<T>).onChange(next);
        if (
          opts?.forceClose ||
          (props as MultiSelectProps<T>).closeOnSelect
        ) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      } else {
        (props as SingleSelectProps<T>).onChange(
          option.value
        );
        setOpen(false);
        setSearch("");
        triggerRef.current?.focus();
      }
    },
    [multiple, props, selectedValues]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (multiple) {
        (props as MultiSelectProps<T>).onChange([]);
      } else {
        (props as SingleSelectProps<T>).onChange(null);
      }
    },
    [multiple, props]
  );

  const removeChip = useCallback(
    (e: React.MouseEvent, value: T) => {
      e.stopPropagation();
      if (!multiple) return;
      (props as MultiSelectProps<T>).onChange(
        selectedValues.filter((v) => v !== value)
      );
    },
    [multiple, props, selectedValues]
  );

  // -- Navegação por teclado ----------------------------------------------
  const enabledIndexes = useMemo(
    () =>
      filteredOptions
        .map((o, i) => (o.disabled ? -1 : i))
        .filter((i) => i !== -1),
    [filteredOptions]
  );

  function moveActive(direction: 1 | -1) {
    if (enabledIndexes.length === 0) return;
    const currentPos = enabledIndexes.indexOf(activeIndex);
    let nextPos = currentPos + direction;
    if (nextPos < 0) nextPos = enabledIndexes.length - 1;
    if (nextPos >= enabledIndexes.length) nextPos = 0;
    setActiveIndex(enabledIndexes[nextPos]);
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        if (!open) {
          setOpen(true);
        } else {
          moveActive(e.key === "ArrowDown" ? 1 : -1);
        }
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (!open) {
          setOpen(true);
        } else if (filteredOptions[activeIndex]) {
          commitChange(filteredOptions[activeIndex]);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
          setSearch("");
        }
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  function handleListKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        moveActive(1);
        break;
      case "ArrowUp":
        e.preventDefault();
        moveActive(-1);
        break;
      case "Home":
        e.preventDefault();
        if (enabledIndexes.length)
          setActiveIndex(enabledIndexes[0]);
        break;
      case "End":
        e.preventDefault();
        if (enabledIndexes.length)
          setActiveIndex(
            enabledIndexes[enabledIndexes.length - 1]
          );
        break;
      case "Enter":
        e.preventDefault();
        if (filteredOptions[activeIndex])
          commitChange(filteredOptions[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setSearch("");
        triggerRef.current?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        break;
    }
  }

  // -- Render do valor selecionado -----------------------------------------
  function renderTriggerContent() {
    if (multiple) {
      const selectedOptions = options.filter((o) =>
        selectedValues.includes(o.value)
      );
      const customRender = (props as MultiSelectProps<T>)
        .renderValue;
      if (customRender)
        return customRender(selectedOptions);
      if (selectedOptions.length === 0) {
        return (
          <span
            className={cn(cx.placeholder, c.placeholder)}
          >
            {placeholder}
          </span>
        );
      }
      const visible = selectedOptions.slice(
        0,
        maxVisibleChips
      );
      const hiddenCount =
        selectedOptions.length - visible.length;
      return (
        <>
          {visible.map((opt) => (
            <span
              key={String(opt.value)}
              className={cn(cx.chip, c.chip)}
            >
              {opt.label}
              <button
                type="button"
                aria-label={`Remover ${opt.label}`}
                className={cn(cx.chipRemove, c.chipRemove)}
                onClick={(e) => removeChip(e, opt.value)}
              >
                <XIcon className="h-3 w-3" />
              </button>
            </span>
          ))}
          {hiddenCount > 0 && (
            <span className={cn(cx.chip, c.chip)}>
              +{hiddenCount}
            </span>
          )}
        </>
      );
    }

    const selectedOption =
      options.find((o) => o.value === props.value) ?? null;
    const customRender = (props as SingleSelectProps<T>)
      .renderValue;
    if (customRender) return customRender(selectedOption);
    if (!selectedOption) {
      return (
        <span className={cn(cx.placeholder, c.placeholder)}>
          {placeholder}
        </span>
      );
    }
    return (
      <span className="flex items-center gap-2 truncate">
        {selectedOption.icon && (
          <span className={cn(cx.optionIcon, c.optionIcon)}>
            {selectedOption.icon}
          </span>
        )}
        <span className="truncate">
          {selectedOption.label}
        </span>
      </span>
    );
  }

  const hasValue = multiple
    ? selectedValues.length > 0
    : props.value != null;

  return (
    <div
      ref={containerRef}
      className={cn(cx.wrapper, c.wrapper)}
    >
      {label && (
        <label
          htmlFor={baseId}
          className={cn(cx.label, c.label)}
        >
          {label}
        </label>
      )}

      {/* input hidden — útil para formulários nativos / FormData */}
      {name && (
        <input
          type="hidden"
          name={name}
          value={
            multiple
              ? selectedValues.join(",")
              : ((props.value as string) ?? "")
          }
        />
      )}

      <div
        ref={triggerRef}
        id={baseId}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((v) => !v)}
        onKeyDown={handleTriggerKeyDown}
        className={cn(
          cx.trigger,
          c.trigger,
          open && cn(cx.triggerOpen, c.triggerOpen),
          disabled &&
            cn(cx.triggerDisabled, c.triggerDisabled),
          error && cn(cx.triggerError, c.triggerError)
        )}
      >
        <span
          className={cn(
            cx.valueContainer,
            c.valueContainer
          )}
        >
          {renderTriggerContent()}
        </span>

        <span className="flex items-center gap-1">
          {clearable && hasValue && !disabled && (
            <span
              role="button"
              tabIndex={-1}
              aria-label="Limpar seleção"
              className={cn(cx.clearButton, c.clearButton)}
              onClick={handleClear}
            >
              <XIcon className="h-3.5 w-3.5" />
            </span>
          )}
          <ChevronIcon
            className={cn(
              cx.chevron,
              c.chevron,
              open && "rotate-180"
            )}
          />
        </span>
      </div>

      {error && (
        <span
          className={cn(cx.errorMessage, c.errorMessage)}
        >
          {error}
        </span>
      )}

      {open &&
        !disabled &&
        menuRect &&
        createPortal(
          <div
            ref={dropdownRef}
            onWheel={(e) => e.stopPropagation()}
            style={{
              position: "fixed",
              top: menuRect.top,
              left: menuRect.left,
              width: menuRect.width,
              zIndex: 9999,
              pointerEvents: "auto",
            }}
            className={cn(cx.dropdown, c.dropdown)}
          >
            {searchable && (
              <div
                className={cn(
                  cx.searchWrapper,
                  c.searchWrapper
                )}
              >
                <SearchIcon className="h-4 w-4 shrink-0 text-slate-400" />
                <input
                  ref={searchInputRef}
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleListKeyDown}
                  placeholder="Buscar..."
                  className={cn(
                    cx.searchInput,
                    c.searchInput
                  )}
                />
              </div>
            )}

            <div
              id={listboxId}
              role="listbox"
              aria-multiselectable={multiple || undefined}
              tabIndex={-1}
              onKeyDown={
                !searchable ? handleListKeyDown : undefined
              }
              style={{ maxHeight: menuRect.maxHeight }}
              className={cn(cx.optionsList, c.optionsList)}
            >
              {filteredOptions.length === 0 && (
                <div
                  className={cn(
                    cx.emptyMessage,
                    c.emptyMessage
                  )}
                >
                  {emptyMessage}
                </div>
              )}

              {filteredOptions.map((option, index) => {
                const selected = isSelected(option);
                const active = index === activeIndex;
                const state: OptionState = {
                  selected,
                  active,
                  disabled: !!option.disabled,
                };
                const customRender = props.renderOption;

                return (
                  <div
                    key={String(option.value)}
                    ref={(el) => {
                      optionRefs.current[index] = el;
                    }}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={option.disabled}
                    onMouseEnter={() =>
                      !option.disabled &&
                      setActiveIndex(index)
                    }
                    onClick={() => commitChange(option)}
                    className={cn(
                      cx.option,
                      c.option,
                      active &&
                        cn(cx.optionActive, c.optionActive),
                      selected &&
                        cn(
                          cx.optionSelected,
                          c.optionSelected
                        ),
                      option.disabled &&
                        cn(
                          cx.optionDisabled,
                          c.optionDisabled
                        )
                    )}
                  >
                    {customRender ? (
                      customRender(option, state)
                    ) : (
                      <>
                        <span className="flex min-w-0 items-center gap-2">
                          {option.icon && (
                            <span
                              className={cn(
                                cx.optionIcon,
                                c.optionIcon
                              )}
                            >
                              {option.icon}
                            </span>
                          )}
                          <span className="truncate">
                            {option.label}
                            {option.description && (
                              <span className="block text-xs font-normal text-slate-400">
                                {option.description}
                              </span>
                            )}
                          </span>
                        </span>
                        {selected && (
                          <CheckIcon
                            className={cn(
                              cx.checkIcon,
                              c.checkIcon
                            )}
                          />
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Assinaturas públicas (overloads) — dão o tipo certo em cada uso
// ---------------------------------------------------------------------------

export function Select<T = string>(
  props: SingleSelectProps<T>
): React.ReactElement;
export function Select<T = string>(
  props: MultiSelectProps<T>
): React.ReactElement;
export function Select<T = string>(
  props: SelectProps<T>
): React.ReactElement {
  return <SelectImpl {...props} />;
}

export default Select;
