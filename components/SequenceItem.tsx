import { Fragment, useState } from "react";
import { Popover, Transition } from '@headlessui/react';
import _ from 'lodash';

interface Props {
  sequence: any
}

const SequenceItem = (props: Props) => {
  const { sequence } = props;
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            className={`${sequence.pattern === "bruteforce" && "cursor-default"} focus:outline-none`}
            onMouseEnter={() => setIsShowing(true)}
            onMouseLeave={() => setIsShowing(false)}
          >
            <div className="font-poppins-semibold flex items-center justify-center px-4 w-44 h-14 bg-gray-800 opacity-80 rounded-md text-sm gap-x-2">
              <div className="truncate">Pattern:
                <span className="ml-2 font-poppins-regular">{_.capitalize(sequence.pattern)}</span>
                <div className="truncate">Token:
                  <span className="ml-2 font-poppins-regular">{sequence.token}</span>
                </div>
              </div>
            </div>
          </Popover.Button>
          <Transition
            show={sequence.pattern !== "bruteforce" && isShowing}
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              className="z-10 bg-primary absolute w-44 flex flex-wrap text-sm mt-3 transform px-0 rounded-md border-2 border-secondary"
              onMouseEnter={() => setIsShowing(true)}
              onMouseLeave={() => setIsShowing(false)}
            >
              <div className="px-3 py-2">
                {sequence.pattern === "dictionary" &&
                  <Fragment>
                    Dictionary name: {_.capitalize(sequence.dictionary_name)}
                    {sequence.l33t &&
                      <Fragment>
                        <div>Leet: True</div>
                        <div>Matched word: {sequence.matched_word}</div>
                        <div>L33t characters:</div>
                        <div>{sequence.sub_display}</div>
                        <div>Base guesses: {sequence.base_guesses}</div>
                      </Fragment>
                    }
                    {sequence.reversed &&
                      <Fragment>
                        <div>Reversed: True</div>
                        <div>Matched word: {sequence.matched_word}</div>
                        <div>Base guesses: {sequence.base_guesses}</div>
                      </Fragment>
                    }
                    <div>Total guesses: {sequence.guesses}</div>
                  </Fragment>
                }
                {sequence.pattern === "repeat" && sequence.base_matches.map((item: any, index: number) => (
                  <Fragment key={index}>
                    <div>Base pattern: {_.capitalize(item.pattern)}</div>
                    <div>Base token: {item.token}</div>
                    <div>Repeat count: {sequence.repeat_count}</div>
                    <div>Base guesses: {item.guesses}</div>
                    <div>Total guesses: {sequence.guesses}</div>
                  </Fragment>
                ))
                }
                {sequence.pattern === "spatial" &&
                  <Fragment>
                    <div>Graph: {_.capitalize(sequence.graph)}</div>
                    <div>Turn(s): {sequence.turns}</div>
                    <div>Total guesses: {Math.round(sequence.guesses)}</div>
                  </Fragment>
                }
                {sequence.pattern === "sequence" &&
                  <Fragment>
                    <div>Sequence name: {_.capitalize(sequence.sequence_name)}</div>
                    <div>Ascending: {sequence.ascending ? "True" : "False"}</div>
                    <div>Total guesses: {sequence.guesses}</div>
                  </Fragment>
                }
                {sequence.pattern === "date" &&
                  <Fragment>
                    <div>Day: {sequence.day}</div>
                    <div>Month: {sequence.month}</div>
                    <div>Year: {sequence.year}</div>
                    <div>Separator: {sequence.separator || "NA"}</div>
                    <div>Total guesses: {sequence.guesses}</div>
                  </Fragment>
                }
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default SequenceItem