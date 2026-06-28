<script>
  import { refreshments } from '$lib/data.js';
</script>

<section class="refresh pad" id="refreshments">
  <div class="wrap">
    <div class="lemons" aria-hidden="true">
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="22" rx="14" ry="11" fill="#F4D35E" stroke="#E9B949" stroke-width="2" />
        <path d="M30 14 q6 -4 8 -1 q-3 4 -8 3" fill="#A3B18A" />
        <circle cx="6" cy="22" r="1.6" fill="#fff" />
      </svg>
      <svg width="34" height="34" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" style="margin-top:8px">
        <ellipse cx="20" cy="22" rx="13" ry="10" fill="#F7DE7E" stroke="#E9B949" stroke-width="2" />
        <path d="M28 15 q5 -3 7 -1 q-2 3 -7 2" fill="#A3B18A" />
      </svg>
      <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="22" rx="14" ry="11" fill="#F4D35E" stroke="#E9B949" stroke-width="2" />
        <path d="M30 14 q6 -4 8 -1 q-3 4 -8 3" fill="#A3B18A" />
        <circle cx="6" cy="22" r="1.6" fill="#fff" />
      </svg>
    </div>
    <div class="center">
      <div class="shead" style="justify-content:center">
        <span class="n">05</span><h2>Fresh-squeezed at the airfield</h2>
      </div>
      <p class="squeeze2">{refreshments.squeeze}</p>
      <p class="s">{refreshments.body}</p>
    </div>
  </div>
</section>

<style>
  .refresh {
    background: linear-gradient(180deg, #fff6cf 0%, var(--cream) 100%);
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    text-align: center;
  }
  .squeeze2 {
    font-family: 'Pinyon Script', cursive;
    color: var(--lemon-deep);
    font-size: 56px;
    line-height: 1;
    margin: 6px 0 4px;
  }
  .s {
    color: #7a6212;
    max-width: 520px;
    margin: 0 auto;
  }
  .lemons {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin: 6px 0 18px;
  }
</style>
