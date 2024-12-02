type IconDropdownProps = {
  setLanguage: (language: string) => void; // Explicit typing for the function
};

export default function IconDropdown({ setLanguage }: IconDropdownProps) {
  return (
    <div className="language-dropdown">
      <button onClick={() => setLanguage("english")}>English</button>
      <button onClick={() => setLanguage("chinese")}>Chinese</button>
      <button onClick={() => setLanguage("spanish")}>Spanish</button>
    </div>
  );
}
