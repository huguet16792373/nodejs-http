'use strict';
const http = require('node:http');
const fs = require('node:fs');
const pug = require('pug');
const server = http
  .createServer((req, res) => {
    const now = new Date();
    console.info(
      `[${now}] Requested by ${req.socket.remoteAddress}`
    );
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    });
    switch (req.method) {
      case 'GET':
        const url = req.url;
        switch (url) {
          case '/':
            res.write(pug.renderFile('form_top.pug'));
            break;

          case '/enquetes':
              res.write(pug.renderFile('enquetes.pug'));
            break;

          case '/enquetes/yaki-tofu':
            res.write(pug.renderFile('form.pug', {
              path: req.url,
              question: 'どちらが食べたいですか',
              firstItem: '焼肉',
              secondItem: '湯豆腐'
            }));
            break;

          case '/enquetes/rice-bread':
            res.write(pug.renderFile('form.pug', {
              path: req.url,
              question: 'どちらが食べたいですか',
              firstItem: 'ご飯',
              secondItem: 'パン'
            }));
            break;

          case '/enquetes/sushi-pizza':
            res.write(pug.renderFile('form.pug', {
              path: req.url,
              question: 'どちらが食べたいですか',
              firstItem: '寿司',
              secondItem: 'ピザ'
            }));
            break;
          case '/enquetes/dog-cat' :
            res.write(pug.renderFile('form.pug',{
              path: req.url,
              question: 'どちらが好きですか',
              firstItem: '犬',
              secondItem: '猫'
            }))

          default:
            res.write(pug.renderFile('form_top.pug'));
            break;
        }
        res.end();
        break;

      case 'POST':
        let rawData = '';
        req
          .on('data', chunk => {
            rawData += chunk;
          })
          .on('end', () => {
            const decoded = decodeURIComponent(rawData);
            console.info(`[${now}]投稿: ${decoded}`);
            const answer = new URLSearchParams(rawData);
            res.write(pug.renderFile('form_end.pug', {
              favorite: answer.get('favorite'),
              name: answer.get('name')
            }));
            res.end();
          });

        break;

      case 'DELETE':
        res.write(`DELETE${req.url}\n`);
        res.end();
        break;
      default:
        res.end();
        break;

    }
  })
  .on('error', e => {
    console.error(`[${new Date()}] Server Error`, e);
  })
  .on('clientError', e => {
    console.error(`[${new Date()}] Client Error`, e);
  });
const port = process.env.PORT||8000;
server.listen(port, () => {
  console.info(`[${new Date()}] Listening on ${port}`);
});
