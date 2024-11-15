import LogoIcon from '../assets/images/logo.svg';

type LogoProps = {
  height: number;
  width: number;
};

export default function Icon(props: LogoProps) {
  return <img src={LogoIcon} height={props.height} width={props.width} alt="LangConv Logo" />;
}