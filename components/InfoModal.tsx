import { HiChevronDown } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { Fragment } from 'react';

interface Props {
  isModalVisible: boolean
  setIsModalVisible: (isModalVisible: boolean) => void
}

const InfoModal = (props: Props) => {
  const { isModalVisible, setIsModalVisible } = props;

  return (
    <Transition appear show={isModalVisible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto scrollbar-hide"
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
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-80" />
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
            <div className="font-poppins-regular my-10 md:my-12 bg-gray-800 inline-block w-11/12 md:w-3/4 h-2/3 py-6 px-8 overflow-hidden text-left align-middle transition-all transform rounded-lg">
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
                <p className=" text-white">
                  Welcome to our application! Expand specific techniques to learn more about their respective calculations.
                </p>
              </div>

              <div className="text-white font-poppins-regular mb-2">
                <div className="font-poppins-semibold mb-2 text-secondary">PASSWORD ENTROPY</div>
                <div>Password entropy is calculated using the formula:{' '}
                  <span className="ml-1">E = log<sub>2</sub>R<sup>L</sup> = L * log<sub>2</sub>R</span>
                </div>
                <div className="mb-4">Number of guesses:{' '}
                  <span className="ml-1">2<sup>E</sup></span>
                </div>
              </div>
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
                    <Disclosure.Panel className="px-4 pt-4 pb-0 text-gray-200">
                      <div>Very weak: Too guessable, risky password (guesses &lt; 2<sup>25</sup>)</div>
                      <div>Weak: Very guessable, protection from throttled online attacks (2<sup>25</sup> &lt;= guesses &lt; 2<sup>50</sup>)</div>
                      <div>Okay: Somewhat guessable, protection from unthrottled online attacks (2<sup>50</sup> &lt;= guesses &lt; 2<sup>75</sup>)</div>
                      <div>Strong: Safely unguessable, moderate protection from offline slow-hash scenario (2<sup>75</sup> &lt;= guesses &lt; 2<sup>100</sup>)</div>
                      <div>Very Strong: Very unguessable, strong protection from offline slow-hash scenario (guesses &gt;= 2<sup>100</sup>)</div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>

              <div className="text-white font-poppins-regular mb-2">
                <div className="font-poppins-semibold mb-2 text-secondary">CHARACTER MATCHING</div>
                <div>Assumes hacker knows the structure of the password,</div>
                <div className="mb-2">- e.g. password123123 → password(dictionary) + 123123(repeat), hacker knows passwords consists of 1 dictionary match and one repeat match</div>
                <div>breaks password down into overlapping sets and selects sequence of non-overlapping set with the minimum number of guesses.</div>
                <div>- password123123 → password(dictionary) + 123123(repeat), hacker knows passwords consists of 1 dictionary match and one repeat match</div>
                <div className="mt-2 mb-4">Minimum sequence of non-overlapping set: lenovo (dictionary match) + 1111(repeat)</div>
              </div>
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
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-200">
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
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-200">
                      <div>Search for common keypad patterns in precomputed graph, e.g. qwerty keyboard</div>
                      <div className="flex items-center flex-wrap">
                        <div>Number of guesses =</div>
                        <img src="/formula.png" className="h-16 md:h-20" />
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
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-200">
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
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-200">
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
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-200">
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
                    <Disclosure.Panel className="px-4 pt-4 pb-0 text-gray-200">
                      <div>Very weak: Too guessable, risky password (guesses &lt; 10<sup>3</sup>)</div>
                      <div>Weak: Very guessable, protection from throttled online attacks (10<sup>3</sup> &lt;= guesses &lt; 10<sup>6</sup>)</div>
                      <div>Okay: Somewhat guessable, protection from unthrottled online attacks (10<sup>6</sup> &lt;= guesses &lt; 10<sup>8</sup>)</div>
                      <div>Strong: Safely unguessable, moderate protection from offline slow-hash scenario (10<sup>8</sup> &lt;= guesses &lt; 10<sup>10</sup>)</div>
                      <div>Very Strong: Very unguessable, strong protection from offline slow-hash scenario (guesses &gt;= 10<sup>10</sup>)</div>
                    </Disclosure.Panel>
                  </div>
                )}
              </Disclosure>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InfoModal;