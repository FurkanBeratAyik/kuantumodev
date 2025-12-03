using System;
using System.Collections.Generic;
using System.Linq;

namespace KuantumKaosYonetimi
{
    // Custom Exception
    public class KuantumCokusuException : Exception
    {
        public KuantumCokusuException(string nesneID)
            : base($"KUANTUM ÇÖKÜŞÜ! Nesne ID: {nesneID} patladı!") { }
    }

    // Interface
    public interface IKritik
    {
        void AcilDurumSogutmasi();
    }

    // Abstract Base Class
    public abstract class KuantumNesnesi
    {
        public string ID { get; set; }

        private double _stabilite;
        public double Stabilite
        {
            get { return _stabilite; }
            set
            {
                if (value > 100)
                    _stabilite = 100;
                else if (value < 0)
                    _stabilite = 0;
                else
                    _stabilite = value;
            }
        }

        private int _tehlikeSeviyesi;
        public int TehlikeSeviyesi
        {
            get { return _tehlikeSeviyesi; }
            set
            {
                if (value < 1)
                    _tehlikeSeviyesi = 1;
                else if (value > 10)
                    _tehlikeSeviyesi = 10;
                else
                    _tehlikeSeviyesi = value;
            }
        }

        public abstract void AnalizEt();

        public string DurumBilgisi()
        {
            return $"ID: {ID} - Stabilite: {Stabilite:F2}% - Tehlike: {TehlikeSeviyesi}";
        }
    }

    // Concrete Class 1: VeriPaketi
    public class VeriPaketi : KuantumNesnesi
    {
        public override void AnalizEt()
        {
            Console.WriteLine("Veri içeriği okundu.");
            Stabilite -= 5;
            if (Stabilite <= 0)
                throw new KuantumCokusuException(ID);
        }
    }

    // Concrete Class 2: KaranlikMadde
    public class KaranlikMadde : KuantumNesnesi, IKritik
    {
        public override void AnalizEt()
        {
            Console.WriteLine("Karanlık madde analiz ediliyor...");
            Stabilite -= 15;
            if (Stabilite <= 0)
                throw new KuantumCokusuException(ID);
        }

        public void AcilDurumSogutmasi()
        {
            Console.WriteLine($"Karanlık madde {ID} soğutuluyor!");
            Stabilite += 50;
        }
    }

    // Concrete Class 3: AntiMadde
    public class AntiMadde : KuantumNesnesi, IKritik
    {
        public override void AnalizEt()
        {
            Console.WriteLine("⚠️ Evrenin dokusu titriyor...");
            Stabilite -= 25;
            if (Stabilite <= 0)
                throw new KuantumCokusuException(ID);
        }

        public void AcilDurumSogutmasi()
        {
            Console.WriteLine($"Anti-madde {ID} ACİL SOĞUTMA aktif!");
            Stabilite += 50;
        }
    }

    class Program
    {
        static List<KuantumNesnesi> envanter = new List<KuantumNesnesi>();
        static Random random = new Random();
        static int nesneCounter = 1;

        static void Main(string[] args)
        {
            Console.WriteLine("╔═══════════════════════════════════════════════════╗");
            Console.WriteLine("║   OMEGA SEKTÖRÜ - KUANTUM VERİ AMBARI SİSTEMİ    ║");
            Console.WriteLine("╚═══════════════════════════════════════════════════╝\n");

            while (true)
            {
                try
                {
                    Console.WriteLine("\n═══ KUANTUM AMBARI KONTROL PANELİ ═══");
                    Console.WriteLine("1. Yeni Nesne Ekle");
                    Console.WriteLine("2. Tüm Envanteri Listele");
                    Console.WriteLine("3. Nesneyi Analiz Et");
                    Console.WriteLine("4. Acil Durum Soğutması Yap");
                    Console.WriteLine("5. Çıkış");
                    Console.Write("\nSeçiminiz: ");

                    string secim = Console.ReadLine();

                    switch (secim)
                    {
                        case "1":
                            YeniNesneEkle();
                            break;
                        case "2":
                            EnvanteriListele();
                            break;
                        case "3":
                            NesneyiAnalizEt();
                            break;
                        case "4":
                            AcilDurumSogutmasi();
                            break;
                        case "5":
                            Console.WriteLine("\nSistem güvenli bir şekilde kapatılıyor...");
                            return;
                        default:
                            Console.WriteLine("❌ Geçersiz seçim!");
                            break;
                    }
                }
                catch (KuantumCokusuException ex)
                {
                    Console.WriteLine("\n" + new string('═', 60));
                    Console.WriteLine(" SİSTEM ÇÖKTÜ! TAHLİYE BAŞLATILIYOR... ");
                    Console.WriteLine(ex.Message);
                    Console.WriteLine(new string('═', 60));
                    break;
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"❌ Hata: {ex.Message}");
                }
            }
        }

