<h2>NoSQL, NOSQL ja NewSQL</h2>

Relaatiomalli ja SQL ovat hyvin ilmaisuvoimainen kombinaatio jolla pystyy ainakin teoriassa hoitamaan kaikki mahdolliset tiedonhallintatarpeet. Relaatiotietokannat dominoivatkin tietokantaskeneä muutaman kymmenen vuoden ajan. 2000-luvulla alkoi kuitenkin nousta esiin uuden tyyppisiä tietokantaratkaisuja joita kuvaamaan lanseeratiin vuonna 2009 termi <em>NoSQL</em>.

<h3>Syitä uusien tietokantaratkaisujen syntyyn</h3>

Motivaatiota NoSQL-tietokantojen syntyyn oli muutamia. Ehkä tärkeimpänä tekijänä olivat massiivisen skaalan internetpalveluiden, esim. Amazonin ja Googlen käsittelemät tietomäärät, jotka tiedon edellyttävät hajautettua tallentamista ja käsittelyä. Relaatiomallia oli mahdotonta saada skaalautumaan palveluiden tarpeeseen ja monet yhtiöt kehittivät omia aivan uudenlaisia tietokantaratkaisuja. Yhteistä näille oli, että ne skaalautuivat (eli niiden suorituskyky oli mahdollista pitää riittävällä tasolla liittämällä tietokantaan uusia "koneita" kuormituksen kasvaessa) hyvin ja myös se, että toiminnallisuudeltaan ratkaisut olivat paljon rajoittuneempia kuin relaatiotietokannat.

Uudet ratkaisut tarjoavat paljon suppeammat kyselykielet kuin SQL ja ne eivät tarjonneet samanlaista ACID-ominaisuuksia takaavia transaktioita. Hyvin tavanomaista uusissa tietokannoissa on se, että ne eivät yritäkään tarjota samanlaista ajantasaisuutta kuin relaatiotietokannat, eli sen sijaan että kaikki kannan käyttäjät näkisivät tietokannan tilan koko ajan samanlaisena, on käytössä <em>eventual consistency</em> -malli, jossa periaatteena on se että jokainen tietokantaan tehty muutos näkyy kaikille käyttäjille ennemmin tai myöhemmin, mutta ei välttämättä heti, ja että jonkun aikaa tilanne voi olla se, että tietokannan eri käyttäjät näkevät tietokannan tilan hieman erilaisena. Jos ajatellaan monia internetpalveluita täydellinen konsistenssi ei ole kaikkien operaatioiden suhteen välttämätöntä, ei esim. haittaa vaikka yksittäisen käyttäjän Facebook-päivitykset eivät ilmesty kaikille aivan samalla hetkellä.

Toisena vahvana motivaationa uusien tietokantamallien kehittymiselle oli tarve joustavimmille tavoille tallettaa eri muotoista dataa. Relaatiomalli nojaa vahvasti siihen että kannan skeema, eli taulut ja taulujen sarakkeet on ennalta määritelty. Jos syntyy usein tarve tallettaa uudenlaista dataa, esim. tauluihin tulee viikoittain uusia sarakkeita, tai jopa syntyy tarve uudenlaisille tauluille, on relaatiomalli kankeahko. Toisaalta myös tarve tallettaa jokainen "asia" omaan tauluunsa tekee relaatiomallista kankean ja kyselyllisestikin raskaan tiettyihin käyttötarkoituksiin. Lääkkeenä näihin ongelmiin on syntynyt tietokantaratkaisuja joissa datan skeema on huomattavasti löyhemmin määritelty kuin relaatiomallissa, monissa uusissa tietokantatyypeissä data on tietokannan kannalta jopa täysin skeematonta, eli "tauluihin" voi tallettaa vapaamuotoista dataa, ja vastuu tieton muodon oikeellisuudesta on siirretty täysin tietokannan käyttäjäjälle.

<h3>Erityyppiset NoSQL-tietokannat</h3>

Kaikki relaatiotietokannat ovat enemmän tai vähemmän samanlaisia ja tarjoavat standardoidun tavan eli SQL:n tietojen kyselyyn, ylläpitoon sekä tietokantaskeemojen muokkaukseen. NoSQL-tietokantojen kohdalla tilanne on täysin erilainen, ne ovat tiedon organisaatiotavoiltaan hyvinkin erilaisia ja mitään SQL:ää vastaavaa standardoitua kyselykieltä ei ole, kaikilla NoSQL-tietokannoilla on oma tapansa kyselyjen muodostamiseen.

