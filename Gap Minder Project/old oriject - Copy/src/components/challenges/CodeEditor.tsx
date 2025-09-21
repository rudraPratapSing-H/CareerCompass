
interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  className?: string;
}

export function CodeEditor({ value, onChange, language, className = '' }: CodeEditorProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`font-mono w-full p-4 bg-gray-50 ${className}`}
      spellCheck="false"
      data-language={language}
    />
  );
}