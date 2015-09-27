<h2>NoSQL, NOSQL ja NewSQL</h2>

Relaatiotietokannat dominoivat tietokantaskeneä muutaman kymmenen vuoden ajan. 2000-luvulla alkoi kuitenkin nousta esiin uuden tyyppisiä tietokantaratkaisuja joita kuvaamaan lanseeratiin termi <em>NoSQL</em>.


RElatiomalli *one size fits all*

<h3>Syitä uusien tietokantaratkaisujen syntyyn</h3>

Motivaatiota NoSQL-tietokantojen syntyyn oli muutamia. Ehkä tärkeimpänä tekijänä olivat massiivisen skaalan internetpalveluiden, esim. Amazonin ja Googlen käsittelemät tietomäärät, jotka tiedon edellyttävät hajautettua tallentamista ja käsittelyä. Relaatiomallia oli mahdotonta saada skaalautumaan palveluiden tarpeeseen ja monet yhtiöt kehittivät omia aivan uudenlaisia tietokantaratkaisuja. Yhteistä näille oli, että ne skaalautuivat (eli niiden suorituskyky oli mahdollista pitää riittävällä tasolla liittämällä tietokantaan uusia "koneita" kuormituksen kasvaessa) hyvin ja myös se, että toiminnallisuudeltaan ratkaisut olivat paljon rajoittuneempia kuin relaatiotietokannat.

Uudet ratkaisut tarjoavat paljon suppeammat kyselykielet kuin SQL ja
ne eivät tarjonneet samanlaista ACID-ominaisuuksia takaavia transaktioita. Hyvin tavanomaista uusissa tietokannoissa on se, että ne eivät yritäkään tarjota samanlaista ajantasaisuutta kuin relaatiotietokannat, eli sen sijaan että kaikki kannan käyttäjät näkisivät tietokannan tilan koko ajan samanlaisena, on käytössä <em>eventual consistency</em> -malli, jossa periaatteena on se että jokainen tietokantaan tehty muutos näkyy kaikille käyttäjille ennemmin tai myöhemmin, mutta ei välttämättä heti, ja että jonkun aikaa tilanne voi olla se, että tietokannan eri käyttäjät näkevät tietokannan tilan hieman erilaisena. Jos ajatellaan monia internetpalveluita täydellinen konsistenssi ei ole kaikkien operaatioiden suhteen välttämätöntä, ei esim. haittaa vaikka yksittäisen käyttäjän Facebook-päivitykset eivät ilmesty kaikille aivan samalla hetkellä.

Toisena vahvana motivaationa uusien tietokantamallien kehittymiselle oli tarve joustavimmille tavoille tallettaa eri muotoista dataa. Relaatiomalli nojaa vahvasti siihen että kannan skeema, eli taulut ja taulujen sarakkeet on ennalta määritelty. Jos syntyy usein tarve tallettaa uudenlaista dataa, esim. tauluihin tulee viikoittain uusia sarakkeita, tai jopa syntyy tarve uudenlaisille tauluille, on relaatiomalli kankeahko. Toisaalta myös tarve tallettaa jokainen "asia" omaan tauluunsa tekee relaatiomallista kankean ja kyselyllisestikin raskaan tiettyihin käyttötarkoituksiin. Lääkkeenä näihin ongelmiin on syntynyt tietokantaratkaisuja joissa datan skeema on huomattavasti löyhemmin määritelty kuin relaatiomallissa, monissa uusissa tietokantatyypeissä data on tietokannan kannalta jopa täysin skeematonta, eli "tauluihin" voi tallettaa vapaamuotoista dataa, ja vastuu tieton muodon oikeellisuudesta on siirretty täysin
tietokannan käyttäjäjälle.

<h3>Erilaiset NoSQL-tietokannat</h3>

Kaikki relaatiotietokannat ovat enemmän tai vähemmän samanlaisia ja tarjoavat standardoidun tavan eli SQL:n tietojen kyselyyn, ylläpitoon sekä tietokantaskeemojen muokkaukseen. NoSQL-tietokantojen kohdalla tilanne on täysin erilainen, ne ovat tiedon organisaatiotavoiltaan hyvinkin erilaisia ja mitään SQL:ää vastaavaa standardoitua kyselykieltä ei ole, kaikilla NoSQL-tietokannoilla on oma tapansa kyselyjen muodostamiseen.

<h3>Redis</h3>

Käshe, laske lukukauden opintopisteet...

<h3>MongoDB</h3>