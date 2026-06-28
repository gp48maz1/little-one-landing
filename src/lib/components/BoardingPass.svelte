<script>
  import { boardingPass, departureBoard } from '$lib/data.js';
</script>

<section class="boarding pad" id="details">
  <div class="wrap">
    <div class="shead"><span class="n">01</span><h2>Your boarding pass</h2></div>
    <p class="ssub">Everything you need for the day, on one little ticket.</p>
    <div class="pass">
      <div class="main">
        <div class="barhead">
          <div class="air">{boardingPass.airline}</div>
          <div class="cls">{boardingPass.class}</div>
        </div>
        <div class="grid">
          {#each boardingPass.rows as row}
            <div class="f"><div class="k">{row.k}</div><div class="v">{row.v}</div></div>
          {/each}
        </div>
      </div>
      <div class="stub">
        <div class="k">Flight</div>
        <div class="v">{boardingPass.stub.flight}</div>
        <div class="k">Date</div>
        <div class="v">{boardingPass.stub.date}</div>
        <div class="k">Seat</div>
        <div class="seat">{boardingPass.stub.seat}</div>
        <div class="barcode" aria-hidden="true"></div>
      </div>
    </div>

    <div class="board" aria-label="Departure board quick glance">
      {#each departureBoard as tile}
        <div class="tile"><div class="lbl">{tile.lbl}</div><div class="big">{tile.big}</div></div>
      {/each}
    </div>
  </div>
</section>

<style>
  .boarding {
    background: var(--cream-2);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }
  .pass {
    display: flex;
    background: var(--cream);
    border: 1px solid var(--kraft-line);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  .main {
    flex: 1;
    padding: 26px 30px;
  }
  .barhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed var(--line);
    padding-bottom: 14px;
    margin-bottom: 18px;
  }
  .barhead .air {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .barhead .cls {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    color: var(--ink-soft);
    letter-spacing: 0.1em;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px 14px;
  }
  .grid .f .k {
    font-family: 'Space Mono', monospace;
    font-size: 10.5px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }
  .grid .f .v {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    font-weight: 600;
    margin-top: 2px;
  }
  .stub {
    width: 230px;
    background: repeating-linear-gradient(180deg, var(--kraft) 0 22px, #e9d9af 22px 24px);
    border-left: 2px dashed var(--kraft-line);
    padding: 24px 22px;
    position: relative;
  }
  .stub::before,
  .stub::after {
    content: '';
    position: absolute;
    left: -11px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--cream-2);
    border: 1px solid var(--kraft-line);
  }
  .stub::before {
    top: -11px;
  }
  .stub::after {
    bottom: -11px;
  }
  .stub .k {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #6b5a2a;
  }
  .stub .v {
    font-family: 'Fraunces', serif;
    font-weight: 700;
    font-size: 17px;
    margin: 1px 0 14px;
    color: #4a3f20;
  }
  .stub .seat {
    font-family: 'Space Mono', monospace;
    font-size: 40px;
    font-weight: 700;
    color: #4a3f20;
    letter-spacing: 0.04em;
  }
  .barcode {
    height: 42px;
    margin-top: 14px;
    background: repeating-linear-gradient(
      90deg,
      #4a3f20 0 2px,
      transparent 2px 4px,
      #4a3f20 4px 5px,
      transparent 5px 9px
    );
  }

  .board {
    background: var(--navy);
    border-radius: 16px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    box-shadow: var(--shadow);
    margin-top: 22px;
  }
  .tile {
    background: #16242e;
    border-radius: 10px;
    padding: 14px 12px;
    text-align: center;
    border: 1px solid #31505f;
  }
  .tile .lbl {
    font-family: 'Space Mono', monospace;
    font-size: 10px;
    letter-spacing: 0.14em;
    color: #7fb0c6;
    text-transform: uppercase;
  }
  .tile .big {
    font-family: 'Space Mono', monospace;
    font-weight: 700;
    font-size: 21px;
    color: var(--lemon);
    margin-top: 6px;
    letter-spacing: 0.02em;
  }

  @media (max-width: 760px) {
    .pass {
      flex-direction: column;
    }
    .stub {
      width: auto;
      border-left: 0;
      border-top: 2px dashed var(--kraft-line);
    }
    .stub::before {
      top: -11px;
      left: 50%;
    }
    .stub::after {
      bottom: auto;
      top: -11px;
      left: auto;
      right: 50%;
    }
    .grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media (max-width: 620px) {
    .board {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>
