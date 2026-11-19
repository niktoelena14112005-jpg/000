import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    'есть упоминание flutter в HTML': (r) =>
      r.body.toLowerCase().includes('flutter'),
  });

  sleep(1);
}