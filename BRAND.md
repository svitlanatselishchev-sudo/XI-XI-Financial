# XI:XI signature component

The signature mark is a precise 11:11 construction:

- Four equal vertical pillars represent the two `11` pairs.
- The short horizontal connector and centered dot represent the colon and the exact midpoint.
- Equal spacing creates a visual alignment axis and communicates synchronicity, control, and clarity.

## Component markup

```html
<a class="brand-signature" href="index.html" aria-label="XI:XI home">
  <img class="brand-signature__mark" src="assets/signature-mark.svg" alt="">
  <img class="brand-signature__wordmark" src="assets/logo-wordmark.svg" alt="XI:XI">
</a>
```

Use `.brand-signature--compact` in constrained mobile contexts; it keeps only the signature mark while retaining the same visual geometry. The combined `assets/logo-wordmark.svg` is also available as a single-image fallback for templates that use image-based logos.
