import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    'есть ссылка на manifest или favicon': (r) =>
      r.body.includes('manifest') || r.body.includes('favicon') || r.body.includes('icon'),
  });

  sleep(1);
}