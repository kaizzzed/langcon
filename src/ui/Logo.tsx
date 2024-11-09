import LangConv from '../assets/images/langconv.png';
type LogoProps = {
  height: number;
  width: number;
};
export default function Logo(props: LogoProps) {
  return <img src={LangConv} height={props.height} width={props.width} alt="LangConv Logo" />;
}
