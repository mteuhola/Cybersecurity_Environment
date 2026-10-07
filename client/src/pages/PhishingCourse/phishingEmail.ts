export const emailParts = [
  {
    id: "sender",
    label: "Lähettäjä",
    text: "Aurinkopankki <turva@aurinkopankki-tarkistus.example>",
    suspicious: true,
    title: "Lähettäjän osoite",
    explanation:
      "Näyttönimi voi olla mikä tahansa. Lähettäjän verkkotunnus aurinkopankki-tarkistus.example eroaa harjoituksen pankin osoitteesta aurinkopankki.example. Myöskään tutulta näyttävä lähettäjä ei yksin takaa aitoutta.",
    hint: "Vertaa lähettäjän @-merkin jälkeistä osaa pankin osoitteeseen.",
  },
  {
    id: "subject",
    label: "Aihe",
    text: "Tilisi suljetaan 30 minuutin kuluttua – toimi heti!",
    suspicious: true,
    title: "Kiire ja uhkaus",
    explanation:
      "Tilin sulkemisella uhkaaminen ja lyhyt määräaika painostavat toimimaan tarkistamatta. Pysähdy ja tarkista asia itse pankin sovelluksesta tai tutusta yhteystiedosta.",
    hint: "Yrittääkö viestin aihe saada sinut toimimaan kiireessä?",
  },
  {
    id: "greeting",
    label: "Tervehdys",
    text: "Hyvä asiakas,",
    suspicious: false,
    title: "Yleinen tervehdys",
    explanation:
      "Yleinen tervehdys voi esiintyä sekä oikeassa että huijausviestissä. Se ei yksin ole tässä tehtävässä etsittävä varoitusmerkki. Myöskään oma nimesi viestissä ei todista sitä aidoksi.",
    hint: "",
  },
  {
    id: "request",
    label: "Viesti",
    text: "Havaitsimme tililläsi poikkeavaa toimintaa. Vastaa tähän viestiin verkkopankin käyttäjätunnuksellasi, salasanallasi ja puhelimeesi tulevalla vahvistuskoodilla.",
    suspicious: true,
    title: "Salaisten tietojen pyyntö",
    explanation:
      "Salasanaa tai kirjautumisen vahvistuskoodia ei pidä lähettää sähköpostissa. Niillä huijari voisi päästä tilillesi. Älä vastaa pyyntöön.",
    hint: "Mitä tietoja sinua pyydetään lähettämään vastauksessa?",
  },
  {
    id: "link",
    label: "Linkki ja sen kohde (harjoituksessa näkyvissä)",
    text: "Vahvista tilisi → https://aurinkopankki-turva.example/kirjaudu",
    suspicious: true,
    title: "Väärään osoitteeseen vievä linkki",
    explanation:
      "Linkin osoite ei ole harjoituksen pankin aurinkopankki.example. Pankin nimi osoitteen osana tai https-alku ei takaa aitoutta. Avaa pankin sovellus tai kirjoita tuntemasi osoite itse.",
    hint: "Vertaa linkin verkkotunnusta harjoituksen pankin osoitteeseen.",
  },
  {
    id: "attachment",
    label: "Liite",
    text: "Turvapaivitys.exe",
    suspicious: true,
    title: "Odottamaton ohjelmaliite",
    explanation:
      "Pääte .exe tarkoittaa Windowsissa suoritettavaa ohjelmaa. Odottamaton turvapäivitykseksi nimetty liite voi asentaa haittaohjelman. Älä avaa sitä.",
    hint: "Katso liitteen nimeä ja sen .exe-päätettä.",
  },
  {
    id: "secrecy",
    label: "Lisäohje",
    text: "Älä soita pankin asiakaspalveluun tai kerro tästä läheisillesi. Yhteydenotto keskeyttää tilisi suojaamisen.",
    suspicious: true,
    title: "Tarkistamisen estäminen",
    explanation:
      "Viestissä yritetään estää avun pyytäminen ja asian tarkistaminen. Voit aina pysähtyä ja kysyä neuvoa läheiseltä tai pankilta itse etsimäsi yhteystiedon kautta.",
    hint: "Miksi viesti kieltää soittamasta pankkiin tai kysymästä apua?",
  },
  {
    id: "signature",
    label: "Allekirjoitus",
    text: "Ystävällisin terveisin, Aurinkopankin asiakaspalvelu",
    suspicious: false,
    title: "Asiallinen allekirjoitus",
    explanation:
      "Kohtelias allekirjoitus on tavallinen myös aidoissa viesteissä. Sen voi kuitenkin kopioida, joten se ei todista viestin aitoutta. Tarkastele viestiä kokonaisuutena.",
    hint: "",
  },
] as const;

export const clues = emailParts.filter((part) => part.suspicious);
