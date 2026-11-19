import http from 'k6/http';
import { check, sleep } from 'k6';
import { parseHTML } from 'k6/html';

export default function () {
  const res = http.get('https://map-snipped.ru');
  const doc = parseHTML(res.body);

  const title = doc.find('title').text();

  check(res, {
    'title не пустой': () => title.length > 0,
  });

  sleep(1);
}