import java.util.*;

// Custom Exception
class KuantumCokusuException extends Exception {
    public KuantumCokusuException(String nesneID) {
        super("KUANTUM ÇÖKÜŞÜ! Nesne ID: " + nesneID + " patladı!");
    }
}

// Interface
interface IKritik {
    void acilDurumSogutmasi();
}

// Abstract Base Class
abstract class KuantumNesnesi {
    private String ID;
    private double stabilite;
    private int tehlikeSeviyesi;

    public String getID() {
        return ID;
    }

    public void setID(String ID) {
        this.ID = ID;
    }

    public double getStabilite() {
        return stabilite;
    }

    public void setStabilite(double stabilite) {
        if (stabilite > 100)
            this.stabilite = 100;
        else if (stabilite < 0)
            this.stabilite = 0;
        else
            this.stabilite = stabilite;
    }

    public int getTehlikeSeviyesi() {
        return tehlikeSeviyesi;
    }

    public void setTehlikeSeviyesi(int tehlikeSeviyesi) {
        if (tehlikeSeviyesi < 1)
            this.tehlikeSeviyesi = 1;
        else if (tehlikeSeviyesi > 10)
            this.tehlikeSeviyesi = 10;
        else
            this.tehlikeSeviyesi = tehlikeSeviyesi;
    }

    public abstract void analizEt() throws KuantumCokusuException;

    public String durumBilgisi() {
        return String.format("ID: %s - Stabilite: %.2f%% - Tehlike: %d",
                ID, stabilite, tehlikeSeviyesi);
    }
}

// Concrete Class 1: VeriPaketi
class VeriPaketi extends KuantumNesnesi {
    @Override
    public void analizEt() throws KuantumCokusuException {
        System.out.println("Veri içeriği okundu.");
        setStabilite(getStabilite() - 5);
        if (getStabilite() <= 0)
            throw new KuantumCokusuException(getID());
    }
}

// Concrete Class 2: KaranlikMadde
class KaranlikMadde extends KuantumNesnesi implements IKritik {
    @Override
    public void analizEt() throws KuantumCokusuException {
        System.out.println("Karanlık madde analiz ediliyor...");
        setStabilite(getStabilite() - 15);
        if (getStabilite() <= 0)
            throw new KuantumCokusuException(getID());
    }

    @Override
    public void acilDurumSogutmasi() {
        System.out.println("Karanlık madde " + getID() + " soğutuluyor!");
        setStabilite(getStabilite() + 50);
    }
}

// Concrete Class 3: AntiMadde
class AntiMadde extends KuantumNesnesi implements IKritik {
    @Override
    public void analizEt() throws KuantumCokusuException {
        System.out.println("⚠️ Evrenin dokusu titriyor...");
        setStabilite(getStabilite() - 25);
        if (getStabilite() <= 0)
            throw new KuantumCokusuException(getID());
    }

    @Override
    public void acilDurumSogutmasi() {
        System.out.println("Anti-madde " + getID() + " ACİL SOĞUTMA aktif!");
        setStabilite(getStabilite() + 50);
    }
}

// Main Program
public class KuantumKaosYonetimi {
    private static List<KuantumNesnesi> envanter = new ArrayList<>();
    private static Random random = new Random();
    private static int nesneCounter = 1;
    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
        System.out.println("╔═══════════════════════════════════════════════════╗");
        System.out.println("║   OMEGA SEKTÖRÜ - KUANTUM VERİ AMBARI SİSTEMİ    ║");
        System.out.println("╚═══════════════════════════════════════════════════╝\n");

