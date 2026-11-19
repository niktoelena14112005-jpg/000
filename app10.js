import http from 'k6/http';
import { check, sleep } from 'k6';
import { parseHTML } from 'k6/html';

export default function () {
  const res = http.get('https://map-snipped.ru');
  const doc = parseHTML(res.body);

  check(res, {
    // Проверяем, что title содержит что-то осмысленное (например, не пустой)
    'title не пустой': () => doc.find('title').text().length > 0,
    // Проверяем наличие Flutter-скриптов
    'есть flutter_bootstrap.js': (r) => r.body.includes('flutter_bootstrap.js'),
  });

  sleep(1);
}