# Password strength activity

Open `/course/passwords`, or choose the password topic on the home page.
The activity is in Finnish to match the existing interface. It is an initial
password lesson; it does not implement the remaining exercises or quiz advertised
on the course selection page.

## Estimation and privacy

The activity uses [zxcvbn-ts](https://zxcvbn-ts.github.io/zxcvbn/guide/getting-started/)
with its common and English dictionaries plus the Finnish password list in
`common_finnish_passwords.txt` at the client root. Keep one entry per line, with
the most common entries first: the estimator uses list order as a frequency rank.
The file is imported as text by Vite at build time; editing it updates the list
on the next build (or during development). Blank lines and duplicate entries are
ignored, and entries are trimmed and lowercased. No runtime download is required.
Scores are the library's 0–4 guessing-resistance estimates, not
percentages or guarantees. Finnish vocabulary and personal information coverage
are limited. There is no breached-password lookup. Before a thesis experiment,
review the Finnish examples and calibrate against a representative password set.

Feedback encourages length and avoiding predictable patterns, consistent with
[NIST's password guidance](https://pages.nist.gov/800-63-4/sp800-63b/passwords/).
There is no requirement to combine uppercase letters, digits, and symbols, and
no potentially misleading exact cracking-time countdown.

Password text stays in component memory. It is not logged, persisted, included in
URLs, or sent to a server. Leaving the route clears the component state. The input
is hidden by default and autocomplete is disabled; browsers/extensions may still
apply their own autofill policies. Public examples become visible when selected.
Only fictional practice passwords should be entered. Input above 128 UTF-16 code
units is rejected rather than silently truncated, bounding estimator work.

The route is lazy-loaded to keep the substantial dictionaries off the initial
course-selection download. The production build reports a large route chunk.

## Gamification and accessibility

The Octalysis design intent is Development & Accomplishment (three explored
examples and encouraging completion feedback), Empowerment of Creativity &
Feedback (free experimentation with immediate explanations), and
Unpredictability & Curiosity (comparing examples). These are design mappings,
not a validated Octalysis evaluation. Progress records example exploration only,
not mastery, and resets when leaving or refreshing. No timers or competition.

The page includes labelled input, keyboard-operable controls, visible focus,
48px minimum button height, responsive single-column layout, textual ratings in
addition to colour, and polite screen-reader announcements. Usability with older
participants and assistive technology still needs human testing.

## Verification

From `client`, using Node 24 (tests use TypeScript stripping and module hooks):

```sh
node --test tests/passwordStrength.test.mjs
npm run build
npm run lint
```

Manually check the home-page link, all example buttons, typing and clearing,
show/hide, keyboard navigation, narrow screens, and screen-reader announcements.
Verify that no requests containing input are made in the browser Network panel.
