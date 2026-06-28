<script>
  import { finn } from '$lib/data.js';
</script>

<section class="security pad" id="security">
  <div class="wrap center">
    <div class="shead" style="justify-content:center">
      <span class="n">03</span><h2>Airport security</h2>
    </div>
    <p class="ssub" style="margin-left:auto;margin-right:auto">{finn.intro}</p>
    <div class="lanyard">
      <div class="top">
        <div class="hole" aria-hidden="true"></div>
        <div class="org">{finn.org}</div>
        <div class="ttl">{finn.badgeTitle}</div>
      </div>
      <div class="body">
        <div class="photo">
          <img src={finn.photo} alt="Finn, the Head of K-9 Security" />
        </div>
        <div class="finnname">{finn.name}</div>
        <div class="finnrole">{finn.role}</div>
        <div class="finntable">
          {#each finn.rows as row}
            <div class="r"><span class="k">{row.k}</span><span class="v">{row.v}</span></div>
          {/each}
        </div>
        <p class="finnbio">{finn.bio}</p>
      </div>
    </div>
  </div>
</section>

<style>
  .security {
    background: linear-gradient(180deg, var(--cream) 0%, #f2f6ee 100%);
    border-top: 1px solid var(--line);
  }
  .lanyard {
    max-width: 430px;
    margin: 0 auto;
    background: var(--cream);
    border: 1px solid var(--sage);
    border-radius: 20px;
    box-shadow: var(--shadow);
    overflow: hidden;
  }
  .top {
    background: var(--sage-deep);
    color: #f3f7ec;
    text-align: center;
    padding: 16px 14px 26px;
    position: relative;
  }
  .hole {
    width: 54px;
    height: 10px;
    border-radius: 999px;
    background: #2f3a23;
    margin: 0 auto 12px;
  }
  .org {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }
  .ttl {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    font-size: 22px;
    margin-top: 4px;
  }
  .body {
    padding: 0 24px 26px;
    margin-top: -18px;
    text-align: center;
  }
  .photo {
    width: 118px;
    height: 118px;
    border-radius: 50%;
    border: 5px solid var(--cream);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    margin: 0 auto 10px;
    overflow: hidden;
    background: var(--butter);
  }
  .photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .finnname {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    font-size: 24px;
    margin: 2px 0 0;
  }
  .finnrole {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    color: var(--sage-deep);
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .finntable {
    text-align: left;
    margin: 16px auto 0;
    max-width: 330px;
  }
  .finntable .r {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px dashed var(--line);
    padding: 8px 0;
  }
  .finntable .r .k {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }
  .finntable .r .v {
    font-family: 'Fraunces', serif;
    font-size: 15px;
    font-weight: 600;
  }
  .finnbio {
    margin: 16px auto 0;
    max-width: 360px;
    font-size: 15px;
    color: var(--ink-soft);
  }
</style>
