import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    'нет Fatal Error': (r) => !r.body.includes('Fatal Error'),
    'нет Undefined': (r) => !r.body.includes('Undefined'),
    'нет 500 ошибки': (r) => r.status !== 500,
  });

  sleep(1);
}