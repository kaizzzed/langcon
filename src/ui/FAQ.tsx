import FAQ from '../assets/images/question.svg';

type QuestionProps = {
  height: number;
  width: number;
  onClick?: () => void;
};

export default function Question(props: QuestionProps) {
  return (
    <img
      onClick={props.onClick}
      src={FAQ}
      height={props.height}
      width={props.width}
      alt="FAQ Icon"
      style={{cursor: 'pointer'}}
    />
  )
}