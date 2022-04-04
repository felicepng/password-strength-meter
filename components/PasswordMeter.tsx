interface Props {
  score: number
}

const getColor = (score: number) => {
  if (score === 0) {
    return "bg-red-400";
  } else if (score === 1) {
    return "bg-orange-400";
  } else if (score === 2) {
    return "bg-yellow-400";
  } else if (score === 3) {
    return "bg-green-400";
  } else {
    return "bg-secondary";
  }
}

const getDescription = (score: number) => {
  if (score === 0) {
    return "Very Weak";
  } else if (score === 1) {
    return "Weak";
  } else if (score === 2) {
    return "Okay";
  } else if (score === 3) {
    return "Strong";
  } else {
    return "Very Strong";
  }
}

const PasswordMeter = (props: Props) => {
  return (
    <div className="flex gap-x-1 items-center">
      {[...Array(props.score + 1)].map((_i, index) =>
        <div key={index} className={`h-1 w-9 ${getColor(props.score)}`} />
      )}
      <div className="ml-3 text-sm">{getDescription(props.score)}</div>
    </div>
  );
};

export default PasswordMeter;