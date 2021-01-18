import { RefObject, useEffect, useState } from 'react';
import { listIndexMethods } from '../../shared/methods';

export const useTabulation = (
  targetRef: RefObject<HTMLDivElement>,
  querySelector: string,
  initialIndex: number,
  lastIndex: number,
) => {

  /* state */
  const [focusableElements, setFocusableElements] =
    useState<NodeListOf<HTMLButtonElement> | undefined>(undefined);
  const [focusedButtonIndex, setFocusedButtonIndex] = useState(initialIndex);

  /* methods */
  const tabulate = (e: KeyboardEvent) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      setFocusedButtonIndex(listIndexMethods.getPrev(focusedButtonIndex, lastIndex));
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setFocusedButtonIndex(listIndexMethods.getNext(focusedButtonIndex, lastIndex));
    }
  };

  /* use effects */
  useEffect(() => {
    window.addEventListener('keydown', tabulate);
    return () => window.removeEventListener('keydown', tabulate);
    // eslint-disable-next-line
  }, [focusedButtonIndex]);

  useEffect(() => {
    if (targetRef.current) {
      setFocusableElements(targetRef.current.querySelectorAll(querySelector));
    }
  }, [targetRef, querySelector]);

  useEffect(() => {
    if (focusableElements) {
      try {
        focusableElements[focusedButtonIndex].focus();
      }catch(e: any) {
        console.log(`ERROR! focusedButtonIndex: ${focusedButtonIndex}`);
      }
    }
  }, [focusedButtonIndex, focusableElements]);
};
