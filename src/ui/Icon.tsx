import LogoIcon from '../assets/images/logo.svg';

type LogoProps = {
  height: number;
  width: number;
  onClick?: () => void;
};

export default function Icon(props: LogoProps) {
  return (
    <button
      onClick={props.onClick}
      style={{
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <img
        src={LogoIcon}
        height={props.height}
        width={props.width}
        alt="Globe Icon"
      />
    </button>
  );
}