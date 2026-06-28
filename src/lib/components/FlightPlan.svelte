<script>
  import { flightPlan } from '$lib/data.js';
</script>

<section class="pad" id="plan">
  <div class="wrap">
    <div class="shead"><span class="n">02</span><h2>Today's flight plan</h2></div>
    <p class="ssub">A loose itinerary — come when you can, stay as long as you like.</p>
    <div class="plan">
      <div class="line" aria-hidden="true"></div>
      {#each flightPlan as stop}
        <div class="stop">
          <div class="dot" aria-hidden="true">{stop.icon}</div>
          <h4>{stop.title}</h4>
          <div class="t">{stop.time}</div>
          <p>{stop.blurb}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .plan {
    position: relative;
    margin-top: 10px;
  }
  .line {
    position: absolute;
    left: 23px;
    top: 8px;
    bottom: 8px;
    border-left: 2px dashed var(--sky);
  }
  .stop {
    position: relative;
    padding: 14px 0 14px 64px;
  }
  .dot {
    position: absolute;
    left: 8px;
    top: 16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--cream);
    border: 2px solid var(--sky);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
  }
  h4 {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 18px;
    margin: 0;
  }
  .t {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: var(--sky-deep);
  }
  p {
    margin: 3px 0 0;
    color: var(--ink-soft);
    font-size: 15px;
  }
</style>
