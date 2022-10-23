const TelegramApi = require('node-telegram-bot-api');
const token = "5668235859:AAGBnkimg-2yvp2ZIlWkr-sC54WoULt0mOY";
const admin_token = "5406918655:AAEABMh3h9oGVl4DnwJNO-8AIIYiYchAIis"
const bot = new TelegramApi(token, { polling: true })
const admin_bot = new TelegramApi(admin_token, { polling: true })
var title = {}
var title_entry = {}
var number = {}
var start_of_questions_entry = {}
var titles = {}
// var edited_text = {
//     table: [

//     ]
// }
var counter = 0;
var questions = {
    table: [

    ]
}
var voices = {
    table: [

    ]
}
var polls = {
    table: [

    ]
}
var voice_couter = {
    table: [

    ]
}
var diagram = {}
var summ = {
    table: [

    ]
}
var sum = {}
var su = 0;
var ju;
Array.prototype.sum = function (prop) {
    var total = 0
    for (var i = 0, _len = this.length; i < _len; i++) {
        total += this[i][prop]
    }
    return total
}

const titleetnry = async (chatId, text) => {
    title[chatId] = await text
    await console.log(title[chatId])
    // start_of_questions_entry[chatId] = await true
    titles[chatId] = await true
    await bot.sendMessage(chatId, 'Отлично! Теперь введите варианты ответов через запятую\n\nНапример:\nВопрос №1, Вопрос №2, Вопрос №3 и так далее')
    title_entry[chatId] = await false
}
const que_entry = async (chatId, text) => {
    // await bot.sendMessage(chatId, 'Отлично! Теперь введите варианты ответов через запятую\n\nНапример:\nВопрос №1, Вопрос №2, Вопрос №3 и так далее')
    questions[chatId] = await text.split(',')
    // if (questions.length != Number(number[chatId])) {
    //     await bot.sendMessage(chatId, 'Введено неверное количество вариантов ответа!')
    // } else {
    //     await bot.sendMessage(chatId, 'Отлично! Вот ваш опрос!')
    // }
    // await console.log(questions[chatId])
    start_of_questions_entry[chatId] = await true
    //await bot.sendMessage(chatId, '123')
    let poll = await bot.sendPoll(chatId, title[chatId], questions[chatId], { is_anonymous: false, caption: '.' })
    let caption = await bot.sendMessage(chatId, 'Результаты голосования с учетом весов голосов участников')
    polls.table.push({
        msg_id: caption.message_id,
        chat_id: caption.chat.id,
        poll_id: poll.poll.id,
        text: caption.text,
        poll_length: poll.poll.options.length,
        poll_options: poll.poll.options,
    })
    //await console.log(caption)
    titles[chatId] = await false
}
const start_bot = async () => {
    admin_bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id
        const firstname = msg.chat.first_name
        const lastname = msg.chat.last_name
        const username = msg.chat.username
        const msg_id = msg.message_id
        //console.log(msg)
        if (text === '/start') {
            await admin_bot.sendMessage(chatId, 'Для того, чтобы изменить вес голоса участника отправьте сообшение следующего формата:\n\n<b>5219343362 1.25</b>\n\nпервое число - chat Id участника, его можно получить в боте @getmyid_bot, переслав в него любое сообщение человека', { parse_mode: 'HTML' })
        }
        if (text.includes(' ')) {
            await admin_bot.sendMessage(chatId, `Вес голоса участника *${text.split(' ')[0]}* изменен на *${text.split(' ')[1]}*`, { parse_mode: 'Markdown' })
            try {
                let searchName = await text.split(' ')[0];
                let index = voices.table.map(el => el.chatId).indexOf(searchName)
                if (index === -1 || index === '-1') {
                    await voices.table.push({
                        chatId: searchName,
                        value: Number(text.split(' ')[1]),
                        option_id: '',
                    })
                } else {
                    voices.table[index].value = Number(await text.split(' ')[1])
                }
                await console.log(voices)
            } catch (e) {
                console.log('не добавилось в базу')
            }



        }

    })
    bot.on('poll_answer', async (answ) => {
        //console.log(answ)
        const id = answ.user.id
        const options = answ.option_ids
        console.log(options + 'опция')
        const chatId = answ.user.id
        // let searchName = await answ.user.id;
        // let index = voices.table.map(el => el.chatId).indexOf(searchName)
        // if (index != -1 || index != '-1') {

        // }

        if (answ) {

            let pollid = await answ.poll_id;
            let pollidd = String([pollid])
            let msgindex = polls.table.map(el => el.poll_id).indexOf(pollid)


            // counter = counter + 1
            let user = await String(answ.user.id);
            // console.log(user + ' id')
            // console.log(typeof user)
            let index = voices.table.map(el => el.chatId).indexOf(user)
            // console.log(index + 'indx')
            try {
                if (index == -1 && options.length != 0) {
                    if (polls.table[msgindex].poll_options[options]['value'] == NaN || polls.table[msgindex].poll_options[options]['value'] == undefined) {
                        polls.table[msgindex].poll_options[options]['value'] = await 0
                        console.log(' zeroo')
                    }
                    ju = polls.table[msgindex].poll_options[options]['value']
                    console.log(ju + ' это жу')
                    polls.table[msgindex].poll_options[options]['value'] = await ju + 1
                    ju = 0;
                    if (sum[pollid] == NaN || sum[pollid] == undefined) {
                        sum[pollid] = await 0
                        console.log(' zero')
                    }
                    su = Number(sum[pollid]) + 1
                    sum[pollid] = await su;
                    su = 0;
                    console.log('+++++')
                    console.log(polls.table[msgindex].poll_options)
                    console.log(sum[pollid] + ' summa')
                } else {
                    if (polls.table[msgindex].poll_options[options]['value'] == NaN || polls.table[msgindex].poll_options[options]['value'] == undefined) {
                        polls.table[msgindex].poll_options[options]['value'] = await 0
                        console.log(' zeroo')
                    }
                    ju = polls.table[msgindex].poll_options[options]['value']
                    polls.table[msgindex].poll_options[options]['value'] = await ju + voices.table[index].value
                    ju = 0;
                    if (sum[pollid] == NaN || sum[pollid] == undefined) {
                        sum[pollid] = await 0
                        console.log(' zero')
                    }
                    su = Number(sum[pollid]) + voices.table[index].value
                    sum[pollid] = await su
                    su = 0;
                    console.log(sum[pollid] + ' summa')
                }
            } catch (e) {
                console.log('ошибка в присваивании голоса')
            }

            //console.log(voices.table[index].value)
            // if (typeof voices.table[index].value === 'number') {
            //     console.log('yep')
            // } else {
            //     console.log('nope')
            // }
            // polls.table[msgindex].poll_options['value'] = await polls.table[msgindex].poll_options['value'] + voices.table[index].value
            // await console.log('_____')
            // await console.log(polls.table[msgindex].poll_options)

            let edited_text = [];

            // let voice_couter_index = voice_couter.table.map(el => el.poll_id).indexOf(pollid)
            // if (voice_couter_index == -1) {
            //     voice_couter.table.push({
            //         poll_id: pollid,
            //         options: polls.table[msgindex].poll_options,
            //     })
            //     voice_couter_index = voice_couter_index + 1
            // } else {
            //     voice_couter.table[voice_couter_index].counter
            // }
            // console.log('______')
            // console.log(voice_couter.table[msgindex].options)


            try {
                console.log(Number(polls.table[msgindex].msg_id + ' id of message'))


                for (let i = 0; i < Number(polls.table[msgindex].poll_length); i++) {
                    //console.log(polls.table[msgindex].poll_options.length + ' ====')
                    // for (let j = 0; j < polls.table[msgindex].poll_options.length; j++) {
                    //     summ[pollid] = + polls.table[msgindex].poll_options[j].value
                    //     consolele.log("====")
                    //     console.log(summ)
                    // }
                    if (polls.table[msgindex].poll_options[i].value != undefined) {
                        //for (let j = 0; j < polls.table[msgindex].poll_options.length; j++) {
                        // su = su + polls.table[msgindex].poll_options[i].value
                        //console.log(su + ' summa')
                        //}



                        edited_text[i] = `${polls.table[msgindex].poll_options[i].text} - *${((polls.table[msgindex].poll_options[i].value / sum[pollid]) * 100).toFixed(2)}%*`//polls.table[msgindex].poll_options.sum("value")})`
                        console.log(edited_text[i])
                    }

                }
            } catch (e) {
                console.log('не удалось сгенерировать текст')
            }


            try {
                await bot.editMessageText(`${edited_text.join('\n')}`, { message_id: polls.table[msgindex].msg_id, chat_id: polls.table[msgindex].chat_id, parse_mode: 'Markdown' })
            }
            catch (e) {
                console.log(e)
            }

            // if (index != -1 || index != '-1') {
            //     //diagram[answ.user.id] = await Number(voices.table[index].value)
            //     //try {



            //     await console.log(Number(polls.table[msgindex].poll_length))
            //     await bot.editMessageText(`${edited_text.join('\n')}`, { message_id: polls.table[msgindex].msg_id, chat_id: chatId })
            //     // } catch (e) {
            //     //     console.log(e)
            //     //}
            // }

        } bot.getUpdates()




    })
    bot.on('message', async (msg) => {
        const text = msg.text
        const chatId = msg.chat.id
        const firstname = msg.chat.first_name
        const lastname = msg.chat.last_name
        const username = msg.chat.username
        const msg_id = msg.message_id
        //console.log(msg)
        if (text === '/start') {
            await bot.sendMessage(chatId, 'Здравствуйте! Для того, чтобы создать опрос, воспользуйтесь командой /create_poll')
        }
        if (text === '/create_poll') {
            await bot.sendMessage(chatId, 'Выберите количество вариантов ответа', {
                reply_markup: JSON.stringify({
                    inline_keyboard: [
                        [{ text: "2", callback_data: "2" },
                        { text: "3", callback_data: "3" },
                        { text: "4", callback_data: "4" }
                        ],
                        [{ text: "5", callback_data: "5" },
                        { text: "6", callback_data: "6" },
                        { text: "7", callback_data: "7" }
                        ],
                        [{ text: "8", callback_data: "8" },
                        { text: "9", callback_data: "9" },
                        { text: "10", callback_data: "10" }
                        ],

                    ],
                }),
                parse_mode: "Markdown",
            })
        }
        if (text != '' && title_entry[chatId] === true) {
            titleetnry(chatId, text)
        }
        // if (text != '' && title_entry[chatId] === true && msg.chat.type === 'group' || msg.chat.type === "supergroup") {
        //     titleetnry(chatId, text)
        // }
        // if (text != '' && title_entry[chatId] === true && msg.chat.type === 'group' || msg.chat.type === "supergroup") {
        //     que_entry(chatId, text)
        // }
        if (text != '' && titles[chatId] === true && title_entry[chatId] === false) {
            que_entry(chatId, text)
        }


    })


    bot.on('callback_query', async (msg) => {

        const data = msg.data
        const chatId = msg.message.chat.id
        const msg_id = msg.message.message_id
        const username = msg.from.username;
        //console.log(msg)
        if (data === '10' || data === '9' || data === '8' || data === '7' || data === '6' || data === '5' || data === '4' || data === '3' || data === '2' || data === '1') {
            await bot.sendMessage(chatId, 'Введите название опроса')
            title_entry[chatId] = await true
            number[chatId] = await data

            await console.log(Number(number[chatId]))
            //await bot.sendPoll(chatId, 'Вопрос', ['Да', 'Нет'])
        }


    })
}


start_bot()
