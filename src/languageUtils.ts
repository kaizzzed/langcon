export function t(language: any, key: keyof typeof content.english): string{
    // @ts-ignore
    return content[language][key];
}
const content = {
    english: {
        enterScenario: "ENTER SCENARIO",
        enterYourScenarioHere: "Enter your scenario here... ",
        begin: "Begin",
        enterALanguage: "Enter a Language..."
    },
    chinese: {
        enterScenario: "进入场景",
        enterYourScenarioHere: "在此输入您的场景... ",
        begin: "开始",
        enterALanguage: "输入语言..."
    },
    spanish: {
        enterScenario: "Ingresar al escenario",
        enterYourScenarioHere: "Ingresa tu escenario aquí... ",
        begin: "Comenzar",
        enterALanguage: "Ingrese un idioma..."
    }
}