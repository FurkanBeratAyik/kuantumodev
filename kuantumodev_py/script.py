from abc import ABC, abstractmethod
import random


# Custom Exception
class KuantumCokusuException(Exception):
    def __init__(self, nesne_id):
        self.message = f"KUANTUM ÇÖKÜŞÜ! Nesne ID: {nesne_id} patladı!"
        super().__init__(self.message)


# Interface (Protocol)
class IKritik:
    def acil_durum_sogutmasi(self):
        pass


# Abstract Base Class
class KuantumNesnesi(ABC):
    def __init__(self):
        self._id = ""
        self._stabilite = 0.0
        self._tehlike_seviyesi = 0

    @property
    def id(self):
        return self._id

    @id.setter
    def id(self, value):
        self._id = value

    @property
    def stabilite(self):
        return self._stabilite

    @stabilite.setter
    def stabilite(self, value):
        if value > 100:
            self._stabilite = 100
        elif value < 0:
            self._stabilite = 0
        else:
            self._stabilite = value

    @property
    def tehlike_seviyesi(self):
        return self._tehlike_seviyesi

    @tehlike_seviyesi.setter
    def tehlike_seviyesi(self, value):
        if value < 1:
            self._tehlike_seviyesi = 1
        elif value > 10:
            self._tehlike_seviyesi = 10
        else:
            self._tehlike_seviyesi = value

    @abstractmethod
    def analiz_et(self):
        pass

    def durum_bilgisi(self):
        return f"ID: {self.id} - Stabilite: {self.stabilite:.2f}% - Tehlike: {self.tehlike_seviyesi}"


# Concrete Class 1: VeriPaketi
class VeriPaketi(KuantumNesnesi):
    def analiz_et(self):
        print("Veri içeriği okundu.")
        self.stabilite -= 5
        if self.stabilite <= 0:
            raise KuantumCokusuException(self.id)


# Concrete Class 2: KaranlikMadde
class KaranlikMadde(KuantumNesnesi, IKritik):
    def analiz_et(self):
        print("Karanlık madde analiz ediliyor...")
        self.stabilite -= 15
        if self.stabilite <= 0:
            raise KuantumCokusuException(self.id)

    def acil_durum_sogutmasi(self):
        print(f"Karanlık madde {self.id} soğutuluyor!")
        self.stabilite += 50


# Concrete Class 3: AntiMadde
class AntiMadde(KuantumNesnesi, IKritik):
    def analiz_et(self):
        print("⚠️ Evrenin dokusu titriyor...")
        self.stabilite -= 25
        if self.stabilite <= 0:
            raise KuantumCokusuException(self.id)

    def acil_durum_sogutmasi(self):
        print(f"Anti-madde {self.id} ACİL SOĞUTMA aktif!")
        self.stabilite += 50


# Main Program
class KuantumKaosYonetimi:
    def __init__(self):
        self.envanter = []
        self.nesne_counter = 1

    def yeni_nesne_ekle(self):
        tip = random.randint(1, 3)
        yeni_nesne = None
        tip_adi = ""

        if tip == 1:
            yeni_nesne = VeriPaketi()
            yeni_nesne.id = f"VP-{self.nesne_counter}"
            yeni_nesne.stabilite = random.randint(60, 100)
            yeni_nesne.tehlike_seviyesi = random.randint(1, 3)
            tip_adi = "Veri Paketi"
        elif tip == 2:
            yeni_nesne = KaranlikMadde()
            yeni_nesne.id = f"KM-{self.nesne_counter}"
            yeni_nesne.stabilite = random.randint(50, 90)
            yeni_nesne.tehlike_seviyesi = random.randint(5, 7)
            tip_adi = "Karanlık Madde"
        else:
            yeni_nesne = AntiMadde()
            yeni_nesne.id = f"AM-{self.nesne_counter}"
            yeni_nesne.stabilite = random.randint(40, 80)
            yeni_nesne.tehlike_seviyesi = random.randint(8, 10)
            tip_adi = "Anti-Madde"

        self.nesne_counter += 1
        self.envanter.append(yeni_nesne)
        print(f"✅ {tip_adi} eklendi: {yeni_nesne.durum_bilgisi()}")

    def envanteri_listele(self):
        if not self.envanter:
            print("📦 Envanter boş.")
            return

        print("\n═══ ENVANTER DURUM RAPORU ═══")
        for nesne in self.envanter:
            tip = type(nesne).__name__
            kritik = "[KRİTİK]" if isinstance(nesne, IKritik) else "[NORMAL]"
            print(f"{kritik} {tip} - {nesne.durum_bilgisi()}")

    def nesneyi_analiz_et(self):
        nesne_id = input("Analiz edilecek nesne ID: ")

        nesne = None
        for n in self.envanter:
            if n.id == nesne_id:
                nesne = n
                break

        if nesne is None:
            print("❌ Nesne bulunamadı!")
            return

        print(f"🔬 Analiz başlatılıyor: {nesne.id}")
        nesne.analiz_et()
        print(f"📊 Yeni durum: {nesne.durum_bilgisi()}")

    def acil_durum_sogutmasi(self):
        nesne_id = input("Soğutulacak nesne ID: ")

        nesne = None
        for n in self.envanter:
            if n.id == nesne_id:
                nesne = n
                break

        if nesne is None:
            print("❌ Nesne bulunamadı!")
            return

        if isinstance(nesne, IKritik):
            print("❄️ Acil durum soğutma protokolü başlatılıyor...")
            nesne.acil_durum_sogutmasi()
            print(f"✅ Soğutma tamamlandı: {nesne.durum_bilgisi()}")
        else:
            print("❌ Bu nesne soğutulamaz! Sadece kritik nesneler soğutulabilir.")

    def calistir(self):
        print("╔═══════════════════════════════════════════════════╗")
        print("║   OMEGA SEKTÖRÜ - KUANTUM VERİ AMBARI SİSTEMİ    ║")
        print("╚═══════════════════════════════════════════════════╝\n")

        while True:
            try:
                print("\n═══ KUANTUM AMBARI KONTROL PANELİ ═══")
                print("1. Yeni Nesne Ekle")
                print("2. Tüm Envanteri Listele")
                print("3. Nesneyi Analiz Et")
                print("4. Acil Durum Soğutması Yap")
                print("5. Çıkış")

                secim = input("\nSeçiminiz: ")

                if secim == "1":
                    self.yeni_nesne_ekle()
                elif secim == "2":
                    self.envanteri_listele()
                elif secim == "3":
                    self.nesneyi_analiz_et()
                elif secim == "4":
                    self.acil_durum_sogutmasi()
                elif secim == "5":
                    print("\nSistem güvenli bir şekilde kapatılıyor...")
                    break
                else:
                    print("❌ Geçersiz seçim!")

            except KuantumCokusuException as ex:
                print("\n" + "═" * 60)
                print("💥💥💥 SİSTEM ÇÖKTÜ! TAHLİYE BAŞLATILIYOR... 💥💥💥")
                print(ex.message)
                print("═" * 60)
                break
            except Exception as ex:
                print(f"❌ Hata: {str(ex)}")


if __name__ == "__main__":
    program = KuantumKaosYonetimi()
    program.calistir()