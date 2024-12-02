export function t(language: any, key: keyof typeof content.english): string{
    // @ts-ignore
    return content[language][key];
}
const content = {
    english: {
        enterScenario: "ENTER SCENARIO",
        enterYourScenarioHere: "Enter your scenario here... ",
        begin: "Begin",
        enterALanguage: "Enter a Language...",
        systemRole: "SYSTEM ROLE",
        userRole: "USER ROLE",
        numOfLines: "NUM OF LINES",
        teacher: "Teacher",
        student: "Student",
        startRecording: "Start Recording"
    },
    chinese: {
        enterScenario: "进入场景",
        enterYourScenarioHere: "在此输入您的场景... ",
        begin: "开始",
        enterALanguage: "输入语言...",
        systemRole: "系统角色",
        userRole: "用户角色",
        numOfLines: "行数",
        teacher: "老师",
        student: "学生",
        startRecording: "开始录音"
    },
    spanish: {
        enterScenario: "Ingresar al escenario",
        enterYourScenarioHere: "Ingresa tu escenario aquí... ",
        begin: "Comenzar",
        enterALanguage: "Ingrese un idioma...",
        systemRole: "ROL DEL SISTEMA",
        userRole: "ROL DE USARIO",
        numOfLines: "NÚMERO DE LÍNEAS",
        teacher: "Maestra",
        student: "Alumna",
        startRecording: "Iniciar grabación"
    }
}