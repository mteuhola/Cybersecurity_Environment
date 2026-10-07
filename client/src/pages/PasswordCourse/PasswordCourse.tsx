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

export default function PasswordCourse(textSizeProps: TextSizeProps) {
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visited, setVisited] = useState<number[]>([]);
  const [example, setExample] = useState<number | null>(null);
  const input = useRef<HTMLInputElement>(null);
  const assessment = useMemo(() => assessPassword(password), [password]);
  const tooLong = password.length > MAX_PASSWORD_LENGTH;

  function selectExample(index: number) {
    setPassword(examples[index].value);
    setExample(index);
    setVisible(true);
    setVisited((previous) =>
      previous.includes(index) ? previous : [...previous, index],
    );
  }

  return (
    <div className={styles.root} data-course="passwords">
      <nav className={styles.nav} aria-label="Päänavigaatio">
        <Link to="/" className={styles.brand}>
          Turvassa Verkossa
        </Link>
        <div className="nav-actions">
          <Link to="/">← Takaisin aiheisiin</Link>
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
        </header>
        <div className={styles.layout}>
          <section className={styles.card} aria-labelledby="practice-title">
            <h2 id="practice-title">Salasanalaboratorio</h2>
            <p id="privacy" className={styles.notice}>
              <strong>Käytä vain keksittyjä harjoitussalasanoja.</strong> Älä
              kirjoita tähän oikeaa salasanaasi. Harjoitus arvioi tekstin omassa
              selaimessasi eikä lähetä tai tallenna sitä.
            </p>
            <label className={styles.label} htmlFor="practice-password">
              Harjoitussalasana
            </label>
            <input
              ref={input}
              id="practice-password"
              type={visible ? "text" : "password"}
              value={password}
              autoComplete="off"
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck={false}
              aria-describedby={`privacy length${tooLong ? " length-error" : ""}`}
              aria-invalid={tooLong}
              onChange={(event) => {
                setPassword(event.target.value);
                setExample(null);
              }}
            />
            <div className={styles.controls}>
              <button
                type="button"
                aria-pressed={visible}
                onClick={() => setVisible(!visible)}
              >
                {visible ? "Piilota salasana" : "Näytä salasana"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPassword("");
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
              {visited.length === 3 && (
                <p className={styles.notice}>
                  Hienoa, tutkit kaikki esimerkit! Kokeile seuraavaksi omaa
                  keksittyä salasanaa ja muuta sitä. Mitä huomaat?
                </p>
              )}
            </div>
            <p className={styles.small}>
              Eteneminen säilyy tämän harjoittelukerran ajan. Voit kokeilla niin
              monta kertaa kuin haluat.
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
          <Link to="/">Takaisin aiheisiin →</Link>
        </section>
      </main>
    </div>
  );
}
