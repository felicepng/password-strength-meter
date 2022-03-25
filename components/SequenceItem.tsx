import { Fragment } from "react";

interface Props {
  sequence: any
}

const SequenceItem = (props: Props) => {
  const { sequence } = props;

  return (
    <div className="px-3 py-2 bg-gray-800 opacity-80 rounded-md text-sm gap-x-2">
      <div className="font-poppins-medium">Pattern:
        <span className="ml-2">{sequence.pattern}</span>
        <div className="font-poppins-medium">Token:
          <span className="ml-2">{sequence.token}</span>
        </div>
        {sequence.l33t && (
          <Fragment>
            <span className="font-poppins-medium">
              L33t characters{" "}
            </span>
            <span>{sequence.sub_display as string}</span>
          </Fragment>
        )}
      </div>
    </div>
  )
}

export default SequenceItem