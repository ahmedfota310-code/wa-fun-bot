const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

const jokes = [
    "مرة واحد صاحبه قاله أنا جعان، قاله طب ما تقوم تاكل.. قاله مش قادر، قاله طب إيه رأيك نلعب استغماية؟ 😂",
    "مرة محشش دخل محل عصير، قاله عندك مانجا؟ قاله آه، قاله طب اديني برتقال! 🤣",
    "مرة واحد اشتكى لصاحبه وقاله مراتي نكدية، قاله طلقها، قاله مش قادر، قاله طب سيبها، قاله مش عارف، قاله طب ادعي عليها، قاله بدعي ومش مستجاب!"
];

const luck = [
    "حظك النهاردة فل الفل، فرصة حلوة جاية لك في السكة ✨",
    "حظك متوسط، خد قراراتك بهدوء وبلاش تسرع النهاردة 🤔",
    "حظك النهاردة محتاج شوية صبر وضحكة، بكرة أحلى إن شاء الله 😄"
];

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('امسح كود QR من واتساب عشان يربط البوت');
});

client.on('ready', () => {
    console.log('البوت شغال وجاهز للترفيه!');
});

client.on('message', async (msg) => {
    const text = msg.body.trim();

    if (text === 'اوامر' || text === 'منيو') {
        await msg.reply(
            'أهلاً بيك في بوت الترفيه 🎉\nاكتب كلمة من دول:\n• نكتة\n• حظي\n• ملك او كتابة'
        );
    } else if (text === 'نكتة') {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await msg.reply(randomJoke);
    } else if (text === 'حظي') {
        const randomLuck = luck[Math.floor(Math.random() * luck.length)];
        await msg.reply(randomLuck);
    } else if (text === 'ملك او كتابة') {
        const result = Math.random() < 0.5 ? 'ملك 👑' : 'كتابة 📖';
        await msg.reply(`النتيجة طلعت: ${result}`);
    }
});

client.initialize();
