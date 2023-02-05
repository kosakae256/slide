import {RiCheckboxMultipleBlankFill} from "react-icons/ri";

interface Props {
  text: string,
  className?: string,
}

const Title = ({ text, className="" }: Props) => (
  <span className={`flex flex-row items-center space-x-1 w-full text-theme ${className}`}>
    <RiCheckboxMultipleBlankFill size='1.5rem' />
    <h2 className="text-lg font-bold">{text}</h2>
  </span>
);

export default Title;