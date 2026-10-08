import {
  canSavePracticePassword,
  readPracticePassword,
  savePracticePassword,
} from "../../progress/practicePassword";
import CompletionNotice from "../../components/CompletionNotice";
import CompletionBadge from "../../components/CompletionBadge";
import type { ActivityProgressProps } from "../../progress/courseProgress";
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { assessPassword, MAX_PASSWORD_LENGTH } from "./passwordStrength";
import styles from "./PasswordCourse.module.css";
import TextSizeControl, {
  type TextSizeProps,
} from "../../components/TextSizeControl";

const examples = [
  {
    name: "Yleinen salasana",
    value: "salasana",
    lesson:
      "Tuttu sana on helppo arvata. Myös suomalaiset sanat voivat löytyä hyökkääjän sanalistalta.",
  },
  {
    name: "Pieni muutos",
    value: "Salasana123!",
    lesson:
      "Iso alkukirjain, numerosarja ja huutomerkki ovat tavallisia muutoksia. Merkkien vaihtelu ei yksin tee salasanasta vahvaa.",
  },
  {
    name: "Useita sanoja",
    value: "majakka sieni viulu pilvi",
    lesson:
      "Pituus ja toisistaan riippumattomat sanat vaikeuttavat arvaamista. Huom: Tämä julkinen esimerkki ei sovi oikeaksi salasanaksi.",
  },
];