NoSQL-tietokannat voidaan jakaa tiedon organisointitapansa perusteella neljään eri luokkaan:

<ul>
<li>Avain-arvotietokannat (key value databases)</li>
<li>Dokumenttitietokannat (document databases)</li>
<li>Saraketietokannat (columnar databases)</li>
<li>Verkkotietokannat (graph databases)</li>
</ul>

Tarkastellaan nyt erilaisia NoSQL-tietokantoja hieman tarkemmin.

<h4>Avain-arvotietokannat, Redis</h4>

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

Eräs hyvin yleinen käyttötarkoitus avain-arvotietokannoille on raskaiden operaatioiden tulosten cacheaminen, eli väliaikainen talletus mahdollisia uusia saman operaatioiden suorituksia varten.

Tarkastellaan tästä estimerkkinä internetistä <a href="http://openweathermap.org/api">Open Weather API:sta</a> eri kaupunkien säätietoja hakevaa ohjelmaa. Ohjelma toiminta näyttää seuraavalta:

<pre>
kaupunki: helsinki
few clouds, temperature 15.770000000000039 celcisus
kaupunki: turku
Sky is Clear, temperature 16.0 celcisus
kaupunki: vladivostok
scattered clouds, temperature 11.360000000000014 celcisus
kaupunki:
</pre>

Jokaisen kaupungin kohdalla ohjelma hakee kaupungin säätiedot internetistä. Tiedon haku verkosta on kuitenkin hidas ja resurssien kulutuksen suhteen "kallis" operaatio (asialla voisi olla merkitystä jos ohjelmallamme olisi satoja tai tuhansia yhtäaikaisia käyttäjiä). Koska säätiedot pysyvät suunilleen samana useiden minuuttien ajan, ohjelmaa voi optimoida siten, että käytyään kerran jonkun kaupungin säätiedot, talletetaan tieto joksikin aikaa Redisiin. Jos kaupungin säätä kysytään pian uudelleen, saadaan vastaus nopeasti ilman kallista internetoperaatiota.

Seuraavassa sääpalvelun toteuttavan luokan <stron>WeatherService</strong> toteutus, joka hyödyntää
<a href="https://github.com/xetorthio/jedis">Jedis</a>-kirjastoa Redis-operaatioiden tekemiseen:

<pre>
import redis.clients.jedis.Jedis;

public class WeatherService {
    private Jedis jedis;

    public WeatherService() {
        // luodaan yhteys paikallisen koneen Redisiin
        jedis = new Jedis("localhost");
    }

    public void weatherOf(String city) throws Exception {
        // kutsutaan metodia, joka hakee tiedot joko
        // Redisistä tai internetistä
        JsonElement weatherData = getDataFor(city);

        // haetaan vastauksen sisältä oikeat osat
        double temperature = getTemperatureFrom(weatherData);
        String desc = getDescriptionFrom(weatherData);

        System.out.println(desc + ", temperature "+temperature+ " celcisus");
    }

    // metodi joka hakee tiedot joko Redisistä tai internetistä
    private JsonElement getDataFor(String city) throws Exception {
        // etsitään kaupungin city säätietoja rediksestä
        String weatherInfo = jedis.get(city);

        // jos ei löytyny
        if (weatherInfo==null) {
            // haetaan tiedot internetistä
            weatherInfo = readFromUrl("http://api.openweathermap.org/data/2.5/weather?q="+city);

            // ja talletetaan ne redisiin
            jedis.set(city, weatherInfo);
            // määritellään tallennusajaksi minuutti
            jedis.expire(city, 60);
        }

        return new JsonParser().parse(weatherInfo);
    }

    // apumetodeja...
}
</pre>

Palvelua käytetään seuraavasti:

<pre>
  WeatherService weather = new WeatherService();
  weather.weatherFor("Helsinki");
</pre>

Kun haemme ensimmäistä kertaa esim. kaupungin <em>Helsinki</em> tietoja, etsitään niitä (metodissa <em>getDataFor</em>) ensin rediksestä:

<pre>
// nyt city = "Helsinki"
  String weatherInfo = jedis.get(city);
