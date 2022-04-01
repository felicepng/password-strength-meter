import type { NextPage } from 'next';
import { useEffect, useState, Fragment } from 'react';
import zxcvbn, { IZXCVBNResult } from 'zxcvbn-typescript';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';
import { FiInfo } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import PasswordSummary from '../components/PasswordSummary';
import SequenceItem from '../components/SequenceItem';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Tooltip } from 'antd';

const Home: NextPage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [zxcvbnResult, setZxcvbnResult] = useState<IZXCVBNResult | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(true);

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
    <div className="relative bg-primary text-white w-screen h-screen scrollbar-hide overflow-x-hidden overflow-y-hidden font-poppins-regular">
      <img src="/design.png" className="top-0 right-0 absolute w-1/2 md:w-2/5 opacity-60" />
      <div className="text-base flex flex-col py-8 md:py-12 px-8 md:px-24 w-screen h-screen scrollbar-hide overflow-x-scroll overflow-y-scroll z-10">
        <Transition appear show={isModalVisible} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setIsModalVisible(false)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>

              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="font-poppins-regular my-10 md:my-20 bg-gray-800 inline-block w-11/12 md:w-2/3 h-2/3 py-6 px-8 overflow-hidden text-left align-middle transition-all transform rounded-lg">
                  <div className="flex justify-between items-center">
                    <Dialog.Title
                      as="h3"
                      className="text-lg md:text-xl font-poppins-semibold leading-6 text-white"
                    >
                      Application Info
                    </Dialog.Title>
                    <IoClose className="text-white hover:text-secondary cursor-pointer h-5 w-5 md:h-6 md:w-6" onClick={() => setIsModalVisible(false)} />
                  </div>

                  <div className="mt-4 mb-6">
                    <p className="text-sm md:text-base text-white">
                      Expand specific techniques to learn more about their respective calculations.
                    </p>
                  </div>

                  <div className="text-white font-poppins-semibold mb-2">PASSWORD ENTROPY</div>
                  <Disclosure>
                    {({ open }) => (
                      <div className="mb-7">
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-poppins-medium text-left text-secondary border-2 border-secondary rounded-lg hover:border-tertiary focus:outline-none">
                          <span>Scoring</span>
                          <HiChevronDown
                            className={`${open ? 'transform rotate-180' : ''
                              } w-5 h-5 text-secondary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-0 text-sm md:text-base text-gray-200">
                          <div>Password entropy is calculated using the formula:{' '}
                            <span className="ml-1">E = log<sub>2</sub>R<sup>L</sup> = L * log<sub>2</sub>R</span>
                          </div>
                          <div>Number of guesses:{' '}
                            <span className="ml-1">2<sup>E</sup></span>
                          </div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>

                  <div className="text-white font-poppins-semibold mb-2">CHARACTER MATCHING</div>
                  <Disclosure>
                    {({ open }) => (
                      <div className="mb-3">
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-poppins-medium text-left text-secondary border-2 border-secondary rounded-lg hover:border-tertiary focus:outline-none">
                          <span>Dictionary Match</span>
                          <HiChevronDown
                            className={`${open ? 'transform rotate-180' : ''
                              } w-5 h-5 text-secondary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm md:text-base text-gray-200">
                          <div>Compare substring against ranked list of common passwords, names, words. Lists are ranked by degree of commonality.</div>
                          <div>Number of guesses= Rank of matched word</div>
                          <div>- Inverse matching: Doubles number of guesses of inverted set, e.g. N(’drowssap’) = 2 * N(’password’)</div>
                          <div>- L33t words: find substitutions of characters with symbols and digits, calculate number of variations. Calculates guesses based on product of number of variations and number of guesses of matched set.</div>
                          <div className="ml-4">
                            <div>- p4ssw0rd has 4 variations, with 2 L33t substitutions:</div>
                            <div>- p4ssw0rd, passw0rd, p4ssword, password</div>
                            <div>- Number of guesses = 4 * ( Number of guesses(’password’))</div>
                          </div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <div className="mb-3">
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-poppins-medium text-left text-secondary border-2 border-secondary rounded-lg hover:border-tertiary focus:outline-none">
                          <span>Spatial Match</span>
                          <HiChevronDown
                            className={`${open ? 'transform rotate-180' : ''
                              } w-5 h-5 text-secondary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm md:text-base text-gray-200">
                          <div>Search for common keypad patterns in precomputed graph, e.g. qwerty keyboard</div>
                          <div className="flex items-center">
                            <div>Number of guesses =</div>
                            <img src="/formula.png" className="h-20" />
                          </div>
                          <div>L: Length of pattern</div>
                          <div>D: Average number of neighbours per key, e.g. ‘s’ has 4 neighbours on qwerty</div>
                          <div>T: 1 + Number of turns the sequences takes, e.g. ‘zxcde’ takes 1 turn on qwerty, T = 2</div>
                          <div>S: Number of keys on keyboard</div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <div className="mb-3">
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-poppins-medium text-left text-secondary border-2 border-secondary rounded-lg hover:border-tertiary focus:outline-none">
                          <span>Repeat Match</span>
                          <HiChevronDown
                            className={`${open ? 'transform rotate-180' : ''
                              } w-5 h-5 text-secondary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm md:text-base text-gray-200">
                          <div>Identify repeated characters or strings and reduce to base form. Take total as (num guesses of base) * (num repeats) + 1</div>
                          <div>- asdfasdfasdf → asdf</div>
                          <div>- Number of guesses for asdf = n</div>
                          <div>- Number of guesses for asdfasdfasdf = 3*n + 1</div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <div className="mb-3">
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-poppins-medium text-left text-secondary border-2 border-secondary rounded-lg hover:border-tertiary focus:outline-none">
                          <span>Sequence Match</span>
                          <HiChevronDown
                            className={`${open ? 'transform rotate-180' : ''
                              } w-5 h-5 text-secondary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm md:text-base text-gray-200">
                          <div>Detects sequences based on the delta or difference between character ASCII values.</div>
                          <div>Number of guesses is scored using the product of the absolute difference, d, the starting point, s, of the sequence and n, the length. For obvious starting points like ‘a’, ‘z’ or 1, s = 4 but for other less obvious ones, s = 10 for digits and s = 26 for alphabetical characters. </div>
                          <div>- Number of guesses = s*d*n</div>
                          <div>- e.g. abcd → s*d*n = (4)(1)(4) = 16</div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <div className="mb-3">
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-poppins-medium text-left text-secondary border-2 border-secondary rounded-lg hover:border-tertiary focus:outline-none">
                          <span>Date Match</span>
                          <HiChevronDown
                            className={`${open ? 'transform rotate-180' : ''
                              } w-5 h-5 text-secondary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm md:text-base text-gray-200">
                          <div>We assume guessers start at 2016 and guess progressively earlier or later dates, yielding a ballpark of 365 * |2016 - year|</div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                  <Disclosure>
                    {({ open }) => (
                      <div className="mb-1">
                        <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-poppins-medium text-left text-secondary border-2 border-secondary rounded-lg hover:border-tertiary focus:outline-none">
                          <span>Scoring</span>
                          <HiChevronDown
                            className={`${open ? 'transform rotate-180' : ''
                              } w-5 h-5 text-secondary`}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm md:text-base text-gray-200">
                          <div>0: Too guessable, risky password (guesses: &lt; 10<sup>3</sup>)</div>
                          <div>1: Very guessable, protection from throttled online attacks. (guesses &lt; 10<sup>6</sup>)</div>
                          <div>2: Somewhat guessable, protection from unthrottled online attacks. (guesses &lt; 10<sup>8</sup>)</div>
                          <div>3: Safely unguessable, moderate protection from offline slow-hash scenario. (guesses &lt; 10<sup>10</sup>)</div>
                          <div>4: Very unguessable, strong protection from offline slow-hash scenario. (guesses &gt;= 10<sup>10</sup>)</div>
                        </Disclosure.Panel>
                      </div>
                    )}
                  </Disclosure>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        <div className="flex gap-x-4 md:gap-x-6 items-center mt-1">
          <div className="text-2xl md:text-4xl font-poppins-semibold">Password-Strength Meter</div>
          <Tooltip title="Info" placement="right">
            <FiInfo className="cursor-pointer hover:text-secondary h-6 w-6" onClick={() => setIsModalVisible(true)} />
          </Tooltip>
        </div>
        <div className="text-base md:text-xl text-secondary mt-1">CS440 G2T8</div>
        <div className="mt-8 md:mt-14 grid lg:grid-cols-2 gap-x-20">
          <div className="flex flex-col gap-y-3 md:gap-y-6 lg:col-span-1 space-y-6 w-full">
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