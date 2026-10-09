SCENTORY CONTROL ROOM — PRIVATE BETA v1

Files: index.html, logo.png

1. Upload these two files to a SEPARATE private-beta hosting location (not your live customer site).
2. Open the HTTPS address and sign in with the existing SCENTORY Supabase Owner email/password.
3. Confirm you can view 129 perfumes and 524 sizes.
4. Try editing a non-critical perfume only after reviewing RLS policies and MFA.

Features: owner login, catalogue browsing/search, product status/name/notes/image URL/longevity/sale flag editing, size price/availability editing, read-only orders and expenses.
Not included yet: MFA enrollment/challenge flow, order creation, automatic order capture, cost/stock movements, new perfume creation, photo uploads, monthly profit, website synchronization. Do NOT treat this as a production-ready security-reviewed app.

SECURITY: Never put Supabase secret/service_role keys or passwords in these files. Only the public publishable key is embedded. RLS and secure policies must be tested separately. Existing Auth session may not have MFA assurance level aal2; this beta does not enforce aal2.

Website: No changes to scentoryfragrance.com are included.
