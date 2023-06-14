const { Telegraf, Markup 
} = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN)
bot.start((ctx) => ctx.reply ('Welcome'))
bot.help((ctx) => ctx.reply(text.commands))

bot.command('plus', async (ctx)=> {
  try{ await ctx.replyWithHTML('<b>Тут ви можете ознойомитись з інформацією о роботі, а краще напишіть нашому менеджеру в один клік </b>', Markup.inlineKeyboard(
        [
        [Markup.button.callback('ADMIN', 'btn_1')],
        [Markup.button.callback('Більше Інформації', 'btn_2')],
        [Markup.button.callback('Наш Телеграм', 'btn_3')],
        ]
    ))
    } catch(e) {
        console.error(e)
    }
})
function addActionBot(name, src, text) {
    bot.action(name, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            if (src !== false) {
                await ctx.replyWithPhoto({
                sourse: src
                })
            }
            await ctx.replyWithHTML(text, {
            disable_web_page_preview: true
            })
        } catch(e) {
            console.error(e)
        } 
    })
}

addActionBot('btn_1', false, text.text1)
addActionBot('btn_2', false, text.text2)
addActionBot('btn_3', false, text.text3)

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));