import React, { useEffect, useState } from "react";
import CarrotDown from "../assets/images/CarrotDown.svg";
import { t } from "../languageUtils";

type LanguageProp = {
  setLanguage: (language: string) => void;
  selectedLanguage: string;
  language: string;
};

export default function EnterLanguageDropdown({
  language,
  ...props
}: LanguageProp) {
  // state to manage the visibility of the dropdown menu
  const [langDropOpen, setLangDropOpen] = useState(false);
  // state to keep track of the user's search input
  const [searchLanguage, setSearchLanguage] = useState("");

  // list of options available in the dropdown
  const options = [
    // "Afrikaans",
    // "Albanian",
    // "Amharic",
    // "Arabic",
    // "Armenian",
    // "Azerbaijani",
    // "Basque",
    // "Belarusian",
    // "Bengali",
    // "Bosnian",
    // "Bulgarian",
    // "Catalan",
    // "Cebuano",
    { key: "zh-CN", value: "Chinese (Simplified)" },
    { key: "zh-TW", value: "Chinese (Traditional)" },
    // "Corsican",
    // "Croatian",
    // "Czech",
    // "Danish",
    // "Dutch",
    { key: "en", value: "English" },
    // "Esperanto",
    // "Estonian",
    // "Filipino",
    // "Finnish",
    // "French",
    // "Galician",
    // "Georgian",
    { key: "de", value: "German" },
    // "Greek",
    // "Gujarati",
    // "Haitian Creole",
    // "Hausa",
    // "Hawaiian",
    // "Hebrew",
    // "Hindi",
    // "Hmong",
    // "Hungarian",
    // "Icelandic",
    // "Igbo",
    // "Indonesian",
    // "Irish",
    // "Italian",
    // "Japanese",
    // "Javanese",
    // "Kannada",
    // "Kazakh",
    // "Khmer",
    // "Korean",
    // "Kurdish",
    // "Kyrgyz",
  ];

  // function to toggle the dropdown's visibility
  const toggleDropdown = () => {
    setLangDropOpen(!langDropOpen);
  };

  // function to handle changes in the search input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchLanguage(event.target.value);
  };

  // function to handle the selection of an option
  const handleOptionClick = (option: string) => {
    props.setLanguage(option); // update the selected language in the parent component
    setLangDropOpen(false); // close the dropdown after selection
  };

  // filter the options based on the search term
  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(searchLanguage.toLowerCase())
  );

  return (
    <div className="enter-language-dropdown">
      {/* button to toggle the enter language dropdown menu */}
      <button onClick={toggleDropdown} className="enter-language-button">
        <span>
          {props.selectedLanguage == ""
            ? t(language, "enterALanguage")
            : options.find((e) => e.key == props.selectedLanguage)!.value}
        </span>
        <img src={CarrotDown} alt="carrot down" width={30} height={30}></img>
      </button>

      {/* dropdown menu, rendered conditionally based on dropdownOpen state */}
      {langDropOpen && (
        <div id="myDropdown" className="enter-language-dropdown-content">
          {/* search input field */}
          <input
            type="text"
            placeholder="Search..."
            id="enterLangInput"
            value={searchLanguage}
            onChange={handleInputChange}
          />
          {/* render the filtered options */}
          {filteredOptions.map((option) => (
            <div
              key={option.key}
              onClick={() => handleOptionClick(option.key)}
              className="enter-language-dropdown-option"
            >
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
