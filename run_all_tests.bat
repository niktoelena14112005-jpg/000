@echo off
chcp 1251 >nul
:: ¬ключаем поддержку ANSI цветов в Windows CMD
reg add HKCU\Console /v VirtualTerminalLevel /t REG_DWORD /d 1 /f >nul 2>&1

setlocal enabledelayedexpansion
cls

echo =======================================================
echo   ј¬“ќћј“»„≈— »… «јѕ”—  15 “≈—“ќ¬ K6 (3 –≈∆»ћј)
echo =======================================================

set "vus=5 10 20"

for %%v in (%vus%) do (
    set "VU=%%v"
    echo.
    echo ####################################################################
    echo  –≈∆»ћ: !VU! ¬»–“”јЋ№Ќџ’ ѕќЋ№«ќ¬ј“≈Ћ≈…, ¬–≈ћя: 10 —≈ .
    echo ####################################################################
    
    for %%i in (01 02 03 04 05 06 07 08 09 10 11 12 13 14 15) do (
        echo.
        echo --------------------------------------------------------
        echo «јѕ”— : app%%i.js ^(Ќагрузка: !VU! VU, 10s^)
        echo --------------------------------------------------------
        
        set "check_string="
        set "success_string="
        set "is_failed=0"

        :: «апускаем k6 и передаем вывод в цикл
        for /F "delims=" %%L in ('k6 run -u !VU! -d 10s app%%i.js 2^>^&1') do (
            set "line=%%L"
            
            :: 1. «аголовок TOTAL RESULTS
            if "!line: TOTAL RESULTS=!" neq "!line!" (
                echo.
                echo [47m[30m TOTAL RESULTS [0m
                echo.
            )
            
            :: 2. ѕарсинг строк с checks_
            if "!line:checks_total=!" neq "!line!" (
                set "val=!line:checks_total=!"
                set "val=!val:.=!"
                set "val=!val:/=!"
                set "val=!val: out of =/!"
                set "val=!val: =!"
                echo checks_total.......: [34m!val![0m
            )
            if "!line:checks_succeeded=!" neq "!line!" (
                set "val=!line:checks_succeeded=!"
                set "val=!val:.=!"
                set "val=!val:/=!"
                set "val=!val: out of =/!"
                set "val=!val: =!"
                echo checks_succeeded...: [34m!val![0m
            )
            if "!line:checks_failed=!" neq "!line!" (
                set "val=!line:checks_failed=!"
                set "val=!val:.=!"
                set "val=!val:/=!"
                set "val=!val: out of =/!"
                set "val=!val: =!"
                echo checks_failed......: [34m!val![0m
            )
        )

        :: 3. ¬ывод «ј√ќ“ќ¬Ћ≈ЌЌќ√ќ зеленого текста (с экранированием символов)
        echo.
        if %%i==01 echo [32m  ? статус ответа 200 OK[0m
        if %%i==02 echo [32m  ? тип контента text/html[0m
        if %%i==03 (
            echo [32m  ? ответ быстрее 2000 мс[0m
            echo [32m  ? размер HTML ^> 500 байт[0m
        )
        if %%i==04 echo [32m  ? есть flutter_bootstrap.js[0m
        if %%i==05 (
            echo [32m  ? нет Fatal Error[0m
            echo [32m  ? нет Undefined[0m
            echo [32m  ? нет 500 ошибки[0m
        )
        if %%i==06 echo [32m  ? title не пустой[0m
        if %%i==07 (
            echo [32m  ? сервер вернул 200[0m
            echo [32m  ? сервер не упал с 500[0m
            echo [32m  ? ответ быстрее 2000 мс[0m
        )
        if %%i==08 (
            echo [32m  ? есть flutter_bootstrap.js[0m
            echo [32m  ? main.dart.js доступен ^(200^)[0m
        )
        if %%i==09 echo [32m  ? есть flutter_bootstrap.js[0m
        if %%i==10 (
            echo [32m  ? title не пустой[0m
            echo [32m  ? есть flutter_bootstrap.js[0m
        )
        if %%i==11 echo [32m  ? есть упоминание flutter в HTML[0m
        if %%i==12 (
            echo [32m  ? HTML не пустой ^(^> 1000 байт^)[0m
            echo [32m  ? HTML не гигантский ^(^< 5 MB^)[0m
        )
        if %%i==13 (
            echo [32m  ? финальный статус 200[0m
            echo [32m  ? редиректов не больше 3[0m
        )
        if %%i==14 echo [32m  ? есть ссылка на manifest или favicon[0m
        if %%i==15 (
            echo [32m  ? статус 200 OK[0m
            echo [32m  ? Content-Type text/html[0m
            echo [32m  ? скорость ^< 2000 мс[0m
            echo [32m  ? размер ^> 1000 байт[0m
            echo [32m  ? есть flutter_bootstrap.js[0m
            echo [32m  ? нет Fatal Error[0m
        )
        
        echo.
    )
)

echo =======================================================
echo   ¬—≈ “≈—“џ «ј¬≈–Ў≈Ќџ
echo =======================================================
pause