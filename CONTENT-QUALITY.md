# Editorial and sharing implementation notes

## Content review

Before publishing a financial guide, check that:

- “Bank reconciliation” means comparing the general-ledger balance with the bank statement, including reconciling items; it is not just a bank-feed match.
- A transfer between accounts is not revenue or an expense unless the underlying transaction is actually income or a cost.
- A customer balance is accounts receivable; a vendor balance is accounts payable.
- Intercompany balances are presented as matching receivables and payables, or appropriate due-to/due-from accounts, based on the entities’ chart of accounts.
- Sales tax collected is not business revenue; it is generally a liability until remitted, subject to the applicable accounting method and jurisdiction.
- Use-tax statements are qualified by jurisdiction, registration, transaction facts, and current law.
- “Audit,” “tax advice,” “assurance,” and “attest” are not used to describe reconciliation or preparation support unless the appropriate licensed service is actually being provided.

Avoid absolute claims such as “every audit,” “always,” or guaranteed savings. Prefer “often,” “may,” “typically,” and clearly scoped examples.

## Share controls

The reusable share module is in `assets/share.js` and `assets/share.css`. It supports native device sharing where available and otherwise copies the URL with a confirmation toast.

To add a share button to an individual service or guide card:

```html
<article class="service-card" data-shareable data-share-title="Service title">
```

For a page-level share control:

```html
<div class="article-share-target" data-share-title="Guide title"></div>
```

Load the module after the page styles:

```html
<link rel="stylesheet" href="assets/share.css">
<script src="assets/share.js" defer></script>
```
