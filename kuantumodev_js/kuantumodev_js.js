const readline = require('readline');

// Custom Exception
class KuantumCokusuException extends Error {
    constructor(nesneID) {
        super(`KUANTUM ÇÖKÜŞÜ! Nesne ID: ${nesneID} patladı!`);
        this.name = 'KuantumCokusuException';
    }
}

// Abstract Base Class
class KuantumNesnesi {
    constructor() {
        this._id = '';
        this._stabilite = 0;
        this._tehlikeSeviyesi = 0;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get stabilite() {
        return this._stabilite;
    }

    set stabilite(value) {
        if (value > 100) {
            this._stabilite = 100;
        } else if (value < 0) {
            this._stabilite = 0;
        } else {
            this._stabilite = value;
        }
    }

    get tehlikeSeviyesi() {
        return this._tehlikeSeviyesi;
    }

    set tehlikeSeviyesi(value) {
        if (value < 1) {
            this._tehlikeSeviyesi = 1;
        } else if (value > 10) {
            this._tehlikeSeviyesi = 10;
        } else {
            this._tehlikeSeviyesi = value;
        }
    }

    analizEt() {
        throw new Error('Bu metot alt sınıflarda uygulanmalıdır');
    }

    durumBilgisi() {
        return `ID: ${this.id} - Stabilite: ${this.stabilite.toFixed(2)}% - Tehlike: ${this.tehlikeSeviyesi}`;
    }
}

// Interface (Mixin)
const IKritik = {
    acilDurumSogutmasi() {
        throw new Error('Bu metot uygulanmalıdır');
    }
};

// Concrete Class 1: VeriPaketi
class VeriPaketi extends KuantumNesnesi {
    analizEt() {
        console.log('Veri içeriği okundu.');
        this.stabilite -= 5;
        if (this.stabilite <= 0) {
            throw new KuantumCokusuException(this.id);
        }
    }
}

// Concrete Class 2: KaranlikMadde
class KaranlikMadde extends KuantumNesnesi {
    analizEt() {
        console.log('Karanlık madde analiz ediliyor...');
        this.stabilite -= 15;
        if (this.stabilite <= 0) {
            throw new KuantumCokusuException(this.id);
        }
    }

    acilDurumSogutmasi() {
        console.log(`Karanlık madde ${this.id} soğutuluyor!`);
        this.stabilite += 50;
    }
}
Object.assign(KaranlikMadde.prototype, IKritik);

// Concrete Class 3: AntiMadde
class AntiMadde extends KuantumNesnesi {
    analizEt() {
        console.log('⚠️ Evrenin dokusu titriyor...');
        this.stabilite -= 25;
        if (this.stabilite <= 0) {
            throw new KuantumCokusuException(this.id);
        }
    }

