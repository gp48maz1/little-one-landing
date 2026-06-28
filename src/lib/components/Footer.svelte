<script>
  import { footer } from '$lib/data.js';
</script>

<footer id="footer">
  <div class="wrap">
    <p class="squeeze3">{footer.squeeze}</p>
    <p class="hosts">{footer.hosts}</p>
    <p class="hash">{footer.hashLine}</p>
    <div class="finnbadge"><span class="pw" aria-hidden="true">🐾</span> {footer.badge}</div>
  </div>
</footer>

<style>
  footer {
    background: var(--navy);
    color: #cfe2ec;
    text-align: center;
    padding: 48px 0 56px;
  }
  .squeeze3 {
    font-family: 'Pinyon Script', cursive;
    color: var(--lemon);
    font-size: 46px;
    line-height: 1;
    margin: 0 0 6px;
  }
  .hosts {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    color: #eaf3f8;
    margin: 2px 0;
  }
  .hash {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    color: #86b3c8;
    letter-spacing: 0.06em;
    margin-top: 8px;
  }
  .finnbadge {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-top: 22px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid #3a5667;
    border-radius: 999px;
    padding: 9px 16px;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.06em;
    color: #dff0f7;
  }
  .finnbadge .pw {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--sage);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