</pre>

tiedot eivät löydy, joten metodi palauttaa <em>null</em>. Tämän takia mennään if-haaraan, jossa tiedot haetaan apumetodin avulla internetistä. Haetut tiedot talletetaan ensin redisiin:

<pre>
  // nyt city="Helsinki" ja weatherInfo Helsingin sään 'raakadata'
  jedis.set(city, weatherInfo);
</pre>

talletetulle datalle asetetaan myös elinaika sekunneissa:

<pre>
  jedis.expire(city, 60);
</pre>

tämän jälkeet data palautetaan kutsujalle.

Jos Helsingin säätietoja haetaan 60 sekunnin sisällä uudelleen, löytyvät tiedot suoraan redististä. 60 sekunnin kuluttua hakuoperaatio <em>jedis.get('Helsinki')</em> palauttaa jälleen <em>null</em> ja tuore säätilanne haetaan internetistä.

Ohjelman koodi kokonaisuudessan löytyy
<a href="https://github.com/tietokantojen-perusteet/WeatherApp">GitHubista</a>

Lisää avain-arvotietokannoista esim. <a href="https://en.wikipedia.org/wiki/Key-value_database">wikipediasta</a>

<h4>Dokumenttitietokannat, MongoDB</h4>

Dokumeenttitietokantojen voi ajatella sijoittuvan jonnekin relaatiotietokantojen ja avain-arvotietokantojen puolen välin tienoille. Dokumenttikannat perustuvat avain-arvotietokantojen tapaan arvojen tallettamiseen avaimen perusteella. Arvot tai <em>dokumentit</em> kuten niitä dokumenttikantojen kontekstissa nimitetään voivat kuitenkin olla itsessään hyvin monimutkaisia oliota, jotka sisältävät kenttiä, joiden arvona voi olla joko promitiiviarvoja tai muita olioita. Toisin kuin avain-arvotietokannoissa, dokeumenttikannat "näkevät" tietokantaan talletettujen dokumenttien sisään, ja mahdollistavat talletettujen dokumenttien sisällön suhteen tehdyt kyselyt.

Dokumenttikannoissa käytetään tiedon loogisena esitysmuotona <a href="https://fi.wikipedia.org/wiki/JSON">JSON</a>:ia. Seuraavassa
kurssia </em>Ohjelmoinnin perusteet</em> esittävä JSON-dokumentti:

<pre>
{
  "id": 1,
  "nimi": "Ohjelmoinnin perusteet",
  "laajuus": 5,
  "luennot": [ "Arto Vihavainen", "Matti Luukkainen" ]
}
</pre>

JSON-dokumentti koostuu avain-arvo-pareista. Avainta vastaava arvo merkitään kaksoispisteellä erotettuna avaimen yhteyteen.

Kurssi-dokumentissa on siis kolme avain-arvo-paria, voidaankin ajatella että kurssilla on kolme kenttää. Poikkeavaa relaatiotietokantoihin nähden on se, että kentän arvona voi olla taulukko.

Seuraavassa on opiskelijaa kuvaava dokumentti:

<pre>
{
  "id" : 59,
  "nimi" : "Pekka Mikkola",
  "opiskelijanumero" : 14112345,
  "osoite" : {
                "katu" : "Tehtaankatu 10 B 1",
                "postinumero" : "00120",
                "postitoimipaikka" : "Helsinki"
             }
}
</pre>

Nyt kentän osoite arvona on olio jolla on itsellään omat kenttänsä.

Dokumenttitietokannassa dokumentit on lajuteltu <em>kokoelmiin</em> (engs. collection). Kokoelman merkitys on suunilleen sama kuin taulun relaatiotietokannassa. Yhdessä kokoelmassa olevien dokumenttien ei kuitenkaa tarvitse olla kentiltään samanlaisia. Kenttiä voi olla vaihteleva määrä ja saman nimiset kentät voivat sisältää eri dokumenteilla eri tyyppisen arvon. Kokoelmille ei määritellä dokumenttikannoissa minkäänlaista skeemaa, eli on täysin sovellusten vastuulla, että kantaan talletetaan järkevää dataa, ja että kannasta luettava data tutkitaan oikein.




<h4>Sarake- ja verkkotietokannat</h4>

<h3>NOSql ja NewSql</h3>

teesi... antiteesi... synteesi