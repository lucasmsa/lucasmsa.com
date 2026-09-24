/** The wet edge on InkButton's fill. Rendered once, since filter ids are page-global. */
export function InkFilter() {
  return (
    <svg width="0" height="0" className="ink-filter" aria-hidden="true">
      <filter id="ink-edge" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.06"
          numOctaves="2"
          seed="7"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="10"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
