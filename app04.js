import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    'есть flutter_bootstrap.js': (r) => r.body.includes('flutter_bootstrap.js'),
  });

  sleep(1);
}