        static void YeniNesneEkle()
        {
            int tip = random.Next(1, 4);
            KuantumNesnesi yeniNesne = null;
            string tipAdi = "";

            switch (tip)
            {
                case 1:
                    yeniNesne = new VeriPaketi
                    {
                        ID = $"VP-{nesneCounter++}",
                        Stabilite = random.Next(60, 101),
                        TehlikeSeviyesi = random.Next(1, 4)
                    };
                    tipAdi = "Veri Paketi";
                    break;
                case 2:
                    yeniNesne = new KaranlikMadde
                    {
                        ID = $"KM-{nesneCounter++}",
                        Stabilite = random.Next(50, 91),
                        TehlikeSeviyesi = random.Next(5, 8)
                    };
                    tipAdi = "Karanlık Madde";
                    break;
                case 3:
                    yeniNesne = new AntiMadde
                    {
                        ID = $"AM-{nesneCounter++}",
                        Stabilite = random.Next(40, 81),
                        TehlikeSeviyesi = random.Next(8, 11)
                    };
                    tipAdi = "Anti-Madde";
                    break;
            }

            envanter.Add(yeniNesne);
            Console.WriteLine($"✅ {tipAdi} eklendi: {yeniNesne.DurumBilgisi()}");
        }

        static void EnvanteriListele()
        {
            if (envanter.Count == 0)
            {
                Console.WriteLine("📦 Envanter boş.");
                return;
            }

            Console.WriteLine("\n═══ ENVANTER DURUM RAPORU ═══");
            foreach (var nesne in envanter)
            {
                string tip = nesne.GetType().Name;
                string kritik = nesne is IKritik ? "[KRİTİK]" : "[NORMAL]";
                Console.WriteLine($"{kritik} {tip} - {nesne.DurumBilgisi()}");
            }
        }

        static void NesneyiAnalizEt()
        {
            Console.Write("Analiz edilecek nesne ID: ");
            string id = Console.ReadLine();

            var nesne = envanter.FirstOrDefault(n => n.ID == id);

            if (nesne == null)
            {
                Console.WriteLine("❌ Nesne bulunamadı!");
                return;
            }

            Console.WriteLine($"🔬 Analiz başlatılıyor: {nesne.ID}");
            nesne.AnalizEt();
            Console.WriteLine($"📊 Yeni durum: {nesne.DurumBilgisi()}");
        }

        static void AcilDurumSogutmasi()
        {
            Console.Write("Soğutulacak nesne ID: ");
            string id = Console.ReadLine();

            var nesne = envanter.FirstOrDefault(n => n.ID == id);

            if (nesne == null)
            {
                Console.WriteLine("❌ Nesne bulunamadı!");
                return;
            }

            if (nesne is IKritik kritikNesne)
            {
                Console.WriteLine("❄️ Acil durum soğutma protokolü başlatılıyor...");
                kritikNesne.AcilDurumSogutmasi();
                Console.WriteLine($"✅ Soğutma tamamlandı: {nesne.DurumBilgisi()}");
            }
            else
            {
                Console.WriteLine("❌ Bu nesne soğutulamaz! Sadece kritik nesneler soğutulabilir.");
            }
        }
    }
}