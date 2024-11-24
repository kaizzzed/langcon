import LogoGraphic from '../assets/images/logodesign.svg';
type LogoDesignProps = {
  height: number;
  width: number;
};
export default function LogoDesign(props: LogoDesignProps) {
  return <img src={LogoGraphic} height={props.height} width={props.width} alt="LangConv Logo" />;
}
