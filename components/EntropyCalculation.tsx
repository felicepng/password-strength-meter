import PasswordMeter from './PasswordMeter';

interface Props {
  password: string
}

const calculateCharacterPools = (password: string) => {
  const pools = new Array(4).fill(0);
  for (const character of password) {
    if (character >= 'a' && character <= 'z') {
      pools[0] = 1;
    } else if (character >= 'A' && character <= 'Z') {
      pools[1] = 1;
    } else if (character >= '0' && character <= '9') {
      pools[2] = 1;
    } else {
      pools[3] = 1;
    }
  }

  let sum = 0;
  if (pools[0] === 1) {
    sum += 26;
  }
  if (pools[1] === 1) {
    sum += 26;
  }
  if (pools[2] === 1) {
    sum += 10;
  }
  if (pools[3] === 1) {
    sum += 32;
  }

  return sum;
}

const calculateGuesses = (password: string) => {
  const len = password.length;
  const characterPools = calculateCharacterPools(password);

  return Math.pow(characterPools, len);
}

const calculateEntropy = (password: string) => {
  const guesses = calculateGuesses(password);

  return Math.log(guesses) / Math.log(2);
}

const calculateScore = (password: string) => {
  const guesses = calculateGuesses(password);

  if (guesses < Math.pow(2, 25)) {
    return 0;
  } else if (guesses < Math.pow(2, 50)) {
    return 1;
  } else if (guesses < Math.pow(2, 75)) {
    return 2;
  } else if (guesses < Math.pow(2, 100)) {
    return 3;
  }
  return 4;
}

const EntropyCalculation = (props: Props) => {
  const { password } = props;

  return (
    <div className="flex flex-col gap-y-4">
      <div>
        Guesses:{' '}
        <span className="ml-1 text-gray-300 font-poppins-regular">
          {calculateCharacterPools(password)}<sup>{password.length}</sup> = {calculateGuesses(password)}
        </span>
      </div>
      <div>
        <span className="text-gray-300 font-poppins-regular">
          E = log<sub>2</sub>{calculateCharacterPools(password)}<sup>{password.length}</sup> = {calculateEntropy(password)}
        </span>
      </div>
      <div>
        Password Strength:
        <span className="text-gray-300 font-poppins-regular">
          {
            password ?
              <PasswordMeter score={calculateScore(password)} />
              :
              "-"
          }
        </span>
      </div>
    </div>
  )
}

export default EntropyCalculation