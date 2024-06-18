import React, { useState } from "react";
import i18n from "./i18n";
import { format } from "date-fns";
import {enUS,fr,ko,es,zhCN} from "date-fns/locale"


export const LanguageSwitch = () => {
    const [selectedLang, setSelectedLang] = useState("en");
    
    const languageOptions = [
        { code: "en", label: "English" },
        { code: "fr", label: "Français" },
        { code: "ko", label: "한국어" },
        { code: "es", label: "Español"},
        { code: "zh", label: "中国历史"},
    ];

    const languageLocales: { [key: string]: Locale } = {
        en: enUS,
        fr: fr,
        ko: ko,
        es: es,
        zh: zhCN,
    };

    const onChangeLang = (e) => {
        const langCode = e.target.value;
        setSelectedLang(langCode);
        i18n.changeLanguage(langCode);
        const locale = languageLocales[langCode];
    };


    

    return (
        <select
            className="border-transparent focus:border-transparent active:border-transparent shadow-md rounded-md dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:shadow-slate-600"
            value={selectedLang}
            onChange={onChangeLang}
        >
            <option value="" disabled>Select a language</option>
            {languageOptions.map((option) => (
                <option key={option.code} value={option.code}>
                    {option.label}
                </option>
            ))}
        </select>
    );
};


