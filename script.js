//Ürün bilgileri dizi tipindeki değişkenlere alındı.
let pubg=["100 uc","40","1000","100","10000","500"];
let ZULA=["100za","30","1000","80","10000","350"];
let VALORANT=["100VP","50","1000","100","10000","800"];

//Döngü için sayaç değişkeni
let i;

//Kategori seçimine göre doldurulacak ürünlerin input ve label tanımı için
let urunAciklama,urunSecenek;

//Sepete eklenecek ürünlerin ve ürünlere ait fiyatların ayrı ayrı taşınması için
let eklenecekler=[];
let fiyatlar=[];

//Sepete ekleme,çıkarma ve boşaltma için sepet nesnesinin seçimi
let listeSepet=document.getElementById("para sepeti");

//Ödenecek toplam tutarı başta sıfırlayarak tanımladık.
let toplamTutar=0;

//İndirim kodu için bir dizi veya değişken tanımlanabilir.
const kod="PROMO10";

//Kategori seçiminde ürünlerin güncellenmesi için olay yakalayıcı tanımlandı.
for(i=0;i<document.getElementsByName("kategori").length;i++)
{
    document.getElementsByName("kategori")[i].addEventListener("change",urunleriGetir);
}   

//Her kategori seçiminde gelecek ürünleri listeleyecek nesneler ve özellikleri tanımlandı
function olustur(){
    urunAciklama=document.createElement("label");
    urunSecenek=document.createElement("input");
    document.getElementById("urunPanel").appendChild(urunAciklama);
    document.getElementById("urunPanel").appendChild(urunSecenek);
    urunSecenek.type="checkbox";
    urunSecenek.setAttribute("name","urunler");
    urunAciklama.setAttribute("for","urunler");
    urunAciklama.setAttribute("class","urunler");
}

//Kategori seçimi yapıldıktan sonra ürün listesini(checkbox) doldurur.
function urunleriGetir(){
    //Ürün panelini her seferinde temizleyip yeniden doldurmak için 
    const silinecekler = document.getElementById("urunPanel");
    while (silinecekler.hasChildNodes()) {
      silinecekler.removeChild(silinecekler.firstChild);
    }

    //Her kategoriye ait ürün içeriklerini dizi üzerinden aldık.
    if(document.getElementById("kategoriuc").checked)
    {
        for(i=0;i<sutUrunleri.length;i=i+2)
        {
            olustur();
            urunSecenek.value=pubgUrunleri[i+1];
            urunAciklama.innerHTML=pubgUrunleri[i]; 
        }
    }
    else if(document.getElementById("kategoriza").checked)
    {
        for(i=0;i<zulaUrunleri.length;i=i+2)
        {
        olustur();
        urunSecenek.value=zulaUrunleri[i+1];
        urunAciklama.innerHTML=zulaUrunleri[i];
        }
    }
    else if(document.getElementById("kategorivp").checked)
    {
        for(i=0;i<valorantUrunleri.length;i=i+2)
        {
        olustur();
        urunSecenek.value=valorantUrunleri[i+1];
        urunAciklama.innerHTML=valorantUrunleri1[i];
        }
    }
}

function sepeteEkle(){
    //Sepete eklenecek ürünleri alacağımız checkbox inputlar alındı.
    const listeUrunlerFiyat=document.getElementsByName("urunler");
    const listeUrunlerAd=document.getElementsByClassName("urunler");
    
    //Eklenecekler ve fiyatlar dizileri her ekleme sırasında sıfırlandı.
        eklenecekler=[];
        fiyatlar=[];

        //Checkbox inputlarının hepsi gezilerek seçili olanlar dizilere eklendi.
        for(i=0;i<listeUrunlerFiyat.length;i++){
            if(listeUrunlerFiyat[i].checked){
                toplamTutar+=Number(listeUrunlerFiyat[i].value);
                eklenecekler.push(listeUrunlerAd[i].innerHTML);
                fiyatlar.push(listeUrunlerFiyat[i].value);
            }
        }

        //Eklenecekleri ve fiyatlarını alabildik mi diye bir bakalım?
        console.log(eklenecekler);
        console.log(fiyatlar);

    //Eklenecek ürün adedi seçimi
    let adet=document.getElementById("urunAdet").value;
    console.log(adet);

    //Eklenecek ürün adedi kadar aynı işlemi tekrar et
    for(i=0;i<adet;i++)
    {
        let sepeteEklenecekUrun;
        //Eklenecekler listesindeki herbir ürün için liste elemanlarını oluştur.
        for(i=0;i<eklenecekler.length;i++){
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            //Her eklenen ürün için ad ve fiyat bilgilerini ilgili dizilerden çeker.
            sepeteEklenecekUrun.text=eklenecekler[i];
            sepeteEklenecekUrun.value=fiyatlar[i];
        }
        /*
        eklenecekler.forEach(element => {
            sepeteEklenecekUrun=document.createElement("option");
            listeSepet.options.add(sepeteEklenecekUrun);
            sepeteEklenecekUrun.text=element;
            sepeteEklenecekUrun.value="Fiyat?";

        });
        */
    }

    //Ekleme işlemi yapılınca ara toplam tutarını yazdır.
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

//Sepetten seçili ürünü indeks değerine bakarak siler.
function sepettenCikar(){
    //Seçili elemanın indeks sırasını ve valuesini alarak toplam tutardan düştük ve sildik.
    let seciliIndeks=listeSepet.selectedIndex;
    let silinecekUrununFiyati=listeSepet.options[seciliIndeks].value;
    listeSepet.options.remove(seciliIndeks);
    //Silinen ürünün fiyatını toplam fiyattan düşürür.
    toplamTutar=toplamTutar-silinecekUrununFiyati;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
}

//Tüm ürünleri sözel döngü fonksiyonuyla gezerek
function sepetiBosalt(){
    document.querySelectorAll('#sepetMarket option').forEach(eleman => eleman.remove());
    toplamTutar=0;
    document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";

}

//İndirim kodunu kontrol ederek indirim uygulama
function koduEkle(){
    let girilenKod=document.getElementById("txtIndirim").value;
    if(girilenKod =DORUK= kod)
    {
        if(toplamTutar>=50)
        {
            toplamTutar=toplamTutar-10;
            
            document.getElementById("sepetTutar").innerHTML=toplamTutar+" TL";
            document.getElementById("sonuc").innerHTML="İndirim uygulandı.";
            document.getElementById("txtIndirim").disabled=true;
            document.getElementById("txtIndirim").value="";
        }
        else{
            document.getElementById("sonuc").innerHTML="Girdiğiniz kod için minimum sepet tutarı 50 TL olmalıdır!";
        }
    }
    else{
        document.getElementById("sonuc").innerHTML="Geçerli bir kod girmediniz!";
    }
}



