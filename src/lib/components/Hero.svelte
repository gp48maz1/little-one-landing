<script>
  import { hero, event } from '$lib/data.js';
</script>

<section class="hero" id="top">
  <div class="wrap inner">
    <p class="eyebrow">{hero.eyebrow}</p>
    <p class="squeeze">{hero.squeeze}</p>
    <p class="arrival">
      {hero.arrivalPre}<span class="name">{hero.arrivalName}</span>{hero.arrivalPost}
    </p>
    <div class="meta">
      <span>🗓 {event.dateShort}</span>
      <span>🕓 {event.timeStart}</span>
      <span>📍 {event.venueName}</span>
    </div>
    <br />
    <a class="btn" href="#rsvp">{hero.cta}</a>
  </div>
  <div class="skyscene">
    <div class="planewrap">
      <svg
        viewBox="0 0 900 210"
        width="100%"
        height="210"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Yellow plane following a dotted flight path"
      >
        <!-- clouds -->
        <g fill="#ffffff" opacity="0.92" aria-hidden="true">
          <ellipse cx="120" cy="58" rx="46" ry="26" />
          <ellipse cx="158" cy="64" rx="34" ry="22" />
          <ellipse cx="86" cy="68" rx="30" ry="20" />
          <ellipse cx="760" cy="40" rx="40" ry="22" />
          <ellipse cx="792" cy="48" rx="30" ry="18" />
          <ellipse cx="730" cy="48" rx="26" ry="16" />
        </g>
        <!-- dotted flight path arc -->
        <path
          d="M40 188 Q 360 120 600 132 T 880 60"
          fill="none"
          stroke="#9FCBE3"
          stroke-width="3"
          stroke-dasharray="2 12"
          stroke-linecap="round"
        />
        <!-- little yellow prop plane at the end of the path, nose up-and-right -->
        <g class="plane" transform="translate(800,74) rotate(-16)">
          <!-- tail fin -->
          <path d="M-44 -7 L-57 -31 L-28 -9 Z" fill="#E9B949" />
          <!-- horizontal stabilizer -->
          <path d="M-42 4 L-63 0 L-42 -5 Z" fill="#E9B949" stroke="#E9B949" stroke-width="1.5" />
          <!-- low wing, swept back -->
          <path d="M6 7 L-20 34 L9 34 L31 9 Z" fill="#E9B949" />
          <!-- fuselage -->
          <path
            d="M-53 0 C-50 -9 -24 -13 4 -13 C30 -13 49 -9 60 -1 C62 0 62 0 60 1 C49 9 30 13 4 13 C-24 13 -50 9 -53 0 Z"
            fill="#F4D35E"
            stroke="#E9B949"
            stroke-width="2"
          />
          <!-- cabin windows -->
          <circle cx="31" cy="-3" r="4.5" fill="#C9E5F2" stroke="#4E84A4" stroke-width="2" />
          <circle cx="15" cy="-2" r="4.5" fill="#C9E5F2" stroke="#4E84A4" stroke-width="2" />
          <circle cx="-1" cy="-1" r="4" fill="#C9E5F2" stroke="#4E84A4" stroke-width="2" />
          <!-- spinner + propeller at the nose -->
          <circle cx="60" cy="0" r="3.5" fill="#7C6A2E" />
          <rect x="61.5" y="-13" width="3" height="26" rx="1.5" fill="#7C6A2E" opacity="0.85" />
          <!-- landing gear (it's coming in to land, after all) -->
          <line x1="8" y1="12" x2="6" y2="25" stroke="#7C6A2E" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="5" cy="27" r="4" fill="#39362F" />
          <line x1="-12" y1="12" x2="-14" y2="24" stroke="#7C6A2E" stroke-width="2.5" stroke-linecap="round" />
          <circle cx="-15" cy="26" r="4" fill="#39362F" />
        </g>
      </svg>
    </div>
  </div>
</section>

<style>
  .hero {
    background: linear-gradient(180deg, var(--sky-soft) 0%, #e7f2f6 42%, var(--cream) 100%);
    padding: 60px 0 0;
    overflow: hidden;
  }
  .inner {
    position: relative;
    text-align: center;
    z-index: 2;
  }
  .eyebrow {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.26em;
    text-transform: uppercase;
    color: var(--sky-deep);
    margin: 0 0 18px;
  }
  .squeeze {
    font-family: 'Pinyon Script', cursive;
    color: var(--sky-deep);
    font-size: 78px;
    line-height: 0.9;
    margin: 0;
  }
  .arrival {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 30px;
    margin: 10px 0 4px;
    letter-spacing: -0.01em;
  }
  .arrival .name {
    color: var(--lemon-deep);
  }
  .meta {
    display: inline-flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
    margin: 18px 0 6px;
  }
  .meta span {
    font-family: 'Space Mono', monospace;
    font-size: 12.5px;
    background: rgba(255, 253, 245, 0.8);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 7px 14px;
    color: var(--ink);
  }
  .btn {
    margin-top: 18px;
  }
  .skyscene {
    position: relative;
    height: 210px;
    margin-top: 14px;
  }
  .skyscene svg {
    display: block;
  }
  .planewrap {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    width: 100%;
    max-width: 900px;
  }

  /* Light motion: the plane gently bobs along its heading. Disabled for
     reduced-motion. transform-box keeps the rotate origin on the plane. */
  .plane {
    transform-box: fill-box;
    transform-origin: center;
    animation: bob 4s ease-in-out infinite;
  }
  @keyframes bob {
    0%,
    100% {
      transform: translate(800px, 74px) rotate(-16deg);
    }
    50% {
      transform: translate(800px, 68px) rotate(-18deg);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .plane {
      animation: none;
    }
  }

  @media (max-width: 620px) {
    .squeeze {
      font-size: 54px;
    }
    .arrival {
      font-size: 24px;
    }
  }
</style>
