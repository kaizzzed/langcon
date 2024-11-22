import FAQ from '../assets/images/question.svg';
type QuestionProps = {
  height: number;
  width: number;
};
export default function Question(props: QuestionProps) {
  return <img src={FAQ} height={props.height} width={props.width} alt="Question Mark" />;
}
