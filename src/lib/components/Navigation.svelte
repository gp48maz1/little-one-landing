<script>
  import { navigation } from '$lib/data.js';
</script>

<section class="nav2 pad" id="navigation">
  <div class="wrap">
    <div class="shead"><span class="n">07</span><h2>Flight path &amp; ground control</h2></div>
    <p class="ssub">How to find the airfield. Ground crew on standby for any questions.</p>
    <div class="navgrid">
      <div class="info">
        {#each navigation as line}
          <div class="infoline"><span class="k">{line.k}</span><span class="v">{line.v}</span></div>
        {/each}
      </div>
      <div class="map" aria-label="Stylized airfield map">
        <div class="runway" aria-hidden="true"></div>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          style="position:absolute;top:14px;right:16px"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="17" fill="none" stroke="#4E84A4" stroke-width="2" />
          <path d="M20 5 L24 20 L20 35 L16 20 Z" fill="#E9B949" />
          <text x="20" y="3" text-anchor="middle" font-size="7" fill="#4E84A4" font-family="monospace">N</text>
        </svg>
      </div>
    </div>
  </div>
</section>

<style>
  .nav2 {
    background: var(--cream-2);
    border-top: 1px solid var(--line);
  }
  .navgrid {
    display: flex;
    flex-wrap: wrap;
    gap: 26px;
    align-items: center;
  }
  .info {
    flex: 1 1 280px;
  }
  .map {
    flex: 1 1 300px;
    height: 220px;
    border-radius: 16px;
    border: 1px solid var(--line);
    background:
      repeating-linear-gradient(0deg, rgba(159, 203, 227, 0.18) 0 1px, transparent 1px 26px),
      repeating-linear-gradient(90deg, rgba(159, 203, 227, 0.18) 0 1px, transparent 1px 26px),
      var(--cream);
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .runway {
    position: absolute;
    left: 18%;
    top: 60%;
    width: 64%;
    height: 14px;
    background: var(--ink);
    border-radius: 8px;
    transform: rotate(-18deg);
    box-shadow: 0 0 0 6px rgba(57, 54, 47, 0.06);
  }
  .runway::after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    top: 50%;
    height: 2px;
    transform: translateY(-50%);
    background: repeating-linear-gradient(90deg, var(--lemon) 0 10px, transparent 10px 20px);
  }
  .infoline {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .infoline .k {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--ink-soft);
    min-width: 74px;
    padding-top: 2px;
  }
  .infoline .v {
    font-family: 'Fraunces', serif;
    font-size: 16px;
    font-weight: 600;
  }
</style>
