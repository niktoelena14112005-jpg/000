import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    'тип контента text/html': (r) =>
      r.headers['Content-Type'] && r.headers['Content-Type'].includes('text/html'),
  });

  sleep(1);
}