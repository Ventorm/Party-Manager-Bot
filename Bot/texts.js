const { admin, adminUserName, twinkByAdmin, adminHelper } = require("../config");
const start_time = parseInt(require("../config").start_time);
const end_time = parseInt(require("../config").end_time);

const texts = {
    chooseGame: [`Во что тебе хочется сыграть сегодня?\nМожно отметить несколько вариантов  ✅`],
    chooseTime: [`Выбери всё удобное для тебя время (по мск).\nМожно отметить несколько вариантов ✅`],
    prepareNotify: `Скоро время сбора! Успеваешь?`,
    welcome: `Добро пожаловать!\nМоя задача за несколько кликов в простых опросах организовать совместные игры для Всех моих пользователей по двум критериям:\n<b>1. </b>Время, удобное для <b><u>тебя</u></b> (в течение дня)\n<b>2. </b>Только интересующие <b><u>тебя</u></b> игры из списка\n\nНо для начала...`,
    welcomeBack: `С возвращением!\nКак и раньше, я буду присылать тебе необходимую информацию по предстоящим играм`,
    justJoined: `Кстати, на сегодня уже есть активные опросы по играм.\nОтправляю`,
    confirm: `<b>Пожалуйста, отправь мне код того, кто тебя пригласил (его можно найти в моём Меню по команде /invite)</b>`,
    allowed: `<b>Приглашение подтверждено 👍</b>\nТеперь тебе доступен весь функционал, в том числе через небольшое <b>Меню</b> (слева внизу)`,
    forButtonFullReminder: `Ниже ты можешь задать время — за сколько Минут до начала событий тебе будет поступать <code>Общее расписание с уведомлением</code> о предстоящих играх`,
    forButtonPersonalReminder: `Ниже ты можешь задать время — за сколько Минут до начала событий тебе будет поступать <code>Персональное расписание с уведомлением</code> о предстоящих играх`,
    no_time_left: `<i>У тебя выбрано время, которое на сегодня уже закончилось.</i>\n\nЕсли ты можешь выбрать актуальное на сегодня время, то выбери <b>"Отменить голос"</b> в опросе времени и проголосуй повторно`,
    not_enough_players: `Ожидаем голоса других игроков на все выбранные тобой связки Времени и Игр (нужно больше голосов).\n\nРасписание беззвучно обновляется каждые 5 минут.\n\nУведомления о предстоящих играх поступят тебе в соответствии с твоими <u>Настройками</u>\n👇`,
    incorrectly_filled_by_user: `<u>У тебя некорректно заполнены опции времени и/или игр в опросах выше, потому для Тебя Персональное расписание не может быть составлено.</u>\n\nПроверка заполнения опросов каждые 5 минут`,
    cant_play: `Ты указал, что не можешь сыграть сегодня, потому Персональное расписание не было составлено.\n\n<b>Если вдруг передумаешь — переголосуй, я покажу тебе актуальное расписание (обновление каждые 5 минут)</b>`,
    cantToday: `Если передумаешь в течение дня, то кликни по опросу и выбери <b>"Отменить голос"</b>.\nПосле в нём можно будет проголосовать повторно`,
    sorry: `Извини, но этот функционал доступен только для подтверждённых пользователей.\n\n<b>Пожалуйста, пришли мне код того, кто тебя пригласил (его можно найти в моём меню по команде /invite)</b>`,
    about: `Моя задача за несколько кликов в простых опросах организовать совместные игры для Всех моих пользователей по двум критериям:\n<b>1. </b>Время, удобное для <b><u>тебя</u></b> (в течение дня)\n<b>2. </b>Только интересующие <b><u>тебя</u></b> игры из списка\n\nОтветы на опросы, при необходимости, можно менять в течение дня`,
    admin: `Любые конструктивные вопросы/предложения/проблемы по моему функционалу можно обсудить лично с моим разработчиком`,
    group: `Обсудить предстоящие игры или просто пофлудить — всё это можно сделать в группе`,
    alreadyActive: `На сегодня уже есть <b>активные опросы</b>`, 
    alreadyFinished: `Сегодня опросы уже создавали`,
    time_for_create: `Новые опросы можно создавать в промежутке <code>с ${start_time}:00 до ${end_time}:00</code> (по мск)`,
    too_early: `Давай не будем оповещать всех в такое время 😴`,
    too_late: `Уже слишком поздно 🌒\nПредлагаю попробовать завтра 🌤`,
    too_old: `Это сообщение слишком старое — мне уже технически не позволено его убрать`,
    invitation: {
        0: `Ты можешь поделиться моим функционалом со своим другом.\nНиже ссылка на мой чат`,
        1: `<b>https://t.me/deadly_party_bot</b>`,
        2: `При первом запуске с новым пользователем мне нужно получить от него <b><u>твой код</u></b>.\n\nЭтот код твоему другу потребуется отправить ко мне в чат.\n<b>Ниже в сообщении сам код (копируется автоматически при нажатии)</b>`,
    },
    letsPlay: {
        question: `Хочешь сыграть сегодня?`,
        answers: ['Да!', 'Без меня в этот раз'],
    },
    letsPlayRightNow: {
        question: `Предлагают собраться в ближайшие 30 минут.\nТы в деле?`,
        answers: ['Да!', 'Пас'],
    },
    games: {
        "SI Game": `🧐`,
        "Jackbox": `🎁`,
        "Монополия": `🤑`,
        "Phasmophobia": `👻`,
        "Among Us": `👽`,
    },
    numbers: {
        0: `0️⃣`,
        1: `1️⃣`,
        2: `2️⃣`,
        3: `3️⃣`,
        4: `4️⃣`,
        5: `5️⃣`,
        6: `6️⃣`,
        7: `7️⃣`,
        8: `8️⃣`,
        9: `9️⃣`,
    },
    //months: [`Январь`, `Февраль`, `Март`, `Апрель`, `Май`, `Июнь`, `Июль`, `Август`, `Сентябрь`, `Октябрь`, `Ноябрь` `Декабрь`],
    months: [`January`, `February`, `March`, `April`, `May`, `June`, `July`, `August`, `September`, `October`, `November`, `December`],
    forAllInfoMessage: `Привет!\nУ меня произошло <b>крупное обновление</b> — теперь я перешёл в статус Бета-тестирования! 😊\n\n<b>Основные изменения:</b>\n<b>1.</b> Добавлена рассылка расписания игр на сегодня. Расписание отображает результаты голосований по играм и времени, что позволяет легко ориентироваться в расписании и планировать своё время. Расписание можно включать/отключать (оно беззвучно и автоматически обновляется каждые 5 минут)\n<b>2.</b> Добавлено интерактивное Меню, где можно:\n• Настроить уведомления по расписаниям, чтобы узнать о набранных в ближайшее время играх. По умолчанию установлено время 30 минут до начала мероприятия (можно установить 45, 30, 15, 5 минут или отключить полностью). Само уведомление ещё дорабатывается, обратная связь принимается\n• В 2 клика запустить опросы на сегодня (если они ещё не запускались)\n• Получить ссылку на группу, где можно и обсудить предстоящие игры, и просто пофлудить`
}


module.exports = { texts }