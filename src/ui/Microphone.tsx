import Speak from '../assets/images/microphone.svg';
type MicrophoneProps = {
  height: number;
  width: number;
  isActive: boolean
};
export default function Microphone(props: MicrophoneProps) {
  return (
    <img
      src={Speak}
      height={props.height}
      width={props.width}
      alt="Microphone symbol"
      className={props.isActive ? 'microphone-active' : ''}
    />
  );
}