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
        <!-- plane at the end of the path: Material "flight" icon, nose up-right.
             Positioned/rotated/animated from CSS (.plane) so reduced-motion keeps
             the same resting placement. Inner group centres + scales the icon. -->
        <g class="plane">
          <g transform="scale(2.5) translate(-11.5 -12)">
            <path
              d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"
              fill="#F4D35E"
              stroke="#E9B949"
              stroke-width="0.7"
              stroke-linejoin="round"
            />
          </g>
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
    transform: translate(836px, 74px) rotate(45deg);
    animation: bob 4s ease-in-out infinite;
  }
  @keyframes bob {
    0%,
    100% {
      transform: translate(836px, 74px) rotate(45deg);
    }
    50% {
      transform: translate(836px, 68px) rotate(48deg);
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