        while (true) {
            try {
                System.out.println("\n═══ KUANTUM AMBARI KONTROL PANELİ ═══");
                System.out.println("1. Yeni Nesne Ekle");
                System.out.println("2. Tüm Envanteri Listele");
                System.out.println("3. Nesneyi Analiz Et");
                System.out.println("4. Acil Durum Soğutması Yap");
                System.out.println("5. Çıkış");
                System.out.print("\nSeçiminiz: ");

                String secim = scanner.nextLine();

                switch (secim) {
                    case "1":
                        yeniNesneEkle();
                        break;
                    case "2":
                        envanteriListele();
                        break;
                    case "3":
                        nesneyiAnalizEt();
                        break;
                    case "4":
                        acilDurumSogutmasi();
                        break;
                    case "5":
                        System.out.println("\nSistem güvenli bir şekilde kapatılıyor...");
                        scanner.close();
                        return;
                    default:
                        System.out.println("❌ Geçersiz seçim!");
                        break;
                }
            } catch (KuantumCokusuException ex) {
                System.out.println("\n" + "═".repeat(60));
                System.out.println("💥💥💥 SİSTEM ÇÖKTÜ! TAHLİYE BAŞLATILIYOR... 💥💥💥");
                System.out.println(ex.getMessage());
                System.out.println("═".repeat(60));
                scanner.close();
                break;
            } catch (Exception ex) {
                System.out.println("❌ Hata: " + ex.getMessage());
            }
        }
    }

    private static void yeniNesneEkle() {
        int tip = random.nextInt(3) + 1;
        KuantumNesnesi yeniNesne = null;
        String tipAdi = "";

        switch (tip) {
            case 1:
                yeniNesne = new VeriPaketi();
                yeniNesne.setID("VP-" + nesneCounter++);
                yeniNesne.setStabilite(random.nextInt(42) + 60);
                yeniNesne.setTehlikeSeviyesi(random.nextInt(3) + 1);
                tipAdi = "Veri Paketi";
                break;
            case 2:
                yeniNesne = new KaranlikMadde();
                yeniNesne.setID("KM-" + nesneCounter++);
                yeniNesne.setStabilite(random.nextInt(42) + 50);
                yeniNesne.setTehlikeSeviyesi(random.nextInt(3) + 5);
                tipAdi = "Karanlık Madde";
                break;
            case 3:
                yeniNesne = new AntiMadde();
                yeniNesne.setID("AM-" + nesneCounter++);
                yeniNesne.setStabilite(random.nextInt(42) + 40);
                yeniNesne.setTehlikeSeviyesi(random.nextInt(3) + 8);
                tipAdi = "Anti-Madde";
                break;
        }

        envanter.add(yeniNesne);
        System.out.println("✅ " + tipAdi + " eklendi: " + yeniNesne.durumBilgisi());
    }

    private static void envanteriListele() {
        if (envanter.isEmpty()) {
            System.out.println("📦 Envanter boş.");
            return;
        }

        System.out.println("\n═══ ENVANTER DURUM RAPORU ═══");
        for (KuantumNesnesi nesne : envanter) {
            String tip = nesne.getClass().getSimpleName();
            String kritik = (nesne instanceof IKritik) ? "[KRİTİK]" : "[NORMAL]";
            System.out.println(kritik + " " + tip + " - " + nesne.durumBilgisi());
        }
    }

    private static void nesneyiAnalizEt() throws KuantumCokusuException {
        System.out.print("Analiz edilecek nesne ID: ");
        String id = scanner.nextLine();

        KuantumNesnesi nesne = null;
        for (KuantumNesnesi n : envanter) {
            if (n.getID().equals(id)) {
                nesne = n;
                break;
            }
        }

        if (nesne == null) {
            System.out.println("❌ Nesne bulunamadı!");
            return;
        }

        System.out.println("🔬 Analiz başlatılıyor: " + nesne.getID());
        nesne.analizEt();
        System.out.println("📊 Yeni durum: " + nesne.durumBilgisi());
    }

    private static void acilDurumSogutmasi() {
        System.out.print("Soğutulacak nesne ID: ");
        String id = scanner.nextLine();

        KuantumNesnesi nesne = null;
        for (KuantumNesnesi n : envanter) {
            if (n.getID().equals(id)) {
                nesne = n;
                break;
            }
        }

        if (nesne == null) {
            System.out.println("❌ Nesne bulunamadı!");
            return;
        }

        if (nesne instanceof IKritik) {
            System.out.println("❄️ Acil durum soğutma protokolü başlatılıyor...");
            ((IKritik) nesne).acilDurumSogutmasi();
            System.out.println("✅ Soğutma tamamlandı: " + nesne.durumBilgisi());
        } else {
            System.out.println("❌ Bu nesne soğutulamaz! Sadece kritik nesneler soğutulabilir.");
        }
    }
}