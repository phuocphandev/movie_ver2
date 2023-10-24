import React, { useState } from "react";
import { useSprings, animated, to as interpolate } from "@react-spring/web";

import styles from "./styles.module.css";
import { useDrag } from "@use-gesture/react";

const cards = [
  "/image/introPoster/morbius.jpg",
  "/image/introPoster/alcasser.jpg",
  "/image/introPoster/JohnWick4.jpg",
  "/image/introPoster/transformers.jpg",
  "/image/introPoster/TheWitcher.jpg",
  "/image/introPoster/spiderman_no_way_home_ver4.jpg",
];

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;

export const Introduction = () => {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, (i) => ({
    ...to(i),
    from: from(i),
  })); // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
 const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
  const trigger = velocity[0] > 0.2 ;
  const dir = xDir < 0 ? -1 : 1;

  if (!down && trigger) {
    gone.add(index);
  }

  api.start((i) => {
    if (index !== i) return;
    // console.log("idx: ", index, "-------i: ", i)
   
    const isGone = gone.has(index);
    const x = isGone 
    ? ((200 + window.innerWidth) * dir) 
    : ((down)? mx : 0);

    const rot = mx / 100 + (isGone ? dir * 10 * velocity[0] : 0);
    const scale = down ? 1.1 : 1;

    return {
      x,
      rot,
      scale,
      delay: undefined,
      config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
    };
  });

  
  if (!down && gone.size === cards.length) {
    setTimeout(() => {
      gone.clear();
      api.start((i) => to(i));
    }, 600);
  }
});
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <div className="relative h-[35vh] md:h-[60vh]  w-screen flex justify-center items-center mb-[10vh] ">
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className={`${styles.deck} w-[90%] md:w-[45%] `} key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: interpolate([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
              width:"",
            }}
          />
        </animated.div>
      ))}
    </div>
  );
};

export default Introduction;
