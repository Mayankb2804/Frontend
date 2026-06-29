/**
 * FormField — label + input/textarea with consistent styling.
 * Used in: EditProfilePage, UploadVideoPage
 *
 * Props:
 *   label       string
 *   required    bool
 *   maxLength   number
 *   value       string
 *   onChange    fn
 *   type        "text" | "email" | "password" | "textarea"
 *   rows        number  (textarea only)
 *   placeholder string
 *   prefix      string  (e.g. "@" for username field)
 *   charCount   bool    (show X/maxLength counter)
 */
const FormField = ({
  label,
  required = false,
  maxLength,
  value = "",
  onChange,
  type = "text",
  rows = 3,
  placeholder = "",
  prefix,
  charCount = false,
}) => {
  const inputClass =
    "w-full bg-[#1a1a1a] border border-[#333] focus:border-[#e24b4a] text-white text-sm px-4 py-2.5 rounded-lg outline-none placeholder:text-[#555] transition-colors"

  return (
    <div>
      <label className="block text-sm text-[#aaa] mb-1.5">
        {label}
        {required && <span className="text-[#e24b4a] ml-1">*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          rows={rows}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          className={`${inputClass} resize-none`}
        />
      ) : prefix ? (
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa] text-sm select-none">
            {prefix}
          </span>
          <input
            type={type}
            value={value}
            onChange={onChange}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`${inputClass} pl-7`}
          />
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          placeholder={placeholder}
          className={inputClass}
        />
      )}

      {charCount && maxLength && (
        <p className="text-xs text-[#555] text-right mt-1">
          {value.length} / {maxLength}
        </p>
      )}
    </div>
  )
}

export default FormField
