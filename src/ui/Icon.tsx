import LogoIcon from '../assets/images/NewLogo.svg';

type LogoProps = {
  height: number;
  width: number;
};

export default function Icon(props: LogoProps) {
  return <img src={LogoIcon} height={props.height} width={props.width} alt="LangConv Logo" />;
}