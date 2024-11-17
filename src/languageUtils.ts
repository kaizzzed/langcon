export function t(language: any, key: keyof typeof content.english): string{
    // @ts-ignore
    return content[language][key];
}

const content = {
    english: {
        enterScenario: "ENTER SCENARIO",
        enterYourScenarioHere: "Enter your scenario here... ",
        begin: "Begin"
    },
    chinese: {
        enterScenario: "进入场景",
        enterYourScenarioHere: "在此输入您的场景... ",
        begin: "开始"
    },
    spanish: {
        enterScenario: "ingresar al escenario",
        enterYourScenarioHere: "ingresa tu escenario aquí... ",
        begin: "comenzar"
    }
}