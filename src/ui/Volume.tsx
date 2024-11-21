import AISpeaker from '../assets/images/volume.svg';
type VolumeProps = {
  height: number;
  width: number;
};
export default function Speaker(props: VolumeProps) {
  return <img src={AISpeaker} height={props.height} width={props.width} alt="Speaker Icon" />;
}
