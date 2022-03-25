import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import zxcvbn, { IZXCVBNResult } from 'zxcvbn-typescript';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import PasswordSummary from '../components/PasswordSummary';
import SequenceItem from '../components/SequenceItem';

const Home: NextPage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [zxcvbnResult, setZxcvbnResult] = useState<IZXCVBNResult | null>(null);

  useEffect(() => {
    if (password) {
      const result = zxcvbn(password, [firstName, lastName, dateOfBirth]);
      setZxcvbnResult(result);
      console.log(result);
    } else {
      setZxcvbnResult(null);
    }
  }, [firstName, lastName, dateOfBirth, password]);

  return (
    <div className="relative bg-primary text-white w-screen h-screen overflow-x-hidden overflow-y-hidden font-poppins-regular">
      <img src="/design.png" className="top-0 right-0 absolute w-1/2 md:w-2/5 opacity-60" />
      <div className="flex flex-col py-12 px-10 md:px-24 w-screen h-screen overflow-x-scroll overflow-y-scroll z-10">
        <div className="text-2xl md:text-4xl font-poppins-semibold mt-1">Password-Strength Meter</div>
        <div className="text-base md:text-xl text-secondary mt-1">CS440 G2T8</div>

        <div className="mt-8 md:mt-14 grid lg:grid-cols-3 gap-x-20">
          <div className="flex flex-col gap-y-3 md:gap-y-6 lg:col-span-2 space-y-6 w-full">
            <div className="flex flex-col gap-y-4 md:gap-y-6">
              <div className="flex justify-between w-full gap-x-4 md:gap-x-6">
                <input
                  className="w-full focus:outline-none placeholder-gray-500 bg-primary px-5 py-3 border-2 border-secondary rounded-lg"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  className="w-full focus:outline-none placeholder-gray-500 bg-primary px-5 py-3 border-2 border-secondary rounded-lg"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <input
                className="w-full focus:outline-none placeholder-gray-500 bg-primary px-5 py-3 border-2 border-secondary rounded-lg"
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
              <div className="border-2 border-secondary rounded-lg w-full flex items-center justify-between">
                <input
                  className="w-full focus:outline-none rounded-lg placeholder-gray-500 bg-primary px-5 py-3 "
                  placeholder="Password"
                  type={isPasswordHidden ? "password" : "text"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {
                  isPasswordHidden ?
                    <AiOutlineEyeInvisible className="text-secondary w-6 h-6 cursor-pointer mr-4" onClick={() => setIsPasswordHidden(false)} /> :
                    <AiOutlineEye className="text-secondary w-6 h-6 cursor-pointer mr-4" onClick={() => setIsPasswordHidden(true)} />
                }
              </div>
            </div>
            <hr className={`opacity-40 ${!password && "hidden"}`} />

            <div className="flex flex-col w-full">
              <div className="flex w-full flex-wrap gap-3 md:gap-4 mb-6">
                {zxcvbnResult?.sequence.map((sequence, index) => {
                  return (
                    <SequenceItem key={index} sequence={sequence} />
                  );
                })}
              </div>
            </div>
          </div>
          {
            zxcvbnResult &&
            <PasswordSummary
              password={password}
              score={zxcvbnResult.score}
              guesses={zxcvbnResult.guesses}
              crack_times={zxcvbnResult.crack_times_display.offline_slow_hashing_1e4_per_second}
              suggestions={zxcvbnResult.feedback.suggestions}
              warning={zxcvbnResult.feedback.warning}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default Home;