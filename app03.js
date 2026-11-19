import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    'ответ быстрее 2000 мс': (r) => r.timings.duration < 2000,
    'размер HTML > 500 байт': (r) => r.body.length > 500,
  });

  sleep(1);
}