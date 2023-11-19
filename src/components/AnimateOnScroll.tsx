"use client";

import { InView } from "react-intersection-observer";

export default function AnimationOnScroll({
  children,
  delay,
  classNameInView,
  classNameNotInView,
}: {
  children: React.ReactNode;
  delay?:number
  classNameInView: string;
  classNameNotInView: string;
}) {
  return (
    <InView triggerOnce threshold={0.5} delay={delay}>
      {({ inView, ref, entry }) => (
        <div
          ref={ref}
          className={
            inView
              ? "transition-all duration-1000 " + classNameInView
              : "transition-all duration-1000	" + classNameNotInView
          }
        >
          {children}
        </div>
      )}
    </InView>
  );
}