    acilDurumSogutmasi() {
        console.log(`Anti-madde ${this.id} ACİL SOĞUTMA aktif!`);
        this.stabilite += 50;
    }
}
Object.assign(AntiMadde.prototype, IKritik);

// Main Program
class KuantumKaosYonetimi {
    constructor() {
        this.envanter = [];
        this.nesneCounter = 1;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    yeniNesneEkle() {
        const tip = Math.floor(Math.random() * 3) + 1;
        let yeniNesne = null;
        let tipAdi = '';

        switch (tip) {
            case 1:
                yeniNesne = new VeriPaketi();
                yeniNesne.id = `VP-${this.nesneCounter++}`;
                yeniNesne.stabilite = Math.floor(Math.random() * 41) + 60;
                yeniNesne.tehlikeSeviyesi = Math.floor(Math.random() * 3) + 1;
                tipAdi = 'Veri Paketi';
                break;
            case 2:
                yeniNesne = new KaranlikMadde();
                yeniNesne.id = `KM-${this.nesneCounter++}`;
                yeniNesne.stabilite = Math.floor(Math.random() * 41) + 50;
                yeniNesne.tehlikeSeviyesi = Math.floor(Math.random() * 3) + 5;
                tipAdi = 'Karanlık Madde';
                break;
            case 3:
                yeniNesne = new AntiMadde();
                yeniNesne.id = `AM-${this.nesneCounter++}`;
                yeniNesne.stabilite = Math.floor(Math.random() * 41) + 40;
                yeniNesne.tehlikeSeviyesi = Math.floor(Math.random() * 3) + 8;
                tipAdi = 'Anti-Madde';
                break;
        }

        this.envanter.push(yeniNesne);
        console.log(`✅ ${tipAdi} eklendi: ${yeniNesne.durumBilgisi()}`);
    }

    envanteriListele() {
        if (this.envanter.length === 0) {
            console.log('📦 Envanter boş.');
            return;
        }

        console.log('\n═══ ENVANTER DURUM RAPORU ═══');
        this.envanter.forEach(nesne => {
            const tip = nesne.constructor.name;
            const kritik = nesne.acilDurumSogutmasi ? '[KRİTİK]' : '[NORMAL]';
            console.log(`${kritik} ${tip} - ${nesne.durumBilgisi()}`);
        });
    }

    nesneyiAnalizEt(id) {
        const nesne = this.envanter.find(n => n.id === id);

        if (!nesne) {
            console.log('❌ Nesne bulunamadı!');
            return;
        }

        console.log(`🔬 Analiz başlatılıyor: ${nesne.id}`);
        nesne.analizEt();
        console.log(`📊 Yeni durum: ${nesne.durumBilgisi()}`);
    }

    acilDurumSogutmasi(id) {
        const nesne = this.envanter.find(n => n.id === id);

        if (!nesne) {
            console.log('❌ Nesne bulunamadı!');
            return;
        }

        if (nesne.acilDurumSogutmasi && typeof nesne.acilDurumSogutmasi === 'function') {
            console.log('❄️ Acil durum soğutma protokolü başlatılıyor...');
            nesne.acilDurumSogutmasi();
            console.log(`✅ Soğutma tamamlandı: ${nesne.durumBilgisi()}`);
        } else {
            console.log('❌ Bu nesne soğutulamaz! Sadece kritik nesneler soğutulabilir.');
        }
    }

    menu() {
        console.log('\n═══ KUANTUM AMBARI KONTROL PANELİ ═══');
        console.log('1. Yeni Nesne Ekle');
        console.log('2. Tüm Envanteri Listele');
        console.log('3. Nesneyi Analiz Et');
        console.log('4. Acil Durum Soğutması Yap');
        console.log('5. Çıkış');
    }

    soruSor(soru) {
        return new Promise((resolve) => {
            this.rl.question(soru, (cevap) => {
                resolve(cevap);
            });
        });
    }

    async calistir() {
        console.log('╔═══════════════════════════════════════════════════╗');
        console.log('║   OMEGA SEKTÖRÜ - KUANTUM VERİ AMBARI SİSTEMİ    ║');
        console.log('╚═══════════════════════════════════════════════════╝\n');

        while (true) {
            try {
                this.menu();
                const secim = await this.soruSor('\nSeçiminiz: ');

                switch (secim.trim()) {
                    case '1':
                        this.yeniNesneEkle();
                        break;
                    case '2':
                        this.envanteriListele();
                        break;
                    case '3':
                        const analizID = await this.soruSor('Analiz edilecek nesne ID: ');
                        this.nesneyiAnalizEt(analizID.trim());
                        break;
                    case '4':
                        const sogutmaID = await this.soruSor('Soğutulacak nesne ID: ');
                        this.acilDurumSogutmasi(sogutmaID.trim());
                        break;
                    case '5':
                        console.log('\nSistem güvenli bir şekilde kapatılıyor...');
                        this.rl.close();
                        process.exit(0);
                    default:
                        console.log('❌ Geçersiz seçim!');
                        break;
                }
            } catch (error) {
                if (error instanceof KuantumCokusuException) {
                    console.log('\n' + '═'.repeat(60));
                    console.log('💥💥💥 SİSTEM ÇÖKTÜ! TAHLİYE BAŞLATILIYOR... 💥💥💥');
                    console.log(error.message);
                    console.log('═'.repeat(60));
                    this.rl.close();
                    process.exit(1);
                } else {
                    console.log(`❌ Hata: ${error.message}`);
                }
            }
        }
    }
}

// Programı çalıştır
const program = new KuantumKaosYonetimi();
program.calistir();