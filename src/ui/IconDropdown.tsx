type LogoProps = {
    setLanguage: Function;
};

export default function IconDropdown(props: LogoProps) {
  return (
    <div className='language-dropdown'>
        <button onClick={()=>props.setLanguage("english")}>English</button>
        <button onClick={()=>props.setLanguage("chinese")}>Chinese</button>
        <button onClick={()=>props.setLanguage("spanish")}>Spanish</button>
    </div>
  );
}