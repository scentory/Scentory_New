SCENTORY v3084

DEPLOYMENT
1. Extract the Update-Only ZIP.
2. Select every file inside it.
3. Upload directly into the flat root of GitHub repo Scentory_New.
4. Replace same-name files and commit.

IMPORTANT
- Do not upload the containing folder itself. Files must remain in repo root.
- Master prices and stock are controlled by perfumes.json.
- Anniversary prices are controlled by the locked FROZEN_OFFERS table in anniversary-v3082.js.
- The Anniversary layer does not make unavailable sizes available.
- The six perfumes added on 30 Sep (Hawas Thunder, Hawas Lava Gold, Versace Eros Flame EDP, Rayhaan Floriana, Spectre Ghost, Ateeq Nusuk) remain regular-price only.

v3084 also corrects two master interpretations from the previous package:
- Kenzo Homme EDT Intense: whole perfume stockout.
- Khadlaj Island Sun 6 ML: regular 6 ML, not Premium.

The Update-Only package deliberately includes the shared product/cart dependencies to prevent the missing-JS issue from v3082.
