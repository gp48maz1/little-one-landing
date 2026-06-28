<script>
  import { navigation, map } from '$lib/data.js';
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
      <div class="mapwrap">
        <iframe
          class="map"
          title="Map to the airfield"
          src={map.embed}
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
        <a class="maplink" href={map.link} target="_blank" rel="noopener noreferrer">
          Open in Google Maps ↗
        </a>
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
  .mapwrap {
    flex: 1 1 300px;
    border-radius: 16px;
    border: 1px solid var(--line);
    overflow: hidden;
    box-shadow: var(--shadow);
    background: var(--cream);
    position: relative;
  }
  .map {
    display: block;
    width: 100%;
    height: 260px;
    border: 0;
  }
  .maplink {
    display: block;
    text-align: center;
    padding: 9px 12px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: var(--sky-deep);
    text-decoration: none;
    border-top: 1px solid var(--line);
    background: var(--cream-2);
  }
  .maplink:hover {
    color: var(--navy);
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
