import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru/nonexistent-page-404-xyz');

  check(res, {
    'сервер вернул 200': (r) => r.status === 200,
    'сервер не упал с 500': (r) => r.status !== 500,
    'ответ быстрее 2000 мс': (r) => r.timings.duration < 2000,
  });

  sleep(1);
}