export default function PasswordCourse({
  isComplete,
  onComplete,
  ...textSizeProps
}: TextSizeProps & ActivityProgressProps) {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visited, setVisited] = useState<number[]>([]);
  const [example, setExample] = useState<number | null>(null);
  const [hasTyped, setHasTyped] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasSaved, setHasSaved] = useState(
    () => readPracticePassword() !== null,
  );
  const [saveError, setSaveError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const assessment = useMemo(() => assessPassword(password), [password]);
  const tooLong = password.length > MAX_PASSWORD_LENGTH;

  const examplesInspected = visited.length === examples.length;
  const canSave = canSavePracticePassword({
    examplesInspected,
    hasTyped,
    isExample: examples.some((item) => item.value === password),
    score: assessment?.score,
  });

  async function savePassword() {
    if (!canSave || isSaving) return;
    setIsSaving(true);
    setSaveError("");
    try {
      await savePracticePassword(password);
      setHasSaved(true);
      setPassword("");
      setVisible(false);
      setHasTyped(false);
      onComplete();
    } catch {
      setSaveError(
        "Tallennus ei onnistunut. Tarkista, että selaimen tallennus on sallittu ja käytössä on suojattu yhteys. Voit yrittää uudelleen. Merkkiä ei myönnetty tästä yrityksestä.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  function selectExample(index: number) {
    setHasTyped(false);
    setSaveError("");
    setPassword(examples[index].value);
    setExample(index);
    setVisible(true);
    const nextVisited = visited.includes(index) ? visited : [...visited, index];
    setVisited(nextVisited);
  }

  return (
    <div className={styles.root} data-course="passwords">
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to="/course/passwords">← Takaisin aiheisiin</Link>
          <TextSizeControl {...textSizeProps} />
        </div>
      </nav>
      <main className={styles.main}>
        <header>
          <p className={styles.eyebrow}>Aihe 1 · Salasanojen turvallisuus</p>
          <h1>Kokeile salasanan vahvuutta</h1>
          <p>
            Millainen salasana on vaikea arvata? Tutki esimerkkejä ja kokeile
            sitten omaa harjoitussalasanaa. Voit edetä rauhassa.
          </p>
          <div role="status" aria-live="polite">
            {isComplete && (
              <CompletionBadge label="Aihe suoritettu – ansaitsit merkin!" />
            )}
          </div>
        </header>
        <div className={styles.layout}>
          <section className={styles.card} aria-labelledby="practice-title">
            <h2 id="practice-title">Salasanalaboratorio</h2>
            <p id="privacy" className={styles.notice}>
              <strong>Käytä vain keksittyjä harjoitussalasanoja.</strong> Älä
              kirjoita tähän oikeaa salasanaasi. Harjoitus arvioi tekstin omassa
              selaimessasi eikä lähetä sitä palvelimelle. Kun valitset Tallenna,
              tähän selaimeen tallennetaan tarkistustieto kurssin viimeistä
              kysymystä varten, ei salasanaa luettavassa muodossa.
            </p>
            <label className={styles.label} htmlFor="practice-password">
              Harjoitussalasana
            </label>
            <input
              ref={input}
              id="practice-password"
              type={visible ? "text" : "password"}
              value={password}
              disabled={isSaving}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-describedby={`privacy length${tooLong ? " length-error" : ""}`}
              aria-invalid={tooLong}
              onChange={(event) => {
                setPassword(event.target.value);
                setHasTyped(true);
                setSaveError("");
                setExample(null);
              }}
            />
            <div className={styles.controls}>
              <button
                type="button"
                disabled={isSaving}
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                {visible ? "Piilota salasana" : "Näytä salasana"}
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => {
                  setPassword("");
                  setHasTyped(false);
                  setSaveError("");
                  setExample(null);
                  setVisible(false);
                  input.current?.focus();
                }}
              >
                Tyhjennä
              </button>
            </div>
            <p id="length" className={styles.small}>
              {Array.from(password).length} merkkiä · Voit käyttää myös
              välilyöntejä.
            </p>
            <div
              role="status"
              aria-live="polite"
              aria-atomic="true"
              className={styles.result}
            >
              {tooLong ? (
                <p id="length-error">
                  Teksti on liian pitkä arvioitavaksi. Lyhennä sitä
                  kokeillaksesi uudelleen.
                </p>
              ) : assessment ? (
                <>
                  <p className={styles.score}>
                    Arvio: <strong>{assessment.label}</strong> (
                    {assessment.score}/4)
                  </p>
                  <div className={styles.meter} aria-hidden="true">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <span
                        key={level}
                        data-filled={level <= assessment.score}
                        data-score={assessment.score}
                      />
                    ))}
                  </div>
                  <ul>
                    {assessment.tips.map((tip) => (
                      <li key={tip}>{tip}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>
                  Kirjoita harjoitussalasana tai valitse esimerkki. Näet arvion
                  tässä.
                </p>
              )}
            </div>
            {examplesInspected && (
              <section
                className={styles.notice}
                aria-labelledby="create-password-title"
              >
                <h3 id="create-password-title">
                  Seuraava tehtävä: luo vahva salasana
                </h3>
                <p>
                  Kirjoita yllä olevaan kenttään oma keksitty harjoitussalasana,
                  jonka arvio on 4/4. Valitse sitten Tallenna ansaitaksesi
                  merkin. Älä käytä esimerkkisalasanaa.
                </p>
                <p>
                  Muista luomasi salasana: syötät sen uudelleen kurssin
                  viimeisessä kysymyksessä. Tallennus toimii tässä selaimessa.
                  Uusi tallennus korvaa aiemman harjoitussalasanan.
                </p>
                <button
                  type="button"
                  disabled={!canSave || isSaving}
                  onClick={savePassword}
                  aria-describedby="save-requirements"
                >
                  {isSaving ? "Tallennetaan…" : "Tallenna"}
                </button>
                <p id="save-requirements">
                  Tallennus avautuu, kun oma kirjoittamasi salasana saa arvion
                  4/4.
                </p>
              </section>
            )}
            <div role="status" aria-live="polite">
              {saveError && <p>{saveError}</p>}
              {hasSaved && (
                <CompletionNotice>
                  <p>
                    Harjoitussalasanasi on tallennettu tarkistusta varten ja
                    olet ansainnut merkin! Käytä samaa salasanaa kurssin
                    viimeisessä kysymyksessä.
                  </p>
                </CompletionNotice>
              )}
            </div>
            <p className={styles.small}>
              Arvio ei takaa turvallisuutta. Mittari ei tunnista kaikkia
              suomalaisia sanoja, henkilötietoja tai vuotaneita salasanoja. Se
              ei tiedä, onko salasanaa käytetty muualla.
            </p>
          </section>
          <aside className={styles.card} aria-labelledby="examples-title">
            <h2 id="examples-title">Tutki</h2>
            <p>
              Valitse esimerkki ja huomaa, miten arvio muuttuu. Älä käytä
              esimerkkejä oikeilla tileilläsi.
            </p>
            <div className={styles.examples}>
              {examples.map((item, index) => (
                <button
                  type="button"
                  key={item.name}
                  disabled={isSaving}
                  aria-pressed={example === index}
                  onClick={() => selectExample(index)}
                >
                  <strong>
                    {index + 1}. {item.name}
                  </strong>
                  <span>{item.value}</span>
                  <small>
                    {visited.includes(index)
                      ? "✓ Tutkittu"
                      : "Kokeile esimerkkiä"}
                  </small>
                </button>
              ))}
            </div>
            <div aria-live="polite" aria-atomic="true">
              {example !== null && (
                <p className={styles.lesson}>{examples[example].lesson}</p>
              )}
              <p>
                <strong>
                  Esimerkkejä tutkittu: {visited.length}/{examples.length}
                </strong>
              </p>
              {examplesInspected && (
                <div className={styles.notice}>
                  <p>
                    Hienoa, tutkit kaikki esimerkit! Luo nyt oma
                    harjoitussalasana, jonka arvio on 4/4, ja tallenna se
                    ansaitaksesi merkin.
                  </p>
                  <button
                    type="button"
                    disabled={isSaving}
                    onClick={() => {
                      setPassword("");
                      setExample(null);
                      setHasTyped(false);
                      setVisible(false);
                      setSaveError("");
                      input.current?.focus();
                    }}
                  >
                    Luo oma salasana
                  </button>
                </div>
              )}
            </div>
            <p className={styles.small}>
              Ansaitset merkin tutkimalla kaikki esimerkit ja tallentamalla oman
              4/4-harjoitussalasanan. Esimerkkien tutkiminen yksin ei vielä
              riitä.
            </p>
          </aside>
        </div>
        <section className={styles.takeaway} aria-labelledby="remember-title">
          <h2 id="remember-title">Muista oikeilla tileilläsi</h2>
          <p>
            Käytä pitkää ja yksilöllistä salasanaa jokaisessa palvelussa.
            Salasananhallintaohjelma auttaa. Ota myös monivaiheinen
            tunnistautuminen käyttöön: silloin kirjautuminen vahvistetaan
            salasanan lisäksi esimerkiksi puhelimella.
          </p>
        </section>
      </main>
    </div>
  );
}
