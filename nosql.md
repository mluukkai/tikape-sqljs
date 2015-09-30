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

NoSQL-tietokannat voidaan jakaa tiedon organisointitapansa perusteella neljään eri luokkaan:

<ul>
<li>Avain-arvotietokannat (key value databases)</li>
<li>Dokumenttitietokannat (document databases)</li>
<li>Saraketietokannat (columnar databases)</li>
<li>Verkkotietokannat (graph databases)</li>
</ul>

Tarkastellaan nyt erilaisia NoSQL-tietokantoja hieman tarkemmin.

<h4>Avain-arvotietokanta Redis</h4>

Avain-arvotietokannat tarjoavat erittäin rajoitetun tietomallin, kantaan talletetaan _arvoja_ sekä arvon yksilöivä _avain_. Tietokannan suhteen talletettavilla arvoilla ei ole mitään skeemaa eli rakennetta. Sovellusten on tulkittava kantaan talletettavat arvot haluamallaan tavalla esim. jonkun tyyppisenä oliona. Koska tietokanta on täysin skeematon, eivät avain-arvotietokannat tule viitteitä kantaan talletettujen arvojen välillä, eli mitään relaatiotietokantojen liitosta vastaavaa käsitettä ei avain-arvotietokannoilla ole.

Avain-arvotietokantojen tarjoamat kyselymahdollisuudet ovat erittäin rajoittuneet, yleensä on ainoastaan mahdollista hakea kannasta tiettyä avaina vastaava arvo.

Tarkastellaan nyt <a href="http://redis.io/">Redisiä</a> joka on eräs suosituimmista avain-arvotietokannoista.

Redisin perusoperaatiot ovat <em>set, get</em> ja <em>del</em> joiden avulla käsitellään merkkijonomuotoisena talletettavia arvoja.

Seuraavassa esimerkissä asetetaan arvo avaimille <em>arto, aino</em> ja <em>olli</em>. Haetaan kannasta muutamaa avainta vastaavia tietoja ja tuhotaan avaimeen <em>arto</em> liittyvä arvo.

<pre>
melkki$ redis-cli
127.0.0.1:6379> set arto "olen arto 29 vuotta, yliopisto-opettaja"
OK
127.0.0.1:6379> set aino "olen aino 21 vuotta, pajaohjaaja"
OK
127.0.0.1:6379> set olli "olen olli 19 vuotta, fuksi"
OK
127.0.0.1:6379> get pekka
(nil)
127.0.0.1:6379> get arto
"olen arto 29 vuotta, yliopisto-opettaja"
127.0.0.1:6379> del arto
(integer) 1
127.0.0.1:6379> get arto
(nil)
127.0.0.1:6379> get aino
"olen aino 21 vuotta, pajaohjaaja"
127.0.0.1:6379>
</pre>

Redis on siis erittäin yksinkertainen ja toimii oikeastaan hyvin samaan tapaan kuin Javan <em>HashMap</em> sillä erotuksella, että Redisiin ei voi helposti tallentaa normaaleja oliota ja, että Redisiin talletetut arvot säilyvät vaikka ohjelma uudelleenkäynistettäisiin.

Redis tajoaa tuen myös arvoille jotka ovat lukuja, joukkoja tai hashejä eli itsessään avain-arvo-pareja.

Mitä järkeä avain-arvotietokannoissa on? Ne vaikuttavat ominaisuuksiltaan erittäin rajoittuneilta ja relaatiotietokannoilla pystyy tekemään varmasti kaikki ne asiat, joihin avain-arvotietokannat pystyvät. Rajoituksistaan johtuen avain-arvotietokannat ovat kuitenkin suorituskyvyltän ja skaalautuvuudeltaan huomattavasti parempia kuin relaatiotietokanta, ja niiden avulla pystytään kuitenkin ratkaisemaan monia sovellusten käyttötarpeita. Viime aikoina on kuitenkin ollut nousussa trendi jonka nimitys englanniksi on
<a href="http://martinfowler.com/bliki/PolyglotPersistence.html">polyglot persistance</a>, joka tarkoittaa suurinpiirtein sitä, että sovelluksessa on useita erityyppisiä tietokantoja ja kuhunkin käyttötarkoitukseen käytetään tarkoituksenmukaisinta ratkaisua.


Muita:
- riak

Käshe, laske lukukauden opintopisteet...

<h4>Dokumenttitietokanta MongoDB</h4>

<h4>Sarake- ja verkkotietokannat</h4>

<h3>NOSql ja NewSql</h3>