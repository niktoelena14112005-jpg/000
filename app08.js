import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  // Проверяем, что в HTML есть bootstrap (он есть всегда)
  const res = http.get('https://map-snipped.ru');
  check(res, {
    'есть flutter_bootstrap.js': (r) => r.body.includes('flutter_bootstrap.js'),
  });

  // Отдельно проверяем, что main.dart.js вообще отдается сервером (статус 200)
  const mainJs = http.get('https://map-snipped.ru/main.dart.js');
  check(mainJs, {
    'main.dart.js доступен (200)': (r) => r.status === 200,
  });

  sleep(1);
}