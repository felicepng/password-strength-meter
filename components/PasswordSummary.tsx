import PasswordMeter from './PasswordMeter';
import _ from 'lodash';

interface Props {
  password: string
  score: number
  guesses: number
  crack_times: string | undefined
  suggestions: string[]
  warning: string | null
}

const PasswordSummary = (props: Props) => {
  const { password, score, guesses, crack_times, suggestions, warning } = props;

  return (
    <div className="text-white font-poppins-semibold opacity-80 bg-gray-800 py-6 px-8 rounded-lg flex flex-col gap-y-6">
      <div>
        Password Entropy:{' '}
        <span className="ml-2 text-gray-300 font-poppins-regular">
          NA
        </span>
      </div>
      <div>
        Score:{' '}
        <span className="ml-2 text-gray-300 font-poppins-regular">
          {
            password ?
              <PasswordMeter score={score} />
              :
              "-"
          }
        </span>
      </div>
      <div>
        Guesses:{' '}
        <span className="ml-2 text-gray-300 font-poppins-regular">
          {guesses}
        </span>
      </div>
      <div>
        Time to crack (10,000 guesses per second):{' '}
        <span className="ml-2 text-gray-300 font-poppins-regular">
          {_.capitalize(crack_times)}
        </span>
      </div>
      <div>
        Suggestions:{' '}
        <span className="ml-2 text-gray-300 font-poppins-regular">
          {suggestions.map((item: string) => item + " ")}
        </span>
      </div>
      <div>
        Warning:{' '}
        <span className="ml-2 text-gray-300 font-poppins-regular">
          {warning || "-"}
        </span>
      </div>
    </div>
  )
}

export default PasswordSummary