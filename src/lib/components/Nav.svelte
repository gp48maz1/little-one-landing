<script>
  import { nav } from '$lib/data.js';
</script>

<nav>
  <div class="wrap row">
    <div class="brand"><span class="dot"></span>Little One Landing</div>
    <ul>
      {#each nav as item}
        <li><a href={item.href}>{item.label}</a></li>
      {/each}
    </ul>
    <a class="cta" href="#rsvp">Check In</a>
  </div>
</nav>

<style>
  nav {
    position: sticky;
    top: 0;
    z-index: 30;
    background: rgba(255, 253, 245, 0.86);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--line);
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
  }
  .brand {
    font-family: 'Fraunces', serif;
    font-weight: 600;
    font-size: 19px;
    display: flex;
    align-items: center;
    gap: 9px;
  }
  .brand .dot {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--lemon);
    box-shadow: 0 0 0 3px var(--butter);
  }
  ul {
    list-style: none;
    display: flex;
    gap: 22px;
    margin: 0;
    padding: 0;
  }
  a {
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.04em;
    color: var(--ink-soft);
    text-decoration: none;
    text-transform: uppercase;
  }
  a:hover {
    color: var(--sky-deep);
  }
  .cta {
    background: var(--lemon);
    color: #5b4a12;
    border: 1px solid var(--lemon-deep);
    border-radius: 999px;
    padding: 9px 16px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    text-decoration: none;
  }
  @media (max-width: 760px) {
    ul {
      display: none;
    }
  }
</style>
