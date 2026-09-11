/**
 * ============================================================
 * ОБРАЗОВАТЕЛЬНЫЙ ЦЕНТР «ПЛАНЕТА»
 * Электронный журнал учёта оплаты — Code.gs (версия 90)
 * v90: ИСПРАВЛЕНЫ ЛОЖНЫЕ ОСТАТКИ ПО КВИТАНЦИЯМ. При каждом сохранении оплаты «распределено»
 *   пересчитывалось только по составу групп — предоплаты, книги и архив выбывших выпадали,
 *   и разница показывалась как остаток. Теперь проверка перед сохранением, «Сверка реестра»,
 *   «Пересчитать по факту» и блок «Остатки по квитанциям» считают теми же правилами, что
 *   «Пересчитать реестр» (состав + книги + архив + предоплаты); после каждого сохранения квитанция
 *   приводится к фактам. Повторное сохранение строки с той же суммой (правка даты) больше
 *   не аннулирует предоплату из переплаты; удаление оплаты освобождает квитанцию в реестре.
 *   Значок ⓘ у квитанции в таблице оплат и окно «Сумма по квитанции исчерпана» показывают,
 *   сколько ушло в предоплаты/книги/архив, вместо ложного «не распределено».
 *   Чек из «Входящих» для ученика с уже внесённой оплатой зачитывается как доплата (прежняя
 *   квитанция не затирается); брат/сестра с другой квитанцией оплачивается из семейной
 *   квитанции доплатой, а не ошибкой «внесите вручную»; неудавшееся сохранение больше
 *   Семейная скидка — одному ребёнку: «первым» (платит полностью) нельзя назначить ученика с любой
 *   скидкой, а ученику, записанному «первым» в чужой скидке, семейную скидку дать нельзя.
 *   не сбрасывает прежнюю квитанцию в реестре. Пометки «МБ…»/«м6…» (МБанк + сумма) для реестра
 *   считаются наличными. Удаление последней оплаты по квитанции обнуляет её сумму в реестре;
 *   квитанции без единой зачтённой оплаты видны в «Предоплатах» и убираются кнопкой (руководитель).
 *   Семейный чек из «Входящих»: если у выбранного ученика всё оплачено — предлагаются братья/сёстры
 *   с остатком; если чек больше остатка — доплата на остаток, лишнее предлагается семье или в предоплату.
 *   ЭТАП 5 — режим кассы (KASSA_MODE=1, включается руководителем в кассе): старые пути приёма и правки
 *   оплат закрыты (строка ученика, доплата, «Входящие → зачесть», предоплаты, реестр); переплата после
 *   снижения цены / пересчёта за пропуск уходит в аванс через кассу; авансы на месяц зачитываются сами.
 * v89: сообщение об оплате — только на кыргызском, с указанием месяца и абонемента.
 *   Старый двуязычный текст в НАСТРОЙКИ заменяется автоматически один раз
 *   (свой текст можно править там же, строка ТЕКСТ_ОПЛАТА_ПРИНЯТА).
 * v88: предоплата не может быть больше того, что осталось от квитанции после зачёта ученикам.
 *   Такие записи (последствие сломанного реестра) помечаются в «Предоплатах» и в «Проверке системы».
 * v87: система больше не догадывается, сколько денег пришло с каждой квитанции —
 *   разбивка записывается в журнал при каждой оплате и доплате (столбец «Разбивка по квитанциям»).
 *   В «Проверке системы» появились два сторожа: схема служебных листов (столбец «Ключ» должен быть
 *   последним, иначе столбцы сдвигаются) и сходимость реестра квитанций с фактическими оплатами.
 * v86: если в строке ученика стоят две квитанции (оплата + доплата), деньги больше не делятся
 *   между ними поровну: каждая квитанция берёт свою сумму, остальное уходит следующей.
 *   Из-за деления пополам появлялись ложные остатки и недостачи у семей.
 * v85: у каждого остатка по квитанции видно, из чего он сложился: кому и сколько зачтено
 *   (оплаты, книги, архив, предоплаты). Ошибочную сумму квитанции можно исправить.
 * v84: реестр квитанций считает зачтённое честно: пометка «ПРЕДОПЛАТА» в строке оплаты
 *   больше не делит сумму квитанции пополам, а оплата книг и оплаты выбывших учеников
 *   (архив) тоже считаются использованием квитанции. Ложные остатки исчезают.
 * v83: ИСПРАВЛЕНА ПОРЧА РЕЕСТРА КВИТАНЦИЙ. У листа КВИТАНЦИИ «Ключ» стоял не последним,
 *   и при каждом обращении к листу добавлялись два пустых столбца: «Распределено» затиралось,
 *   реестр считал, что по каждой квитанции не зачтено ни сома. Столбцы больше не сдвигаются,
 *   реестр пересобирается по фактическим оплатам (repairReceiptRegistry).
 * v82: раздел «Последние оплаты» у администратора и руководителя: кто внёс, когда, правки,
 *   переход в группу и правка суммы. В «Предоплатах» появился блок «Остатки по квитанциям» —
 *   деньги, полученные по квитанции, но никому не зачтённые, больше не теряются.
 * v81: входящие чеки не пропадают: после зачёта чек переходит в ящик «Зачисленные»
 *   (ученик, группа, сумма, кто зачёл и когда), убранные — в «Убранные»; период до года и поиск.
 *   Копия каждой квитанции сохраняется на Диск (папка «ЧЕКИ — журнал Планета»),
 *   потому что ссылка WhatsApp живёт недолго. Разовый перенос старых чеков — inboxArchiveFiles.
 * v80: уважительные пропуски (лист ОТСУТСТВИЯ): болезнь и отъезд по сообщению родителя —
 *   отметки не требуются, уведомления не уходят, при возвращении абонемент пересчитывается.
 * v79: при снижении цены группы переплата учеников сразу уходит в предоплаты следующего месяца.
 * v78: стоимость группы видна и меняется в разделе «Ученики и группы» (двойной щелчок по шестерёнке).
 * v77: руководитель может задать свою стоимость конкретной группы на выбранный месяц
 *   (лист ЦЕНА_ГРУППЫ): цена не затирается прайсом, стоимость учеников пересчитывается.
 * v76: руководитель разрешает или запрещает преподавателям править даты занятий —
 *   по преподавателю целиком или по отдельной группе (лист ПРАВКА_ДАТ).
 * v75: во «Входящих оплатах» чеки с уже зачтённым номером квитанции сворачиваются отдельно;
 *   у остальных видно, была ли по этому ученику оплата раньше (возможна доплата).
 * v74: формулировки в сообщении об оплате: предоплата упоминается только когда она есть.
 * v73: в сообщении об оплате указывается предоплата на следующий месяц, если она есть.
 * v72: у сообщения об оплате появился заголовок «✅ ОЦ «Планета» | Төлөм кабыл алынды / Оплата принята».
 * v71: текст «оплата принята» — двуязычный, с абонементом на 12 занятий.
 * v70: после приёма оплаты предлагается отправить родителю сообщение «оплата принята»
 *   (шаблон в НАСТРОЙКИ · ТЕКСТ_ОПЛАТА_ПРИНЯТА, отправка по кнопке, можно отказаться).
 * v69: кнопка «Загрузить за 4/12/24 часа» — забирает пришедшие сообщения из GREEN-API и добавляет только чеки.
 * v68: во «Входящие оплаты» попадают только банковские чеки: PDF и фото квитанций, сообщения
 *   об оплате с суммой. Прочие файлы, фото и переписка не засоряют очередь.
 * v67: приём чеков включается без запуска функций: ключ вебхука необязателен (НАСТРОЙКИ · КЛЮЧ_ВЕБХУКА),
 *   лист ВХОДЯЩИЕ создаётся сам при первом открытии вкладки «Входящие оплаты».
 * v66: setupInboxWebhook работает без запроса адреса у Google (не падает в редакторе).
 * v65: входящие оплаты из WhatsApp (GREEN-API webhook → лист ВХОДЯЩИЕ): чек от родителя
 *   сам находит ученика по номеру, номер квитанции берётся из имени файла, администратор зачитывает в одно нажатие.
 * v64: экспорт контактов учеников в один файл VCF для iPhone/WhatsApp (кабинет руководителя).
 * v63: значок приложения — ссылка Диска в формате thumbnail + проверка доступности (installAppIcon, checkAppIcon).
 * v62: значок и название окна приложения — логотип «Планета» (installAppIcon кладёт логотип на Диск).
 * v61: очередь по уровням с открытием новой группы, подбор группы сразу после сохранения заявки,
 *   паспортные данные родителя в договоре, очередь видна администратору и учебной части.
 * v60: вход «Ресепшн» отдельной плашкой, значок и название окна приложения.
 * v59: кабинет «Приём» (лист ПРИЁМ): заявки новых учеников, очередь по уровням, подбор группы,
 *   зачисление, договор и анкета на печать (лист БЛАНКИ), пометка NEW у преподавателя.
 * v58: суммы по квитанциям в таблице оплат; режим группы «как у всех»; перенос группы с N-го занятия,
 *   автоперенос после M-го (НАСТРОЙКИ), новые ученики после переноса добавляются в следующий месяц.
 * v57 (08.09.2026): ускорение — ВХОДЫ пишутся только при входе, листы базы читаются одним
 *   обращением, отметки сохраняются блоком, новые строки сверяются по ключу, блокировка при
 *   добавлении ученика (защита от одинаковых ID), кэш списка уровней.
 * ============================================================
 *
 * ЧАСТЬ 0. Настройки в листах основной таблицы:
 *          НАСТРОЙКИ · ПРЕПОДАВАТЕЛИ · ЖУРНАЛЫ  (создаёт setupConfigSheets)
 * ЧАСТЬ 1. Синхронизация списка учеников (лист STUDENS ECP)
 * ЧАСТЬ 2. Веб-доступ: кабинет преподавателя (журнал NEW — редактирование
 *          уровня, расписания, списка учеников и телефонов)
 * ЧАСТЬ 3. Веб-доступ: администратор и руководитель — оплаты
 * ЧАСТЬ 4. Сводка / поиск / должники: сборщик снимка + API
 *
 * РОЛИ: Преподаватель — свой журнал;
 *       Администратор — оплаты, поиск, должники (без сводки и ФОТ);
 *       Руководитель  — всё (пароль ПАРОЛЬ_РУКОВОДИТЕЛЯ в листе НАСТРОЙКИ)
 * ЧАСТЬ 5. Формула стоимости (installTuitionFormulas)
 * ЧАСТЬ 6. Автообновление (createAutoRefreshTrigger)
 *
 * ПЕРВЫЙ ЗАПУСК (по порядку, из редактора):
 *   1) setupConfigSheets      — создать листы настроек
 *   2) importJournalLinks     — перенести ссылки на журналы с листа «Ссылки» в ЖУРНАЛЫ
 *   3) buildMonitoringSnapshot — собрать первый снимок данных
 *   4) createAutoRefreshTrigger — автообновление каждые 10 минут
 *
 * В листе ЖУРНАЛЫ в столбцах C и D можно указывать как ID таблицы, так и полную ссылку.
 *
 * Разметка листа "Группа N" в платёжном журнале:
 *   D4 — стоимость группы, C6 — название, C7 — уровень,
 *   K6 — время занятий, K7 — дни недели, O7 — преподаватель
 *   B14:Q29 — ученики (B = ФИО, Q = WhatsApp)
 *   Строки 36–51: B ФИО, C скидка %, D стоимость (формула),
 *   R оплачено, S дата, T квитанция, U остаток (формула), V занятий
 * Лист "МОНИТОРИНГ" журнала: L9 — коэффициент ФОТ, L11:L20 — по группам
 * ============================================================
 */


// ============================================================
// ЧАСТЬ 0. НАСТРОЙКИ
// ============================================================

const CFG_SETTINGS = 'НАСТРОЙКИ';
/** Сообщение родителю после приёма оплаты — только кыргызский, с месяцем и абонементом */
const THANKS_KG_DEFAULT = '✅ ОЦ «Планета» | Төлөм кабыл алынды\n\nУрматтуу ата-эне!\n{ученик} — {ай_абонемент} үчүн {сумма} сом төлөм кабыл алынды.\n{группа_уровень}\n{итог_кг}{предоплата_кг} Рахмат!\n\n«Планета» Билим Берүү Борбору';
const CFG_TEACHERS = 'ПРЕПОДАВАТЕЛИ';
const CFG_JOURNALS = 'ЖУРНАЛЫ';
const SNAPSHOT_SHEET = '_СНИМОК';
const DEFAULT_MONTH = 'Сентябрь 2026';
const CONFIG_CACHE_KEY = 'planet_cfg_v3';

// Стартовые данные — используются ТОЛЬКО при первом создании листов настроек.
// Дальше всё редактируется в листах ПРЕПОДАВАТЕЛИ и ЖУРНАЛЫ.
const DEFAULT_TEACHERS = [
  { short: 'Кадырбекова Ф.К.',  full: 'Кадырбекова Фарида Кадырбековна',  password: '1111', paymentsId: '1HTuEM6bz3cTeOup0p1Mf4KkXGmMdxS6b1xzUnrv55lM' },
  { short: 'Токоева А.Ш.',      full: 'Токоева Аида Шамшидиновна',        password: '2222', paymentsId: '1KbnvPlnlAvEGYHPMA4obNcCQbwkY6I1CP09b7zzY_dw' },
  { short: 'Ниязалиева З.А.',   full: 'Ниязалиева Зульфия Анарбековна',   password: '3333', paymentsId: '1gPwFnAGF0jSFMtnNSQ0lSII1nRGlGQzLWY_81tBKfCM' },
  { short: 'Шамбеталиева Н.Ч.', full: 'Шамбеталиева Наргиза Чолпонбековна', password: '4444', paymentsId: '1Xy8Vx1gC4U-S6TJF0-Yj3FLWSx4MNgNx-F6Fla2KJkE' },
  { short: 'Кадырова Ш.Ч.',     full: 'Кадырова Шахризада Чубаковна',     password: '5555', paymentsId: '1DsIM7Q2WhNzQWeSWL5urNd0eWhn3tRQ_UpV3fe9csGk' },
  { short: 'Болотбекова А.Б.',  full: 'Болотбекова Айсулуу Болотбековна',  password: '6666', paymentsId: '137JEkG0n4ibqIToqT6xI_MQ9gjc3gl-aOGTcAMBbeR8' },
  { short: 'Бектурсунова А.Б.', full: 'Бектурсунова Асель Бектурсуновна',  password: '7777', paymentsId: '1yCwC9vgfHymr8E5s-47kOd6smsx7KJvX32piRZAfZDQ' },
  { short: 'Нусупова М.Т.',     full: 'Нусупова Миргуль Тынарбековна',     password: '8888', paymentsId: '1SkmAbLAzImEu1vKWddDF11puz2oqCNuXvKApHE5_qhQ' }
];

const MSG_ABSENT_DEFAULT =
  '*«Планета» билим берүү борбору*\n' +
  'Урматтуу ата-эне!\n' +
  '{ученик} {когда_кг} сабакка келген жок.\n' +
  'Сабактар {дни_кг} күндөрү саат {время}го чейин болот. Балаңыздын сабакка өз убагында катышуусун камсыз кылып коюуңузду өтүнөбүз. Келбей калуунун себебин билдирип коюңуз.\n' +
  '{группа}, мугалими: *{преподаватель_ио}*';
const MSG_LATE_DEFAULT =
  '*«Планета» билим берүү борбору*\n' +
  'Урматтуу ата-эне!\n' +
  '{ученик} {когда_кг} сабакка кечигип келди.\n' +
  'Сабактар {дни_кг} күндөрү саат {время}го чейин болот. Балаңыздын сабакка өз убагында келүүсүн көзөмөлдөп коюуңузду өтүнөбүз.\n' +
  '{группа}, мугалими: *{преподаватель_ио}*';

const SETTINGS_DEFAULTS = [
  ['ТЕКУЩИЙ_МЕСЯЦ', DEFAULT_MONTH, 'Месяц по умолчанию. Должен точно совпадать с названием месяца в листе ЖУРНАЛЫ'],
  ['ПАРОЛЬ_АДМИНИСТРАТОРА', '9999', 'Пароль кассира (касса, оплаты, поиск, должники)'],
  ['ПАРОЛЬ_РУКОВОДИТЕЛЯ', '2026', 'Пароль руководителя (полный доступ: сводка, преподаватели, ФОТ). ОБЯЗАТЕЛЬНО смените!'],
  ['ПОРЯДОК_ПРЕПОДАВАТЕЛЕЙ', 'Кадырбекова Ф.К., Токоева А.Ш., Ниязалиева З.А., Шамбеталиева Н.Ч., Кадырова Ш.Ч., Болотбекова А.Б., Бектурсунова А.Б., Нусупова М.Т.', 'Порядок преподавателей во всех списках кабинета (краткие имена через запятую, как в листе ПРЕПОДАВАТЕЛИ). Не перечисленные — после, по алфавиту'],
  ['ПЕРЕСЧЁТ_ОТ_ЗАНЯТИЙ', '2', 'Со скольких пропущенных занятий пересчитывать абонемент при уважительном пропуске (болезнь, отъезд)'],
  ['ТЕКСТ_ОПЛАТА_ПРИНЯТА', THANKS_KG_DEFAULT, 'Сообщение родителю после приёма оплаты (кыргызча). Подстановки: {ученик} {сумма} {остаток} {занятий} {ай} {ай_абонемент} {группа_уровень} {уровень} {итог_кг} {предоплата_кг} {группа} {преподаватель} {месяц} {квитанция} {дата}'],
  ['ФОТО_БЕЗ_ПОДПИСИ', 'принимать', 'Фото без подписи во «Входящих оплатах»: «принимать» — попадёт в очередь как возможный чек (скриншоты из банка обычно без подписи), «пропускать» — не попадёт'],
  ['СЛОВА_ОПЛАТЫ', '', 'Через запятую: дополнительные слова, по которым сообщение считается оплатой (например: одеңги, элсом). Обычные слова про оплату уже учтены'],
  ['КЛЮЧ_ВЕБХУКА', '', 'Необязательно. Слово-ключ для приёма чеков из WhatsApp: если заполнено, к адресу GREEN-API нужно дописать ?wh=<это слово>. Пусто — приём работает по обычной ссылке /exec'],
  ['ПАРОЛЬ_РЕСЕПШН', '2029', 'Пароль кабинета «Приём» (ресепшн): заявки новых учеников, тест, договор, зачисление в группу. Смените!'],
  ['МИНИМУМ_ДЛЯ_ГРУППЫ', '6', 'Сколько человек нужно набрать в очереди по уровню, чтобы открывать новую группу'],
  ['ВМЕСТИМОСТЬ_ГРУППЫ', '16', 'Максимум учеников в группе (для расчёта заполняемости)'],
  ['ФОТ_ПО_УМОЛЧАНИЮ', '0,36', 'Коэффициент ФОТ, если в журнале нет листа МОНИТОРИНГ с коэффициентом в L9'],
  ['АВТО_УВЕДОМЛЕНИЯ', 'НЕТ', 'ДА — уведомления об оплате уходят автоматически в день 1-го, 3-го и 5-го занятия (в ЧАС_АВТОРАССЫЛКИ); НЕТ — только по кнопке'],
  ['ЧАС_АВТОРАССЫЛКИ', '8', 'Час автоотправки по времени Бишкека (0–23). После изменения запустите createAutoNoticesTrigger'],
  ['РЕКВИЗИТЫ', 'https://mbank.kg/0755494494 — БЕКЖАН Б', 'Реквизиты для оплаты, подставляются в уведомления как {реквизиты}'],
  ['ОКНО_УВЕДОМЛЕНИЯ_1', '0', 'Сколько дней после даты 1-го занятия ещё можно отправить уведомление 1 (0 = только в день занятия; раньше даты — нельзя)'],
  ['ОКНО_УВЕДОМЛЕНИЯ_2', '0', 'Сколько дней после даты 3-го занятия ещё можно отправить уведомление 2 (0 = только в день занятия)'],
  ['ОКНО_УВЕДОМЛЕНИЯ_3', '0', 'Сколько дней после даты 5-го занятия ещё можно отправить уведомление 3 (0 = только в день занятия)'],
  ['МЕСЯЦ_АБОНЕМЕНТА', 'ПО_ЖУРНАЛУ', 'Какой месяц подставлять в уведомления как {ай}/{месяц}: ПО_ЖУРНАЛУ — месяц журнала (месяц отправки); ПО_ПЕРВОМУ_ЗАНЯТИЮ — месяц даты 1-го занятия группы'],
  ['ИСТОЧНИК_ДАННЫХ', 'ЖУРНАЛЫ', 'ЖУРНАЛЫ — кабинеты работают с журналами Google Таблиц; БАЗА — с листами УЧЕНИКИ / ГРУППЫ / СОСТАВ / ПОСЕЩЕНИЯ этой таблицы'],
  ['ВАРИАНТЫ_ДНЕЙ', 'Пн - Ср - Пт, Вт - Чт - Сб, Пн - Вт - Ср - Чт - Пт, Сб - Вс, Пн - Ср, Вт - Чт, Пн - Пт', 'Варианты дней недели для групп (через запятую) — режим БАЗА'],
  ['ВАРИАНТЫ_ВРЕМЕНИ', '7.00 - 8.00, 8.00 - 9.00, 9.00 - 10.00, 10.00 - 11.00, 11.00 - 12.00, 12.00 - 13.00, 13.00 - 14.00, 14.00 - 15.00, 15.00 - 16.00, 16.00 - 17.00, 16.30 - 17.30, 17.00 - 18.00, 17.30 - 18.30, 18.00 - 19.00, 18.30 - 19.30, 19.00 - 20.00, 19.30 - 20.30, 20.00 - 21.00', 'Варианты времени занятий (через запятую) — режим БАЗА'],
  ['РЕЗЕРВНЫХ_КОПИЙ_ХРАНИТЬ', '12', 'Сколько последних резервных копий таблицы хранить в папке «Резервные копии» (старые удаляются автоматически)'],
  ['КАБИНЕТЫ', '1, 2, 3, 4, 5', 'Список кабинетов центра (через запятую) — выбирается в настройках группы, проверяется на пересечения'],
  ['КАБИНЕТ_СВОБОДНО_ДО', '2026-09-30', 'До этой даты (включительно) преподаватели меняют кабинет сами; после — смена кабинета уходит на подтверждение руководителю'],
  ['НАПОМИНАНИЯ_О_ЗАНЯТИИ', 'НЕТ', 'ДА — утром в день занятия родителям уходит напоминание (текст НАПОМИНАНИЕ_ЗАНЯТИЕ в листе СООБЩЕНИЯ)'],
  ['ЧАС_НАПОМИНАНИЯ', '8', 'Час отправки напоминаний о занятии (0–23, Бишкек); триггер — createRemindersTrigger'],
  ['ЯЗЫК_СООБЩЕНИЙ', 'KG', 'Язык уведомлений об оплате по умолчанию: KG или RU (можно задать отдельно для каждого текста в листе СООБЩЕНИЯ)'],
  ['ЛОГОТИП_URL', '', 'Ссылка на картинку логотипа для шапки сайта: общая ссылка Google Диска (доступ «всем, у кого есть ссылка») или прямой адрес картинки. Пусто — встроенный значок'],
  ['ОТМЕТКИ_ТОЛЬКО_В_ДЕНЬ_ЗАНЯТИЯ', 'ДА', 'ДА — отметки посещения только в день занятия и в течение ДНЕЙ_НА_ПРАВКУ_ОТМЕТОК после; НЕТ — в любой день'],
  ['ДНЕЙ_НА_ПРАВКУ_ОТМЕТОК', '1', 'Сколько дней после занятия преподаватель ещё может ставить/менять отметки (1 = день занятия и следующий день)'],
  ['ПЛАН_МЕСЯЦЕВ_ДО', 'Декабрь 2027', 'До какого месяца включительно заранее открыты месяцы в переключателях (режим БАЗА): группы можно переносить в любой из них'],
  ['ДНЕЙ_ДО_ПЕРЕХОДА', '10', 'Режим ЖУРНАЛЫ: за сколько дней до последнего (12-го) занятия появляется кнопка «Перенести группу в следующий месяц»'],
  ['ПЕРЕНОС_С_ЗАНЯТИЯ', '4', 'Режим БАЗА: с какого проведённого занятия преподаватель может перенести группу в следующий месяц (двойной щелчок по кнопке «Перенести»)'],
  ['АВТОПЕРЕНОС_ПОСЛЕ_ЗАНЯТИЯ', '9', 'Режим БАЗА: после какого проведённого занятия система сама переносит группу в следующий месяц (проверка каждую ночь; 0 — не переносить автоматически)'],
  ['ДАТЫ_МЕНЯТЬ_ДО_ЗАНЯТИЯ', '3', 'До какого занятия (включительно, по датам группы) преподаватель может менять даты, уровень, дни и время; после — только кассир или руководитель'],
  ['ЧАСОВ_НА_ПРАВКУ_ФИО', '24', 'Сколько часов после первого сохранения преподаватель может исправить ФИО ученика; дальше — только кассир или руководитель'],
  ['СООБЩЕНИЕ_ОТСУТСТВИЕ', MSG_ABSENT_DEFAULT, 'Текст WhatsApp-сообщения при отметке 0. Подстановки: {ученик} {когда_кг} («бүгүн, 5-сентябрь күнү» / «5-сентябрь күнү») {когда} {дата_кг} {день_кг} {дата} {день} {время} {дни} {дни_кг} {группа} {уровень} {преподаватель} {преподаватель_ио} {занятие}'],
  ['СООБЩЕНИЕ_ОПОЗДАНИЕ', MSG_LATE_DEFAULT, 'Текст WhatsApp-сообщения при отметке 0,5. Подстановки те же']
];

const TEACHERS_HEADERS = ['№', 'Краткое имя', 'ФИО полностью', 'Пароль', 'Телефон', 'WhatsApp', 'Статус', 'Дата начала', 'Примечание', 'Журнал (ВКЛ/ВЫКЛ)', 'Пароль изменён'];
const JOURNALS_HEADERS = ['Месяц', 'Краткое имя преподавателя', 'Ссылка или ID платёжного журнала (PAYMENTS)', 'Ссылка или ID журнала посещений (NEW)', 'Название журнала'];
const LINKS_SHEET = 'Ссылки';

const HEADER_COLOR = '#173F67';
const BAND_LIGHT_COLOR = '#D9E2F3';
const BAND_WHITE_COLOR = '#FFFFFF';
const DUPLICATE_COLOR = '#F4CCCC';


/**
 * Перезаписать тексты сообщений об отсутствии/опоздании в НАСТРОЙКИ стандартными
 * (запускать, когда я обновил стандартные тексты; ваши правки при этом затираются).
 */
function resetMessageTemplates() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CFG_SETTINGS);
  if (!sh) return 'Лист НАСТРОЙКИ не найден.';
  const keys = { 'СООБЩЕНИЕ_ОТСУТСТВИЕ': MSG_ABSENT_DEFAULT, 'СООБЩЕНИЕ_ОПОЗДАНИЕ': MSG_LATE_DEFAULT };
  const last = sh.getLastRow();
  let done = 0;
  if (last >= 2) {
    const col = sh.getRange(2, 1, last - 1, 1).getDisplayValues();
    col.forEach(function(r, i) {
      const k = String(r[0] || '').trim();
      if (keys[k] !== undefined) { sh.getRange(i + 2, 2).setNumberFormat('@').setValue(keys[k]); done++; }
    });
  }
  ensureSettingsRows_(sh);
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  const msg = 'Обновлено текстов: ' + done;
  Logger.log(msg);
  return msg;
}

/**
 * ЗАПУСТИТЬ ОДИН РАЗ. Создаёт листы НАСТРОЙКИ, ПРЕПОДАВАТЕЛИ, ЖУРНАЛЫ,
 * если их ещё нет, и заполняет стартовыми данными. Существующие листы не трогает.
 */
function setupConfigSheets() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const created = [];

  if (!ss.getSheetByName(CFG_SETTINGS)) {
    const sh = ss.insertSheet(CFG_SETTINGS);
    sh.getRange(1, 1, 1, 3).setValues([['Параметр', 'Значение', 'Описание']]);
    sh.getRange(2, 2, 200, 1).setNumberFormat('@');   // текст ДО записи — чтобы «0000» не стало 0
    sh.getRange(2, 1, SETTINGS_DEFAULTS.length, 3).setValues(SETTINGS_DEFAULTS);
    styleConfigSheet_(sh, 3, [260, 200, 620]);
    created.push(CFG_SETTINGS);
  } else {
    const added = ensureSettingsRows_(ss.getSheetByName(CFG_SETTINGS));
    if (added.length) created.push(CFG_SETTINGS + ' (добавлены параметры: ' + added.join(', ') + ')');
  }

  if (!ss.getSheetByName(CFG_TEACHERS)) {
    const sh = ss.insertSheet(CFG_TEACHERS);
    sh.getRange(1, 1, 1, TEACHERS_HEADERS.length).setValues([TEACHERS_HEADERS]);
    sh.getRange(2, 4, 200, 3).setNumberFormat('@');   // пароль, телефон, whatsapp — текст ДО записи
    const rows = DEFAULT_TEACHERS.map(function(t, i) {
      return [i + 1, t.short, t.full, t.password, '', '', 'работает', '', ''];
    });
    sh.getRange(2, 1, rows.length, TEACHERS_HEADERS.length).setValues(rows);
    styleConfigSheet_(sh, TEACHERS_HEADERS.length, [50, 190, 320, 100, 150, 150, 110, 120, 300]);
    created.push(CFG_TEACHERS);
  }

  if (!ss.getSheetByName(CFG_JOURNALS)) {
    const sh = ss.insertSheet(CFG_JOURNALS);
    sh.getRange(1, 1, 1, JOURNALS_HEADERS.length).setValues([JOURNALS_HEADERS]);
    sh.getRange(2, 1, 200, JOURNALS_HEADERS.length).setNumberFormat('@');   // текст ДО записи
    const rows = DEFAULT_TEACHERS.map(function(t) {
      return [DEFAULT_MONTH, t.short, t.paymentsId, '', 'PAYMENTS SEPTEMBER 2026 — ' + t.short];
    });
    sh.getRange(2, 1, rows.length, JOURNALS_HEADERS.length).setValues(rows);
    styleConfigSheet_(sh, JOURNALS_HEADERS.length, [150, 220, 420, 420, 380]);
    created.push(CFG_JOURNALS);
  }

  if (!ss.getSheetByName(MSG_SHEET)) { messagesSheet_(true); created.push(MSG_SHEET); }
  if (!ss.getSheetByName(PRICE_SHEET)) { priceSheet_(true); created.push(PRICE_SHEET); }

  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}

  const msg = created.length
    ? 'Созданы листы: ' + created.join(', ')
    : 'Листы настроек уже существуют — ничего не изменено.';
  Logger.log(msg);
  try { ss.toast(msg, 'Настройки', 6); } catch (e) {}
  return msg;
}

/** Добавляет в лист НАСТРОЙКИ параметры, которых ещё нет. Возвращает список добавленных. */
function ensureSettingsRows_(sh) {
  const last = sh.getLastRow();
  const existing = {};
  if (last >= 2) {
    sh.getRange(2, 1, last - 1, 1).getDisplayValues().forEach(function(r) {
      const k = String(r[0] || '').trim();
      if (k) existing[k] = true;
    });
  }
  const missing = SETTINGS_DEFAULTS.filter(function(d) { return !existing[d[0]]; });
  if (missing.length) {
    const row = Math.max(last + 1, 2);
    sh.getRange(row, 2, missing.length, 1).setNumberFormat('@');   // текст ДО записи
    sh.getRange(row, 1, missing.length, 3).setValues(missing);
  }
  return missing.map(function(d) { return d[0]; });
}

function styleConfigSheet_(sh, cols, widths) {
  sh.getRange(1, 1, 1, cols)
    .setBackground(HEADER_COLOR).setFontColor('#FFFFFF').setFontWeight('bold')
    .setHorizontalAlignment('center').setVerticalAlignment('middle');
  sh.setFrozenRows(1);
  widths.forEach(function(w, i) { sh.setColumnWidth(i + 1, w); });
}

function parseNum_(v) {
  if (typeof v === 'number') return isNaN(v) ? 0 : v;
  const n = Number(String(v === undefined || v === null ? '' : v).replace(/\s/g, '').replace(',', '.'));
  return isNaN(n) ? 0 : n;
}

function readTable_(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh) return [];
  const last = sh.getLastRow();
  const lastCol = sh.getLastColumn();
  if (last < 2 || lastCol < 1) return [];
  return sh.getRange(2, 1, last - 1, lastCol).getDisplayValues();
}

/** Конфигурация из листов (кэш 60 секунд) */
function getConfig_() {

  const cache = CacheService.getScriptCache();
  try {
    const cached = cache.get(CONFIG_CACHE_KEY);
    if (cached) return JSON.parse(cached);
  } catch (e) {}

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss.getSheetByName(CFG_SETTINGS) || !ss.getSheetByName(CFG_TEACHERS) || !ss.getSheetByName(CFG_JOURNALS)) {
    setupConfigSheets();
  }

  const settings = {};
  readTable_(ss, CFG_SETTINGS).forEach(function(r) {
    const k = String(r[0] || '').trim();
    if (k) settings[k] = String(r[1] === undefined ? '' : r[1]).trim();
  });
  const missingDefaults = SETTINGS_DEFAULTS.some(function(d) { return settings[d[0]] === undefined; });
  if (missingDefaults) {
    try {
      ensureSettingsRows_(ss.getSheetByName(CFG_SETTINGS));
      readTable_(ss, CFG_SETTINGS).forEach(function(r) {
        const k = String(r[0] || '').trim();
        if (k && settings[k] === undefined) settings[k] = String(r[1] === undefined ? '' : r[1]).trim();
      });
    } catch (e) {}
  }

  const teachers = [];
  readTable_(ss, CFG_TEACHERS).forEach(function(r) {
    const short = String(r[1] || '').trim();
    if (!short) return;
    teachers.push({
      short: short,
      full: String(r[2] || '').trim(),
      password: String(r[3] || '').trim(),
      phone: String(r[4] || '').trim(),
      whatsapp: String(r[5] || '').trim(),
      status: String(r[6] || '').trim() || 'работает',
      start: String(r[7] || '').trim(),
      note: String(r[8] || '').trim(),
      journalOn: String(r[9] || '').trim().toUpperCase() !== 'ВЫКЛ',
      pwdChanged: r[10] instanceof Date ? Utilities.formatDate(r[10], TZ, 'dd.MM.yyyy HH:mm') : String(r[10] || '').trim()
    });
  });

  const journals = [];
  readTable_(ss, CFG_JOURNALS).forEach(function(r) {
    const month = String(r[0] || '').trim();
    const short = String(r[1] || '').trim();
    const pid = extractSheetId_(r[2]);
    if (!month || !short || !pid) return;
    journals.push({
      month: month,
      teacher: short,
      paymentsId: pid,
      attendanceId: extractSheetId_(r[3]),
      name: String(r[4] || '').trim() || ('Журнал ' + month + ' — ' + short)
    });
  });

  // Защита: журнал посещений (D) не может совпадать ни с одним платёжным журналом (C)
  const paymentsIds = {};
  journals.forEach(function(j) { paymentsIds[j.paymentsId] = j.teacher + ' / ' + j.month; });
  journals.forEach(function(j) {
    if (j.attendanceId && paymentsIds[j.attendanceId]) {
      j.attendanceError = 'в столбце D указан платёжный журнал (' + paymentsIds[j.attendanceId] + ')';
      j.attendanceId = '';
    }
  });

  const months = [];
  journals.forEach(function(j) { if (months.indexOf(j.month) === -1) months.push(j.month); });

  let currentMonth = String(settings['ТЕКУЩИЙ_МЕСЯЦ'] || '').trim();
  if (months.indexOf(currentMonth) === -1) currentMonth = months.length ? months[months.length - 1] : DEFAULT_MONTH;

  // порядок преподавателей во всех списках
  const ordList = String(settings['ПОРЯДОК_ПРЕПОДАВАТЕЛЕЙ'] || '').split(',').map(function(x) { return nameKey_(x); }).filter(Boolean);
  const ordIdx = function(short) { const i = ordList.indexOf(nameKey_(short)); return i === -1 ? 999 : i; };
  teachers.sort(function(a, b) { return (ordIdx(a.short) - ordIdx(b.short)) || a.short.localeCompare(b.short, 'ru'); });
  const cfg = {
    settings: settings,
    teachers: teachers,
    teacherOrder: teachers.map(function(t) { return t.short; }),
    journals: journals,
    months: months,
    currentMonth: currentMonth,
    adminPassword: String(settings['ПАРОЛЬ_АДМИНИСТРАТОРА'] || '9999').trim(),
    directorPassword: String(settings['ПАРОЛЬ_РУКОВОДИТЕЛЯ'] || '2026').trim(),
    receptionPassword: String(settings['ПАРОЛЬ_РЕСЕПШН'] || '2029').trim(),
    thanksTpl: String(settings['ТЕКСТ_ОПЛАТА_ПРИНЯТА'] || '').trim(),
    absMinLessons: Math.max(1, Math.round(parseNum_(settings['ПЕРЕСЧЁТ_ОТ_ЗАНЯТИЙ'] === undefined ? 2 : settings['ПЕРЕСЧЁТ_ОТ_ЗАНЯТИЙ'])) || 2),
    groupMin: Math.max(2, Math.round(parseNum_(settings['МИНИМУМ_ДЛЯ_ГРУППЫ'] === undefined ? 6 : settings['МИНИМУМ_ДЛЯ_ГРУППЫ'])) || 6),
    capacity: Math.round(parseNum_(settings['ВМЕСТИМОСТЬ_ГРУППЫ'])) || 16,
    defaultCoef: parseNum_(settings['ФОТ_ПО_УМОЛЧАНИЮ']) || 0.36,
    marksOnlyOnLessonDay: String(settings['ОТМЕТКИ_ТОЛЬКО_В_ДЕНЬ_ЗАНЯТИЯ'] || 'ДА').trim().toUpperCase() !== 'НЕТ',
    markDays: Math.max(0, Math.round(parseNum_(settings['ДНЕЙ_НА_ПРАВКУ_ОТМЕТОК'] === undefined ? 1 : settings['ДНЕЙ_НА_ПРАВКУ_ОТМЕТОК']))),
    editUntilLesson: Math.min(12, Math.max(1, Math.round(parseNum_(settings['ДАТЫ_МЕНЯТЬ_ДО_ЗАНЯТИЯ'] === undefined ? 3 : settings['ДАТЫ_МЕНЯТЬ_ДО_ЗАНЯТИЯ'])) || 3)),
    transferDays: Math.max(0, Math.round(parseNum_(settings['ДНЕЙ_ДО_ПЕРЕХОДА'] === undefined ? 10 : settings['ДНЕЙ_ДО_ПЕРЕХОДА']))),
    transferFromLesson: Math.min(12, Math.max(1, Math.round(parseNum_(settings['ПЕРЕНОС_С_ЗАНЯТИЯ'] === undefined ? 4 : settings['ПЕРЕНОС_С_ЗАНЯТИЯ'])) || 4)),
    autoTransferAfter: Math.min(12, Math.max(0, Math.round(parseNum_(settings['АВТОПЕРЕНОС_ПОСЛЕ_ЗАНЯТИЯ'] === undefined ? 9 : settings['АВТОПЕРЕНОС_ПОСЛЕ_ЗАНЯТИЯ'])))),
    planUntil: String(settings['ПЛАН_МЕСЯЦЕВ_ДО'] || 'Декабрь 2027').trim(),
    nameEditHours: Math.max(0, parseNum_(settings['ЧАСОВ_НА_ПРАВКУ_ФИО'] === undefined ? 24 : settings['ЧАСОВ_НА_ПРАВКУ_ФИО'])),
    autoNotices: String(settings['АВТО_УВЕДОМЛЕНИЯ'] || 'НЕТ').trim().toUpperCase() === 'ДА',
    autoHour: Math.min(23, Math.max(0, Math.round(parseNum_(settings['ЧАС_АВТОРАССЫЛКИ'] === undefined ? 8 : settings['ЧАС_АВТОРАССЫЛКИ'])))),
    requisites: String(settings['РЕКВИЗИТЫ'] || '').trim(),
    msgLang: String(settings['ЯЗЫК_СООБЩЕНИЙ'] || 'KG').trim().toUpperCase() === 'RU' ? 'RU' : 'KG',
    monthByFirstLesson: String(settings['МЕСЯЦ_АБОНЕМЕНТА'] || 'ПО_ЖУРНАЛУ').trim().toUpperCase() === 'ПО_ПЕРВОМУ_ЗАНЯТИЮ',
    noticeWindows: {
      1: Math.max(0, Math.round(parseNum_(settings['ОКНО_УВЕДОМЛЕНИЯ_1'] === undefined ? 0 : settings['ОКНО_УВЕДОМЛЕНИЯ_1']))),
      2: Math.max(0, Math.round(parseNum_(settings['ОКНО_УВЕДОМЛЕНИЯ_2'] === undefined ? 0 : settings['ОКНО_УВЕДОМЛЕНИЯ_2']))),
      3: Math.max(0, Math.round(parseNum_(settings['ОКНО_УВЕДОМЛЕНИЯ_3'] === undefined ? 0 : settings['ОКНО_УВЕДОМЛЕНИЯ_3'])))
    },
    secretSeconds: Math.max(2, Math.round(parseNum_(settings['СЕКУНД_СЕКРЕТНОГО_ВХОДА'] === undefined ? 7 : settings['СЕКУНД_СЕКРЕТНОГО_ВХОДА'])) || 7),
    useDb: String(settings['ИСТОЧНИК_ДАННЫХ'] || 'ЖУРНАЛЫ').trim().toUpperCase() === 'БАЗА',
    rooms: String(settings['КАБИНЕТЫ'] || '1, 2, 3, 4, 5').split(',').map(function(x) { return x.trim(); }).filter(Boolean),
    roomFreeUntil: String(settings['КАБИНЕТ_СВОБОДНО_ДО'] || '2026-09-30').trim(),
    remindersOn: String(settings['НАПОМИНАНИЯ_О_ЗАНЯТИИ'] || 'НЕТ').trim().toUpperCase() === 'ДА',
    remindHour: Math.min(23, Math.max(0, Math.round(parseNum_(settings['ЧАС_НАПОМИНАНИЯ'] === undefined ? 8 : settings['ЧАС_НАПОМИНАНИЯ'])))),
    dayOptions: String(settings['ВАРИАНТЫ_ДНЕЙ'] || '').split(',').map(function(x) { return x.trim(); }).filter(Boolean),
    timeOptions: String(settings['ВАРИАНТЫ_ВРЕМЕНИ'] || '').split(',').map(function(x) { return x.trim(); }).filter(Boolean)
  };

  try { cache.put(CONFIG_CACHE_KEY, JSON.stringify(cfg), 60); } catch (e) {}
  return cfg;
}

/** ID таблицы из полной ссылки или «как есть», если это уже ID */
function extractSheetId_(value) {
  const v = String(value || '').trim();
  if (!v) return '';
  const m = v.match(/\/d\/([a-zA-Z0-9_-]{20,})/);
  if (m) return m[1];
  if (/^[a-zA-Z0-9_-]{20,}$/.test(v)) return v;
  return '';
}

/** Ссылка из ячейки: формула HYPERLINK, форматированная ссылка или просто текст */
function cellLink_(range) {
  try {
    const f = range.getFormula();
    if (f) {
      const m = f.match(/(?:HYPERLINK|ГИПЕРССЫЛКА)\s*\(\s*"([^"]+)"/i);
      if (m) return m[1];
    }
  } catch (e) {}
  try {
    const rtv = range.getRichTextValue();
    if (rtv) {
      const u = rtv.getLinkUrl();
      if (u) return u;
      const runs = rtv.getRuns();
      for (let i = 0; i < runs.length; i++) {
        const ru = runs[i].getLinkUrl();
        if (ru) return ru;
      }
    }
  } catch (e) {}
  return String(range.getDisplayValue() || '').trim();
}

/** Ссылка из чипа файла через расширенный сервис Sheets API (если он подключён в проекте) */
function chipUrl_(range) {
  try {
    if (typeof Sheets === 'undefined') return '';
    const sheet = range.getSheet();
    const a1 = "'" + sheet.getName() + "'!" + range.getA1Notation();
    const resp = Sheets.Spreadsheets.get(sheet.getParent().getId(), {
      ranges: [a1], includeGridData: true, fields: 'sheets.data.rowData.values.chipRuns'
    });
    const runs = resp.sheets[0].data[0].rowData[0].values[0].chipRuns || [];
    for (let i = 0; i < runs.length; i++) {
      const c = runs[i].chip;
      if (c && c.richLinkProperties && c.richLinkProperties.uri) return c.richLinkProperties.uri;
    }
  } catch (e) {}
  return '';
}

/**
 * Поиск таблицы на Диске по названию (точное совпадение, затем по ключевым словам:
 * NEW/PAYMENTS + месяц + фамилия). Возвращает {id, name} или null.
 */
function findSpreadsheetByName_(fileName, kind, monthText, teacherShort) {
  const MIME = 'application/vnd.google-apps.spreadsheet';
  const prefix = kind === 'new' ? 'NEW' : 'PAYMENTS';
  const norm = function(v) { return String(v || '').toLowerCase().replace(/\s+/g, ' ').trim(); };
  const pick = function(files) {
    const ok = files.filter(function(f) { return norm(f.getName()).indexOf(norm(prefix)) === 0; });
    const list = ok.length ? ok : files;
    if (!list.length) return null;
    list.sort(function(a, b) { return b.getLastUpdated() - a.getLastUpdated(); });
    return { id: list[0].getId(), name: list[0].getName(), candidates: list.length };
  };

  try {
    if (fileName) {
      const it = DriveApp.getFilesByName(fileName);
      const exact = [];
      while (it.hasNext()) { const f = it.next(); if (f.getMimeType() === MIME && !f.isTrashed()) exact.push(f); }
      const r = pick(exact);
      if (r) return r;
    }
    const surname = String(teacherShort || '').trim().split(/\s+/)[0];
    const esc = function(v) { return String(v).replace(/'/g, "\\'"); };
    let q = "mimeType = '" + MIME + "' and trashed = false and title contains '" + prefix + "'";
    if (surname) q += " and title contains '" + esc(surname) + "'";
    if (monthText) q += " and title contains '" + esc(monthText) + "'";
    const it2 = DriveApp.searchFiles(q);
    const found = [];
    while (it2.hasNext()) found.push(it2.next());
    return pick(found);
  } catch (e) {
    Logger.log('Поиск на Диске «' + fileName + '»: ' + e.message);
    return null;
  }
}

/** Ссылка на журнал из ячейки листа «Ссылки»: гиперссылка → чип → поиск на Диске по названию */
function resolveJournalLink_(range, kind, monthText, teacherShort) {
  const direct = cellLink_(range);
  if (extractSheetId_(direct)) return { url: direct, name: String(range.getDisplayValue() || '').trim(), how: 'ссылка' };

  const chip = chipUrl_(range);
  if (extractSheetId_(chip)) return { url: chip, name: String(range.getDisplayValue() || '').trim(), how: 'чип' };

  const text = String(range.getDisplayValue() || '').trim();
  const f = findSpreadsheetByName_(text, kind, monthText, teacherShort);
  if (f) return { url: 'https://docs.google.com/spreadsheets/d/' + f.id + '/edit', name: f.name, how: 'найдено на Диске' + (f.candidates > 1 ? ' (совпадений: ' + f.candidates + ', взято последнее изменённое)' : '') };

  return null;
}

/**
 * ЗАПУСТИТЬ ОДИН РАЗ (и при появлении новых журналов).
 * Читает лист «Ссылки» (строки 11–26: B — преподаватель, C — журнал NEW,
 * E — журнал PAYMENTS). Ссылки достаёт из гиперссылок, чипов файлов или
 * находит таблицы на Диске по названию. Заполняет лист ЖУРНАЛЫ для текущего
 * месяца полными ссылками. Существующие ссылки на PAYMENTS не затирает.
 */
function importJournalLinks() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const src = ss.getSheetByName(LINKS_SHEET);
  if (!src) {
    const msg = 'Лист «' + LINKS_SHEET + '» не найден.';
    Logger.log(msg);
    return msg;
  }

  if (!ss.getSheetByName(CFG_JOURNALS)) setupConfigSheets();
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  const cfg = getConfig_();
  const month = cfg.currentMonth;
  const jsh = ss.getSheetByName(CFG_JOURNALS);

  jsh.getRange(1, 3, 1, 2).setValues([[JOURNALS_HEADERS[2], JOURNALS_HEADERS[3]]]);

  // «SEPTEMBER 2026» из заголовка «Журналы посещаемости (NEW SEPTEMBER 2026):»
  let monthText = '';
  try {
    const m = String(src.getRange('C10').getDisplayValue() || '').match(/\(([^)]+)\)/);
    if (m) monthText = m[1].replace(/^\s*(NEW|PAYMENTS)\s+/i, '').trim();
  } catch (e) {}

  const last = jsh.getLastRow();
  const rows = last >= 2 ? jsh.getRange(2, 1, last - 1, 5).getDisplayValues() : [];
  const key = function(v) { return String(v || '').toLowerCase().replace(/[\s.\u00A0]/g, ''); };
  const findRow = function(short) {
    for (let i = 0; i < rows.length; i++) {
      if (key(rows[i][0]) === key(month) && key(rows[i][1]) === key(short)) return i + 2;
    }
    return 0;
  };
  const canonical = function(short) {
    for (let i = 0; i < cfg.teachers.length; i++) if (key(cfg.teachers[i].short) === key(short)) return cfg.teachers[i].short;
    return short;
  };

  let updated = 0, added = 0;
  const report = [];

  for (let r = 11; r <= 26; r++) {
    const short = canonical(String(src.getRange(r, 2).getDisplayValue() || '').trim());
    if (!short) continue;

    const newLink = resolveJournalLink_(src.getRange(r, 3), 'new', monthText, short);
    const payLink = resolveJournalLink_(src.getRange(r, 5), 'payments', monthText, short);

    // защита от перепутанных столбцов
    if (newLink && /PAYMENT/i.test(newLink.name)) { report.push(short + ': в столбце C найден платёжный журнал «' + newLink.name + '» — пропущено'); continue; }

    if (!newLink && !payLink) { report.push(short + ': ссылки не найдены'); continue; }

    const row = findRow(short);
    if (row) {
      if (newLink) jsh.getRange(row, 4).setValue(newLink.url);
      if (payLink && !extractSheetId_(rows[row - 2][2])) jsh.getRange(row, 3).setValue(payLink.url);
      updated++;
    } else {
      jsh.appendRow([month, short, payLink ? payLink.url : '', newLink ? newLink.url : '', 'PAYMENTS ' + month + ' — ' + short]);
      added++;
    }
    report.push(short + ': NEW ' + (newLink ? '✓ «' + newLink.name + '» (' + newLink.how + ')' : '—') +
                '; PAYMENTS ' + (payLink ? '✓ «' + payLink.name + '»' : '—'));
  }

  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}

  const summary = 'Месяц «' + month + '»: обновлено строк ' + updated + ', добавлено ' + added + '.\n' + report.join('\n');
  Logger.log(summary);
  try { ss.toast('Обновлено: ' + updated + ', добавлено: ' + added, 'Ссылки на журналы', 8); } catch (e) {}
  return summary;
}

/** Ключ для нестрогого сравнения имён и месяцев: без регистра, пробелов и точек */
function nameKey_(v) {
  return String(v || '').toLowerCase().replace(/[\s.\u00A0]/g, '');
}

function findTeacherCfg_(cfg, short) {
  const k = nameKey_(short);
  for (let i = 0; i < cfg.teachers.length; i++) {
    if (nameKey_(cfg.teachers[i].short) === k) return cfg.teachers[i];
  }
  return null;
}

function getJournalsForMonth_(cfg, month) {
  const k = nameKey_(month);
  return cfg.journals.filter(function(j) { return nameKey_(j.month) === k; });
}

function findJournal_(cfg, month, short) {
  const km = nameKey_(month), kt = nameKey_(short);
  let found = null;
  for (let i = 0; i < cfg.journals.length; i++) {
    const j = cfg.journals[i];
    if (nameKey_(j.month) === km && nameKey_(j.teacher) === kt) {
      // если строк несколько — берём ту, где заполнен журнал посещений
      if (!found || (!found.attendanceId && j.attendanceId)) found = j;
    }
  }
  return found;
}

/**
 * ДИАГНОСТИКА: запустить и посмотреть Журнал выполнения.
 * Показывает, что скрипт видит в листах НАСТРОЙКИ / ПРЕПОДАВАТЕЛИ / ЖУРНАЛЫ.
 */
function diagnoseConfig() {
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  const cfg = getConfig_();
  const lines = [];
  lines.push('Текущий месяц: «' + cfg.currentMonth + '». Месяцы в ЖУРНАЛЫ: ' + (cfg.months.join(', ') || '(нет)'));
  lines.push('Преподавателей в листе ПРЕПОДАВАТЕЛИ: ' + cfg.teachers.length);
  lines.push('Строк в ЖУРНАЛЫ (с заполненным PAYMENTS): ' + cfg.journals.length);
  cfg.journals.forEach(function(j) {
    lines.push('  • ' + j.month + ' | ' + j.teacher + ' | PAYMENTS ' + (j.paymentsId ? 'OK' : '—') + ' | NEW ' +
      (j.attendanceId ? 'OK (' + j.attendanceId.substr(0, 8) + '…)' : (j.attendanceError ? 'ОШИБКА: ' + j.attendanceError : 'ПУСТО')));
  });
  cfg.teachers.forEach(function(t) {
    const j = findJournal_(cfg, cfg.currentMonth, t.short);
    if (!j) lines.push('  ! ' + t.short + ': нет строки в ЖУРНАЛЫ за текущий месяц');
    else if (!j.attendanceId) lines.push('  ! ' + t.short + ': не указан журнал посещений (столбец D)');
  });
  // сырые значения столбца D — чтобы увидеть, что там на самом деле
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CFG_JOURNALS);
  if (sh && sh.getLastRow() >= 2) {
    const raw = sh.getRange(2, 1, sh.getLastRow() - 1, 4).getDisplayValues();
    lines.push('Сырые данные ЖУРНАЛЫ (месяц | преподаватель | D):');
    raw.forEach(function(r, i) {
      if (String(r[0]).trim() || String(r[1]).trim()) lines.push('  ' + (i + 2) + ': ' + r[0] + ' | ' + r[1] + ' | ' + (String(r[3]).trim() ? String(r[3]).substr(0, 70) : '(пусто)'));
    });
  }
  const out = lines.join('\n');
  Logger.log(out);
  return out;
}


// ============================================================
// ЧАСТЬ 1. СИНХРОНИЗАЦИЯ СПИСКА УЧЕНИКОВ (лист STUDENS ECP)
// ============================================================

const SEARCH_LABEL_ROW = 1;
const SEARCH_INPUT_ROW = 2;
const SEARCH_INPUT_COL = 3;
const SEARCH_INPUT_SPAN = 3;

const RESULTS_HEADER_ROW = 3;
const RESULTS_START_ROW = 4;
const RESULTS_ROWS = 10;

const MAIN_HEADER_ROW = 15;
const MAIN_DATA_START_ROW = 16;

const TABLE_COLS = 6;
const TARGET_SHEET_NAME = 'STUDENS ECP';
const TABLE_HEADERS = ['№', 'ЖУРНАЛ', 'ГРУППА', 'ФИО УЧЕНИКА', 'WHATSAPP', 'ПРЕПОДАВАТЕЛЬ'];

const DUPLICATES_COL = 7;
const DUPLICATES_INFO_COL = 8;
const DUPLICATES_HEADER_ROW = MAIN_HEADER_ROW;
const DUPLICATES_START_ROW = MAIN_DATA_START_ROW;
const DUPLICATES_MAX = 50;


function updateStudentsList() {

  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) {
    Logger.log('Пропуск запуска: предыдущий updateStudentsList ещё выполняется.');
    return;
  }

  try {
    const mainSS = SpreadsheetApp.getActiveSpreadsheet();
    const cfg = getConfig_();
    const journals = getJournalsForMonth_(cfg, cfg.currentMonth);

    let targetSheet = mainSS.getSheetByName(TARGET_SHEET_NAME);
    if (!targetSheet) targetSheet = mainSS.insertSheet(TARGET_SHEET_NAME);

    ensureEnoughRows(targetSheet, DUPLICATES_HEADER_ROW + DUPLICATES_MAX + 10);
    ensureSearchUI(targetSheet);

    const students = [];
    const errors = [];
    let number = 1;

    journals.forEach(function(journal) {

      let journalSS;
      try {
        journalSS = SpreadsheetApp.openById(journal.paymentsId);
      } catch (e) {
        errors.push('Не удалось открыть журнал "' + journal.name + '": ' + e.message);
        return;
      }

      let teacher = '';
      for (let g = 1; g <= 10; g++) {
        const s = journalSS.getSheetByName('Группа ' + g);
        if (!s) continue;
        try {
          teacher = String(s.getRange('O7').getDisplayValue()).trim();
        } catch (e) {
          errors.push('Не удалось прочитать O7 в "' + journal.name + '" / Группа ' + g + ': ' + e.message);
        }
        if (teacher !== '') break;
      }

      for (let groupNumber = 1; groupNumber <= 10; groupNumber++) {
        const groupSheetName = 'Группа ' + groupNumber;
        const sheet = journalSS.getSheetByName(groupSheetName);
        if (!sheet) continue;

        try {
          const data = sheet.getRange('B14:Q29').getDisplayValues();
          for (let i = 0; i < data.length; i++) {
            const studentName = String(data[i][0]).trim();
            const whatsapp = String(data[i][15]).trim();
            if (studentName === '' && whatsapp === '') continue;
            students.push([number, journal.name, groupSheetName, studentName, whatsapp, teacher]);
            number++;
          }
        } catch (e) {
          errors.push('Ошибка в "' + journal.name + '" / ' + groupSheetName + ': ' + e.message);
        }
      }
    });

    ensureEnoughRows(targetSheet, MAIN_DATA_START_ROW + students.length + 10);
    ensureEnoughRows(targetSheet, DUPLICATES_HEADER_ROW + DUPLICATES_MAX + 10);

    const maxRows = targetSheet.getMaxRows();
    if (maxRows >= MAIN_DATA_START_ROW) {
      const clearRange = targetSheet.getRange(MAIN_DATA_START_ROW, 1, maxRows - MAIN_DATA_START_ROW + 1, TABLE_COLS);
      clearRange.clearContent();
      clearRange.setBackground(null);
    }

    targetSheet.getRange(MAIN_HEADER_ROW, 1, 1, TABLE_COLS).setValues([TABLE_HEADERS]);

    const nameCounts = {};
    students.forEach(function(row) {
      const key = String(row[3]).trim().toLowerCase();
      if (key === '') return;
      nameCounts[key] = (nameCounts[key] || 0) + 1;
    });

    if (students.length > 0) {
      targetSheet.getRange(MAIN_DATA_START_ROW, 5, students.length, 1).setNumberFormat('@');
      targetSheet.getRange(MAIN_DATA_START_ROW, 1, students.length, TABLE_COLS).setValues(students);
      for (let i = 0; i < students.length; i++) {
        const key = String(students[i][3]).trim().toLowerCase();
        if (key !== '' && nameCounts[key] > 1) {
          targetSheet.getRange(MAIN_DATA_START_ROW + i, 1, 1, TABLE_COLS).setBackground(DUPLICATE_COLOR);
        }
      }
    }

    targetSheet.getRange(MAIN_HEADER_ROW, 1, 1, TABLE_COLS)
      .setFontWeight('bold').setHorizontalAlignment('center')
      .setBackground(HEADER_COLOR).setFontColor('#FFFFFF');
    targetSheet.setFrozenRows(MAIN_HEADER_ROW);

    [50, 420, 100, 250, 170, 300, 260, 400].forEach(function(w, i) { targetSheet.setColumnWidth(i + 1, w); });

    if (students.length > 0) {
      targetSheet.getRange(MAIN_DATA_START_ROW, 1, students.length, 3).setHorizontalAlignment('center');
      targetSheet.getRange(MAIN_DATA_START_ROW, 5, students.length, 1).setHorizontalAlignment('center');
    }

    SpreadsheetApp.flush();
    writeDuplicatesList(targetSheet, students, nameCounts);
    performSearch(targetSheet);

    if (errors.length > 0) {
      let errorSheet = mainSS.getSheetByName('Ошибки синхронизации');
      if (!errorSheet) errorSheet = mainSS.insertSheet('Ошибки синхронизации');
      errorSheet.clearContents();
      errorSheet.getRange(1, 1, 1, 2).setValues([['Время', 'Ошибка']]).setFontWeight('bold');
      const now = new Date();
      errorSheet.getRange(2, 1, errors.length, 2).setValues(errors.map(function(e) { return [now, e]; }));
      errorSheet.autoResizeColumn(2);
      Logger.log('Обнаружены ошибки (' + errors.length + '): ' + errors.join(' | '));
    }

    const toastMessage = errors.length > 0
      ? 'Учеников: ' + students.length + '. Ошибок: ' + errors.length + ' (см. лист "Ошибки синхронизации")'
      : 'Список обновлён. Учеников: ' + students.length;
    try { mainSS.toast(toastMessage, 'Ученики', 5); } catch (e) {}
    Logger.log('СИНХРОНИЗАЦИЯ ЗАВЕРШЕНА. Всего учеников: ' + students.length + '. Ошибок: ' + errors.length);

  } finally {
    lock.releaseLock();
  }
}


function ensureEnoughRows(sheet, neededRows) {
  const current = sheet.getMaxRows();
  if (current < neededRows) sheet.insertRowsAfter(current, neededRows - current);
}


function writeDuplicatesList(sheet, students, nameCounts) {

  const fullBlockRange = sheet.getRange(DUPLICATES_HEADER_ROW, DUPLICATES_COL, DUPLICATES_MAX + 1, 2);
  fullBlockRange.clearContent();
  fullBlockRange.setWrap(false);
  fullBlockRange.setHorizontalAlignment('center');
  fullBlockRange.setVerticalAlignment('middle');

  sheet.getRange(DUPLICATES_HEADER_ROW, DUPLICATES_COL, 1, 2)
    .setValues([['ПОВТОРЯЮЩИЕСЯ ФИО (дубли)', 'ГДЕ ВСТРЕЧАЮТСЯ (группа — преподаватель)']])
    .setBackground(HEADER_COLOR).setFontColor('#FFFFFF').setFontWeight('bold');

  for (let i = 0; i < DUPLICATES_MAX; i++) {
    sheet.getRange(DUPLICATES_START_ROW + i, DUPLICATES_COL, 1, 2)
      .setBackground(i % 2 === 0 ? BAND_LIGHT_COLOR : BAND_WHITE_COLOR);
  }

  if (students.length === 0) return;

  const duplicateNames = [];
  const occurrencesByKey = {};
  const seen = {};

  students.forEach(function(row) {
    const key = String(row[3]).trim().toLowerCase();
    if (key === '' || nameCounts[key] <= 1) return;
    if (!seen[key]) {
      seen[key] = true;
      duplicateNames.push(String(row[3]).trim());
      occurrencesByKey[key] = [];
    }
    occurrencesByKey[key].push(row[2] + ' — ' + row[5]);
  });

  if (duplicateNames.length === 0) {
    sheet.getRange(DUPLICATES_START_ROW, DUPLICATES_COL).setValue('Дублей не найдено');
    return;
  }

  const namesToWrite = duplicateNames.slice(0, DUPLICATES_MAX);
  sheet.getRange(DUPLICATES_START_ROW, DUPLICATES_COL, namesToWrite.length, 1)
    .setValues(namesToWrite.map(function(n) { return [n]; }));
  sheet.getRange(DUPLICATES_START_ROW, DUPLICATES_INFO_COL, namesToWrite.length, 1)
    .setValues(namesToWrite.map(function(n) { return [occurrencesByKey[n.toLowerCase()].join('\n')]; }));

  if (duplicateNames.length > DUPLICATES_MAX) {
    sheet.getRange(DUPLICATES_START_ROW + DUPLICATES_MAX, DUPLICATES_COL)
      .setValue('...и ещё ' + (duplicateNames.length - DUPLICATES_MAX));
  }
}


function ensureSearchUI(sheet) {

  const currentQuery = sheet.getRange(SEARCH_INPUT_ROW, SEARCH_INPUT_COL).getValue();
  const topBlockRows = MAIN_HEADER_ROW - 1;

  const topBlockRange = sheet.getRange(1, 1, topBlockRows, TABLE_COLS);
  topBlockRange.breakApart();
  topBlockRange.clearContent();
  topBlockRange.setBackground(null);
  topBlockRange.setFontColor('#000000');
  topBlockRange.setFontWeight('normal');
  topBlockRange.setWrap(false);

  const legacyRange = sheet.getRange(1, 7, topBlockRows, 2);
  legacyRange.clearContent();
  legacyRange.setBackground(null);

  sheet.getRange(1, 1, 3, TABLE_COLS).setBackground(HEADER_COLOR).setFontColor('#FFFFFF').setFontWeight('bold');
  sheet.getRange(SEARCH_LABEL_ROW, 1).setValue('Поиск (ФИО ученика):');
  sheet.getRange(RESULTS_HEADER_ROW, 1, 1, TABLE_COLS).setValues([TABLE_HEADERS]);

  for (let r = RESULTS_START_ROW; r <= topBlockRows; r++) {
    sheet.getRange(r, 1, 1, TABLE_COLS)
      .setBackground((r - RESULTS_START_ROW) % 2 === 0 ? BAND_LIGHT_COLOR : BAND_WHITE_COLOR);
  }

  sheet.getRange(SEARCH_INPUT_ROW, SEARCH_INPUT_COL).setValue(currentQuery);

  const inputRange = sheet.getRange(SEARCH_INPUT_ROW, SEARCH_INPUT_COL, 1, SEARCH_INPUT_SPAN);
  inputRange.merge();
  inputRange.setBackground('#FFF2CC').setFontColor('#000000').setFontWeight('bold')
    .setVerticalAlignment('middle').setHorizontalAlignment('center');
}


function onEdit(e) {
  try {
    const range = e.range;
    const sheet = range.getSheet();
    const name = sheet.getName();

    // Правка листов настроек — сбрасываем кэш конфигурации
    if (name === CFG_SETTINGS || name === CFG_TEACHERS || name === CFG_JOURNALS) {
      try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (err) {}
      return;
    }

    if (name !== TARGET_SHEET_NAME) return;
    if (range.getRow() !== SEARCH_INPUT_ROW || range.getColumn() !== SEARCH_INPUT_COL) return;
    performSearch(sheet);
  } catch (err) {
    Logger.log('onEdit error: ' + err.message);
  }
}


function performSearch(sheet) {

  sheet.getRange(RESULTS_START_ROW, 1, RESULTS_ROWS, TABLE_COLS).clearContent();

  const query = String(sheet.getRange(SEARCH_INPUT_ROW, SEARCH_INPUT_COL).getValue()).trim().toLowerCase();
  if (query === '') return;

  const lastRow = sheet.getLastRow();
  if (lastRow < MAIN_DATA_START_ROW) return;

  const data = sheet.getRange(MAIN_DATA_START_ROW, 1, lastRow - MAIN_DATA_START_ROW + 1, TABLE_COLS).getValues();
  const matches = [];
  for (let i = 0; i < data.length; i++) {
    if (String(data[i][3]).toLowerCase().indexOf(query) !== -1) {
      matches.push(data[i]);
      if (matches.length >= RESULTS_ROWS) break;
    }
  }

  if (matches.length > 0) {
    const writeRange = sheet.getRange(RESULTS_START_ROW, 1, matches.length, TABLE_COLS);
    writeRange.setValues(matches);
    writeRange.setHorizontalAlignment('center').setVerticalAlignment('middle');
  } else {
    sheet.getRange(RESULTS_START_ROW, 4).setValue('Совпадений не найдено');
  }
}


// ============================================================
// ЧАСТЬ 2. ВЕБ-ДОСТУП — КАБИНЕТ ПРЕПОДАВАТЕЛЯ
// ============================================================

const STUDENTS_RANGE = 'B14:Q29';
const PAY_FIRST_ROW = 36;
const PAY_LAST_ROW = 51;
const PAY_ROWS = PAY_LAST_ROW - PAY_FIRST_ROW + 1;

const COL_NAME = 2;       // B
const COL_DISCOUNT = 3;   // C
const COL_TUITION = 4;    // D (формула)
const COL_PAID = 18;      // R
const COL_DATE = 19;      // S
const COL_RECEIPT = 20;   // T
const COL_BALANCE = 21;   // U (формула)

/** Остаток считаем сами: стоимость − оплачено (столбцу U не доверяем — формула бывает затёрта) */
function balanceOf_(tuition, paid) {
  return Math.round(parseNum_(tuition)) - Math.round(parseNum_(paid));
}
const COL_LESSONS = 22;   // V

const GROUP_PRICE_CELL = 'D4';
const GROUP_LEVEL_CELL = 'C7';

const LESSONS_PER_MONTH = 12;
const CASH_MARKERS = ['НАЛИЧНЫЕ', 'НАЛИЧНЫМИ', 'НАЛИЧКА', 'НАЛ', 'CASH', 'НАЛИЧИЕ', 'НАЛИЧНЫМ'];


/** Ссылка Google Диска → прямой адрес картинки */
function toImageUrl_(url) {
  url = String(url || '').trim();
  if (!url) return '';
  const m = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=|uc\?export=view&id=)([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (m && /drive\.google\.com/.test(url)) return 'https://lh3.googleusercontent.com/d/' + m[1];
  return url;
}

/** Открытые настройки для страницы (без паролей) */
function getPublicConfig() {
  try {
    const cfg = getConfig_();
    return { success: true, logoUrl: toImageUrl_(cfg.settings['ЛОГОТИП_URL']), currentMonth: cfg.currentMonth, secretSeconds: cfg.secretSeconds };
  } catch (e) {
    return { success: false, logoUrl: '' };
  }
}

function doGet(e) {
  // касса (этап 4): <ссылка>/exec?page=kassa — страница KassaPage.html из файла Kassa.gs
  try { if (e && e.parameter && e.parameter.page === 'kassa' && typeof kassaPage_ === 'function') return kassaPage_(); } catch (err) {}
  // приложение отметок: <ссылка>/exec?page=teacher — та же страница, но вход только для преподавателя
  try { if (e && e.parameter && e.parameter.page === 'teacher') return teacherAppPage_(); } catch (err) {}
  try { scheduleAutoMigration_(); } catch (e) {}
  try { ensureTriggers_(); } catch (e) {}
  const out = HtmlService
    .createHtmlOutputFromFile('SearchPage')
    .setTitle('Планета — журнал');
  // значок вкладки и ярлыка: логотип из НАСТРОЙКИ · ЛОГОТИП_URL, иначе файл, созданный installAppIcon
  try {
    let u = String(getConfig_().settings['ЛОГОТИП_URL'] || '').trim();
    const id = PropertiesService.getScriptProperties().getProperty('APP_ICON_ID');
    if (id) u = 'https://drive.google.com/thumbnail?id=' + id + '&sz=w256';   // файл, созданный installAppIcon — самый надёжный источник
    else if (u) u = toImageUrl_(u);
    if (u) out.setFaviconUrl(u);
  } catch (e) {}
  return out
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .addMetaTag('apple-mobile-web-app-capable', 'yes')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);   // разрешает встраивать кабинет в Google Sites / свой сайт
}

/**
 * Приложение отметок для телефона: <ссылка>/exec?page=teacher
 * Открывает ту же страницу SearchPage.html, но:
 *   — вход только для преподавателя (переключатель «Сотрудник» скрыт, кабинеты кассира и руководителя не открываются);
 *   — убрано тяжёлое оформление входа (фотофон и значки вкладки) — страница открывается заметно быстрее на мобильном интернете.
 * Правила отметок, даты, закрытие месяца — общие с журналом, ничего не дублируется.
 */
function teacherAppPage_() {
  var html = HtmlService.createHtmlOutputFromFile('SearchPage').getContent();
  html = html.replace("var APP_MODE='';", "var APP_MODE='teacher';");
  html = html.replace(/url\(data:image\/[^)]*\)/g, 'none');            // фотофон входа — 133 КБ
  html = html.replace(/<link[^>]*id="favIcon2?"[^>]*>/g, '');           // значки вкладки — 40 КБ (у приложения свой значок)
  return HtmlService.createHtmlOutput(html)
    .setTitle('Планета — отметки')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .addMetaTag('apple-mobile-web-app-capable', 'yes')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ---------- руководитель: пользователи и доступы ----------
function getUsers(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const ll = lastLogins_();
  const teachers = cfg.teachers.map(function(t) { return { short: t.short, full: t.full, status: t.status, journalOn: t.journalOn !== false, codeSet: !!t.password, hashed: isCodeHash_(t.password), pwdChanged: t.pwdChanged || '', lastLogin: ll['teacher|' + t.short] || '' }; });
  const staff = [
    { role: 'director', title: 'Руководитель', codeSet: !!cfg.directorPassword, hashed: isCodeHash_(cfg.directorPassword), blocked: false, lastLogin: ll['director|руководитель'] || '' },
    { role: 'admin', title: 'Кассир', codeSet: !!cfg.adminPassword, hashed: isCodeHash_(cfg.adminPassword), blocked: staffBlocked_('admin'), lastLogin: ll['admin|кассир'] || ll['admin|Кассир'] || ll['admin|администратор'] || '' },
    { role: 'reception', title: 'Ресепшн (приём новых учеников)', codeSet: !!cfg.receptionPassword, hashed: isCodeHash_(cfg.receptionPassword), blocked: staffBlocked_('reception'), lastLogin: ll['reception|ресепшн'] || '' }
  ];
  return { success: true, teachers: teachers, staff: staff };
}
/** Заблокировать / разблокировать кассира или ресепшн (руководителя заблокировать нельзя) */
function setStaffBlocked(role, password, who, blocked) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  who = String(who || '');
  if (['admin', 'reception'].indexOf(who) === -1) return { success: false, error: 'Можно блокировать только кассира и ресепшн.' };
  const props = PropertiesService.getScriptProperties();
  if (blocked === true || String(blocked) === 'true') props.setProperty('BLOCK_' + who, '1'); else props.deleteProperty('BLOCK_' + who);
  logChanges_('руководитель', '', '', roleTitle_(who), [['Доступ', '', blocked === true || String(blocked) === 'true' ? 'заблокирован' : 'разблокирован']]);
  return { success: true, message: roleTitle_(who) + (blocked === true || String(blocked) === 'true' ? ': вход заблокирован. Открытые кабинеты перестанут работать при следующем запросе.' : ': вход разрешён.') };
}
/** Сменить код сотрудника (director / admin=кассир / reception) или преподавателя */
function setUserCode(role, password, who, name, newCode) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  newCode = String(newCode || '').trim();
  who = String(who || '');
  { const __e = codeRules_(who === 'teacher' ? 'teacher' : 'staff', newCode); if (__e) return { success: false, error: __e }; }
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (who === 'teacher') {
    const t = findTeacherCfg_(cfg, name); if (!t) return { success: false, error: 'Преподаватель не найден.' };
    const sh = ss.getSheetByName(CFG_TEACHERS); if (!sh) return { success: false, error: 'Лист ПРЕПОДАВАТЕЛИ не найден.' };
    let done = false;
    if (codeTaken_(cfg, newCode, 'teacher', t.short)) return { success: false, error: 'Такой код уже используется другим пользователем — выберите другой.' };
    sh.getRange(2, 2, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) { if (nameKey_(r[0]) === nameKey_(t.short)) { sh.getRange(i + 2, 4).setNumberFormat('@').setValue(codeHash_(newCode)); sh.getRange(i + 2, 11).setValue(new Date()); done = true; } });
    if (!done) return { success: false, error: 'Строка преподавателя не найдена.' };
    try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
    logChanges_('руководитель', '', '', t.short, [['Код преподавателя', '', 'изменён руководителем']]);
    return { success: true, message: 'Код преподавателя ' + t.short + ' изменён. Сообщите ему новый код лично.' };
  }
  const key = who === 'admin' ? 'ПАРОЛЬ_АДМИНИСТРАТОРА' : who === 'reception' ? 'ПАРОЛЬ_РЕСЕПШН' : who === 'director' ? 'ПАРОЛЬ_РУКОВОДИТЕЛЯ' : '';
  if (!key) return { success: false, error: 'Неизвестный пользователь.' };
  if (codeTaken_(cfg, newCode, who, '')) return { success: false, error: 'Такой код уже используется — выберите другой.' };
  writeSetting_(key, codeHash_(newCode));
  logChanges_('руководитель', '', '', roleTitle_(who), [['Код доступа', '', 'изменён руководителем']]);
  return { success: true, message: 'Код «' + roleTitle_(who) + '» изменён.' + (who === 'director' ? ' При следующем входе используйте новый код.' : '') };
}

// ---------- карточка ученика: история обучения, оплат, скидок, сообщений ----------
function getStudentCard(role, password, studentName) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const name = String(studentName || '').trim(), k = studentKey_(name), nk = nameKey_(name);
  if (!k) return { success: false, error: 'Укажите ученика.' };
  const money = actual !== 'academic';
  const out = { success: true, name: name, money: money, card: null, months: [], discounts: [], prepays: [], archive: [], changes: [], messages: [] };
  if (!cfg.useDb) return out;
  // карточка
  const S = dbStudents_();
  const st = S.rows.filter(function(x) { return nameKey_(x[ST.name]) === nk; })[0];
  if (st) out.card = { id: String(st[ST.id]), wa: String(st[ST.wa] || ''), dad: String(st[ST.dad] || ''), mom: String(st[ST.mom] || ''), stu: String(st[ST.stu] || ''), status: String(st[ST.status] || ''), created: st[ST.created] instanceof Date ? Utilities.formatDate(st[ST.created], TZ, 'dd.MM.yyyy') : String(st[ST.created] || ''), by: String(st[ST.by] || ''), note: String(st[ST.note] || ''), addr: String(st[ST.addr] || ''), contract: String(st[ST.contract] || ''), parents: String(st[ST.parents] || '') };
  // история по месяцам: состав × группы × посещения
  const G = dbTable_(DB_GROUPS, DB_GROUPS_H), R = dbTable_(DB_ROSTER, DB_ROSTER_H), A = dbTable_(DB_ATT, DB_ATT_H);
  const gById = {}; G.rows.forEach(function(g) { gById[String(g[GR.id])] = g; });
  const attBy = {}; A.rows.forEach(function(a) { attBy[String(a[AT.gid]) + '|' + String(a[AT.sid])] = a; });
  R.rows.forEach(function(r) {
    if (studentKey_(r[RO.name]) !== k) return;
    const g = gById[String(r[RO.gid])]; if (!g) return;
    const a = attBy[String(r[RO.gid]) + '|' + String(r[RO.sid])];
    let was = 0, late = 0, abs = 0, held = 0; const dates = groupDates_(g), today = isoToday_();
    for (let i = 0; i < 12; i++) { const v = a ? String(a[AT.m1 + i] || '') : ''; if (v === '1') was++; else if (v === '0.5') late++; else if (v === '0') abs++; if (dates[i] && dates[i] <= today) held++; }
    const tcfg = findTeacherCfg_(cfg, g[GR.teacher]) || { short: String(g[GR.teacher]), full: '' };
    out.months.push({ month: String(g[GR.month]), teacher: tcfg.full || tcfg.short, group: 'Группа ' + g[GR.num], level: String(g[GR.level] || ''), days: String(g[GR.days] || ''), time: String(g[GR.time] || ''),
      disc: Math.round(parseNum_(r[RO.disc])), lessons: Math.round(parseNum_(r[RO.lessons])) || 12, tuition: money ? Math.round(parseNum_(r[RO.tuition])) : null, paid: money ? Math.round(parseNum_(r[RO.paid])) : null, receipt: money ? String(r[RO.receipt] || '') : '', date: String(r[RO.date] || ''),
      held: held, was: was, late: late, abs: abs, note: String(r[RO.note] || ''), sortKey: monthSortKey_(g[GR.month]) });
  });
  out.months.sort(function(a, b) { return String(b.sortKey).localeCompare(String(a.sortKey)); });
  // сводка: с какого месяца учится, сколько месяцев, всего оплачено, долг сейчас
  { const ms = out.months.slice().sort(function(a, b) { return String(a.sortKey).localeCompare(String(b.sortKey)); });
    const cur = out.months.filter(function(m) { return nameKey_(m.month) === nameKey_(cfg.currentMonth); });
    out.summary = { since: ms.length ? ms[0].month : '', monthsCount: (function() { const u = {}; ms.forEach(function(m) { u[m.month] = 1; }); return Object.keys(u).length; })(),
      totalPaid: money ? out.months.reduce(function(a, m) { return a + (m.paid || 0); }, 0) : null, totalTuition: money ? out.months.reduce(function(a, m) { return a + (m.tuition || 0); }, 0) : null,
      debtNow: money ? cur.reduce(function(a, m) { return a + Math.max(0, (m.tuition || 0) - (m.paid || 0)); }, 0) : null, currentGroups: cur.map(function(m) { return m.group + ' · ' + m.teacher; }),
      unpaidMonths: money ? out.months.filter(function(m) { return (m.tuition || 0) - (m.paid || 0) > 0 && nameKey_(m.month) !== nameKey_(cfg.currentMonth); }).map(function(m) { return m.month + ' — ' + ((m.tuition || 0) - (m.paid || 0)); }) : [] }; }
  // скидки
  try { readDiscounts_().forEach(function(e) { if (studentKey_(e.student) === k) out.discounts.push({ month: e.month, type: e.type, percent: e.percent, basis: e.basis, status: e.status, createdBy: e.createdBy, created: e.created instanceof Date ? Utilities.formatDate(e.created, TZ, 'dd.MM.yyyy') : String(e.created || ''), until: e.until || '', famName: e.famName || '', comment: e.comment || e.note || '' }); }); } catch (e) {}
  // предоплаты
  if (money) try { const sh = prepaySheet_(); if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r) { if (String(r[15] || studentKey_(r[1])) !== k) return; out.prepays.push({ id: String(r[0]), amount: Math.round(parseNum_(r[7])), used: Math.round(parseNum_(r[8])), remaining: Math.round(parseNum_(r[9])), status: String(r[10]), month: String(r[11]), receipt: String(r[5] || ''), date: r[6] instanceof Date ? Utilities.formatDate(r[6], TZ, 'dd.MM.yyyy') : String(r[6] || '') }); }); } catch (e) {}
  // архив
  try { const sh = archiveSheet_(); if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, ARCHIVE_H.length + 1).getValues().forEach(function(r) { if (studentKey_(r[6]) !== k) return; out.archive.push({ deleted: r[0] instanceof Date ? Utilities.formatDate(r[0], TZ, 'dd.MM.yyyy HH:mm') : String(r[0] || ''), by: String(r[1] || ''), month: String(r[2] || ''), teacher: String(r[3] || ''), group: String(r[4] || ''), restored: String(r[31] || '') }); }); } catch (e) {}
  // изменения (последние 60)
  try { const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Изменения'); if (sh && sh.getLastRow() >= 2) { const from = Math.max(2, sh.getLastRow() - 4000); sh.getRange(from, 1, sh.getLastRow() - from + 1, 8).getValues().forEach(function(r) { if (studentKey_(r[4]) !== k) return; const field = String(r[5] || ''); if (!money && /оплат|сумм|квитанц|предоплат|скидк/i.test(field + ' ' + r[6] + ' ' + r[7])) return; out.changes.push({ time: r[0] instanceof Date ? Utilities.formatDate(r[0], TZ, 'dd.MM.yyyy HH:mm') : String(r[0] || ''), who: String(r[1] || ''), group: String(r[2] || ''), field: field, was: String(r[6] || ''), now: String(r[7] || '') }); }); out.changes.reverse(); out.changes = out.changes.slice(0, 60); } } catch (e) {}
  // сообщения (последние 30)
  try { const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Уведомления'); if (sh && sh.getLastRow() >= 2) { const from = Math.max(2, sh.getLastRow() - 4000); sh.getRange(from, 1, sh.getLastRow() - from + 1, 9).getValues().forEach(function(r) { if (studentKey_(r[3]) !== k) return; const type = String(r[5] || ''); if (!money && /оплат|предоплат|скидк/i.test(type)) return; out.messages.push({ time: r[0] instanceof Date ? Utilities.formatDate(r[0], TZ, 'dd.MM.yyyy HH:mm') : String(r[0] || ''), type: type, status: String(r[7] || ''), text: String(r[8] || '').slice(0, 160) }); }); out.messages.reverse(); out.messages = out.messages.slice(0, 30); } } catch (e) {}
  return out;
}

/** Изменить данные ученика: ФИО, контакты, адрес, договор, родители (администратор, учебная часть, руководитель) */
function updateStudentContacts(role, password, sid, data) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  if (!cfg.useDb) return { success: false, error: 'Доступно в режиме БАЗА.' };
  data = data || {};
  const S = dbStudents_(), st = S.byId[String(sid)];
  if (!st) return { success: false, error: 'Карточка ученика не найдена.' };
  const old = { name: String(st[ST.name] || ''), wa: String(st[ST.wa] || ''), dad: String(st[ST.dad] || ''), mom: String(st[ST.mom] || ''), stu: String(st[ST.stu] || ''), addr: String(st[ST.addr] || ''), contract: String(st[ST.contract] || ''), parents: String(st[ST.parents] || '') };
  const name = String(data.name || old.name).trim().replace(/\s+/g, ' ');
  if (!name) return { success: false, error: 'ФИО не может быть пустым.' };
  const wa = String(data.wa || '').trim(); let waV = '';
  if (wa) { waV = phoneKey_(wa); if (!waV || waV.length < 11) return { success: false, error: 'WhatsApp — в формате 996XXXXXXXXX.' }; }
  const changes = [], upd = { 9: nowStamp_() };
  const set = function(col, key, val, label) { if (String(val) !== String(old[key])) { upd[col] = val; changes.push([label, old[key], String(val)]); } };
  set(ST.name, 'name', name, 'ФИО'); set(ST.wa, 'wa', waV, 'WhatsApp родителя'); set(ST.dad, 'dad', String(data.dad || '').trim(), 'Тел. папы'); set(ST.mom, 'mom', String(data.mom || '').trim(), 'Тел. мамы'); set(ST.stu, 'stu', String(data.stu || '').trim(), 'Тел. ученика');
  set(ST.addr, 'addr', String(data.addr || '').trim(), 'Адрес'); set(ST.contract, 'contract', String(data.contract || '').trim(), 'Договор'); set(ST.parents, 'parents', String(data.parents || '').trim(), 'Родители');
  if (!changes.length) return { success: true, message: 'Изменений нет.' };
  if (upd[ST.name] !== undefined) {
    if (S.rows.some(function(x) { return String(x[ST.id]) !== String(sid) && nameKey_(x[ST.name]) === nameKey_(name); })) return { success: false, error: 'Ученик с таким ФИО уже есть в базе.' };
    upd[ST.key] = nameKey_(name);
  }
  dbSetCells_(S.sh, st.rowIndex, upd);
  if (upd[ST.name] !== undefined) {
    // переименовать во всех группах и посещениях
    const R = dbTable_(DB_ROSTER, DB_ROSTER_H); R.rows.forEach(function(r) { if (String(r[RO.sid]) === String(sid)) dbSetCells_(R.sh, r.rowIndex, { 3: name, 14: nowStamp_() }); });
    const A = dbTable_(DB_ATT, DB_ATT_H); A.rows.forEach(function(a) { if (String(a[AT.sid]) === String(sid)) dbSetCells_(A.sh, a.rowIndex, { 2: name }); });
    try { const sh = discountSheet_(true); readDiscounts_().forEach(function(e) { if (studentKey_(e.student) === studentKey_(old.name)) sh.getRange(e.rowIndex, 2).setValue(name); }); } catch (e) {}
  }
  logChanges_(roleTitle_(actual), '', '', name, changes.map(function(c) { return ['Данные ученика: ' + c[0], c[1], c[2]]; }));
  return { success: true, message: 'Данные ученика сохранены: ' + changes.map(function(c) { return c[0]; }).join(', ') + '.' + (upd[ST.name] !== undefined ? ' ФИО обновлено во всех группах и посещениях.' : '') };
}

// ---------- перевод ученика между группами (руководитель, учебная часть) ----------
/** Перевести ученика в другую группу того же месяца с сохранением оплаты, скидки, отметок и контактов */
function transferStudent(role, password, month, fromTeacher, fromGroup, studentName, toTeacher, toGroup, reason) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director' && actual !== 'academic') return { success: false, error: 'Перевод учеников выполняет руководитель.' };
  if (!cfg.useDb) return { success: false, error: 'Перевод работает только в режиме БАЗА.' };
  reason = String(reason || '').trim();
  if (!reason) return { success: false, error: 'Укажите причину перевода.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const tf = findTeacherCfg_(cfg, fromTeacher) || { short: String(fromTeacher || '') }, tt = findTeacherCfg_(cfg, toTeacher) || { short: String(toTeacher || '') };
  const gf = dbGroup_(month, tf.short, fromGroup), gt = dbGroup_(month, tt.short, toGroup);
  if (!gf) return { success: false, error: 'Исходная группа не найдена.' };
  if (!gt) return { success: false, error: 'Группа назначения не найдена (' + toGroup + ', ' + tt.short + ').' };
  const gidF = String(gf.row[GR.id]), gidT = String(gt.row[GR.id]);
  if (gidF === gidT) return { success: false, error: 'Это та же группа.' };
  const lock = LockService.getScriptLock(); if (!lock.tryLock(15000)) return { success: false, error: 'База занята, повторите через минуту.' };
  try {
    const R = dbTable_(DB_ROSTER, DB_ROSTER_H);
    const rr = R.rows.filter(function(x) { return String(x[RO.gid]) === gidF && studentKey_(x[RO.name]) === studentKey_(studentName); })[0];
    if (!rr) return { success: false, error: 'Ученик «' + studentName + '» в исходной группе не найден.' };
    const sid = String(rr[RO.sid]);
    const target = R.rows.filter(function(x) { return String(x[RO.gid]) === gidT; });
    if (target.some(function(x) { return String(x[RO.sid]) === sid || studentKey_(x[RO.name]) === studentKey_(studentName); })) return { success: false, error: 'Ученик уже есть в группе назначения.' };
    const used = {}; target.forEach(function(x) { used[Number(x[RO.num])] = true; });
    let num = 1; while (used[num] && num < 16) num++;
    if (used[num]) return { success: false, error: 'В группе назначения нет свободных мест (16).' };
    const priceT = parseNum_(gt.row[GR.price]), disc = parseNum_(rr[RO.disc]), lessons = parseNum_(rr[RO.lessons]) || 12;
    const tuitionT = tuitionCalc_(priceT, disc, lessons), paid = Math.round(parseNum_(rr[RO.paid]));
    const key = gidT + '|' + sid;
    dbSetCells_(R.sh, rr.rowIndex, { 0: gidT, 2: num, 6: tuitionT, 14: nowStamp_(), 19: key });
    // посещения — переносятся по номерам занятий
    try { const A = dbTable_(DB_ATT, DB_ATT_H); const a = A.rows.filter(function(x) { return String(x[AT.gid]) === gidF && String(x[AT.sid]) === sid; })[0]; if (a) dbSetCells_(A.sh, a.rowIndex, { 0: gidT, 15: nowStamp_(), 16: key }); } catch (e) {}
    // реестр скидок: обновить группу/преподавателя активной записи
    try { const sh = discountSheet_(true); readDiscounts_().forEach(function(e) { if (e.status === DS_ACTIVE && studentKey_(e.student) === studentKey_(studentName) && nameKey_(e.month) === nameKey_(month)) sh.getRange(e.rowIndex, 4, 1, 2).setValues([[tt.short, 'Группа ' + gt.row[GR.num]]]); }); } catch (e) {}
    const fromName = 'Группа ' + gf.row[GR.num], toName = 'Группа ' + gt.row[GR.num];
    logChanges_(tf.short + ' ← ' + roleTitle_(actual), fromName, Number(rr[RO.num]), String(rr[RO.name]), [['Перевод ученика', fromName + ' (' + tf.short + ')', toName + ' (' + tt.short + ') · причина: ' + reason]]);
    logChanges_(tt.short + ' ← ' + roleTitle_(actual), toName, num, String(rr[RO.name]), [['Переведён из', fromName + ' (' + tf.short + ')', 'оплачено ' + paid + ' · скидка ' + Math.round(disc) + '% · стоимость ' + tuitionT]]);
    const priceNote = Math.round(parseNum_(gf.row[GR.price])) !== Math.round(priceT) ? ' Стоимость пересчитана по цене новой группы: ' + tuitionT + ' сом (оплачено ' + paid + ').' : '';
    return { success: true, message: 'Ученик ' + rr[RO.name] + ' переведён: ' + fromName + ' (' + tf.short + ') → ' + toName + ' (' + tt.short + '), строка ' + num + '. Оплата, скидка, отметки и контакты сохранены.' + priceNote };
  } finally { lock.releaseLock(); }
}

// ================= КНИГИ: справочник, приход, выдача, сдача выручки =================
const BK_SHEET = 'КНИГИ', BKIN_SHEET = 'КНИГИ_ПРИХОД', BKOUT_SHEET = 'КНИГИ_ВЫДАЧА', BKCASH_SHEET = 'КНИГИ_СДАЧА';
const BK_H = ['ID', 'Название', 'Уровень / примечание', 'Цена закупки', 'Цена продажи', 'Мин. остаток', 'Статус', 'Обновлено', 'Ключ'];
const BKIN_H = ['ID', 'Дата', 'Книга', 'Количество', 'Цена закупки', 'Сумма', 'Оплачено типографии', 'Кто принял', 'Примечание', 'Ключ'];
const BKOUT_H = ['ID', 'Дата', 'Ученик', 'Группа', 'Преподаватель', 'Книга', 'Количество', 'Цена продажи', 'Сумма', 'Оплата', 'Квитанция', 'Кто выдал', 'Примечание', 'Ключ'];
const BKCASH_H = ['ID', 'Дата', 'Сумма', 'Квитанция / примечание', 'Кто сдал', 'Подтверждено', 'Ключ'];
const BK = { id: 0, name: 1, level: 2, buy: 3, sell: 4, min: 5, status: 6, updated: 7, key: 8 };
const BKI = { id: 0, date: 1, book: 2, qty: 3, buy: 4, sum: 5, paid: 6, who: 7, note: 8, key: 9 };
const BKO = { id: 0, date: 1, student: 2, group: 3, teacher: 4, book: 5, qty: 6, sell: 7, sum: 8, pay: 9, receipt: 10, who: 11, note: 12, key: 13 };
const BKC = { id: 0, date: 1, sum: 2, note: 3, who: 4, ok: 5, key: 6 };
function bkSheet_() { return dbSheet_(BK_SHEET, BK_H, [80, 260, 200, 110, 110, 100, 100, 130, 160]); }
function bkInSheet_() { return dbSheet_(BKIN_SHEET, BKIN_H, [90, 100, 240, 100, 110, 110, 130, 140, 220, 160]); }
function bkOutSheet_() { return dbSheet_(BKOUT_SHEET, BKOUT_H, [90, 100, 220, 90, 160, 240, 90, 110, 110, 110, 150, 140, 200, 160]); }
function bkCashSheet_() { return dbSheet_(BKCASH_SHEET, BKCASH_H, [90, 100, 110, 260, 140, 120, 160]); }
function bkRead_(sh, H) { if (sh.getLastRow() < 2) return []; return sh.getRange(2, 1, sh.getLastRow() - 1, H.length).getValues().map(function(r, i) { r.rowIndex = i + 2; return r; }); }
function bkId_(p) { return p + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + Math.floor(Math.random() * 90 + 10); }
function bkDate_(v) { const d = String(v || '').trim(); if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d; const m = d.match(/^(\d{2})\.(\d{2})\.(\d{4})/); return m ? m[3] + '-' + m[2] + '-' + m[1] : isoToday_(); }
function bkFmt_(iso) { const m = String(iso || '').match(/^(\d{4})-(\d{2})-(\d{2})$/); return m ? m[3] + '.' + m[2] + '.' + m[1] : String(iso || ''); }
/** Остатки по книгам: приход минус выдача */
function bkStock_() {
  const out = {};
  bkRead_(bkInSheet_(), BKIN_H).forEach(function(r) { const k = nameKey_(r[BKI.book]); out[k] = (out[k] || 0) + Math.round(parseNum_(r[BKI.qty])); });
  bkRead_(bkOutSheet_(), BKOUT_H).forEach(function(r) { const k = nameKey_(r[BKO.book]); out[k] = (out[k] || 0) - Math.round(parseNum_(r[BKO.qty])); });
  return out;
}
function bkFind_(name) { const k = nameKey_(name); return bkRead_(bkSheet_(), BK_H).filter(function(r) { return nameKey_(r[BK.name]) === k; })[0] || null; }

/** Список учеников для выбора при выдаче книги (доступен и кабинету учёта книг) */
function getBooksStudents(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  if (!cfg.useDb) return { success: true, items: [] };
  const G = {}; dbGroupsOfMonth_(cfg.currentMonth).forEach(function(g) { if (String(g.row[GR.status]) !== 'скрыта') G[String(g.row[GR.id])] = g.row; });
  const out = [];
  dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
    const g = G[String(r[RO.gid])]; if (!g) return;
    const t = findTeacherCfg_(cfg, g[GR.teacher]) || { short: String(g[GR.teacher]), full: '' };
    out.push({ name: String(r[RO.name]), group: 'Группа ' + g[GR.num], teacher: t.full || t.short, level: String(g[GR.level] || '') });
  });
  out.sort(function(a, b) { return a.name.localeCompare(b.name, 'ru'); });
  return { success: true, month: cfg.currentMonth, items: out };
}
/** Кабинет ресепшн: книги без цен — остатки, выдача за период, долги, сданная выручка */
function getBooksDesk(role, password, from, to) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  const isDir = actual === 'director';
  from = bkDate_(from || isoToday_()); to = bkDate_(to || isoToday_());
  const stock = bkStock_();
  const books = bkRead_(bkSheet_(), BK_H).filter(function(r) { return String(r[BK.status] || '') !== 'скрыта' && String(r[BK.name] || '').trim(); })
    .map(function(r) { const st = stock[nameKey_(r[BK.name])] || 0; return { name: String(r[BK.name]), level: String(r[BK.level] || ''), stock: st, low: st <= (Math.round(parseNum_(r[BK.min])) || 3), sell: isDir ? Math.round(parseNum_(r[BK.sell])) : null, buy: isDir ? Math.round(parseNum_(r[BK.buy])) : null }; });
  const outs = bkRead_(bkOutSheet_(), BKOUT_H).map(function(r) { return { id: String(r[BKO.id]), date: String(r[BKO.date]), student: String(r[BKO.student]), group: String(r[BKO.group] || ''), teacher: String(r[BKO.teacher] || ''), book: String(r[BKO.book]), qty: Math.round(parseNum_(r[BKO.qty])), pay: String(r[BKO.pay] || ''), receipt: String(r[BKO.receipt] || ''), who: String(r[BKO.who] || ''), sum: isDir ? Math.round(parseNum_(r[BKO.sum])) : null }; });
  const period = outs.filter(function(x) { return x.date >= from && x.date <= to; });
  const debts = outs.filter(function(x) { return x.pay === 'долг'; });
  const cash = bkRead_(bkCashSheet_(), BKCASH_H).map(function(r) { return { id: String(r[BKC.id]), date: String(r[BKC.date]), sum: Math.round(parseNum_(r[BKC.sum])), note: String(r[BKC.note] || ''), who: String(r[BKC.who] || ''), ok: String(r[BKC.ok] || '') }; }).filter(function(x) { return x.date >= from && x.date <= to; }).reverse();
  const inc = bkRead_(bkInSheet_(), BKIN_H).filter(function(r) { const d = String(r[BKI.date]); return d >= from && d <= to; }).map(function(r) { return { id: String(r[BKI.id]), date: String(r[BKI.date]), book: String(r[BKI.book]), qty: Math.round(parseNum_(r[BKI.qty])), who: String(r[BKI.who] || ''), sum: isDir ? Math.round(parseNum_(r[BKI.sum])) : null }; }).reverse();
  return { success: true, isDirector: isDir, from: from, to: to, books: books, issued: period.reverse(), debts: debts, cash: cash, income: inc,
    totals: { issuedQty: period.reduce(function(a, x) { return a + x.qty; }, 0), issuedSum: isDir ? period.reduce(function(a, x) { return a + (x.sum || 0); }, 0) : null, debtQty: debts.reduce(function(a, x) { return a + x.qty; }, 0), stockQty: Object.keys(stock).reduce(function(a, k) { return a + Math.max(0, stock[k]); }, 0), cashSum: cash.reduce(function(a, x) { return a + x.sum; }, 0) } };
}
/** Приход книг (ресепшн вводит только количество; сумма считается по цене из справочника) */
function addBookIncome(role, password, data) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  data = data || {};
  const book = bkFind_(data.book); if (!book) return { success: false, error: 'Такой книги нет в справочнике — попросите руководителя добавить её.' };
  const qty = Math.round(parseNum_(data.qty)); if (qty <= 0) return { success: false, error: 'Укажите количество.' };
  const date = bkDate_(data.date), buy = Math.round(parseNum_(book[BK.buy]));
  bkInSheet_().appendRow([bkId_('ПР-'), date, String(book[BK.name]), qty, buy, buy * qty, '', roleTitle_(actual), String(data.note || '').trim(), nameKey_(book[BK.name])]);
  logChanges_(roleTitle_(actual), '', '', '(книги)', [['Приход книг', '', String(book[BK.name]) + ' · ' + qty + ' шт · ' + bkFmt_(date)]]);
  return { success: true, message: 'Принято: ' + book[BK.name] + ' — ' + qty + ' шт.' };
}
/** Выдача книги ученику. Ресепшн не видит цен: сумма считается сервером по справочнику */
function issueBook(role, password, data) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  data = data || {};
  const book = bkFind_(data.book); if (!book) return { success: false, error: 'Книга не найдена в справочнике.' };
  const qty = Math.round(parseNum_(data.qty)) || 1;
  const student = String(data.student || '').trim(); if (!student) return { success: false, error: 'Выберите ученика.' };
  const stock = (bkStock_()[nameKey_(book[BK.name])] || 0);
  if (qty > stock) return { success: false, error: 'На складе только ' + Math.max(0, stock) + ' шт «' + book[BK.name] + '». Сначала отметьте приход.' };
  const pay = ['наличные', 'квитанция', 'долг'].indexOf(String(data.pay)) === -1 ? 'наличные' : String(data.pay);
  const receipt = String(data.receipt || '').trim();
  if (pay === 'квитанция' && !receipt) return { success: false, error: 'Укажите номер квитанции.' };
  const sell = Math.round(parseNum_(book[BK.sell])), date = bkDate_(data.date);
  bkOutSheet_().appendRow([bkId_('ВЫ-'), date, student, String(data.group || ''), String(data.teacher || ''), String(book[BK.name]), qty, sell, sell * qty, pay, receipt, roleTitle_(actual), String(data.note || '').trim(), nameKey_(book[BK.name])]);
  logChanges_(roleTitle_(actual), String(data.group || ''), '', student, [['Выдана книга', '', String(book[BK.name]) + ' · ' + qty + ' шт · ' + pay + (receipt ? ' · ' + receipt : '')]]);
  return { success: true, message: 'Выдано: ' + book[BK.name] + ' × ' + qty + ' — ' + student + (pay === 'долг' ? ' (в долг)' : '') + '.' };
}
/** Отметить долг оплаченным / изменить способ оплаты */
function setBookPaid(role, password, id, pay, receipt) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  const sh = bkOutSheet_(), rows = bkRead_(sh, BKOUT_H), r = rows.filter(function(x) { return String(x[BKO.id]) === String(id); })[0];
  if (!r) return { success: false, error: 'Запись не найдена.' };
  pay = ['наличные', 'квитанция', 'долг'].indexOf(String(pay)) === -1 ? 'наличные' : String(pay);
  sh.getRange(r.rowIndex, BKO.pay + 1, 1, 2).setValues([[pay, String(receipt || '')]]);
  logChanges_(roleTitle_(actual), String(r[BKO.group] || ''), '', String(r[BKO.student]), [['Книга: оплата', String(r[BKO.pay]), pay + (receipt ? ' · ' + receipt : '')]]);
  return { success: true, message: 'Отмечено: ' + r[BKO.student] + ' — ' + r[BKO.book] + ' (' + pay + ').' };
}
/** Удалить выдачу (ошибка ввода) */
function deleteBookIssue(role, password, id, reason) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  if (!String(reason || '').trim()) return { success: false, error: 'Укажите причину.' };
  const sh = bkOutSheet_(), r = bkRead_(sh, BKOUT_H).filter(function(x) { return String(x[BKO.id]) === String(id); })[0];
  if (!r) return { success: false, error: 'Запись не найдена.' };
  sh.deleteRow(r.rowIndex);
  logChanges_(roleTitle_(actual), String(r[BKO.group] || ''), '', String(r[BKO.student]), [['Выдача книги удалена', String(r[BKO.book]) + ' · ' + r[BKO.qty] + ' шт', 'причина: ' + String(reason).trim()]]);
  return { success: true, message: 'Запись удалена, книга вернулась на склад.' };
}
/** Ресепшн сдаёт выручку: сумма и номер квитанции/чека */
function addBookCash(role, password, data) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  data = data || {};
  const sum = Math.round(parseNum_(data.sum)); if (sum <= 0) return { success: false, error: 'Укажите сумму.' };
  bkCashSheet_().appendRow([bkId_('СД-'), bkDate_(data.date), sum, String(data.note || '').trim(), roleTitle_(actual), '', '']);
  logChanges_(roleTitle_(actual), '', '', '(книги)', [['Сдана выручка за книги', '', sum + ' сом · ' + (String(data.note || '').trim() || 'без примечания')]]);
  return { success: true, message: 'Записано: сдано ' + sum + ' сом.' };
}
/** Справочник книг с ценами (только руководитель) */
function getBooksCatalog(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const stock = bkStock_();
  return { success: true, items: bkRead_(bkSheet_(), BK_H).filter(function(r) { return String(r[BK.name] || '').trim(); }).map(function(r) { return { id: String(r[BK.id]), name: String(r[BK.name]), level: String(r[BK.level] || ''), buy: Math.round(parseNum_(r[BK.buy])), sell: Math.round(parseNum_(r[BK.sell])), min: Math.round(parseNum_(r[BK.min])) || 3, status: String(r[BK.status] || ''), stock: stock[nameKey_(r[BK.name])] || 0 }; }) };
}
function saveBook(role, password, data) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  data = data || {};
  const name = String(data.name || '').trim(); if (!name) return { success: false, error: 'Укажите название книги.' };
  const sh = bkSheet_(), rows = bkRead_(sh, BK_H);
  const ex = data.id ? rows.filter(function(r) { return String(r[BK.id]) === String(data.id); })[0] : rows.filter(function(r) { return nameKey_(r[BK.name]) === nameKey_(name); })[0];
  const row = [ex ? String(ex[BK.id]) : bkId_('КН-'), name, String(data.level || '').trim(), Math.round(parseNum_(data.buy)), Math.round(parseNum_(data.sell)), Math.round(parseNum_(data.min)) || 3, String(data.status || '') === 'скрыта' ? 'скрыта' : '', nowStamp_(), nameKey_(name)];
  if (ex) sh.getRange(ex.rowIndex, 1, 1, BK_H.length).setValues([row]); else sh.appendRow(row);
  logChanges_('руководитель', '', '', '(книги)', [['Справочник книг', ex ? String(ex[BK.name]) + ': ' + ex[BK.buy] + '/' + ex[BK.sell] : '', name + ': закупка ' + row[BK.buy] + ' · продажа ' + row[BK.sell]]]);
  return { success: true, message: 'Сохранено: ' + name + ' (закупка ' + row[BK.buy] + ', продажа ' + row[BK.sell] + ').' };
}
/** Отчёт по книгам (только руководитель) */
function getBooksReport(role, password, from, to) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  from = bkDate_(from || (isoToday_().slice(0, 8) + '01')); to = bkDate_(to || isoToday_());
  const cat = {}; bkRead_(bkSheet_(), BK_H).forEach(function(r) { if (String(r[BK.name] || '').trim()) cat[nameKey_(r[BK.name])] = { name: String(r[BK.name]), buy: Math.round(parseNum_(r[BK.buy])), sell: Math.round(parseNum_(r[BK.sell])), inQty: 0, inSum: 0, outQty: 0, outSum: 0 }; });
  const inRows = bkRead_(bkInSheet_(), BKIN_H).filter(function(r) { const d = String(r[BKI.date]); return d >= from && d <= to; });
  const outRows = bkRead_(bkOutSheet_(), BKOUT_H).filter(function(r) { const d = String(r[BKO.date]); return d >= from && d <= to; });
  inRows.forEach(function(r) { const c = cat[nameKey_(r[BKI.book])]; if (!c) return; c.inQty += Math.round(parseNum_(r[BKI.qty])); c.inSum += Math.round(parseNum_(r[BKI.sum])); });
  outRows.forEach(function(r) { const c = cat[nameKey_(r[BKO.book])]; if (!c) return; c.outQty += Math.round(parseNum_(r[BKO.qty])); c.outSum += Math.round(parseNum_(r[BKO.sum])); });
  const stock = bkStock_();
  const items = Object.keys(cat).map(function(k) { const c = cat[k]; c.stock = stock[k] || 0; c.stockSum = c.stock * c.buy; c.profit = c.outSum - c.outQty * c.buy; return c; }).filter(function(c) { return c.inQty || c.outQty || c.stock; });
  const cash = bkRead_(bkCashSheet_(), BKCASH_H).filter(function(r) { const d = String(r[BKC.date]); return d >= from && d <= to; }).map(function(r) { return { id: String(r[BKC.id]), date: String(r[BKC.date]), sum: Math.round(parseNum_(r[BKC.sum])), note: String(r[BKC.note] || ''), who: String(r[BKC.who] || '') }; }).reverse();
  const debts = bkRead_(bkOutSheet_(), BKOUT_H).filter(function(r) { return String(r[BKO.pay]) === 'долг'; }).map(function(r) { return { id: String(r[BKO.id]), date: String(r[BKO.date]), student: String(r[BKO.student]), group: String(r[BKO.group] || ''), book: String(r[BKO.book]), qty: Math.round(parseNum_(r[BKO.qty])), sum: Math.round(parseNum_(r[BKO.sum])) }; });
  const soldCash = outRows.filter(function(r) { return String(r[BKO.pay]) !== 'долг'; }).reduce(function(a, r) { return a + Math.round(parseNum_(r[BKO.sum])); }, 0);
  const cashSum = cash.reduce(function(a, x) { return a + x.sum; }, 0);
  return { success: true, from: from, to: to, items: items, cash: cash, debts: debts,
    totals: { inQty: items.reduce(function(a, c) { return a + c.inQty; }, 0), inSum: items.reduce(function(a, c) { return a + c.inSum; }, 0), outQty: items.reduce(function(a, c) { return a + c.outQty; }, 0), outSum: items.reduce(function(a, c) { return a + c.outSum; }, 0), stockQty: items.reduce(function(a, c) { return a + Math.max(0, c.stock); }, 0), stockSum: items.reduce(function(a, c) { return a + Math.max(0, c.stockSum); }, 0), profit: items.reduce(function(a, c) { return a + c.profit; }, 0), soldCash: soldCash, cashSum: cashSum, diff: soldCash - cashSum, debtSum: debts.reduce(function(a, x) { return a + x.sum; }, 0) } };
}

// ---------- сотрудники: личные данные (только руководитель) ----------
const STAFF_SHEET = 'СОТРУДНИКИ';
const STAFF_H = ['ID', 'ФИО', 'Должность', 'Краткое имя (как в ПРЕПОДАВАТЕЛИ)', 'Дата рождения', 'Телефон', 'WhatsApp', 'Паспорт (серия, номер)', 'Кем выдан', 'Дата выдачи', 'ИНН', 'Адрес', 'Дата приёма', 'Дата увольнения', 'Статус', 'Оплата труда', 'Образование', 'Примечание', 'Обновлено', 'Ключ'];
const SF = { id: 0, name: 1, pos: 2, short: 3, birth: 4, phone: 5, wa: 6, passport: 7, issuedBy: 8, issued: 9, inn: 10, addr: 11, hired: 12, fired: 13, status: 14, pay: 15, edu: 16, note: 17, updated: 18, key: 19 };
function staffSheet_() { return dbSheet_(STAFF_SHEET, STAFF_H, [80, 240, 160, 150, 110, 120, 120, 150, 200, 110, 130, 220, 110, 110, 100, 140, 200, 220, 130, 200]); }
function fmtD_(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'dd.MM.yyyy') : String(v || '').trim(); }
function readStaff_() {
  const sh = staffSheet_(); if (sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, STAFF_H.length).getValues().map(function(r, i) {
    if (!String(r[SF.name] || '').trim()) return null;
    return { rowIndex: i + 2, id: String(r[SF.id]), name: String(r[SF.name]).trim(), pos: String(r[SF.pos] || ''), short: String(r[SF.short] || ''), birth: fmtD_(r[SF.birth]), phone: String(r[SF.phone] || ''), wa: String(r[SF.wa] || ''), passport: String(r[SF.passport] || ''), issuedBy: String(r[SF.issuedBy] || ''), issued: fmtD_(r[SF.issued]), inn: String(r[SF.inn] || ''), addr: String(r[SF.addr] || ''), hired: fmtD_(r[SF.hired]), fired: fmtD_(r[SF.fired]), status: String(r[SF.status] || 'работает'), pay: String(r[SF.pay] || ''), edu: String(r[SF.edu] || ''), note: String(r[SF.note] || ''), updated: fmtD_(r[SF.updated]) };
  }).filter(Boolean);
}
function getStaff(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const items = readStaff_();
  // преподаватели из ПРЕПОДАВАТЕЛИ, которых ещё нет в карточках — предложить завести
  const known = {}; items.forEach(function(x) { if (x.short) known[nameKey_(x.short)] = 1; known[nameKey_(x.name)] = 1; });
  const missing = cfg.teachers.filter(function(t) { return !known[nameKey_(t.short)] && !known[nameKey_(t.full)]; }).map(function(t) { return { short: t.short, full: t.full, phone: t.phone, whatsapp: t.whatsapp }; });
  // дни рождения в ближайшие 14 дней
  const today = new Date(), soon = [];
  items.forEach(function(x) { const m = String(x.birth).match(/^(\d{2})\.(\d{2})\.(\d{4})$/); if (!m || x.status === 'уволен') return; let d = new Date(today.getFullYear(), Number(m[2]) - 1, Number(m[1])); if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) d = new Date(today.getFullYear() + 1, Number(m[2]) - 1, Number(m[1])); const days = Math.round((d - new Date(today.getFullYear(), today.getMonth(), today.getDate())) / 86400000); if (days <= 14) soon.push({ name: x.name, date: m[1] + '.' + m[2], days: days, age: d.getFullYear() - Number(m[3]) }); });
  soon.sort(function(a, b) { return a.days - b.days; });
  return { success: true, items: items, missing: missing, birthdays: soon };
}
function saveStaff(role, password, data) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  data = data || {};
  const name = String(data.name || '').trim().replace(/\s+/g, ' ');
  if (!name) return { success: false, error: 'Укажите ФИО сотрудника.' };
  const chkD = function(v, label) { v = String(v || '').trim(); if (!v) return ''; let m = v.match(/^(\d{2})[.\/-](\d{2})[.\/-](\d{4})$/) || v.match(/^(\d{2})(\d{2})(\d{4})$/); if (m) return m[1] + '.' + m[2] + '.' + m[3]; m = v.match(/^(\d{4})-(\d{2})-(\d{2})$/); if (m) return m[3] + '.' + m[2] + '.' + m[1]; throw new Error(label + ': дата в формате ДД.ММ.ГГГГ'); };
  let birth, issued, hired, fired;
  try { birth = chkD(data.birth, 'Дата рождения'); issued = chkD(data.issued, 'Дата выдачи'); hired = chkD(data.hired, 'Дата приёма'); fired = chkD(data.fired, 'Дата увольнения'); } catch (e) { return { success: false, error: e.message }; }
  const sh = staffSheet_(), list = readStaff_();
  const status = fired ? 'уволен' : (String(data.status || 'работает').trim() || 'работает');
  const row = ['', name, String(data.pos || '').trim(), String(data.short || '').trim(), birth, String(data.phone || '').trim(), phoneKey_(data.wa || '') || String(data.wa || '').trim(), String(data.passport || '').trim(), String(data.issuedBy || '').trim(), issued, String(data.inn || '').trim(), String(data.addr || '').trim(), hired, fired, status, String(data.pay || '').trim(), String(data.edu || '').trim(), String(data.note || '').trim(), nowStamp_(), nameKey_(name)];
  const ex = data.id ? list.filter(function(x) { return x.id === String(data.id); })[0] : null;
  if (!ex && list.some(function(x) { return nameKey_(x.name) === nameKey_(name); })) return { success: false, error: 'Сотрудник с таким ФИО уже есть.' };
  if (ex) { row[SF.id] = ex.id; sh.getRange(ex.rowIndex, 1, 1, STAFF_H.length).setNumberFormat('@').setValues([row]); logChanges_('руководитель', '', '', name, [['Карточка сотрудника', '', 'изменена']]); return { success: true, id: ex.id, message: 'Данные сотрудника ' + name + ' сохранены.' }; }
  const id = 'С-' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss'); row[SF.id] = id;
  sh.appendRow(row); sh.getRange(sh.getLastRow(), 1, 1, STAFF_H.length).setNumberFormat('@');
  logChanges_('руководитель', '', '', name, [['Карточка сотрудника', '', 'создана · ' + (row[SF.pos] || 'без должности')]]);
  return { success: true, id: id, message: 'Сотрудник ' + name + ' добавлен.' };
}
function deleteStaff(role, password, id, reason) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  if (!String(reason || '').trim()) return { success: false, error: 'Укажите причину.' };
  const ex = readStaff_().filter(function(x) { return x.id === String(id); })[0];
  if (!ex) return { success: false, error: 'Карточка не найдена.' };
  staffSheet_().deleteRow(ex.rowIndex);
  logChanges_('руководитель', '', '', ex.name, [['Карточка сотрудника', ex.pos, 'удалена · ' + String(reason).trim()]]);
  return { success: true, message: 'Карточка ' + ex.name + ' удалена.' };
}

// ---------- модель распределения дохода (руководитель) ----------
const MODEL_SHEET = 'МОДЕЛЬ_РАСПРЕДЕЛЕНИЯ';
const MODEL_H = ['№', 'Статья', 'Тип', 'Значение', 'Раздел', 'Примечание'];
const MODEL_DEFAULT = [
  [1, 'ФОТ преподавателей', 'процент', 36, 'ФОТ', 'от дохода; фактически считается по коэффициентам групп'],
  [2, 'Администратор / ресепшионист', 'фикс', 30000, 'ФОТ', 'оклад в месяц'],
  [3, 'Кассир', 'фикс', 50000, 'ФОТ', 'оклад в месяц'],
  [4, 'Уборщица', 'фикс', 12000, 'ФОТ', 'оклад в месяц'],
  [5, 'НСП, соцотчисления, подоходный и прочие обязательные платежи', 'процент', 5, '', ''],
  [6, 'Благотворительность', 'процент', 2, '', ''],
  [7, 'Маркетинг', 'процент', 2, '', ''],
  [8, 'Административные расходы', 'процент', 3, '', ''],
  [9, 'Резервный фонд / развитие бизнеса', 'процент', 5, '', ''],
  [10, 'Электроэнергия + интернет', 'процент', 1.5, '', ''],
  [11, 'Чистая прибыль', 'остаток', '', '', 'считается как остаток после всех статей']
];
function modelSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(MODEL_SHEET);
  if (!sh) { sh = ss.insertSheet(MODEL_SHEET); sh.getRange(1, 1, 1, MODEL_H.length).setValues([MODEL_H]); styleConfigSheet_(sh, MODEL_H.length, [50, 320, 90, 100, 90, 300]); sh.getRange(2, 1, MODEL_DEFAULT.length, MODEL_H.length).setValues(MODEL_DEFAULT); }
  return sh;
}
function readModel_() {
  const sh = modelSheet_(); if (sh.getLastRow() < 2) return [];
  return sh.getRange(2, 1, sh.getLastRow() - 1, MODEL_H.length).getValues().filter(function(r) { return String(r[1] || '').trim(); })
    .map(function(r, i) { return { n: i + 1, name: String(r[1]).trim(), type: String(r[2] || 'процент').trim(), value: parseNum_(r[3]), section: String(r[4] || '').trim(), note: String(r[5] || '') }; });
}
/** Модель + базы месяца: начислено (план), собрано (факт), ФОТ преподавателей по коэффициентам */
function getIncomeModel(role, password, month) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const snap = loadSnapshot_(month) || { groups: [], teachers: [] };
  let acc = 0, paid = 0, n = 0, g = 0, efot = 0, ffot = 0;
  (snap.groups || []).forEach(function(x) { if (!x.n) return; g++; n += x.n; acc += x.acc || 0; paid += x.paid || 0; efot += x.efot || 0; ffot += x.ffot || 0; });
  const teachers = (snap.teachers || []).map(function(t) { return { t: t.t, tf: t.tf || t.t, acc: t.acc || 0, paid: t.paid || 0, efot: t.efot || 0, ffot: t.ffot || 0 }; });
  const groups = (snap.groups || []).filter(function(x) { return x.n; }).map(function(x) { return { t: x.t, g: x.gt || x.g, lvl: x.lvl || '', n: x.n, acc: x.acc || 0, paid: x.paid || 0, efot: x.efot || 0, ffot: x.ffot || 0, held: x.held || 0 }; });
  let staffByPos = {}; try { readStaff_().forEach(function(x) { if (x.status !== 'уволен' && x.pos) (staffByPos[nameKey_(x.pos)] = staffByPos[nameKey_(x.pos)] || []).push(x.name); }); } catch (e) {}
  const mm = monthFromName_(month), today = new Date();
  const dim = mm ? new Date(mm.y, mm.m, 0).getDate() : 30;
  const dayOf = mm ? ((today.getFullYear() === mm.y && today.getMonth() + 1 === mm.m) ? today.getDate() : (new Date(mm.y, mm.m - 1, 1) < today ? dim : 0)) : dim;
  return { success: true, month: month, rows: readModel_(), base: { acc: Math.round(acc), paid: Math.round(paid), students: n, groups: g, efot: Math.round(efot), ffot: Math.round(ffot) }, teachers: teachers, groups: groups, staffByPos: staffByPos, dayOf: dayOf, daysInMonth: dim };
}
function saveIncomeModel(role, password, rows) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  rows = Array.isArray(rows) ? rows : [];
  const clean = rows.map(function(r, i) { return [i + 1, String(r.name || '').trim(), ['процент', 'фикс', 'остаток'].indexOf(String(r.type)) === -1 ? 'процент' : String(r.type), r.type === 'остаток' ? '' : Math.round(parseNum_(r.value) * 100) / 100, String(r.section || '').trim(), String(r.note || '').trim()]; }).filter(function(r) { return r[1]; });
  if (!clean.length) return { success: false, error: 'Модель пуста.' };
  const pct = clean.filter(function(r) { return r[2] === 'процент'; }).reduce(function(a, r) { return a + r[3]; }, 0);
  if (pct > 100) return { success: false, error: 'Сумма процентных статей ' + pct + '% больше 100%.' };
  if (clean.filter(function(r) { return r[2] === 'остаток'; }).length !== 1) return { success: false, error: 'Должна быть ровно одна статья-остаток (чистая прибыль).' };
  const sh = modelSheet_();
  if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, MODEL_H.length).clearContent();
  sh.getRange(2, 1, clean.length, MODEL_H.length).setValues(clean);
  logChanges_('руководитель', '', '', '(модель распределения дохода)', [['Модель', '', clean.map(function(r) { return r[1] + ': ' + (r[2] === 'процент' ? r[3] + '%' : r[2] === 'фикс' ? r[3] : 'остаток'); }).join('; ').slice(0, 900)]]);
  return { success: true, message: 'Модель сохранена: процентных статей ' + pct + '%, прибыль — остаток.' };
}

// ---------- предупреждения преподавателю: что не заполнено в его группах ----------
function getTeacherAlerts(teacherName, password, month) {
  const cfg = getConfig_();
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;
  if (!cfg.useDb) return { success: true, items: [] };
  month = String(month || '').trim() || cfg.currentMonth;
  const t = { short: auth.teacher.name, full: auth.teacher.full }, R = dbTable_(DB_ROSTER, DB_ROSTER_H), S = dbStudents_(), rooms = getRooms_();
  let excl = {}; try { excl = exclusionsAll_(month); } catch (e) {}
  const byGid = {}; R.rows.forEach(function(r) { (byGid[String(r[RO.gid])] = byGid[String(r[RO.gid])] || []).push(r); });
  const items = [];
  dbGroupsOfMonth_(month).forEach(function(g) {
    const row = g.row; if (nameKey_(row[GR.teacher]) !== nameKey_(t.short) || String(row[GR.status]) === 'скрыта') return;
    const gname = 'Группа ' + row[GR.num], ro = byGid[String(row[GR.id])] || [];
    if (!ro.length) return;
    const level = String(row[GR.level] || ''), days = String(row[GR.days] || ''), time = String(row[GR.time] || '');
    if (!level || /не назнач|не выбран/i.test(level)) items.push({ kind: 'level', group: gname, text: gname + ': не выбран уровень — стоимость не начисляется' });
    if (!days || !time) items.push({ kind: 'sched', group: gname, text: gname + ': не заданы дни недели и время' });
    const dates = groupDates_(row).filter(Boolean).length;
    if (dates < 12) items.push({ kind: 'dates', group: gname, text: gname + ': назначено ' + dates + ' из 12 дат занятий' });
    if (!((rooms[roomKey_(month, t.short, gname)] || {}).room)) items.push({ kind: 'room', group: gname, text: gname + ': не выбран кабинет' });
    const noWa = ro.filter(function(r) { const st = S.byId[String(r[RO.sid])] || []; return !phoneKey_(st[ST.wa] || '') && !excl[nameKey_(t.short) + '|' + nameKey_(gname) + '|' + studentKey_(r[RO.name])]; }).map(function(r) { return String(r[RO.name]); });
    if (noWa.length) items.push({ kind: 'wa', group: gname, count: noWa.length, names: noWa, text: gname + ': без WhatsApp родителя — ' + noWa.length + ' ' + (noWa.length === 1 ? 'ученик' : noWa.length < 5 ? 'ученика' : 'учеников') + ' (сообщения им не уходят)' });
  });
  return { success: true, month: month, items: items };
}

// ---------- постоянные предупреждения в шапке кабинета (без WhatsApp, без уровня, общие номера) ----------
function getDataAlerts(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const snap = loadSnapshot_(cfg.currentMonth) || { groups: [] };
  let excl = {}; try { excl = exclusionsAll_(cfg.currentMonth); } catch (e) {}
  const noWa = [], noLevel = [], pc = {};
  (snap.groups || []).forEach(function(g) {
    if (!g.n) return;
    (g.st || []).forEach(function(x) {
      if (!x.n) return;
      if (!x.w && !excl[nameKey_(g.t) + '|' + nameKey_(g.g) + '|' + studentKey_(x.n)]) noWa.push({ name: x.n, teacher: g.t, teacherFull: g.tf || g.t, group: g.g, groupTitle: g.gt || g.g });
      const k = phoneKey_(x.w); if (k) (pc[k] = pc[k] || []).push(x.n + ' (' + (g.gt || g.g) + ')');
    });
    if (!g.lvl || /не назнач|не выбран/i.test(g.lvl)) noLevel.push({ teacher: g.t, teacherFull: g.tf || g.t, group: g.g, groupTitle: g.gt || g.g, n: g.n });
  });
  const shared = Object.keys(pc).filter(function(k) { return pc[k].length >= 4; }).map(function(k) { return { phone: k, count: pc[k].length, names: pc[k] }; });
  // скидки без основания (импорт, не уточнены)
  let legacy = [];
  if (actual !== 'academic') { try { legacy = readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE && e.type !== DISCOUNT_TYPES.family && e.type !== DISCOUNT_TYPES.teacher && e.type !== DISCOUNT_TYPES.orphan && e.type !== DISCOUNT_TYPES.special; }).map(function(e) { return { id: e.id, name: e.student, group: e.group, teacher: e.teacher, percent: e.percent }; }); } catch (e) {} }
  return { success: true, month: cfg.currentMonth, noWa: noWa, noLevel: noLevel, shared: shared, legacy: legacy };
}

// ---------- «Сегодня»: занятия дня для всех кабинетов ----------
function getTodayOverview(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  if (!cfg.useDb) return { success: true, items: [], note: 'Доступно в режиме БАЗА.' };
  const month = cfg.currentMonth, todayIso = isoToday_(), rooms = getRooms_();
  const A = dbTable_(DB_ATT, DB_ATT_H), R = dbTable_(DB_ROSTER, DB_ROSTER_H), S = dbStudents_();
  const attByGid = {}; A.rows.forEach(function(r) { (attByGid[String(r[AT.gid])] = attByGid[String(r[AT.gid])] || []).push(r); });
  const rosByGid = {}; R.rows.forEach(function(r) { (rosByGid[String(r[RO.gid])] = rosByGid[String(r[RO.gid])] || []).push(r); });
  const items = [];
  let payToday = 0, paySum = 0;
  dbGroupsOfMonth_(month).forEach(function(g) {
    const row = g.row; if (String(row[GR.status]) === 'скрыта') return;
    const gid = String(row[GR.id]), ro = rosByGid[gid] || [];
    if (actual === 'director') ro.forEach(function(r) { const d = String(r[RO.date] || ''); const iso = /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : (d.match(/^(\d{2})\.(\d{2})\.(\d{4})/) ? d.replace(/^(\d{2})\.(\d{2})\.(\d{4}).*$/, '$3-$2-$1') : ''); if (iso === todayIso && parseNum_(r[RO.paid]) > 0) { payToday++; paySum += Math.round(parseNum_(r[RO.paid])); } });
    const dates = groupDates_(row); const k = dates.indexOf(todayIso); if (k === -1) return;
    const tcfg = findTeacherCfg_(cfg, row[GR.teacher]) || { short: String(row[GR.teacher]), full: '' };
    const gname = 'Группа ' + row[GR.num];
    const att = attByGid[gid] || [];
    let marked = 0; att.forEach(function(a) { if (String(a[AT.m1 + k] || '') !== '') marked++; });
    const unpaid = ro.filter(function(r) { return Math.round(parseNum_(r[RO.tuition])) - Math.round(parseNum_(r[RO.paid])) > 0; }).length;
    const noWa = ro.filter(function(r) { return !phoneKey_((S.byId[String(r[RO.sid])] || [])[ST.wa] || ''); }).length;
    items.push({ teacher: tcfg.short, teacherFull: tcfg.full || tcfg.short, group: gname, title: String(row[GR.title] || gname), lesson: k + 1, time: String(row[GR.time] || ''), days: String(row[GR.days] || ''), level: String(row[GR.level] || ''),
      room: (rooms[roomKey_(month, tcfg.short, gname)] || {}).room || '', students: ro.length, marked: marked, unpaid: actual === 'academic' ? null : unpaid, noWa: noWa });
  });
  const tkey = function(t) { const m = String(t).match(/(\d{1,2})[.:](\d{2})/); return m ? Number(m[1]) * 60 + Number(m[2]) : 9999; };
  items.sort(function(a, b) { return (tkey(a.time) - tkey(b.time)) || a.teacher.localeCompare(b.teacher, 'ru'); });
  const out = { success: true, today: todayIso, month: month, items: items, nowMin: (function() { const d = new Date(); return Number(Utilities.formatDate(d, TZ, 'H')) * 60 + Number(Utilities.formatDate(d, TZ, 'm')); })() };
  if (actual === 'director') { out.payToday = payToday; out.paySum = paySum; }
  return out;
}

// ---------- руководитель: инструменты исправления ----------
/** Окно правки отметок, открытое руководителем для группы: ms до истечения или 0 */
function marksUnlockUntil_(month, teacherShort, groupName) {
  try {
    const v = Number(PropertiesService.getScriptProperties().getProperty('UNLOCK|' + roomKey_(month, teacherShort, groupName)) || 0);
    return v > Date.now() ? v : 0;
  } catch (e) { return 0; }
}
/** Разрешить преподавателю правку отметок за прошлые занятия на hours часов (0 — закрыть) */
function setMarksUnlock(role, password, month, teacherName, groupName, hours) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg = getConfig_();
  if (['director', 'academic'].indexOf(staffRole_(cfg, password)) === -1) return { success: false, error: 'Только руководитель.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const t = findTeacherCfg_(cfg, teacherName) || { short: String(teacherName || '') };
  const gname = 'Группа ' + String(groupName).replace(/\D/g, '');
  const key = 'UNLOCK|' + roomKey_(month, t.short, gname), props = PropertiesService.getScriptProperties();
  hours = Math.max(0, Math.min(168, Number(hours) || 0));
  if (!hours) { props.deleteProperty(key); logChanges_('руководитель', gname, '', '(правка отметок)', [['Окно правки отметок', 'открыто', 'закрыто']]); return { success: true, until: '', message: 'Окно правки отметок для ' + gname + ' (' + t.short + ') закрыто.' }; }
  const until = Date.now() + hours * 3600000;
  props.setProperty(key, String(until));
  logChanges_('руководитель', gname, '', '(правка отметок)', [['Окно правки отметок', '', hours + ' ч · до ' + Utilities.formatDate(new Date(until), TZ, 'dd.MM HH:mm')]]);
  return { success: true, until: Utilities.formatDate(new Date(until), TZ, 'dd.MM.yyyy HH:mm'), message: 'Преподаватель ' + t.short + ' может править отметки в ' + gname + ' за любые занятия до ' + Utilities.formatDate(new Date(until), TZ, 'dd.MM HH:mm') + '. Пусть обновит страницу (F5).' };
}
// ---------- отметки задним числом: разрешение руководителя на период (например, после отключения интернета) ----------
const MW_KEY = 'MARK_WINDOWS';
function markWindows_() {
  try { const raw = PropertiesService.getScriptProperties().getProperty(MW_KEY); const arr = raw ? JSON.parse(raw) : []; const now = Date.now();
    return (arr || []).filter(function(w) { return w && Number(w.until) > now; }); } catch (e) { return []; }
}
function markWindowsSave_(list) { PropertiesService.getScriptProperties().setProperty(MW_KEY, JSON.stringify(list || [])); }
/** Действующее окно для преподавателя и даты занятия (или null) */
function markWindowFor_(teacherShort, lessonIso) {
  if (!lessonIso) return null;
  const ws = markWindows_();
  for (let i = 0; i < ws.length; i++) { const w = ws[i];
    if (w.teachers && w.teachers.length && !w.teachers.some(function(t) { return nameKey_(t) === nameKey_(teacherShort); })) continue;
    if (lessonIso >= w.from && lessonIso <= w.to) return w; }
  return null;
}
/** Окна, действующие для преподавателя (для журнала: какие даты можно отмечать) */
function markWindowsForTeacher_(teacherShort) {
  return markWindows_().filter(function(w) { return !(w.teachers && w.teachers.length) || w.teachers.some(function(t) { return nameKey_(t) === nameKey_(teacherShort); }); })
    .map(function(w) { return { from: w.from, to: w.to, until: Utilities.formatDate(new Date(Number(w.until)), TZ, 'dd.MM HH:mm'), reason: w.reason || '' }; });
}
function mwFmt_(w) { return { id: w.id, from: w.from, to: w.to, fromD: w.from.split('-').reverse().join('.'), toD: w.to.split('-').reverse().join('.'), until: Utilities.formatDate(new Date(Number(w.until)), TZ, 'dd.MM.yyyy HH:mm'), teachers: w.teachers || [], reason: w.reason || '', by: w.by || '', at: w.at || '' }; }
function getMarkWindows(role, password) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  return { success: true, items: markWindows_().map(mwFmt_), teachers: cfg.teachers.filter(function(t) { return String(t.status || '').toLowerCase() !== 'не работает'; }).map(function(t) { return { short: t.short, full: t.full }; }) };
}
/** Открыть окно: занятия с from по to (yyyy-mm-dd), срок hours (1–168), teachers — список кратких имён или пусто (все), причина обязательна */
function setMarkWindow(role, password, from, to, hours, teachers, reason) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  from = String(from || '').trim(); to = String(to || '').trim() || from; reason = String(reason || '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to)) return { success: false, error: 'Укажите даты занятий: с какого по какое.' };
  if (to < from) return { success: false, error: 'Дата «по» раньше даты «с».' };
  if (daysBetweenIso_(from, to) > 31) return { success: false, error: 'Окно не длиннее 31 дня занятий.' };
  hours = Math.max(1, Math.min(168, Number(hours) || 0));
  if (!reason) return { success: false, error: 'Укажите причину — она запишется в «Изменения».' };
  teachers = (teachers || []).map(function(t) { return String(t || '').trim(); }).filter(Boolean);
  const bad = teachers.filter(function(t) { return !findTeacherCfg_(cfg, t); }); if (bad.length) return { success: false, error: 'Преподаватель не найден: ' + bad.join(', ') };
  const list = markWindows_(); const w = { id: Utilities.getUuid().slice(0, 8), from: from, to: to, until: Date.now() + hours * 3600000, teachers: teachers, reason: reason, by: 'руководитель', at: Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm') };
  list.push(w); markWindowsSave_(list);
  const who = teachers.length ? teachers.join(', ') : 'все преподаватели';
  logChanges_('руководитель', '', '', '(отметки задним числом)', [['Окно открыто', '', 'занятия ' + w.from.split('-').reverse().join('.') + '–' + w.to.split('-').reverse().join('.') + ' · до ' + Utilities.formatDate(new Date(w.until), TZ, 'dd.MM HH:mm') + ' · ' + who + ' · причина: ' + reason]]);
  return { success: true, item: mwFmt_(w), message: 'Открыто: занятия ' + mwFmt_(w).fromD + ' – ' + mwFmt_(w).toD + ' можно отмечать до ' + mwFmt_(w).until + ' (' + who + '). Преподавателям достаточно обновить страницу.' };
}
function closeMarkWindow(role, password, id) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const list = markWindows_(), w = list.find(function(x) { return x.id === String(id); }); if (!w) return { success: false, error: 'Окно не найдено (возможно, уже истекло).' };
  markWindowsSave_(list.filter(function(x) { return x.id !== w.id; }));
  logChanges_('руководитель', '', '', '(отметки задним числом)', [['Окно закрыто', '', 'занятия ' + w.from.split('-').reverse().join('.') + '–' + w.to.split('-').reverse().join('.')]]);
  return { success: true, message: 'Окно закрыто.' };
}

/** Список открытых окон правки */
function listMarksUnlocks(role, password) {
  const cfg = getConfig_();
  if (['director', 'academic'].indexOf(staffRole_(cfg, password)) === -1) return { success: false, error: 'Только руководитель.' };
  const all = PropertiesService.getScriptProperties().getProperties(), out = [];
  Object.keys(all).forEach(function(k) { if (k.indexOf('UNLOCK|') === 0 && Number(all[k]) > Date.now()) out.push({ key: k.slice(7), until: Utilities.formatDate(new Date(Number(all[k])), TZ, 'dd.MM HH:mm') }); });
  return { success: true, items: out };
}

/** Удалить запись предоплаты полностью (только руководитель). Неиспользованная — с исправлением реестра квитанций. */
function deletePrepaymentRecord(role, password, id, reason) {
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Удалять записи может только руководитель; кассир — аннулировать.' };
  if (!String(reason || '').trim()) return { success: false, error: 'Укажите причину.' };
  const sh = prepaySheet_();
  if (sh.getLastRow() < 2) return { success: false, error: 'Предоплата не найдена.' };
  const vals = sh.getRange(2, 1, sh.getLastRow() - 1, PREPAY_H.length).getValues();
  let ri = 0, r = null; vals.forEach(function(x, i) { if (String(x[0]) === String(id)) { ri = i + 2; r = x; } });
  if (!r) return { success: false, error: 'Предоплата не найдена.' };
  const used = Math.round(parseNum_(r[8])), amount = Math.round(parseNum_(r[7])), status = String(r[10]);
  if (used > 0) return { success: false, error: 'Предоплата уже использована на ' + used + ' сом — удалять нельзя, иначе оплата ученика «повиснет». Сначала отмените зачёт.' };
  let regNote = '';
  if (status !== PP_VOID) {
    const normalized = normalizeReceiptNumber_(r[5]);
    if (normalized && !isCashMarker_(normalized)) { try { const rs = rcptSheet_(), reg = receiptRegistry_()[normalized]; if (reg) { const total = Math.max(0, reg.total - amount), distributed = Math.max(0, Math.min(total, reg.distributed - amount)); rs.getRange(reg.rowIndex, 2).setValue(total); rs.getRange(reg.rowIndex, 7).setValue(new Date()); rs.getRange(reg.rowIndex, 9, 1, 2).setValues([[distributed, Math.max(0, total - distributed)]]); regNote = ' Сумма квитанции ' + r[5] + ' в реестре: ' + reg.total + ' → ' + total + ' сом.'; } } catch (e) {} }
  }
  sh.deleteRow(ri);
  logChanges_('руководитель', String(r[2]), '', String(r[1]), [['Предоплата удалена', amount + ' сом · ' + r[5] + ' · ' + status, String(reason).trim()]]);
  return { success: true, message: 'Запись предоплаты ' + amount + ' сом ученика ' + r[1] + ' удалена.' + regNote };
}

/** Архив удалённых учеников (для восстановления) */
function getArchivedStudents(role, password, month) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const sh = archiveSheet_(), out = [];
  if (sh.getLastRow() < 2) return { success: true, items: [] };
  const W = ARCHIVE_H.length + 1;
  if (sh.getMaxColumns() < W) sh.insertColumnsAfter(sh.getMaxColumns(), W - sh.getMaxColumns());
  const vals = sh.getRange(2, 1, sh.getLastRow() - 1, W).getValues();
  vals.forEach(function(r, i) {
    if (!String(r[6] || '')) return;
    if (month && nameKey_(r[2]) !== nameKey_(month)) return;
    const marks = []; for (let k = 0; k < 12; k++) marks.push(String(r[12 + k] || ''));
    out.push({ rowIndex: i + 2, deleted: r[0] instanceof Date ? Utilities.formatDate(r[0], TZ, 'dd.MM.yyyy HH:mm') : String(r[0] || ''), by: String(r[1] || ''), month: String(r[2] || ''), teacher: String(r[3] || ''), group: String(r[4] || ''), num: Number(r[5]) || 0, name: String(r[6]),
      wa: String(r[7] || ''), marks: marks.filter(Boolean).length, disc: Math.round(parseNum_(r[24])), paid: Math.round(parseNum_(r[26])), receipt: String(r[27] || ''), sid: String(r[29] || ''), restored: String(r[31] || '') });
  });
  out.reverse();
  return { success: true, items: out.slice(0, 300) };
}
/** Восстановить ученика из архива в ту же группу (режим БАЗА): состав, отметки, оплата */
function restoreArchivedStudent(role, password, rowIndex) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  if (!cfg.useDb) return { success: false, error: 'Восстановление работает только в режиме БАЗА.' };
  const sh = archiveSheet_(), W = ARCHIVE_H.length + 1;
  rowIndex = Number(rowIndex);
  if (!(rowIndex >= 2 && rowIndex <= sh.getLastRow())) return { success: false, error: 'Запись архива не найдена.' };
  const r = sh.getRange(rowIndex, 1, 1, W).getValues()[0];
  if (String(r[31] || '')) return { success: false, error: 'Уже восстановлен: ' + r[31] };
  const month = String(r[2]), tShort = String(r[3]), gname = String(r[4]), name = String(r[6]).trim();
  { const __c = closedErr_(month); if (__c) return __c; }
  const g = dbGroup_(month, tShort, gname);
  if (!g) return { success: false, error: 'Группа ' + gname + ' (' + tShort + ', ' + month + ') не найдена — восстановить некуда. Создайте группу и повторите.' };
  const gid = String(g.row[GR.id]);
  const ro = dbRosterOfGroup_(gid);
  if (ro.rows.some(function(x) { return studentKey_(x[RO.name]) === studentKey_(name); })) return { success: false, error: 'Ученик ' + name + ' уже есть в группе ' + gname + '.' };
  const S = dbStudents_(), stamp = nowStamp_();
  let sid = String(r[29] || '');
  let st = sid ? S.byId[sid] : null;
  if (!st) { st = S.rows.filter(function(x) { return nameKey_(x[ST.name]) === nameKey_(name); })[0]; if (st) sid = String(st[ST.id]); }
  if (!st) { sid = nextId_('У-', S.rows, ST.id); dbAppendRow_(S.sh, [sid, name, phoneKey_(r[7] || ''), String(r[8] || ''), String(r[9] || ''), String(r[10] || ''), 'учится', stamp, 'руководитель (восстановление)', stamp, '', '', '', '', nameKey_(name)]); }
  else if (st.rowIndex) dbSetCells_(S.sh, st.rowIndex, { 6: 'учится', 9: stamp });
  // свободный номер строки
  const usedNums = {}; ro.rows.forEach(function(x) { usedNums[Number(x[RO.num])] = true; });
  let num = Number(r[5]) || 0; if (!num || usedNums[num]) { num = 1; while (usedNums[num] && num < 16) num++; }
  if (usedNums[num]) return { success: false, error: 'В группе нет свободных мест (16).' };
  const disc = Math.round(parseNum_(r[24])), lessons = Math.round(parseNum_(r[25])) || 12, paid = Math.round(parseNum_(r[26]));
  const t = tuitionCalc_(g.row[GR.price], disc, lessons), key = gid + '|' + sid;
  dbAppendRow_(ro.sh, [gid, sid, num, name, disc, lessons, t, paid, String(r[27] || ''), String(r[28] || ''), '', '', '', String(r[11] || ''), stamp, key]);
  const marks = []; for (let k = 0; k < 12; k++) marks.push(String(r[12 + k] || ''));
  dbAppendRow_(dbTable_(DB_ATT, DB_ATT_H).sh, [gid, sid, name].concat(marks).concat([stamp, key]));
  sh.getRange(rowIndex, 32).setValue('восстановлен ' + stamp);
  logChanges_(tShort + ' ← руководитель', gname, num, name, [['Восстановлен из архива', '', name + ' · отметок: ' + marks.filter(Boolean).length + ' · оплачено ' + paid]]);
  return { success: true, message: 'Ученик ' + name + ' восстановлен в ' + gname + ' (' + tShort + ', ' + month + '), строка ' + num + '. Отметки и оплата возвращены.' };
}

/** Журнал изменений для кабинета руководителя (последние записи, с фильтрами) */
function getChangesLog(role, password, filter) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  filter = filter || {};
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Изменения');
  if (!sh || sh.getLastRow() < 2) return { success: true, items: [] };
  const n = Math.min(sh.getLastRow() - 1, 1500), from = sh.getLastRow() - n + 1;
  const vals = sh.getRange(from, 1, n, 8).getValues(), q = String(filter.q || '').toLowerCase(), tq = String(filter.teacher || '').toLowerCase();
  const REV = /^(Уровень группы|Дни недели|Время занятий|Кабинет|Дата занятия \d+)$/;
  const out = [];
  vals.forEach(function(r, i) {
    const teacher = String(r[1] || ''), group = String(r[2] || ''), student = String(r[4] || ''), field = String(r[5] || '');
    if (tq && teacher.toLowerCase().indexOf(tq) === -1) return;
    if (q && [group, student, field, String(r[6]), String(r[7])].join(' ').toLowerCase().indexOf(q) === -1) return;
    out.push({ rowIndex: from + i, time: r[0] instanceof Date ? Utilities.formatDate(r[0], TZ, 'dd.MM.yyyy HH:mm') : String(r[0] || ''), teacher: teacher, group: group, row: String(r[3] || ''), student: student, field: field, was: String(r[6] || ''), now: String(r[7] || ''), revertable: REV.test(field) && !/откат/.test(String(r[7])) });
  });
  out.reverse();
  return { success: true, items: out.slice(0, Number(filter.limit) || 300) };
}
/** Откат простой правки: уровень / дни / время / кабинет / дата занятия — возвращает значение «Было» (текущий месяц) */
function revertChange(role, password, rowIndex) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  if (!cfg.useDb) return { success: false, error: 'Откат работает только в режиме БАЗА.' };
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Изменения');
  rowIndex = Number(rowIndex);
  if (!sh || !(rowIndex >= 2 && rowIndex <= sh.getLastRow())) return { success: false, error: 'Запись не найдена.' };
  const r = sh.getRange(rowIndex, 1, 1, 8).getValues()[0];
  const teacher = String(r[1] || '').split(' ← ')[0].trim(), gname = 'Группа ' + String(r[2] || '').replace(/\D/g, ''), field = String(r[5] || ''), was = String(r[6] || '').trim();
  const t = findTeacherCfg_(cfg, teacher) || { short: teacher };
  const g = dbGroup_(cfg.currentMonth, t.short, gname);
  if (!g) return { success: false, error: 'Группа ' + gname + ' (' + t.short + ') не найдена в текущем месяце — откат возможен только для текущего месяца.' };
  const who = 'руководитель (откат)';
  if (field === 'Уровень группы' || field === 'Дни недели' || field === 'Время занятий') {
    const grow = g.row;
    const lv = field === 'Уровень группы' ? was : String(grow[GR.level]), dy = field === 'Дни недели' ? was : String(grow[GR.days]), tm = field === 'Время занятий' ? was : String(grow[GR.time]);
    if (!was) { const upd = {}; upd[field === 'Уровень группы' ? 5 : field === 'Дни недели' ? 6 : 7] = ''; upd[23] = nowStamp_(); dbSetCells_(g.sh, g.rowIndex, upd); logChanges_(t.short + ' ← ' + who, gname, '', '(откат)', [[field, String(grow[field === 'Уровень группы' ? GR.level : field === 'Дни недели' ? GR.days : GR.time]), '(пусто) · откат']]); return { success: true, message: field + ' очищено (откат).' }; }
    const res = applyGroupSettingsDb_(cfg, g, lv, tm, dy, who, t.short);
    if (!res.success) return res;
    return { success: true, message: 'Откат выполнен: ' + field + ' → ' + was + '.' };
  }
  const dm = field.match(/^Дата занятия (\d+)$/);
  if (dm) {
    const n = Number(dm[1]);
    let iso = '';
    const m1 = was.match(/(\d{2})\.(\d{2})\.(\d{4})/), m2 = was.match(/(\d{4})-(\d{2})-(\d{2})/);
    if (m1) iso = m1[3] + '-' + m1[2] + '-' + m1[1]; else if (m2) iso = was.slice(0, 10);
    const before = String(g.row[GR.d1 + n - 1] || '');
    writeLessonDateDb_(g, n, iso);
    logChanges_(t.short + ' ← ' + who, gname, '', '(дата занятия ' + n + ')', [['Дата занятия ' + n, before, (iso || '(пусто)') + ' · откат']]);
    return { success: true, message: 'Откат выполнен: дата занятия ' + n + ' → ' + (iso ? iso.split('-').reverse().join('.') : 'пусто') + '.' };
  }
  if (field === 'Кабинет') {
    const rc = setRoomChecked_(cfg, cfg.currentMonth, t.short, gname, was, String(g.row[GR.days] || ''), String(g.row[GR.time] || ''));
    if (rc && rc.error) return { success: false, error: rc.error };
    logChanges_(t.short + ' ← ' + who, gname, '', '(откат)', [['Кабинет', String(r[7] || ''), (was || '(пусто)') + ' · откат']]);
    return { success: true, message: 'Откат выполнен: кабинет → ' + (was || 'не выбран') + '.' };
  }
  return { success: false, error: 'Для поля «' + field + '» автоматический откат не предусмотрен — исправьте вручную.' };
}

/** Резервные копии базы: создание, список, восстановление (только руководитель) */
const BACKUP_SHEETS = ['ГРУППЫ', 'СОСТАВ', 'ПОСЕЩЕНИЯ', 'УЧЕНИКИ', 'СКИДКИ', 'ПРЕДОПЛАТЫ', 'КВИТАНЦИИ', 'ЗАПРОСЫ', 'КАБИНЕТЫ', 'РЕЖИМЫ_УВЕДОМЛЕНИЙ', 'РЕЖИМЫ_НАПОМИНАНИЙ', 'АРХИВ_УЧЕНИКОВ', 'НАСТРОЙКИ', 'ПРЕПОДАВАТЕЛИ', 'СООБЩЕНИЯ', 'ПРАЙС', 'ЖУРНАЛЫ', 'МОДЕЛЬ_РАСПРЕДЕЛЕНИЯ', 'СОТРУДНИКИ', 'КНИГИ', 'КНИГИ_ПРИХОД', 'КНИГИ_ВЫДАЧА', 'КНИГИ_СДАЧА'];
function backupsList_() { try { return JSON.parse(PropertiesService.getScriptProperties().getProperty('BACKUPS') || '[]'); } catch (e) { return []; } }
function createBackup(role, password, label) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH:mm');
  const title = 'PLANETA БАЗА — резерв ' + stamp + (label ? ' · ' + String(label).trim().slice(0, 60) : '');
  const nss = SpreadsheetApp.create(title);
  let copied = 0;
  BACKUP_SHEETS.forEach(function(name) {
    const sh = ss.getSheetByName(name); if (!sh) return;
    const c = sh.copyTo(nss); c.setName(name); copied++;
  });
  try { const d = nss.getSheets()[0]; if (d.getName() !== BACKUP_SHEETS[0] && BACKUP_SHEETS.indexOf(d.getName()) === -1) nss.deleteSheet(d); } catch (e) {}
  const list = backupsList_(); list.unshift({ id: nss.getId(), url: nss.getUrl(), date: stamp, label: String(label || '').trim(), sheets: copied });
  PropertiesService.getScriptProperties().setProperty('BACKUPS', JSON.stringify(list.slice(0, 30)));
  logChanges_('руководитель', '', '', '(резервная копия)', [['Резервная копия', '', title + ' · листов: ' + copied]]);
  return { success: true, url: nss.getUrl(), message: 'Резервная копия создана: ' + title + ' (листов: ' + copied + ').' };
}
function listDbBackups(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  return { success: true, items: backupsList_() };
}
/** Восстановить листы из резервной копии (перед этим автоматически создаётся копия текущего состояния) */
function restoreBackup(role, password, id, sheetNames) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  let src; try { src = SpreadsheetApp.openById(String(id)); } catch (e) { return { success: false, error: 'Копия недоступна: ' + e.message }; }
  const pre = createBackup(role, password, 'авто перед восстановлением');
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const names = (Array.isArray(sheetNames) && sheetNames.length) ? sheetNames : BACKUP_SHEETS;
  const done = [], skipped = [];
  const lock = LockService.getScriptLock(); if (!lock.tryLock(15000)) return { success: false, error: 'База занята, повторите через минуту.' };
  try {
    names.forEach(function(name) {
      const from = src.getSheetByName(name); if (!from) { skipped.push(name); return; }
      let to = ss.getSheetByName(name); if (!to) to = ss.insertSheet(name);
      const vals = from.getDataRange().getValues();
      to.clearContents();
      if (vals.length && vals[0].length) to.getRange(1, 1, vals.length, vals[0].length).setValues(vals);
      done.push(name);
    });
  } finally { lock.releaseLock(); }
  try { CacheService.getScriptCache().removeAll(['rooms', 'nmodes', 'rmodes', CONFIG_CACHE_KEY]); } catch (e) {}
  logChanges_('руководитель', '', '', '(восстановление из копии)', [['Восстановление', String(id), 'листы: ' + done.join(', ')]]);
  return { success: true, message: 'Восстановлено листов: ' + done.length + (skipped.length ? ' · нет в копии: ' + skipped.join(', ') : '') + '. Перед этим сохранена копия текущего состояния.' + (pre.url ? ' ' + pre.url : '') };
}

// ---------- удаление ошибочной оплаты (администратор) с уведомлением руководителю ----------
function deletePayment(role, password, month, teacherName, groupName, paymentRow, reason) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  if (actual === 'academic') return ACADEMIC_DENY;
  if (!cfg.useDb) return { success: false, error: 'Доступно в режиме БАЗА.' };
  reason = String(reason || '').trim();
  if (!reason) return { success: false, error: 'Укажите причину удаления оплаты.' };
  const c = staffCtxDb_(password, month, teacherName, groupName, role);
  if (c.error) return c.error;
  const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
  if (!r) return { success: false, error: 'В этой строке нет ученика.' };
  const old = { paid: Math.round(parseNum_(r[RO.paid])), receipt: String(r[RO.receipt] || ''), date: String(r[RO.date] || ''), student: String(r[RO.name]) };
  if (!old.paid && !old.receipt) return { success: false, error: 'В этой строке нет оплаты.' };
  const res = savePaymentRow(password, c.month, c.teacher.short, c.groupName, paymentRow, { paid: 0, receipt: '', date: '' });
  if (!res || !res.success) return { success: false, error: (res && res.error) || 'Не удалось очистить оплату.' };
  // если по этой квитанции больше ничего не зачтено — её сумма в реестре обнуляется, иначе она повиснет «остатком»
  try {
    const k = normalizeReceiptNumber_(old.receipt);
    if (k && !isCashMarker_(k)) {
      const rs = rcptSheet_(), reg = receiptRegistry_()[k];
      if (reg && reg.distributed <= 0) { rs.getRange(reg.rowIndex, 2).setValue(0); rcptSetDistributed_(rs, reg, 0); }
    }
  } catch (e) {}
  const who = roleTitle_(actual);
  logChanges_(c.teacher.short + ' ← ' + who, c.groupName, Number(paymentRow), old.student, [['Оплата удалена', old.paid + ' сом · ' + (old.receipt || 'без квитанции') + (old.date ? ' · ' + old.date : ''), 'причина: ' + reason]]);
  if (actual !== 'director') createRequest_('удаление_оплаты', who, c.month, c.groupName, Number(paymentRow), old.student + ' · ' + old.paid + ' сом · ' + (old.receipt || 'без квитанции') + (old.date ? ' · ' + old.date : ''), 'удалена · ' + reason, JSON.stringify({ teacher: c.teacher.short, group: c.groupName, row: Number(paymentRow), month: c.month, paid: old.paid, receipt: old.receipt, date: old.date, student: old.student, reason: reason }));
  return { success: true, message: 'Оплата ' + old.paid + ' сом (' + old.student + ') удалена: сумма, квитанция и дата очищены.' + (actual !== 'director' ? ' Руководитель получит уведомление и подтвердит удаление или вернёт оплату.' : '') };
}

// ---------- руководитель: панель «Ученики и группы» ----------
/** Все группы месяца с показателями для управления: ученики, даты, отметки, оплаты */
function getGroupsAdmin(role, password, month) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  if (!cfg.useDb) return { success: false, error: 'Доступно в режиме БАЗА.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H), A = dbTable_(DB_ATT, DB_ATT_H), rooms = getRooms_();
  const ros = {}, att = {};
  R.rows.forEach(function(r) { (ros[String(r[RO.gid])] = ros[String(r[RO.gid])] || []).push(r); });
  A.rows.forEach(function(a) { (att[String(a[AT.gid])] = att[String(a[AT.gid])] || []).push(a); });
  const items = dbGroupsOfMonth_(month).map(function(g) {
    const row = g.row, gid = String(row[GR.id]), rr = ros[gid] || [], aa = att[gid] || [];
    let marks = 0; aa.forEach(function(a) { for (let k = 0; k < 12; k++) if (String(a[AT.m1 + k] || '') !== '') marks++; });
    const tcfg = findTeacherCfg_(cfg, row[GR.teacher]) || { short: String(row[GR.teacher]), full: '' };
    const gname = 'Группа ' + row[GR.num];
    const txt = (String(row[GR.title]) + ' ' + String(row[GR.level])).toLowerCase();
    const S = dbStudents_();
    const students = rr.slice().sort(function(a, b) { return Number(a[RO.num]) - Number(b[RO.num]); }).map(function(r) {
      const st = S.byId[String(r[RO.sid])] || [], a = aa.filter(function(x) { return String(x[AT.sid]) === String(r[RO.sid]); })[0];
      let m = 0; if (a) for (let k = 0; k < 12; k++) if (String(a[AT.m1 + k] || '') !== '') m++;
      return { num: Number(r[RO.num]), name: String(r[RO.name]), wa: String(st[ST.wa] || ''), disc: Math.round(parseNum_(r[RO.disc])), paid: Math.round(parseNum_(r[RO.paid])), marks: m };
    });
    return { teacher: tcfg.short, teacherFull: tcfg.full || tcfg.short, group: gname, title: String(row[GR.title] || gname), level: String(row[GR.level] || ''), days: String(row[GR.days] || ''), time: String(row[GR.time] || ''), room: (rooms[roomKey_(month, tcfg.short, gname)] || {}).room || '',
      n: rr.length, dates: groupDates_(row).filter(Boolean).length, marks: marks, paid: rr.filter(function(r) { return parseNum_(r[RO.paid]) > 0; }).length, status: String(row[GR.status] || ''), test: /тест|test|проб/.test(txt), updated: String(row[GR.updated] || ''), students: students,
      price: Math.round(parseNum_(row[GR.price])),
      listPrice: (function() { const x = priceFor_(readPrices_(), row[GR.level]); return x === null ? 0 : x; })(),
      ownPrice: (function() { const o = gpriceFor_(month, tcfg.short, gname); return o ? { price: o.price, reason: o.reason, by: o.by, when: o.when } : null; })() };
  });
  return { success: true, month: month, items: items };
}
/** Очистить журнал посещений группы (все отметки месяца). Ученики, даты, оплаты остаются. */
function clearGroupAttendance(role, password, month, teacherName, groupName, reason) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  return { success: false, error: 'Очистка журнала посещений отключена по решению руководителя.' };
  const c = directorGroupCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  reason = String(reason || '').trim();
  if (!reason) return { success: false, error: 'Укажите причину.' };
  const A = dbTable_(DB_ATT, DB_ATT_H), rows = A.rows.filter(function(a) { return String(a[AT.gid]) === c.gid; });
  let cleared = 0; const snap = [];
  rows.forEach(function(a) {
    const marks = []; for (let k = 0; k < 12; k++) { const v = String(a[AT.m1 + k] || ''); if (v !== '') cleared++; marks.push(v === '' ? '·' : v === '1' ? '✓' : v === '0.5' ? '½' : v === '0' ? '✗' : v); }
    if (marks.some(function(m) { return m !== '·'; })) snap.push(String(a[AT.name]) + ': ' + marks.join(' '));
  });
  if (!cleared) return { success: false, error: 'В журнале этой группы нет отметок.' };
  const upd = {}; for (let k = 0; k < 12; k++) upd[AT.m1 + k] = ''; upd[AT.updated] = nowStamp_();
  rows.forEach(function(a) { dbSetCells_(A.sh, a.rowIndex, upd); });
  logChanges_('руководитель', c.groupName, '', '(журнал очищен)', [['Отметки посещения', 'снимок: ' + snap.join(' | ').slice(0, 4000), 'очищено ' + cleared + ' · причина: ' + reason]]);
  return { success: true, message: 'Журнал группы «' + c.groupName + '» (' + c.t.short + ') очищен: стёрто отметок — ' + cleared + '. Снимок отметок сохранён в «Изменениях».' };
}

// ---------- руководитель: удаление тестовых учеников и групп (с причиной) ----------
/** Удалить ученика из группы напрямую (руководитель, режим БАЗА). Причина обязательна, история — в АРХИВ_УЧЕНИКОВ и «Изменениях». */
function directorDeleteStudent(role, password, month, teacherName, groupName, studentName, reason) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const c = directorGroupCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  reason = String(reason || '').trim();
  if (!reason) return { success: false, error: 'Укажите причину удаления.' };
  const lock = LockService.getScriptLock(); if (!lock.tryLock(15000)) return { success: false, error: 'База занята, повторите через минуту.' };
  try {
    const req = { id: 'Р-' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss'), month: c.month, teacher: c.t.short, group: c.groupName, was: String(studentName || '').trim(), data: '{}' };
    const res = deleteStudentsBatchDb_(c.cfg, [req], 'руководитель')[req.id];
    if (!res || !res.success) return { success: false, error: (res && res.error) || 'Не удалось удалить.' };
    if (res.already) return { success: false, error: 'Ученик «' + req.was + '» в группе не найден.' };
    logChanges_('руководитель', c.groupName, '', req.was, [['Причина удаления', '', reason]]);
    return { success: true, message: 'Ученик ' + req.was + ' удалён из ' + c.groupName + ' (' + c.t.short + '). Причина записана; данные сохранены в АРХИВ_УЧЕНИКОВ — восстановить можно во вкладке «Инструменты».' };
  } finally { lock.releaseLock(); }
}
/** Удалить группу целиком вместе с учениками (руководитель). Все ученики уходят в архив, причина обязательна. */
function directorDeleteGroupForce(role, password, month, teacherName, groupName, reason, confirmPaid) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  return { success: false, error: 'Удаление групп отключено по решению руководителя. Доступен только сброс параметров группы.' };
  const c = directorGroupCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  reason = String(reason || '').trim();
  if (!reason) return { success: false, error: 'Укажите причину удаления.' };
  { const ro0 = dbRosterOfGroup_(c.gid), paidN = ro0.rows.filter(function(r) { return parseNum_(r[RO.paid]) > 0; }).length;
    if (paidN && !(confirmPaid === true || String(confirmPaid) === 'true')) return { success: false, needPaidConfirm: true, paid: paidN, error: 'В группе ' + paidN + ' учеников с оплатами. Удаление возможно только с дополнительным подтверждением «ЕСТЬ ОПЛАТЫ».' }; }
  const lock = LockService.getScriptLock(); if (!lock.tryLock(15000)) return { success: false, error: 'База занята, повторите через минуту.' };
  try {
    const ro = dbRosterOfGroup_(c.gid);
    const reqs = ro.rows.map(function(r, i) { return { id: 'Р-' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + '-' + i, month: c.month, teacher: c.t.short, group: c.groupName, was: String(r[RO.name]), data: JSON.stringify({ sid: String(r[RO.sid]) }) }; });
    let removed = 0;
    if (reqs.length) { const res = deleteStudentsBatchDb_(c.cfg, reqs, 'руководитель'); reqs.forEach(function(q) { if (res[q.id] && res[q.id].success && !res[q.id].already) removed++; }); }
    // строка группы, посещения, кабинет
    try { const A = dbTable_(DB_ATT, DB_ATT_H); A.rows.filter(function(r) { return String(r[AT.gid]) === c.gid; }).map(function(r) { return r.rowIndex; }).sort(function(a, b) { return b - a; }).forEach(function(ri) { A.sh.deleteRow(ri); }); dbInvalidate_(); } catch (e) {}
    try { const rs = roomSheet_(), key = roomKey_(c.month, c.t.short, c.groupName); if (rs.getLastRow() >= 2) rs.getRange(2, ROOM_H.length, rs.getLastRow() - 1, 1).getValues().map(function(r, i) { return String(r[0]) === key ? i + 2 : 0; }).filter(Boolean).sort(function(a, b) { return b - a; }).forEach(function(ri) { rs.deleteRow(ri); }); cacheDrop_('rooms'); } catch (e) {}
    const G = dbTable_(DB_GROUPS, DB_GROUPS_H), row = G.rows.filter(function(r) { return String(r[GR.id]) === c.gid; })[0];
    if (row) G.sh.deleteRow(row.rowIndex);
    dbInvalidate_();
    logChanges_('руководитель', c.groupName, '', '(группа удалена с учениками)', [['Группа', c.t.short + ' · ' + c.groupName + ' · ' + c.month + ' · учеников: ' + removed, 'удалена · причина: ' + reason]]);
    return { success: true, message: 'Группа «' + c.groupName + '» (' + c.t.short + ', ' + c.month + ') удалена. Учеников перенесено в архив: ' + removed + '. Причина записана в «Изменения».' };
  } finally { lock.releaseLock(); }
}

// ---------- руководитель: редактор групп (удаление пустых, сброс параметров) ----------
function directorGroupCtx_(role, password, month, teacherName, groupName) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { error: { success: false, error: 'Только руководитель может изменять группы.' } };
  if (!cfg.useDb) return { error: { success: false, error: 'Редактор групп работает только в режиме БАЗА.' } };
  month = String(month || '').trim() || cfg.currentMonth;
  const t = findTeacherCfg_(cfg, teacherName) || { short: String(teacherName || ''), full: '' };
  const g = dbGroup_(month, t.short, groupName);
  if (!g) return { error: { success: false, error: 'Группа не найдена: ' + groupName + ' (' + t.short + ', ' + month + ').' } };
  return { cfg: cfg, month: month, t: t, g: g, gid: String(g.row[GR.id]), groupName: 'Группа ' + g.row[GR.num] };
}
/** Удалить пустую группу (без учеников). Группы с учениками удалять нельзя никому. */
function directorDeleteGroup(role, password, month, teacherName, groupName) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  return { success: false, error: 'Удаление групп отключено по решению руководителя. Доступен только сброс параметров группы.' };
  const c = directorGroupCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  const ro = dbRosterOfGroup_(c.gid);
  if (ro.rows.length) return { success: false, error: 'В группе ' + ro.rows.length + ' учеников — удаление запрещено. Сначала преподаватель должен убрать учеников (через заявку), либо используйте «Сбросить параметры».' };
  const lock = LockService.getScriptLock(); if (!lock.tryLock(10000)) return { success: false, error: 'База занята, повторите через минуту.' };
  try {
    // посещения (на всякий случай — у пустой группы их быть не должно) и кабинет
    try { const A = dbTable_(DB_ATT, DB_ATT_H); A.rows.filter(function(r) { return String(r[AT.gid]) === c.gid; }).map(function(r) { return r.rowIndex; }).sort(function(a, b) { return b - a; }).forEach(function(ri) { A.sh.deleteRow(ri); }); dbInvalidate_(); } catch (e) {}
    try { const rs = roomSheet_(), key = roomKey_(c.month, c.t.short, c.groupName); if (rs.getLastRow() >= 2) rs.getRange(2, ROOM_H.length, rs.getLastRow() - 1, 1).getValues().map(function(r, i) { return String(r[0]) === key ? i + 2 : 0; }).filter(Boolean).sort(function(a, b) { return b - a; }).forEach(function(ri) { rs.deleteRow(ri); }); } catch (e) {}
    const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
    const row = G.rows.filter(function(r) { return String(r[GR.id]) === c.gid; })[0];
    if (row) G.sh.deleteRow(row.rowIndex);
    dbInvalidate_();
    logChanges_('руководитель', c.groupName, '', '(группа удалена)', [['Группа', c.t.short + ' · ' + c.groupName + ' · ' + c.month, 'удалена (пустая)']]);
    try { cacheDrop_('rooms'); } catch (e) {}
    return { success: true, message: 'Группа «' + c.groupName + '» (' + c.t.short + ', ' + c.month + ') удалена. У преподавателя она снова доступна как пустая через «+».' };
  } finally { lock.releaseLock(); }
}
/** Сбросить параметры группы к состоянию нового журнала: уровень, дни, время, цена, даты занятий, кабинет. Ученики и отметки остаются. */
function directorResetGroup(role, password, month, teacherName, groupName) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const c = directorGroupCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  const grow = c.g.row;
  const was = [String(grow[GR.level] || '—'), String(grow[GR.days] || '—'), String(grow[GR.time] || '—'), 'цена ' + (grow[GR.price] || 0), 'дат: ' + groupDates_(grow).filter(Boolean).length].join(' · ');
  const upd = { 4: 'Группа - ' + grow[GR.num], 5: '', 6: '', 7: '', 8: 0, 23: nowStamp_() };
  for (let k = 0; k < 12; k++) upd[GR.d1 + k] = '';
  dbSetCells_(c.g.sh, c.g.rowIndex, upd);
  try { recomputeGroupTuition_(c.gid, 0); } catch (e) {}
  try { const rs = roomSheet_(), key = roomKey_(c.month, c.t.short, c.groupName); if (rs.getLastRow() >= 2) rs.getRange(2, ROOM_H.length, rs.getLastRow() - 1, 1).getValues().map(function(r, i) { return String(r[0]) === key ? i + 2 : 0; }).filter(Boolean).sort(function(a, b) { return b - a; }).forEach(function(ri) { rs.deleteRow(ri); }); cacheDrop_('rooms'); } catch (e) {}
  const ro = dbRosterOfGroup_(c.gid);
  logChanges_('руководитель', c.groupName, '', '(сброс параметров группы)', [['Параметры группы', was, 'сброшены: уровень, дни, время, цена, даты занятий, кабинет' + (ro.rows.length ? ' · учеников сохранено: ' + ro.rows.length : '')]]);
  return { success: true, message: 'Параметры группы «' + c.groupName + '» (' + c.t.short + ') сброшены: уровень, дни недели, время, цена, все 12 дат занятий и кабинет — как у новой группы.' + (ro.rows.length ? ' Ученики (' + ro.rows.length + ') и их отметки сохранены; стоимость пересчитается после выбора уровня.' : '') };
}

// ---------- версия клиента и принудительное обновление открытых кабинетов ----------
/** Сборка из SearchPage.html (константа APP_BUILD), кэш 2 минуты */
function serverBuild_() {
  try {
    const c = CacheService.getScriptCache(), k = 'app_build';
    let v = c.get(k);
    if (!v) {
      const html = HtmlService.createHtmlOutputFromFile('SearchPage').getContent();
      const m = html.match(/APP_BUILD\s*=\s*'([^']+)'/);
      v = m ? m[1] : '';
      if (v) c.put(k, v, 120);
    }
    return v;
  } catch (e) { return ''; }
}
/** Единый опрос кабинета сотрудника: версия, команда обновления, метка изменений, счётчики */
function heartbeat(role, password, sinceStamp) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const st = getAppStatus();
  let stamp = 0; try { stamp = Number(PropertiesService.getScriptProperties().getProperty('DATA_STAMP') || 0); } catch (e) {}
  let pending = 0, unread = 0;
  try { const pr = getPendingRequests(role, password); pending = (pr && pr.items) ? pr.items.length : 0; } catch (e) {}
  try { const d = getDialogs(role, password); unread = (d && d.unreadTotal) || 0; } catch (e) {}
  return { success: true, build: st.build, forceTs: st.forceTs, forceMsg: st.forceMsg, url: st.url, stamp: stamp, changed: !!(Number(sinceStamp) && stamp > Number(sinceStamp)), pending: pending, unread: unread };
}
/** Лёгкий опрос клиента: текущая сборка и метка принудительного обновления */
function getAppStatus() {
  const props = PropertiesService.getScriptProperties();
  let url = ''; try { url = ScriptApp.getService().getUrl() || ''; } catch (e) {}
  return { success: true, build: serverBuild_(), forceTs: Number(props.getProperty('FORCE_RELOAD_TS') || 0), forceMsg: String(props.getProperty('FORCE_RELOAD_MSG') || ''), url: url, now: Date.now() };
}
/** Руководитель: обновить все открытые кабинеты (через минуту у всех появится уведомление и перезагрузка) */
function forceReloadAll(role, password, message) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель может обновить все кабинеты.' };
  const props = PropertiesService.getScriptProperties();
  props.setProperty('FORCE_RELOAD_TS', String(Date.now()));
  props.setProperty('FORCE_RELOAD_MSG', String(message || '').trim().slice(0, 200));
  try { CacheService.getScriptCache().remove('app_build'); } catch (e) {}
  logChanges_('руководитель', '', '', '(система)', [['Обновление кабинетов', '', 'команда всем открытым кабинетам · ' + serverBuild_()]]);
  return { success: true, build: serverBuild_(), message: 'Команда отправлена. В течение минуты все открытые кабинеты сохранят несохранённые отметки и перезагрузятся на сборку «' + serverBuild_() + '».' };
}

function isValidGroupName_(groupName) {
  return /^Группа ([1-9]|10)$/.test(String(groupName || '').trim());
}

function isValidPaymentRow_(row) {
  row = Number(row);
  return Number.isInteger(row) && row >= PAY_FIRST_ROW && row <= PAY_LAST_ROW;
}

function publicTeacher_(teacher, journal) {
  return {
    name: teacher.short,
    full: teacher.full,
    phone: teacher.phone,
    whatsapp: teacher.whatsapp,
    month: journal ? journal.month : '',
    journalId: journal ? journal.paymentsId : '',
    journalName: journal ? journal.name : '',
    journalUrl: journal ? 'https://docs.google.com/spreadsheets/d/' + journal.paymentsId + '/edit' : ''
  };
}

function readGroupStudents_(sheet) {
  const data = sheet.getRange(STUDENTS_RANGE).getDisplayValues();
  const students = [];
  for (let i = 0; i < data.length; i++) {
    const studentName = String(data[i][0]).trim();
    const whatsapp = String(data[i][15]).trim();
    if (studentName === '' && whatsapp === '') continue;
    students.push({ number: students.length + 1, name: studentName, whatsapp: whatsapp });
  }
  return students;
}

/** Видимые листы "Группа 1–10" (скрытые преподавателем группы пропускаются) */
function readJournalGroups_(journalSS) {
  const groups = [];
  for (let g = 1; g <= 10; g++) {
    const groupName = 'Группа ' + g;
    const sheet = journalSS.getSheetByName(groupName);
    if (!sheet || isHidden_(sheet)) continue;
    groups.push({ name: groupName, studentsCount: readGroupStudents_(sheet).length });
  }
  return groups;
}

function isHidden_(sheet) {
  try { return sheet.isSheetHidden(); } catch (e) { return false; }
}

/** Посещаемость: отметки E..P (12 занятий) строк 14–29 → сумма по ученику; held — сколько занятий уже прошло по датам строки 12 */
const ATT_FIRST_COL = 5;   // E
const ATT_COLS = 12;       // E..P
const ATT_DATES_ROW = 12;

function attendanceFromGrid_(vals, studentIndex) {
  let sum = 0;
  const r = 13 + studentIndex;   // строка 14+i
  for (let c = ATT_FIRST_COL - 1; c < ATT_FIRST_COL - 1 + ATT_COLS; c++) {
    const v = vals[r] ? vals[r][c] : '';
    if (v === '' || v === null) continue;
    const n = (v === true) ? 1 : parseNum_(v);
    if (n > 0) sum += n;
  }
  return Math.round(sum * 10) / 10;
}

function lessonsHeldFromGrid_(vals) {
  const row = vals[ATT_DATES_ROW - 1];
  if (!row) return 0;
  const now = new Date();
  let held = 0, dates = 0;
  for (let c = ATT_FIRST_COL - 1; c < ATT_FIRST_COL - 1 + ATT_COLS; c++) {
    const v = row[c];
    if (v instanceof Date) { dates++; if (v <= now) held++; }
  }
  return dates ? held : 0;
}


/** Проверка преподавателя БЕЗ записи в ВХОДЫ — для всех внутренних вызовов (группы, отметки, опросы страницы) */
function checkTeacher_(teacherName, password) {

  teacherName = String(teacherName || '').trim();
  password = String(password || '').trim();

  if (!teacherName) return { success: false, error: 'Выберите преподавателя.' };
  if (!password) return { success: false, error: 'Введите пароль.' };

  const cfg = getConfig_();
  const teacher = findTeacherCfg_(cfg, teacherName);
  if (!teacher) return { success: false, error: 'Преподаватель не найден.' };
  if (!codeMatches_(teacher.password, password)) return { success: false, error: 'Неверный пароль.' };
  if (teacher.journalOn === false) return { success: false, error: 'Журнал отключён руководителем. Обратитесь к руководителю.' };

  const journal = findJournal_(cfg, cfg.currentMonth, teacher.short);
  if (!journal) return { success: false, error: 'Для месяца «' + cfg.currentMonth + '» журнал не назначен (лист ЖУРНАЛЫ).' };

  return { success: true, teacher: publicTeacher_(teacher, journal) };
}

/** Вход преподавателя со страницы: проверка + одна запись в ВХОДЫ (раньше запись шла при каждом действии) */
function authenticateTeacher(teacherName, password) {
  if (authThrottled_()) return AUTH_WAIT;
  const auth = checkTeacher_(teacherName, password);
  if (auth.success) { hashUpgradeTeacher_(auth.teacher.name, password); logLogin_('teacher', auth.teacher.name); } else if (teacherName && password) authFail_();
  return auth;
}


function getTeachersList() {
  const cfg = getConfig_();
  return {
    teachers: cfg.teachers
      .filter(function(t) { return t.status.toLowerCase() !== 'не работает' && t.journalOn !== false; })
      .map(function(t) { return t.short; })
  };
}


function getTeacherJournal(teacherName, password) {
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;
  return { success: true, teacher: auth.teacher };
}


// ---------- Журнал преподавателя (NEW): группы, настройки, ученики ----------

const T_GROUP_TITLE = 'C6';
const T_LEVEL = 'C7';
const T_TIME = 'K6';
const T_DAYS = 'K7';
const T_FIRST_ROW = 14;
const T_LAST_ROW = 29;
const T_COL_NAME = 2;    // B
const T_COL_FLAG = 3;    // C — флажок уведомления (не трогаем, кроме очистки строки)
const T_COL_WA = 17;     // Q
const T_COL_DAD = 18;    // R
const T_COL_MOM = 19;    // S
const T_COL_STU = 20;    // T
const T_COL_NOTE = 21;   // U
const T_COL_SAVED = 23;  // W — служебная: когда ФИО впервые сохранено из кабинета

/**
 * Контекст преподавателя: авторизация + журнал текущего месяца.
 * Если в листе ЖУРНАЛЫ указан ID журнала посещений (NEW) — он открывается
 * и редактирование разрешено; иначе открывается платёжный журнал только для чтения.
 */
function teacherContext_(teacherName, password, groupName, month) {
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return { error: auth };

  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;
  const journal = findJournal_(cfg, month, auth.teacher.name);
  if (!journal) return { error: { success: false, error: 'Журнал за ' + month + ' не назначен.' } };

  let editable = !!journal.attendanceId;
  let note = journal.attendanceError ? 'Ошибка в листе ЖУРНАЛЫ: ' + journal.attendanceError + '.' : '';
  let ss;
  try {
    ss = SpreadsheetApp.openById(editable ? journal.attendanceId : journal.paymentsId);
  } catch (e) {
    return { error: { success: false, error: 'Не удалось открыть журнал: ' + e.message } };
  }

  if (editable) {
    let fileName = '';
    try { fileName = String(ss.getName() || ''); } catch (e) {}
    if (/PAYMENT/i.test(fileName)) {
      // в столбце D по ошибке указан платёжный журнал — редактировать запрещаем
      editable = false;
      note = 'Ошибка в листе ЖУРНАЛЫ: в столбце D указан платёжный журнал «' + fileName + '», а не журнал посещений (NEW).';
      try { ss = SpreadsheetApp.openById(journal.paymentsId); } catch (e) {}
    }
  }

  const __closed = monthClosed_(month);
  if (__closed) { editable = false; note = 'Месяц «' + __closed.month + '» закрыт руководителем ' + __closed.at + ' — журнал за него только для просмотра.'; }
  const ctx = { auth: auth, cfg: cfg, journal: journal, editable: editable, note: note, ss: ss, closedMonth: __closed, month: month };

  if (groupName !== undefined) {
    groupName = String(groupName || '').trim();
    if (!isValidGroupName_(groupName)) return { error: { success: false, error: 'Неверная группа.' } };
    const sheet = ss.getSheetByName(groupName);
    if (!sheet || isHidden_(sheet)) return { error: { success: false, error: 'Группа не найдена или скрыта.' } };
    ctx.sheet = sheet;
    ctx.groupName = groupName;
  }
  return ctx;
}

/** Варианты из выпадающего списка ячейки (проверка данных); null — списка нет */
function validationOptions_(range) {
  try {
    const dv = range.getDataValidation();
    if (!dv) return null;
    const type = dv.getCriteriaType();
    const args = dv.getCriteriaValues();
    let list = null;
    if (type === SpreadsheetApp.DataValidationCriteria.VALUE_IN_LIST) {
      list = args[0].map(function(v) { return String(v).trim(); });
    } else if (type === SpreadsheetApp.DataValidationCriteria.VALUE_IN_RANGE) {
      list = [];
      args[0].getDisplayValues().forEach(function(r) { r.forEach(function(v) { list.push(String(v).trim()); }); });
    }
    if (!list) return null;
    const seen = {}, out = [];
    list.forEach(function(v) { if (v && !seen[v]) { seen[v] = true; out.push(v); } });
    return out.length ? out : null;
  } catch (e) {
    return null;
  }
}

/**
 * Поиск ячеек шапки группы по подписям в строках 1–10:
 * «Группа», «Уровень», «Время занятий», «Дни недели», «Преподаватель».
 * Значение берётся из ячейки ПОД подписью (новый шаблон) или СПРАВА (шаблон NEW).
 * Возвращает {key: {row, col, value}} (row/col — 1-based). Если подпись не найдена —
 * используются позиции шаблона NEW (C6, C7, K6, K7, O7).
 */
const META_LABELS = { title: 'группа', level: 'уровень', time: 'времязанятий', days: 'днинедели', teacher: 'преподаватель' };
const META_DEFAULTS = { title: [6, 3], level: [7, 3], time: [6, 11], days: [7, 11], teacher: [7, 15] };

function normLabel_(v) {
  return String(v || '').toLowerCase().replace(/[\s:：.\u00A0]/g, '');
}

/** Есть ли в ячейке проверка данных (выпадающий список) — признак ячейки значения */
function hasValidation_(sheet, row, col) {
  try { return !!sheet.getRange(row, col).getDataValidation(); } catch (e) { return false; }
}

// Положение подписей в шаблоне NEW → ячейка значения
const NEW_LABEL_MAP = { '6,2': [6, 3], '7,2': [7, 3], '6,8': [6, 11], '7,8': [7, 11], '6,15': [7, 15] };

function detectMeta_(disp, sheet) {
  const labelSet = {};
  Object.keys(META_LABELS).forEach(function(k) { labelSet[META_LABELS[k]] = k; });
  const found = {};
  const maxR = Math.min(10, disp.length);
  // столбцы, в которых стоят подписи — сканирование вправо не должно их пересекать
  const labelCols = {};
  for (let r = 0; r < maxR; r++) {
    const row = disp[r] || [];
    for (let c = 0; c < row.length; c++) if (labelSet[normLabel_(row[c])]) labelCols[c] = true;
  }
  for (let r = 0; r < maxR; r++) {
    const row = disp[r] || [];
    for (let c = 0; c < row.length; c++) {
      const key = labelSet[normLabel_(row[c])];
      if (!key || found[key]) continue;
      // кандидат снизу
      const below = (disp[r + 1] || [])[c];
      const belowIsLabel = below !== undefined && labelSet[normLabel_(below)];
      if (below !== undefined && String(below).trim() !== '' && !belowIsLabel) {
        found[key] = { row: r + 2, col: c + 1, value: String(below).trim() };
        continue;
      }
      // кандидат справа (первая непустая ячейка в пределах 8 столбцов)
      let placed = false;
      for (let cc = c + 1; cc <= c + 8 && cc < row.length; cc++) {
        if (labelCols[cc]) break;
        const v = String(row[cc] || '').trim();
        if (v !== '' && !labelSet[normLabel_(v)]) { found[key] = { row: r + 1, col: cc + 1, value: v }; placed = true; break; }
      }
      if (!placed) {
        // подпись есть, значение пустое: ищем ячейку с выпадающим списком (снизу, затем справа),
        // иначе — известная раскладка шаблона NEW, иначе — снизу
        let pos = null;
        if (sheet) {
          if (!belowIsLabel && hasValidation_(sheet, r + 2, c + 1)) pos = [r + 2, c + 1];
          else {
            for (let cc = c + 1; cc <= c + 8; cc++) {
              if (labelCols[cc]) break;
              const v = String(row[cc] || '').trim();
              if (v !== '') break;
              if (hasValidation_(sheet, r + 1, cc + 1)) { pos = [r + 1, cc + 1]; break; }
            }
          }
        }
        if (!pos && NEW_LABEL_MAP[(r + 1) + ',' + (c + 1)]) pos = NEW_LABEL_MAP[(r + 1) + ',' + (c + 1)];
        if (!pos) pos = belowIsLabel ? [r + 1, c + 2] : [r + 2, c + 1];
        found[key] = { row: pos[0], col: pos[1], value: '' };
      }
    }
  }
  Object.keys(META_DEFAULTS).forEach(function(k) {
    if (!found[k]) {
      const d = META_DEFAULTS[k];
      found[k] = { row: d[0], col: d[1], value: String((disp[d[0] - 1] || [])[d[1] - 1] || '').trim() };
    }
  });
  return found;
}

function groupMetaFromGrid_(disp, g, sheet) {
  const m = detectMeta_(disp, sheet);
  return {
    title: m.title.value || ('Группа - ' + g),
    level: m.level.value,
    time: m.time.value,
    days: m.days.value,
    teacher: m.teacher.value,
    cells: { level: [m.level.row, m.level.col], time: [m.time.row, m.time.col], days: [m.days.row, m.days.col] }
  };
}

/**
 * Статус оплаты по строкам группы из платёжного журнала:
 *   balance — остаток (U), n2/n3 — отправлены ли уведомления 2 и 3 (K, O).
 *   blocked = уведомление 3 отправлено и остаток > 0 → «не допущен до оплаты».
 * Возвращает массив на 16 строк или null, если журнал/лист недоступен.
 */
function paymentStatusRows_(paymentsSS, groupName) {
  try {
    if (!paymentsSS) return null;
    const sheet = paymentsSS.getSheetByName(groupName);
    if (!sheet) return null;
    const vals = sheet.getRange(PAY_FIRST_ROW, 1, PAY_ROWS, COL_BALANCE).getValues();
    const disp = sheet.getRange(PAY_FIRST_ROW, 1, PAY_ROWS, COL_BALANCE).getDisplayValues();
    const out = [];
    for (let i = 0; i < PAY_ROWS; i++) {
      const tuition = Math.round(parseNum_(vals[i][COL_TUITION - 1]));
      const balance = balanceOf_(vals[i][COL_TUITION - 1], vals[i][COL_PAID - 1]);
      const n2 = !!String(disp[i][NOTICE_STATUS_COL[2] - 1] || '').trim();
      const n3 = !!String(disp[i][NOTICE_STATUS_COL[3] - 1] || '').trim();
      out.push({ balance: balance, tuition: tuition, n2: n2, n3: n3, blocked: n3 && balance > 0, warning: !n3 && n2 && balance > 0 });
    }
    return out;
  } catch (e) {
    return null;
  }
}

function openPaymentsForTeacher_(ctx) {
  try { return ctx.journal && ctx.journal.paymentsId ? SpreadsheetApp.openById(ctx.journal.paymentsId) : null; } catch (e) { return null; }
}

/** Группы преподавателя (видимые листы) с уровнем, расписанием и числом учеников */
function getTeacherGroups(teacherName, password, month) {
  if (getConfig_().useDb) return getTeacherGroupsDb_(teacherName, password, month);
  const ctx = teacherContext_(teacherName, password, undefined, month);
  if (ctx.error) return ctx.error;

  const groups = [];
  const paySS = ctx.editable ? openPaymentsForTeacher_(ctx) : ctx.ss;
  for (let g = 1; g <= 10; g++) {
    const groupName = 'Группа ' + g;
    const sheet = ctx.ss.getSheetByName(groupName);
    if (!sheet || isHidden_(sheet)) continue;
    let disp;
    try { disp = sheet.getRange('A1:U29').getDisplayValues(); } catch (e) { continue; }
    const meta = groupMetaFromGrid_(disp, g);
    let count = 0;
    for (let i = 0; i < 16; i++) {
      if (String(disp[13 + i][1] || '').trim() || String(disp[13 + i][16] || '').trim()) count++;
    }
    let blocked = 0, warning = 0;
    const ps = paymentStatusRows_(paySS, groupName);
    if (ps) for (let i = 0; i < 16; i++) { if (String(disp[13 + i][1] || '').trim()) { if (ps[i].blocked) blocked++; else if (ps[i].warning) warning++; } }
    let hasDates = false;
    for (let c = ATT_FIRST_COL - 1; c < ATT_FIRST_COL - 1 + ATT_COLS; c++) if (String(disp[ATT_DATES_ROW - 1][c] || '').trim()) { hasDates = true; break; }
    const na = function(v) { return !v || /не назнач|не выбран/i.test(v); };
    const used = count > 0 || !na(meta.level) || !na(meta.time) || !na(meta.days) || hasDates;
    // для главной преподавателя: занятие сегодня, отмечено ли, прошедшие без отметок, ближайшая дата (как в режиме БАЗА)
    const todayIso = isoToday_(), dates = [];
    for (let c = ATT_FIRST_COL - 1; c < ATT_FIRST_COL - 1 + ATT_COLS; c++) { const m = String(disp[ATT_DATES_ROW - 1][c] || '').trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/); dates.push(m ? m[3] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[1]).slice(-2) : ''); }
    const k = dates.indexOf(todayIso);
    let marked = 0, unmarkedPast = [], nextDate = '';
    if (count) for (let j = 0; j < ATT_COLS; j++) {
      const d = dates[j]; if (!d) continue;
      let m = 0; for (let i = 0; i < 16; i++) if (String(disp[13 + i][1] || '').trim() && String(disp[13 + i][ATT_FIRST_COL - 1 + j] || '').trim() !== '') m++;
      if (j === k) marked = m;
      if (d < todayIso && !m) unmarkedPast.push({ lesson: j + 1, date: d });
      if (d >= todayIso && (!nextDate || d < nextDate)) nextDate = d;
    }
    groups.push({ name: groupName, title: meta.title, level: meta.level, time: meta.time, days: meta.days, studentsCount: count, blocked: blocked, warning: warning, hasDates: hasDates, used: used,
      todayLesson: k === -1 ? 0 : k + 1, markedToday: marked, unmarkedPast: unmarkedPast, nextDate: nextDate, room: getRoom_(ctx.journal.month, ctx.auth.teacher.name, groupName) || '', datesSet: dates.filter(Boolean).length, dates: dates });
  }

  return {
    success: true,
    teacher: ctx.auth.teacher,
    month: ctx.journal.month,
    editable: ctx.editable,
    note: ctx.note || '',
    journalName: ctx.editable ? ('NEW ' + ctx.journal.month) : ctx.journal.name,
    journalUrl: 'https://docs.google.com/spreadsheets/d/' + (ctx.editable ? ctx.journal.attendanceId : ctx.journal.paymentsId) + '/edit',
    groups: groups
  };
}

/** Полные данные группы для редактирования */
function getTeacherGroupDetails(teacherName, password, groupName, month) {
  if (getConfig_().useDb) return getTeacherGroupDetailsDb_(teacherName, password, groupName, month);
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  const sheet = ctx.sheet;

  const vals = sheet.getRange('A1:U29').getValues();
  const disp = sheet.getRange('A1:U29').getDisplayValues();
  const g = Number(groupName.replace(/\D/g, ''));
  const meta = groupMetaFromGrid_(disp, g, sheet);

  const options = {
    levels: validationOptions_(sheet.getRange(meta.cells.level[0], meta.cells.level[1])),
    times: validationOptions_(sheet.getRange(meta.cells.time[0], meta.cells.time[1])),
    days: validationOptions_(sheet.getRange(meta.cells.days[0], meta.cells.days[1]))
  };

  const held = lessonsHeldFromGrid_(vals);
  const dates = [], datesIso = [];
  const tz = sheetTz_(sheet);
  const todayIso = isoToday_();
  let next = null;
  for (let c = ATT_FIRST_COL - 1; c < ATT_FIRST_COL - 1 + ATT_COLS; c++) {
    dates.push(String(disp[11][c] || '').trim());
    const v = vals[11][c];
    const iso = (v instanceof Date) ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : '';
    datesIso.push(iso);
    if (iso && iso > todayIso && !next) next = { lesson: c - (ATT_FIRST_COL - 1) + 1, iso: iso, text: String(disp[11][c] || '').trim(), weekday: String(disp[12][c] || '').trim() };
  }

  let savedAt = [];
  try { savedAt = sheet.getRange(T_FIRST_ROW, T_COL_SAVED, 16, 1).getValues().map(function(x) { return x[0]; }); } catch (e) {}
  const lastMsgs = lastAttendanceNotices_(ctx.auth.teacher.name, groupName);
  const payRows = paymentStatusRows_(ctx.editable ? openPaymentsForTeacher_(ctx) : ctx.ss, groupName);
  const nowMs = Date.now();
  const students = [];
  for (let i = 0; i < 16; i++) {
    const r = 13 + i;
    const marks = [];
    for (let c = ATT_FIRST_COL - 1; c < ATT_FIRST_COL - 1 + ATT_COLS; c++) marks.push(String(disp[r][c] || '').trim());
    const ts = savedAt[i] instanceof Date ? savedAt[i].getTime() : 0;
    const nameLocked = !!String(disp[r][1] || '').trim() && (!ts || nowMs - ts > ctx.cfg.nameEditHours * 3600000);
    students.push({
      row: T_FIRST_ROW + i,
      pay: payFlagsForTeacher_(payRows ? payRows[i] : null),
      lastMsg: lastMsgs[studentKey_(disp[r][1])] || null,
      nameLocked: nameLocked,
      nameEditableUntil: ts ? new Date(ts + ctx.cfg.nameEditHours * 3600000).toISOString() : '',
      name: String(disp[r][1] || '').trim(),
      wa: String(disp[r][16] || '').trim(),
      dad: String(disp[r][17] || '').trim(),
      mom: String(disp[r][18] || '').trim(),
      stu: String(disp[r][19] || '').trim(),
      note: String(disp[r][20] || '').trim(),
      att: attendanceFromGrid_(vals, i),
      marks: marks
    });
  }

  return {
    success: true,
    editable: ctx.editable,
    month: ctx.journal.month,
    group: groupName,
    meta: (function() { meta.room = getRoom_(ctx.journal.month, ctx.auth.teacher.name, groupName); return meta; })(),
    options: (function() { options.rooms = ctx.cfg.rooms; return options; })(),
    held: held,
    dates: dates,
    datesIso: datesIso,
    weekdays: (function() { const w = []; for (let c = ATT_FIRST_COL - 1; c < ATT_FIRST_COL - 1 + ATT_COLS; c++) w.push(String(disp[12][c] || '').trim()); return w; })(),
    next: next,
    today: todayIso,
    todayLesson: (function() { for (let i = 0; i < datesIso.length; i++) if (datesIso[i] === todayIso) return i + 1; return 0; })(),
    marksOnlyOnLessonDay: ctx.cfg.marksOnlyOnLessonDay,
    markWindows: markWindowsForTeacher_(ctx.auth.teacher.name),
    markDays: ctx.cfg.markDays,
    msgOnlyOnLessonDay: true,
    pendingRequests: pendingRequestsFor_(ctx.auth.teacher.name, ctx.journal.month, groupName),
    datesEditable: groupEditWindow_(ctx.cfg, sheet),
    transfer: transferState_(ctx.cfg, datesIso, ctx.journal.month, ctx.auth.teacher.name),
    roomFree: isoToday_() <= ctx.cfg.roomFreeUntil, roomFreeUntil: ctx.cfg.roomFreeUntil,
    replies: repliesForStudents_(students.map(function(x) { return { name: x.name, phone: x.wa }; })),
    nameEditHours: ctx.cfg.nameEditHours,
    students: students
  };
}

const MONTHS_RU_NOM = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];

/** «Сентябрь 2026» → {y:2026, m:9}; null, если не распознано */
function monthFromName_(name) {
  const t = String(name || '').toLowerCase().trim();
  const y = (t.match(/(20\d{2})/) || [])[1];
  for (let i = 0; i < MONTHS_RU_NOM.length; i++) {
    if (t.indexOf(MONTHS_RU_NOM[i].substr(0, 4)) !== -1 && y) return { y: Number(y), m: i + 1 };
  }
  return null;
}

const TZ = 'Asia/Bishkek';

function isoToday_() {
  return Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
}

/** Часовой пояс таблицы журнала (даты в ячейках — полночь этого пояса) */
function sheetTz_(sheet) {
  try { return sheet.getParent().getSpreadsheetTimeZone() || TZ; } catch (e) { return TZ; }
}

function daysBetweenIso_(a, b) {   // b - a в днях
  const pa = a.split('-'), pb = b.split('-');
  return Math.round((Date.UTC(+pb[0], +pb[1] - 1, +pb[2]) - Date.UTC(+pa[0], +pa[1] - 1, +pa[2])) / 86400000);
}

/**
 * Окно правок группы: преподаватель меняет даты, уровень, дни и время,
 * пока не наступила дата занятия № (cfg.editUntilLesson + 1) — то есть «до 3-го занятия
 * включительно, начиная с 4-го — через администратора». Нет даты у следующего занятия — окно открыто.
 */
function groupEditWindow_(cfg, sheet) {
  const n = cfg.editUntilLesson || 3;
  const next = n + 1;
  if (next > ATT_COLS) return { ok: true, until: '', lesson: n, nextLesson: next };
  let iso = '';
  try {
    const v = sheet.getRange(ATT_DATES_ROW, ATT_FIRST_COL - 1 + next).getValue();
    if (v instanceof Date) iso = Utilities.formatDate(v, sheetTz_(sheet), 'yyyy-MM-dd');
  } catch (e) {}
  if (!iso) return { ok: true, until: '', lesson: n, nextLesson: next };
  return { ok: isoToday_() < iso, until: iso.split('-').reverse().join('.'), lesson: n, nextLesson: next };
}

/** Можно ли сегодня ставить отметку за занятие с датой lessonIso */
function markAllowed_(cfg, lessonIso, todayIso) {
  if (!cfg.marksOnlyOnLessonDay) return true;
  if (!lessonIso) return false;
  const d = daysBetweenIso_(lessonIso, todayIso);
  return d >= 0 && d <= cfg.markDays;
}

/** Даты занятий (строка 12): iso по каждому занятию, todayLesson — номер занятия сегодня */
function lessonDates_(sheet) {
  const tz = sheetTz_(sheet);
  const todayIso = isoToday_();
  const vals = sheet.getRange(ATT_DATES_ROW, ATT_FIRST_COL, 1, ATT_COLS).getValues()[0];
  const iso = vals.map(function(v) { return (v instanceof Date) ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : ''; });
  let todayLesson = 0;
  for (let i = 0; i < iso.length; i++) if (iso[i] === todayIso) { todayLesson = i + 1; break; }
  return { iso: iso, todayIso: todayIso, todayLesson: todayLesson, tz: tz };
}

const WEEKDAYS_RU = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];
const WEEKDAYS_FULL_RU = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
const MONTHS_GEN_RU = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

const MONTHS_KG = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
const WEEKDAYS_KG = ['жекшемби', 'дүйшөмбү', 'шейшемби', 'шаршемби', 'бейшемби', 'жума', 'ишемби'];

/** «4 сентября»/«пятница» (рус.) и «4-сентябрь»/«жума» (кырг.) из Date; для не-даты — исходный текст */
function fullDateText_(value, fallback) {
  if (value instanceof Date && !isNaN(value)) {
    return {
      date: value.getDate() + ' ' + MONTHS_GEN_RU[value.getMonth()], weekday: WEEKDAYS_FULL_RU[value.getDay()], year: String(value.getFullYear()),
      dateKg: value.getDate() + '-' + MONTHS_KG[value.getMonth()], weekdayKg: WEEKDAYS_KG[value.getDay()]
    };
  }
  const f = String(fallback || '').trim();
  return { date: f, weekday: '', year: '', dateKg: f, weekdayKg: '' };
}

/** «Пн - Ср - Пт» → «дүйшөмбү, шаршемби, жума» */
function daysToKyrgyz_(days) {
  const map = { 'пн': 'дүйшөмбү', 'вт': 'шейшемби', 'ср': 'шаршемби', 'чт': 'бейшемби', 'пт': 'жума', 'сб': 'ишемби', 'вс': 'жекшемби' };
  const found = [];
  String(days || '').toLowerCase().split(/[^а-яё]+/).forEach(function(t) { if (map[t] && found.indexOf(map[t]) === -1) found.push(map[t]); });
  return found.join(', ');
}

/** «Кадырбекова Фарида Кадырбековна» → «Фарида Кадырбековна» */
function nameWithoutSurname_(full) {
  const p = String(full || '').trim().split(/\s+/).filter(Boolean);
  if (p.length >= 3) return p[1] + ' ' + p[2];
  if (p.length === 2) return p[1];
  return p.join(' ');
}

/** Изменить дату занятия (строка 12). isoDate '' — очистить. */
function saveTeacherLessonDate(teacherName, password, groupName, lesson, isoDate, month) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (getConfig_().useDb) return saveTeacherLessonDateDb_(teacherName, password, groupName, lesson, isoDate, month);
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  if (!ctx.editable) return { success: false, error: 'Редактирование недоступно: журнал посещений не назначен.' };
  const sheet = ctx.sheet;

  lesson = Number(lesson);
  if (!Number.isInteger(lesson) || lesson < 1 || lesson > ATT_COLS) return { success: false, error: 'Неверный номер занятия.' };
  isoDate = String(isoDate || '').trim();
  if (isoDate && !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return { success: false, error: 'Неверный формат даты.' };

  const de = groupEditWindow_(ctx.cfg, sheet);
  if (!de.ok) {
    // окно закрыто — заявка на подтверждение администратору / руководителю
    const cur = String(sheet.getRange(ATT_DATES_ROW, ATT_FIRST_COL - 1 + lesson).getDisplayValue() || '').trim();
    const req = createRequest_('дата', ctx.auth.teacher.name, ctx.journal.month, groupName, lesson, cur || '—', isoDate ? isoDate.split('-').reverse().join('.') : 'очистить', JSON.stringify({ iso: isoDate }));
    return { success: true, pending: true, request: req, message: 'Заявка отправлена руководителю. Дата изменится после подтверждения.' };
  }

  writeLessonDate_(sheet, lesson, isoDate);
  const r = lessonDatesPayload_(sheet);
  r.success = true;
  r.message = isoDate ? 'Дата занятия ' + lesson + ' изменена.' : 'Дата занятия ' + lesson + ' очищена.';
  return r;
}

function writeLessonDate_(sheet, lesson, isoDate) {
  const col = ATT_FIRST_COL - 1 + lesson;
  const dateCell = sheet.getRange(ATT_DATES_ROW, col);
  const wdCell = sheet.getRange(ATT_DATES_ROW + 1, col);
  let wdHasFormula = false;
  try { wdHasFormula = !!wdCell.getFormula(); } catch (e) {}
  if (!isoDate) {
    dateCell.clearContent();
    if (!wdHasFormula) wdCell.clearContent();
  } else {
    const p = isoDate.split('-');
    const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
    const fmt = dateCell.getNumberFormat();
    dateCell.setValue(d);
    if (!fmt || fmt === 'General' || fmt === '0') dateCell.setNumberFormat('d MMM');
    if (!wdHasFormula) wdCell.setValue(WEEKDAYS_RU[d.getDay()]);
  }
  SpreadsheetApp.flush();
}

function lessonDatesPayload_(sheet) {
  const disp = sheet.getRange(ATT_DATES_ROW, ATT_FIRST_COL, 2, ATT_COLS).getDisplayValues();
  const ld = lessonDates_(sheet);
  return {
    dates: disp[0].map(function(v) { return String(v || '').trim(); }),
    weekdays: disp[1].map(function(v) { return String(v || '').trim(); }),
    datesIso: ld.iso,
    todayLesson: ld.todayLesson
  };
}

function checkOption_(value, list, label) {
  value = String(value || '').trim();
  if (value.length > 80) return { error: label + ': слишком длинное значение.' };
  if (list && list.length && value !== '' && list.indexOf(value) === -1) {
    return { error: label + ': выберите значение из списка.' };
  }
  return { value: value };
}

/** Сохранить уровень, время и дни недели группы (C7, K6, K7) */
function saveTeacherGroupSettings(teacherName, password, groupName, level, time, days, month, room) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg0 = getConfig_();
  if (room !== undefined && room !== null) {
    const auth0 = checkTeacher_(teacherName, password);
    if (!auth0.success) return auth0;
    const m0 = String(month || '').trim() || cfg0.currentMonth;
    const rc = setRoomChecked_(cfg0, m0, auth0.teacher.name, String(groupName || '').trim(), String(room || '').trim(), String(days || ''), String(time || ''));
    if (rc.error) return { success: false, error: rc.error, conflicts: rc.conflicts };
  }
  if (cfg0.useDb) return saveTeacherGroupSettingsDb_(teacherName, password, groupName, level, time, days, month);
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  if (!ctx.editable) return { success: false, error: 'Редактирование недоступно: журнал посещений не назначен.' };
  const sheet = ctx.sheet;

  const ew = groupEditWindow_(ctx.cfg, sheet);
  const meta0 = groupMetaFromGrid_(sheet.getRange('A1:U29').getDisplayValues(), Number(groupName.replace(/\D/g, '')), sheet);
  if (!ew.ok) {
    const L0 = String(level || '').trim(), T0 = String(time || '').trim(), D0 = String(days || '').trim();
    const was = [meta0.level, meta0.days, meta0.time].join(' · ');
    const now = [L0, D0, T0].join(' · ');
    if (was === now) return { success: true, message: 'Изменений нет.', meta: meta0 };
    const req = createRequest_('настройки', ctx.auth.teacher.name, ctx.journal.month, groupName, '', was, now, JSON.stringify({ level: L0, time: T0, days: D0 }));
    return { success: true, pending: true, request: req, meta: meta0, message: 'Заявка отправлена руководителю. Настройки изменятся после подтверждения.' };
  }
  const cL = sheet.getRange(meta0.cells.level[0], meta0.cells.level[1]);
  const cT = sheet.getRange(meta0.cells.time[0], meta0.cells.time[1]);
  const cD = sheet.getRange(meta0.cells.days[0], meta0.cells.days[1]);

  const L = checkOption_(level, validationOptions_(cL), 'Уровень');
  if (L.error) return { success: false, error: L.error };
  const Tm = checkOption_(time, validationOptions_(cT), 'Время занятий');
  if (Tm.error) return { success: false, error: Tm.error };
  const D = checkOption_(days, validationOptions_(cD), 'Дни недели');
  if (D.error) return { success: false, error: D.error };

  cL.setValue(L.value);
  cT.setValue(Tm.value);
  cD.setValue(D.value);
  SpreadsheetApp.flush();

  const disp = sheet.getRange('A1:U29').getDisplayValues();
  return { success: true, meta: groupMetaFromGrid_(disp, Number(groupName.replace(/\D/g, ''))), message: 'Настройки группы сохранены.' };
}

/** Нормализация номера WhatsApp к виду 996XXXXXXXXX. Пусто → ''. Ошибка → {error} */
function normalizeWhatsapp_(value) {
  let d = String(value || '').replace(/\D/g, '');
  if (!d) return { value: '' };
  if (d.length === 9) d = '996' + d;
  else if (d.length === 10 && d.charAt(0) === '0') d = '996' + d.substr(1);
  if (d.length !== 12 || d.indexOf('996') !== 0) {
    return { error: 'WhatsApp: нужен номер вида 996XXXXXXXXX (12 цифр), получено «' + value + '».' };
  }
  return { value: d };
}

/**
 * Сохранить строку ученика (B, Q, R, S, T, U). Пустое ФИО и пустые контакты — очистка строки
 * (включая отметки посещения E–P и флажок C).
 */
function saveTeacherStudent(teacherName, password, groupName, row, data, month) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (getConfig_().useDb) return saveTeacherStudentDb_(teacherName, password, groupName, row, data, month);
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  if (!ctx.editable) return { success: false, error: 'Редактирование недоступно: журнал посещений не назначен.' };
  const sheet = ctx.sheet;

  row = Number(row);
  if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { success: false, error: 'Неверная строка.' };

  data = data || {};
  const name = String(data.name || '').trim().replace(/\s+/g, ' ');
  const dad = String(data.dad || '').trim();
  const mom = String(data.mom || '').trim();
  const stu = String(data.stu || '').trim();
  const note = String(data.note || '').trim();
  if (name.length > 80 || dad.length > 40 || mom.length > 40 || stu.length > 40 || note.length > 500) {
    return { success: false, error: 'Слишком длинное значение в одном из полей.' };
  }

  const wa = normalizeWhatsapp_(data.wa);
  if (wa.error) return { success: false, error: wa.error };

  // Сохранённые ФИО и номера меняются только в режиме редактирования с подтверждением (confirm = true).
  // Удалить ФИО из кабинета нельзя никогда.
  const confirmEdit = data.confirm === true || String(data.confirm) === 'true';
  const cur = sheet.getRange(row, 1, 1, 21).getDisplayValues()[0];
  const curName = String(cur[1] || '').trim();
  const curWa = String(cur[16] || '').replace(/\D/g, '');
  const curDad = String(cur[17] || '').trim(), curMom = String(cur[18] || '').trim(), curStu = String(cur[19] || '').trim();
  const curNote = String(cur[20] || '').trim();
  const LOCK = ' уже сохранён(а) — нажмите «✎ Редактировать» в строке ученика, чтобы изменить.';
  if (curName && !name) return { success: false, error: 'ФИО ученика удалить нельзя. Обратитесь к руководителю.' };
  if (curName && name !== curName) {
    // ФИО можно исправить только в течение N часов после первого сохранения
    let ts = 0;
    try { const v = sheet.getRange(row, T_COL_SAVED).getValue(); if (v instanceof Date) ts = v.getTime(); } catch (e) {}
    if (!ts || Date.now() - ts > ctx.cfg.nameEditHours * 3600000) {
      return { success: false, error: 'Изменить ФИО можно в течение ' + ctx.cfg.nameEditHours + ' часов после сохранения. Теперь исправить ФИО может только кассир или руководитель.' };
    }
  }
  if (!confirmEdit) {
    if (curName && name !== curName) return { success: false, error: 'ФИО «' + curName + '»' + LOCK };
    if (curWa && wa.value !== curWa) return { success: false, error: 'WhatsApp родителя' + LOCK };
    if (curDad && dad !== curDad) return { success: false, error: 'Телефон папы' + LOCK };
    if (curMom && mom !== curMom) return { success: false, error: 'Телефон мамы' + LOCK };
    if (curStu && stu !== curStu) return { success: false, error: 'Телефон ученика' + LOCK };
  }
  // журнал изменений для руководителя
  const changes = [];
  if (curName && name !== curName) changes.push(['ФИО', curName, name]);
  if (curWa !== wa.value && (curWa || wa.value)) changes.push(['WhatsApp родителя', curWa, wa.value]);
  if (curDad !== dad && (curDad || dad)) changes.push(['Телефон папы', curDad, dad]);
  if (curMom !== mom && (curMom || mom)) changes.push(['Телефон мамы', curMom, mom]);
  if (curStu !== stu && (curStu || stu)) changes.push(['Телефон ученика', curStu, stu]);
  if (curNote !== note && (curNote || note)) changes.push(['Комментарий', curNote, note]);
  if (changes.length && (curName || curWa || curDad || curMom || curStu)) {
    logChanges_(ctx.auth.teacher.name, groupName, row, curName || name, changes);
  }

  const isEmpty = !name && !wa.value && !dad && !mom && !stu && !note;

  if (isEmpty) {
    sheet.getRange(row, T_COL_NAME).clearContent();
    sheet.getRange(row, T_COL_WA, 1, 5).clearContent();
    sheet.getRange(row, ATT_FIRST_COL, 1, ATT_COLS).clearContent();
    try { sheet.getRange(row, T_COL_FLAG).setValue(false); } catch (e) {}
    SpreadsheetApp.flush();
    return { success: true, cleared: true, row: row, message: 'Строка очищена.' };
  }

  if (!name) return { success: false, error: 'Введите ФИО ученика.' };

  sheet.getRange(row, T_COL_NAME).setValue(name);
  if (!curName) {
    try { sheet.getRange(row, T_COL_SAVED).setValue(new Date()).setNumberFormat('dd.MM.yyyy HH:mm'); } catch (e) {}
  }
  const waCell = sheet.getRange(row, T_COL_WA);
  if (wa.value) waCell.setValue(Number(wa.value)); else waCell.clearContent();

  const phones = sheet.getRange(row, T_COL_DAD, 1, 3);
  phones.setNumberFormat('@');   // телефоны храним как текст, чтобы не терять ведущие нули и «+»
  phones.setValues([[dad, mom, stu]]);
  const noteCell = sheet.getRange(row, T_COL_NOTE);
  if (note) noteCell.setValue(note); else noteCell.clearContent();
  SpreadsheetApp.flush();

  const disp = sheet.getRange(row, 1, 1, 21).getDisplayValues()[0];
  return {
    success: true, row: row,
    student: { row: row, name: String(disp[1] || '').trim(), wa: String(disp[16] || '').trim(), dad: String(disp[17] || '').trim(),
               mom: String(disp[18] || '').trim(), stu: String(disp[19] || '').trim(), note: String(disp[20] || '').trim() },
    message: 'Сохранено.'
  };
}


// ---------- Посещаемость и уведомления родителям ----------

/** Отметка посещения: lesson 1..12, value '' | 1 | 0.5 | 0 */
function saveTeacherAttendance(teacherName, password, groupName, row, lesson, value) {
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  if (ctx.closedMonth) return closedErr_(ctx.closedMonth.month);
  if (!ctx.editable) return { success: false, error: 'Редактирование недоступно: журнал посещений не назначен.' };
  const sheet = ctx.sheet;

  row = Number(row);
  lesson = Number(lesson);
  if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { success: false, error: 'Неверная строка.' };
  if (!Number.isInteger(lesson) || lesson < 1 || lesson > ATT_COLS) return { success: false, error: 'Неверный номер занятия.' };

  const v = String(value === undefined || value === null ? '' : value).trim().replace(',', '.');
  if (['', '1', '0.5', '0'].indexOf(v) === -1) return { success: false, error: 'Отметка может быть только 1, 0,5 или 0.' };

  const name = String(sheet.getRange(row, T_COL_NAME).getDisplayValue() || '').trim();
  if (!name) return { success: false, error: 'В этой строке нет ученика.' };

  const cell = sheet.getRange(row, ATT_FIRST_COL - 1 + lesson);
  if (v === '') cell.clearContent(); else cell.setValue(Number(v));
  SpreadsheetApp.flush();

  const rowVals = sheet.getRange(row, ATT_FIRST_COL, 1, ATT_COLS).getValues()[0];
  const rowDisp = sheet.getRange(row, ATT_FIRST_COL, 1, ATT_COLS).getDisplayValues()[0];
  let att = 0;
  rowVals.forEach(function(x) { const n = (x === true) ? 1 : parseNum_(x); if (n > 0) att += n; });

  return {
    success: true, row: row, lesson: lesson, value: v,
    att: Math.round(att * 10) / 10,
    marks: rowDisp.map(function(m) { return String(m || '').trim(); })
  };
}

/**
 * Пакетное сохранение отметок: changes = [{row, lesson, value}, ...]
 * Возвращает пересчитанные отметки и сумму по каждой затронутой строке.
 */
function saveTeacherAttendanceBatch(teacherName, password, groupName, changes, month, opts) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (getConfig_().useDb) return saveTeacherAttendanceBatchDb_(teacherName, password, groupName, changes, month, opts);
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  if (!ctx.editable) return { success: false, error: 'Редактирование недоступно: журнал посещений не назначен.' };
  const sheet = ctx.sheet;

  if (!Array.isArray(changes) || !changes.length) return { success: true, rows: {} };
  if (changes.length > 200) return { success: false, error: 'Слишком много изменений за раз.' };

  const names = sheet.getRange(T_FIRST_ROW, T_COL_NAME, 16, 1).getDisplayValues();
  const ld = lessonDates_(sheet);
  const onlyToday = ctx.cfg.marksOnlyOnLessonDay;
  const touched = {}, byVal = {};
  for (let i = 0; i < changes.length; i++) {
    const ch = changes[i] || {};
    const row = Number(ch.row), lesson = Number(ch.lesson);
    const v = String(ch.value === undefined || ch.value === null ? '' : ch.value).trim().replace(',', '.');
    if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { success: false, error: 'Неверная строка: ' + ch.row };
    if (!Number.isInteger(lesson) || lesson < 1 || lesson > ATT_COLS) return { success: false, error: 'Неверный номер занятия: ' + ch.lesson };
    if (onlyToday && !markAllowed_(ctx.cfg, ld.iso[lesson - 1], ld.todayIso) && !markWindowFor_(ctx.auth.teacher.name, ld.iso[lesson - 1])) {
      return { success: false, error: 'Отметки можно ставить в день занятия' + (ctx.cfg.markDays ? ' и в течение ' + ctx.cfg.markDays + ' дн. после' : '') + '. Занятие ' + lesson + (ld.iso[lesson - 1] ? ' — ' + ld.iso[lesson - 1].split('-').reverse().join('.') : ' (дата не назначена)') + ', сегодня ' + ld.todayIso.split('-').reverse().join('.') + '.' };
    }
    if (['', '1', '0.5', '0'].indexOf(v) === -1) return { success: false, error: 'Отметка может быть только 1, 0,5 или 0.' };
    if (!String(names[row - T_FIRST_ROW][0] || '').trim()) return { success: false, error: 'В строке ' + (row - T_FIRST_ROW + 1) + ' нет ученика.' };
    (byVal[v] = byVal[v] || []).push(colLetter_(ATT_FIRST_COL - 1 + lesson) + row);
    touched[row] = true;
  }
  // клетки с одинаковой отметкой пишутся одним обращением (раньше — отдельная запись на каждую клетку)
  Object.keys(byVal).forEach(function(v) {
    const rl = sheet.getRangeList(byVal[v]);
    if (v === '') rl.clearContent(); else rl.setValue(Number(v));
  });
  SpreadsheetApp.flush();

  // итоги по изменённым строкам — двумя чтениями блока вместо двух чтений на каждую строку
  const rowsIdx = Object.keys(touched).map(Number).sort(function(a, b) { return a - b; });
  const r0 = rowsIdx[0], span = rowsIdx[rowsIdx.length - 1] - r0 + 1;
  const vals = sheet.getRange(r0, ATT_FIRST_COL, span, ATT_COLS).getValues();
  const disp = sheet.getRange(r0, ATT_FIRST_COL, span, ATT_COLS).getDisplayValues();
  const rows = {};
  rowsIdx.forEach(function(r) {
    const rv = vals[r - r0], rd = disp[r - r0];
    let att = 0;
    rv.forEach(function(x) { const n = (x === true) ? 1 : parseNum_(x); if (n > 0) att += n; });
    rows[r] = { att: Math.round(att * 10) / 10, marks: rd.map(function(m) { return String(m || '').trim(); }) };
  });
  return { success: true, rows: rows };
}
/** Номер столбца → буква (5 → E) */
function colLetter_(c) { let s = ''; while (c > 0) { const m = (c - 1) % 26; s = String.fromCharCode(65 + m) + s; c = Math.floor((c - 1) / 26); } return s; }

/** Отправка через GREEN-API. Настройки — в свойствах скрипта: GREEN_API_URL, GREEN_API_ID, GREEN_API_TOKEN */
function sendWhatsapp_(phone, text) {
  const props = PropertiesService.getScriptProperties();
  const url = String(props.getProperty('GREEN_API_URL') || 'https://api.green-api.com').trim();
  const id = String(props.getProperty('GREEN_API_ID') || '').trim();
  const token = String(props.getProperty('GREEN_API_TOKEN') || '').trim();
  if (!id || !token) {
    return { ok: false, error: 'GREEN-API не настроен: добавьте свойства скрипта GREEN_API_URL, GREEN_API_ID и GREEN_API_TOKEN (Настройки проекта → Свойства скрипта).' };
  }
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length < 11) return { ok: false, error: 'Некорректный номер WhatsApp: ' + phone };

  const endpoint = url.replace(/\/+$/, '') + '/waInstance' + id + '/sendMessage/' + token;
  try {
    const resp = UrlFetchApp.fetch(endpoint, {
      method: 'post',
      contentType: 'application/json',
      payload: JSON.stringify({ chatId: digits + '@c.us', message: text }),
      muteHttpExceptions: true
    });
    const code = resp.getResponseCode();
    const body = String(resp.getContentText() || '');
    if (code >= 200 && code < 300) return { ok: true, response: body.substr(0, 200) };
    return { ok: false, error: 'GREEN-API ответил кодом ' + code + ': ' + body.substr(0, 200) };
  } catch (e) {
    return { ok: false, error: 'Ошибка отправки: ' + e.message };
  }
}

function fillTemplate_(tpl, data) {
  return String(tpl || '').replace(/\{([^}]+)\}/g, function(m, k) {
    return data[k] !== undefined ? data[k] : m;
  });
}

/** Последнее сообщение об отсутствии/опоздании по каждому ученику группы (из листа «Уведомления») */
/** Хвост листа «Уведомления» (последние 3000 строк) с кэшем на 40 с — открытие групп у десяти преподавателей не читает лист десять раз */
function notifTailCached_() {
  const hit = cacheGetBig_('notiftail');
  if (hit) { try { return JSON.parse(hit).map(function(r) { r[0] = r[0] ? new Date(r[0]) : ''; return r; }); } catch (e) {} }
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Уведомления');
  if (!sh || sh.getLastRow() < 2) return [];
  const last = sh.getLastRow(), from = Math.max(2, last - 3000);
  const rows = sh.getRange(from, 1, last - from + 1, 8).getValues();
  try { cachePutBig_('notiftail', JSON.stringify(rows.map(function(r) { return [r[0] instanceof Date ? r[0].getTime() : '', String(r[1] || ''), String(r[2] || ''), String(r[3] || ''), String(r[4] || ''), String(r[5] || ''), String(r[6] || ''), String(r[7] || '')]; })), 40); } catch (e) {}
  return rows;
}
function lastAttendanceNotices_(teacherShort, groupName) {
  const out = {};
  try {
    const rows = notifTailCached_();
    if (!rows.length) return out;
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i];
      if (String(r[1]).trim() !== teacherShort || String(r[2]).trim() !== groupName) continue;
      const type = String(r[5] || '');
      if (type !== 'отсутствие' && type !== 'опоздание') continue;
      if (String(r[7]) !== 'отправлено') continue;
      const key = studentKey_(r[3]);
      if (out[key]) continue;
      out[key] = { type: type, when: r[0] instanceof Date ? Utilities.formatDate(r[0], 'Asia/Bishkek', 'dd.MM HH:mm') : String(r[0] || ''), lesson: r[6] };
    }
  } catch (e) {}
  return out;
}

/** Лог правок данных учеников (лист «Изменения» основной таблицы) */
function logChanges_(teacherShort, groupName, row, student, changes) {
  touchStamp_();
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName('Изменения');
    if (!sh) {
      sh = ss.insertSheet('Изменения');
      sh.getRange(1, 1, 1, 8).setValues([['Время', 'Преподаватель', 'Группа', 'Строка', 'Ученик', 'Поле', 'Было', 'Стало']]);
      styleConfigSheet_(sh, 8, [140, 170, 100, 60, 220, 150, 220, 220]);
    }
    const now = new Date();
    const rows = changes.map(function(c) { return [now, teacherShort, groupName, row, student, c[0], c[1], c[2]]; });
    sh.getRange(sh.getLastRow() + 1, 1, rows.length, 8).setValues(rows);
  } catch (e) {}
}

/** Лог уведомлений в основной таблице (лист «Уведомления») */
function logNotification_(rowData) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName('Уведомления');
    if (!sh) {
      sh = ss.insertSheet('Уведомления');
      sh.getRange(1, 1, 1, 9).setValues([['Время', 'Преподаватель', 'Группа', 'Ученик', 'Телефон', 'Тип', 'Занятие', 'Статус', 'Ответ / ошибка']]);
      styleConfigSheet_(sh, 9, [140, 170, 100, 220, 130, 110, 80, 90, 400]);
    }
    sh.appendRow(rowData);
    try { CacheService.getScriptCache().remove('notiftail#n'); } catch (e2) {}
  } catch (e) {}
}

/**
 * Текст уведомления для предпросмотра (без отправки).
 * kind = 'absent' | 'late'
 */
function previewTeacherNotification(teacherName, password, groupName, row, lesson, kind, month) {
  const built = buildNotification_(teacherName, password, groupName, row, lesson, kind, month);
  if (built.error) return built.error;
  return { success: true, phone: built.phone, text: built.text, student: built.student };
}

function buildNotification_(teacherName, password, groupName, row, lesson, kind, month) {
  if (getConfig_().useDb) return buildNotificationDb_(teacherName, password, groupName, row, lesson, kind, month);
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return { error: ctx.error };
  if (!ctx.editable) return { error: { success: false, error: 'Недоступно: журнал посещений не назначен.' } };
  const sheet = ctx.sheet;

  row = Number(row); lesson = Number(lesson);
  if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { error: { success: false, error: 'Неверная строка.' } };
  if (!Number.isInteger(lesson) || lesson < 1 || lesson > ATT_COLS) return { error: { success: false, error: 'Неверный номер занятия.' } };
  kind = kind === 'late' ? 'late' : 'absent';

  const disp = sheet.getRange('A1:U29').getDisplayValues();
  const dateVals = sheet.getRange(ATT_DATES_ROW, ATT_FIRST_COL, 1, ATT_COLS).getValues()[0];
  const student = String(disp[row - 1][1] || '').trim();
  const phone = String(disp[row - 1][16] || '').trim();
  if (!student) return { error: { success: false, error: 'В этой строке нет ученика.' } };
  if (!phone) return { error: { success: false, error: 'У ученика не указан WhatsApp родителя.' } };

  // Тип сообщения определяется отметкой посещения, а не запросом
  const mark = String(disp[row - 1][ATT_FIRST_COL - 2 + lesson] || '').trim().replace(',', '.');
  if (mark === '0') kind = 'absent';
  else if (mark === '0.5') kind = 'late';
  else if (mark === '1') return { error: { success: false, error: student + ' присутствовал(а) на занятии ' + lesson + ' — сообщение не требуется.' } };
  else return { error: { success: false, error: 'Сначала поставьте отметку посещения за занятие ' + lesson + '.' } };

  const meta = groupMetaFromGrid_(disp, Number(groupName.replace(/\D/g, '')));
  const fd = fullDateText_(dateVals[lesson - 1], disp[ATT_DATES_ROW - 1][ATT_FIRST_COL - 2 + lesson]);
  const dateText = fd.date || ('занятие №' + lesson);
  const tplKey = kind === 'late' ? 'СООБЩЕНИЕ_ОПОЗДАНИЕ' : 'СООБЩЕНИЕ_ОТСУТСТВИЕ';
  let tpl = ctx.cfg.settings[tplKey];
  if (!tpl) { const d = SETTINGS_DEFAULTS.filter(function(x) { return x[0] === tplKey; })[0]; tpl = d ? d[1] : ''; }
  tpl = String(tpl).replace(/\\n/g, '\n');

  const teacherFull = ctx.auth.teacher.full || meta.teacher || ctx.auth.teacher.name;
  const lessonIso = (dateVals[lesson - 1] instanceof Date) ? Utilities.formatDate(dateVals[lesson - 1], sheetTz_(sheet), 'yyyy-MM-dd') : '';
  const isToday = lessonIso && lessonIso === isoToday_();
  // сообщение об отсутствии/опоздании — только в день занятия (по времени Бишкека)
  if (!lessonIso) return { error: { success: false, error: 'У занятия ' + lesson + ' не назначена дата — сообщение не отправляется.' } };
  if (!isToday) return { error: { success: false, error: 'Сообщение об отсутствии или опоздании отправляется только в день занятия (' + lessonIso.split('-').reverse().join('.') + '). Сегодня ' + isoToday_().split('-').reverse().join('.') + '.' } };
  const timeTxt = meta.time && !/не назнач/i.test(meta.time) ? meta.time : '';
  const daysTxt = meta.days && !/не назнач/i.test(meta.days) ? meta.days : '';
  const daysKg = daysToKyrgyz_(daysTxt);
  let text = fillTemplate_(tpl, {
    'ученик': student, 'дата': dateText, 'день': fd.weekday, 'год': fd.year,
    'дата_кг': fd.dateKg || dateText, 'день_кг': fd.weekdayKg,
    'когда_кг': (isToday ? 'бүгүн, ' : '') + (fd.dateKg || dateText) + ' күнү',
    'когда': (isToday ? 'сегодня, ' : '') + dateText,
    'время': timeTxt, 'дни': daysTxt, 'дни_кг': daysKg,
    'группа': meta.title, 'уровень': meta.level,
    'преподаватель': teacherFull, 'преподаватель_ио': nameWithoutSurname_(teacherFull), 'мугалим': nameWithoutSurname_(teacherFull),
    'занятие': String(lesson)
  });
  // если расписание не назначено — фраза о днях/времени убирается целиком
  if (!timeTxt || !daysKg) text = text.replace(/Сабак(тар)?[^\n]*?(болот|өтөт|башталат)\.\s*/g, '');
  text = text.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n');
  return { ctx: ctx, student: student, phone: phone, text: text, kind: kind, meta: meta, lesson: lesson };
}

/** Отправить родителю уведомление об отсутствии (kind='absent') или опоздании (kind='late') */
function sendTeacherNotification(teacherName, password, groupName, row, lesson, kind, month) {
  const b = buildNotification_(teacherName, password, groupName, row, lesson, kind, month);
  if (b.error) return b.error;

  const res = sendWhatsapp_(b.phone, b.text);
  logNotification_([new Date(), b.ctx.auth.teacher.name, groupName, b.student, b.phone,
    b.kind === 'late' ? 'опоздание' : 'отсутствие', b.lesson, res.ok ? 'отправлено' : 'ошибка', res.ok ? (res.response || '') : res.error]);

  if (!res.ok) return { success: false, error: res.error };
  return { success: true, message: 'Сообщение отправлено родителю (' + b.phone + ').', lastMsg: { type: b.kind === 'late' ? 'опоздание' : 'отсутствие', when: Utilities.formatDate(new Date(), 'Asia/Bishkek', 'dd.MM HH:mm'), lesson: b.lesson } };
}


function getTeacherGroupStudents(teacherName, password, groupName) {
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;

  groupName = String(groupName || '').trim();
  if (!isValidGroupName_(groupName)) return { success: false, error: 'Неверная группа.' };

  const journalSS = SpreadsheetApp.openById(auth.teacher.journalId);
  const sheet = journalSS.getSheetByName(groupName);
  if (!sheet) return { success: false, error: 'Лист "' + groupName + '" не найден.' };

  return { success: true, teacher: auth.teacher, group: groupName, students: readGroupStudents_(sheet) };
}


// ============================================================
// ЧАСТЬ 3. АДМИНИСТРАТОР И РУКОВОДИТЕЛЬ — ОПЛАТЫ
// ============================================================

/** Какой роли соответствует пароль: 'director' | 'admin' | null */
function staffRole_(cfg, password) {
  password = String(password || '');
  if (!password) return null;
  // Роли системы: руководитель, кассир (в коде — admin), ресепшн, преподаватель (отдельный вход).
  // Учебная часть и учёт книг упразднены: их коды больше не действуют.
  if (codeMatches_(cfg.directorPassword, password)) return 'director';
  if (codeMatches_(cfg.adminPassword, password)) return staffBlocked_('admin') ? null : 'admin';
  if (cfg.receptionPassword && codeMatches_(cfg.receptionPassword, password)) return staffBlocked_('reception') ? null : 'reception';
  return null;
}
function staffBlocked_(role) { try { return PropertiesService.getScriptProperties().getProperty('BLOCK_' + role) === '1'; } catch (e) { return false; } }
// ===== Закрытие месяца =====
// Закрытый месяц не редактируется никем: оплаты и зачёты кассы, отметки, даты, скидки, переводы, удаления, зарплата.
// Открыть месяц может только руководитель, с причиной; и закрытие, и открытие пишутся в лист ЗАКРЫТИЕ_МЕСЯЦЕВ и в «Изменения».
const CLOSE_SHEET = 'ЗАКРЫТИЕ_МЕСЯЦЕВ';
const CLOSE_H = ['Месяц', 'Закрыт', 'Кем', 'Начислено', 'Оплачено', 'Долг', 'Учеников', 'Примечание', 'Открыт', 'Кем открыт', 'Причина открытия'];
function closeSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet(); let sh = ss.getSheetByName(CLOSE_SHEET);
  if (!sh) { sh = ss.insertSheet(CLOSE_SHEET); sh.getRange(1, 1, 1, CLOSE_H.length).setValues([CLOSE_H]); try { styleConfigSheet_(sh, CLOSE_H.length, [140, 130, 110, 100, 100, 100, 90, 220, 130, 110, 240]); } catch (e) {} }
  return sh;
}
/** {ключМесяца: {month, at, by, note, row}} — только закрытые сейчас месяцы (последняя запись без даты открытия) */
function closedMonths_() {
  const cache = CacheService.getScriptCache(), k = 'closed_months_v1';
  try { const c = cache.get(k); if (c) return JSON.parse(c); } catch (e) {}
  const out = {};
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLOSE_SHEET);
    if (sh && sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, CLOSE_H.length).getDisplayValues().forEach(function(r, i) {
      const m = String(r[0] || '').trim(); if (!m) return; const key = nameKey_(m);
      if (String(r[8] || '').trim()) delete out[key]; else out[key] = { month: m, at: String(r[1] || ''), by: String(r[2] || ''), note: String(r[7] || ''), row: i + 2 };
    });
  } catch (e) {}
  try { cache.put(k, JSON.stringify(out), 300); } catch (e) {}
  return out;
}
function closedInvalidate_() { try { CacheService.getScriptCache().remove('closed_months_v1'); } catch (e) {} }
function monthClosed_(month) { if (!month) return null; return closedMonths_()[nameKey_(month)] || null; }
/** Ошибка для закрытого месяца или null */
function closedErr_(month) {
  const c = monthClosed_(month);
  return c ? { success: false, error: 'Месяц «' + c.month + '» закрыт ' + c.at + ' (' + c.by + '). Изменения за него невозможны. Чтобы исправить, руководитель открывает месяц в «Отчёты и сверка», вносит правку и закрывает снова.' } : null;
}
/** «11.09.2026» → «Сентябрь 2026» (как в листе ЖУРНАЛЫ) */
function monthNameOfDate_(d) {
  const m = String(d || '').match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/); if (!m) return '';
  const n = MONTHS_RU_NOM[Number(m[2]) - 1]; return n ? n.charAt(0).toUpperCase() + n.slice(1) + ' ' + m[3] : '';
}
/** Список месяцев со статусом закрытия + история (для «Отчёты и сверка») */
function getMonthClose(role, password) {
  const cfg = getConfig_(); const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const closed = closedMonths_(), hist = [];
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CLOSE_SHEET);
    if (sh && sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, CLOSE_H.length).getDisplayValues().forEach(function(r) {
      if (String(r[0] || '').trim()) hist.push({ month: r[0], at: r[1], by: r[2], acc: r[3], paid: r[4], debt: r[5], n: r[6], note: r[7], openedAt: r[8], openedBy: r[9], openReason: r[10] });
    });
  } catch (e) {}
  const months = (cfg.months || []).map(function(m) { const c = closed[nameKey_(m)]; return { month: m, closed: !!c, at: c ? c.at : '', by: c ? c.by : '', note: c ? c.note : '', current: nameKey_(m) === nameKey_(cfg.currentMonth) }; });
  return { success: true, months: months, history: hist.reverse().slice(0, 50), canManage: actual === 'director' };
}
function closeMonth(role, password, month, note) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  month = String(month || '').trim(); if (!month) return { success: false, error: 'Укажите месяц.' };
  if (monthClosed_(month)) return { success: false, error: 'Месяц «' + month + '» уже закрыт.' };
  let t = { acc: '', paid: '', debt: '', n: '' };
  try { const r = getAdminDashboardInner_('director', password, month, false, 'journals'); const st = r && r.snapshot && r.snapshot.totals; if (st) t = { acc: Math.round(st.acc || 0), paid: Math.round(st.paid || 0), debt: Math.round(st.debt || 0), n: st.n || 0 }; } catch (e) {}
  const stamp = Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm');
  closeSheet_().appendRow([month, stamp, 'руководитель', t.acc, t.paid, t.debt, t.n, String(note || '').trim(), '', '', '']);
  closedInvalidate_();
  logChanges_('руководитель', '', '', '(закрытие месяца)', [['Месяц закрыт', '', month + (note ? ' · ' + String(note).trim() : '') + (t.acc !== '' ? ' · начислено ' + t.acc + ', оплачено ' + t.paid + ', долг ' + t.debt : '')]]);
  return { success: true, message: 'Месяц «' + month + '» закрыт. Правки за него теперь невозможны; открыть можно здесь же, с указанием причины.' };
}
function openMonth(role, password, month, reason) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  reason = String(reason || '').trim(); if (!reason) return { success: false, error: 'Укажите причину открытия — она запишется в журнал изменений.' };
  const c = monthClosed_(month); if (!c) return { success: false, error: 'Месяц не закрыт.' };
  const stamp = Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm');
  closeSheet_().getRange(c.row, 9, 1, 3).setValues([[stamp, 'руководитель', reason]]);
  closedInvalidate_();
  logChanges_('руководитель', '', '', '(закрытие месяца)', [['Месяц открыт', '', c.month + ' · причина: ' + reason]]);
  return { success: true, message: 'Месяц «' + c.month + '» открыт для правок. Внесите исправление и закройте месяц снова.' };
}

// ===== Настройки (руководитель): чтение и проверяемая запись листа НАСТРОЙКИ, прайс уровней =====
const SETTINGS_HIDDEN = /^ПАРОЛЬ_/;   // коды доступа — в «Доступах»
const SETTINGS_READONLY = ['ИСТОЧНИК_ДАННЫХ', 'МЕСЯЦ_АБОНЕМЕНТА'];   // меняются только миграцией
const SETTINGS_NUMERIC = ['ПЕРЕСЧЁТ_ОТ_ЗАНЯТИЙ', 'МИНИМУМ_ДЛЯ_ГРУППЫ', 'ВМЕСТИМОСТЬ_ГРУППЫ', 'ЧАС_АВТОРАССЫЛКИ', 'ЧАС_НАПОМИНАНИЯ', 'ОКНО_УВЕДОМЛЕНИЯ_1', 'ОКНО_УВЕДОМЛЕНИЯ_2', 'ОКНО_УВЕДОМЛЕНИЯ_3', 'РЕЗЕРВНЫХ_КОПИЙ_ХРАНИТЬ', 'ДНЕЙ_НА_ПРАВКУ_ОТМЕТОК', 'ДНЕЙ_ДО_ПЕРЕХОДА', 'ПЕРЕНОС_С_ЗАНЯТИЯ', 'АВТОПЕРЕНОС_ПОСЛЕ_ЗАНЯТИЯ', 'ДАТЫ_МЕНЯТЬ_ДО_ЗАНЯТИЯ', 'ЧАСОВ_НА_ПРАВКУ_ФИО'];
const SETTINGS_YESNO = ['АВТО_УВЕДОМЛЕНИЯ', 'НАПОМИНАНИЯ_О_ЗАНЯТИИ', 'ОТМЕТКИ_ТОЛЬКО_В_ДЕНЬ_ЗАНЯТИЯ'];
function getSettingsList(role, password) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const items = [];
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
    if (sh && sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 3).getDisplayValues().forEach(function(r) {
      const k = String(r[0] || '').trim(); if (!k || SETTINGS_HIDDEN.test(k)) return;
      items.push({ key: k, value: String(r[1] === undefined ? '' : r[1]), desc: String(r[2] || ''), readonly: SETTINGS_READONLY.indexOf(k) !== -1, numeric: SETTINGS_NUMERIC.indexOf(k) !== -1, yesno: SETTINGS_YESNO.indexOf(k) !== -1 });
    });
  } catch (e) { return { success: false, error: 'Лист НАСТРОЙКИ не прочитан: ' + e.message }; }
  const prices = [];
  try { const ps = priceSheet_(false); if (ps && ps.getLastRow() >= 2) ps.getRange(2, 1, ps.getLastRow() - 1, 3).getDisplayValues().forEach(function(r) { if (String(r[1] || '').trim()) prices.push({ n: r[0], name: String(r[1]).trim(), price: r[2] }); }); } catch (e) {}
  return { success: true, items: items, prices: prices, months: cfg.months, currentMonth: cfg.currentMonth };
}
function setSetting(role, password, key, value) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  key = String(key || '').trim(); value = String(value === undefined || value === null ? '' : value).trim();
  if (!key || SETTINGS_HIDDEN.test(key)) return { success: false, error: 'Этот параметр здесь не меняется.' };
  if (SETTINGS_READONLY.indexOf(key) !== -1) return { success: false, error: 'Параметр «' + key + '» меняется только при переносе данных.' };
  if (key === 'ТЕКУЩИЙ_МЕСЯЦ' && (cfg.months || []).indexOf(value) === -1) return { success: false, error: 'Месяц должен точно совпадать с названием в листе ЖУРНАЛЫ: ' + (cfg.months || []).join(', ') };
  if (SETTINGS_NUMERIC.indexOf(key) !== -1 && !/^\d+$/.test(value)) return { success: false, error: 'Нужно целое число.' };
  if (key === 'ФОТ_ПО_УМОЛЧАНИЮ') { const n = parseNum_(value); if (!(n > 0 && n <= 1)) return { success: false, error: 'Коэффициент ФОТ — число от 0 до 1, например 0,36.' }; }
  if (SETTINGS_YESNO.indexOf(key) !== -1 && ['ДА', 'НЕТ'].indexOf(value.toUpperCase()) === -1) return { success: false, error: 'Допустимо только ДА или НЕТ.' };
  if (key === 'ЯЗЫК_СООБЩЕНИЙ' && value.toUpperCase() !== 'KG') return { success: false, error: 'По правилу центра сообщения родителям уходят только на кыргызском (KG).' };
  if (SETTINGS_YESNO.indexOf(key) !== -1) value = value.toUpperCase();
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS); if (!sh) return { success: false, error: 'Лист НАСТРОЙКИ не найден.' };
  let row = 0, was = '';
  if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 2).getDisplayValues().forEach(function(r, i) { if (!row && String(r[0]).trim() === key) { row = i + 2; was = String(r[1] || ''); } });
  if (!row) return { success: false, error: 'Параметр «' + key + '» не найден в листе НАСТРОЙКИ.' };
  if (was === value) return { success: true, message: 'Без изменений.', value: value };
  sh.getRange(row, 2).setNumberFormat('@').setValue(value);
  try { CacheService.getScriptCache().removeAll([CONFIG_CACHE_KEY, 'rooms', 'nmodes', 'rmodes']); } catch (e) {}
  logChanges_('руководитель', '', '', '(настройки)', [[key, was, value]]);
  return { success: true, message: 'Сохранено: ' + key + '.', value: value };
}
function setLevelPrice(role, password, name, price) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const n = Math.round(parseNum_(price)); if (!(n >= 0)) return { success: false, error: 'Цена — число, не меньше 0.' };
  const sh = priceSheet_(false); if (!sh || sh.getLastRow() < 2) return { success: false, error: 'Лист ПРАЙС не найден.' };
  let row = 0, was = '';
  sh.getRange(2, 2, sh.getLastRow() - 1, 2).getDisplayValues().forEach(function(r, i) { if (!row && priceKey_(r[0]) === priceKey_(name)) { row = i + 2; was = String(r[1] || ''); } });
  if (!row) return { success: false, error: 'Уровень «' + name + '» не найден в прайсе.' };
  sh.getRange(row, 3).setValue(n);
  try { CacheService.getScriptCache().removeAll(['ref:prices', 'ref:levels', CONFIG_CACHE_KEY]); } catch (e) {}
  logChanges_('руководитель', '', '', '(прайс)', [['Цена уровня ' + String(name).trim(), was, String(n)]]);
  return { success: true, message: 'Цена уровня «' + String(name).trim() + '» сохранена: ' + n + ' сом. Действует с ближайшего пересчёта; стоимость уже начисленного месяца не меняется задним числом.' };
}

/** Ссылки для выгрузки всей базы в Excel (руководитель) */
function getExportLinks(role, password) {
  const cfg = getConfig_(); if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const ss = SpreadsheetApp.getActiveSpreadsheet(), id = ss.getId();
  return { success: true, name: ss.getName(), sheets: ss.getSheets().length, xlsx: 'https://docs.google.com/spreadsheets/d/' + id + '/export?format=xlsx', edit: 'https://docs.google.com/spreadsheets/d/' + id + '/edit' };
}

/** Лист ВХОДЫ: кто и когда входил */
function logLogin_(role, name) {
  try {
    // один вход — одна запись: повторный вход того же пользователя в течение 10 минут не пишется
    const lc = CacheService.getScriptCache(), lk = 'login|' + role + '|' + String(name || '');
    if (lc.get(lk)) return;
    lc.put(lk, '1', 600);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName('ВХОДЫ');
    if (!sh) { sh = ss.insertSheet('ВХОДЫ'); sh.getRange(1, 1, 1, 3).setValues([['Время', 'Роль', 'Кто']]); styleConfigSheet_(sh, 3, [150, 130, 220]); }
    sh.appendRow([new Date(), role, String(name || '')]);
    if (sh.getLastRow() > 5000) sh.deleteRows(2, 500);
  } catch (e) {}
}
function lastLogins_() {
  const out = {};
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('ВХОДЫ');
    if (!sh || sh.getLastRow() < 2) return out;
    const from = Math.max(2, sh.getLastRow() - 2000);
    sh.getRange(from, 1, sh.getLastRow() - from + 1, 3).getValues().forEach(function(r) { const k = String(r[1]) + '|' + String(r[2]); out[k] = r[0] instanceof Date ? Utilities.formatDate(r[0], TZ, 'dd.MM.yyyy HH:mm') : String(r[0]); });
  } catch (e) {}
  return out;
}
function roleTitle_(r) { return r === 'director' ? 'руководитель' : r === 'reception' ? 'ресепшн' : r === 'admin' ? 'кассир' : 'администратор'; }
const ACADEMIC_DENY = { success: false, error: 'Недоступно для этой роли.' };   // роль «учебная часть» упразднена, проверки оставлены до этапа чистки
const BOOKS_DENY = { success: false, error: 'Недоступно для этой роли.' };   // роль «учёт книг» упразднена, проверки оставлены до этапа чистки
/** Обнулить денежные поля в сводке для учебной части */
function stripMoney_(o) {
  const KEYS = { acc: 1, paid: 1, debt: 1, price: 1, efot: 1, ffot: 1, list: 1, p: 1, b: 1, tu: 1, fot: 1, income: 1, sum: 1, amount: 1, total: 1, avg: 1, check: 1, pct: 1, fotPct: 1, baseTuition: 1, tuition: 1, balance: 1, prepay: 1, remaining: 1 };
  const walk = function(x) {
    if (Array.isArray(x)) { x.forEach(walk); return; }
    if (!x || typeof x !== 'object') return;
    Object.keys(x).forEach(function(k) { if (KEYS[k] && typeof x[k] === 'number') x[k] = 0; else if (x[k] && typeof x[k] === 'object') walk(x[k]); });
  };
  walk(o);
  return o;
}

/**
 * Вход сотрудника по коду. Роль определяет сам код: руководитель, кассир (admin) или ресепшн.
 * role = 'auto' (или пусто) — определить по коду; конкретная роль оставлена для совместимости и тогда должна совпасть.
 */
function authenticateStaff(role, password) {
  if (authThrottled_()) return AUTH_WAIT;
  const cfg = getConfig_();
  role = String(role || 'auto');
  const actual = staffRole_(cfg, password);
  if (!actual) { authFail_(); return { success: false, error: 'Неверный код доступа или вход заблокирован.' }; }
  if (role !== 'auto' && actual !== role) return { success: false, error: 'Этот код относится к другой роли.' };
  hashUpgradeStaff_(actual, password);
  logLogin_(actual, roleTitle_(actual));
  return { success: true, role: actual, name: staffName_(actual), currentMonth: cfg.currentMonth, months: cfg.months };
}
// ===== Коды доступа: хранение хешем, стойкость, уникальность =====
// В таблице хранится не сам код, а его хеш (SHA-256 с секретной солью в свойствах скрипта): прочитать код из таблицы нельзя.
// Коды, записанные в открытом виде (старые или вписанные вручную в лист), продолжают работать и при первом успешном входе заменяются хешем.
function codeSalt_() { const p = PropertiesService.getScriptProperties(); let v = p.getProperty('CODE_SALT'); if (!v) { v = Utilities.getUuid() + Utilities.getUuid(); p.setProperty('CODE_SALT', v); } return v; }
function codeHash_(code) { const raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, codeSalt_() + '|' + String(code || ''), Utilities.Charset.UTF_8); return 'h:' + raw.map(function(b) { const v = (b + 256) % 256; return (v < 16 ? '0' : '') + v.toString(16); }).join(''); }
function isCodeHash_(v) { return /^h:[0-9a-f]{64}$/.test(String(v || '').trim()); }
function codeMatches_(stored, input) { stored = String(stored || '').trim(); input = String(input || '').trim(); if (!stored || !input) return false; return isCodeHash_(stored) ? codeHash_(input) === stored : stored === input; }
/** Слабый код: одинаковые цифры, цифры подряд, повторяющаяся пара, похоже на год. Возвращает причину или '' */
function codeWeak_(code) {
  const c = String(code || '');
  if (/^(\d)\1+$/.test(c)) return 'одинаковые цифры';
  let asc = true, desc = true; for (let i = 1; i < c.length; i++) { const d = c.charCodeAt(i) - c.charCodeAt(i - 1); if (d !== 1) asc = false; if (d !== -1) desc = false; }
  if (c.length >= 3 && (asc || desc)) return 'цифры подряд';
  if (c.length >= 4 && c.length % 2 === 0 && /^(\d\d)\1+$/.test(c)) return 'повторяющаяся пара';
  if (/^(19|20)\d\d$/.test(c)) return 'похоже на год';
  return '';
}
/** Правила кода: сотрудник — 6–10 цифр, преподаватель — 4–10; только цифры; не слабый. Возвращает текст ошибки или '' */
function codeRules_(kind, code) {
  const c = String(code || '').trim(), min = kind === 'staff' ? 6 : 4;
  if (!/^\d+$/.test(c)) return 'Код — только цифры, без букв и пробелов.';
  if (c.length > 10) return 'Код — не длиннее 10 цифр.';
  if (c.length < min) return 'Код — не короче ' + min + ' цифр' + (kind === 'staff' ? ': сотрудник входит без фамилии, короткий код легко подобрать.' : '.');
  const w = codeWeak_(c); if (w) return 'Слишком простой код — ' + w + '. Возьмите цифры вразнобой.';
  return '';
}
/** Занят ли код кем-то ещё (преподаватели и все сотрудники), кроме самого владельца */
function codeTaken_(cfg, code, exceptKind, exceptName) {
  if (cfg.teachers.some(function(t) { return !(exceptKind === 'teacher' && nameKey_(t.short) === nameKey_(exceptName)) && codeMatches_(t.password, code); })) return true;
  return [['director', cfg.directorPassword], ['admin', cfg.adminPassword], ['reception', cfg.receptionPassword]].some(function(p) { return exceptKind !== p[0] && codeMatches_(p[1], code); });
}
function writeSetting_(key, value) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS); if (!sh) return false; let done = false;
  if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) { if (!done && String(r[0]).trim() === key) { sh.getRange(i + 2, 2).setNumberFormat('@').setValue(value); done = true; } });
  if (!done) sh.appendRow([key, value, '']);
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {} return true;
}
/** Код вписан в лист в открытом виде → после успешного входа сохранить хеш (дата смены пароля не трогается) */
function hashUpgradeStaff_(role, code) {
  try { const key = role === 'director' ? 'ПАРОЛЬ_РУКОВОДИТЕЛЯ' : role === 'admin' ? 'ПАРОЛЬ_АДМИНИСТРАТОРА' : role === 'reception' ? 'ПАРОЛЬ_РЕСЕПШН' : ''; if (!key) return;
    const cfg = getConfig_(); const cur = role === 'director' ? cfg.directorPassword : role === 'admin' ? cfg.adminPassword : cfg.receptionPassword;
    if (isCodeHash_(cur) || !codeMatches_(cur, code)) return; writeSetting_(key, codeHash_(code)); } catch (e) {}
}
function hashUpgradeTeacher_(short, code) {
  try { const cfg = getConfig_(); const t = findTeacherCfg_(cfg, short); if (!t || isCodeHash_(t.password) || !codeMatches_(t.password, code)) return;
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_TEACHERS); if (!sh || sh.getLastRow() < 2) return;
    sh.getRange(2, 2, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) { if (nameKey_(r[0]) === nameKey_(t.short)) sh.getRange(i + 2, 4).setNumberFormat('@').setValue(codeHash_(code)); });
    try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {} } catch (e) {}
}
/** Защита от подбора: после AUTH_MAX_FAILS неверных попыток за 10 минут вход приостанавливается на 10 минут (для всех, на весь сервер) */
const AUTH_MAX_FAILS = 12;
function authThrottled_() { try { return Number(CacheService.getScriptCache().get('auth_fail') || 0) >= AUTH_MAX_FAILS; } catch (e) { return false; } }
function authFail_() {
  try {
    const c = CacheService.getScriptCache(); const n = Number(c.get('auth_fail') || 0) + 1; c.put('auth_fail', String(n), 600);
    if (n === AUTH_MAX_FAILS) logChanges_('система', '', '', '(вход)', [['Неверные попытки входа', '', n + ' за 10 минут — вход приостановлен на 10 минут']]);
  } catch (e) {}
}
const AUTH_WAIT = { success: false, error: 'Слишком много неверных попыток входа. Подождите 10 минут и попробуйте снова.' };
/** Название роли сотрудника для экрана */
function staffName_(r) { return r === 'director' ? 'Руководитель' : r === 'reception' ? 'Ресепшн' : 'Кассир'; }

/** Совместимость: любой пароль сотрудника (администратор или руководитель) */
function authenticateAdmin(password) {
  const cfg = getConfig_();
  const role = staffRole_(cfg, password);
  if (!role) return { success: false, error: 'Неверный код доступа.' };
  return { success: true, role: role, name: staffName_(role), currentMonth: cfg.currentMonth, months: cfg.months };
}


/** Список преподавателей, у которых есть журнал за месяц */
function getAdminTeachers(password, month) {
  const auth = authenticateAdmin(password);
  if (!auth.success) return auth;

  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;

  const teachers = [];
  if (cfg.useDb) {
    const seen = {};
    dbGroupsOfMonth_(month).forEach(function(g) {
      const short = String(g.row[2]);
      if (seen[short]) return; seen[short] = true;
      const t = findTeacherCfg_(cfg, short);
      teachers.push({ name: short, full: t ? t.full : '', journalId: '', journalName: 'база' });
    });
    return { success: true, month: month, teachers: teachers };
  }
  getJournalsForMonth_(cfg, month).forEach(function(j) {
    const t = findTeacherCfg_(cfg, j.teacher);
    teachers.push({
      name: j.teacher,
      full: t ? t.full : '',
      journalId: j.paymentsId,
      journalName: j.name
    });
  });

  return { success: true, month: month, teachers: teachers };
}


/** Проверка пароля + поиск преподавателя и его журнала за месяц */
function resolveAdminJournal_(password, month, teacherName) {
  try { const __r0 = staffRole_(getConfig_(), password); if (__r0 === 'academic') return { error: ACADEMIC_DENY }; if (__r0 === 'books') return { error: BOOKS_DENY }; } catch (e) {}
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) {
    return { error: { success: false, error: 'Неверный код доступа.' } };
  }
  month = String(month || '').trim() || cfg.currentMonth;
  teacherName = String(teacherName || '').trim();

  const teacher = findTeacherCfg_(cfg, teacherName);
  if (!teacher) return { error: { success: false, error: 'Преподаватель не найден.' } };

  const journal = findJournal_(cfg, month, teacherName);
  if (!journal) return { error: { success: false, error: 'Журнал «' + teacherName + '» за ' + month + ' не найден в листе ЖУРНАЛЫ.' } };

  return { cfg: cfg, month: month, teacher: teacher, journal: journal };
}


function getAdminGroups(password, month, teacherName) {
  // режим БАЗА: группы и число учеников — из базы, а не из старых журналов
  { const cfg0 = getConfig_(); if (cfg0.useDb) {
      if (staffRole_(cfg0, password) === 'academic') return ACADEMIC_DENY;
      if (!staffRole_(cfg0, password)) return { success: false, error: 'Неверный код доступа.' };
      const m = String(month || '').trim() || cfg0.currentMonth, t = findTeacherCfg_(cfg0, teacherName);
      if (!t) return { success: false, error: 'Преподаватель не найден.' };
      const R = dbTable_(DB_ROSTER, DB_ROSTER_H), byGid = {}; R.rows.forEach(function(r) { (byGid[String(r[RO.gid])] = byGid[String(r[RO.gid])] || []).push(r); });
      const groups = dbGroupsOfMonth_(m).filter(function(g) { return nameKey_(g.row[GR.teacher]) === nameKey_(t.short) && String(g.row[GR.status]) !== 'скрыта'; })
        .map(function(g) { return { name: 'Группа ' + g.row[GR.num], studentsCount: (byGid[String(g.row[GR.id])] || []).length }; });
      return { success: true, month: m, teacher: { name: t.short, full: t.full, journalName: 'база' }, groups: groups };
  } }
  const ctx = resolveAdminJournal_(password, month, teacherName);
  if (ctx.error) return ctx.error;

  const journalSS = SpreadsheetApp.openById(ctx.journal.paymentsId);
  return {
    success: true,
    month: ctx.month,
    teacher: publicTeacher_(ctx.teacher, ctx.journal),
    groups: readJournalGroups_(journalSS)
  };
}


function openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow) {

  const ctx = resolveAdminJournal_(password, month, teacherName);
  if (ctx.error) return ctx;

  groupName = String(groupName || '').trim();
  if (!isValidGroupName_(groupName)) return { error: { success: false, error: 'Неверная группа.' } };

  paymentRow = Number(paymentRow);
  if (!isValidPaymentRow_(paymentRow)) return { error: { success: false, error: 'Неверная строка оплаты.' } };

  const journalSS = SpreadsheetApp.openById(ctx.journal.paymentsId);
  const sheet = journalSS.getSheetByName(groupName);
  if (!sheet) return { error: { success: false, error: 'Лист "' + groupName + '" не найден.' } };

  const studentName = String(sheet.getRange(paymentRow, COL_NAME).getDisplayValue()).trim();
  if (!studentName) return { error: { success: false, error: 'В этой строке нет ученика.' } };

  return { cfg: ctx.cfg, month: ctx.month, teacher: ctx.teacher, journal: ctx.journal,
           groupName: groupName, sheet: sheet, paymentRow: paymentRow, studentName: studentName };
}


function cfgTeachersShort_() {
  try { return getConfig_().teachers.map(function(t) { return { short: t.short, full: t.full }; }); } catch (e) { return []; }
}

function readPaymentRow_(sheet, row) {
  const width = COL_LESSONS - COL_NAME + 1;
  const values = sheet.getRange(row, COL_NAME, 1, width).getValues()[0];
  const display = sheet.getRange(row, COL_NAME, 1, width).getDisplayValues()[0];
  const idx = function(col) { return col - COL_NAME; };

  let lessons = Number(values[idx(COL_LESSONS)]) || LESSONS_PER_MONTH;
  if (lessons < 1 || lessons > LESSONS_PER_MONTH) lessons = LESSONS_PER_MONTH;

  return {
    discount: Number(values[idx(COL_DISCOUNT)]) || 0,
    tuition: Math.round(Number(values[idx(COL_TUITION)]) || 0),
    paid: Number(values[idx(COL_PAID)]) || 0,
    balance: balanceOf_(values[idx(COL_TUITION)], values[idx(COL_PAID)]),
    receipt: String(display[idx(COL_RECEIPT)] || '').trim(),
    paymentDate: String(display[idx(COL_DATE)] || '').trim(),
    lessons: lessons
  };
}


function getAdminGroupPayments(password, month, teacherName, groupName) {
  if (getConfig_().useDb) return getAdminGroupPaymentsDb_(password, month, teacherName, groupName);

  const ctx = resolveAdminJournal_(password, month, teacherName);
  if (ctx.error) return ctx.error;

  groupName = String(groupName || '').trim();
  if (!isValidGroupName_(groupName)) return { success: false, error: 'Неверная группа.' };

  const journalSS = SpreadsheetApp.openById(ctx.journal.paymentsId);
  const sheet = journalSS.getSheetByName(groupName);
  if (!sheet) return { success: false, error: 'Лист "' + groupName + '" не найден.' };

  const level = String(sheet.getRange(GROUP_LEVEL_CELL).getDisplayValue() || '').trim();
  const ps = syncGroupPrice_(sheet, readPrices_(), level, sheet.getRange(GROUP_PRICE_CELL).getValue());
  const baseTuition = Math.round(parseNum_(ps.price)) || 0;
  const priceWarning = ps.found ? '' : (level && !/не назнач/i.test(level) ? 'Уровень «' + level + '» не найден в листе ПРАЙС — стоимость взята из журнала.' : 'Уровень группы не выбран.');

  const studentsData = sheet.getRange(STUDENTS_RANGE).getDisplayValues();
  const width = COL_LESSONS - COL_NAME + 1;
  const payValues = sheet.getRange(PAY_FIRST_ROW, COL_NAME, PAY_ROWS, width).getValues();
  const payDisplay = sheet.getRange(PAY_FIRST_ROW, COL_NAME, PAY_ROWS, width).getDisplayValues();
  const idx = function(col) { return col - COL_NAME; };

  // посещаемость: строки 12–29, столбцы A..P
  let attGrid = [];
  try { attGrid = sheet.getRange(1, 1, 29, ATT_FIRST_COL - 1 + ATT_COLS).getValues(); } catch (e) {}
  const lessonsHeld = lessonsHeldFromGrid_(attGrid);

  const discounts = readDiscounts_();
  const prepayMap = prepayAvailableMap_();
  const deferMap = deferralsFor_(ctx.month, ctx.teacher.short, ctx.groupName);
  let noticeCells = [];
  try { noticeCells = sheet.getRange(PAY_FIRST_ROW, 7, PAY_ROWS, 9).getDisplayValues(); } catch (e) {}   // G..O: G=увед.1, K=увед.2, O=увед.3
  const notices = { 1: 0, 3: 0, 5: 0 };
  const payments = [];
  for (let i = 0; i < PAY_ROWS; i++) {
    const studentName = String(studentsData[i][0] || '').trim();
    const whatsapp = String(studentsData[i][15] || '').trim();
    if (studentName === '' && whatsapp === '') continue;
    const nc = noticeCells[i] || [];
    const n1 = String(nc[0] || '').trim(), n2 = String(nc[4] || '').trim(), n3 = String(nc[8] || '').trim();
    if (n1) notices[1]++; if (n2) notices[3]++; if (n3) notices[5]++;

    let lessons = Number(payValues[i][idx(COL_LESSONS)]) || LESSONS_PER_MONTH;
    if (lessons < 1 || lessons > LESSONS_PER_MONTH) lessons = LESSONS_PER_MONTH;

    payments.push({
      number: payments.length + 1,
      studentName: studentName,
      whatsapp: whatsapp,
      discount: Number(payValues[i][idx(COL_DISCOUNT)]) || 0,
      tuition: Math.round(Number(payValues[i][idx(COL_TUITION)]) || 0),
      paid: Number(payValues[i][idx(COL_PAID)]) || 0,
      balance: balanceOf_(payValues[i][idx(COL_TUITION)], payValues[i][idx(COL_PAID)]),
      receipt: String(payDisplay[i][idx(COL_RECEIPT)] || '').trim(),
      paymentDate: String(payDisplay[i][idx(COL_DATE)] || '').trim(),
      lessons: lessons,
      attended: attGrid.length ? attendanceFromGrid_(attGrid, i) : 0,
      baseTuition: baseTuition,
      disc: publicDiscount_(findDiscountFor_(discounts, studentName, whatsapp)),
      notices: [n1, n2, n3],
      prepay: prepayMap[studentKey_(studentName)] || 0,
      defer: deferMap[studentKey_(studentName)] || null,
      paymentRow: PAY_FIRST_ROW + i
    });
  }

  const ld = lessonDates_(sheet);
  const dateDisp = sheet.getRange(ATT_DATES_ROW, ATT_FIRST_COL, 2, ATT_COLS).getDisplayValues();
  return {
    success: true,
    month: ctx.month,
    teacher: publicTeacher_(ctx.teacher, ctx.journal),
    group: groupName,
    level: level,
    baseTuition: baseTuition,
    lessonsPerMonth: LESSONS_PER_MONTH,
    lessonsHeld: lessonsHeld,
    dates: dateDisp[0].map(function(v) { return String(v || '').trim(); }),
    weekdays: dateDisp[1].map(function(v) { return String(v || '').trim(); }),
    datesIso: ld.iso,
    todayLesson: ld.todayLesson,
    today: ld.todayIso,
    notices: notices,
    noticeWindows: { 1: noticeWindow_(ctx.cfg, sheet, 1), 2: noticeWindow_(ctx.cfg, sheet, 2), 3: noticeWindow_(ctx.cfg, sheet, 3) },
    autoNotices: noticeModeFor_(ctx.cfg, ctx.month, ctx.teacher.short, ctx.groupName) === 'auto',
    autoGlobal: ctx.cfg.autoNotices,
    autoHour: ctx.cfg.autoHour,
    remindersOn: reminderModeFor_(ctx.cfg, ctx.month, ctx.teacher.short, ctx.groupName) === 'on',
    remindersGlobal: ctx.cfg.remindersOn,
    remindHour: ctx.cfg.remindHour,
    lessonToday: ld.todayLesson > 0,
    priceWarning: priceWarning,
    teachersList: cfgTeachersShort_(),
    payments: payments
  };
}


function updateAdminDiscount(password, month, teacherName, groupName, paymentRow, value) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  return { success: false, error: 'Скидки оформляются через диалог скидки (двойной щелчок по значку в столбце «Скидка»).' };
}

function updateAdminDiscountLegacy_(password, month, teacherName, groupName, paymentRow, value) {
  const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
  if (ctx.error) return ctx.error;

  const discount = parseNum_(value);
  if (isNaN(discount) || discount < 0 || discount > 100) return { success: false, error: 'Скидка: введите число от 0 до 100.' };

  ctx.sheet.getRange(ctx.paymentRow, COL_DISCOUNT).setValue(discount);
  SpreadsheetApp.flush();

  const row = readPaymentRow_(ctx.sheet, ctx.paymentRow);
  row.success = true; row.studentName = ctx.studentName; row.message = 'Скидка изменена. Стоимость пересчитана.';
  return row;
}


function updateAdminLessons(password, month, teacherName, groupName, paymentRow, lessons) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (getConfig_().useDb) return updateAdminLessonsDb_(password, month, teacherName, groupName, paymentRow, lessons);
  const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
  if (ctx.error) return ctx.error;

  lessons = parseNum_(lessons);
  if (!Number.isInteger(lessons) || lessons < 1 || lessons > LESSONS_PER_MONTH) {
    return { success: false, error: 'Количество занятий должно быть от 1 до ' + LESSONS_PER_MONTH + '.' };
  }

  ctx.sheet.getRange(ctx.paymentRow, COL_LESSONS).setValue(lessons);
  SpreadsheetApp.flush();

  const row = readPaymentRow_(ctx.sheet, ctx.paymentRow);
  row.success = true; row.studentName = ctx.studentName; row.message = 'Количество занятий изменено. Стоимость пересчитана.';
  return row;
}


function updateAdminPaid(password, month, teacherName, groupName, paymentRow, value) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
  if (ctx.error) return ctx.error;

  const paid = parseNum_(value);
  if (isNaN(paid) || paid < 0) return { success: false, error: 'Оплачено: введите корректную сумму.' };

  ctx.sheet.getRange(ctx.paymentRow, COL_PAID).setValue(Math.round(paid));
  SpreadsheetApp.flush();

  const row = readPaymentRow_(ctx.sheet, ctx.paymentRow);
  row.success = true; row.studentName = ctx.studentName; row.message = 'Оплата сохранена. Остаток пересчитан.';
  return row;
}


/**
 * Сохранить оплату одной кнопкой: сумма + квитанция + дата.
 * Сначала проверка квитанции по всем журналам; при дубле НИЧЕГО не сохраняется.
 */
function savePaymentRow(password, month, teacherName, groupName, paymentRow, payload) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  if (getConfig_().useDb) return savePaymentRowDb_(password, month, teacherName, groupName, paymentRow, payload);
  const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
  if (ctx.error) return ctx.error;
  payload = payload || {};

  const paid = Math.round(parseNum_(payload.paid));
  if (isNaN(paid) || paid < 0) return { success: false, error: 'Оплачено: введите корректную сумму.' };
  const receipt = String(payload.receipt || '').trim();
  const date = String(payload.date || '').trim();
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { success: false, error: 'Неверный формат даты.' };
  if (paid > 0 && !receipt) return { success: false, error: 'Укажите номер квитанции (или НАЛИЧНЫЕ).' };
  if (paid > 0 && !date) return { success: false, error: 'Укажите дату оплаты.' };
  if (receipt && !date) return { success: false, error: 'Укажите дату оплаты.' };

  const sheet = ctx.sheet, row = ctx.paymentRow;
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    // стоимость и переплата → предоплата
    const tuition = Math.round(parseNum_(sheet.getRange(row, COL_TUITION).getValue()));
    const prevPaid = Math.round(parseNum_(sheet.getRange(row, COL_PAID).getValue()));
    const prevReceipt = String(sheet.getRange(row, COL_RECEIPT).getDisplayValue() || '').trim();
    let excess = 0;
    if (tuition > 0 && paid > tuition) {
      excess = paid - tuition;
      if (!(payload.prepayOk === true || String(payload.prepayOk) === 'true')) return { success: false, needPrepayConfirm: true, excess: excess, tuition: tuition, error: 'Сумма больше стоимости обучения на ' + excess + ' сом.' };
    }
    const paidApplied = excess ? tuition : paid;

    // контроль общей суммы по квитанции (одна квитанция на нескольких детей)
    let rcRemaining = 0;
    if (receipt) {
      const rc = receiptCheck_(ctx.cfg, receipt, paid, payload.receiptTotal, { receipt: prevReceipt, amount: prevPaid }, ctx.studentName, ctx.month);
      if (rc.error) return { success: false, receiptLimit: true, error: rc.error, receipt: receipt, total: rc.total, distributed: rc.distributed, remaining: rc.remaining };
      rcRemaining = Math.max(0, Math.round(rc.remaining || 0));
    }

    sheet.getRange(row, COL_PAID).setValue(paidApplied);
    if (receipt) sheet.getRange(row, COL_RECEIPT).setValue(receipt); else sheet.getRange(row, COL_RECEIPT).clearContent();
    if (date) {
      const p = date.split('-');
      sheet.getRange(row, COL_DATE).setValue(new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]))).setNumberFormat('dd.MM.yyyy');
    } else {
      sheet.getRange(row, COL_DATE).clearContent();
    }
    SpreadsheetApp.flush();
    {
      const wa = String(sheet.getRange(14 + (row - PAY_FIRST_ROW), 17).getDisplayValue() || '').trim();
      syncPrepayForPayment_(ctx.cfg || getConfig_(), ctx.studentName, ctx.groupName, ctx.teacher.short, wa, receipt, date, excess, ctx.month, 'кассир');
    }

    const r = readPaymentRow_(sheet, row);
    r.success = true; r.studentName = ctx.studentName; r.message = 'Оплата сохранена.' + (excess ? ' Переплата ' + excess + ' сом записана в предоплаты.' : '');
    r.excess = excess; r.receiptRemaining = rcRemaining; r.receipt = receipt;
    if (rcRemaining > 0) r.linked = linkedStudents_(ctx.cfg, ctx.month, ctx.studentName, String(sheet.getRange(14 + (row - PAY_FIRST_ROW), 17).getDisplayValue() || ''), { teacher: ctx.teacher.short, group: ctx.groupName, row: row });
    return r;
  } catch (e) {
    return { success: false, error: 'Ошибка сохранения: ' + e.message };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}

// ---------- Квитанции ----------

/**
 * Разбирает ячейку «Квитанция» строки оплаты.
 * В ней может стоять номер, несколько номеров через «;» или «,» и пометка
 * «ПРЕДОПЛАТА 2500 сом (Сентябрь 2026)» — это деньги не из квитанции, а из предоплаты.
 * Возвращает { recs: [номера], prepaid: сумма, зачтённая из предоплаты }.
 */
function rcptParseReceiptCell_(value) {
  const recs = [];
  let prepaid = 0;
  String(value || '').split(';').forEach(function(part) {
    if (/предоплат/i.test(part)) {
      const m = part.match(/\d[\d\s]*\s*сом/gi);
      if (m) m.forEach(function(x) { prepaid += Number(String(x).replace(/[^\d]/g, '')) || 0; });
      return;
    }
    part.split(',').forEach(function(one) {
      const k = normalizeReceiptNumber_(one);
      if (k && !isCashMarker_(k)) recs.push(k);
    });
  });
  return { recs: recs, prepaid: prepaid };
}

/** Записанная разбивка «квитанция=сумма; квитанция=сумма» → { квитанция: сумма } */
function rcptSplitParse_(text) {
  const out = {};
  String(text || '').split(';').forEach(function(part) {
    const pair = String(part).split('=');
    if (pair.length < 2) return;
    const k = normalizeReceiptNumber_(pair[0]);
    const v = Math.round(parseNum_(pair[1]));
    if (k && v > 0) out[k] = (out[k] || 0) + v;
  });
  return out;
}
function rcptSplitFormat_(map) {
  return Object.keys(map || {}).filter(function(k) { return map[k] > 0; })
    .map(function(k) { return k + '=' + Math.round(map[k]); }).join('; ');
}

/**
 * Как разложить оплату строки по квитанциям, если их в ячейке несколько.
 * Делить поровну нельзя: обычно первая квитанция — основная оплата, вторая — доплата.
 * Каждая квитанция берёт не больше своей суммы из реестра, остаток уходит следующей.
 * used — сколько уже разобрано по этим квитанциям другими строками.
 */
function rcptAllocateRow_(value, paid, totals, used, splitText) {
  const info = rcptParseReceiptCell_(value);
  const out = [];
  let left = Math.max(0, Math.round(parseNum_(paid)) - info.prepaid);
  if (!info.recs.length) return out;
  // если разбивка записана при оплате — берём её, гадать не нужно
  const split = rcptSplitParse_(splitText);
  const keys = Object.keys(split);
  if (keys.length) {
    const sum = keys.reduce(function(a, k) { return a + split[k]; }, 0);
    const known = keys.every(function(k) { return info.recs.indexOf(k) !== -1; });
    if (known && sum === left) return keys.map(function(k) { return { rec: k, amount: split[k] }; });
  }
  if (info.recs.length === 1) { out.push({ rec: info.recs[0], amount: left }); return out; }
  info.recs.forEach(function(k, i) {
    let give;
    if (i === info.recs.length - 1) give = left;
    else {
      const t = (totals && totals[k] !== undefined && totals[k] !== null) ? Math.max(0, Math.round(totals[k]) - Math.round((used && used[k]) || 0)) : null;
      give = (t === null) ? Math.round(left / (info.recs.length - i)) : Math.min(left, t);
    }
    give = Math.max(0, Math.min(Math.round(give), left));
    out.push({ rec: k, amount: give });
    left -= give;
  });
  return out;
}

/** Суммы квитанций из реестра — нужны, чтобы правильно разложить оплату по нескольким квитанциям */
function rcptTotalsMap_() {
  const out = {};
  try { const reg = receiptRegistry_(); Object.keys(reg).forEach(function(k) { out[k] = reg[k].total; }); } catch (e) {}
  return out;
}

function normalizeReceiptNumber_(value) {
  return String(value || '').trim().toUpperCase().replace(/[^A-ZА-ЯЁ0-9]/g, '');
}

function isCashMarker_(normalized) {
  // «МБ2300», «м62500» (МБанк + сумма) — не номера квитанций, а пометки; для реестра они как наличные:
  // одну и ту же пометку ставят десяткам учеников, и её «сумма» в реестре ничего не значит
  if (/^(МБ|М6|MB|МБАНК|MBANK|МБАНКА)\d*$/.test(String(normalized || ''))) return true;
  for (let i = 0; i < CASH_MARKERS.length; i++) {
    if (normalizeReceiptNumber_(CASH_MARKERS[i]) === normalized) return true;
  }
  return false;
}

/**
 * Ищет квитанцию во ВСЕХ журналах из листа ЖУРНАЛЫ (все месяцы),
 * Группа 1–10, T36:T51. Одно чтение B36:T51 на лист.
 */
function findReceiptAcrossAllJournals_(cfg, receiptNumber, currentJournalId, currentGroupName, currentPaymentRow) {

  const normalized = normalizeReceiptNumber_(receiptNumber);
  if (!normalized || isCashMarker_(normalized)) return null;

  const cols = COL_RECEIPT - COL_NAME + 1;
  const iDate = COL_DATE - COL_NAME;
  const iReceipt = COL_RECEIPT - COL_NAME;

  const seenIds = {};

  for (let t = 0; t < cfg.journals.length; t++) {
    const j = cfg.journals[t];
    if (seenIds[j.paymentsId]) continue;
    seenIds[j.paymentsId] = true;

    const ss = SpreadsheetApp.openById(j.paymentsId);

    for (let g = 1; g <= 10; g++) {
      const groupName = 'Группа ' + g;
      const sheet = ss.getSheetByName(groupName);
      if (!sheet) continue;

      const data = sheet.getRange(PAY_FIRST_ROW, COL_NAME, PAY_ROWS, cols).getDisplayValues();
      for (let i = 0; i < data.length; i++) {
        const found = normalizeReceiptNumber_(data[i][iReceipt]);
        if (!found || found !== normalized) continue;

        const foundRow = PAY_FIRST_ROW + i;
        if (j.paymentsId === currentJournalId && groupName === currentGroupName && foundRow === Number(currentPaymentRow)) continue;

        return {
          found: true,
          receipt: data[i][iReceipt],
          student: data[i][0],
          teacher: j.teacher,
          month: j.month,
          group: groupName,
          date: data[i][iDate],
          row: foundRow
        };
      }
    }
  }
  return null;
}


function saveAdminReceipt(password, month, teacherName, groupName, paymentRow, receiptNumber, paymentDate) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется

  const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
  if (ctx.error) return ctx.error;

  const sheet = ctx.sheet;
  const row = ctx.paymentRow;

  receiptNumber = String(receiptNumber || '').trim();
  paymentDate = String(paymentDate || '').trim();

  if (receiptNumber === '') {
    sheet.getRange(row, COL_RECEIPT).clearContent();
    sheet.getRange(row, COL_DATE).clearContent();
    SpreadsheetApp.flush();
    return { success: true, studentName: ctx.studentName, receipt: '', paymentDate: '', message: 'Квитанция и дата очищены.' };
  }

  if (!paymentDate) return { success: false, error: 'Укажите дату оплаты.' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(paymentDate)) return { success: false, error: 'Неверный формат даты.' };

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);

    const duplicate = findReceiptAcrossAllJournals_(ctx.cfg, receiptNumber, ctx.journal.paymentsId, ctx.groupName, row);
    if (duplicate) {
      return {
        success: false, duplicate: true, error: 'Квитанция уже использована.',
        receipt: duplicate.receipt, student: duplicate.student, teacher: duplicate.teacher,
        month: duplicate.month, group: duplicate.group, date: duplicate.date
      };
    }

    const parts = paymentDate.split('-');
    const dateObject = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));

    sheet.getRange(row, COL_RECEIPT).setValue(receiptNumber);
    sheet.getRange(row, COL_DATE).setValue(dateObject).setNumberFormat('dd.MM.yyyy');
    SpreadsheetApp.flush();

    return {
      success: true, studentName: ctx.studentName, receipt: receiptNumber,
      paymentDate: Utilities.formatDate(dateObject, 'Asia/Bishkek', 'dd.MM.yyyy'),
      message: 'Квитанция успешно сохранена.'
    };
  } catch (error) {
    return { success: false, error: 'Ошибка сохранения квитанции: ' + error.message };
  } finally {
    try { lock.releaseLock(); } catch (e) {}
  }
}


// ============================================================
// ЧАСТЬ 3в. УВЕДОМЛЕНИЯ ОБ ОПЛАТЕ — ЛИСТ СООБЩЕНИЯ, РАССЫЛКА, АВТООТПРАВКА
// ============================================================

const MSG_SHEET = 'СООБЩЕНИЯ';
const MSG_HEADERS = ['Ключ', 'Название', 'Когда отправляется', 'Язык (KG/RU)', 'Текст (кыргызча)', 'Текст (русский)', 'Подстановки'];
const MSG_PLACEHOLDERS = '{ученик} {группа} {уровень} {преподаватель} {преподаватель_ио} {ай} (сентябрь) {месяц_кг} (сентябрь айы) {месяц} (сентябрь 2026) {сумма}={стоимость} {оплачено} {остаток} {реквизиты} {дата} {дата_кг} {день} {день_кг} {время} {дни}';
const NOTICE_LESSON = { 1: 1, 2: 3, 3: 5 };          // уведомление → номер занятия
const NOTICE_STATUS_COL = { 1: 7, 2: 11, 3: 15 };    // G, K, O — как в старом журнале

const MSG_TEXTS_VERSION = 10;   // при изменении стандартных текстов ниже увеличьте номер — тексты ОПЛАТА_1..3 обновятся в листе автоматически
const MSG_DEFAULTS = [
  ['ОПЛАТА_1', 'Уведомление 1 — начало абонемента', '1-е занятие · неоплатившим', '',
   '📚 ОЦ «Планета» | Уведомление об оплате\nУрматтуу ата-эне!\nСизге маалымдайбыз, {ученик} үчүн англис тили курсунун {Ай} айына жаңы окуу абонементи башталды.\nБиздин келишимге ылайык, окуу акысы {ай} айына {стоимость} сомду түзөт жана төлөм айдын башында жүргүзүлүшү керек.\nБалаңыздын окуу процессинин туруктуулугун жана сапатын камсыз кылуу үчүн төлөмдү өз убагында жүргүзүп турууну өтүнөбүз.\nКолдооңуздар үчүн терең ыраазычылык билдиребиз!\n💳 Төлөм реквизиттери:\n{реквизиты}\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   '📚 ОЦ «Планета» | Уведомление об оплате\nУважаемые родители!\nСообщаем, что для ученика {ученик} начался новый абонемент курса английского языка на {месяц}.\nСогласно нашему договору, стоимость обучения за {месяц} составляет {стоимость} сом, оплата производится в начале месяца.\nЧтобы обучение вашего ребёнка проходило стабильно и качественно, просим производить оплату своевременно.\nБлагодарим за поддержку!\n💳 Реквизиты для оплаты:\n{реквизиты}\nС уважением,\nОбразовательный центр «Планета»', MSG_PLACEHOLDERS],
  ['ОПЛАТА_2', 'Уведомление 2 — напоминание', '3-е занятие · неоплатившим', '',
   '⚠️ ОЦ «Планета» | Төлөм боюнча эскертүү\nУрматтуу ата-эне!\n{ученик} үчүн {ай} айынын окуу абонементинин төлөмү азырынча жүргүзүлө элек.\n💰 Төлөм суммасы: {остаток} сом\nТөлөмдү 3 күндүн ичинде жүргүзүп коюуңузду өтүнөбүз. Төлөм жүргүзүлбөгөн учурда сабактар убактылуу токтотулушу мүмкүн.\n💳 Төлөм реквизиттери:\n{реквизиты}\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   '⚠️ ОЦ «Планета» | Напоминание об оплате\nУважаемые родители!\nОплата абонемента ученика {ученик} за {месяц} пока не произведена.\n💰 Сумма к оплате: {остаток} сом\nПросим произвести оплату в течение 3 дней. При отсутствии оплаты занятия могут быть временно приостановлены.\n💳 Реквизиты для оплаты:\n{реквизиты}\nС уважением,\nОбразовательный центр «Планета»', MSG_PLACEHOLDERS],
  ['ОПЛАТА_3', 'Уведомление 3 — приостановка', '5-е занятие · неоплатившим', '',
   '⛔ ОЦ «Планета» | Сабактар убактылуу токтотулду\nУрматтуу ата-эне!\n{ученик} үчүн {ай} айынын окуу абонементинин төлөмү белгиленген мөөнөттө жүргүзүлгөн жок.\n💰 Төлөм суммасы: {остаток} сом\nУшуга байланыштуу сабактар убактылуу токтотулду.\nТөлөм жүргүзүлгөндөн кийин {ученик} сабактарын кайра уланта алат.\n💳 Төлөм реквизиттери:\n{реквизиты}\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   '⛔ ОЦ «Планета» | Занятия временно приостановлены\nУважаемые родители!\nОплата абонемента ученика {ученик} за {месяц} не произведена в установленный срок.\n💰 Сумма к оплате: {остаток} сом\nВ связи с этим занятия временно приостановлены.\nПосле оплаты {ученик} сможет продолжить занятия.\n💳 Реквизиты для оплаты:\n{реквизиты}\nС уважением,\nОбразовательный центр «Планета»', MSG_PLACEHOLDERS],
  ['СКИДКА_ПРЕДОСТАВЛЕНА', 'Скидка предоставлена', 'после оформления скидки · по кнопке «Отправить»', '',
   '🎁 ОЦ «Планета» | Жеңилдик жөнүндө маалымат\nУрматтуу ата-эне!\n{ученик} үчүн окуу акысына {скидка}% жеңилдик берилди.\n{срок}\nАбонементтин толук баасы: {цена} сом.\nЖеңилдик менен ай сайын төлөөгө: {стоимость} сом.\n💳 Төлөм реквизиттери:\n{реквизиты}\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   '🎁 ОЦ «Планета» | Информация о скидке\nУважаемые родители!\nУченику {ученик} предоставлена скидка {скидка}% на обучение.\n{срок}\nПолная стоимость абонемента: {цена} сом.\nК оплате со скидкой ежемесячно: {стоимость} сом.\n💳 Реквизиты для оплаты:\n{реквизиты}\nС уважением,\nОбразовательный центр «Планета»', '{ученик} {скидка} {цена} {стоимость} {срок} {ай} {месяц} {реквизиты} {группа} {основание}'],
  ['СКИДКА_СНЯТА', 'Скидка снята', 'после снятия скидки · по кнопке «Отправить»', '',
   'ℹ️ ОЦ «Планета» | Жеңилдик жөнүндө маалымат\nУрматтуу ата-эне!\n{ученик} үчүн {скидка}% жеңилдик {ай} айынан тартып токтотулду ({основание}).\nАбонементтин баасы мындан ары {цена} сом.\n💳 Төлөм реквизиттери:\n{реквизиты}\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   'ℹ️ ОЦ «Планета» | Информация о скидке\nУважаемые родители!\nСкидка {скидка}% для ученика {ученик} с {месяц} прекращена ({основание}).\nСтоимость абонемента далее составляет {цена} сом.\n💳 Реквизиты для оплаты:\n{реквизиты}\nС уважением,\nОбразовательный центр «Планета»', '{ученик} {скидка} {цена} {стоимость} {ай} {месяц} {реквизиты} {группа} {основание}'],
  ['СЕМЬЯ_СОСТАВ', 'Семья: состав', 'по кнопке 💬 на карточке семьи (вкладка Скидки) · без сумм', '',
   '👨‍👩‍👧 ОЦ «Планета» | Үй-бүлө жөнүндө маалымат\nУрматтуу ата-эне!\nБиздин борбордо сиздин үй-бүлөдөн {кол_детей} окуйт:\n{дети}\nБир үй-бүлөнүн балдарына жеңилдик тартиби боюнча берилет: 2-бала — 20%, 3-бала — 25%, андан ары көбүрөөк.\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   '👨‍👩‍👧 ОЦ «Планета» | Информация о семье\nУважаемые родители!\nВ нашем центре из вашей семьи обучаются {кол_детей}:\n{дети}\nСкидки детям из одной семьи предоставляются по порядку: 2-й ребёнок — 20%, 3-й — 25%, далее больше.\nС уважением,\nОбразовательный центр «Планета»', '{семья} {кол_детей} {дети} {месяц} {ай}'],
  ['СЕМЬЯ_РАСЧЁТ', 'Семья: расчёт со скидками', 'по кнопке 💬 на карточке семьи (вкладка Скидки) · с суммами', '',
   '🎁 ОЦ «Планета» | Үй-бүлө үчүн эсеп ({месяц})\nУрматтуу ата-эне!\nБиздин борбордо сиздин үй-бүлөдөн {кол_детей} окуйт:\n{дети_расчёт}\nЖеңилдиксиз айына: {итого_полная} сом.\nЖеңилдик менен айына: {итого_со_скидкой} сом (үнөмдөө {экономия} сом).\nЖеңилдиктер ай сайын автоматтык түрдө эсепке алынат.\n💳 Төлөм реквизиттери:\n{реквизиты}\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   '🎁 ОЦ «Планета» | Расчёт для семьи ({месяц})\nУважаемые родители!\nВ нашем центре из вашей семьи обучаются {кол_детей}:\n{дети_расчёт}\nБез скидок в месяц: {итого_полная} сом.\nСо скидками в месяц: {итого_со_скидкой} сом (экономия {экономия} сом).\nСкидки учитываются автоматически каждый месяц.\n💳 Реквизиты для оплаты:\n{реквизиты}\nС уважением,\nОбразовательный центр «Планета»', '{семья} {кол_детей} {дети} {дети_расчёт} {итого_полная} {итого_со_скидкой} {экономия} {реквизиты} {месяц} {ай}'],
  ['ПРЕДОПЛАТА_ЗАЧТЕНА', 'Предоплата зачтена', 'после зачёта предоплаты · по кнопке «Отправить»', '',
   'ℹ️ ОЦ «Планета» | Төлөм жөнүндө маалымат\nУрматтуу ата-эне!\n{ученик} үчүн {ай} айынын төлөмү ({сумма} сом) {месяц_внесения} айында киргизилген алдын ала төлөмдүн эсебинен кабыл алынды.\nАлдын ала төлөмдүн калдыгы: {остаток_предоплаты} сом.\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   'ℹ️ ОЦ «Планета» | Информация об оплате\nУважаемые родители!\nОплата за {месяц} для ученика {ученик} ({сумма} сом) принята за счёт предоплаты, внесённой в {месяц_внесения}.\nОстаток предоплаты: {остаток_предоплаты} сом.\nС уважением,\nОбразовательный центр «Планета»', '{ученик} {ай} {месяц} {сумма} {месяц_внесения} {остаток_предоплаты}'],
  ['НАПОМИНАНИЕ_ЗАНЯТИЕ', 'Напоминание о занятии', 'утром в день занятия · всем ученикам группы (НАПОМИНАНИЯ_О_ЗАНЯТИИ = ДА)', '',
   '📚 ОЦ «Планета» | Эскертүү\nУрматтуу ата-эне!\nЭскерте кетебиз: бүгүн, {дата_кг} күнү, {ученик} үчүн саат {время} англис тили сабагы болот ({группа}, мугалими: {преподаватель_ио}).\nКечикпей келүүсүн өтүнөбүз. Жакшы күн каалайбыз!',
   '📚 ОЦ «Планета» | Напоминание\nУважаемые родители!\nНапоминаем: сегодня, {дата}, у ученика {ученик} занятие английского языка в {время} ({группа}, преподаватель: {преподаватель_ио}).\nПросим не опаздывать. Хорошего дня!', '{ученик} {дата} {дата_кг} {время} {группа} {уровень} {преподаватель} {преподаватель_ио} {кабинет}'],
  ['ОТСРОЧКА_ОПЛАТЫ', 'Отсрочка оплаты', 'после оформления отсрочки · по кнопке «Отправить»', '',
   '📅 ОЦ «Планета» | Төлөм мөөнөтү\nУрматтуу ата-эне!\n{ученик} үчүн {ай} айынын окуу акысын ({остаток} сом) {дата_кг} күнүнө чейин төлөө боюнча макулдаштык.\nУшул күнгө чейин эскертүүлөр жөнөтүлбөйт. Түшүнүүңүз үчүн рахмат!\n💳 Төлөм реквизиттери:\n{реквизиты}\nУрматтоо менен,\n«Планета» Билим Берүү Борбору',
   '📅 ОЦ «Планета» | Срок оплаты\nУважаемые родители!\nПо вашей просьбе оплата за {месяц} для ученика {ученик} ({остаток} сом) ожидается до {дата}.\nДо этой даты напоминания отправляться не будут. Спасибо за понимание!\n💳 Реквизиты для оплаты:\n{реквизиты}\nС уважением,\nОбразовательный центр «Планета»', '{ученик} {ай} {месяц} {остаток} {дата} {дата_кг} {реквизиты} {примечание}'],
  ['ГРАФИК_ГРУППЫ', 'График занятий группы', 'по кнопке «📅 График занятий» · всем родителям группы', '',
   '📅 ОЦ «Планета» · {группа} · {Ай} {год}\n{уровень} · {дни} · {время}{кабинет_строка}\nМугалим: {преподаватель}\n\nСабактардын графиги:\n{список}\n\nСабактарды күтөбүз! Кечигүү же келбей калуу болсо — мугалимге билдириңиз.',
   '📅 ОЦ «Планета» · {группа} · {месяц}\n{уровень} · {дни} · {время}{кабинет_строка}\nПреподаватель: {преподаватель}\n\nГрафик занятий:\n{список}\n\nЖдём на занятиях! Опоздание или пропуск — сообщите преподавателю.', '{группа} {месяц} {Ай} {год} {уровень} {дни} {время} {кабинет} {кабинет_строка} {преподаватель} {список}']
];

function messagesSheet_(create) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(MSG_SHEET);
  if (!sh && create) {
    sh = ss.insertSheet(MSG_SHEET);
    sh.getRange(1, 1, 1, MSG_HEADERS.length).setValues([MSG_HEADERS]);
    sh.getRange(2, 1, 50, MSG_HEADERS.length).setNumberFormat('@');
    sh.getRange(2, 1, MSG_DEFAULTS.length, MSG_HEADERS.length).setValues(MSG_DEFAULTS);
    sh.getRange(2, 5, 50, 2).setWrap(true).setVerticalAlignment('top');
    styleConfigSheet_(sh, MSG_HEADERS.length, [110, 240, 220, 90, 460, 460, 260]);
  }
  return sh;
}

/** ЗАПУСТИТЬ ОДИН РАЗ: создать лист СООБЩЕНИЯ со стандартными текстами (существующий не трогает) */
function ensureMessagesSheet() {
  const existed = !!messagesSheet_(false);
  messagesSheet_(true);
  const msg = existed ? 'Лист СООБЩЕНИЯ уже существует — ничего не изменено.' : 'Лист СООБЩЕНИЯ создан со стандартными текстами.';
  Logger.log(msg);
  return msg;
}

/** Добавить в лист СООБЩЕНИЯ отсутствующие стандартные тексты (существующие не трогает) */
function addMissingMessages() {
  const sh = messagesSheet_(true);
  const last = sh.getLastRow();
  const col = last >= 2 ? sh.getRange(2, 1, last - 1, 1).getDisplayValues().map(function(r) { return String(r[0] || '').trim(); }) : [];
  let added = 0;
  MSG_DEFAULTS.forEach(function(d) { if (col.indexOf(d[0]) === -1) { sh.appendRow(d); added++; } });
  const msg = added ? 'Добавлено текстов: ' + added : 'Все стандартные тексты уже есть.';
  Logger.log(msg);
  return msg;
}

/** Перезаписать тексты в листе СООБЩЕНИЯ стандартными (ваши правки затираются) */
function resetPaymentMessages() {
  const sh = messagesSheet_(true);
  const last = sh.getLastRow();
  const col = last >= 2 ? sh.getRange(2, 1, last - 1, 1).getDisplayValues().map(function(r) { return String(r[0] || '').trim(); }) : [];
  let done = 0;
  MSG_DEFAULTS.forEach(function(d) {
    const i = col.indexOf(d[0]);
    if (i === -1) { sh.appendRow(d); done++; }
    else { sh.getRange(i + 2, 5, 1, 2).setValues([[d[4], d[5]]]); done++; }
  });
  // окно уведомления 1 — только день занятия
  try {
    const st = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
    if (st && st.getLastRow() >= 2) {
      const keys = st.getRange(2, 1, st.getLastRow() - 1, 1).getDisplayValues();
      keys.forEach(function(r, i) { if (/^ОКНО_УВЕДОМЛЕНИЯ_[123]$/.test(String(r[0]).trim())) st.getRange(i + 2, 2).setNumberFormat('@').setValue('0'); });
    }
    CacheService.getScriptCache().remove(CONFIG_CACHE_KEY);
  } catch (e) {}
  return 'Обновлено текстов: ' + done + '. Окна уведомлений 1, 2, 3 = 0 (отправка только в день занятия).';
}

function readMessages_() {
  const sh = messagesSheet_(true);
  const out = {};
  let last = sh.getLastRow();
  const read = function() {
    last = sh.getLastRow();
    if (last < 2) return;
    sh.getRange(2, 1, last - 1, MSG_HEADERS.length).getDisplayValues().forEach(function(r) {
      const k = String(r[0] || '').trim();
      if (!k) return;
      out[k] = { name: String(r[1] || ''), when: String(r[2] || ''), lang: String(r[3] || '').trim().toUpperCase(), kg: String(r[4] || ''), ru: String(r[5] || '') };
    });
  };
  read();
  // недостающие стандартные тексты добавляются автоматически
  let added = 0;
  MSG_DEFAULTS.forEach(function(d) { if (!out[d[0]]) { sh.appendRow(d); added++; } });
  // новая версия стандартных текстов — обновить тексты ОПЛАТА_1..4 (один раз на версию)
  try {
    const props = PropertiesService.getScriptProperties();
    if (String(props.getProperty('MSG_TEXTS_VERSION') || '') !== String(MSG_TEXTS_VERSION)) {
      const keysCol = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().map(function(r) { return String(r[0] || '').trim(); }) : [];
      MSG_DEFAULTS.forEach(function(d) { const i = keysCol.indexOf(d[0]); if (i !== -1) sh.getRange(i + 2, 2, 1, 5).setValues([[d[1], d[2], '', d[4], d[5]]]); });
      // реквизиты: заменить только если стоит старое стандартное значение
      const st = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
      if (st && st.getLastRow() >= 2) st.getRange(2, 1, st.getLastRow() - 1, 2).getDisplayValues().forEach(function(r, i) {
        if (String(r[0]).trim() === 'РЕКВИЗИТЫ' && /^MBank: 0755 494 494/.test(String(r[1]).trim())) st.getRange(i + 2, 2).setValue('https://mbank.kg/0755494494 — БЕКЖАН Б');
        if (String(r[0]).trim() === 'МЕСЯЦ_АБОНЕМЕНТА') st.getRange(i + 2, 2).setValue('ПО_ЖУРНАЛУ');   // месяц = месяц отправки
        if (String(r[0]).trim() === 'СЕКУНД_СЕКРЕТНОГО_ВХОДА' && String(r[1]).trim() === '5') st.getRange(i + 2, 2).setNumberFormat('@').setValue('7');
      });
      // уведомление 4 больше не используется — убрать строку из листа
      for (let i = keysCol.length - 1; i >= 0; i--) if (keysCol[i] === 'ОПЛАТА_4') sh.deleteRow(i + 2);
      try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
      props.setProperty('MSG_TEXTS_VERSION', String(MSG_TEXTS_VERSION));
      added++;
    }
  } catch (e) {}
  if (added) { for (const k in out) delete out[k]; read(); }
  return out;
}

function noticeTemplate_(cfg, msgs, noticeNo) {
  const m = msgs['ОПЛАТА_' + noticeNo];
  if (!m) return '';
  const lang = (m.lang === 'RU' || m.lang === 'KG') ? m.lang : cfg.msgLang;
  const t = lang === 'RU' ? (m.ru || m.kg) : (m.kg || m.ru);
  return String(t).replace(/\\n/g, '\n');
}

/** Данные группы и ученика для подстановок в уведомление об оплате */
function paymentNoticeData_(cfg, sheet, monthName, teacherFull, i, vals, disp, lesson) {
  const meta = groupMetaFromGrid_(disp, 0);
  const pr = PAY_FIRST_ROW - 1 + i;
  const tuition = Math.round(parseNum_(vals[pr][3])), paid = Math.round(parseNum_(vals[pr][17])), balance = balanceOf_(vals[pr][3], vals[pr][17]);
  // {дата} — дата занятия, к которому относится уведомление (а не сегодня)
  const lessonDate = lesson ? vals[ATT_DATES_ROW - 1][ATT_FIRST_COL - 2 + lesson] : null;
  const fd = fullDateText_(lessonDate instanceof Date ? lessonDate : new Date(), lesson ? String(disp[ATT_DATES_ROW - 1][ATT_FIRST_COL - 2 + lesson] || '') : '');
  // месяц абонемента: по дате 1-го занятия группы (ТЗ) или по месяцу журнала — НАСТРОЙКИ → МЕСЯЦ_АБОНЕМЕНТА
  let mm = monthFromName_(monthName);
  const first = vals[ATT_DATES_ROW - 1][ATT_FIRST_COL - 1];
  if (cfg.monthByFirstLesson !== false && first instanceof Date && !isNaN(first)) mm = { y: first.getFullYear(), m: first.getMonth() + 1 };
  const monthRu = mm ? MONTHS_RU_NOM[mm.m - 1] + ' ' + mm.y : String(monthName || '').toLowerCase();
  const monthKg = mm ? MONTHS_KG[mm.m - 1] + ' айы' : String(monthName || '').toLowerCase();
  const monthBare = mm ? MONTHS_KG[mm.m - 1] : String(monthName || '').toLowerCase().replace(/\s*20\d{2}/, '');
  return {
    'ученик': String(disp[13 + i][1] || '').trim(),
    'группа': meta.title, 'уровень': meta.level,
    'преподаватель': teacherFull, 'преподаватель_ио': nameWithoutSurname_(teacherFull), 'мугалим': nameWithoutSurname_(teacherFull),
    'месяц': monthRu, 'месяц_кг': monthKg, 'ай': monthBare, 'Ай': monthBare ? monthBare.charAt(0).toUpperCase() + monthBare.slice(1) : '',
    'стоимость': String(tuition), 'сумма': String(tuition), 'оплачено': String(paid), 'остаток': String(Math.max(balance, 0)),
    'реквизиты': cfg.requisites,
    'дата': fd.date, 'дата_кг': fd.dateKg, 'день': fd.weekday, 'день_кг': fd.weekdayKg,
    'время': meta.time && !/не назнач/i.test(meta.time) ? meta.time : '', 'дни': meta.days && !/не назнач/i.test(meta.days) ? meta.days : ''
  };
}

/**
 * Получатели уведомления noticeNo в группе: только неоплатившие (остаток > 0).
 * Пропускаются: оплатившие, уже получившие это уведомление, без WhatsApp.
 */
function noticeRecipients_(sheet, noticeNo, includeSent, defer) {
  const vals = sheet.getRange('A1:V51').getValues();
  const disp = sheet.getRange('A1:V51').getDisplayValues();
  const statusCol = NOTICE_STATUS_COL[noticeNo];
  const list = [], skipped = [];
  const todayIso = isoToday_();
  for (let i = 0; i < 16; i++) {
    const name = String(disp[13 + i][1] || '').trim();
    const phone = String(disp[13 + i][16] || '').trim();
    if (!name && !phone) continue;
    const pr = PAY_FIRST_ROW - 1 + i;
    const balance = balanceOf_(vals[pr][3], vals[pr][17]);
    const tuition = Math.round(parseNum_(vals[pr][3]));
    const status = String(disp[pr][statusCol - 1] || '').trim();
    const item = { i: i, row: PAY_FIRST_ROW + i, name: name, phone: phone, balance: balance, tuition: tuition, status: status };
    if (!name) { skipped.push(Object.assign({ reason: 'нет ФИО' }, item)); continue; }
    if (balance <= 0) { skipped.push(Object.assign({ reason: 'оплачено' }, item)); continue; }
    const df = defer && defer[studentKey_(name)];
    if (df && df.until >= todayIso) { skipped.push(Object.assign({ reason: 'отсрочка до ' + df.until.split('-').reverse().join('.') }, item)); continue; }
    if (defer && defer.__excl && defer.__excl[studentKey_(name)]) { skipped.push(Object.assign({ reason: 'исключён из уведомлений' }, item)); continue; }
    if (!phone) { skipped.push(Object.assign({ reason: 'нет WhatsApp' }, item)); continue; }
    if (status && !includeSent) { skipped.push(Object.assign({ reason: 'уже отправлено ' + status }, item)); continue; }
    list.push(item);
  }
  return { list: list, skipped: skipped, vals: vals, disp: disp };
}

/**
 * Окно отправки уведомления: с даты занятия и ещё N дней (НАСТРОЙКИ → ОКНО_УВЕДОМЛЕНИЯ_N).
 * state: 'nodate' (дата занятия не назначена) | 'early' | 'open' | 'closed'
 */
function noticeWindow_(cfg, sheet, noticeNo) {
  const lesson = NOTICE_LESSON[noticeNo];
  const ld = lessonDates_(sheet);
  const iso = ld.iso[lesson - 1] || '';
  const days = (cfg.noticeWindows || {})[noticeNo] || 0;
  if (!iso) return { state: 'nodate', lesson: lesson, from: '', to: '', days: days };
  const d = daysBetweenIso_(iso, ld.todayIso);
  const p = iso.split('-');
  const toDate = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]) + days);
  const toIso = Utilities.formatDate(toDate, ld.tz, 'yyyy-MM-dd');
  return {
    state: d < 0 ? 'early' : (d > days ? 'closed' : 'open'),
    lesson: lesson, days: days, fromIso: iso, toIso: toIso,
    from: iso.split('-').reverse().join('.'), to: toIso.split('-').reverse().join('.')
  };
}

function noticeWindowError_(w, noticeNo) {
  if (w.state === 'open') return '';
  if (w.state === 'nodate') return 'Уведомление ' + noticeNo + ' привязано к ' + w.lesson + '-му занятию, а его дата в журнале не назначена.';
  if (w.state === 'early') return 'Уведомление ' + noticeNo + ' отправляется не раньше даты ' + w.lesson + '-го занятия — ' + w.from + '.';
  return 'Срок отправки уведомления ' + noticeNo + ' истёк: можно было с ' + w.from + ' по ' + w.to + '.';
}

function staffCtx_(role, password, month, teacherName, groupName) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual !== String(role || '')) return { error: { success: false, error: 'Неверный пароль.' } };
  const r = resolveAdminJournal_(password, month, teacherName);
  if (r.error) return r;
  groupName = String(groupName || '').trim();
  if (!isValidGroupName_(groupName)) return { error: { success: false, error: 'Неверная группа.' } };
  const ss = SpreadsheetApp.openById(r.journal.paymentsId);
  const sheet = ss.getSheetByName(groupName);
  if (!sheet) return { error: { success: false, error: 'Лист "' + groupName + '" не найден.' } };
  return { cfg: cfg, role: actual, month: r.month, teacher: r.teacher, journal: r.journal, groupName: groupName, sheet: sheet };
}

/** Предпросмотр рассылки: получатели, пропущенные, пример текста */
function previewPaymentNotices(role, password, month, teacherName, groupName, noticeNo) {
  if (getConfig_().useDb) return previewPaymentNoticesDb_(role, password, month, teacherName, groupName, noticeNo);
  const c = staffCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  noticeNo = Number(noticeNo);
  if (!NOTICE_LESSON[noticeNo]) return { success: false, error: 'Номер уведомления: 1, 2 или 3.' };
  const w = noticeWindow_(c.cfg, c.sheet, noticeNo);
  const werr = noticeWindowError_(w, noticeNo);
  if (werr) return { success: false, error: werr, window: w };
  const msgs = readMessages_();
  const tpl = noticeTemplate_(c.cfg, msgs, noticeNo);
  if (!tpl) return { success: false, error: 'В листе СООБЩЕНИЯ нет текста ОПЛАТА_' + noticeNo + '.' };
  const rc = noticeRecipients_(c.sheet, noticeNo, false, deferralsFor_(c.month, c.teacher.short, c.groupName));
  const sample = rc.list.length ? fillTemplate_(tpl, paymentNoticeData_(c.cfg, c.sheet, c.month, c.teacher.full || c.teacher.short, rc.list[0].i, rc.vals, rc.disp, NOTICE_LESSON[noticeNo])) : '';
  return {
    success: true, noticeNo: noticeNo, lesson: NOTICE_LESSON[noticeNo], name: (msgs['ОПЛАТА_' + noticeNo] || {}).name || '',
    recipients: rc.list.map(function(x) { return { row: x.row, name: x.name, phone: x.phone, balance: x.balance }; }),
    skipped: rc.skipped.map(function(x) { return { row: x.row, name: x.name, reason: x.reason }; }),
    sample: sample
  };
}

/** Отправка уведомления noticeNo. rows — список строк (пусто = всем подходящим). force — отправлять даже если уже было. */
function sendPaymentNotices(role, password, month, teacherName, groupName, noticeNo, rows, force) {
  if (getConfig_().useDb) return sendPaymentNoticesDb_(role, password, month, teacherName, groupName, noticeNo, rows);
  const c = staffCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  noticeNo = Number(noticeNo);
  if (!NOTICE_LESSON[noticeNo]) return { success: false, error: 'Номер уведомления: 1, 2 или 3.' };
  const w = noticeWindow_(c.cfg, c.sheet, noticeNo);
  const werr = noticeWindowError_(w, noticeNo);
  if (werr) return { success: false, error: werr };
  // повторная отправка запрещена: force всегда false
  const res = sendNoticesInGroup_(c.cfg, c.sheet, c.month, c.teacher, c.groupName, noticeNo, rows, false, c.role === 'director' ? 'руководитель' : 'кассир');
  if (res.error) return { success: false, error: res.error };
  return { success: true, sent: res.sent, failed: res.failed, skipped: res.skipped, message: 'Отправлено: ' + res.sent.length + (res.failed.length ? ', ошибок: ' + res.failed.length : '') };
}

function sendNoticesInGroup_(cfg, sheet, month, teacher, groupName, noticeNo, rows, force, who) {
  const msgs = readMessages_();
  const tpl = noticeTemplate_(cfg, msgs, noticeNo);
  if (!tpl) return { error: 'В листе СООБЩЕНИЯ нет текста ОПЛАТА_' + noticeNo + '.' };
  const rc = noticeRecipients_(sheet, noticeNo, force, deferralsFor_(month, teacher.short || teacher, groupName));
  let targets = rc.list;
  if (Array.isArray(rows) && rows.length) {
    const want = {}; rows.forEach(function(r) { want[Number(r)] = true; });
    targets = targets.filter(function(x) { return want[x.row]; });
  }
  const teacherFull = teacher.full || teacher.short;
  const sent = [], failed = [];
  const statusCol = NOTICE_STATUS_COL[noticeNo];
  targets.forEach(function(x, idx) {
    const text = fillTemplate_(tpl, paymentNoticeData_(cfg, sheet, month, teacherFull, x.i, rc.vals, rc.disp, NOTICE_LESSON[noticeNo]));
    const r = sendWhatsapp_(x.phone, text);
    const stamp = Utilities.formatDate(new Date(), 'Asia/Bishkek', 'dd.MM HH:mm');
    logNotification_([new Date(), teacher.short, groupName, x.name, x.phone, 'оплата-' + noticeNo + (force ? ' (повтор)' : '') + ' · ' + who, NOTICE_LESSON[noticeNo], r.ok ? 'отправлено' : 'ошибка', r.ok ? (r.response || '') : r.error]);
    if (r.ok) {
      try { sheet.getRange(x.row, statusCol).setValue('✓ ' + stamp); } catch (e) {}
      sent.push({ row: x.row, name: x.name });
    } else {
      failed.push({ row: x.row, name: x.name, error: r.error });
    }
    if (idx < targets.length - 1) Utilities.sleep(700);
  });
  SpreadsheetApp.flush();
  return { sent: sent, failed: failed, skipped: rc.skipped.map(function(x) { return { row: x.row, name: x.name, reason: x.reason }; }) };
}

/** Переключатель АВТО / ВРУЧНУЮ (пишет АВТО_УВЕДОМЛЕНИЯ в НАСТРОЙКИ). mode: 'auto' | 'manual' */
function setNoticeMode(role, password, mode, applyAll) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  const auto = String(mode || '') === 'auto';
  if (applyAll === true || String(applyAll) === 'true') clearGroupNoticeModes_();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CFG_SETTINGS);
  if (!sh) return { success: false, error: 'Лист НАСТРОЙКИ не найден.' };
  let done = false;
  if (sh.getLastRow() >= 2) {
    sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) {
      if (String(r[0]).trim() === 'АВТО_УВЕДОМЛЕНИЯ') { sh.getRange(i + 2, 2).setNumberFormat('@').setValue(auto ? 'ДА' : 'НЕТ'); done = true; }
    });
  }
  if (!done) sh.appendRow(['АВТО_УВЕДОМЛЕНИЯ', auto ? 'ДА' : 'НЕТ', 'ДА — уведомления уходят автоматически в день занятия; НЕТ — по кнопке кассира']);
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  // в режиме АВТО должен существовать ежедневный триггер
  let triggerInfo = '';
  if (auto) {
    const has = ScriptApp.getProjectTriggers().some(function(t) { return t.getHandlerFunction() === 'autoPaymentNotices'; });
    if (!has) { try { createAutoNoticesTrigger(); triggerInfo = ' Ежедневный триггер установлен.'; } catch (e) { triggerInfo = ' Не удалось установить триггер: ' + e.message; } }
  }
  return { success: true, auto: auto, message: auto ? 'Режим АВТО: система сама отправляет уведомления в день занятия (около ' + cfg.autoHour + ':05 по Бишкеку).' + triggerInfo : 'Режим ВРУЧНУЮ: уведомления отправляет кассир кнопкой — только в день занятия.' };
}

/** Настройки группы (уровень/дни/время) для администратора: значения и списки из журнала NEW */
function getGroupSettingsForStaff(role, password, month, teacherName, groupName) {
  if (getConfig_().useDb) return getGroupSettingsForStaffDb_(role, password, month, teacherName, groupName);
  const c = staffCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  if (!c.journal.attendanceId) return { success: false, error: 'Для этого преподавателя не указан журнал посещений (лист ЖУРНАЛЫ, столбец D).' };
  let ss; try { ss = SpreadsheetApp.openById(c.journal.attendanceId); } catch (e) { return { success: false, error: 'Не удалось открыть журнал NEW: ' + e.message }; }
  const sheet = ss.getSheetByName(c.groupName);
  if (!sheet) return { success: false, error: 'В журнале NEW нет листа ' + c.groupName + '.' };
  const meta = groupMetaFromGrid_(sheet.getRange('A1:U29').getDisplayValues(), Number(c.groupName.replace(/\D/g, '')), sheet);
  meta.room = getRoom_(c.month, c.teacher.short, c.groupName);
  return {
    success: true, meta: meta, window: groupEditWindow_(c.cfg, sheet),
    options: {
      levels: validationOptions_(sheet.getRange(meta.cells.level[0], meta.cells.level[1])),
      times: validationOptions_(sheet.getRange(meta.cells.time[0], meta.cells.time[1])),
      days: validationOptions_(sheet.getRange(meta.cells.days[0], meta.cells.days[1])),
      rooms: c.cfg.rooms
    }
  };
}

/** Администратор/руководитель меняет уровень, дни, время группы (в журнале NEW) — в любое время, с записью в «Изменения» */
function saveGroupSettingsByStaff(role, password, month, teacherName, groupName, level, time, days, room) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg0 = getConfig_();
  if (room !== undefined && room !== null) {
    if (!staffRole_(cfg0, password)) return { success: false, error: 'Неверный пароль.' };
    const t0 = findTeacherCfg_(cfg0, teacherName) || { short: String(teacherName || '') };
    const rc = setRoomChecked_(cfg0, String(month || '').trim() || cfg0.currentMonth, t0.short, String(groupName || '').trim(), String(room || '').trim(), String(days || ''), String(time || ''));
    if (rc.error) return { success: false, error: rc.error, conflicts: rc.conflicts };
  }
  if (cfg0.useDb) return saveGroupSettingsByStaffDb_(role, password, month, teacherName, groupName, level, time, days);
  const c = staffCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  if (!c.journal.attendanceId) return { success: false, error: 'Не указан журнал посещений (лист ЖУРНАЛЫ, столбец D).' };
  let ss; try { ss = SpreadsheetApp.openById(c.journal.attendanceId); } catch (e) { return { success: false, error: 'Не удалось открыть журнал NEW: ' + e.message }; }
  const sheet = ss.getSheetByName(c.groupName);
  if (!sheet) return { success: false, error: 'В журнале NEW нет листа ' + c.groupName + '.' };

  const meta0 = groupMetaFromGrid_(sheet.getRange('A1:U29').getDisplayValues(), Number(c.groupName.replace(/\D/g, '')), sheet);
  const cL = sheet.getRange(meta0.cells.level[0], meta0.cells.level[1]);
  const cT = sheet.getRange(meta0.cells.time[0], meta0.cells.time[1]);
  const cD = sheet.getRange(meta0.cells.days[0], meta0.cells.days[1]);
  const L = checkOption_(level, validationOptions_(cL), 'Уровень'); if (L.error) return { success: false, error: L.error };
  const Tm = checkOption_(time, validationOptions_(cT), 'Время занятий'); if (Tm.error) return { success: false, error: Tm.error };
  const D = checkOption_(days, validationOptions_(cD), 'Дни недели'); if (D.error) return { success: false, error: D.error };

  const changes = [];
  if (meta0.level !== L.value) changes.push(['Уровень группы', meta0.level, L.value]);
  if (meta0.time !== Tm.value) changes.push(['Время занятий', meta0.time, Tm.value]);
  if (meta0.days !== D.value) changes.push(['Дни недели', meta0.days, D.value]);
  if (!changes.length) return { success: true, message: 'Изменений нет.' };

  cL.setValue(L.value); cT.setValue(Tm.value); cD.setValue(D.value);
  SpreadsheetApp.flush();
  logChanges_(c.teacher.short + ' ← ' + (c.role === 'director' ? 'руководитель' : 'кассир'), c.groupName, '', '(настройки группы)', changes);
  return { success: true, message: 'Настройки группы изменены: ' + changes.map(function(x) { return x[0] + ' «' + x[1] + '» → «' + x[2] + '»'; }).join('; ') };
}

/** Одному ученику: уведомление noticeNo (повторная отправка запрещена) */
function sendPaymentNoticeOne(role, password, month, teacherName, groupName, paymentRow, noticeNo) {
  const r = sendPaymentNotices(role, password, month, teacherName, groupName, noticeNo, [Number(paymentRow)], false);
  if (r.success && r.sent && !r.sent.length) {
    const sk = (r.skipped || []).filter(function(x) { return Number(x.row) === Number(paymentRow); })[0];
    return { success: false, error: sk ? (sk.name + ': ' + sk.reason) : 'Ученик не подходит под условия уведомления ' + noticeNo + '.' };
  }
  return r;
}

/** Произвольное сообщение родителю ученика (из кабинета администратора/руководителя) */
function sendCustomMessage(role, password, month, teacherName, groupName, paymentRow, text) {
  if (getConfig_().useDb) return sendCustomMessageDb_(role, password, month, teacherName, groupName, paymentRow, text);
  const c = staffCtx_(role, password, month, teacherName, groupName);
  if (c.error) return c.error;
  paymentRow = Number(paymentRow);
  if (!isValidPaymentRow_(paymentRow)) return { success: false, error: 'Неверная строка.' };
  text = String(text || '').trim();
  if (!text) return { success: false, error: 'Введите текст сообщения.' };
  if (text.length > 1500) return { success: false, error: 'Слишком длинное сообщение (максимум 1500 символов).' };
  const i = paymentRow - PAY_FIRST_ROW;
  const name = String(c.sheet.getRange(14 + i, 2).getDisplayValue() || '').trim();
  const phone = String(c.sheet.getRange(14 + i, 17).getDisplayValue() || '').trim();
  if (!name) return { success: false, error: 'В этой строке нет ученика.' };
  if (!phone) return { success: false, error: 'У ученика не указан WhatsApp родителя.' };
  const r = sendWhatsapp_(phone, text);
  logNotification_([new Date(), c.teacher.short, c.groupName, name, phone, 'ручное · ' + (c.role === 'director' ? 'руководитель' : 'кассир'), '', r.ok ? 'отправлено' : 'ошибка', r.ok ? text.substr(0, 300) : r.error]);
  if (!r.ok) return { success: false, error: r.error };
  return { success: true, message: 'Сообщение отправлено (' + phone + ').' };
}

/**
 * АВТООТПРАВКА (триггер ежедневно в ЧАС_АВТОРАССЫЛКИ). Работает только при АВТО_УВЕДОМЛЕНИЯ = ДА.
 * Для каждой группы текущего месяца: если сегодня дата 1-го / 3-го / 5-го занятия — отправляет
 * соответствующее уведомление тем, кому положено и кто ещё не получал. Идемпотентна:
 * повторный запуск в тот же день ничего не дублирует. При нехватке времени продолжит через минуту.
 */
function autoPaymentNotices() {
  const started = Date.now();
  const cfg = getConfig_();
  const modes = groupNoticeModes_();
  const anyAuto = cfg.autoNotices || Object.keys(modes).some(function(k) { return modes[k] === 'auto'; });
  if (!anyAuto) { Logger.log('Автоуведомления выключены (АВТО_УВЕДОМЛЕНИЯ = НЕТ и нет групп с режимом АВТО).'); return; }
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) { Logger.log('autoPaymentNotices: уже выполняется.'); return; }
  try {
    const month = cfg.currentMonth;
    const todayIso = isoToday_();
    if (cfg.useDb) { autoPaymentNoticesDb_(cfg, month); return; }
    const journals = getJournalsForMonth_(cfg, month);
    let total = 0, needContinue = false;
    outer:
    for (let t = 0; t < journals.length; t++) {
      const j = journals[t];
      const teacher = findTeacherCfg_(cfg, j.teacher) || { short: j.teacher, full: '' };
      let ss; try { ss = SpreadsheetApp.openById(j.paymentsId); } catch (e) { continue; }
      for (let g = 1; g <= 10; g++) {
        if (Date.now() - started > 270000) { needContinue = true; break outer; }
        const sheet = ss.getSheetByName('Группа ' + g);
        if (!sheet || isHidden_(sheet)) continue;
        if (noticeModeFor_(cfg, month, teacher.short, 'Группа ' + g, modes) !== 'auto') continue;
        for (let n = 1; n <= 3; n++) {
          const w = noticeWindow_(cfg, sheet, n);
          if (w.state !== 'open') continue;   // в день занятия и в пределах окна (догоняет, если в тот день не сработало)
          const res = sendNoticesInGroup_(cfg, sheet, month, teacher, 'Группа ' + g, n, [], false, 'авто');
          if (res.error) { Logger.log(j.teacher + ' / Группа ' + g + ': ' + res.error); continue; }
          total += res.sent.length;
          Logger.log(j.teacher + ' / Группа ' + g + ' — уведомление ' + n + ': отправлено ' + res.sent.length + ', ошибок ' + res.failed.length);
        }
      }
    }
    if (needContinue) {
      ScriptApp.newTrigger('autoPaymentNotices').timeBased().after(60 * 1000).create();
      Logger.log('Не успели за один запуск — продолжение через минуту.');
    } else {
      // удалить одноразовые триггеры продолжения, оставив ежедневный
      const dailyId = PropertiesService.getScriptProperties().getProperty('AUTO_NOTICES_TRIGGER_ID') || '';
      ScriptApp.getProjectTriggers().forEach(function(tr) {
        if (tr.getHandlerFunction() === 'autoPaymentNotices' && tr.getUniqueId() !== dailyId) ScriptApp.deleteTrigger(tr);
      });
    }
    Logger.log('Автоуведомления за ' + todayIso + ': отправлено ' + total + '.');
  } finally {
    lock.releaseLock();
  }
}

/** ЗАПУСТИТЬ ОДИН РАЗ: ежедневный триггер автоотправки в ЧАС_АВТОРАССЫЛКИ по времени Бишкека */
function createAutoNoticesTrigger() {
  const cfg = getConfig_();
  ScriptApp.getProjectTriggers().forEach(function(tr) {
    if (tr.getHandlerFunction() === 'autoPaymentNotices') ScriptApp.deleteTrigger(tr);
  });
  const tr = ScriptApp.newTrigger('autoPaymentNotices').timeBased().atHour(cfg.autoHour).nearMinute(5).everyDays(1).inTimezone('Asia/Bishkek').create();
  PropertiesService.getScriptProperties().setProperty('AUTO_NOTICES_TRIGGER_ID', tr.getUniqueId());
  const msg = 'Триггер автоуведомлений установлен: ежедневно около ' + cfg.autoHour + ':05 (Бишкек). Сейчас АВТО_УВЕДОМЛЕНИЯ = ' + (cfg.autoNotices ? 'ДА' : 'НЕТ') + '.';
  Logger.log(msg);
  try { SpreadsheetApp.getActiveSpreadsheet().toast(msg, 'Автоуведомления', 8); } catch (e) {}
  return msg;
}

// ============================================================
// ЧАСТЬ 2а. ПРАЙС — единый лист цен в основной таблице
// ============================================================

const PRICE_SHEET = 'ПРАЙС';
const PRICE_DEFAULTS = [[0,'еще не назначен',0],[1,'PHONICS 1',2300],[2,'PHONICS 2',2300],[3,'PHONICS 3',2300],[4,'PHONICS 4',2300],[5,'PHONICS 5',2300],[6,'PHONICS 6',2300],[7,'FF1',2300],[8,'FF2',2300],[9,'FF3',2500],[10,'FF4',2500],[11,'FF5',2500],[12,'FF6',2500],[13,'ENGLISH PLUS 0',2300],[14,'ENGLISH PLUS 1',2300],[15,'ENGLISH PLUS 2',2500],[16,'ENGLISH PLUS 3',2500],[17,'ENGLISH PLUS 4',2500],[18,'ENGLISH PLUS 5',2500],[19,'BEEHIVE 1',2300],[20,'BEEHIVE 2',2300],[21,'BEEHIVE 3',2500],[22,'BEEHIVE 4',2500],[23,'BEEHIVE 5',2500],[24,'BEEHIVE 6',2500],[25,'BEGINNER',2500],[26,'ELEMENTARY',2500],[27,'PRE-INTERMEDIATE',2500],[28,'INTERMEDIATE',3000],[29,'UPPER INTERMEDIATE',3500],[30,'ADVANCE',4000],[31,'FOR ADULTS',4000],[32,'SOLUTION BEGINNER',2500],[33,'SOLUTION ELEMENTARY',2500],[34,'SOLUTION PRE-INTERMEDIATE',2500],[35,'SOLUTION INTERMEDIATE',3000],[36,'SOLUTION UPPER INTERMEDIAT',3500],[37,'VISION BEGINNER',2500],[38,'VISION ELEMENTARY 2025-2026',2500],[39,'VISION PRE-INTERMEDIATE',2500],[40,'VISION INTERMEDIATE',3000],[41,'VISION UPPER INTERMEDIATE',3500],[42,'PHONICS 1 Intensive',3500],[43,'PHONICS 2 Intensive',3500],[44,'PHONICS 3 Intensive',3500],[45,'PHONICS 4 Intensive',3500],[46,'PHONICS 5 Intensive',3500],[47,'PHONICS 6 Intensive',3500],[48,'FF1 Intensive',3500],[49,'FF2 Intensive',3500],[50,'FF3 Intensive',3800],[51,'FF4 Intensive',3800],[52,'FF5 Intensive',3800],[53,'FF6 Intensive',3800],[54,'ENGLISH PLUS 0 Intensive',3500],[55,'ENGLISH PLUS 1 Intensive',3500],[56,'ENGLISH PLUS 2 Intensive',3800],[57,'ENGLISH PLUS 3 Intensive',3800],[58,'ENGLISH PLUS 4 Intensive',3800],[59,'ENGLISH PLUS 5 Intensive',3800],[60,'BEGINNER Intensive',3500],[61,'ELEMENTARY Intensive',3500],[62,'PRE-INTERMEDIATE Intensive',3800],[63,'INTERMEDIATE Intensive',3800],[64,'UPPER INTERMEDIAT Intensive',3800],[65,'ADVANCE Intensive',3800],[66,'FOR ADULTS Intensive',3800],[67,'BEEHIVE 1 Intensive',3800],[68,'BEEHIVE 2 Intensive',3800],[69,'BEEHIVE 3 Intensive',4500],[70,'BEEHIVE 4 Intensive',5300],[71,'BEEHIVE 5 Intensive',6000],[72,'BEEHIVE 6 Intensive',6000],[73,'SOLUTION BEGINNER Intensive',3800],[74,'SOLUTION ELEMENTARY Intensive',3800],[75,'SOLUTION PRE-INTERMEDIATE Intensive',3800],[76,'SOLUTION INTERMEDIATE Intensive',4500],[77,'SOLUTION UPPER INTERMEDIAT Intensive',5300],[78,'VISION BEGINNER Intensive',3800],[79,'VISION ELEMENTARY 2025-2026 Intensive',3800],[80,'VISION PRE-INTERMEDIATE Intensive',3800],[81,'VISION INTERMEDIATE Intensive',4500],[82,'VISION UPPER INTERMEDIATE Intensive',5300]];

function priceSheet_(create) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(PRICE_SHEET);
  if (!sh && create) {
    sh = ss.insertSheet(PRICE_SHEET);
    sh.getRange(1, 1, 1, 3).setValues([['№', 'НАИМЕНОВАНИЕ (уровень)', 'СТОИМОСТЬ, сом']]);
    sh.getRange(2, 1, PRICE_DEFAULTS.length, 3).setValues(PRICE_DEFAULTS);
    styleConfigSheet_(sh, 3, [50, 320, 130]);
  }
  return sh;
}

/** ЗАПУСТИТЬ ОДИН РАЗ: создать лист ПРАЙС со стандартным прайсом (существующий не трогает) */
function ensurePriceSheet() {
  const existed = !!priceSheet_(false);
  priceSheet_(true);
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  const msg = existed ? 'Лист ПРАЙС уже существует — ничего не изменено.' : 'Лист ПРАЙС создан (' + PRICE_DEFAULTS.length + ' позиций).';
  Logger.log(msg);
  return msg;
}

/** «SOLUTION  PRE-INTERMEDIATE » → «SOLUTION PRE-INTERMEDIATE» (регистр, лишние пробелы, ё/е не важны) */
function priceKey_(name) {
  return String(name || '').toUpperCase().replace(/Ё/g, 'Е').replace(/[\s\u00A0]+/g, ' ').trim();
}

/** Карта цен из листа ПРАЙС: {ключ: цена} */
function readPrices_() {
  return cacheGet_('prices', function() {
    const sh = priceSheet_(false);
    const map = {};
    if (!sh || sh.getLastRow() < 2) return map;
    sh.getRange(2, 2, sh.getLastRow() - 1, 2).getValues().forEach(function(r) {
      const k = priceKey_(r[0]);
      if (k) map[k] = Math.round(parseNum_(r[1]));
    });
    return map;
  });
}

/** Список уровней из листа ПРАЙС (кэш 2 минуты, как и цены) */
function priceLevels_() {
  return cacheGet_('levels', function() {
    const sh = priceSheet_(false);
    return sh && sh.getLastRow() >= 2 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getDisplayValues().map(function(x) { return String(x[0]).trim(); }).filter(Boolean) : [];
  });
}

/** Цена уровня по прайсу; null — уровня нет в прайсе */
function priceFor_(prices, level) {
  const k = priceKey_(level);
  if (!k) return null;
  if (prices[k] !== undefined) return prices[k];
  // мягкое сравнение: без дефисов и пробелов
  const soft = k.replace(/[-\s]/g, '');
  for (const key in prices) if (key.replace(/[-\s]/g, '') === soft) return prices[key];
  return null;
}

/**
 * Привести D4 группы к цене прайса по её уровню (C7). Возвращает {price, changed, level, found}.
 * Пишет только если значение отличается — формулы столбца «Стоимость» пересчитываются сами.
 */
function syncGroupPrice_(sheet, prices, levelText, currentD4) {
  const price = priceFor_(prices, levelText);
  if (price === null) return { price: currentD4, changed: false, level: levelText, found: false };
  if (Math.round(parseNum_(currentD4)) !== price) {
    try { sheet.getRange(GROUP_PRICE_CELL).setValue(price); SpreadsheetApp.flush(); } catch (e) { return { price: currentD4, changed: false, level: levelText, found: true }; }
    return { price: price, changed: true, level: levelText, found: true };
  }
  return { price: price, changed: false, level: levelText, found: true };
}

/** Диагностика строки оплаты: что лежит в ячейках (формулы/значения) — смотреть в журнале выполнения */
function diagnosePaymentRow(teacherShort, groupName, paymentRow) {
  const cfg = getConfig_();
  const j = findJournal_(cfg, cfg.currentMonth, teacherShort);
  if (!j) return 'Журнал не найден';
  const sh = SpreadsheetApp.openById(j.paymentsId).getSheetByName(groupName);
  const cols = { C: 3, D: 4, R: 18, S: 19, T: 20, U: 21, V: 22 };
  const out = [];
  for (const c in cols) {
    const rg = sh.getRange(paymentRow, cols[c]);
    out.push(c + paymentRow + ': value=' + JSON.stringify(rg.getValue()) + ' formula=' + JSON.stringify(rg.getFormula()));
  }
  out.push('D4: value=' + JSON.stringify(sh.getRange('D4').getValue()) + ' formula=' + JSON.stringify(sh.getRange('D4').getFormula()));
  Logger.log(out.join('\n'));
  return out.join('\n');
}

// ============================================================
// ЧАСТЬ 2б. ЗАЯВКИ ПРЕПОДАВАТЕЛЕЙ (даты занятий, настройки группы после закрытия окна)
// ============================================================

const REQ_SHEET = 'ЗАПРОСЫ';
const REQ_HEADERS = ['ID', 'Тип', 'Преподаватель', 'Месяц', 'Группа', 'Занятие', 'Было', 'Станет', 'Данные', 'Статус', 'Создана', 'Кем решено', 'Решено', 'Комментарий', 'Просмотрено'];
const RQ_PENDING = 'ожидает', RQ_OK = 'подтверждена', RQ_NO = 'отклонена', RQ_DELETED = 'удалён';

function requestsSheet_(create) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(REQ_SHEET);
  if (!sh && create) {
    sh = ss.insertSheet(REQ_SHEET);
    sh.getRange(1, 1, 1, REQ_HEADERS.length).setValues([REQ_HEADERS]);
    styleConfigSheet_(sh, REQ_HEADERS.length, [110, 90, 160, 120, 90, 70, 180, 180, 220, 110, 130, 120, 130, 220, 130]);
  } else if (sh && !String(sh.getRange(1, REQ_HEADERS.length).getValue() || '').trim()) {
    sh.getRange(1, REQ_HEADERS.length).setValue(REQ_HEADERS[REQ_HEADERS.length - 1]);   // дописать новый столбец в старый лист
  }
  return sh;
}

/** Значение «было/стало» заявки для показа: даты — как 05.09.2026 (сб) */
function reqDisp_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, TZ, 'dd.MM.yyyy') + ' (' + ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'][v.getDay()] + ')';
  const str = String(v == null ? '' : v);
  if (/^[A-Z][a-z]{2} [A-Z][a-z]{2} \d{2} \d{4} /.test(str)) { const d = new Date(str); if (!isNaN(d.getTime())) return reqDisp_(d); }
  return str;
}
function readRequests_() {
  const sh = requestsSheet_(false);
  if (!sh || sh.getLastRow() < 2) return [];
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, REQ_HEADERS.length).getValues();
  const out = [];
  rows.forEach(function(r, i) {
    if (!String(r[0] || '').trim()) return;
    out.push({ rowIndex: i + 2, id: String(r[0]), type: String(r[1]), teacher: String(r[2]), month: String(r[3]), group: String(r[4]),
      lesson: r[5] === '' ? '' : Number(r[5]), was: reqDisp_(r[6]), now: reqDisp_(r[7]), data: String(r[8] || ''), status: String(r[9]),
      created: r[10] instanceof Date ? Utilities.formatDate(r[10], TZ, 'dd.MM.yyyy HH:mm') : String(r[10] || ''), decidedBy: String(r[11] || ''),
      decided: r[12] instanceof Date ? Utilities.formatDate(r[12], TZ, 'dd.MM.yyyy HH:mm') : String(r[12] || ''), note: String(r[13] || ''), seen: String(r[14] || '') });
  });
  return out;
}

/** Создать заявку; если по этому занятию/группе уже есть ожидающая — она заменяется */
function createRequest_(type, teacherShort, month, groupName, lesson, was, now, dataJson) {
  const sh = requestsSheet_(true);
  readRequests_().forEach(function(r) {
    if (r.status === RQ_PENDING && r.type === type && r.teacher === teacherShort && nameKey_(r.month) === nameKey_(month) && r.group === groupName && String(r.lesson) === String(lesson)) {
      sh.getRange(r.rowIndex, 10).setValue(RQ_NO); sh.getRange(r.rowIndex, 14).setValue('заменена новой заявкой');
    }
  });
  const id = Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + String(Math.floor(Math.random() * 90 + 10));
  sh.appendRow([id, type, teacherShort, month, groupName, lesson, was, now, dataJson, RQ_PENDING, new Date(), '', '', '', '']);
  return { id: id, type: type, lesson: lesson, was: was, now: now };
}

/** Ожидающие заявки группы (для кабинета преподавателя) */
function pendingRequestsFor_(teacherShort, month, groupName) {
  return readRequests_().filter(function(r) {
    return r.status === RQ_PENDING && r.teacher === teacherShort && nameKey_(r.month) === nameKey_(month) && r.group === groupName;
  }).map(function(r) { return { id: r.id, type: r.type, lesson: r.lesson, was: r.was, now: r.now, created: r.created }; });
}

/** Решённые заявки преподавателя, о которых он ещё не уведомлён (помечаются просмотренными) */
function getTeacherNotices(teacherName, password) {
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;
  const sh = requestsSheet_(true);
  const items = [];
  readRequests_().forEach(function(r) {
    if (r.teacher !== auth.teacher.name || r.status === RQ_PENDING || r.seen) return;
    if (r.type !== 'удаление' && r.type !== 'дата' && r.type !== 'настройки' && r.type !== 'кабинет' && r.type !== 'перенос') return;
    let text = '';
    if (r.type === 'перенос') text = r.now;
    else if (r.type === 'удаление') text = r.status === RQ_DELETED ? 'Удаление ученика подтверждено руководителем: ' + r.was + ' (' + r.group + ').' : 'Запрос на удаление ученика отклонён руководителем: ' + r.was + ' (' + r.group + ').';
    else if (r.type === 'дата') text = (r.status === RQ_OK ? 'Изменение даты подтверждено: ' : 'Изменение даты отклонено: ') + r.group + ', занятие №' + r.lesson + ' — ' + r.was + ' → ' + r.now + '.';
    else if (r.type === 'кабинет') text = (r.status === RQ_OK ? 'Смена кабинета подтверждена: ' : 'Смена кабинета отклонена: ') + r.group + ' — ' + r.was + ' → ' + r.now + '.';
    else text = (r.status === RQ_OK ? 'Изменение настроек группы подтверждено: ' : 'Изменение настроек группы отклонено: ') + r.group + ' — ' + r.now + '.';
    items.push({ id: r.id, type: r.type, status: r.status, text: text, decided: r.decided, decidedBy: r.decidedBy, note: r.note });
    sh.getRange(r.rowIndex, 15).setValue(new Date());
  });
  return { success: true, items: items };
}

/** Текст заявки для преподавателя: что просили, что решено */
function teacherRequestText_(r) {
  const ok = r.status === RQ_OK || r.status === RQ_DELETED, pend = r.status === RQ_PENDING;
  if (r.type === 'перенос') return { what: 'Перенос группы ' + r.group, result: pend ? '' : (r.now || '') };
  if (r.type === 'удаление') return { what: 'Удалить ученика: ' + r.was + ' (' + r.group + ')', result: pend ? '' : (ok ? 'ученик удалён' : 'отклонено') };
  if (r.type === 'дата') return { what: 'Дата занятия №' + r.lesson + ', ' + r.group + ': ' + r.was + ' → ' + r.now, result: pend ? '' : (ok ? 'дата изменена' : 'отклонено') };
  if (r.type === 'кабинет') return { what: 'Кабинет ' + r.group + ': ' + r.was + ' → ' + r.now, result: pend ? '' : (ok ? 'кабинет изменён' : 'отклонено') };
  if (r.type === 'настройки') return { what: 'Настройки ' + r.group + ': ' + r.now, result: pend ? '' : (ok ? 'настройки изменены' : 'отклонено') };
  return { what: r.type + ': ' + (r.now || r.was || ''), result: pend ? '' : (ok ? 'выполнено' : 'отклонено') };
}
/** Все заявки преподавателя (ожидающие и решённые), новые сверху; markSeen — отметить решения прочитанными */
function getTeacherRequests(teacherName, password, markSeen) {
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;
  const sh = requestsSheet_(true), items = [], toSeen = [];
  readRequests_().forEach(function(r) {
    if (r.teacher !== auth.teacher.name) return;
    if (['удаление', 'дата', 'настройки', 'кабинет', 'перенос'].indexOf(r.type) === -1) return;
    const t = teacherRequestText_(r);
    const isNew = r.status !== RQ_PENDING && !r.seen;
    items.push({ id: r.id, row: r.rowIndex, type: r.type, group: r.group, status: r.status, pending: r.status === RQ_PENDING, ok: r.status === RQ_OK || r.status === RQ_DELETED, what: t.what, result: t.result, created: r.created || '', decided: r.decided || '', decidedBy: r.decidedBy || '', note: r.note || '', isNew: isNew });
    if (isNew && markSeen) toSeen.push(r.rowIndex);
  });
  toSeen.forEach(function(ri) { try { sh.getRange(ri, 15).setValue(new Date()); } catch (e) {} });
  items.sort(function(a, b) { return b.row - a.row; });   // новые заявки добавляются в конец листа
  return { success: true, items: items.slice(0, 60), pending: items.filter(function(x) { return x.pending; }).length, fresh: items.filter(function(x) { return x.isNew; }).length };
}

/** Список ожидающих заявок (администратор и руководитель) */
function getPendingRequests(role, password) {
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  const actual = staffRole_(cfg, password);
  return { success: true, items: readRequests_().filter(function(r) { return r.status === RQ_PENDING && (actual === 'director' || (actual === 'academic' ? (r.type !== 'предоплата' && r.type !== 'удаление_оплаты') : false)); })
    .map(function(r) { return { id: r.id, type: r.type, teacher: r.teacher, month: r.month, group: r.group, lesson: r.lesson, was: r.was, now: r.now, created: r.created }; }) };
}

/** Решение по заявке: approve = true → применить в журнале NEW */
function decideRequest(role, password, id, approve, note) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const who = roleTitle_(actual);
  const sh = requestsSheet_(true);
  const r = readRequests_().filter(function(x) { return x.id === String(id); })[0];
  if (r && r.month) { const __c = closedErr_(r.month); if (__c) return __c; }
  if (!r) return { success: false, error: 'Заявка не найдена.' };
  if (r.status !== RQ_PENDING) return { success: false, error: 'Заявка уже рассмотрена (' + r.status + ').' };
  // полномочия: финансовые заявки — только руководитель; учебные — учебная часть и руководитель
  if ((r.type === 'предоплата' || r.type === 'удаление_оплаты') && actual !== 'director') return { success: false, error: 'Финансовые заявки подтверждает только руководитель.' };
  if (r.type !== 'предоплата' && r.type !== 'удаление_оплаты' && actual === 'admin') return { success: false, error: 'Заявки по датам, настройкам групп и удалению учеников решает руководитель.' };
  if (r.type === 'удаление_оплаты') {
    let d = {}; try { d = JSON.parse(r.data || '{}'); } catch (e) {}
    if (!approve) {
      // вернуть оплату как было
      const back = savePaymentRow(password, d.month || r.month, d.teacher || r.teacher, d.group || r.group, d.row, { paid: d.paid, receipt: d.receipt, date: /^\d{4}-\d{2}-\d{2}$/.test(String(d.date)) ? d.date : (String(d.date).match(/^(\d{2})\.(\d{2})\.(\d{4})/) ? d.date.replace(/^(\d{2})\.(\d{2})\.(\d{4}).*$/, '$3-$2-$1') : isoToday_()), receiptTotal: d.paid });
      if (!back || !back.success) return { success: false, error: 'Не удалось вернуть оплату: ' + ((back && back.error) || 'ошибка') };
      sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_NO, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '')]]);
      logChanges_(String(d.teacher || r.teacher) + ' ← руководитель', String(d.group || r.group), d.row, String(d.student || ''), [['Оплата возвращена', 'удалена кассиром', d.paid + ' сом · ' + (d.receipt || '')]]);
      return { success: true, message: 'Оплата ' + d.paid + ' сом возвращена ученику ' + d.student + '.' };
    }
    sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_OK, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '')]]);
    return { success: true, message: 'Удаление оплаты подтверждено.' };
  }
  if (r.type === 'предоплата') {
    if (!approve) { sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_NO, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '')]]); return { success: true, message: 'Заявка на аннулирование предоплаты отклонена — предоплата остаётся.' }; }
    let d = {}; try { d = JSON.parse(r.data || '{}'); } catch (e) {}
    const vr = voidPrepayment_(d.prepayId, d.reason || r.now, 'руководитель (по заявке кассира)');
    if (!vr.success) return vr;
    sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_OK, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '')]]);
    return { success: true, message: vr.message };
  }

  if (!approve) {
    sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_NO, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '')]]);
    return { success: true, message: r.type === 'удаление' ? 'Запрос отклонён — ученик остаётся в группе. Преподаватель получит уведомление.' : 'Заявка отклонена — расписание осталось прежним.' };
  }

  if (r.type === 'кабинет') {
    let data = {}; try { data = JSON.parse(r.data || '{}'); } catch (e) {}
    const rc = setRoomChecked_(cfg, r.month, r.teacher, r.group, String(data.room || ''), String(data.days || ''), String(data.time || ''));
    if (rc.error) return { success: false, error: rc.error };
    sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_OK, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '')]]);
    logChanges_(r.teacher + ' ← ' + who, r.group, '', '(кабинет)', [['Кабинет', r.was, r.now]]);
    return { success: true, message: 'Кабинет подтверждён: ' + r.group + ' → кабинет ' + data.room + '.' };
  }
  if (r.type === 'удаление') {
    const res = cfg.useDb ? deleteStudentDb_(cfg, r, who) : deleteStudentJournals_(cfg, r, who);
    if (!res.success) return res;
    sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_DELETED, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '') + (res.already ? ' (ученик уже отсутствовал в группе)' : '')]]);
    if (res.already) return { success: true, message: 'Ученик ' + r.was + ' уже отсутствует в группе ' + r.group + ' — заявка закрыта.' };
    return { success: true, message: 'Ученик ' + r.was + ' удалён из группы ' + r.group + '. История сохранена в листе АРХИВ_УЧЕНИКОВ. Преподаватель получит уведомление.' };
  }

  if (cfg.useDb) {
    const res = applyRequestDb_(cfg, r, who);
    if (!res.success) return res;
    sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_OK, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '')]]);
    return { success: true, message: 'Заявка подтверждена, изменение внесено в базу.' };
  }
  const journal = findJournal_(cfg, r.month, r.teacher);
  if (!journal || !journal.attendanceId) return { success: false, error: 'Журнал посещений преподавателя за ' + r.month + ' не найден в листе ЖУРНАЛЫ.' };
  let ss; try { ss = SpreadsheetApp.openById(journal.attendanceId); } catch (e) { return { success: false, error: 'Не удалось открыть журнал: ' + e.message }; }
  const sheet = ss.getSheetByName(r.group);
  if (!sheet) return { success: false, error: 'Лист ' + r.group + ' не найден.' };

  let data = {}; try { data = JSON.parse(r.data || '{}'); } catch (e) {}
  if (r.type === 'дата') {
    const lesson = Number(r.lesson);
    if (!Number.isInteger(lesson) || lesson < 1 || lesson > ATT_COLS) return { success: false, error: 'Неверный номер занятия в заявке.' };
    if (data.iso && !/^\d{4}-\d{2}-\d{2}$/.test(data.iso)) return { success: false, error: 'Неверная дата в заявке.' };
    writeLessonDate_(sheet, lesson, data.iso || '');
    logChanges_(r.teacher + ' ← ' + who, r.group, '', '(дата занятия ' + lesson + ')', [['Дата занятия ' + lesson, r.was, r.now]]);
  } else if (r.type === 'настройки') {
    const meta0 = groupMetaFromGrid_(sheet.getRange('A1:U29').getDisplayValues(), Number(r.group.replace(/\D/g, '')), sheet);
    const cL = sheet.getRange(meta0.cells.level[0], meta0.cells.level[1]);
    const cT = sheet.getRange(meta0.cells.time[0], meta0.cells.time[1]);
    const cD = sheet.getRange(meta0.cells.days[0], meta0.cells.days[1]);
    const L = checkOption_(data.level, validationOptions_(cL), 'Уровень'); if (L.error) return { success: false, error: L.error };
    const Tm = checkOption_(data.time, validationOptions_(cT), 'Время занятий'); if (Tm.error) return { success: false, error: Tm.error };
    const D = checkOption_(data.days, validationOptions_(cD), 'Дни недели'); if (D.error) return { success: false, error: D.error };
    const changes = [];
    if (meta0.level !== L.value) changes.push(['Уровень группы', meta0.level, L.value]);
    if (meta0.time !== Tm.value) changes.push(['Время занятий', meta0.time, Tm.value]);
    if (meta0.days !== D.value) changes.push(['Дни недели', meta0.days, D.value]);
    cL.setValue(L.value); cT.setValue(Tm.value); cD.setValue(D.value);
    SpreadsheetApp.flush();
    if (changes.length) logChanges_(r.teacher + ' ← ' + who, r.group, '', '(настройки группы)', changes);
  } else {
    return { success: false, error: 'Неизвестный тип заявки: ' + r.type };
  }

  sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_OK, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '')]]);
  return { success: true, message: 'Заявка подтверждена, изменение внесено в журнал.' };
}

// ============================================================
// ЧАСТЬ 3б. СКИДКИ — РЕЕСТР, ЗАЯВКИ, АВТОПЕРЕНОС
// ============================================================

const DISCOUNT_SHEET = 'СКИДКИ';
const DISCOUNT_HEADERS = ['ID', 'Ученик', 'WhatsApp', 'Преподаватель', 'Группа', '%', 'Тип', 'Основание', 'Ключ основания', 'Комментарий', 'Статус', 'Кем создана', 'Создана', 'Кем решено', 'Решено', 'Месяц', 'Обновлена', 'Примечание', 'Семья (первый ребёнок)', 'Ключ семьи', 'Действует до', 'Порядок в семье'];
const FAMILY_PERCENTS = [20, 25, 30, 35, 40, 45];
const DISCOUNT_TYPES = { family: 'семья', teacher: 'преподаватель', orphan: 'сирота', special: 'исключение' };
const DS_ACTIVE = 'активна', DS_PENDING = 'ожидает', DS_DECLINED = 'отклонена', DS_REMOVED = 'снята', DS_AUTO = 'снята автоматически';

function discountSheet_(create) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(DISCOUNT_SHEET);
  if (!sh && create) {
    sh = ss.insertSheet(DISCOUNT_SHEET);
    sh.getRange(1, 1, 1, DISCOUNT_HEADERS.length).setValues([DISCOUNT_HEADERS]);
    sh.getRange(2, 3, 500, 1).setNumberFormat('@');
    styleConfigSheet_(sh, DISCOUNT_HEADERS.length, [90, 210, 120, 150, 90, 50, 110, 260, 160, 220, 150, 120, 130, 120, 130, 120, 130, 260, 220, 160, 130, 90]);
  }
  // новые столбцы (семья для 50%/100%, срок действия) — добавляются к существующему листу сами
  if (sh) {
    try {
      if (sh.getMaxColumns() < DISCOUNT_HEADERS.length) sh.insertColumnsAfter(sh.getMaxColumns(), DISCOUNT_HEADERS.length - sh.getMaxColumns());
      const hv = sh.getRange(1, 1, 1, DISCOUNT_HEADERS.length).getValues()[0];
      let fix = false; DISCOUNT_HEADERS.forEach(function(h, i) { if (String(hv[i] || '') !== h) { hv[i] = h; fix = true; } });
      if (fix) sh.getRange(1, 1, 1, DISCOUNT_HEADERS.length).setValues([hv]);
    } catch (e) {}
  }
  return sh;
}
/**
 * Настоящий первый ребёнок семьи: если указанный ученик сам состоит в семье (2-й, 3-й…) — возвращает её первого.
 * Защита от «ложной семьи» (цепочки). list — readDiscounts_().
 */
function resolveFamilyFirst_(list, name) {
  let key = studentKey_(name), first = String(name || '').trim(), guard = 0, redirected = false;
  while (guard++ < 10) {
    const m = list.filter(function(e) { return e.status === DS_ACTIVE && e.famKey && studentKey_(e.student) === key; })[0];
    if (!m || m.famKey === key) break;
    key = m.famKey; first = String(m.famName || '').split(' — ')[0].split(' (')[0].trim() || first; redirected = true;
  }
  return { key: key, first: first, redirected: redirected };
}
function famPosFromPayload_(payload) { const p = Math.round(parseNum_(payload.famPos)); return (p >= 2 && p <= 9) ? p : 0; }
/** Семейная привязка ученика с фиксированной скидкой (50%/100%) из payload: {famName, famGroup, famTeacher, famPos} */
function famLinkFromPayload_(payload, selfName, list) {
  const fn0 = String(payload.famName || '').trim();
  if (!fn0) return { famName: '', famKey: '', famPos: 0 };
  const rs = resolveFamilyFirst_(list || readDiscounts_(), fn0);
  const fn = rs.first;
  if (rs.key === studentKey_(selfName)) return { error: 'Первый ребёнок семьи не может совпадать с самим учеником.' };
  const grp = rs.redirected ? '' : (payload.famGroup || ''), tch = rs.redirected ? '' : (payload.famTeacher || '');
  return { famName: fn + (grp ? ' — ' + grp : '') + (tch ? ' (' + tch + ')' : ''), famKey: rs.key, famPos: famPosFromPayload_(payload), redirected: rs.redirected, first: fn };
}
/** Срок действия из payload: название месяца («Февраль 2027») или '' — бессрочно */
function untilFromPayload_(payload) {
  const u = String(payload.until || '').trim();
  if (!u) return { until: '' };
  if (!monthFromName_(u)) return { error: 'Неверный месяц окончания скидки.' };
  return { until: u };
}
/** Скидка с истёкшим сроком: месяц «до» уже прошёл относительно month */
function discountExpired_(e, month) {
  if (!e.until) return false;
  const a = monthSortKey_(e.until), b = monthSortKey_(month);
  return !!(a && b && b > a);
}
/**
 * Истечение срока фиксированных скидок (50%/100% «до месяца»): после месяца «до» запись
 * переходит в семейную (если ученик привязан к семье; процент поставит автопересчёт) или снимается.
 */
function expireFixedDiscounts_(cfg, sh, list, month) {
  let n = 0;
  list.forEach(function(e) {
    if (e.status !== DS_ACTIVE || e.type === DISCOUNT_TYPES.family || !discountExpired_(e, month)) return;
    const who = 'система';
    if (e.famKey) {
      const first = String(e.famName || '').split(' — ')[0].split(' (')[0].trim();
      sh.getRange(e.rowIndex, 6, 1, 4).setValues([[FAMILY_PERCENTS[0], DISCOUNT_TYPES.family, e.famName, e.famKey]]);
      sh.getRange(e.rowIndex, 17).setValue(new Date());
      sh.getRange(e.rowIndex, 18).setValue('срок скидки ' + e.percent + '% истёк (до ' + e.until + ') → семейная с ' + month);
      logChanges_(who, e.group || '', '', e.student, [['Скидка', e.type + ' ' + e.percent + '% (до ' + e.until + ')', 'семейная · первый: ' + first]]);
      e.type = DISCOUNT_TYPES.family; e.basis = e.famName; e.basisKey = e.famKey; e.percent = FAMILY_PERCENTS[0]; e.until = '';
    } else {
      setDiscountStatus_(sh, e, DS_AUTO, who, 'срок скидки истёк (до ' + e.until + ')');
      try { if (cfg.useDb) applyDiscountToDb_(cfg, month, { student: e.student, percent: 0 }); else applyDiscountToJournal_(cfg, month, { student: e.student, percent: 0, phone: e.phone }); } catch (err) {}
      logChanges_(who, e.group || '', '', e.student, [['Скидка', e.type + ' ' + e.percent + '% (до ' + e.until + ')', 'снята — срок истёк']]);
      e.status = DS_AUTO;
    }
    n++;
  });
  return n;
}

function studentKey_(name) { return nameKey_(name); }
function phoneKey_(p) { return String(p || '').replace(/\D/g, ''); }

/** Все записи реестра */
function readDiscounts_() {
  const sh = discountSheet_(false);
  if (!sh || sh.getLastRow() < 2) return [];
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, DISCOUNT_HEADERS.length).getValues();
  const out = [];
  rows.forEach(function(r, i) {
    if (!String(r[0] || '').trim()) return;
    out.push({
      rowIndex: i + 2, id: String(r[0]), student: String(r[1] || '').trim(), phone: phoneKey_(r[2]),
      teacher: String(r[3] || '').trim(), group: String(r[4] || '').trim(), percent: parseNum_(r[5]),
      type: String(r[6] || '').trim(), basis: String(r[7] || '').trim(), basisKey: String(r[8] || '').trim(),
      comment: String(r[9] || '').trim(), status: String(r[10] || '').trim(), createdBy: String(r[11] || ''),
      created: r[12], decidedBy: String(r[13] || ''), decided: r[14], month: String(r[15] || ''), note: String(r[17] || ''),
      famName: String(r[18] || '').trim(), famKey: '', until: String(r[20] || '').trim(), famPos: Math.round(parseNum_(r[21])) || 0
    });
    const e = out[out.length - 1];
    e.famKey = (e.type === DISCOUNT_TYPES.family) ? e.basisKey : String(r[19] || '').trim();
    if (e.type === DISCOUNT_TYPES.family) e.famName = e.basis;
  });
  return out;
}

function discountMatches_(e, name, phone) {
  const nk = studentKey_(name), pk = phoneKey_(phone);
  return (nk && studentKey_(e.student) === nk) || (pk && e.phone && e.phone === pk && nk && studentKey_(e.student) === nk);
}

/** Активная или ожидающая запись для ученика (по ФИО; телефон — дополнительная проверка) */
function findDiscountFor_(list, name, phone) {
  let best = null;
  for (let i = 0; i < list.length; i++) {
    const e = list[i];
    if (e.status !== DS_ACTIVE && e.status !== DS_PENDING) continue;
    if (!discountMatches_(e, name, phone)) continue;
    if (!best || e.status === DS_ACTIVE) best = e;
  }
  return best;
}

function publicDiscount_(e) {
  if (!e) return null;
  return { id: e.id, percent: e.percent, type: e.type, basis: e.basis, comment: e.comment, status: e.status, createdBy: e.createdBy, month: e.month, until: e.until || '', famName: (e.type !== DISCOUNT_TYPES.family && e.famName) ? e.famName : '' };
}

/**
 * Пересчёт семейных скидок по числу детей семьи, которые учатся сейчас.
 * Семья = первый ребёнок (основание) + все, у кого он указан основанием. Порядок — по дате регистрации скидки.
 * Присутствующие дети по порядку: 1-й — 0%, 2-й — 20%, 3-й — 25%, 4-й — 30%, 5-й — 35%, 6-й — 40%, 7-й+ — 45%.
 * Меняет процент в реестре (столбец F) у активных семейных записей. Возвращает число изменённых записей.
 */
/** Ключ настоящей семьи: если «первый ребёнок» сам член другой семьи — её ключ (самовосстановление цепочек) */
function canonicalFamilyKey_(list, key) {
  let k = key, guard = 0;
  while (guard++ < 10) {
    const m = list.filter(function(e) { return e.status === DS_ACTIVE && e.famKey && e.famKey !== k && studentKey_(e.student) === k; })[0];
    if (!m) break;
    k = m.famKey;
  }
  return k;
}
/**
 * Порядок детей в семье: записи с явным «Порядком в семье» занимают свои места (2-й, 3-й…),
 * остальные — по дате регистрации в оставшиеся места. Возвращает отсортированный массив.
 */
function orderFamilyEntries_(entries) {
  const fixedPos = entries.filter(function(e) { return e.famPos >= 2; }).sort(function(a, b) { return (a.famPos - b.famPos) || (a.rowIndex - b.rowIndex); });
  const free = entries.filter(function(e) { return !(e.famPos >= 2); }).sort(function(a, b) { return a.rowIndex - b.rowIndex; });
  const out = []; let slot = 2, fi = 0, ui = 0;
  while (fi < fixedPos.length || ui < free.length) {
    if (fi < fixedPos.length && (fixedPos[fi].famPos <= slot || ui >= free.length)) out.push(fixedPos[fi++]);
    else out.push(free[ui++]);
    slot++;
  }
  return out;
}
function recalcFamilyDiscounts_(sh, list, present, month) {
  const fam = {};
  // дети преподавателей (50%) и 100% — вне семейного порядка: у них своя фиксированная скидка
  const fixed = {};
  list.forEach(function(e) { if (e.status === DS_ACTIVE && e.type !== DISCOUNT_TYPES.family) fixed[studentKey_(e.student)] = true; });
  list.forEach(function(e) {
    if (e.status !== DS_ACTIVE || !e.famKey) return;
    if (e.type === DISCOUNT_TYPES.family && fixed[studentKey_(e.student)]) return;
    const k = canonicalFamilyKey_(list, e.famKey);
    (fam[k] = fam[k] || []).push(e);   // семейные + привязанные к семье 50%/100% (они занимают место в порядке)
  });
  let changed = 0;
  Object.keys(fam).forEach(function(basisKey) {
    const entries = orderFamilyEntries_(fam[basisKey]);
    // порядок семьи: первый ребёнок, затем дети по дате регистрации
    const order = [{ key: basisKey, entry: null }].concat(entries.map(function(e) { return { key: studentKey_(e.student), entry: e }; }));
    const seen = {};
    const presentOrder = order.filter(function(m) { if (seen[m.key]) return false; seen[m.key] = true; return !!present[m.key]; });
    presentOrder.forEach(function(m, pos) {
      if (!m.entry) return;                       // первый ребёнок без записи — платит полностью
      if (m.entry.type !== DISCOUNT_TYPES.family) return;   // 50%/100% — своя фиксированная скидка, но место в семье занимает
      const desired = pos === 0 ? 0 : (FAMILY_PERCENTS[Math.min(pos - 1, FAMILY_PERCENTS.length - 1)]);
      if (m.entry.percent !== desired) {
        sh.getRange(m.entry.rowIndex, 6).setValue(desired);
        sh.getRange(m.entry.rowIndex, 17).setValue(new Date());
        sh.getRange(m.entry.rowIndex, 18).setValue('автопересчёт ' + month + ': ' + (pos + 1) + '-й ребёнок из ' + presentOrder.length + ' обучающихся → ' + desired + '%');
        logChanges_('система', m.entry.group || '', '', m.entry.student, [['Семейная скидка', m.entry.percent + '%', desired + '% (' + (pos + 1) + '-й ребёнок семьи)']]);
        m.entry.percent = desired; changed++;
      }
    });
  });
  return changed;
}

function setDiscountStatus_(sh, e, status, by, note) {
  sh.getRange(e.rowIndex, 11).setValue(status);
  if (by) { sh.getRange(e.rowIndex, 14).setValue(by); sh.getRange(e.rowIndex, 15).setValue(new Date()); }
  sh.getRange(e.rowIndex, 17).setValue(new Date());
  if (note !== undefined) sh.getRange(e.rowIndex, 18).setValue(note);
}

/** Строка ученика в платёжном журнале: ФИО + WhatsApp из блока учеников */
function paymentRowIdentity_(sheet, paymentRow) {
  const i = paymentRow - PAY_FIRST_ROW;
  const name = String(sheet.getRange(paymentRow, COL_NAME).getDisplayValue() || '').trim();
  const phone = String(sheet.getRange(14 + i, 17).getDisplayValue() || '').trim();
  return { name: name, phone: phone };
}

/**
 * Оформить, изменить или снять скидку.
 * payload: {action:'set'|'remove', percent, type, basisName, basisGroup, basisTeacher, comment}
 */
function saveDiscount(role, password, month, teacherName, groupName, paymentRow, payload) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  if (getConfig_().useDb) return saveDiscountDb_(role, password, month, teacherName, groupName, paymentRow, payload);
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual !== String(role || '')) return { success: false, error: 'Неверный пароль.' };

  const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
  if (ctx.error) return ctx.error;
  payload = payload || {};

  const sh = discountSheet_(true);
  const list = readDiscounts_();
  const who = actual === 'director' ? 'руководитель' : 'кассир';
  const idn = paymentRowIdentity_(ctx.sheet, ctx.paymentRow);
  const existing = findDiscountFor_(list, idn.name, idn.phone);

  // ---- снять ----
  if (payload.action === 'remove') {
    if (!existing) return { success: false, error: 'У ученика нет скидки.' };
    if (existing.percent >= 50 && actual !== 'director') return { success: false, error: 'Скидку ' + existing.percent + '% может снять только руководитель.' };
    setDiscountStatus_(sh, existing, DS_REMOVED, who, 'снята вручную');
    ctx.sheet.getRange(ctx.paymentRow, COL_DISCOUNT).setValue(0);
    SpreadsheetApp.flush();
    return { success: true, discount: null, message: 'Скидка снята.' };
  }

  // ---- оформить ----
  const percent = Math.round(parseNum_(payload.percent));
  let type = '', basis = '', basisKey = '';
  const comment = String(payload.comment || '').trim();

  if (FAMILY_PERCENTS.indexOf(percent) !== -1) {
    if (existing && existing.type === DISCOUNT_TYPES.teacher && existing.status === DS_ACTIVE) return { success: false, error: 'Это ребёнок преподавателя — у него фиксированная скидка 50%. Семейные скидки (20–45%) на детей преподавателей не распространяются.' };
    type = DISCOUNT_TYPES.family;
    const bn0 = String(payload.basisName || '').trim();
    if (!bn0) return { success: false, error: 'Укажите первого ребёнка из этой семьи.' };
    const rs = resolveFamilyFirst_(list, bn0), bn = rs.first;
    if (rs.key === studentKey_(idn.name)) return { success: false, error: 'Первый ребёнок не может совпадать с самим учеником.' };
    basis = bn + (!rs.redirected && payload.basisGroup ? ' — ' + payload.basisGroup : '') + (!rs.redirected && payload.basisTeacher ? ' (' + payload.basisTeacher + ')' : '');
    basisKey = rs.key;
  } else if (percent === 50) {
    type = DISCOUNT_TYPES.teacher;
    const bt = String(payload.basisTeacher || '').trim();
    if (!bt) return { success: false, error: 'Выберите преподавателя, чей это ребёнок.' };
    basis = bt; basisKey = nameKey_(bt);
  } else if (percent === 100) {
    type = payload.type === 'orphan' ? DISCOUNT_TYPES.orphan : DISCOUNT_TYPES.special;
    if (!comment) return { success: false, error: 'Для скидки 100% укажите причину в комментарии.' };
    basis = type;
  } else {
    return { success: false, error: 'Допустимые скидки: 20, 25, 30, 35, 40, 45, 50, 100.' };
  }
  let famName = '', famKey = '', until = '', famPos = famPosFromPayload_(payload);
  if (type !== DISCOUNT_TYPES.family) {
    const fl = famLinkFromPayload_(payload, idn.name, list); if (fl.error) return { success: false, error: fl.error };
    const ul = untilFromPayload_(payload); if (ul.error) return { success: false, error: ul.error };
    famName = fl.famName; famKey = fl.famKey; until = ul.until;
  }

  const needsDirector = percent >= 50;
  const status = (needsDirector && actual !== 'director') ? DS_PENDING : DS_ACTIVE;

  if (existing) setDiscountStatus_(sh, existing, DS_REMOVED, who, 'заменена новой скидкой');

  const id = Utilities.formatDate(new Date(), 'Asia/Bishkek', 'yyMMddHHmmss') + String(Math.floor(Math.random() * 90 + 10));
  sh.appendRow([id, idn.name, idn.phone, ctx.teacher.short, ctx.groupName, percent, type, basis, basisKey, comment, status, who, new Date(),
    status === DS_ACTIVE ? who : '', status === DS_ACTIVE ? new Date() : '', ctx.month, new Date(), '', famName, famKey, until, famPos || '']);

  if (status === DS_ACTIVE) {
    ctx.sheet.getRange(ctx.paymentRow, COL_DISCOUNT).setValue(percent);
    SpreadsheetApp.flush();
  }

  const entry = { id: id, percent: percent, type: type, basis: basis, comment: comment, status: status, createdBy: who, month: ctx.month, until: until, famName: famName };
  return {
    success: true,
    discount: entry,
    message: (status === DS_ACTIVE ? 'Скидка ' + percent + '% применена.' : 'Заявка на скидку ' + percent + '% отправлена руководителю на подтверждение.') + (until ? ' Действует до ' + until + ' включительно.' : '') + (famName ? ' Ученик учтён в составе семьи.' : '')
  };
}

/** Заявки на подтверждение (руководитель) */
function getPendingDiscounts(role, password) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const list = readDiscounts_().filter(function(e) { return e.status === DS_PENDING; });
  return {
    success: true,
    items: list.map(function(e) {
      return { id: e.id, student: e.student, teacher: e.teacher, group: e.group, percent: e.percent, type: e.type, basis: e.basis, comment: e.comment,
               createdBy: e.createdBy, created: e.created instanceof Date ? Utilities.formatDate(e.created, 'Asia/Bishkek', 'dd.MM.yyyy HH:mm') : String(e.created || ''), month: e.month };
    })
  };
}

/** Решение по заявке (руководитель): approve = true/false */
function decideDiscount(role, password, id, approve, note) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  const sh = discountSheet_(true);
  const e = readDiscounts_().filter(function(x) { return x.id === String(id); })[0];
  if (e && e.month) { const __c = closedErr_(e.month); if (__c) return __c; }
  if (!e) return { success: false, error: 'Заявка не найдена.' };
  if (e.status !== DS_PENDING) return { success: false, error: 'Заявка уже рассмотрена (' + e.status + ').' };

  if (!approve) {
    setDiscountStatus_(sh, e, DS_DECLINED, 'руководитель', String(note || ''));
    return { success: true, message: 'Заявка отклонена.' };
  }
  setDiscountStatus_(sh, e, DS_ACTIVE, 'руководитель', String(note || ''));

  // применяем в журнал (или базу) текущего месяца
  const applied = cfg.useDb ? applyDiscountToDb_(cfg, cfg.currentMonth, e) : applyDiscountToJournal_(cfg, cfg.currentMonth, e);
  return { success: true, message: 'Скидка ' + e.percent + '% подтверждена' + (applied ? ' и применена в журнале.' : '. Ученик в журнале текущего месяца не найден — применится автоматически, как только появится.') };
}

/** Найти ученика в журнале месяца по ФИО/телефону и записать процент в C */
function applyDiscountToJournal_(cfg, month, e) {
  const journals = getJournalsForMonth_(cfg, month);
  const nk = studentKey_(e.student);
  for (let t = 0; t < journals.length; t++) {
    let ss; try { ss = SpreadsheetApp.openById(journals[t].paymentsId); } catch (err) { continue; }
    for (let g = 1; g <= 10; g++) {
      const sheet = ss.getSheetByName('Группа ' + g);
      if (!sheet || isHidden_(sheet)) continue;
      const names = sheet.getRange(PAY_FIRST_ROW, COL_NAME, PAY_ROWS, 1).getDisplayValues();
      for (let i = 0; i < PAY_ROWS; i++) {
        if (studentKey_(names[i][0]) === nk) {
          sheet.getRange(PAY_FIRST_ROW + i, COL_DISCOUNT).setValue(e.percent);
          SpreadsheetApp.flush();
          return true;
        }
      }
    }
  }
  return false;
}

/**
 * Автоперенос и автоснятие скидок — вызывается при сборе снимка текущего месяца.
 * scanned: [{sheet, teacher, group, students:[{i, name, phone, discount}]}]
 */
function applyRegisteredDiscounts_(cfg, month, scanned) {
  const sh = discountSheet_(false);
  if (!sh) return { applied: 0, removed: 0 };
  const list = readDiscounts_();
  if (!list.length) return { applied: 0, removed: 0 };

  // кто есть в журналах месяца
  const present = {};
  scanned.forEach(function(gr) { gr.students.forEach(function(st) { present[studentKey_(st.name)] = true; }); });

  let applied = 0, removed = 0;
  removed += expireFixedDiscounts_(cfg, sh, list, month);
  const active = list.filter(function(e) { return e.status === DS_ACTIVE; });

  // 1) семейные скидки: пересчёт по числу обучающихся детей семьи (ушёл 2-й → 3-й становится 2-м и т.д.)
  removed += recalcFamilyDiscounts_(sh, active, present, month);

  // 2) применить активные скидки тем, у кого в журнале другой процент
  scanned.forEach(function(gr) {
    gr.students.forEach(function(st) {
      const e = findDiscountFor_(active.filter(function(x) { return x.status === DS_ACTIVE; }), st.name, st.phone);
      if (!e) return;
      if (parseNum_(st.discount) !== e.percent) {
        gr.sheet.getRange(PAY_FIRST_ROW + st.i, COL_DISCOUNT).setValue(e.percent); applied++;
      }
    });
  });

  if (applied || removed) SpreadsheetApp.flush();
  return { applied: applied, removed: removed };
}

// ============================================================
// ЧАСТЬ 4. УПРАВЛЕНЧЕСКАЯ СВОДКА — СНИМОК ДАННЫХ + API
// ============================================================

/**
 * Обходит все журналы месяца и собирает снимок:
 *   по каждой группе — расписание, уровень, цена, ученики с оплатами,
 *   начислено / оплачено / долг / ФОТ; по преподавателю — итоги.
 * Сохраняет в скрытый лист _СНИМОК. Возвращает снимок.
 */
function buildMonitoringSnapshot(month) {

  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;
  const journals = getJournalsForMonth_(cfg, month);
  const CAP = cfg.capacity;

  const snap = {
    month: month,
    generatedAt: new Date().toISOString(),
    capacity: CAP,
    teachers: [],
    groups: [],
    errors: []
  };

  const r2 = function(x) { return Math.round(x * 100) / 100; };
  const scanned = [];
  const prices = readPrices_();
  const isCurrent = nameKey_(month) === nameKey_(cfg.currentMonth);

  journals.forEach(function(j) {

    const tcfg = findTeacherCfg_(cfg, j.teacher) || { short: j.teacher, full: '' };

    let ss;
    try {
      ss = SpreadsheetApp.openById(j.paymentsId);
    } catch (e) {
      snap.errors.push('Не удалось открыть журнал «' + j.teacher + '»: ' + e.message);
      return;
    }

    // ---- Коэффициент ФОТ из листа МОНИТОРИНГ (L9 общий, L11:L20 по группам) ----
    let coefDefault = cfg.defaultCoef;
    const coefByGroup = {};
    const mon = ss.getSheetByName('МОНИТОРИНГ');
    if (mon) {
      try {
        const v = mon.getRange('L9:L20').getValues();
        if (parseNum_(v[0][0]) > 0) coefDefault = parseNum_(v[0][0]);
        for (let g = 1; g <= 10; g++) {
          const c = parseNum_(v[g + 1][0]);
          if (c > 0) coefByGroup[g] = c;
        }
      } catch (e) {}
    }

    const T = {
      t: tcfg.short, tf: tcfg.full, coef: coefDefault,
      groupsTotal: 0, groupsActive: 0, n: 0,
      list: 0, acc: 0, paid: 0, debt: 0,
      full: 0, part: 0, none: 0, efot: 0, ffot: 0
    };

    for (let g = 1; g <= 10; g++) {
      const sheet = ss.getSheetByName('Группа ' + g);
      if (!sheet || isHidden_(sheet)) continue;   // скрытые преподавателем группы не учитываем

      let vals, disp;
      try {
        vals = sheet.getRange('A1:V51').getValues();
        disp = sheet.getRange('A1:V51').getDisplayValues();
      } catch (e) {
        snap.errors.push(j.teacher + ' / Группа ' + g + ': ' + e.message);
        continue;
      }
      const held = lessonsHeldFromGrid_(vals);

      let price = Math.round(parseNum_(vals[3][3]));             // D4
      if (isCurrent) {
        const ps = syncGroupPrice_(sheet, prices, String(disp[6][2] || '').trim(), vals[3][3]);
        if (ps.changed) {
          price = ps.price;
          try { vals = sheet.getRange('A1:V51').getValues(); disp = sheet.getRange('A1:V51').getDisplayValues(); } catch (e) {}
        } else if (ps.found) price = ps.price;
        if (!ps.found && ps.level && !/не назнач/i.test(ps.level)) snap.errors.push(j.teacher + ' / Группа ' + g + ': уровень «' + ps.level + '» не найден в листе ПРАЙС');
      }
      const G = {
        t: tcfg.short,
        tf: String(disp[6][14] || '').trim() || tcfg.full,        // O7
        g: 'Группа ' + g,
        gt: String(disp[5][2] || '').trim() || ('Группа - ' + g), // C6
        lvl: String(disp[6][2] || '').trim(),                     // C7
        time: String(disp[5][10] || '').trim(),                   // K6
        days: String(disp[6][10] || '').trim(),                   // K7
        price: price, cap: CAP, coef: coefByGroup[g] || coefDefault,
        held: held,
        n: 0, list: 0, acc: 0, paid: 0, debt: 0,
        full: 0, part: 0, none: 0, efot: 0, ffot: 0, pct: 0,
        st: []
      };

      for (let i = 0; i < 16; i++) {
        const sr = 13 + i;   // строка 14+i
        const pr = 35 + i;   // строка 36+i
        const name = String(disp[sr][1] || '').trim();
        const wa = String(disp[sr][16] || '').trim();
        if (!name && !wa) continue;

        G.n++;
        const tu = Math.round(parseNum_(vals[pr][3]));
        const pd = Math.round(parseNum_(vals[pr][17]));
        const bal = balanceOf_(vals[pr][3], vals[pr][17]);
        let les = parseNum_(vals[pr][21]) || LESSONS_PER_MONTH;
        if (les < 1 || les > LESSONS_PER_MONTH) les = LESSONS_PER_MONTH;

        G.acc += tu;
        G.paid += pd;
        G.debt += Math.max(bal, 0);
        if (tu > 0) {
          if (bal <= 0) G.full++;
          else if (pd > 0) G.part++;
          else G.none++;
        }

        G.st.push({
          n: name, w: wa, d: parseNum_(vals[pr][2]), tu: tu, p: pd, b: bal,
          r: String(disp[pr][19] || '').trim(), dt: String(disp[pr][18] || '').trim(),
          l: les, att: attendanceFromGrid_(vals, i), row: 36 + i
        });
      }

      scanned.push({ sheet: sheet, teacher: tcfg.short, group: 'Группа ' + g, students: G.st.map(function(x) { return { i: x.row - PAY_FIRST_ROW, name: x.n, phone: x.w, discount: x.d }; }) });
      G.list = G.n * price;
      G.efot = Math.round(G.acc * G.coef);
      G.ffot = Math.round(G.paid * G.coef);
      G.pct = G.acc ? r2(G.paid / G.acc * 100) : 0;

      T.groupsTotal++;
      if (G.n > 0) T.groupsActive++;
      T.n += G.n; T.list += G.list; T.acc += G.acc; T.paid += G.paid; T.debt += G.debt;
      T.full += G.full; T.part += G.part; T.none += G.none; T.efot += G.efot; T.ffot += G.ffot;

      snap.groups.push(G);
    }

    T.pct = T.acc ? r2(T.paid / T.acc * 100) : 0;
    T.fotPct = T.efot ? r2(T.ffot / T.efot * 100) : 0;
    T.fill = T.groupsActive ? r2(T.n / (T.groupsActive * CAP) * 100) : 0;
    snap.teachers.push(T);
  });

  // ---- Итого по центру ----
  const S = { teachers: snap.teachers.length, groupsTotal: 0, groupsActive: 0, n: 0, list: 0, acc: 0, paid: 0, debt: 0, full: 0, part: 0, none: 0, efot: 0, ffot: 0 };
  snap.teachers.forEach(function(T) {
    ['groupsTotal', 'groupsActive', 'n', 'list', 'acc', 'paid', 'debt', 'full', 'part', 'none', 'efot', 'ffot'].forEach(function(k) { S[k] += T[k]; });
  });
  S.pct = S.acc ? r2(S.paid / S.acc * 100) : 0;
  S.fotPct = S.efot ? r2(S.ffot / S.efot * 100) : 0;
  S.fill = S.groupsActive ? r2(S.n / (S.groupsActive * CAP) * 100) : 0;
  S.avg = S.n ? Math.round(S.acc / S.n) : 0;
  snap.totals = S;

  // автоперенос / автоснятие скидок — только для текущего месяца
  if (nameKey_(month) === nameKey_(cfg.currentMonth)) {
    try {
      const d = applyRegisteredDiscounts_(cfg, month, scanned);
      if (d.applied || d.removed) Logger.log('Скидки: применено ' + d.applied + ', снято ' + d.removed);
    } catch (e) { snap.errors.push('Скидки: ' + e.message); }
  }

  saveSnapshot_(snap);
  Logger.log('Снимок «' + month + '»: преподавателей ' + S.teachers + ', групп ' + S.groupsActive + '/' + S.groupsTotal +
    ', учеников ' + S.n + ', начислено ' + S.acc + ', оплачено ' + S.paid + '. Ошибок: ' + snap.errors.length);
  return snap;
}


const SNAPSHOT_CHUNK = 40000;

function getSnapshotSheet_(create) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(SNAPSHOT_SHEET);
  if (!sh && create) {
    sh = ss.insertSheet(SNAPSHOT_SHEET);
    sh.getRange(1, 1, 1, 3).setValues([['Месяц', 'Собрано (UTC)', 'Частей']]);
    try { sh.hideSheet(); } catch (e) {}
  }
  return sh;
}

function findSnapshotRow_(sh, month) {
  const last = sh.getLastRow();
  if (last < 2) return 0;
  const months = sh.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < months.length; i++) {
    if (String(months[i][0]).trim() === month) return i + 2;
  }
  return 0;
}

function saveSnapshot_(snap) {
  const sh = getSnapshotSheet_(true);
  const json = JSON.stringify(snap);
  const chunks = [];
  for (let i = 0; i < json.length; i += SNAPSHOT_CHUNK) chunks.push('#' + json.substr(i, SNAPSHOT_CHUNK));

  let row = findSnapshotRow_(sh, snap.month);
  if (!row) row = Math.max(sh.getLastRow() + 1, 2);

  const needCols = 3 + chunks.length;
  if (sh.getMaxColumns() < needCols) sh.insertColumnsAfter(sh.getMaxColumns(), needCols - sh.getMaxColumns());
  if (sh.getMaxRows() < row) sh.insertRowsAfter(sh.getMaxRows(), row - sh.getMaxRows());

  sh.getRange(row, 1, 1, sh.getMaxColumns()).clearContent();
  sh.getRange(row, 1, 1, needCols).setValues([[snap.month, snap.generatedAt, chunks.length].concat(chunks)]);
  SpreadsheetApp.flush();
}

function loadSnapshot_(month) {
  const cfg0 = getConfig_();
  if (cfg0.useDb) return buildSnapshotFromDb_(cfg0, month);
  const sh = getSnapshotSheet_(false);
  if (!sh) return null;
  const row = findSnapshotRow_(sh, month);
  if (!row) return null;
  const count = Number(sh.getRange(row, 3).getValue()) || 0;
  if (count < 1) return null;
  const parts = sh.getRange(row, 4, 1, count).getValues()[0];
  try {
    return JSON.parse(parts.map(function(p) { return String(p).substr(1); }).join(''));
  } catch (e) {
    return null;
  }
}


/**
 * Снимок для роли администратора: только индивидуальные данные учеников.
 * Убираются итоги по центру, суммы по преподавателям и группам, ФОТ.
 */
function filterSnapshotForRole_(snap, role) {
  if (role === 'director') return snap;
  const copy = JSON.parse(JSON.stringify(snap));
  delete copy.totals;
  copy.teachers = (copy.teachers || []).map(function(t) { return { t: t.t, tf: t.tf }; });
  copy.groups = (copy.groups || []).map(function(g) {
    return { t: g.t, tf: g.tf, g: g.g, gt: g.gt, lvl: g.lvl, time: g.time, days: g.days,
             price: g.price, cap: g.cap, held: g.held, n: g.n, st: g.st };
  });
  return copy;
}

/**
 * Данные для сводки / поиска / должников.
 * role = 'admin' | 'director'; forceRefresh = true — пересобрать снимок сейчас (30–90 секунд).
 */
function getAdminDashboard(role, password, month, forceRefresh, source) {
  try { if (staffRole_(getConfig_(), password) === 'books') return BOOKS_DENY; } catch (e) {}
  const out = getAdminDashboardInner_(role, password, month, forceRefresh, source);
  try { if (out && out.success && staffRole_(getConfig_(), password) === 'academic') stripMoney_(out); } catch (e) {}
  return out;
}
function getAdminDashboardInner_(role, password, month, forceRefresh, source) {

  const cfg = getConfig_();
  role = String(role || 'admin');
  const actual = staffRole_(cfg, password);
  if (!actual || actual !== role) return { success: false, error: 'Неверный пароль.' };

  month = String(month || '').trim() || cfg.currentMonth;
  if (cfg.useDb) source = 'db';
  if (cfg.months.indexOf(month) === -1 && String(source) !== 'db') {
    return { success: false, error: 'Месяц «' + month + '» не найден в листе ЖУРНАЛЫ.' };
  }

  let snapshot, built = false;
  if (String(source) === 'db') {
    snapshot = buildSnapshotFromDb_(cfg, month);
    built = true;
  } else {
    snapshot = forceRefresh ? null : loadSnapshot_(month);
    if (!snapshot) { snapshot = buildMonitoringSnapshot(month); built = true; }
  }

  return {
    success: true,
    source: String(source) === 'db' ? 'db' : 'journals',
    useDb: !!cfg.useDb,
    autoGlobal: !!cfg.autoNotices,
    remindersGlobal: !!cfg.remindersOn,
    remindHour: cfg.remindHour,
    teacherOrder: cfg.teacherOrder || [],
    groupsToday: cfg.useDb ? groupsTodayCount_(month) : null,
    role: role,
    months: cfg.useDb ? dbMonths_(cfg) : cfg.months,
    currentMonth: cfg.currentMonth,
    month: month,
    built: built,
    capacity: cfg.capacity,
    kassaOn: (typeof kassaOn_ === 'function') ? kassaOn_() : false,
    closedMonths: (function() { const c = closedMonths_(), o = {}; Object.keys(c).forEach(function(k) { o[c[k].month] = { at: c[k].at, by: c[k].by }; }); return o; })(),
    kassaUrl: (function() { try { return ScriptApp.getService().getUrl() + '?page=kassa'; } catch (e) { return ''; } })(),
    teachersInfo: cfg.teachers.map(function(t) {
      // коды доступа видят только руководитель и администратор (преподавателям этот метод недоступен)
      return { short: t.short, full: t.full, phone: t.phone, whatsapp: t.whatsapp, status: t.status, start: t.start, note: t.note, journalOn: t.journalOn !== false, codeSet: !!t.password, pwdChanged: t.pwdChanged || '' };
    }),
    snapshot: filterSnapshotForRole_(snapshot, role)
  };
}


// ============================================================
// ЧАСТЬ 5. ФОРМУЛА СТОИМОСТИ
// ============================================================

function tuitionFormula_(r) {
  return '=IF(B' + r + '="","",ROUND($D$4*(1-N(C' + r + ')/100)' +
    '*IF(N(V' + r + ')>0,N(V' + r + '),' + LESSONS_PER_MONTH + ')/' + LESSONS_PER_MONTH + ',0))';
}

function tuitionFormulaRu_(r) {
  return '=IF(B' + r + '="";"";ROUND($D$4*(1-N(C' + r + ')/100)' +
    '*IF(N(V' + r + ')>0;N(V' + r + ');' + LESSONS_PER_MONTH + ')/' + LESSONS_PER_MONTH + ';0))';
}

function rangeHasError_(range) {
  const values = range.getDisplayValues();
  for (let i = 0; i < values.length; i++) {
    for (let j = 0; j < values[i].length; j++) {
      if (String(values[i][j]).indexOf('#') === 0) return true;
    }
  }
  return false;
}

/**
 * Ставит формулу стоимости в D36:D51 на всех листах "Группа 1–10"
 * всех журналов из листа ЖУРНАЛЫ. Повторный запуск безопасен.
 */
function installTuitionFormulas() {

  const cfg = getConfig_();
  const formulasEn = [], formulasRu = [], balEn = [], balRu = [];
  for (let r = PAY_FIRST_ROW; r <= PAY_LAST_ROW; r++) {
    formulasEn.push([tuitionFormula_(r)]);
    formulasRu.push([tuitionFormulaRu_(r)]);
    balEn.push(['=IF(B' + r + '="","",N(D' + r + ')-N(R' + r + '))']);
    balRu.push(['=IF(B' + r + '="";"";N(D' + r + ')-N(R' + r + '))']);
  }

  let sheetsUpdated = 0, sheetsRuFallback = 0;
  const errors = [];
  const seen = {};

  cfg.journals.forEach(function(j) {
    if (seen[j.paymentsId]) return;
    seen[j.paymentsId] = true;

    let ss;
    try { ss = SpreadsheetApp.openById(j.paymentsId); }
    catch (e) { errors.push('Не удалось открыть журнал ' + j.teacher + ' (' + j.month + '): ' + e.message); return; }

    for (let g = 1; g <= 10; g++) {
      const groupName = 'Группа ' + g;
      const sheet = ss.getSheetByName(groupName);
      if (!sheet) continue;
      try {
        const range = sheet.getRange(PAY_FIRST_ROW, COL_TUITION, PAY_ROWS, 1);
        const brange = sheet.getRange(PAY_FIRST_ROW, COL_BALANCE, PAY_ROWS, 1);
        range.setFormulas(formulasEn);
        brange.setFormulas(balEn);
        SpreadsheetApp.flush();
        if (rangeHasError_(range) || rangeHasError_(brange)) {
          range.setFormulas(formulasRu);
          brange.setFormulas(balRu);
          SpreadsheetApp.flush();
          sheetsRuFallback++;
          if (rangeHasError_(range) || rangeHasError_(brange)) { errors.push(j.teacher + ' / ' + groupName + ': формула даёт ошибку.'); continue; }
        }
        sheetsUpdated++;
      } catch (e) {
        errors.push(j.teacher + ' / ' + groupName + ': ' + e.message);
      }
    }
  });

  const summary = 'Формулы стоимости (D) и остатка (U) установлены на ' + sheetsUpdated + ' листах' +
    (sheetsRuFallback ? ' (с разделителем ";": ' + sheetsRuFallback + ')' : '') +
    '. Ошибок: ' + errors.length + (errors.length ? '\n' + errors.join('\n') : '');
  Logger.log(summary);
  try { SpreadsheetApp.getActiveSpreadsheet().toast('Листов обновлено: ' + sheetsUpdated + '. Ошибок: ' + errors.length, 'Формула стоимости', 8); } catch (e) {}
  return summary;
}


// ============================================================
// ЧАСТЬ 6. АВТООБНОВЛЕНИЕ
// ============================================================

/** Вызывается триггером: список учеников + снимок текущего месяца */
function refreshAll() {
  const cfg = getConfig_();
  if (cfg.useDb) {
    try { applyRegisteredDiscountsDb_(cfg, cfg.currentMonth); } catch (e) { Logger.log('скидки: ' + e.message); }
    return;
  }
  try { updateStudentsList(); } catch (e) { Logger.log('updateStudentsList: ' + e.message); }
  try { buildMonitoringSnapshot(cfg.currentMonth); } catch (e) { Logger.log('buildMonitoringSnapshot: ' + e.message); }
}

/**
 * ЗАПУСТИТЬ ОДИН РАЗ: ставит автообновление refreshAll каждые 10 минут
 * (старые триггеры updateStudentsList / refreshAll удаляются).
 */
function createAutoRefreshTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    const fn = trigger.getHandlerFunction();
    if (fn === 'updateStudentsList' || fn === 'refreshAll') ScriptApp.deleteTrigger(trigger);
  });
  ScriptApp.newTrigger('refreshAll').timeBased().everyMinutes(10).create();
  try { SpreadsheetApp.getActiveSpreadsheet().toast('Автообновление установлено: каждые 10 минут.', 'Готово', 5); } catch (e) {}
  Logger.log('Триггер refreshAll (каждые 10 минут) установлен.');
}

/** Старое имя — оставлено для совместимости */
function createStudentsUpdateTrigger() {
  createAutoRefreshTrigger();
}


// ============================================================
// ЧАСТЬ 5. БАЗА ДАННЫХ (Э1): ЛИСТЫ УЧЕНИКИ / ГРУППЫ / СОСТАВ / ПОСЕЩЕНИЯ + ИМПОРТ ИЗ ЖУРНАЛОВ
// ============================================================
//
// Плоские таблицы без формул, пишет только скрипт. Ключи:
//   УЧЕНИКИ    — ID ученика (У-00001), поиск по нормализованному ФИО
//   ГРУППЫ     — ID группы (Г-00001), уникальность: месяц + преподаватель + номер
//   СОСТАВ     — ключ «IDгруппы|IDученика»
//   ПОСЕЩЕНИЯ  — ключ «IDгруппы|IDученика»
//
// importFromJournals(month) можно запускать многократно: обновляет, не дублирует.

const DB_STUDENTS = 'УЧЕНИКИ';
const DB_GROUPS = 'ГРУППЫ';
const DB_ROSTER = 'СОСТАВ';
const DB_ATT = 'ПОСЕЩЕНИЯ';

const DB_STUDENTS_H = ['ID', 'ФИО', 'WhatsApp', 'Тел. папы', 'Тел. мамы', 'Тел. ученика', 'Статус', 'Создан', 'Кем', 'Обновлён', 'Примечание', 'Адрес', 'Договор', 'Родители (ФИО)', 'Ключ'];
const DB_GROUPS_H = ['ID', 'Месяц', 'Преподаватель', '№', 'Название', 'Уровень', 'Дни', 'Время', 'Цена', 'Коэф. ФОТ',
  'Зан.1', 'Зан.2', 'Зан.3', 'Зан.4', 'Зан.5', 'Зан.6', 'Зан.7', 'Зан.8', 'Зан.9', 'Зан.10', 'Зан.11', 'Зан.12',
  'Статус', 'Обновлена', 'Источник', 'Ключ'];
const DB_ROSTER_H = ['ID группы', 'ID ученика', '№', 'ФИО', 'Скидка %', 'Занятий', 'Стоимость', 'Оплачено', 'Квитанция', 'Дата оплаты',
  'Увед.1', 'Увед.2', 'Увед.3', 'Комментарий', 'Обновлено', 'Кто внёс оплату', 'Оплата внесена', 'Правка оплаты',
  'Разбивка по квитанциям', 'Ключ'];
const DB_ATT_H = ['ID группы', 'ID ученика', 'ФИО', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'Обновлено', 'Ключ'];

/** Кэш справочников на 2 минуты (CacheService); сбрасывается при записи через cacheDrop_ */
function cacheGet_(key, builder) {
  const c = CacheService.getScriptCache();
  try { const v = c.get('ref:' + key); if (v) return JSON.parse(v); } catch (e) {}
  const val = builder();
  try { const str = JSON.stringify(val); if (str.length < 90000) c.put('ref:' + key, str, 120); } catch (e) {}
  return val;
}
function cacheDrop_(key) { try { CacheService.getScriptCache().remove('ref:' + key); } catch (e) {} }

function dbSheet_(name, headers, widths) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    styleConfigSheet_(sh, headers.length, widths);
    sh.getRange(2, 1, 2000, headers.length).setNumberFormat('@');
    return sh;
  }
  // новые столбцы (например, Адрес/Договор у учеников) вставляются перед «Ключ», чтобы ключ остался последним
  try {
    const cur = sh.getRange(1, 1, 1, Math.max(sh.getLastColumn(), 1)).getValues()[0].map(function(x) { return String(x || '').trim(); });
    // заголовок уже такой, какой нужен — ничего не двигаем (иначе столбцы уезжали при каждом обращении)
    const same = headers.every(function(h, i) { return cur[i] === h; });
    if (same) return sh;
    const hk = cur.indexOf('Ключ'), target = headers.length - 1;
    if (hk !== -1 && hk < target) {
      sh.insertColumnsBefore(hk + 1, target - hk);
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
      sh.getRange(2, hk + 1, Math.max(sh.getMaxRows() - 1, 1), target - hk).setNumberFormat('@');
      __dbMemo = {};
    } else if (hk === -1 && sh.getMaxColumns() < headers.length) {
      sh.insertColumnsAfter(sh.getMaxColumns(), headers.length - sh.getMaxColumns());
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    }
  } catch (e) {}
  return sh;
}

/** ЗАПУСТИТЬ ОДИН РАЗ: создать листы базы (существующие не трогает) */
function setupDatabaseSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const created = [];
  [[DB_STUDENTS, DB_STUDENTS_H, [90, 240, 130, 120, 120, 120, 90, 130, 110, 130, 200, 220, 120, 220, 200]],
   [DB_GROUPS, DB_GROUPS_H, [90, 120, 150, 40, 130, 130, 120, 110, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 90, 130, 200, 200]],
   [DB_ROSTER, DB_ROSTER_H, [90, 90, 40, 240, 70, 70, 90, 90, 150, 100, 130, 130, 130, 200, 130, 130, 130, 220, 240, 200]],
   [DB_ATT, DB_ATT_H, [90, 90, 240, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 130, 200]]
  ].forEach(function(d) { if (!ss.getSheetByName(d[0])) { dbSheet_(d[0], d[1], d[2]); created.push(d[0]); } });
  const msg = created.length ? 'Созданы листы базы: ' + created.join(', ') : 'Листы базы уже существуют.';
  Logger.log(msg);
  return msg;
}

/** Читает лист целиком: {rows, byKey, keyCol} — keyCol: индекс столбца «Ключ» (0-based) */
function dbRead_(sh, headers) {
  const keyCol = headers.length - 1;
  const last = sh.getLastRow();
  const cols = Math.min(headers.length, sh.getMaxColumns());
  const rows = last >= 2 ? sh.getRange(2, 1, last - 1, cols).getValues() : [];
  if (cols < headers.length) rows.forEach(function(r) { while (r.length < headers.length) r.push(''); });
  const byKey = {};
  rows.forEach(function(r, i) { const k = String(r[keyCol] || ''); if (k) byKey[k] = i; });
  return { rows: rows, byKey: byKey, keyCol: keyCol };
}

/** Записывает весь массив строк обратно (после upsert в памяти) */
function dbWrite_(sh, headers, rows) {
  dbInvalidate_();
  const last = sh.getLastRow();
  if (last >= 2) sh.getRange(2, 1, last - 1, headers.length).clearContent();
  if (rows.length) {
    rows = rows.map(function(r) { r = r.slice(0, headers.length); while (r.length < headers.length) r.splice(r.length - 1, 0, ''); return r; });
    sh.getRange(2, 1, rows.length, headers.length).setNumberFormat('@');
    sh.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
}

function dbUpsert_(db, key, makeRow, mergeRow) {
  const i = db.byKey[key];
  if (i === undefined) { const r = makeRow(); r[db.keyCol] = key; db.rows.push(r); db.byKey[key] = db.rows.length - 1; return db.rows.length - 1; }
  if (mergeRow) mergeRow(db.rows[i]);
  return i;
}

function nextId_(prefix, rows, col) {
  let max = 0;
  rows.forEach(function(r) { const m = String(r[col] || '').match(/(\d+)$/); if (m) max = Math.max(max, Number(m[1])); });
  return prefix + String(max + 1).padStart(5, '0');
}

function dateOrEmpty_(v, tz) {
  return (v instanceof Date && !isNaN(v)) ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : '';
}

/**
 * ИМПОРТ ЖУРНАЛОВ МЕСЯЦА В БАЗУ. month — «Сентябрь 2026»; пусто = ТЕКУЩИЙ_МЕСЯЦ.
 * Ученики: NEW (если назначен), иначе PAYMENTS. Оплаты и статусы уведомлений: PAYMENTS.
 * Отметки посещения: NEW, иначе PAYMENTS (импортированные).
 */
function importFromJournals(month) {
  const started = Date.now();
  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;
  setupDatabaseSheets();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shS = ss.getSheetByName(DB_STUDENTS), shG = ss.getSheetByName(DB_GROUPS), shR = ss.getSheetByName(DB_ROSTER), shA = ss.getSheetByName(DB_ATT);
  const S = dbRead_(shS, DB_STUDENTS_H), G = dbRead_(shG, DB_GROUPS_H), R = dbRead_(shR, DB_ROSTER_H), A = dbRead_(shA, DB_ATT_H);
  const prices = readPrices_();
  const now = new Date();
  const stamp = Utilities.formatDate(now, TZ, 'dd.MM.yyyy HH:mm');
  const journals = getJournalsForMonth_(cfg, month);
  const log = [];
  let groupsN = 0, studentsNew = 0, rosterN = 0, attN = 0, discN = 0;
  const discSheet = discountSheet_(true), discList = readDiscounts_();
  const discActiveByName = {};
  discList.forEach(function(e) { if (e.status === DS_ACTIVE || e.status === DS_PENDING) discActiveByName[studentKey_(e.student)] = true; });

  // индекс учеников по ключу ФИО
  const studentByName = {};
  S.rows.forEach(function(r, i) { const k = String(r[11] || nameKey_(r[1])); if (k) studentByName[k] = i; });

  function ensureStudent(name, wa, dad, mom, stu, note, who) {
    const k = nameKey_(name);
    if (!k) return null;
    let i = studentByName[k];
    if (i === undefined) {
      const id = nextId_('У-', S.rows, 0);
      S.rows.push([id, name, phoneKey_(wa), dad, mom, stu, 'учится', stamp, who, stamp, note, '', '', '', k]);
      i = S.rows.length - 1; studentByName[k] = i; S.byKey[k] = i; studentsNew++;
    } else {
      const r = S.rows[i];
      if (!String(r[2]) && wa) r[2] = phoneKey_(wa);
      if (!String(r[3]) && dad) r[3] = dad;
      if (!String(r[4]) && mom) r[4] = mom;
      if (!String(r[5]) && stu) r[5] = stu;
      if (!String(r[10]) && note) r[10] = note;
      r[9] = stamp;
    }
    return S.rows[i][0];
  }

  journals.forEach(function(j) {
    const tcfg = findTeacherCfg_(cfg, j.teacher) || { short: j.teacher, full: '' };
    let pss = null, nss = null;
    try { pss = SpreadsheetApp.openById(j.paymentsId); } catch (e) { log.push(j.teacher + ': PAYMENTS не открылся — ' + e.message); return; }
    if (j.attendanceId) { try { nss = SpreadsheetApp.openById(j.attendanceId); } catch (e) { log.push(j.teacher + ': NEW не открылся — ' + e.message); } }
    const ptz = pss.getSpreadsheetTimeZone() || TZ, ntz = nss ? (nss.getSpreadsheetTimeZone() || TZ) : ptz;

    for (let g = 1; g <= 10; g++) {
      const gname = 'Группа ' + g;
      const psh = pss.getSheetByName(gname);
      if (!psh) continue;
      const nsh = nss ? nss.getSheetByName(gname) : null;
      const hidden = isHidden_(psh) && (!nsh || isHidden_(nsh));

      let pv, pd, nv = null, nd = null;
      try { pv = psh.getRange('A1:V51').getValues(); pd = psh.getRange('A1:V51').getDisplayValues(); } catch (e) { log.push(j.teacher + ' / ' + gname + ': ' + e.message); continue; }
      if (nsh) { try { nv = nsh.getRange('A1:V29').getValues(); nd = nsh.getRange('A1:V29').getDisplayValues(); } catch (e) { nv = null; nd = null; } }

      const srcD = nd || pd, srcV = nv || pv, srcTz = nd ? ntz : ptz, srcSheet = nsh || psh;
      const meta = groupMetaFromGrid_(srcD, g, srcSheet);
      const price = priceFor_(prices, meta.level);
      const priceVal = price !== null ? price : Math.round(parseNum_(pv[3][3]));
      const coef = (function() { try { return parseNum_(pss.getSheetByName('МОНИТОРИНГ').getRange(10 + g, 12).getValue()) || cfg.defaultCoef; } catch (e) { return cfg.defaultCoef; } })();

      // ---- группа ----
      const gkey = nameKey_(month) + '|' + nameKey_(tcfg.short) + '|' + g;
      const dates = [];
      for (let k = 0; k < 12; k++) dates.push(dateOrEmpty_(srcV[ATT_DATES_ROW - 1][ATT_FIRST_COL - 1 + k], srcTz));
      let gid;
      dbUpsert_(G, gkey, function() {
        gid = nextId_('Г-', G.rows, 0);
        return [gid, month, tcfg.short, g, meta.title, meta.level, meta.days, meta.time, priceVal, coef].concat(dates).concat([hidden ? 'скрыта' : 'активна', stamp, (j.attendanceId || '') + ' / ' + j.paymentsId, gkey]);
      }, function(r) {
        gid = r[0];
        r[4] = meta.title; r[5] = meta.level; r[6] = meta.days; r[7] = meta.time; r[8] = priceVal; r[9] = coef;
        for (let k = 0; k < 12; k++) r[10 + k] = dates[k];
        r[22] = hidden ? 'скрыта' : 'активна'; r[23] = stamp; r[24] = (j.attendanceId || '') + ' / ' + j.paymentsId;
      });
      groupsN++;
      if (hidden) continue;

      // ---- ученики, состав, посещения ----
      for (let i = 0; i < 16; i++) {
        const sr = 13 + i, pr = PAY_FIRST_ROW - 1 + i;
        const name = String(srcD[sr][1] || '').trim();
        if (!name) continue;
        const wa = String(srcD[sr][16] || '').trim(), dad = String(srcD[sr][17] || '').trim(), mom = String(srcD[sr][18] || '').trim(), stu = String(srcD[sr][19] || '').trim(), note = String(srcD[sr][20] || '').trim();
        const sid = ensureStudent(name, wa, dad, mom, stu, note, 'импорт ' + tcfg.short);
        if (!sid) continue;

        const discount = Math.round(parseNum_(pv[pr][2]));
        const lessons = Math.round(parseNum_(pv[pr][21])) || 12;
        const tuition = Math.round(priceVal * (1 - discount / 100) * lessons / 12);
        const paid = Math.round(parseNum_(pv[pr][17]));
        const receipt = String(pd[pr][19] || '').trim();
        const payDate = dateOrEmpty_(pv[pr][18], ptz) || String(pd[pr][18] || '').trim();
        const n1 = String(pd[pr][6] || '').trim(), n2 = String(pd[pr][10] || '').trim(), n3 = String(pd[pr][14] || '').trim();

        // скидка только в журнале (без записи в реестре) → регистрируем как активную, чтобы переносилась на новый месяц
        if (discount > 0 && !discActiveByName[nameKey_(name)]) {
          discSheet.appendRow([Utilities.formatDate(now, TZ, 'yyMMddHHmmss') + String(Math.floor(Math.random() * 90 + 10)), name, phoneKey_(wa), tcfg.short, gname, discount, 'из журнала', 'импорт из журнала за ' + month, '', '', DS_ACTIVE, 'импорт', now, 'импорт', now, month, now, 'основание не указано — уточните тип скидки']);
          discActiveByName[nameKey_(name)] = true; discN++;
        }

        const rkey = gid + '|' + sid;
        dbUpsert_(R, rkey, function() {
          return [gid, sid, i + 1, name, discount, lessons, tuition, paid, receipt, payDate, n1, n2, n3, note, stamp, rkey];
        }, function(r) {
          r[2] = i + 1; r[3] = name; r[4] = discount; r[5] = lessons; r[6] = tuition; r[7] = paid; r[8] = receipt; r[9] = payDate;
          r[10] = n1; r[11] = n2; r[12] = n3; r[13] = note; r[14] = stamp;
        });
        rosterN++;

        const marks = [];
        for (let k = 0; k < 12; k++) marks.push(String(srcD[sr][ATT_FIRST_COL - 1 + k] || '').trim().replace(',', '.'));
        dbUpsert_(A, rkey, function() { return [gid, sid, name].concat(marks).concat([stamp, rkey]); },
          function(r) { r[2] = name; for (let k = 0; k < 12; k++) r[3 + k] = marks[k]; r[15] = stamp; });
        attN++;
      }
    }
  });

  dbWrite_(shS, DB_STUDENTS_H, S.rows);
  dbWrite_(shG, DB_GROUPS_H, G.rows);
  dbWrite_(shR, DB_ROSTER_H, R.rows);
  dbWrite_(shA, DB_ATT_H, A.rows);

  const msg = 'Импорт «' + month + '»: групп ' + groupsN + ', строк состава ' + rosterN + ', посещений ' + attN + ', новых учеников ' + studentsNew +
    ' (всего в базе ' + S.rows.length + ')' + (discN ? ', скидок занесено в реестр: ' + discN : '') + '. Время: ' + Math.round((Date.now() - started) / 1000) + ' с.' + (log.length ? '\nЗамечания:\n' + log.join('\n') : '');
  Logger.log(msg);
  try { ss.toast('Импорт завершён: групп ' + groupsN + ', учеников ' + rosterN, 'База данных', 8); } catch (e) {}
  return msg;
}

/**
 * СВЕРКА базы с последним снимком журналов за месяц: по каждой группе — ученики, начислено, оплачено.
 * Результат — в журнале выполнения.
 */
function verifyImport(month) {
  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;
  const snap = loadSnapshot_(month);
  if (!snap) return 'Снимок за ' + month + ' не найден — запустите buildMonitoringSnapshot.';
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const G = dbRead_(ss.getSheetByName(DB_GROUPS), DB_GROUPS_H), R = dbRead_(ss.getSheetByName(DB_ROSTER), DB_ROSTER_H);
  const byGid = {};
  R.rows.forEach(function(r) { const gid = r[0]; if (!byGid[gid]) byGid[gid] = { n: 0, acc: 0, paid: 0 }; byGid[gid].n++; byGid[gid].acc += Math.round(parseNum_(r[6])); byGid[gid].paid += Math.round(parseNum_(r[7])); });
  const out = [], diffs = [];
  let tot = { n: 0, acc: 0, paid: 0 }, totS = { n: 0, acc: 0, paid: 0 };
  G.rows.forEach(function(g) {
    if (nameKey_(g[1]) !== nameKey_(month) || String(g[22]) === 'скрыта') return;
    const d = byGid[g[0]] || { n: 0, acc: 0, paid: 0 };
    const sg = (snap.groups || []).filter(function(x) { return nameKey_(x.t) === nameKey_(g[2]) && Number(String(x.g).replace(/\D/g, '')) === Number(g[3]); })[0];
    const sn = sg ? sg.n : 0, sacc = sg ? Math.round(sg.acc) : 0, spaid = sg ? Math.round(sg.paid) : 0;
    tot.n += d.n; tot.acc += d.acc; tot.paid += d.paid; totS.n += sn; totS.acc += sacc; totS.paid += spaid;
    const ok = d.n === sn && d.acc === sacc && d.paid === spaid;
    const line = (ok ? '✓ ' : '✗ ') + g[2] + ' / Группа ' + g[3] + ': база ' + d.n + ' уч., ' + d.acc + ' / ' + d.paid + ' сом · снимок ' + sn + ' уч., ' + sacc + ' / ' + spaid + ' сом';
    out.push(line); if (!ok) diffs.push(line);
  });
  const summary = 'СВЕРКА «' + month + '» — база: ' + tot.n + ' уч., начислено ' + tot.acc + ', оплачено ' + tot.paid + ' · снимок: ' + totS.n + ' уч., ' + totS.acc + ', ' + totS.paid +
    '\nРасхождений: ' + diffs.length + (diffs.length ? '\n' + diffs.join('\n') : '') + '\n\n' + out.join('\n');
  Logger.log(summary);
  return summary;
}


// ============================================================
// ЧАСТЬ 5б. СВОДКА ИЗ БАЗЫ (Э2) — та же структура, что снимок журналов
// ============================================================

/** Снимок из базы за месяц — структура идентична buildMonitoringSnapshot */
/** Кэш больших значений в CacheService (лимит 100 КБ на ключ) — режем на части */
function cachePutBig_(key, str, ttl) {
  try { const c = CacheService.getScriptCache(), CH = 90000, n = Math.ceil(str.length / CH), obj = {}; for (let i = 0; i < n; i++) obj[key + '#' + i] = str.substr(i * CH, CH); obj[key + '#n'] = String(n); c.putAll(obj, ttl); } catch (e) {}
}
function cacheGetBig_(key) {
  try { const c = CacheService.getScriptCache(), n = Number(c.get(key + '#n') || 0); if (!n) return null; const keys = []; for (let i = 0; i < n; i++) keys.push(key + '#' + i); const got = c.getAll(keys); let out = ''; for (let i = 0; i < n; i++) { const p = got[key + '#' + i]; if (p === undefined || p === null) return null; out += p; } return out; } catch (e) { return null; }
}
/** Сводка из базы с кэшем: пока данные не менялись (DATA_STAMP), повторные запросы берут готовую сводку из кэша (до 10 минут) */
function buildSnapshotFromDb_(cfg, month) {
  let stamp = '0'; try { stamp = String(PropertiesService.getScriptProperties().getProperty('DATA_STAMP') || '0'); } catch (e) {}
  const key = 'snap|' + nameKey_(month) + '|' + stamp;
  if (!__stampTouched) { const hit = cacheGetBig_(key); if (hit) { try { return JSON.parse(hit); } catch (e) {} } }
  const snap = buildSnapshotFromDbRaw_(cfg, month);
  try { if (!__stampTouched) cachePutBig_(key, JSON.stringify(snap), 600); } catch (e) {}
  return snap;
}
function buildSnapshotFromDbRaw_(cfg, month) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const shG = ss.getSheetByName(DB_GROUPS), shR = ss.getSheetByName(DB_ROSTER), shA = ss.getSheetByName(DB_ATT);
  const CAP = cfg.capacity;
  const snap = { month: month, generatedAt: new Date().toISOString(), capacity: CAP, teachers: [], groups: [], errors: [], source: 'db' };
  const r2 = function(x) { return Math.round(x * 100) / 100; };
  if (!shG || !shR) { snap.errors.push('База не создана — запустите importFromJournals.'); snap.totals = { teachers: 0, groupsTotal: 0, groupsActive: 0, n: 0, list: 0, acc: 0, paid: 0, debt: 0, full: 0, part: 0, none: 0, efot: 0, ffot: 0, pct: 0, fotPct: 0, fill: 0, avg: 0 }; return snap; }

  try { dbSheet_(DB_ROSTER, DB_ROSTER_H, null); } catch (e) {}   // новые столбцы оплаты добавляются сами
  const G = dbRead_(shG, DB_GROUPS_H), R = dbRead_(shR, DB_ROSTER_H), A = shA ? dbRead_(shA, DB_ATT_H) : { rows: [] };
  const todayIso = isoToday_();
  const rosterByGid = {}, attByKey = {};
  R.rows.forEach(function(r) { (rosterByGid[r[0]] = rosterByGid[r[0]] || []).push(r); });
  A.rows.forEach(function(r) { attByKey[r[16]] = r; });

  const teachers = {};
  const order = [];
  G.rows.filter(function(g) { return nameKey_(g[1]) === nameKey_(month); })
    .sort(function(a, b) { return (a[2] === b[2]) ? Number(a[3]) - Number(b[3]) : String(a[2]).localeCompare(String(b[2]), 'ru'); })
    .forEach(function(g) {
      const tshort = String(g[2]);
      if (!teachers[tshort]) {
        const tcfg = findTeacherCfg_(cfg, tshort) || { short: tshort, full: '' };
        teachers[tshort] = { t: tshort, tf: tcfg.full, coef: cfg.defaultCoef, groupsTotal: 0, groupsActive: 0, n: 0, list: 0, acc: 0, paid: 0, debt: 0, full: 0, part: 0, none: 0, efot: 0, ffot: 0 };
        order.push(tshort);
      }
      const T = teachers[tshort];
      if (String(g[22]) === 'скрыта') return;
      const price = Math.round(parseNum_(g[8]));
      const coef = parseNum_(g[9]) || cfg.defaultCoef;
      let held = 0;
      for (let k = 0; k < 12; k++) { const iso = String(g[10 + k] || ''); if (iso && iso <= todayIso) held++; }
      const GG = { t: tshort, tf: T.tf, g: 'Группа ' + g[3], gt: String(g[4] || ''), lvl: String(g[5] || ''), time: String(g[7] || ''), days: String(g[6] || ''),
        price: price, cap: CAP, coef: coef, held: held, n: 0, list: 0, acc: 0, paid: 0, debt: 0, full: 0, part: 0, none: 0, efot: 0, ffot: 0, pct: 0, st: [], gid: g[0] };
      (rosterByGid[g[0]] || []).sort(function(a, b) { return Number(a[2]) - Number(b[2]); }).forEach(function(r) {
        GG.n++;
        const tu = Math.round(parseNum_(r[6])), pd = Math.round(parseNum_(r[7])), bal = tu - pd;
        let les = Math.round(parseNum_(r[5])) || LESSONS_PER_MONTH; if (les < 1 || les > LESSONS_PER_MONTH) les = LESSONS_PER_MONTH;
        GG.acc += tu; GG.paid += pd; GG.debt += Math.max(bal, 0);
        if (tu > 0) { if (bal <= 0) GG.full++; else if (pd > 0) GG.part++; else GG.none++; }
        const a = attByKey[r[15]];
        let att = 0;
        if (a) for (let k = 0; k < 12; k++) { const v = parseFloat(String(a[3 + k] || '').replace(',', '.')); if (!isNaN(v)) att += v; }
        const dt = String(r[9] || '');
        GG.st.push({ n: String(r[3] || ''), w: String(r[1] ? (studentPhone_(r[1]) || '') : ''), d: parseNum_(r[4]), tu: tu, p: pd, b: bal,
          r: String(r[8] || ''), dt: /^\d{4}-\d{2}-\d{2}$/.test(dt) ? dt.split('-').reverse().join('.') : dt, up: String(r[14] || ''), l: les, att: att, row: PAY_FIRST_ROW + Number(r[2]) - 1, sid: r[1] });
      });
      GG.list = GG.n * price;
      GG.efot = Math.round(GG.acc * coef); GG.ffot = Math.round(GG.paid * coef);
      GG.pct = GG.acc ? r2(GG.paid / GG.acc * 100) : 0;
      T.groupsTotal++; if (GG.n > 0) T.groupsActive++;
      T.n += GG.n; T.list += GG.list; T.acc += GG.acc; T.paid += GG.paid; T.debt += GG.debt;
      T.full += GG.full; T.part += GG.part; T.none += GG.none; T.efot += GG.efot; T.ffot += GG.ffot;
      snap.groups.push(GG);
    });

  order.forEach(function(k) {
    const T = teachers[k];
    T.pct = T.acc ? r2(T.paid / T.acc * 100) : 0;
    T.fotPct = T.efot ? r2(T.ffot / T.efot * 100) : 0;
    T.fill = T.groupsActive ? r2(T.n / (T.groupsActive * CAP) * 100) : 0;
    snap.teachers.push(T);
  });
  const S = { teachers: snap.teachers.length, groupsTotal: 0, groupsActive: 0, n: 0, list: 0, acc: 0, paid: 0, debt: 0, full: 0, part: 0, none: 0, efot: 0, ffot: 0 };
  snap.teachers.forEach(function(T) { ['groupsTotal', 'groupsActive', 'n', 'list', 'acc', 'paid', 'debt', 'full', 'part', 'none', 'efot', 'ffot'].forEach(function(k) { S[k] += T[k]; }); });
  S.pct = S.acc ? r2(S.paid / S.acc * 100) : 0;
  S.fotPct = S.efot ? r2(S.ffot / S.efot * 100) : 0;
  S.fill = S.groupsActive ? r2(S.n / (S.groupsActive * CAP) * 100) : 0;
  S.avg = S.n ? Math.round(S.acc / S.n) : 0;
  snap.totals = S;
  return snap;
}

let studentPhoneCache_ = null;
/** WhatsApp ученика по ID (кэш листа УЧЕНИКИ на время выполнения) */
function studentPhone_(sid) {
  if (!studentPhoneCache_) {
    studentPhoneCache_ = {};
    try {
      const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DB_STUDENTS);
      if (sh && sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues().forEach(function(r) { studentPhoneCache_[String(r[0])] = String(r[2] || ''); });
    } catch (e) {}
  }
  return studentPhoneCache_[String(sid)] || '';
}


// ============================================================
// ЧАСТЬ 6. РЕЖИМ «БАЗА» (Э3): кабинеты работают с листами УЧЕНИКИ / ГРУППЫ / СОСТАВ / ПОСЕЩЕНИЯ
// ============================================================
// Индексы столбцов (0-based)
const GR = { id: 0, month: 1, teacher: 2, num: 3, title: 4, level: 5, days: 6, time: 7, price: 8, coef: 9, d1: 10, status: 22, updated: 23, src: 24, key: 25 };
const RO = { gid: 0, sid: 1, num: 2, name: 3, disc: 4, lessons: 5, tuition: 6, paid: 7, receipt: 8, date: 9, n1: 10, n2: 11, n3: 12, note: 13, updated: 14,
  payBy: 15, payAt: 16, payFix: 17, split: 18, key: 19 };
const AT = { gid: 0, sid: 1, name: 2, m1: 3, updated: 15, key: 16 };
const ST = { id: 0, name: 1, wa: 2, dad: 3, mom: 4, stu: 5, status: 6, created: 7, by: 8, updated: 9, note: 10, addr: 11, contract: 12, parents: 13, key: 14 };

function nowStamp_() { return Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm'); }
function tuitionCalc_(price, disc, lessons) { const l = Math.min(12, Math.max(1, Math.round(parseNum_(lessons)) || 12)); return Math.round(parseNum_(price) * (1 - parseNum_(disc) / 100) * l / 12); }

/** Кэш таблиц базы в пределах одного выполнения: повторные dbTable_ не читают лист заново. Сбрасывается при любой записи. */
var __dbMemo = {};
var __stampTouched = false;
function dbInvalidate_() { __dbMemo = {}; touchStamp_(); }
/** Метка «данные изменились» — для автообновления кабинетов (одна запись за выполнение) */
function touchStamp_() {
  if (__stampTouched) return;
  __stampTouched = true;
  try { PropertiesService.getScriptProperties().setProperty('DATA_STAMP', String(Date.now())); } catch (e) {}
}
function dbTable_(name, headers) {
  if (__dbMemo[name]) return __dbMemo[name];
  let t = null;
  // Быстрый путь: заголовок и данные одним чтением (раньше — два обращения к таблице на каждый лист базы)
  try {
    const sh0 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
    if (sh0) {
      const last = sh0.getLastRow();
      if (last >= 1) {
        const block = sh0.getRange(1, 1, last, headers.length).getValues();
        const head = block[0].map(function(x) { return String(x || '').trim(); });
        const hk = head.indexOf('Ключ'), keyCol = headers.length - 1;
        if (hk === -1 || hk === keyCol) {   // иначе нужна миграция столбцов — её делает dbSheet_ ниже
          const rows = block.slice(1), byKey = {};
          rows.forEach(function(r, i) { r.rowIndex = i + 2; const k = String(r[keyCol] || ''); if (k) byKey[k] = i; });
          t = { rows: rows, byKey: byKey, keyCol: keyCol, sh: sh0 };
        }
      }
    }
  } catch (e) { t = null; }
  if (!t) {   // листа нет / столбцы не по схеме — прежний путь (создание, миграция, чтение)
    const sh = dbSheet_(name, headers, null);
    t = dbRead_(sh, headers);
    t.sh = sh;
    t.rows = t.rows.map(function(r, i) { r.rowIndex = i + 2; return r; });
  }
  // отметки, попавшие в лист числами (0, 0.5, 1), приводим к тексту: иначе «0» читался как пустая клетка
  if (name === DB_ATT) t.rows.forEach(function(r) { for (let k = 0; k < 12; k++) { const v = r[AT.m1 + k]; if (typeof v === 'number') r[AT.m1 + k] = String(v); } });
  __dbMemo[name] = t;
  return t;
}
function dbSetCells_(sh, rowIndex, upd) {
  // соседние столбцы пишутся одним обращением (раньше — отдельная запись на каждую клетку)
  const cols = Object.keys(upd).map(Number).filter(function(c) { return !isNaN(c) && c >= 0; }).sort(function(a, b) { return a - b; });
  let i = 0;
  while (i < cols.length) {
    let j = i;
    while (j + 1 < cols.length && cols[j + 1] === cols[j] + 1) j++;
    if (j === i) sh.getRange(rowIndex, cols[i] + 1).setValue(upd[cols[i]]);
    else { const vals = []; for (let k = i; k <= j; k++) vals.push(upd[cols[k]]); sh.getRange(rowIndex, cols[i] + 1, 1, vals.length).setValues([vals]); }
    i = j + 1;
  }
  dbInvalidate_();
}
/** Добавить строку; номер строки сверяется по ключу (последний столбец) — при одновременной записи двух пользователей getLastRow мог указать на чужую строку */
function dbAppendRow_(sh, row) {
  sh.appendRow(row);
  dbInvalidate_();
  let idx = sh.getLastRow();
  const key = String(row[row.length - 1] || '');
  if (key) {
    try {
      if (String(sh.getRange(idx, row.length).getValue()) !== key) {
        const from = Math.max(2, idx - 80);
        const vals = sh.getRange(from, row.length, idx - from + 1, 1).getValues();
        for (let i = vals.length - 1; i >= 0; i--) if (String(vals[i][0]) === key) { idx = from + i; break; }
      }
    } catch (e) {}
  }
  return idx;
}

function dbMonths_(cfg) {
  const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
  const seen = {}, list = [];
  G.rows.forEach(function(r) { const m = String(r[GR.month] || '').trim(); if (m && !seen[nameKey_(m)]) { seen[nameKey_(m)] = true; list.push(m); } });
  if (cfg && cfg.currentMonth && !seen[nameKey_(cfg.currentMonth)]) { seen[nameKey_(cfg.currentMonth)] = true; list.push(cfg.currentMonth); }
  if (cfg) plannedMonths_(cfg).forEach(function(m) { if (!seen[nameKey_(m)]) { seen[nameKey_(m)] = true; list.push(m); } });
  return list.sort(function(a, b) { const x = monthFromName_(a) || { y: 0, m: 0 }, y = monthFromName_(b) || { y: 0, m: 0 }; return (y.y - x.y) || (y.m - x.m); });
}
function teacherIdx_(cfg, short) { const o = (cfg && cfg.teacherOrder) || []; const k = nameKey_(short); for (let i = 0; i < o.length; i++) if (nameKey_(o[i]) === k) return i; return 999; }
function dbGroupsOfMonth_(month) {
  const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
  let cfg = null; try { cfg = getConfig_(); } catch (e) {}
  return G.rows.filter(function(r) { return nameKey_(r[GR.month]) === nameKey_(month); })
    .map(function(r) { return { row: r, rowIndex: r.rowIndex }; })
    .sort(function(a, b) { const ta = String(a.row[GR.teacher]), tb = String(b.row[GR.teacher]); if (ta === tb) return Number(a.row[GR.num]) - Number(b.row[GR.num]); const d = teacherIdx_(cfg, ta) - teacherIdx_(cfg, tb); return d || ta.localeCompare(tb, 'ru'); });
}
function dbGroup_(month, teacherShort, groupName) {
  const num = Number(String(groupName).replace(/\D/g, ''));
  const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
  const r = G.rows.filter(function(x) { return nameKey_(x[GR.month]) === nameKey_(month) && nameKey_(x[GR.teacher]) === nameKey_(teacherShort) && Number(x[GR.num]) === num; })[0];
  return r ? { row: r, rowIndex: r.rowIndex, sh: G.sh } : null;
}
function dbRosterOfGroup_(gid) {
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H);
  return { sh: R.sh, rows: R.rows.filter(function(r) { return String(r[RO.gid]) === String(gid); }).sort(function(a, b) { return Number(a[RO.num]) - Number(b[RO.num]); }), all: R.rows };
}
function dbAttOfGroup_(gid) {
  const A = dbTable_(DB_ATT, DB_ATT_H);
  const map = {};
  A.rows.forEach(function(r) { if (String(r[AT.gid]) === String(gid)) map[String(r[AT.sid])] = r; });
  return { sh: A.sh, map: map };
}
function dbStudents_() {
  const S = dbTable_(DB_STUDENTS, DB_STUDENTS_H);
  const byId = {}, byName = {};
  S.rows.forEach(function(r) { byId[String(r[ST.id])] = r; const k = String(r[ST.key] || nameKey_(r[ST.name])); if (k && !byName[k]) byName[k] = r; });
  return { sh: S.sh, rows: S.rows, byId: byId, byName: byName };
}
function groupDates_(grow) { const out = []; for (let k = 0; k < 12; k++) out.push(String(grow[GR.d1 + k] || '')); return out; }
function groupDatesDisp_(grow) {
  const iso = groupDates_(grow);
  return { iso: iso, dates: iso.map(function(x) { if (!x) return ''; const p = x.split('-'); return Number(p[2]) + ' ' + MONTHS_GEN_RU[Number(p[1]) - 1].substr(0, 3) + '.'; }),
    weekdays: iso.map(function(x) { if (!x) return ''; const p = x.split('-'); return WEEKDAYS_RU[new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])).getDay()]; }) };
}
function groupMetaDb_(grow, tcfg) {
  return { title: String(grow[GR.title] || ('Группа - ' + grow[GR.num])), level: String(grow[GR.level] || ''), time: String(grow[GR.time] || ''), days: String(grow[GR.days] || ''), teacher: tcfg ? tcfg.full : String(grow[GR.teacher] || '') };
}
function groupEditWindowDb_(cfg, grow) {
  const n = cfg.editUntilLesson || 3, next = n + 1;
  // руководитель мог разрешить или запретить правку дат этому преподавателю или группе
  try {
    const ov = datesPermFor_(String(grow[GR.month] || ''), String(grow[GR.teacher] || ''), 'Группа ' + grow[GR.num]);
    if (ov === true) return { ok: true, until: '', lesson: n, nextLesson: next, byDirector: 'разрешено руководителем' };
    if (ov === false) return { ok: false, until: '', lesson: n, nextLesson: next, byDirector: 'запрещено руководителем' };
  } catch (e) {}
  if (next > 12) return { ok: true, until: '', lesson: n, nextLesson: next };
  const iso = String(grow[GR.d1 + next - 1] || '');
  if (!iso) return { ok: true, until: '', lesson: n, nextLesson: next };
  return { ok: isoToday_() < iso, until: iso.split('-').reverse().join('.'), lesson: n, nextLesson: next };
}
function teacherCtxDb_(teacherName, password, groupName, month) {
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return { error: auth };
  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;
  const ctx = { auth: auth, cfg: cfg, month: month, editable: true, note: '' };
  if (groupName !== undefined) {
    groupName = String(groupName || '').trim();
    if (!isValidGroupName_(groupName)) return { error: { success: false, error: 'Неверная группа.' } };
    const g = dbGroup_(month, auth.teacher.name, groupName);
    if (!g || String(g.row[GR.status]) === 'скрыта') return { error: { success: false, error: 'Группа не найдена или скрыта.' } };
    ctx.group = g; ctx.gid = String(g.row[GR.id]); ctx.groupName = groupName;
  }
  return ctx;
}
/** В журнал преподавателя уходит только признак «не допущен». Суммы долга и предупреждения об оплате — нет. */
function payFlagsForTeacher_(p) { return p ? { blocked: !!p.blocked } : null; }

function payInfoDb_(rr) {
  const tu = Math.round(parseNum_(rr[RO.tuition])), pd = Math.round(parseNum_(rr[RO.paid])), bal = tu - pd;
  const n2 = !!String(rr[RO.n2] || '').trim(), n3 = !!String(rr[RO.n3] || '').trim();
  return { balance: bal, tuition: tu, n2: n2, n3: n3, blocked: n3 && bal > 0, warning: !n3 && n2 && bal > 0 };
}

// ---------- ПРЕПОДАВАТЕЛЬ ----------
function getTeacherGroupsDb_(teacherName, password, month) {
  const ctx = teacherCtxDb_(teacherName, password, undefined, month);
  if (ctx.error) return ctx.error;
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H);
  const byGid = {};
  R.rows.forEach(function(r) { (byGid[String(r[RO.gid])] = byGid[String(r[RO.gid])] || []).push(r); });
  const groups = [];
  dbGroupsOfMonth_(ctx.month).forEach(function(g) {
    if (nameKey_(g.row[GR.teacher]) !== nameKey_(ctx.auth.teacher.name) || String(g.row[GR.status]) === 'скрыта') return;
    const ro = byGid[String(g.row[GR.id])] || [];
    let blocked = 0, warning = 0;
    ro.forEach(function(r) { const p = payInfoDb_(r); if (p.blocked) blocked++; else if (p.warning) warning++; });
    const hasDates = groupDates_(g.row).some(function(x) { return !!x; });
    const na = function(v) { return !v || /не назнач|не выбран/i.test(v); };
    const used = ro.length > 0 || !na(g.row[GR.level]) || !na(g.row[GR.time]) || !na(g.row[GR.days]) || hasDates;
    const dates = groupDates_(g.row), todayIso = isoToday_(), k = dates.indexOf(todayIso);
    let marked = 0, unmarkedPast = [], nextDate = '';
    if (ro.length) { try {
      const att = dbAttOfGroup_(String(g.row[GR.id])), sids = Object.keys(att.map);
      for (let j = 0; j < 12; j++) {
        const d = dates[j]; if (!d) continue;
        let m = 0; sids.forEach(function(sid) { if (String(att.map[sid][AT.m1 + j] || '') !== '') m++; });
        if (j === k) marked = m;
        if (d < todayIso && !m) unmarkedPast.push({ lesson: j + 1, date: d });   // занятие прошло, ни одной отметки
        if (d >= todayIso && (!nextDate || d < nextDate)) nextDate = d;
      }
    } catch (e) {} }
    groups.push({ name: 'Группа ' + g.row[GR.num], title: String(g.row[GR.title] || ''), level: String(g.row[GR.level] || ''), time: String(g.row[GR.time] || ''), days: String(g.row[GR.days] || ''), studentsCount: ro.length, blocked: blocked, warning: warning, hasDates: hasDates, used: used,
      todayLesson: k === -1 ? 0 : k + 1, markedToday: marked, unmarkedPast: unmarkedPast, nextDate: nextDate, room: getRoom_(ctx.month, ctx.auth.teacher.name, 'Группа ' + g.row[GR.num]) || '', datesSet: dates.filter(Boolean).length, dates: dates });
  });
  return { success: true, teacher: { name: ctx.auth.teacher.name, full: ctx.auth.teacher.full, month: ctx.month }, editable: true, note: '', journalUrl: '', journalName: 'база', month: ctx.month, groups: groups };
}

function getTeacherGroupDetailsDb_(teacherName, password, groupName, month) {
  const ctx = teacherCtxDb_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  const grow = ctx.group.row, cfg = ctx.cfg;
  const ro = dbRosterOfGroup_(ctx.gid), at = dbAttOfGroup_(ctx.gid), S = dbStudents_();
  const dd = groupDatesDisp_(grow);
  const todayIso = isoToday_();
  const held = dd.iso.filter(function(x) { return x && x <= todayIso; }).length;
  let next = null;
  for (let k = 0; k < 12; k++) if (dd.iso[k] && dd.iso[k] > todayIso) { next = { lesson: k + 1, text: dd.dates[k], weekday: dd.weekdays[k] }; break; }
  const byNum = {};
  ro.rows.forEach(function(r) { byNum[Number(r[RO.num])] = r; });
  const lastMsgs = lastAttendanceNotices_(ctx.auth.teacher.name, groupName);
  const nowMs = Date.now();
  const students = [];
  for (let i = 1; i <= 16; i++) {
    const r = byNum[i];
    if (!r) { students.push({ row: T_FIRST_ROW + i - 1, name: '', wa: '', dad: '', mom: '', stu: '', note: '', att: 0, marks: new Array(12).fill(''), pay: null, lastMsg: null, nameLocked: false }); continue; }
    const st = S.byId[String(r[RO.sid])] || [];
    const a = at.map[String(r[RO.sid])];
    const marks = []; let att = 0;
    for (let k = 0; k < 12; k++) { const m = a ? String(a[AT.m1 + k] || '').replace('.', ',') : ''; marks.push(m); const v = parseFloat(m.replace(',', '.')); if (!isNaN(v)) att += v; }
    let createdMs = 0;
    const cm = String(st[ST.created] || '').match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})/);
    if (cm) createdMs = new Date(Number(cm[3]), Number(cm[2]) - 1, Number(cm[1]), Number(cm[4]), Number(cm[5])).getTime();
    const name = String(r[RO.name] || st[ST.name] || '');
    students.push({
      row: T_FIRST_ROW + i - 1, sid: String(r[RO.sid]), name: name,
      wa: String(st[ST.wa] || ''), dad: String(st[ST.dad] || ''), mom: String(st[ST.mom] || ''), stu: String(st[ST.stu] || ''), note: String(r[RO.note] || st[ST.note] || ''),
      att: att, marks: marks, pay: payFlagsForTeacher_(payInfoDb_(r)), lastMsg: lastMsgs[studentKey_(name)] || null,
      nameLocked: !!name && (!createdMs || nowMs - createdMs > cfg.nameEditHours * 3600000),
      nameEditableUntil: createdMs ? new Date(createdMs + cfg.nameEditHours * 3600000).toISOString() : ''
    });
  }
  const tcfg = findTeacherCfg_(cfg, ctx.auth.teacher.name);
  const levels = Object.keys(readPrices_()).length ? priceLevels_() : [];
  return {
    success: true, editable: true, note: '', month: ctx.month, group: groupName,
    meta: (function() { const m = groupMetaDb_(grow, tcfg); m.room = getRoom_(ctx.month, ctx.auth.teacher.name, groupName); return m; })(),
    options: { levels: levels, days: cfg.dayOptions, times: cfg.timeOptions, rooms: cfg.rooms },
    dates: dd.dates, weekdays: dd.weekdays, datesIso: dd.iso, held: held, next: next, today: todayIso,
    todayLesson: (function() { for (let k = 0; k < 12; k++) if (dd.iso[k] === todayIso) return k + 1; return 0; })(),
    marksOnlyOnLessonDay: cfg.marksOnlyOnLessonDay && !marksUnlockUntil_(ctx.month, ctx.auth.teacher.name, groupName), markDays: cfg.markDays, msgOnlyOnLessonDay: true,
    markWindows: markWindowsForTeacher_(ctx.auth.teacher.name),
    marksUnlockUntil: (function() { const u = marksUnlockUntil_(ctx.month, ctx.auth.teacher.name, groupName); return u ? Utilities.formatDate(new Date(u), TZ, 'dd.MM HH:mm') : ''; })(),
    datesEditable: groupEditWindowDb_(cfg, grow), nameEditHours: cfg.nameEditHours,
    transfer: transferState_(cfg, dd.iso, ctx.month, ctx.auth.teacher.name, groupName),
    roomFree: isoToday_() <= cfg.roomFreeUntil, roomFreeUntil: cfg.roomFreeUntil,
    replies: repliesForStudents_(students.map(function(x) { return { name: x.name, phone: x.wa }; })),
    pendingRequests: pendingRequestsFor_(ctx.auth.teacher.name, ctx.month, groupName),
    newStudents: (function() { const nw = newStudents_(), o = {}; Object.keys(nw).forEach(function(k) { const p = k.split('|'); if (p[0] === ctx.gid) o[p[1]] = nw[k].added; }); return o; })(),
    absences: (function() { const m = absActiveMap_(ctx.month), o = {}; const pre = [nameKey_(ctx.auth.teacher.name), nameKey_(groupName)].join('|') + '|';
      Object.keys(m).forEach(function(k) { if (k.indexOf(pre) === 0) o[k.slice(pre.length)] = m[k]; }); return o; })(),
    absReasons: ABS_REASONS,
    students: students
  };
}

function recomputeGroupTuition_(gid, price) {
  const ro = dbRosterOfGroup_(gid);
  ro.rows.forEach(function(r) {
    const t = tuitionCalc_(price, r[RO.disc], r[RO.lessons]);
    if (Math.round(parseNum_(r[RO.tuition])) !== t) dbSetCells_(ro.sh, r.rowIndex, { 6: t, 14: nowStamp_() });
  });
}

function applyGroupSettingsDb_(cfg, g, level, time, days, who, teacherShort) {
  const grow = g.row;
  const optL = (function() { const sh = priceSheet_(false); return sh && sh.getLastRow() >= 2 ? sh.getRange(2, 2, sh.getLastRow() - 1, 1).getDisplayValues().map(function(x) { return String(x[0]).trim(); }).filter(Boolean) : []; })();
  const L = checkOption_(level, optL, 'Уровень'); if (L.error) return { success: false, error: L.error };
  const Tm = checkOption_(time, cfg.timeOptions, 'Время занятий'); if (Tm.error) return { success: false, error: Tm.error };
  const D = checkOption_(days, cfg.dayOptions, 'Дни недели'); if (D.error) return { success: false, error: D.error };
  const changes = [];
  if (String(grow[GR.level]) !== L.value) changes.push(['Уровень группы', String(grow[GR.level]), L.value]);
  if (String(grow[GR.time]) !== Tm.value) changes.push(['Время занятий', String(grow[GR.time]), Tm.value]);
  if (String(grow[GR.days]) !== D.value) changes.push(['Дни недели', String(grow[GR.days]), D.value]);
  if (!changes.length) return { success: true, message: 'Изменений нет.', meta: groupMetaDb_(grow, findTeacherCfg_(cfg, teacherShort)), changes: [] };
  const price = priceFor_(readPrices_(), L.value);
  const upd = { 5: L.value, 6: D.value, 7: Tm.value, 23: nowStamp_() };
  if (price !== null) upd[8] = price;
  dbSetCells_(g.sh, g.rowIndex, upd);
  if (price !== null) recomputeGroupTuition_(String(grow[GR.id]), price);
  grow[GR.level] = L.value; grow[GR.days] = D.value; grow[GR.time] = Tm.value; if (price !== null) grow[GR.price] = price;
  logChanges_(teacherShort + (who ? ' ← ' + who : ''), 'Группа ' + grow[GR.num], '', '(настройки группы)', changes);
  return { success: true, message: 'Настройки группы сохранены' + (price !== null ? '. Стоимость: ' + price + ' сом' : '') + '.', meta: groupMetaDb_(grow, findTeacherCfg_(cfg, teacherShort)), changes: changes };
}

function saveTeacherGroupSettingsDb_(teacherName, password, groupName, level, time, days, month) {
  const ctx = teacherCtxDb_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  const grow = ctx.group.row;
  const ew = groupEditWindowDb_(ctx.cfg, grow);
  const L0 = String(level || '').trim(), T0 = String(time || '').trim(), D0 = String(days || '').trim();
  if (!ew.ok) {
    const was = [grow[GR.level], grow[GR.days], grow[GR.time]].join(' · '), now = [L0, D0, T0].join(' · ');
    if (was === now) return { success: true, message: 'Изменений нет.', meta: groupMetaDb_(grow) };
    const req = createRequest_('настройки', ctx.auth.teacher.name, ctx.month, groupName, '', was, now, JSON.stringify({ level: L0, time: T0, days: D0 }));
    return { success: true, pending: true, request: req, meta: groupMetaDb_(grow), message: 'Заявка отправлена руководителю. Настройки изменятся после подтверждения.' };
  }
  return applyGroupSettingsDb_(ctx.cfg, ctx.group, L0, T0, D0, '', ctx.auth.teacher.name);
}

function writeLessonDateDb_(g, lesson, isoDate) {
  const upd = {}; upd[GR.d1 + lesson - 1] = isoDate || ''; upd[GR.updated] = nowStamp_();
  dbSetCells_(g.sh, g.rowIndex, upd);
  g.row[GR.d1 + lesson - 1] = isoDate || '';
}

function saveTeacherLessonDateDb_(teacherName, password, groupName, lesson, isoDate, month) {
  const ctx = teacherCtxDb_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  lesson = Number(lesson);
  if (!Number.isInteger(lesson) || lesson < 1 || lesson > 12) return { success: false, error: 'Неверный номер занятия.' };
  isoDate = String(isoDate || '').trim();
  if (isoDate && !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return { success: false, error: 'Неверный формат даты.' };
  const grow = ctx.group.row;
  const de = groupEditWindowDb_(ctx.cfg, grow);
  if (!de.ok) {
    const cur = String(grow[GR.d1 + lesson - 1] || '');
    const req = createRequest_('дата', ctx.auth.teacher.name, ctx.month, groupName, lesson, cur ? cur.split('-').reverse().join('.') : '—', isoDate ? isoDate.split('-').reverse().join('.') : 'очистить', JSON.stringify({ iso: isoDate }));
    return { success: true, pending: true, request: req, message: 'Заявка отправлена руководителю. Дата изменится после подтверждения.' };
  }
  writeLessonDateDb_(ctx.group, lesson, isoDate);
  const dd = groupDatesDisp_(grow), todayIso = isoToday_();
  return { success: true, dates: dd.dates, weekdays: dd.weekdays, datesIso: dd.iso, todayLesson: (function() { for (let k = 0; k < 12; k++) if (dd.iso[k] === todayIso) return k + 1; return 0; })(), message: isoDate ? 'Дата занятия ' + lesson + ' изменена.' : 'Дата занятия ' + lesson + ' очищена.' };
}

function saveTeacherStudentDb_(teacherName, password, groupName, row, data, month) {
  const ctx = teacherCtxDb_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  row = Number(row);
  if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { success: false, error: 'Неверная строка.' };
  const num = row - T_FIRST_ROW + 1;
  data = data || {};
  const name = String(data.name || '').trim();
  const dad = String(data.dad || '').trim(), mom = String(data.mom || '').trim(), stu = String(data.stu || '').trim(), note = String(data.note || '').trim();
  const wa = normalizeWhatsapp_(data.wa);
  if (wa.error) return { success: false, error: wa.error };
  const confirmEdit = data.confirm === true || String(data.confirm) === 'true';
  const cfg = ctx.cfg, stamp = nowStamp_();

  const ro = dbRosterOfGroup_(ctx.gid);
  const existing = ro.rows.filter(function(r) { return Number(r[RO.num]) === num; })[0];

  if (!existing) {
    if (!name) return { success: false, error: 'Введите ФИО ученика.' };
    // новый ученик — под блокировкой, чтобы два преподавателя одновременно не получили одинаковый ID
    const lock = LockService.getScriptLock();
    let locked = false; try { locked = lock.tryLock(15000); } catch (e) {}
    if (!locked) return { success: false, error: 'База занята — повторите через несколько секунд.' };
    try {
      delete __dbMemo[DB_STUDENTS]; delete __dbMemo[DB_ROSTER];   // свежие данные уже под блокировкой
      const S = dbStudents_(), ro2 = dbRosterOfGroup_(ctx.gid);
      if (ro2.rows.some(function(r) { return Number(r[RO.num]) === num; })) return { success: false, error: 'Эта строка только что была занята. Обновите группу.' };
      // ученик с таким ФИО уже есть в базе? — используем его карточку
      let st = S.byName[nameKey_(name)];
      let sid;
      if (st) {
        sid = String(st[ST.id]);
        const upd = { 9: stamp };
        if (!String(st[ST.wa]) && wa.value) upd[2] = wa.value;
        if (!String(st[ST.dad]) && dad) upd[3] = dad;
        if (!String(st[ST.mom]) && mom) upd[4] = mom;
        if (!String(st[ST.stu]) && stu) upd[5] = stu;
        if (String(st[ST.status]) === 'выбыл') upd[6] = 'учится';
        dbSetCells_(S.sh, st.rowIndex, upd);
      } else {
        sid = nextId_('У-', S.rows, ST.id);
        dbAppendRow_(S.sh, [sid, name, wa.value, dad, mom, stu, 'учится', stamp, ctx.auth.teacher.name, stamp, '', '', '', '', nameKey_(name)]);
      }
      if (ro2.rows.some(function(r) { return String(r[RO.sid]) === sid; })) return { success: false, error: 'Этот ученик уже есть в группе.' };
      const grow = ctx.group.row;
      const t = tuitionCalc_(grow[GR.price], 0, 12);
      const key = ctx.gid + '|' + sid;
      dbAppendRow_(ro2.sh, [ctx.gid, sid, num, name, 0, 12, t, 0, '', '', '', '', '', note, stamp, key]);
      dbAppendRow_(dbTable_(DB_ATT, DB_ATT_H).sh, [ctx.gid, sid, name].concat(new Array(12).fill('')).concat([stamp, key]));
      logChanges_(ctx.auth.teacher.name, groupName, row, name, [['Добавлен ученик', '', name + (wa.value ? ' · ' + wa.value : '')]]);
      // группа уже перенесена в следующий месяц — новый ученик попадает и туда
      const also = mirrorStudentToNextMonth_(cfg, ctx.auth.teacher.name, groupName, ctx.month, sid, name, note);
      return { success: true, message: also ? 'Ученик сохранён и добавлен также в ' + also + '.' : 'Ученик сохранён.', alsoAdded: also || '', student: { row: row, sid: sid, name: name, wa: wa.value, dad: dad, mom: mom, stu: stu, note: note } };
    } finally { if (locked) lock.releaseLock(); }
  }

  // ---- существующий ученик ----
  const S = dbStudents_();
  const sid = String(existing[RO.sid]);
  const st = S.byId[sid];
  if (!st) return { success: false, error: 'Карточка ученика ' + sid + ' не найдена в листе УЧЕНИКИ.' };
  const curName = String(existing[RO.name] || st[ST.name] || '').trim();
  const curWa = String(st[ST.wa] || ''), curDad = String(st[ST.dad] || ''), curMom = String(st[ST.mom] || ''), curStu = String(st[ST.stu] || '');
  const curNote = String(existing[RO.note] || '');
  const LOCK = ' уже сохранён(а) — нажмите «✎ Редактировать» в строке ученика, чтобы изменить.';
  if (!name) return { success: false, error: 'ФИО ученика удалить нельзя. Обратитесь к руководителю.' };
  if (name !== curName) {
    let createdMs = 0;
    const cm = String(st[ST.created] || '').match(/^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})/);
    if (cm) createdMs = new Date(Number(cm[3]), Number(cm[2]) - 1, Number(cm[1]), Number(cm[4]), Number(cm[5])).getTime();
    if (!createdMs || Date.now() - createdMs > cfg.nameEditHours * 3600000) return { success: false, error: 'Изменить ФИО можно в течение ' + cfg.nameEditHours + ' часов после сохранения. Теперь исправить ФИО может только кассир или руководитель.' };
  }
  if (!confirmEdit) {
    if (name !== curName) return { success: false, error: 'ФИО «' + curName + '»' + LOCK };
    if (curWa && wa.value !== curWa) return { success: false, error: 'WhatsApp родителя' + LOCK };
    if (curDad && dad !== curDad) return { success: false, error: 'Телефон папы' + LOCK };
    if (curMom && mom !== curMom) return { success: false, error: 'Телефон мамы' + LOCK };
    if (curStu && stu !== curStu) return { success: false, error: 'Телефон ученика' + LOCK };
  }
  const changes = [];
  if (name !== curName) changes.push(['ФИО', curName, name]);
  if (curWa !== wa.value && (curWa || wa.value)) changes.push(['WhatsApp родителя', curWa, wa.value]);
  if (curDad !== dad && (curDad || dad)) changes.push(['Телефон папы', curDad, dad]);
  if (curMom !== mom && (curMom || mom)) changes.push(['Телефон мамы', curMom, mom]);
  if (curStu !== stu && (curStu || stu)) changes.push(['Телефон ученика', curStu, stu]);
  if (curNote !== note && (curNote || note)) changes.push(['Комментарий', curNote, note]);
  { const u = { 1: name, 2: wa.value, 3: dad, 4: mom, 5: stu, 9: stamp }; u[ST.key] = nameKey_(name); dbSetCells_(S.sh, st.rowIndex, u); }
  dbSetCells_(ro.sh, existing.rowIndex, { 3: name, 13: note, 14: stamp });
  if (name !== curName) { const at = dbAttOfGroup_(ctx.gid); const a = at.map[sid]; if (a) dbSetCells_(at.sh, a.rowIndex, { 2: name }); }
  if (changes.length) logChanges_(ctx.auth.teacher.name, groupName, row, curName, changes);
  return { success: true, message: 'Сохранено.', student: { row: row, sid: sid, name: name, wa: wa.value, dad: dad, mom: mom, stu: stu, note: note } };
}

function saveTeacherAttendanceBatchDb_(teacherName, password, groupName, changes, month, opts) {
  opts = opts || {};
  const ctx = teacherCtxDb_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  if (!Array.isArray(changes) || !changes.length) return { success: true, rows: {} };
  if (changes.length > 200) return { success: false, error: 'Слишком много изменений за раз.' };
  const grow = ctx.group.row, iso = groupDates_(grow), todayIso = isoToday_();
  const ro = dbRosterOfGroup_(ctx.gid), at = dbAttOfGroup_(ctx.gid);
  const byNum = {}; ro.rows.forEach(function(r) { byNum[Number(r[RO.num])] = r; });
  const stamp = nowStamp_();
  const unlocked = !!marksUnlockUntil_(ctx.month, ctx.auth.teacher.name, groupName);
  const touched = {}, fresh = [];
  // 1) проверки и правки в памяти
  for (let i = 0; i < changes.length; i++) {
    const ch = changes[i] || {};
    const row = Number(ch.row), lesson = Number(ch.lesson);
    const v = String(ch.value === undefined || ch.value === null ? '' : ch.value).trim().replace(',', '.');
    if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { success: false, error: 'Неверная строка: ' + ch.row };
    if (!Number.isInteger(lesson) || lesson < 1 || lesson > 12) return { success: false, error: 'Неверный номер занятия: ' + ch.lesson };
    if (ctx.cfg.marksOnlyOnLessonDay && !unlocked && !markAllowed_(ctx.cfg, iso[lesson - 1], todayIso) && !markWindowFor_(ctx.auth.teacher.name, iso[lesson - 1])) {
      return { success: false, error: 'Отметки можно ставить в день занятия' + (ctx.cfg.markDays ? ' и в течение ' + ctx.cfg.markDays + ' дн. после' : '') + '. Занятие ' + lesson + (iso[lesson - 1] ? ' — ' + iso[lesson - 1].split('-').reverse().join('.') : ' (дата не назначена)') + ', сегодня ' + todayIso.split('-').reverse().join('.') + '.' };
    }
    if (v !== '' && v !== '1' && v !== '0' && v !== '0.5') return { success: false, error: 'Отметка может быть 1, 0,5 или 0.' };
    const r = byNum[row - T_FIRST_ROW + 1];
    if (!r) return { success: false, error: 'В строке ' + (row - T_FIRST_ROW + 1) + ' нет ученика.' };
    const sid = String(r[RO.sid]);
    // ученик числится отсутствующим — спрашиваем, действительно ли он пришёл
    if (v && v !== '0' && !opts.absOk) {
      const ab = absFor_(ctx.month, ctx.auth.teacher.name, groupName, sid);
      if (ab) return { success: false, absenceConfirm: true, absence: { id: ab.id, reason: ab.reason, from: ab.from, until: ab.until, status: ab.status },
        student: String(r[RO.name] || ''), error: 'Ученик числится отсутствующим.' };
    }
    let a = at.map[sid];
    if (!a) {   // первая отметка ученика в этом месяце — строки в ПОСЕЩЕНИЯ ещё нет
      a = [ctx.gid, sid, String(r[RO.name] || '')].concat(new Array(12).fill('')).concat([stamp, ctx.gid + '|' + sid]);
      a.rowIndex = 0; at.map[sid] = a; fresh.push(a);
    }
    a[AT.m1 + lesson - 1] = v;
    a[AT.updated] = stamp;
    touched[row] = a;
  }
  // 2) новые строки: appendRow (атомарно), затем номера строк сверяются по ключу одним чтением
  if (fresh.length) {
    fresh.forEach(function(a) { at.sh.appendRow(a.slice(0, DB_ATT_H.length)); });
    try {
      const last = at.sh.getLastRow(), from = Math.max(2, last - fresh.length - 80);
      const keys = at.sh.getRange(from, AT.key + 1, last - from + 1, 1).getValues();
      fresh.forEach(function(a) { for (let i = keys.length - 1; i >= 0; i--) if (String(keys[i][0]) === String(a[AT.key])) { a.rowIndex = from + i; break; } });
    } catch (e) {}
    dbInvalidate_();
  }
  // 3) существующие строки: соседние строки — одним блоком (раньше две записи на каждую клетку)
  const old = [];
  Object.keys(touched).forEach(function(k) { const a = touched[k]; if (fresh.indexOf(a) === -1 && a.rowIndex > 1 && old.indexOf(a) === -1) old.push(a); });
  old.sort(function(a, b) { return a.rowIndex - b.rowIndex; });
  let p = 0;
  while (p < old.length) {
    let q = p;
    while (q + 1 < old.length && old[q + 1].rowIndex === old[q].rowIndex + 1) q++;
    const block = []; for (let k = p; k <= q; k++) block.push(old[k].slice(0, DB_ATT_H.length));
    at.sh.getRange(old[p].rowIndex, 1, block.length, DB_ATT_H.length).setValues(block);
    p = q + 1;
  }
  if (old.length) dbInvalidate_();
  // 4) ответ странице
  const rows = {};
  Object.keys(touched).forEach(function(row) {
    const a = touched[row]; const marks = []; let att = 0;
    for (let k = 0; k < 12; k++) { const m = String(a[AT.m1 + k] === undefined || a[AT.m1 + k] === null ? '' : a[AT.m1 + k]).replace('.', ','); marks.push(m); const n = parseFloat(m.replace(',', '.')); if (!isNaN(n)) att += n; }
    rows[row] = { att: att, marks: marks };
  });
  return { success: true, rows: rows };
}

function buildNotificationDb_(teacherName, password, groupName, row, lesson, kind, month) {
  const ctx = teacherCtxDb_(teacherName, password, groupName, month);
  if (ctx.error) return { error: ctx.error };
  row = Number(row); lesson = Number(lesson);
  if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { error: { success: false, error: 'Неверная строка.' } };
  if (!Number.isInteger(lesson) || lesson < 1 || lesson > 12) return { error: { success: false, error: 'Неверный номер занятия.' } };
  const grow = ctx.group.row;
  const ro = dbRosterOfGroup_(ctx.gid), at = dbAttOfGroup_(ctx.gid), S = dbStudents_();
  const r = ro.rows.filter(function(x) { return Number(x[RO.num]) === row - T_FIRST_ROW + 1; })[0];
  if (!r) return { error: { success: false, error: 'В этой строке нет ученика.' } };
  const st = S.byId[String(r[RO.sid])] || [];
  const student = String(r[RO.name] || st[ST.name] || '').trim(), phone = String(st[ST.wa] || '').trim();
  if (!phone) return { error: { success: false, error: 'У ученика не указан WhatsApp родителя.' } };
  const a = at.map[String(r[RO.sid])];
  const mark = a ? String(a[AT.m1 + lesson - 1] || '').trim().replace(',', '.') : '';
  if (mark === '0') kind = 'absent';
  else if (mark === '0.5') kind = 'late';
  else if (mark === '1') return { error: { success: false, error: student + ' присутствовал(а) на занятии ' + lesson + ' — сообщение не требуется.' } };
  else return { error: { success: false, error: 'Сначала поставьте отметку посещения за занятие ' + lesson + '.' } };
  const lessonIso = String(grow[GR.d1 + lesson - 1] || '');
  if (!lessonIso) return { error: { success: false, error: 'У занятия ' + lesson + ' не назначена дата — сообщение не отправляется.' } };
  const isToday = lessonIso === isoToday_();
  if (!isToday) return { error: { success: false, error: 'Сообщение об отсутствии или опоздании отправляется только в день занятия (' + lessonIso.split('-').reverse().join('.') + '). Сегодня ' + isoToday_().split('-').reverse().join('.') + '.' } };
  const p = lessonIso.split('-');
  const fd = fullDateText_(new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])), '');
  const tplKey = kind === 'late' ? 'СООБЩЕНИЕ_ОПОЗДАНИЕ' : 'СООБЩЕНИЕ_ОТСУТСТВИЕ';
  let tpl = ctx.cfg.settings[tplKey];
  if (!tpl) { const d = SETTINGS_DEFAULTS.filter(function(x) { return x[0] === tplKey; })[0]; tpl = d ? d[1] : ''; }
  tpl = String(tpl).replace(/\\n/g, '\n');
  const tcfg = findTeacherCfg_(ctx.cfg, ctx.auth.teacher.name);
  const meta = groupMetaDb_(grow, tcfg);
  const teacherFull = ctx.auth.teacher.full || meta.teacher || ctx.auth.teacher.name;
  const timeTxt = meta.time && !/не назнач/i.test(meta.time) ? meta.time : '', daysTxt = meta.days && !/не назнач/i.test(meta.days) ? meta.days : '', daysKg = daysToKyrgyz_(daysTxt);
  let text = fillTemplate_(tpl, { 'ученик': student, 'дата': fd.date, 'день': fd.weekday, 'год': fd.year, 'дата_кг': fd.dateKg, 'день_кг': fd.weekdayKg,
    'когда_кг': 'бүгүн, ' + fd.dateKg + ' күнү', 'когда': 'сегодня, ' + fd.date, 'время': timeTxt, 'дни': daysTxt, 'дни_кг': daysKg,
    'группа': meta.title, 'уровень': meta.level, 'преподаватель': teacherFull, 'преподаватель_ио': nameWithoutSurname_(teacherFull), 'мугалим': nameWithoutSurname_(teacherFull), 'занятие': String(lesson) });
  if (!timeTxt || !daysKg) text = text.replace(/Сабак(тар)?[^\n]*?(болот|өтөт|башталат)\.\s*/g, '');
  text = text.replace(/[ \t]{2,}/g, ' ').replace(/\n{3,}/g, '\n\n');
  return { ctx: ctx, student: student, phone: phone, text: text, kind: kind, meta: meta, lesson: lesson };
}

// ---------- АДМИНИСТРАТОР / РУКОВОДИТЕЛЬ ----------
function staffCtxDb_(password, month, teacherName, groupName, role) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { error: { success: false, error: 'Неверный пароль.' } };
  if (actual === 'books') return { error: BOOKS_DENY };
  if (role !== undefined && role !== null && String(role) && actual !== String(role)) return { error: { success: false, error: 'Неверный пароль.' } };
  month = String(month || '').trim() || cfg.currentMonth;
  const tcfg = findTeacherCfg_(cfg, teacherName) || { short: String(teacherName || ''), full: '' };
  groupName = String(groupName || '').trim();
  if (!isValidGroupName_(groupName)) return { error: { success: false, error: 'Неверная группа.' } };
  const g = dbGroup_(month, tcfg.short, groupName);
  if (!g) return { error: { success: false, error: 'Группа «' + groupName + '» преподавателя ' + tcfg.short + ' за ' + month + ' не найдена в базе.' } };
  return { cfg: cfg, role: actual, month: month, teacher: tcfg, group: g, gid: String(g.row[GR.id]), groupName: groupName };
}
function rosterByPayRow_(ro, paymentRow) {
  const num = Number(paymentRow) - PAY_FIRST_ROW + 1;
  return ro.rows.filter(function(r) { return Number(r[RO.num]) === num; })[0] || null;
}
function noticeWindowDb_(cfg, grow, noticeNo) {
  const lesson = NOTICE_LESSON[noticeNo];
  const iso = String(grow[GR.d1 + lesson - 1] || '');
  const days = (cfg.noticeWindows || {})[noticeNo] || 0;
  if (!iso) return { state: 'nodate', lesson: lesson, from: '', to: '', days: days };
  const todayIso = isoToday_(), d = daysBetweenIso_(iso, todayIso);
  const p = iso.split('-');
  const toIso = Utilities.formatDate(new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]) + days), TZ, 'yyyy-MM-dd');
  return { state: d < 0 ? 'early' : (d > days ? 'closed' : 'open'), lesson: lesson, days: days, fromIso: iso, toIso: toIso, from: iso.split('-').reverse().join('.'), to: toIso.split('-').reverse().join('.') };
}

function getAdminGroupPaymentsDb_(password, month, teacherName, groupName) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const c = staffCtxDb_(password, month, teacherName, groupName);
  if (c.error) return c.error;
  const grow = c.group.row, cfg = c.cfg;
  // цена: своя (задана руководителем на этот месяц) важнее прайса
  const own = gpriceFor_(c.month, c.teacher.short, c.groupName);
  const pr = own ? own.price : priceFor_(readPrices_(), grow[GR.level]);
  let priceWarning = '';
  if (pr === null) priceWarning = grow[GR.level] && !/не назнач/i.test(grow[GR.level]) ? 'Уровень «' + grow[GR.level] + '» не найден в листе ПРАЙС.' : 'Уровень группы не выбран.';
  else if (Math.round(parseNum_(grow[GR.price])) !== pr) { dbSetCells_(c.group.sh, c.group.rowIndex, { 8: pr, 23: nowStamp_() }); grow[GR.price] = pr; recomputeGroupTuition_(c.gid, pr); }
  const price = Math.round(parseNum_(grow[GR.price]));
  const ro = dbRosterOfGroup_(c.gid), at = dbAttOfGroup_(c.gid), S = dbStudents_(), discounts = readDiscounts_();
  const prepayMap = prepayAvailableMap_();
  const deferMap = deferralsFor_(c.month, c.teacher.short, c.groupName);
  const dd = groupDatesDisp_(grow), todayIso = isoToday_();
  const held = dd.iso.filter(function(x) { return x && x <= todayIso; }).length;
  const notices = { 1: 0, 3: 0, 5: 0 };
  const payments = [];
  ro.rows.forEach(function(r) {
    const st = S.byId[String(r[RO.sid])] || [];
    const a = at.map[String(r[RO.sid])];
    let att = 0; if (a) for (let k = 0; k < 12; k++) { const v = parseFloat(String(a[AT.m1 + k] || '').replace(',', '.')); if (!isNaN(v)) att += v; }
    const n1 = String(r[RO.n1] || ''), n2 = String(r[RO.n2] || ''), n3 = String(r[RO.n3] || '');
    if (n1) notices[1]++; if (n2) notices[3]++; if (n3) notices[5]++;
    const tu = Math.round(parseNum_(r[RO.tuition])), pd = Math.round(parseNum_(r[RO.paid]));
    const dt = String(r[RO.date] || '');
    payments.push({ number: Number(r[RO.num]), studentName: String(r[RO.name] || st[ST.name] || ''), whatsapp: String(st[ST.wa] || ''), sid: String(r[RO.sid]),
      discount: parseNum_(r[RO.disc]), lessons: Math.round(parseNum_(r[RO.lessons])) || 12, tuition: tu, paid: pd, balance: tu - pd,
      receipt: String(r[RO.receipt] || ''), paymentDate: /^\d{4}-\d{2}-\d{2}$/.test(dt) ? dt.split('-').reverse().join('.') : dt,
      attended: att, baseTuition: price, disc: publicDiscount_(findDiscountFor_(discounts, String(r[RO.name] || ''), String(st[ST.wa] || ''))),
      notices: [n1, n2, n3], prepay: prepayMap[studentKey_(String(r[RO.name] || ''))] || 0, defer: deferMap[studentKey_(String(r[RO.name] || ''))] || null, paymentRow: PAY_FIRST_ROW + Number(r[RO.num]) - 1 });
  });
  // суммы по квитанциям группы: кто ещё оплачен той же квитанцией (все группы и месяцы), общая сумма из реестра
  const receipts = {};
  try {
    const wanted = {};
    ro.rows.forEach(function(r) { const raw = String(r[RO.receipt] || '').trim(); if (!raw) return; raw.split(/[;,]/).forEach(function(p) { const k = normalizeReceiptNumber_(p); if (k && !isCashMarker_(k)) wanted[k] = true; }); });
    if (Object.keys(wanted).length) {
      const reg = receiptRegistry_();
      const G2 = dbTable_(DB_GROUPS, DB_GROUPS_H), gm = {}; G2.rows.forEach(function(g) { gm[String(g[GR.id])] = g; });
      const totals = {}; Object.keys(reg).forEach(function(k) { totals[k] = reg[k].total; });
      const acc = {};
      dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
        const alloc = rcptAllocateRow_(r[RO.receipt], r[RO.paid], totals, acc, r[RO.split]);
        if (!alloc.length) return;
        const g = gm[String(r[RO.gid])] || [], dt = String(r[RO.date] || '');
        alloc.forEach(function(a) {
          acc[a.rec] = (acc[a.rec] || 0) + a.amount;
          if (!wanted[a.rec] || a.amount <= 0) return;
          if (!receipts[a.rec]) receipts[a.rec] = { total: reg[a.rec] ? reg[a.rec].total : null, rows: [] };
          receipts[a.rec].rows.push({ student: String(r[RO.name] || ''), group: 'Группа ' + (g[GR.num] || '?'), teacher: String(g[GR.teacher] || ''), month: String(g[GR.month] || ''), amount: a.amount, date: /^\d{4}-\d{2}-\d{2}$/.test(dt) ? dt.split('-').reverse().join('.') : dt });
        });
      });
      // предоплаты, книги и архив выбывших — тоже использование квитанции (те же правила, что в реестре)
      let fact = null;
      try { fact = rcptFactUsage_(cfg, totals); } catch (e) { fact = null; }
      Object.keys(receipts).forEach(function(k) { const x = receipts[k]; x.distributed = x.rows.reduce(function(a, r) { return a + r.amount; }, 0); const f = fact ? Math.round(fact[k] || 0) : 0; x.other = Math.max(0, f - x.distributed); x.distributed = Math.max(x.distributed, f); if (x.total === null || x.total < x.distributed) x.total = x.distributed; x.remaining = x.total - x.distributed; });
    }
  } catch (e) {}
  const gkey = roomKey_(c.month, c.teacher.short, groupName);
  const thanksTpl = thanksTplKg_(cfg);
  let noticeOwn = false, remindOwn = false;
  try { noticeOwn = !!groupNoticeModes_()[gkey]; remindOwn = !!groupReminderModes_()[gkey]; } catch (e) {}
  return { success: true, month: c.month, teacher: { name: c.teacher.short, full: c.teacher.full }, group: groupName, level: String(grow[GR.level] || ''), baseTuition: price,
    receipts: receipts, noticeOwn: noticeOwn, remindOwn: remindOwn, thanksTpl: thanksTpl,
    ownPrice: own ? { price: own.price, reason: own.reason, by: own.by, when: own.when } : null,
    listPrice: (function() { const x = priceFor_(readPrices_(), grow[GR.level]); return x === null ? 0 : x; })(),
    lessonsPerMonth: 12, lessonsHeld: held, dates: dd.dates, weekdays: dd.weekdays, datesIso: dd.iso,
    todayLesson: (function() { for (let k = 0; k < 12; k++) if (dd.iso[k] === todayIso) return k + 1; return 0; })(), today: todayIso,
    notices: notices, noticeWindows: { 1: noticeWindowDb_(cfg, grow, 1), 2: noticeWindowDb_(cfg, grow, 2), 3: noticeWindowDb_(cfg, grow, 3) },
    autoNotices: noticeModeFor_(cfg, c.month, c.teacher.short, groupName) === 'auto', autoGlobal: cfg.autoNotices, autoHour: cfg.autoHour,
    remindersOn: reminderModeFor_(cfg, c.month, c.teacher.short, groupName) === 'on', remindersGlobal: cfg.remindersOn, remindHour: cfg.remindHour, lessonToday: dd.iso.indexOf(todayIso) !== -1,
    priceWarning: priceWarning, teachersList: cfgTeachersShort_(), payments: payments };
}

function rosterPayload_(r, grow) {
  const tu = Math.round(parseNum_(r[RO.tuition])), pd = Math.round(parseNum_(r[RO.paid])), dt = String(r[RO.date] || '');
  return { discount: parseNum_(r[RO.disc]), lessons: Math.round(parseNum_(r[RO.lessons])) || 12, tuition: tu, paid: pd, balance: tu - pd, receipt: String(r[RO.receipt] || ''), paymentDate: /^\d{4}-\d{2}-\d{2}$/.test(dt) ? dt.split('-').reverse().join('.') : dt, baseTuition: Math.round(parseNum_(grow[GR.price])) };
}

function updateAdminLessonsDb_(password, month, teacherName, groupName, paymentRow, lessons) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const c = staffCtxDb_(password, month, teacherName, groupName);
  if (c.error) return c.error;
  lessons = parseNum_(lessons);
  if (!Number.isInteger(lessons) || lessons < 1 || lessons > 12) return { success: false, error: 'Количество занятий должно быть от 1 до 12.' };
  const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
  if (!r) return { success: false, error: 'В этой строке нет ученика.' };
  const t = tuitionCalc_(c.group.row[GR.price], r[RO.disc], lessons);
  dbSetCells_(ro.sh, r.rowIndex, { 5: lessons, 6: t, 14: nowStamp_() });
  r[RO.lessons] = lessons; r[RO.tuition] = t;
  const out = rosterPayload_(r, c.group.row); out.success = true; out.studentName = String(r[RO.name]); out.message = 'Количество занятий изменено. Стоимость пересчитана.';
  return out;
}

/** Поиск квитанции по всей базе (все месяцы, все группы) */
function findReceiptInDb_(receipt, exceptKey) {
  const normalized = normalizeReceiptNumber_(receipt);
  if (!normalized || isCashMarker_(normalized)) return null;
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H);
  const hit = R.rows.filter(function(r) { return String(r[RO.key]) !== String(exceptKey) && normalizeReceiptNumber_(r[RO.receipt]) === normalized; })[0];
  if (!hit) return null;
  const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
  const g = G.rows.filter(function(x) { return String(x[GR.id]) === String(hit[RO.gid]); })[0] || [];
  const dt = String(hit[RO.date] || '');
  return { receipt: String(hit[RO.receipt]), student: String(hit[RO.name]), teacher: String(g[GR.teacher] || ''), month: String(g[GR.month] || ''), group: 'Группа ' + (g[GR.num] || ''), date: /^\d{4}-\d{2}-\d{2}$/.test(dt) ? dt.split('-').reverse().join('.') : dt };
}

function savePaymentRowDb_(password, month, teacherName, groupName, paymentRow, payload) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const c = staffCtxDb_(password, month, teacherName, groupName);
  if (c.error) return c.error;
  payload = payload || {};
  const paid = Math.round(parseNum_(payload.paid));
  if (isNaN(paid) || paid < 0) return { success: false, error: 'Оплачено: введите корректную сумму.' };
  const receipt = String(payload.receipt || '').trim(), date = String(payload.date || '').trim();
  if (date && !/^\d{4}-\d{2}-\d{2}$/.test(date)) return { success: false, error: 'Неверный формат даты.' };
  if (paid > 0 && !receipt) return { success: false, error: 'Укажите номер квитанции (или НАЛИЧНЫЕ).' };
  if ((paid > 0 || receipt) && !date) return { success: false, error: 'Укажите дату оплаты.' };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
    if (!r) return { success: false, error: 'В этой строке нет ученика.' };
    const tuition = Math.round(parseNum_(r[RO.tuition]));
    let excess = 0;
    if (tuition > 0 && paid > tuition) {
      excess = paid - tuition;
      if (!(payload.prepayOk === true || String(payload.prepayOk) === 'true')) {
        // сначала предложить зачесть остаток братьям/сёстрам (семья или общий WhatsApp), и только потом — предоплату
        let linked = [];
        try { const st0 = dbStudents_().byId[String(r[RO.sid])] || []; linked = linkedStudents_(c.cfg, c.month, String(r[RO.name]), String(st0[ST.wa] || ''), { teacher: c.teacher.short, group: c.groupName, row: Number(paymentRow) }).filter(function(l) { return l.balance > 0; }); } catch (e) {}
        return { success: false, needPrepayConfirm: true, excess: excess, tuition: tuition, linked: linked, error: 'Сумма больше стоимости обучения на ' + excess + ' сом.' };
      }
    }
    const paidApplied = excess ? tuition : paid;
    let rcRemaining = 0;
    if (receipt) {
      const rc = receiptCheck_(c.cfg, receipt, paid, payload.receiptTotal, { receipt: String(r[RO.receipt] || ''), amount: Math.round(parseNum_(r[RO.paid])), split: String(r[RO.split] || '') }, String(r[RO.name]), c.month);
      if (rc.error) return { success: false, receiptLimit: true, error: rc.error, receipt: receipt, total: rc.total, distributed: rc.distributed, remaining: rc.remaining };
      rcRemaining = Math.max(0, Math.round(rc.remaining || 0));
    }
    const wasPaid = Math.round(parseNum_(r[RO.paid])), wasRec = String(r[RO.receipt] || ''), wasDate = String(r[RO.date] || '');
    const nrec = normalizeReceiptNumber_(receipt);
    const splitOne = (nrec && !isCashMarker_(nrec) && paidApplied > 0) ? nrec + '=' + paidApplied : '';
    dbSetCells_(ro.sh, r.rowIndex, { 7: paidApplied, 8: receipt, 9: date, 14: nowStamp_(), 18: splitOne });
    payStamp_(ro.sh, r, c.role, wasPaid, wasRec, wasDate, paidApplied, receipt, date);
    r[RO.paid] = paidApplied; r[RO.receipt] = receipt; r[RO.date] = date; r[RO.split] = splitOne;
    let ppNote = '';
    // предоплату из переплаты пересобираем только если сумма или квитанция действительно изменились
    // (или есть переплата): иначе простая правка даты аннулировала бы предоплату родителя
    if (excess > 0 || paidApplied !== wasPaid || normalizeReceiptNumber_(receipt) !== normalizeReceiptNumber_(wasRec)) {
      const st = dbStudents_().byId[String(r[RO.sid])] || [];
      const sp = syncPrepayForPayment_(c.cfg, String(r[RO.name]), c.groupName, c.teacher.short, String(st[ST.wa] || ''), receipt, date, excess, c.month, c.role === 'director' ? 'руководитель' : 'кассир');
      ppNote = sp.note ? ' ' + sp.note : '';
    }
    // реестр квитанций: новая и прежняя квитанции строки приводятся к фактам
    try {
      rcptSyncOne_(c.cfg, nrec);
      const seen = {}; seen[nrec] = 1;
      [wasRec, receipt].forEach(function(cell) { rcptParseReceiptCell_(cell).recs.forEach(function(k) { if (!seen[k]) { seen[k] = 1; rcptSyncOne_(c.cfg, k); } }); });
      const wrec = normalizeReceiptNumber_(wasRec); if (wrec && !seen[wrec]) rcptSyncOne_(c.cfg, wrec);
    } catch (e) {}
    const out = rosterPayload_(r, c.group.row); out.success = true; out.studentName = String(r[RO.name]); out.message = 'Оплата сохранена.' + (excess ? ' Переплата ' + excess + ' сом записана в предоплаты.' : '') + ppNote; out.excess = excess; out.receiptRemaining = rcRemaining; out.receipt = receipt;
    if (rcRemaining > 0) { const st2 = dbStudents_().byId[String(r[RO.sid])] || []; out.linked = linkedStudents_(c.cfg, c.month, String(r[RO.name]), String(st2[ST.wa] || ''), { teacher: c.teacher.short, group: c.groupName, row: Number(paymentRow) }); }
    return out;
  } catch (e) {
    return { success: false, error: 'Ошибка сохранения: ' + e.message };
  } finally { try { lock.releaseLock(); } catch (e) {} }
}

function saveDiscountDb_(role, password, month, teacherName, groupName, paymentRow, payload) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const c = staffCtxDb_(password, month, teacherName, groupName, role);
  if (c.error) return c.error;
  payload = payload || {};
  const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
  if (!r) return { success: false, error: 'В этой строке нет ученика.' };
  const S = dbStudents_(); const st = S.byId[String(r[RO.sid])] || [];
  const sh = discountSheet_(true), list = readDiscounts_();
  const who = c.role === 'director' ? 'руководитель' : 'кассир';
  const name = String(r[RO.name] || ''), phone = String(st[ST.wa] || '');
  const existing = findDiscountFor_(list, name, phone);
  const setDisc = function(pct) { const t = tuitionCalc_(c.group.row[GR.price], pct, r[RO.lessons]); dbSetCells_(ro.sh, r.rowIndex, { 4: pct, 6: t, 14: nowStamp_() }); };

  if (payload.action === 'remove') {
    if (!existing) { if (parseNum_(r[RO.disc]) > 0) { setDisc(0); return { success: true, discount: null, message: 'Скидка снята.' }; } return { success: false, error: 'У ученика нет скидки.' }; }
    if (existing.percent >= 50 && c.role !== 'director') return { success: false, error: 'Скидку ' + existing.percent + '% может снять только руководитель.' };
    setDiscountStatus_(sh, existing, DS_REMOVED, who, 'снята вручную');
    setDisc(0);
    return { success: true, discount: null, message: 'Скидка снята.' };
  }
  const percent = Math.round(parseNum_(payload.percent));
  let type = '', basis = '', basisKey = '';
  const comment = String(payload.comment || '').trim();
  if (FAMILY_PERCENTS.indexOf(percent) !== -1) {
    if (existing && existing.type === DISCOUNT_TYPES.teacher && existing.status === DS_ACTIVE) return { success: false, error: 'Это ребёнок преподавателя — у него фиксированная скидка 50%. Семейные скидки (20–45%) на детей преподавателей не распространяются.' };
    type = DISCOUNT_TYPES.family;
    const bn0 = String(payload.basisName || '').trim();
    if (!bn0) return { success: false, error: 'Укажите первого ребёнка из этой семьи.' };
    const rs = resolveFamilyFirst_(list, bn0), bn = rs.first;
    if (rs.key === studentKey_(name)) return { success: false, error: 'Первый ребёнок не может совпадать с самим учеником.' };
    // правило центра: семейную скидку получает один ребёнок, второй платит полностью.
    // «Первым» нельзя назначить того, у кого уже есть любая скидка (в том числе импортированная без основания),
    // а тому, кто уже записан «первым» в чужой скидке, семейную скидку дать нельзя
    const firstDisc = list.filter(function(e) { return (e.status === DS_ACTIVE || e.status === DS_PENDING) && studentKey_(e.student) === rs.key; })[0];
    if (firstDisc) return { success: false, error: 'У «первого ребёнка» ' + bn + ' уже есть скидка ' + firstDisc.percent + '%' + (firstDisc.type ? ' (' + firstDisc.type + ')' : '') + '. Первым считается тот, кто платит полностью: семейная скидка даётся одному ребёнку. Если скидка у ' + bn + ' ошибочная — снимите её и повторите.' };
    const asFirst = list.filter(function(e) { return e.status === DS_ACTIVE && e.type === DISCOUNT_TYPES.family && (e.basisKey === studentKey_(name) || e.famKey === studentKey_(name)); })[0];
    if (asFirst) return { success: false, error: name + ' уже указан первым ребёнком (платит полностью) в скидке ' + asFirst.student + ' (' + asFirst.percent + '%). Семейную скидку ему дать нельзя — сначала снимите скидку у ' + asFirst.student + '.' };
    basis = bn + (!rs.redirected && payload.basisGroup ? ' — ' + payload.basisGroup : '') + (!rs.redirected && payload.basisTeacher ? ' (' + payload.basisTeacher + ')' : ''); basisKey = rs.key;
  } else if (percent === 50) {
    type = DISCOUNT_TYPES.teacher; const bt = String(payload.basisTeacher || '').trim();
    if (!bt) return { success: false, error: 'Выберите преподавателя, чей это ребёнок.' };
    basis = bt; basisKey = nameKey_(bt);
  } else if (percent === 100) {
    type = payload.type === 'orphan' ? DISCOUNT_TYPES.orphan : DISCOUNT_TYPES.special;
    if (!comment) return { success: false, error: 'Для скидки 100% укажите причину в комментарии.' };
    basis = type;
  } else return { success: false, error: 'Допустимые скидки: 20, 25, 30, 35, 40, 45, 50, 100.' };
  let famName = '', famKey = '', until = '', famPos = famPosFromPayload_(payload);
  if (type !== DISCOUNT_TYPES.family) {
    const fl = famLinkFromPayload_(payload, name, list); if (fl.error) return { success: false, error: fl.error };
    const ul = untilFromPayload_(payload); if (ul.error) return { success: false, error: ul.error };
    famName = fl.famName; famKey = fl.famKey; until = ul.until;
  }
  const status = (percent >= 50 && c.role !== 'director') ? DS_PENDING : DS_ACTIVE;
  if (existing) setDiscountStatus_(sh, existing, DS_REMOVED, who, 'заменена новой скидкой');
  const id = Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + String(Math.floor(Math.random() * 90 + 10));
  sh.appendRow([id, name, phoneKey_(phone), c.teacher.short, groupName, percent, type, basis, basisKey, comment, status, who, new Date(), status === DS_ACTIVE ? who : '', status === DS_ACTIVE ? new Date() : '', c.month, new Date(), '', famName, famKey, until, famPos || '']);
  if (status === DS_ACTIVE) setDisc(percent);
  return { success: true, discount: { id: id, percent: percent, type: type, basis: basis, comment: comment, status: status, createdBy: who, month: c.month, until: until, famName: famName },
    message: (status === DS_ACTIVE ? 'Скидка ' + percent + '% применена.' : 'Заявка на скидку ' + percent + '% отправлена руководителю на подтверждение.') + (until ? ' Действует до ' + until + ' включительно.' : '') + (famName ? ' Ученик учтён в составе семьи.' : '') };
}

/** Применить скидку из реестра ученику в базе (текущий месяц) */
function applyDiscountToDb_(cfg, month, e) {
  const groups = dbGroupsOfMonth_(month);
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H);
  const gById = {}; groups.forEach(function(g) { gById[String(g.row[GR.id])] = g.row; });
  const nk = studentKey_(e.student);
  let done = false;
  R.rows.forEach(function(r) {
    const g = gById[String(r[RO.gid])];
    if (!g || studentKey_(r[RO.name]) !== nk) return;
    dbSetCells_(R.sh, r.rowIndex, { 4: e.percent, 6: tuitionCalc_(g[GR.price], e.percent, r[RO.lessons]), 14: nowStamp_() });
    done = true;
  });
  return done;
}

/** Автоперенос / автоснятие скидок в базе (аналог applyRegisteredDiscounts_) */
function applyRegisteredDiscountsDb_(cfg, month) {
  const sh = discountSheet_(false);
  if (!sh) return { applied: 0, removed: 0 };
  const list = readDiscounts_();
  if (!list.length) return { applied: 0, removed: 0 };
  const groups = dbGroupsOfMonth_(month), R = dbTable_(DB_ROSTER, DB_ROSTER_H), S = dbStudents_();
  const gById = {}; groups.forEach(function(g) { if (String(g.row[GR.status]) !== 'скрыта') gById[String(g.row[GR.id])] = g.row; });
  const rows = R.rows.filter(function(r) { return !!gById[String(r[RO.gid])]; });
  const present = {}; rows.forEach(function(r) { present[studentKey_(r[RO.name])] = true; });
  let applied = 0, removed = 0;
  removed += expireFixedDiscounts_(cfg, sh, list, month);
  const active = list.filter(function(e) { return e.status === DS_ACTIVE; });
  removed += recalcFamilyDiscounts_(sh, active, present, month);
  const act2 = active.filter(function(x) { return x.status === DS_ACTIVE; });
  rows.forEach(function(r) {
    const st = S.byId[String(r[RO.sid])] || [];
    const e = findDiscountFor_(act2, String(r[RO.name]), String(st[ST.wa] || ''));
    if (!e || parseNum_(r[RO.disc]) === e.percent) return;
    dbSetCells_(R.sh, r.rowIndex, { 4: e.percent, 6: tuitionCalc_(gById[String(r[RO.gid])][GR.price], e.percent, r[RO.lessons]), 14: nowStamp_() }); applied++;
  });
  return { applied: applied, removed: removed };
}

// ---------- уведомления об оплате (база) ----------
function noticeRecipientsDb_(c, noticeNo) {
  const ro = dbRosterOfGroup_(c.gid), S = dbStudents_();
  const list = [], skipped = [];
  const statusIdx = { 1: RO.n1, 2: RO.n2, 3: RO.n3 }[noticeNo];
  const defer = deferralsFor_(c.month, c.teacher.short, c.groupName), todayIso = isoToday_();
  ro.rows.forEach(function(r) {
    const st = S.byId[String(r[RO.sid])] || [];
    const name = String(r[RO.name] || ''), phone = String(st[ST.wa] || '');
    const tu = Math.round(parseNum_(r[RO.tuition])), balance = tu - Math.round(parseNum_(r[RO.paid]));
    const status = String(r[statusIdx] || '').trim();
    const item = { row: PAY_FIRST_ROW + Number(r[RO.num]) - 1, r: r, name: name, phone: phone, balance: balance, tuition: tu, status: status };
    if (!name) { skipped.push(Object.assign({ reason: 'нет ФИО' }, item)); return; }
    if (balance <= 0) { skipped.push(Object.assign({ reason: 'оплачено' }, item)); return; }
    const ab = absFor_(c.month, c.teacher.short, c.groupName, String(r[RO.sid]));
    if (ab) { skipped.push(Object.assign({ reason: 'временно не ходит (' + ab.reason + ')' }, item)); return; }
    const df = defer[studentKey_(name)];
    if (df && df.until >= todayIso) { skipped.push(Object.assign({ reason: 'отсрочка до ' + df.until.split('-').reverse().join('.') }, item)); return; }
    if (defer.__excl && defer.__excl[studentKey_(name)]) { skipped.push(Object.assign({ reason: 'исключён из уведомлений' }, item)); return; }
    if (!phone) { skipped.push(Object.assign({ reason: 'нет WhatsApp' }, item)); return; }
    if (status) { skipped.push(Object.assign({ reason: 'уже отправлено ' + status }, item)); return; }
    list.push(item);
  });
  return { list: list, skipped: skipped, sh: ro.sh };
}
function noticeDataDb_(cfg, c, item, noticeNo) {
  const grow = c.group.row;
  const lesson = NOTICE_LESSON[noticeNo];
  const iso = String(grow[GR.d1 + lesson - 1] || '');
  let mm = monthFromName_(c.month);
  const first = String(grow[GR.d1] || '');
  if (cfg.monthByFirstLesson !== false && first) { const p = first.split('-'); mm = { y: Number(p[0]), m: Number(p[1]) }; }
  const fd = iso ? fullDateText_(new Date(Number(iso.split('-')[0]), Number(iso.split('-')[1]) - 1, Number(iso.split('-')[2])), '') : fullDateText_(new Date(), '');
  const teacherFull = c.teacher.full || c.teacher.short;
  const meta = groupMetaDb_(grow, c.teacher);
  const paid = Math.round(parseNum_(item.r[RO.paid]));
  return { 'ученик': item.name, 'группа': meta.title, 'уровень': meta.level, 'преподаватель': teacherFull, 'преподаватель_ио': nameWithoutSurname_(teacherFull), 'мугалим': nameWithoutSurname_(teacherFull),
    'месяц': mm ? MONTHS_RU_NOM[mm.m - 1] + ' ' + mm.y : c.month, 'месяц_кг': mm ? MONTHS_KG[mm.m - 1] + ' айы' : c.month, 'ай': mm ? MONTHS_KG[mm.m - 1] : c.month, 'Ай': mm ? MONTHS_KG[mm.m - 1].charAt(0).toUpperCase() + MONTHS_KG[mm.m - 1].slice(1) : c.month,
    'стоимость': String(item.tuition), 'сумма': String(item.tuition), 'оплачено': String(paid), 'остаток': String(Math.max(item.balance, 0)), 'реквизиты': cfg.requisites,
    'дата': fd.date, 'дата_кг': fd.dateKg, 'день': fd.weekday, 'день_кг': fd.weekdayKg,
    'время': meta.time && !/не назнач/i.test(meta.time) ? meta.time : '', 'дни': meta.days && !/не назнач/i.test(meta.days) ? meta.days : '' };
}
function sendNoticesInGroupDb_(cfg, c, noticeNo, rows, who) {
  const msgs = readMessages_();
  const tpl = noticeTemplate_(cfg, msgs, noticeNo);
  if (!tpl) return { error: 'В листе СООБЩЕНИЯ нет текста ОПЛАТА_' + noticeNo + '.' };
  const rc = noticeRecipientsDb_(c, noticeNo);
  let targets = rc.list;
  if (Array.isArray(rows) && rows.length) { const want = {}; rows.forEach(function(r) { want[Number(r)] = true; }); targets = targets.filter(function(x) { return want[x.row]; }); }
  const sent = [], failed = [];
  const statusIdx = { 1: RO.n1, 2: RO.n2, 3: RO.n3 }[noticeNo];
  targets.forEach(function(x, idx) {
    const text = fillTemplate_(tpl, noticeDataDb_(cfg, c, x, noticeNo));
    const r = sendWhatsapp_(x.phone, text);
    const stamp = Utilities.formatDate(new Date(), TZ, 'dd.MM HH:mm');
    logNotification_([new Date(), c.teacher.short, c.groupName, x.name, x.phone, 'оплата-' + noticeNo + ' · ' + who, NOTICE_LESSON[noticeNo], r.ok ? 'отправлено' : 'ошибка', r.ok ? (r.response || '') : r.error]);
    if (r.ok) { const upd = {}; upd[statusIdx] = '✓ ' + stamp; upd[RO.updated] = nowStamp_(); dbSetCells_(rc.sh, x.r.rowIndex, upd); sent.push({ row: x.row, name: x.name }); }
    else failed.push({ row: x.row, name: x.name, error: r.error });
    if (idx < targets.length - 1) Utilities.sleep(700);
  });
  return { sent: sent, failed: failed, skipped: rc.skipped.map(function(x) { return { row: x.row, name: x.name, reason: x.reason }; }) };
}
function previewPaymentNoticesDb_(role, password, month, teacherName, groupName, noticeNo) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const c = staffCtxDb_(password, month, teacherName, groupName, role);
  if (c.error) return c.error;
  noticeNo = Number(noticeNo);
  if (!NOTICE_LESSON[noticeNo]) return { success: false, error: 'Номер уведомления: 1, 2 или 3.' };
  const w = noticeWindowDb_(c.cfg, c.group.row, noticeNo);
  const werr = noticeWindowError_(w, noticeNo);
  if (werr) return { success: false, error: werr, window: w };
  const msgs = readMessages_(), tpl = noticeTemplate_(c.cfg, msgs, noticeNo);
  if (!tpl) return { success: false, error: 'В листе СООБЩЕНИЯ нет текста ОПЛАТА_' + noticeNo + '.' };
  const rc = noticeRecipientsDb_(c, noticeNo);
  const sample = rc.list.length ? fillTemplate_(tpl, noticeDataDb_(c.cfg, c, rc.list[0], noticeNo)) : '';
  return { success: true, noticeNo: noticeNo, lesson: NOTICE_LESSON[noticeNo], name: (msgs['ОПЛАТА_' + noticeNo] || {}).name || '',
    recipients: rc.list.map(function(x) { return { row: x.row, name: x.name, phone: x.phone, balance: x.balance }; }),
    skipped: rc.skipped.map(function(x) { return { row: x.row, name: x.name, reason: x.reason }; }), sample: sample };
}
function sendPaymentNoticesDb_(role, password, month, teacherName, groupName, noticeNo, rows) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const c = staffCtxDb_(password, month, teacherName, groupName, role);
  if (c.error) return c.error;
  noticeNo = Number(noticeNo);
  if (!NOTICE_LESSON[noticeNo]) return { success: false, error: 'Номер уведомления: 1, 2 или 3.' };
  const w = noticeWindowDb_(c.cfg, c.group.row, noticeNo);
  const werr = noticeWindowError_(w, noticeNo);
  if (werr) return { success: false, error: werr };
  const res = sendNoticesInGroupDb_(c.cfg, c, noticeNo, rows, c.role === 'director' ? 'руководитель' : 'кассир');
  if (res.error) return { success: false, error: res.error };
  return { success: true, sent: res.sent, failed: res.failed, skipped: res.skipped, message: 'Отправлено: ' + res.sent.length + (res.failed.length ? ', ошибок: ' + res.failed.length : '') };
}
function sendCustomMessageDb_(role, password, month, teacherName, groupName, paymentRow, text) {
  const c = staffCtxDb_(password, month, teacherName, groupName, role);
  if (c.error) return c.error;
  text = String(text || '').trim();
  if (!text) return { success: false, error: 'Введите текст сообщения.' };
  if (text.length > 1500) return { success: false, error: 'Слишком длинное сообщение (максимум 1500 символов).' };
  const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
  if (!r) return { success: false, error: 'В этой строке нет ученика.' };
  const st = dbStudents_().byId[String(r[RO.sid])] || [];
  const phone = String(st[ST.wa] || '');
  if (!phone) return { success: false, error: 'У ученика не указан WhatsApp родителя.' };
  const res = sendWhatsapp_(phone, text);
  logNotification_([new Date(), c.teacher.short, c.groupName, String(r[RO.name]), phone, 'ручное · ' + (c.role === 'director' ? 'руководитель' : 'кассир'), '', res.ok ? 'отправлено' : 'ошибка', res.ok ? text.substr(0, 300) : res.error]);
  if (!res.ok) return { success: false, error: res.error };
  return { success: true, message: 'Сообщение отправлено (' + phone + ').' };
}
function autoPaymentNoticesDb_(cfg, month) {
  let total = 0;
  const modes = groupNoticeModes_();
  dbGroupsOfMonth_(month).forEach(function(g) {
    if (String(g.row[GR.status]) === 'скрыта') return;
    if (noticeModeFor_(cfg, month, String(g.row[GR.teacher]), 'Группа ' + g.row[GR.num], modes) !== 'auto') return;
    const tcfg = findTeacherCfg_(cfg, g.row[GR.teacher]) || { short: String(g.row[GR.teacher]), full: '' };
    const c = { cfg: cfg, role: 'auto', month: month, teacher: tcfg, group: g, gid: String(g.row[GR.id]), groupName: 'Группа ' + g.row[GR.num] };
    for (let n = 1; n <= 3; n++) {
      if (noticeWindowDb_(cfg, g.row, n).state !== 'open') continue;
      const res = sendNoticesInGroupDb_(cfg, c, n, [], 'авто');
      if (res.error) { Logger.log(c.teacher.short + ' / ' + c.groupName + ': ' + res.error); continue; }
      total += res.sent.length;
      Logger.log(c.teacher.short + ' / ' + c.groupName + ' — уведомление ' + n + ': отправлено ' + res.sent.length + ', ошибок ' + res.failed.length);
    }
  });
  Logger.log('Автоуведомления (база) за ' + isoToday_() + ': отправлено ' + total + '.');
}

// ---------- настройки группы и заявки (база) ----------
function getGroupSettingsForStaffDb_(role, password, month, teacherName, groupName) {
  const c = staffCtxDb_(password, month, teacherName, groupName, role);
  if (c.error) return c.error;
  const levels = priceLevels_();
  const metaR = groupMetaDb_(c.group.row, c.teacher); metaR.room = getRoom_(c.month, c.teacher.short, groupName);
  return { success: true, meta: metaR, window: groupEditWindowDb_(c.cfg, c.group.row), options: { levels: levels, times: c.cfg.timeOptions, days: c.cfg.dayOptions, rooms: c.cfg.rooms } };
}
function saveGroupSettingsByStaffDb_(role, password, month, teacherName, groupName, level, time, days) {
  const c = staffCtxDb_(password, month, teacherName, groupName, role);
  if (c.error) return c.error;
  const res = applyGroupSettingsDb_(c.cfg, c.group, String(level || '').trim(), String(time || '').trim(), String(days || '').trim(), c.role === 'director' ? 'руководитель' : 'кассир', c.teacher.short);
  if (res.success && res.changes && res.changes.length) res.message = 'Настройки группы изменены: ' + res.changes.map(function(x) { return x[0] + ' «' + x[1] + '» → «' + x[2] + '»'; }).join('; ');
  return res;
}
function applyRequestDb_(cfg, r, who) {
  const g = dbGroup_(r.month, r.teacher, r.group);
  if (!g) return { success: false, error: 'Группа ' + r.group + ' преподавателя ' + r.teacher + ' за ' + r.month + ' не найдена в базе.' };
  let data = {}; try { data = JSON.parse(r.data || '{}'); } catch (e) {}
  if (r.type === 'дата') {
    const lesson = Number(r.lesson);
    if (!Number.isInteger(lesson) || lesson < 1 || lesson > 12) return { success: false, error: 'Неверный номер занятия в заявке.' };
    if (data.iso && !/^\d{4}-\d{2}-\d{2}$/.test(data.iso)) return { success: false, error: 'Неверная дата в заявке.' };
    writeLessonDateDb_(g, lesson, data.iso || '');
    logChanges_(r.teacher + ' ← ' + who, r.group, '', '(дата занятия ' + lesson + ')', [['Дата занятия ' + lesson, r.was, r.now]]);
    return { success: true };
  }
  if (r.type === 'настройки') return applyGroupSettingsDb_(cfg, g, String(data.level || ''), String(data.time || ''), String(data.days || ''), who, r.teacher);
  return { success: false, error: 'Неизвестный тип заявки: ' + r.type };
}

// ---------- НОВЫЙ МЕСЯЦ (Э4) ----------
/**
 * Открыть новый месяц в базе: группы и составы копируются из предыдущего (ТЕКУЩИЙ_МЕСЯЦ),
 * даты занятий очищаются, оплаты и уведомления — пустые, скидки — из реестра (активные).
 * Пример: openNewMonth('Октябрь 2026'). Повторный запуск не дублирует.
 */
function openNewMonth(newMonth) {
  const cfg = getConfig_();
  newMonth = String(newMonth || '').trim();
  if (!monthFromName_(newMonth)) return 'Укажите месяц, например: openNewMonth("Октябрь 2026")';
  const prev = cfg.currentMonth;
  if (nameKey_(prev) === nameKey_(newMonth)) return 'Месяц ' + newMonth + ' уже текущий.';
  try { backupNow('перед открытием ' + newMonth); } catch (e) { Logger.log('Резервная копия не создана: ' + e.message); }
  const G = dbTable_(DB_GROUPS, DB_GROUPS_H), R = dbTable_(DB_ROSTER, DB_ROSTER_H), A = dbTable_(DB_ATT, DB_ATT_H), S = dbStudents_();
  const prices = readPrices_(), discounts = readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE; });
  const stamp = nowStamp_();
  const existingKeys = {}; G.rows.forEach(function(r) { existingKeys[String(r[GR.key])] = true; });
  const rosterByGid = {}; R.rows.forEach(function(r) { (rosterByGid[String(r[RO.gid])] = rosterByGid[String(r[RO.gid])] || []).push(r); });
  const newG = [], newR = [], newA = [];
  let idCounterG = 0;
  G.rows.filter(function(r) { return nameKey_(r[GR.month]) === nameKey_(prev) && String(r[GR.status]) !== 'скрыта'; }).forEach(function(old) {
    const key = nameKey_(newMonth) + '|' + nameKey_(old[GR.teacher]) + '|' + old[GR.num];
    if (existingKeys[key]) return;
    const gid = nextId_('Г-', G.rows.concat(newG), 0);
    const price = priceFor_(prices, old[GR.level]); const priceVal = price !== null ? price : Math.round(parseNum_(old[GR.price]));
    newG.push([gid, newMonth, old[GR.teacher], old[GR.num], old[GR.title], old[GR.level], old[GR.days], old[GR.time], priceVal, old[GR.coef]].concat(new Array(12).fill('')).concat(['активна', stamp, 'перенос из ' + prev, key]));
    (rosterByGid[String(old[GR.id])] || []).forEach(function(r) {
      const st = S.byId[String(r[RO.sid])] || [];
      if (String(st[ST.status]) === 'выбыл') return;
      const e = findDiscountFor_(discounts, String(r[RO.name]), String(st[ST.wa] || ''));
      const pct = e ? e.percent : 0;
      const k = gid + '|' + r[RO.sid];
      newR.push([gid, r[RO.sid], r[RO.num], r[RO.name], pct, 12, tuitionCalc_(priceVal, pct, 12), 0, '', '', '', '', '', '', stamp, '', '', '', '', k]);
      newA.push([gid, r[RO.sid], r[RO.name]].concat(new Array(12).fill('')).concat([stamp, k]));
    });
  });
  if (newG.length) G.sh.getRange(G.sh.getLastRow() + 1, 1, newG.length, DB_GROUPS_H.length).setValues(newG);
  if (newR.length) R.sh.getRange(R.sh.getLastRow() + 1, 1, newR.length, DB_ROSTER_H.length).setValues(newR);
  if (newA.length) A.sh.getRange(A.sh.getLastRow() + 1, 1, newA.length, DB_ATT_H.length).setValues(newA); dbInvalidate_();
  // ТЕКУЩИЙ_МЕСЯЦ
  const st = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
  if (st && st.getLastRow() >= 2) st.getRange(2, 1, st.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) { if (String(r[0]).trim() === 'ТЕКУЩИЙ_МЕСЯЦ') st.getRange(i + 2, 2).setValue(newMonth); });
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  const msg = 'Открыт месяц «' + newMonth + '»: групп ' + newG.length + ', учеников ' + newR.length + '. Даты занятий пустые — преподаватели заполняют их в кабинете. ТЕКУЩИЙ_МЕСЯЦ = ' + newMonth + '.';
  Logger.log(msg);
  return msg;
}


// ============================================================
// ЧАСТЬ 7. РЕЗЕРВНЫЕ КОПИИ ОСНОВНОЙ ТАБЛИЦЫ
// ============================================================

const BACKUP_FOLDER = 'Резервные копии — журнал Планета';

function backupFolder_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const file = DriveApp.getFileById(ss.getId());
  const parents = file.getParents();
  const parent = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
  const it = parent.getFoldersByName(BACKUP_FOLDER);
  return it.hasNext() ? it.next() : parent.createFolder(BACKUP_FOLDER);
}

/**
 * Сделать резервную копию всей таблицы сейчас (в папку «Резервные копии — журнал Планета»
 * рядом с таблицей). Хранится РЕЗЕРВНЫХ_КОПИЙ_ХРАНИТЬ последних копий, старые удаляются.
 */
function backupNow(label) {
  const cfg = getConfig_();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const folder = backupFolder_();
  const stamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH-mm');
  const name = 'КОПИЯ ' + stamp + (label ? ' · ' + label : '') + ' — ' + ss.getName();
  const copy = DriveApp.getFileById(ss.getId()).makeCopy(name, folder);

  // ротация: оставляем N последних
  const keep = Math.max(1, Math.round(parseNum_(cfg.settings['РЕЗЕРВНЫХ_КОПИЙ_ХРАНИТЬ'])) || 12);
  const files = [];
  const it = folder.getFiles();
  while (it.hasNext()) { const f = it.next(); if (/^КОПИЯ /.test(f.getName())) files.push(f); }
  files.sort(function(a, b) { return b.getDateCreated() - a.getDateCreated(); });
  let removed = 0;
  files.slice(keep).forEach(function(f) { try { f.setTrashed(true); removed++; } catch (e) {} });

  const msg = 'Резервная копия создана: «' + name + '». Всего копий: ' + Math.min(files.length, keep) + (removed ? ', удалено старых: ' + removed : '') + '.';
  Logger.log(msg);
  try { ss.toast(msg, 'Резервная копия', 8); } catch (e) {}
  return msg;
}

/** Еженедельная копия (триггер) */
function weeklyBackup() { backupNow('еженедельная'); }

/** ЗАПУСТИТЬ ОДИН РАЗ: триггер еженедельной копии — воскресенье, около 03:00 по Бишкеку */
function createBackupTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) { if (t.getHandlerFunction() === 'weeklyBackup') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('weeklyBackup').timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(3).inTimezone('Asia/Bishkek').create();
  const msg = 'Триггер резервного копирования установлен: каждое воскресенье около 03:00 (Бишкек). Первая копия — сейчас: ' + backupNow('первая');
  Logger.log(msg);
  return msg;
}

/** Список копий (для проверки) — в журнале выполнения */
function listBackups() {
  const folder = backupFolder_();
  const it = folder.getFiles(); const out = [];
  while (it.hasNext()) { const f = it.next(); out.push(Utilities.formatDate(f.getDateCreated(), TZ, 'dd.MM.yyyy HH:mm') + ' — ' + f.getName() + ' — ' + f.getUrl()); }
  out.sort().reverse();
  const msg = out.length ? out.join('\n') : 'Копий пока нет.';
  Logger.log(msg);
  return msg;
}


// ============================================================
// ЧАСТЬ 2в. УДАЛЕНИЕ УЧЕНИКА ПО ЗАЯВКЕ (преподаватель → администратор/руководитель) + АРХИВ
// ============================================================

const ARCHIVE_SHEET = 'АРХИВ_УЧЕНИКОВ';
const ARCHIVE_H = ['Удалён', 'Кем', 'Месяц', 'Преподаватель', 'Группа', '№', 'ФИО', 'WhatsApp', 'Тел. папы', 'Тел. мамы', 'Тел. ученика', 'Комментарий',
  '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', 'Скидка %', 'Занятий', 'Оплачено', 'Квитанция', 'Дата оплаты', 'ID ученика', 'ID заявки'];

function archiveSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(ARCHIVE_SHEET);
  if (!sh) {
    sh = ss.insertSheet(ARCHIVE_SHEET);
    sh.getRange(1, 1, 1, ARCHIVE_H.length).setValues([ARCHIVE_H]);
    styleConfigSheet_(sh, ARCHIVE_H.length, [130, 120, 120, 150, 90, 40, 220, 120, 110, 110, 110, 160, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 36, 70, 60, 80, 130, 100, 90, 110]);
  }
  return sh;
}

/** Преподаватель: запросить удаление ученика (строка row = 14..29) */
function requestStudentDeletion(teacherName, password, groupName, row, month) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;
  row = Number(row);
  if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { success: false, error: 'Неверная строка.' };
  let teacherShort, name, wa, sid = '';
  if (cfg.useDb) {
    const ctx = teacherCtxDb_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    const ro = dbRosterOfGroup_(ctx.gid), r = ro.rows.filter(function(x) { return Number(x[RO.num]) === row - T_FIRST_ROW + 1; })[0];
    if (!r) return { success: false, error: 'В этой строке нет ученика.' };
    const st = dbStudents_().byId[String(r[RO.sid])] || [];
    teacherShort = ctx.auth.teacher.name; name = String(r[RO.name] || st[ST.name] || ''); wa = String(st[ST.wa] || ''); sid = String(r[RO.sid]);
  } else {
    const ctx = teacherContext_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    if (!ctx.editable) return { success: false, error: 'Недоступно: журнал посещений не назначен.' };
    const d = ctx.sheet.getRange(row, 1, 1, 21).getDisplayValues()[0];
    name = String(d[1] || '').trim(); wa = String(d[16] || '').trim();
    if (!name) return { success: false, error: 'В этой строке нет ученика.' };
    teacherShort = ctx.auth.teacher.name; month = ctx.journal.month;
  }
  // защита от повторных заявок
  const dup = readRequests_().filter(function(r) {
    return r.status === RQ_PENDING && r.type === 'удаление' && r.teacher === teacherShort && nameKey_(r.month) === nameKey_(month) && r.group === String(groupName) && (Number(r.lesson) === row || studentKey_(r.was) === studentKey_(name));
  })[0];
  if (dup) return { success: false, error: 'По ученику ' + name + ' уже есть запрос на удаление (ожидает подтверждения с ' + dup.created + ').' };
  const req = createRequest_('удаление', teacherShort, month, String(groupName), row, name, 'удалить', JSON.stringify({ row: row, name: name, wa: wa, sid: sid }));
  return { success: true, request: req, message: 'Запрос на удаление ученика ' + name + ' отправлен руководителю. Ученик будет удалён только после подтверждения.' };
}

/** Удаление в режиме журналов: архив → очистка строки в NEW и платёжного блока в PAYMENTS */
function deleteStudentJournals_(cfg, r, who) {
  const journal = findJournal_(cfg, r.month, r.teacher);
  if (!journal || !journal.attendanceId) return { success: false, error: 'Журнал посещений преподавателя за ' + r.month + ' не найден.' };
  let data = {}; try { data = JSON.parse(r.data || '{}'); } catch (e) {}
  const row = Number(data.row || r.lesson);
  if (!Number.isInteger(row) || row < T_FIRST_ROW || row > T_LAST_ROW) return { success: false, error: 'Неверная строка в заявке.' };
  let nss, pss;
  try { nss = SpreadsheetApp.openById(journal.attendanceId); } catch (e) { return { success: false, error: 'Не удалось открыть журнал NEW: ' + e.message }; }
  try { pss = SpreadsheetApp.openById(journal.paymentsId); } catch (e) { pss = null; }
  const nsh = nss.getSheetByName(r.group);
  if (!nsh) return { success: false, error: 'Лист ' + r.group + ' не найден в журнале NEW.' };
  const d = nsh.getRange(row, 1, 1, 21).getDisplayValues()[0];
  const curName = String(d[1] || '').trim();
  if (studentKey_(curName) !== studentKey_(r.was)) return { success: false, error: 'В строке ' + (row - T_FIRST_ROW + 1) + ' сейчас «' + (curName || 'пусто') + '», а не «' + r.was + '» — состав изменился, заявка не применена.' };
  const marks = []; for (let k = 0; k < 12; k++) marks.push(String(d[ATT_FIRST_COL - 1 + k] || ''));
  let pay = ['', '', '', '', ''];
  const psh = pss ? pss.getSheetByName(r.group) : null;
  const prow = PAY_FIRST_ROW + (row - T_FIRST_ROW);
  if (psh) { const pd = psh.getRange(prow, 1, 1, 22).getDisplayValues()[0]; pay = [pd[2], pd[21], pd[17], pd[19], pd[18]]; }
  archiveSheet_().appendRow([new Date(), who, r.month, r.teacher, r.group, row - T_FIRST_ROW + 1, curName, d[16], d[17], d[18], d[19], d[20]].concat(marks).concat(pay).concat(['', r.id]));
  // очистка NEW: ФИО, отметки, контакты, комментарий, служебная метка
  nsh.getRange(row, T_COL_NAME).clearContent();
  nsh.getRange(row, ATT_FIRST_COL, 1, ATT_COLS).clearContent();
  nsh.getRange(row, 17, 1, 5).clearContent();
  try { nsh.getRange(row, T_COL_SAVED).clearContent(); } catch (e) {}
  // очистка платёжного блока PAYMENTS (скидка, занятия, оплачено, дата, квитанция)
  if (psh) { try { psh.getRange(prow, COL_DISCOUNT).clearContent(); psh.getRange(prow, COL_LESSONS).clearContent(); psh.getRange(prow, COL_PAID).clearContent(); psh.getRange(prow, COL_DATE).clearContent(); psh.getRange(prow, COL_RECEIPT).clearContent(); } catch (e) {} }
  SpreadsheetApp.flush();
  logChanges_(r.teacher + ' ← ' + who, r.group, row, curName, [['Удалён из группы', curName, 'АРХИВ_УЧЕНИКОВ']]);
  return { success: true };
}

/** Удаление в режиме базы: архив → строки СОСТАВ и ПОСЕЩЕНИЯ удаляются, карточка ученика → «выбыл», если больше нигде не учится */
function deleteStudentDb_(cfg, r, who) {
  const g = dbGroup_(r.month, r.teacher, r.group);
  if (!g) return { success: false, error: 'Группа ' + r.group + ' за ' + r.month + ' не найдена в базе.' };
  let data = {}; try { data = JSON.parse(r.data || '{}'); } catch (e) {}
  const gid = String(g.row[GR.id]);
  const ro = dbRosterOfGroup_(gid);
  const rr = ro.rows.filter(function(x) { return (data.sid && String(x[RO.sid]) === String(data.sid)) || studentKey_(x[RO.name]) === studentKey_(r.was); })[0];
  if (!rr) {
    logChanges_(r.teacher + ' ← ' + who, r.group, '', r.was, [['Заявка на удаление', 'ученик уже отсутствует в группе', 'закрыта']]);
    return { success: true, already: true };
  }
  const sid = String(rr[RO.sid]);
  const S = dbStudents_(), st = S.byId[sid] || [];
  const at = dbAttOfGroup_(gid), a = at.map[sid];
  const marks = []; for (let k = 0; k < 12; k++) marks.push(a ? String(a[AT.m1 + k] || '') : '');
  archiveSheet_().appendRow([new Date(), who, r.month, r.teacher, r.group, Number(rr[RO.num]), String(rr[RO.name]), String(st[ST.wa] || ''), String(st[ST.dad] || ''), String(st[ST.mom] || ''), String(st[ST.stu] || ''), String(rr[RO.note] || '')]
    .concat(marks).concat([rr[RO.disc], rr[RO.lessons], rr[RO.paid], rr[RO.receipt], rr[RO.date], sid, r.id]));
  // удалить строки (сначала посещения, затем состав)
  if (a) at.sh.deleteRow(a.rowIndex);
  ro.sh.deleteRow(rr.rowIndex);
  dbInvalidate_();
  // статус карточки: выбыл, если нет в других группах текущего месяца
  const R2 = dbTable_(DB_ROSTER, DB_ROSTER_H);
  const gids = {}; dbGroupsOfMonth_(cfg.currentMonth).forEach(function(x) { gids[String(x.row[GR.id])] = true; });
  const still = R2.rows.some(function(x) { return String(x[RO.sid]) === sid && gids[String(x[RO.gid])]; });
  if (!still && st.rowIndex) dbSetCells_(S.sh, st.rowIndex, { 6: 'выбыл', 9: nowStamp_() });
  logChanges_(r.teacher + ' ← ' + who, r.group, Number(rr[RO.num]), String(rr[RO.name]), [['Удалён из группы', String(rr[RO.name]), 'АРХИВ_УЧЕНИКОВ']]);
  return { success: true };
}


/**
 * Пакетное удаление учеников (режим БАЗА): все таблицы читаются один раз, архив пишется одним блоком,
 * строки удаляются одним проходом. В ~10 раз быстрее поштучного удаления.
 */
function deleteStudentsBatchDb_(cfg, reqs, who) {
  const results = {};
  const G = dbTable_(DB_GROUPS, DB_GROUPS_H), R = dbTable_(DB_ROSTER, DB_ROSTER_H), A = dbTable_(DB_ATT, DB_ATT_H), S = dbStudents_();
  const archiveRows = [], delRoster = [], delAtt = [], logs = [], affected = {};
  reqs.forEach(function(r) {
    const num = Number(String(r.group).replace(/\D/g, ''));
    const g = G.rows.filter(function(x) { return nameKey_(x[GR.month]) === nameKey_(r.month) && nameKey_(x[GR.teacher]) === nameKey_(r.teacher) && Number(x[GR.num]) === num; })[0];
    if (!g) { results[r.id] = { success: false, error: 'Группа ' + r.group + ' за ' + r.month + ' не найдена в базе.' }; return; }
    const gid = String(g[GR.id]);
    let data = {}; try { data = JSON.parse(r.data || '{}'); } catch (e) {}
    const rr = R.rows.filter(function(x) { return !x.__del && String(x[RO.gid]) === gid && ((data.sid && String(x[RO.sid]) === String(data.sid)) || studentKey_(x[RO.name]) === studentKey_(r.was)); })[0];
    if (!rr) { results[r.id] = { success: true, already: true }; logs.push([r.teacher + ' ← ' + who, r.group, '', r.was, [['Заявка на удаление', 'ученик уже отсутствует в группе', 'закрыта']]]); return; }
    rr.__del = true;
    const sid = String(rr[RO.sid]), st = S.byId[sid] || [];
    const a = A.rows.filter(function(x) { return !x.__del && String(x[AT.gid]) === gid && String(x[AT.sid]) === sid; })[0];
    if (a) a.__del = true;
    const marks = []; for (let k = 0; k < 12; k++) marks.push(a ? String(a[AT.m1 + k] || '') : '');
    archiveRows.push([new Date(), who, r.month, r.teacher, r.group, Number(rr[RO.num]), String(rr[RO.name]), String(st[ST.wa] || ''), String(st[ST.dad] || ''), String(st[ST.mom] || ''), String(st[ST.stu] || ''), String(rr[RO.note] || '')]
      .concat(marks).concat([rr[RO.disc], rr[RO.lessons], rr[RO.paid], rr[RO.receipt], rr[RO.date], sid, r.id]));
    delRoster.push(rr.rowIndex); if (a) delAtt.push(a.rowIndex);
    affected[sid] = st;
    logs.push([r.teacher + ' ← ' + who, r.group, Number(rr[RO.num]), String(rr[RO.name]), [['Удалён из группы', String(rr[RO.name]), 'АРХИВ_УЧЕНИКОВ']]]);
    results[r.id] = { success: true };
  });
  if (archiveRows.length) {
    const ash = archiveSheet_(), w = archiveRows[0].length;
    ash.getRange(ash.getLastRow() + 1, 1, archiveRows.length, w).setValues(archiveRows.map(function(row) { while (row.length < w) row.push(''); return row.slice(0, w); }));
  }
  delAtt.sort(function(a, b) { return b - a; }).forEach(function(ri) { A.sh.deleteRow(ri); });
  delRoster.sort(function(a, b) { return b - a; }).forEach(function(ri) { R.sh.deleteRow(ri); });
  dbInvalidate_();
  const gids = {}; G.rows.forEach(function(x) { if (nameKey_(x[GR.month]) === nameKey_(cfg.currentMonth) && String(x[GR.status]) !== 'скрыта') gids[String(x[GR.id])] = true; });
  Object.keys(affected).forEach(function(sid) {
    const still = R.rows.some(function(x) { return !x.__del && String(x[RO.sid]) === sid && gids[String(x[RO.gid])]; });
    const st = affected[sid];
    if (!still && st.rowIndex) dbSetCells_(S.sh, st.rowIndex, { 6: 'выбыл', 9: nowStamp_() });
  });
  logs.forEach(function(l) { logChanges_.apply(null, l); });
  return results;
}

/** Решение по нескольким заявкам сразу (например, «Подтвердить все удаления») */
function decideRequestsBatch(role, password, ids, approve, note) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  ids = Array.isArray(ids) ? ids : [];
  const ok = [], failed = [];
  const lock = LockService.getScriptLock(); if (!lock.tryLock(15000)) return { success: false, error: 'База занята другой операцией, повторите через минуту.' };
  try {
    let rest = ids.slice();
    // быстрый путь: подтверждение удалений в режиме БАЗА — пакетом
    if (approve && cfg.useDb) {
      const who = roleTitle_(actual);
      const sh = requestsSheet_(true), all = readRequests_();
      const wanted = {}; ids.forEach(function(id) { wanted[String(id)] = true; });
      const dels = all.filter(function(r) { return wanted[r.id] && r.status === RQ_PENDING && r.type === 'удаление' && !monthClosed_(r.month); });
      if (dels.length) {
        const res = deleteStudentsBatchDb_(cfg, dels, who);
        dels.forEach(function(r) {
          const x = res[r.id];
          if (x && x.success) { sh.getRange(r.rowIndex, 10, 1, 5).setValues([[RQ_DELETED, sh.getRange(r.rowIndex, 11).getValue(), who, new Date(), String(note || '') + (x.already ? ' (ученик уже отсутствовал в группе)' : '')]]); ok.push(r.id); }
          else failed.push({ id: r.id, error: (x && x.error) || 'ошибка' });
          rest = rest.filter(function(i) { return String(i) !== r.id; });
        });
      }
    }
    rest.forEach(function(id) {
      try {
        const r = decideRequest(role, password, id, !!approve, note);
        if (r && r.success) ok.push(id); else failed.push({ id: id, error: (r && r.error) || 'ошибка' });
      } catch (e) { failed.push({ id: id, error: e.message }); }
    });
  } finally { lock.releaseLock(); }
  return { success: true, done: ok.length, failed: failed, message: (approve ? 'Подтверждено' : 'Отклонено') + ': ' + ok.length + (failed.length ? ', не удалось: ' + failed.length : '') + '.' };
}


/** Преподаватель: открыть следующий свободный журнал (пустая группа). Возвращает её имя. */
function createTeacherGroup(teacherName, password, wantNum, month) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg = getConfig_();
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;
  month = String(month || '').trim() || cfg.currentMonth;
  const na = function(v) { return !v || /не назнач|не выбран/i.test(v); };
  wantNum = Number(wantNum) || 0;
  if (wantNum && (wantNum < 1 || wantNum > 10)) return { success: false, error: 'Номер группы от 1 до 10.' };
  if (cfg.useDb && wantNum) {
    const g = dbGroup_(month, auth.teacher.name, 'Группа ' + wantNum);
    if (g) { if (String(g.row[GR.status]) === 'скрыта') dbSetCells_(g.sh, g.rowIndex, { 22: 'активна', 23: nowStamp_() }); return { success: true, group: 'Группа ' + wantNum, message: 'Открыта Группа ' + wantNum + '.' }; }
    const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
    const gid = nextId_('Г-', G.rows, 0);
    const key = nameKey_(month) + '|' + nameKey_(auth.teacher.name) + '|' + wantNum;
    dbAppendRow_(G.sh, [gid, month, auth.teacher.name, wantNum, 'Группа - ' + wantNum, '', '', '', 0, cfg.defaultCoef].concat(new Array(12).fill('')).concat(['активна', nowStamp_(), 'создана преподавателем', key]));
    return { success: true, group: 'Группа ' + wantNum, message: 'Создана Группа ' + wantNum + '. Задайте уровень, дни и время, затем добавьте учеников.' };
  }
  if (!cfg.useDb && wantNum) {
    const journal = findJournal_(cfg, month, auth.teacher.name);
    if (!journal || !journal.attendanceId) return { success: false, error: 'Журнал посещений не назначен.' };
    try {
      const nss = SpreadsheetApp.openById(journal.attendanceId); const sh = nss.getSheetByName('Группа ' + wantNum);
      if (!sh) return { success: false, error: 'Листа «Группа ' + wantNum + '» нет в журнале.' };
      if (isHidden_(sh)) sh.showSheet();
      try { const p = SpreadsheetApp.openById(journal.paymentsId).getSheetByName('Группа ' + wantNum); if (p && isHidden_(p)) p.showSheet(); } catch (e) {}
    } catch (e) { return { success: false, error: 'Не удалось открыть журнал: ' + e.message }; }
    return { success: true, group: 'Группа ' + wantNum, message: 'Открыта Группа ' + wantNum + '.' };
  }
  if (cfg.useDb) {
    const groups = dbGroupsOfMonth_(month).filter(function(g) { return nameKey_(g.row[GR.teacher]) === nameKey_(auth.teacher.name); });
    const R = dbTable_(DB_ROSTER, DB_ROSTER_H);
    const cnt = {}; R.rows.forEach(function(r) { cnt[String(r[RO.gid])] = (cnt[String(r[RO.gid])] || 0) + 1; });
    // уже существующая пустая группа
    for (let i = 0; i < groups.length; i++) {
      const g = groups[i].row;
      if (String(g[GR.status]) === 'скрыта') { dbSetCells_(groups[i].sh, groups[i].rowIndex, { 22: 'активна', 23: nowStamp_() }); return { success: true, group: 'Группа ' + g[GR.num], message: 'Открыта Группа ' + g[GR.num] + '.' }; }
      if (!cnt[String(g[GR.id])] && na(g[GR.level]) && na(g[GR.time]) && na(g[GR.days]) && !groupDates_(g).some(Boolean)) return { success: true, group: 'Группа ' + g[GR.num], message: 'Открыта Группа ' + g[GR.num] + '.' };
    }
    const taken = {}; groups.forEach(function(g) { taken[Number(g.row[GR.num])] = true; });
    for (let n = 1; n <= 10; n++) {
      if (taken[n]) continue;
      const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
      const gid = nextId_('Г-', G.rows, 0);
      const key = nameKey_(month) + '|' + nameKey_(auth.teacher.name) + '|' + n;
      dbAppendRow_(G.sh, [gid, month, auth.teacher.name, n, 'Группа - ' + n, '', '', '', 0, cfg.defaultCoef].concat(new Array(12).fill('')).concat(['активна', nowStamp_(), 'создана преподавателем', key]));
      return { success: true, group: 'Группа ' + n, message: 'Создана Группа ' + n + '. Задайте уровень, дни и время, затем добавьте учеников.' };
    }
    return { success: false, error: 'Все 10 групп уже используются. Обратитесь к руководителю.' };
  }
  // режим журналов: первая пустая (в т.ч. скрытая) группа в NEW
  const journal = findJournal_(cfg, month, auth.teacher.name);
  if (!journal || !journal.attendanceId) return { success: false, error: 'Журнал посещений не назначен.' };
  let nss, pss = null;
  try { nss = SpreadsheetApp.openById(journal.attendanceId); } catch (e) { return { success: false, error: 'Не удалось открыть журнал: ' + e.message }; }
  try { pss = SpreadsheetApp.openById(journal.paymentsId); } catch (e) {}
  for (let g = 1; g <= 10; g++) {
    const sh = nss.getSheetByName('Группа ' + g);
    if (!sh) continue;
    const disp = sh.getRange('A1:U29').getDisplayValues();
    let count = 0;
    for (let i = 0; i < 16; i++) if (String(disp[13 + i][1] || '').trim() || String(disp[13 + i][16] || '').trim()) count++;
    const meta = groupMetaFromGrid_(disp, g, sh);
    let hasDates = false;
    for (let c = ATT_FIRST_COL - 1; c < ATT_FIRST_COL - 1 + ATT_COLS; c++) if (String(disp[ATT_DATES_ROW - 1][c] || '').trim()) { hasDates = true; break; }
    if (count === 0 && na(meta.level) && na(meta.time) && na(meta.days) && !hasDates) {
      try { if (isHidden_(sh)) sh.showSheet(); } catch (e) {}
      if (pss) { try { const p = pss.getSheetByName('Группа ' + g); if (p && isHidden_(p)) p.showSheet(); } catch (e) {} }
      return { success: true, group: 'Группа ' + g, message: 'Открыта Группа ' + g + '. Задайте уровень, дни и время, затем добавьте учеников.' };
    }
  }
  return { success: false, error: 'Все 10 групп уже используются. Обратитесь к руководителю.' };
}


/** Администратор/руководитель: включить или выключить журнал преподавателя (столбец «Журнал» листа ПРЕПОДАВАТЕЛИ) */
function setTeacherJournal(role, password, teacherShort, on) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  teacherShort = String(teacherShort || '').trim();
  const t = findTeacherCfg_(cfg, teacherShort);
  if (!t) return { success: false, error: 'Преподаватель не найден.' };
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(CFG_TEACHERS);
  if (!sh) return { success: false, error: 'Лист ПРЕПОДАВАТЕЛИ не найден.' };
  const col = TEACHERS_HEADERS.length;   // столбец «Журнал (ВКЛ/ВЫКЛ)»
  if (!String(sh.getRange(1, col).getValue() || '').trim()) sh.getRange(1, col).setValue(TEACHERS_HEADERS[col - 1]);
  const last = sh.getLastRow();
  let done = false;
  if (last >= 2) {
    sh.getRange(2, 2, last - 1, 1).getDisplayValues().forEach(function(r, i) {
      if (nameKey_(r[0]) === nameKey_(teacherShort)) { sh.getRange(i + 2, col).setNumberFormat('@').setValue(on ? 'ВКЛ' : 'ВЫКЛ'); done = true; }
    });
  }
  if (!done) return { success: false, error: 'Строка преподавателя не найдена в листе ПРЕПОДАВАТЕЛИ.' };
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  logChanges_(teacherShort + ' ← ' + (actual === 'director' ? 'руководитель' : 'кассир'), '', '', '(журнал преподавателя)', [['Журнал', on ? 'ВЫКЛ' : 'ВКЛ', on ? 'ВКЛ' : 'ВЫКЛ']]);
  return { success: true, journalOn: !!on, message: 'Журнал преподавателя ' + t.short + (on ? ' включён.' : ' отключён — преподаватель не сможет войти, пока журнал выключен.') };
}


/** Записать пароль преподавателя и дату изменения в лист ПРЕПОДАВАТЕЛИ */
function writeTeacherPassword_(teacherShort, newPassword) {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_TEACHERS);
  if (!sh) return 'Лист ПРЕПОДАВАТЕЛИ не найден.';
  const dcol = TEACHERS_HEADERS.length;   // «Пароль изменён»
  if (!String(sh.getRange(1, dcol).getValue() || '').trim()) sh.getRange(1, dcol).setValue(TEACHERS_HEADERS[dcol - 1]);
  const last = sh.getLastRow();
  let done = false;
  if (last >= 2) {
    sh.getRange(2, 2, last - 1, 1).getDisplayValues().forEach(function(r, i) {
      if (nameKey_(r[0]) === nameKey_(teacherShort)) { sh.getRange(i + 2, 4).setNumberFormat('@').setValue(newPassword); sh.getRange(i + 2, dcol).setValue(new Date()).setNumberFormat('dd.MM.yyyy HH:mm'); done = true; }
    });
  }
  if (!done) return 'Строка преподавателя не найдена в листе ПРЕПОДАВАТЕЛИ.';
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  return '';
}

function generateCode_(cfg, len) {
  len = len || 4;
  for (let i = 0; i < 200; i++) {
    let code = ''; for (let k = 0; k < len; k++) code += String(Math.floor(Math.random() * 10));
    if (code.charAt(0) === '0') continue;
    if (!codeWeak_(code) && !codeTaken_(cfg, code, '', '')) return code;
  }
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Руководитель/администратор: управление паролем преподавателя.
 * mode: 'set' — задать newPassword; 'generate' — вернуть сгенерированный код без сохранения; 'reset' — сгенерировать и сохранить.
 */
function manageTeacherPassword(role, password, teacherShort, mode, newPassword) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const t = findTeacherCfg_(cfg, teacherShort);
  if (!t) return { success: false, error: 'Преподаватель не найден.' };
  const who = actual === 'director' ? 'руководитель' : 'кассир';
  if (mode === 'generate') return { success: true, code: generateCode_(cfg, 4) };
  let code = mode === 'reset' ? generateCode_(cfg, 4) : String(newPassword || '').trim();
  { const __e = codeRules_('teacher', code); if (__e) return { success: false, error: __e }; }
  if (codeTaken_(cfg, code, 'teacher', t.short)) return { success: false, error: 'Такой код уже используется другим пользователем.' };
  const err = writeTeacherPassword_(t.short, codeHash_(code));
  if (err) return { success: false, error: err };
  logChanges_(t.short + ' ← ' + who, '', '', '(пароль преподавателя)', [['Пароль', '••••', mode === 'reset' ? 'сброшен и сгенерирован' : 'задан вручную']]);
  return { success: true, code: code, pwdChanged: Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm'), message: (mode === 'reset' ? 'Пароль сброшен. Новый пароль: ' : 'Новый пароль сохранён: ') + code + ' — он действует сразу.' };
}

/** Преподаватель меняет свой код доступа: 2–10 цифр, вводится дважды (проверка совпадения — на клиенте и здесь) */
function changeTeacherPassword(teacherName, oldPassword, newPassword, newPassword2) {
  const auth = checkTeacher_(teacherName, oldPassword);
  if (!auth.success) return { success: false, error: 'Текущий код доступа неверный.' };
  newPassword = String(newPassword || '').trim();
  if (newPassword !== String(newPassword2 || '').trim()) return { success: false, error: 'Новый код введён по-разному — повторите ввод.' };
  { const __e = codeRules_('teacher', newPassword); if (__e) return { success: false, error: __e }; }
  if (newPassword === String(oldPassword || '').trim()) return { success: false, error: 'Новый код совпадает с текущим.' };
  const cfg = getConfig_();
  // тот же код у другого преподавателя — путаница при входе; запрещаем
  if (codeTaken_(cfg, newPassword, 'teacher', auth.teacher.name)) return { success: false, error: 'Такой код уже используется другим пользователем. Выберите другой.' };
  const err = writeTeacherPassword_(auth.teacher.name, codeHash_(newPassword));
  if (err) return { success: false, error: err };
  logChanges_(auth.teacher.name, '', '', '(код доступа)', [['Код доступа', '••••', 'изменён преподавателем']]);
  return { success: true, message: 'Код доступа изменён. Используйте новый код при следующем входе.' };
}


// ============================================================
// СООБЩЕНИЕ УЧЕНИКУ ИЗ КАБИНЕТА (кнопка WhatsApp): уведомления 1–4 и свой текст, с предпросмотром
// ============================================================

/** Собрать текст сообщения для ученика: kind = '1'|'2'|'3'|'4'|'custom' */
function studentMessage_(role, password, month, teacherName, groupName, paymentRow, kind, customText) {
  const cfg = getConfig_();
  kind = String(kind || '');
  const isTpl = /^[1-3]$/.test(kind);
  if (!isTpl && kind !== 'custom') return { error: { success: false, error: 'Неизвестный тип сообщения.' } };
  let ctx, name, phone, text, tuition = 0, balance = 0;
  if (cfg.useDb) {
    const c = staffCtxDb_(password, month, teacherName, groupName, role);
    if (c.error) return { error: c.error };
    const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
    if (!r) return { error: { success: false, error: 'В этой строке нет ученика.' } };
    const st = dbStudents_().byId[String(r[RO.sid])] || [];
    name = String(r[RO.name] || st[ST.name] || ''); phone = String(st[ST.wa] || '');
    tuition = Math.round(parseNum_(r[RO.tuition])); balance = tuition - Math.round(parseNum_(r[RO.paid]));
    ctx = c;
    if (isTpl) {
      const tpl = noticeTemplate_(cfg, readMessages_(), Number(kind));
      if (!tpl) return { error: { success: false, error: 'В листе СООБЩЕНИЯ нет текста ОПЛАТА_' + kind + '. Запустите addMissingMessages.' } };
      text = fillTemplate_(tpl, noticeDataDb_(cfg, c, { r: r, name: name, phone: phone, balance: balance, tuition: tuition }, Number(kind) <= 3 ? Number(kind) : 1));
    }
  } else {
    const c = staffCtx_(role, password, month, teacherName, groupName);
    if (c.error) return { error: c.error };
    paymentRow = Number(paymentRow);
    if (!isValidPaymentRow_(paymentRow)) return { error: { success: false, error: 'Неверная строка.' } };
    const i = paymentRow - PAY_FIRST_ROW;
    const vals = c.sheet.getRange('A1:V51').getValues(), disp = c.sheet.getRange('A1:V51').getDisplayValues();
    name = String(disp[13 + i][1] || '').trim(); phone = String(disp[13 + i][16] || '').trim();
    tuition = Math.round(parseNum_(vals[PAY_FIRST_ROW - 1 + i][3])); balance = balanceOf_(vals[PAY_FIRST_ROW - 1 + i][3], vals[PAY_FIRST_ROW - 1 + i][17]);
    ctx = c;
    if (isTpl) {
      const tpl = noticeTemplate_(cfg, readMessages_(), Number(kind));
      if (!tpl) return { error: { success: false, error: 'В листе СООБЩЕНИЯ нет текста ОПЛАТА_' + kind + '. Запустите addMissingMessages.' } };
      text = fillTemplate_(tpl, paymentNoticeData_(cfg, c.sheet, c.month, c.teacher.full || c.teacher.short, i, vals, disp, NOTICE_LESSON[Number(kind)] || 1));
    }
  }
  if (!name) return { error: { success: false, error: 'В этой строке нет ученика.' } };
  if (!phone) return { error: { success: false, error: 'У ученика не указан WhatsApp родителя.' } };
  if (!isTpl) {
    text = String(customText || '').trim();
    if (!text) return { error: { success: false, error: 'Введите текст сообщения.' } };
    if (text.length > 1500) return { error: { success: false, error: 'Слишком длинное сообщение (максимум 1500 символов).' } };
  }
  return { cfg: cfg, ctx: ctx, name: name, phone: phone, text: text, kind: kind, tuition: tuition, balance: balance, paymentRow: Number(paymentRow) };
}

function previewStudentMessage(role, password, month, teacherName, groupName, paymentRow, kind, customText) {
  const b = studentMessage_(role, password, month, teacherName, groupName, paymentRow, kind, customText);
  if (b.error) return b.error;
  return { success: true, student: b.name, phone: b.phone, text: b.text, kind: b.kind, paid: b.balance <= 0 && b.tuition > 0 };
}

function sendStudentMessage(role, password, month, teacherName, groupName, paymentRow, kind, customText) {
  const b = studentMessage_(role, password, month, teacherName, groupName, paymentRow, kind, customText);
  if (b.error) return b.error;
  const r = sendWhatsapp_(b.phone, b.text);
  const who = b.ctx.role === 'director' ? 'руководитель' : 'кассир';
  const type = b.kind === 'custom' ? 'ручное · ' + who : 'оплата-' + b.kind + ' · вручную · ' + who;
  logNotification_([new Date(), b.ctx.teacher.short, b.ctx.groupName, b.name, b.phone, type, NOTICE_LESSON[Number(b.kind)] || '', r.ok ? 'отправлено' : 'ошибка', r.ok ? b.text.substr(0, 300) : r.error]);
  if (!r.ok) return { success: false, error: r.error };
  if (/^[1-3]$/.test(b.kind)) {
    const stamp = '✓ ' + Utilities.formatDate(new Date(), TZ, 'dd.MM HH:mm') + ' (вручную)';
    try {
      if (b.cfg.useDb) { const ro = dbRosterOfGroup_(b.ctx.gid), rr = rosterByPayRow_(ro, b.paymentRow); if (rr) { const upd = {}; upd[{ 1: RO.n1, 2: RO.n2, 3: RO.n3 }[Number(b.kind)]] = stamp; upd[RO.updated] = nowStamp_(); dbSetCells_(ro.sh, rr.rowIndex, upd); } }
      else b.ctx.sheet.getRange(b.paymentRow, NOTICE_STATUS_COL[Number(b.kind)]).setValue(stamp);
    } catch (e) {}
  }
  return { success: true, message: 'Сообщение отправлено родителю ' + b.name + ' (' + b.phone + ').' };
}


// ============================================================
// СООБЩЕНИЕ РОДИТЕЛЮ О СКИДКЕ (после оформления / снятия) — предпросмотр и отправка
// ============================================================

/** Данные ученика по записи реестра скидок: телефон, цена группы, стоимость со скидкой */
function discountStudentData_(cfg, e) {
  const out = { phone: e.phone || '', price: 0, tuition: 0, month: cfg.currentMonth, group: e.group, found: false };
  try {
    if (cfg.useDb) {
      const g = dbGroup_(cfg.currentMonth, e.teacher, e.group);
      if (g) {
        out.price = Math.round(parseNum_(g.row[GR.price]));
        const ro = dbRosterOfGroup_(String(g.row[GR.id]));
        const r = ro.rows.filter(function(x) { return studentKey_(x[RO.name]) === studentKey_(e.student); })[0];
        if (r) { out.tuition = Math.round(parseNum_(r[RO.tuition])); const st = dbStudents_().byId[String(r[RO.sid])] || []; out.phone = String(st[ST.wa] || out.phone); out.found = true; }
      }
    } else {
      const j = findJournal_(cfg, cfg.currentMonth, e.teacher);
      if (j) {
        const sh = SpreadsheetApp.openById(j.paymentsId).getSheetByName(e.group);
        if (sh) {
          out.price = Math.round(parseNum_(sh.getRange(GROUP_PRICE_CELL).getValue()));
          const names = sh.getRange(PAY_FIRST_ROW, COL_NAME, PAY_ROWS, 1).getDisplayValues();
          for (let i = 0; i < PAY_ROWS; i++) if (studentKey_(names[i][0]) === studentKey_(e.student)) {
            out.tuition = Math.round(parseNum_(sh.getRange(PAY_FIRST_ROW + i, COL_TUITION).getValue()));
            out.phone = String(sh.getRange(14 + i, 17).getDisplayValue() || out.phone).trim(); out.found = true; break;
          }
        }
      }
    }
  } catch (err) {}
  if (!out.tuition && out.price) out.tuition = Math.round(out.price * (1 - parseNum_(e.percent) / 100));
  return out;
}

function discountMessage_(role, password, discountId, kind) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { error: { success: false, error: 'Неверный пароль.' } };
  const e = readDiscounts_().filter(function(x) { return x.id === String(discountId); })[0];
  if (!e) return { error: { success: false, error: 'Запись о скидке не найдена.' } };
  const d = discountStudentData_(cfg, e);
  if (!d.phone) return { error: { success: false, error: 'У ученика ' + e.student + ' не указан WhatsApp родителя.' } };
  const msgs = readMessages_();
  const key = kind === 'removed' ? 'СКИДКА_СНЯТА' : 'СКИДКА_ПРЕДОСТАВЛЕНА';
  const m = msgs[key];
  if (!m) return { error: { success: false, error: 'В листе СООБЩЕНИЯ нет текста ' + key + '.' } };
  const lang = (m.lang === 'RU' || m.lang === 'KG') ? m.lang : cfg.msgLang;
  const tpl = String(lang === 'RU' ? (m.ru || m.kg) : (m.kg || m.ru)).replace(/\\n/g, '\n');
  const mm = monthFromName_(d.month);
  const monthRu = mm ? MONTHS_RU_NOM[mm.m - 1] + ' ' + mm.y : d.month, monthKg = mm ? MONTHS_KG[mm.m - 1] : d.month;
  const basis = e.type === DISCOUNT_TYPES.family ? 'бир үй-бүлөдөн экинчи бала' : e.type === DISCOUNT_TYPES.teacher ? 'мугалимдин баласы' : e.type;
  // срок действия: бессрочно — стандартная фраза; с датой — до какого месяца и что дальше
  let term;
  if (e.until) {
    const um = monthFromName_(e.until);
    const uRu = um ? MONTHS_RU_NOM[um.m - 1] + ' ' + um.y : e.until, uKg = um ? MONTHS_KG[um.m - 1] + ' ' + um.y : e.until;
    const famRu = e.famKey ? ' с учётом семейной скидки по числу обучающихся детей семьи' : '';
    const famKg = e.famKey ? ' үй-бүлөдөгү окуган балдардын санына жараша үй-бүлөлүк жеңилдик эске алынат' : '';
    term = lang === 'RU'
      ? 'Скидка действует до ' + uRu + ' включительно и учитывается автоматически каждый месяц. С ' + (um ? MONTHS_RU_NOM[um.m % 12] + ' ' + (um.m === 12 ? um.y + 1 : um.y) : 'следующего месяца') + ' оплата рассчитывается на общих условиях' + famRu + '.'
      : 'Жеңилдик ' + uKg + ' айына чейин (кошо алганда) жарактуу жана ай сайын автоматтык түрдө эсепке алынат. Андан кийин окуу акысы жалпы шарттар боюнча эсептелет' + (famKg ? ',' + famKg : '') + '.';
  } else term = lang === 'RU' ? 'Скидка действует на весь период обучения и учитывается автоматически каждый месяц.' : 'Жеңилдик окуунун бүт мезгилине жайылтылат жана ай сайын автоматтык түрдө эсепке алынат.';
  const text = fillTemplate_(tpl, { 'ученик': e.student, 'скидка': String(e.percent), 'цена': String(d.price), 'стоимость': String(kind === 'removed' ? d.price : d.tuition), 'ай': monthKg, 'Ай': monthKg.charAt(0).toUpperCase() + monthKg.slice(1), 'месяц': monthRu, 'реквизиты': cfg.requisites, 'группа': e.group, 'срок': term, 'основание': e.note || basis });
  return { cfg: cfg, actual: actual, e: e, phone: d.phone, text: text, kind: kind };
}

function previewDiscountMessage(role, password, discountId, kind) {
  const b = discountMessage_(role, password, discountId, kind);
  if (b.error) return b.error;
  return { success: true, student: b.e.student, phone: b.phone, text: b.text };
}

function sendDiscountMessage(role, password, discountId, kind) {
  const b = discountMessage_(role, password, discountId, kind);
  if (b.error) return b.error;
  const r = sendWhatsapp_(b.phone, b.text);
  logNotification_([new Date(), b.e.teacher, b.e.group, b.e.student, b.phone, (b.kind === 'removed' ? 'скидка снята' : 'скидка ' + b.e.percent + '%') + ' · ' + (b.actual === 'director' ? 'руководитель' : 'кассир'), '', r.ok ? 'отправлено' : 'ошибка', r.ok ? b.text.substr(0, 300) : r.error]);
  if (!r.ok) return { success: false, error: r.error };
  return { success: true, message: 'Сообщение о скидке отправлено родителю ' + b.e.student + ' (' + b.phone + ').' };
}


// ============================================================
// МЕСЯЦЫ ПРЕПОДАВАТЕЛЯ И ПЕРЕНОС ГРУППЫ В СЛЕДУЮЩИЙ МЕСЯЦ
// ============================================================

/** «Сентябрь 2026» + 1 → «Октябрь 2026» */
function nextMonthName_(name) {
  const mm = monthFromName_(name);
  if (!mm) return '';
  let m = mm.m + 1, y = mm.y;
  if (m > 12) { m = 1; y++; }
  const n = MONTHS_RU_NOM[m - 1];
  return n.charAt(0).toUpperCase() + n.slice(1) + ' ' + y;
}
function monthSortKey_(name) { const mm = monthFromName_(name); return mm ? mm.y * 100 + mm.m : 0; }
/** Месяцы от текущего до ПЛАН_МЕСЯЦЕВ_ДО включительно (режим БАЗА) */
function plannedMonths_(cfg) {
  const out = [];
  let m = cfg.currentMonth, guard = 0;
  const untilKey = monthSortKey_(cfg.planUntil);
  while (m && guard++ < 36) { out.push(m); if (!untilKey || monthSortKey_(m) >= untilKey) break; m = nextMonthName_(m); }
  return out;
}

/**
 * Месяцы, доступные преподавателю: текущий + те, где у него есть журнал/группы, + следующие (для переноса).
 * exists — можно открыть; current — месяц по умолчанию.
 */
function getTeacherMonths(teacherName, password) {
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;
  const cfg = getConfig_();
  const set = {};
  const add = function(m, exists) { if (!m) return; const k = nameKey_(m); if (!set[k]) set[k] = { name: m, exists: false }; if (exists) set[k].exists = true; };
  add(cfg.currentMonth, true);
  if (cfg.useDb) {
    dbTable_(DB_GROUPS, DB_GROUPS_H).rows.forEach(function(r) { if (nameKey_(r[GR.teacher]) === nameKey_(auth.teacher.name) && String(r[GR.status]) !== 'скрыта') add(String(r[GR.month]), true); });
  } else {
    cfg.journals.forEach(function(j) { if (nameKey_(j.teacher) === nameKey_(auth.teacher.name) && j.attendanceId) add(j.month, true); });
  }
  // будущие месяцы: в базе — все запланированные (открыты), в журналах — следующие 3 как кандидаты
  if (cfg.useDb) plannedMonths_(cfg).forEach(function(mn) { add(mn, true); });
  else { let m = cfg.currentMonth; for (let i = 0; i < 3; i++) { m = nextMonthName_(m); if (m) add(m, false); } }
  const list = Object.keys(set).map(function(k) { return set[k]; }).sort(function(a, b) { return monthSortKey_(a.name) - monthSortKey_(b.name); });
  return { success: true, current: cfg.currentMonth, months: list, transferDays: cfg.transferDays };
}

/**
 * Доступен ли перенос группы: за transferDays дней до 12-го занятия (или после него).
 * Возвращает {ok, reason, toMonth, targetExists}
 */
function transferState_(cfg, datesIso, fromMonth, teacherShort, groupName) {
  const last = String(datesIso[11] || '');
  const toMonth = nextMonthName_(fromMonth);
  const todayIso = isoToday_();
  const held = datesIso.filter(function(x) { return x && x <= todayIso; }).length;
  const out = { ok: false, reason: '', toMonth: toMonth, targetExists: false, lastDate: last ? last.split('-').reverse().join('.') : '', held: held, fromLesson: cfg.transferFromLesson || 4, autoAfter: cfg.autoTransferAfter || 0, done: false, doneCount: 0 };
  if (!toMonth) { out.reason = 'Не удалось определить следующий месяц.'; return out; }
  if (cfg.useDb) {
    out.targetExists = true;   // в базе журнал создаётся сам
    // уже перенесена? (в следующем месяце есть эта группа с учениками)
    if (groupName) {
      try {
        const ex = dbGroup_(toMonth, teacherShort, groupName);
        if (ex) { const n = dbRosterOfGroup_(String(ex.row[GR.id])).rows.length; if (n) { out.done = true; out.doneCount = n; } }
      } catch (e) {}
    }
    if (out.done) { out.reason = 'Группа уже перенесена в ' + toMonth + '.'; return out; }
    if (held < out.fromLesson) { out.reason = 'Перенос откроется с ' + out.fromLesson + '-го занятия (проведено ' + held + ').'; return out; }
    out.ok = true;
    return out;
  }
  const j = findJournal_(cfg, toMonth, teacherShort); out.targetExists = !!(j && j.attendanceId);
  if (!last) { out.reason = 'Назначьте дату 12-го занятия — кнопка переноса появится за ' + cfg.transferDays + ' дн. до него.'; return out; }
  const d = daysBetweenIso_(isoToday_(), last);   // дней до 12-го занятия
  if (d > cfg.transferDays) { out.reason = 'Перенос откроется ' + (function() { const p = last.split('-'); const dt = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]) - cfg.transferDays); return Utilities.formatDate(dt, TZ, 'dd.MM.yyyy'); })() + ' — за ' + cfg.transferDays + ' дн. до 12-го занятия (' + out.lastDate + ').'; return out; }
  if (!out.targetExists) { out.reason = 'Журналы за ' + toMonth + ' ещё не созданы — обратитесь к руководителю.'; return out; }
  out.ok = true;
  return out;
}


/** Перенос группы в следующий месяц (режим БАЗА): общая часть для кнопки преподавателя и автопереноса */
function transferGroupDb_(cfg, teacherShort, group, groupName, month, who, discounts) {
  const toMonth = nextMonthName_(month);
  if (!toMonth) return { success: false, error: 'Не удалось определить следующий месяц.' };
  discounts = discounts || readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE; });
  const grow = group.row, gidFrom = String(grow[GR.id]);
  const ts = transferState_(cfg, groupDates_(grow), month, teacherShort, groupName);
  if (!ts.ok) return { success: false, error: ts.reason };
  const ro = dbRosterOfGroup_(gidFrom);
  if (!ro.rows.length) return { success: false, error: 'В группе нет учеников — переносить нечего.' };
  const existing = dbGroup_(toMonth, teacherShort, groupName);
  if (existing && dbRosterOfGroup_(String(existing.row[GR.id])).rows.length) return { success: false, error: 'Группа за ' + toMonth + ' уже перенесена (в ней есть ученики).' };
  const S = dbStudents_(), prices = readPrices_();
  const price = (function() { const p = priceFor_(prices, grow[GR.level]); return p !== null ? p : Math.round(parseNum_(grow[GR.price])); })();   // в новый месяц — всегда цена по прайсу
  let gid;
  const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
  if (existing) { gid = String(existing.row[GR.id]); dbSetCells_(existing.sh, existing.rowIndex, { 4: grow[GR.title], 5: grow[GR.level], 6: grow[GR.days], 7: grow[GR.time], 8: price, 22: 'активна', 23: nowStamp_() }); }
  else {
    gid = nextId_('Г-', G.rows, 0);
    const key = nameKey_(toMonth) + '|' + nameKey_(teacherShort) + '|' + grow[GR.num];
    dbAppendRow_(G.sh, [gid, toMonth, teacherShort, grow[GR.num], grow[GR.title], grow[GR.level], grow[GR.days], grow[GR.time], price, grow[GR.coef]].concat(new Array(12).fill('')).concat(['активна', nowStamp_(), 'перенос из ' + month, key]));
  }
  const stamp = nowStamp_(), R = dbTable_(DB_ROSTER, DB_ROSTER_H), A = dbTable_(DB_ATT, DB_ATT_H);
  const newR = [], newA = [];
  ro.rows.forEach(function(r) {
    const st = S.byId[String(r[RO.sid])] || [];
    const e = findDiscountFor_(discounts, String(r[RO.name]), String(st[ST.wa] || ''));
    const pct = e ? e.percent : parseNum_(r[RO.disc]);
    const k = gid + '|' + r[RO.sid];
    newR.push([gid, r[RO.sid], r[RO.num], r[RO.name], pct, 12, tuitionCalc_(price, pct, 12), 0, '', '', '', '', '', r[RO.note], stamp, '', '', '', '', k]);
    newA.push([gid, r[RO.sid], r[RO.name]].concat(new Array(12).fill('')).concat([stamp, k]));
  });
  if (newR.length) R.sh.getRange(R.sh.getLastRow() + 1, 1, newR.length, DB_ROSTER_H.length).setValues(newR);
  if (newA.length) A.sh.getRange(A.sh.getLastRow() + 1, 1, newA.length, DB_ATT_H.length).setValues(newA); dbInvalidate_();
  // кабинет переходит вместе с группой
  try { const rm = getRoom_(month, teacherShort, groupName); if (rm && !getRoom_(toMonth, teacherShort, groupName)) setRoom_(toMonth, teacherShort, groupName, rm); } catch (e) {}
  logChanges_(teacherShort + (who === 'преподаватель' ? '' : ' ← ' + who), groupName, '', '(перенос группы)', [['Перенос', month, toMonth + ' · ' + newR.length + ' уч.' + (who === 'преподаватель' ? '' : ' · ' + who)]]);
  return { success: true, toMonth: toMonth, count: newR.length, message: 'Группа перенесена в ' + toMonth + ': ' + newR.length + ' учеников. Назначьте даты занятий.' };
}

/** Автоперенос (режим БАЗА): группы, у которых проведено ≥ АВТОПЕРЕНОС_ПОСЛЕ_ЗАНЯТИЯ занятий и ещё нет копии в следующем месяце. Раз в сутки. */
function autoTransferGroups_() {
  const cfg = getConfig_();
  if (!cfg.useDb || !cfg.autoTransferAfter) return 0;
  const props = PropertiesService.getScriptProperties(), today = isoToday_();
  if (props.getProperty('AUTO_TRANSFER_DAY') === today) return 0;
  props.setProperty('AUTO_TRANSFER_DAY', today);
  const month = cfg.currentMonth, toMonth = nextMonthName_(month);
  if (!toMonth) return 0;
  const discounts = readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE; });
  let n = 0;
  dbGroupsOfMonth_(month).forEach(function(g) {
    try {
      const grow = g.row;
      if (String(grow[GR.status]) === 'скрыта') return;
      const held = groupDates_(grow).filter(function(x) { return x && x <= today; }).length;
      if (held < cfg.autoTransferAfter) return;
      const teacherShort = String(grow[GR.teacher] || ''), groupName = 'Группа ' + grow[GR.num];
      const ex = dbGroup_(toMonth, teacherShort, groupName);
      if (ex && dbRosterOfGroup_(String(ex.row[GR.id])).rows.length) return;   // уже перенесена
      if (!dbRosterOfGroup_(String(grow[GR.id])).rows.length) return;          // пустая группа
      const res = transferGroupDb_(cfg, teacherShort, { row: grow, rowIndex: g.rowIndex, sh: dbTable_(DB_GROUPS, DB_GROUPS_H).sh }, groupName, month, 'автоперенос после ' + held + '-го занятия', discounts);
      if (res.success) { n++; teacherNote_(teacherShort, month, groupName, 'Группа ' + groupName.replace(/\D/g, '') + ' перенесена в ' + toMonth + ' автоматически после ' + held + '-го занятия: ' + res.count + ' уч. Назначьте даты занятий в ' + toMonth + '.'); }
    } catch (e) { Logger.log('autoTransfer: ' + e.message); }
  });
  return n;
}

/** Уведомление преподавателю в колокольчик (лист ЗАЯВКИ, тип «перенос», уже решённое) */
function teacherNote_(teacherShort, month, groupName, text) {
  try {
    const sh = requestsSheet_(true);
    const id = Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + String(Math.floor(Math.random() * 90 + 10));
    sh.appendRow([id, 'перенос', teacherShort, month, groupName, '', '', text, '', RQ_OK, new Date(), 'система', new Date(), '', '']);
  } catch (e) {}
}

/** Новый ученик записан после переноса группы — добавить его и в следующий месяц. Возвращает название месяца или '' */
function mirrorStudentToNextMonth_(cfg, teacherShort, groupName, month, sid, name, note) {
  try {
    const toMonth = nextMonthName_(month);
    if (!toMonth) return '';
    const ex = dbGroup_(toMonth, teacherShort, groupName);
    if (!ex) return '';
    const gid = String(ex.row[GR.id]);
    const ro2 = dbRosterOfGroup_(gid);
    if (!ro2.rows.length) return '';                                             // группа в следующем месяце ещё не перенесена
    if (ro2.rows.some(function(r) { return String(r[RO.sid]) === String(sid); })) return '';
    const used = {}; ro2.rows.forEach(function(r) { used[Number(r[RO.num])] = true; });
    let num = 1; while (used[num] && num < 16) num++;
    if (used[num]) return '';
    const st = dbStudents_().byId[String(sid)] || [];
    const e = findDiscountFor_(readDiscounts_().filter(function(x) { return x.status === DS_ACTIVE; }), name, String(st[ST.wa] || ''));
    const pct = e ? e.percent : 0, price = Math.round(parseNum_(ex.row[GR.price])), stamp = nowStamp_(), key = gid + '|' + sid;
    dbAppendRow_(ro2.sh, [gid, sid, num, name, pct, 12, tuitionCalc_(price, pct, 12), 0, '', '', '', '', '', note || '', stamp, key]);
    dbAppendRow_(dbTable_(DB_ATT, DB_ATT_H).sh, [gid, sid, name].concat(new Array(12).fill('')).concat([stamp, key]));
    logChanges_(teacherShort, groupName, num, name, [['Добавлен ученик', '', name + ' · ' + toMonth + ' (вслед за переносом группы)']]);
    return toMonth;
  } catch (e) { return ''; }
}

/**
 * Перенести группу в следующий месяц: ученики с телефонами и комментариями, уровень/дни/время, скидки.
 * Оплаты, отметки и даты занятий — с нуля. Повторный перенос той же группы не выполняется.
 */
function transferGroupToNextMonth(teacherName, password, groupName, month) {
  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;
  const toMonth = nextMonthName_(month);
  if (!toMonth) return { success: false, error: 'Не удалось определить следующий месяц.' };
  const discounts = readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE; });

  if (cfg.useDb) {
    const ctx = teacherCtxDb_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    return transferGroupDb_(cfg, ctx.auth.teacher.name, ctx.group, groupName, month, 'преподаватель', discounts);
  }

  // ---- журналы Google Таблиц ----
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return ctx.error;
  if (!ctx.editable) return { success: false, error: 'Журнал посещений не назначен.' };
  const src = ctx.sheet;
  const disp = src.getRange('A1:U29').getDisplayValues(), vals = src.getRange('A1:U29').getValues();
  const tz = sheetTz_(src);
  const datesIso = []; for (let k = 0; k < 12; k++) { const v = vals[ATT_DATES_ROW - 1][ATT_FIRST_COL - 1 + k]; datesIso.push(v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : ''); }
  const ts = transferState_(cfg, datesIso, month, ctx.auth.teacher.name, groupName);
  if (!ts.ok) return { success: false, error: ts.reason };
  const jTo = findJournal_(cfg, toMonth, ctx.auth.teacher.name);
  let nss, dst;
  try { nss = SpreadsheetApp.openById(jTo.attendanceId); dst = nss.getSheetByName(groupName); } catch (e) { return { success: false, error: 'Не удалось открыть журнал за ' + toMonth + ': ' + e.message }; }
  if (!dst) return { success: false, error: 'В журнале за ' + toMonth + ' нет листа «' + groupName + '».' };
  const dd = dst.getRange('A1:U29').getDisplayValues();
  for (let i = 0; i < 16; i++) if (String(dd[13 + i][1] || '').trim()) return { success: false, error: 'Группа за ' + toMonth + ' уже заполнена — повторный перенос не выполняется.' };
  const meta = groupMetaFromGrid_(disp, Number(groupName.replace(/\D/g, '')), src);
  const metaDst = groupMetaFromGrid_(dd, Number(groupName.replace(/\D/g, '')), dst);
  try {
    if (meta.level && !/не назнач/i.test(meta.level)) dst.getRange(metaDst.cells.level[0], metaDst.cells.level[1]).setValue(meta.level);
    if (meta.time && !/не назнач/i.test(meta.time)) dst.getRange(metaDst.cells.time[0], metaDst.cells.time[1]).setValue(meta.time);
    if (meta.days && !/не назнач/i.test(meta.days)) dst.getRange(metaDst.cells.days[0], metaDst.cells.days[1]).setValue(meta.days);
  } catch (e) {}
  // ученики: ФИО (B), контакты и комментарий (Q:U)
  const names = [], contacts = [];
  let count = 0;
  for (let i = 0; i < 16; i++) {
    const name = String(disp[13 + i][1] || '').trim();
    names.push([name]); contacts.push([disp[13 + i][16] || '', disp[13 + i][17] || '', disp[13 + i][18] || '', disp[13 + i][19] || '', disp[13 + i][20] || '']);
    if (name) count++;
  }
  if (!count) return { success: false, error: 'В группе нет учеников — переносить нечего.' };
  dst.getRange(T_FIRST_ROW, T_COL_NAME, 16, 1).setValues(names);
  dst.getRange(T_FIRST_ROW, 17, 16, 5).setValues(contacts);
  try { dst.getRange(T_FIRST_ROW, T_COL_SAVED, 16, 1).setValues(names.map(function(n) { return [n[0] ? new Date() : '']; })); } catch (e) {}
  try { if (isHidden_(dst)) dst.showSheet(); } catch (e) {}
  // скидки в PAYMENTS следующего месяца: из реестра, иначе как в текущем журнале
  try {
    const pss = SpreadsheetApp.openById(jTo.paymentsId), pdst = pss.getSheetByName(groupName);
    const psrc = SpreadsheetApp.openById(ctx.journal.paymentsId).getSheetByName(groupName);
    if (pdst) {
      const curDisc = psrc ? psrc.getRange(PAY_FIRST_ROW, COL_DISCOUNT, PAY_ROWS, 1).getValues() : null;
      const out = [];
      for (let i = 0; i < 16; i++) {
        const name = names[i][0]; let pct = 0;
        if (name) { const e = findDiscountFor_(discounts, name, String(contacts[i][0] || '')); pct = e ? e.percent : (curDisc ? Math.round(parseNum_(curDisc[i][0])) : 0); }
        out.push([pct || '']);
      }
      pdst.getRange(PAY_FIRST_ROW, COL_DISCOUNT, PAY_ROWS, 1).setValues(out);
      try { if (isHidden_(pdst)) pdst.showSheet(); } catch (e) {}
    }
  } catch (e) {}
  SpreadsheetApp.flush();
  logChanges_(ctx.auth.teacher.name, groupName, '', '(перенос группы)', [['Перенос', month, toMonth + ' · ' + count + ' уч.']]);
  return { success: true, toMonth: toMonth, count: count, message: 'Группа перенесена в ' + toMonth + ': ' + count + ' учеников. Назначьте даты занятий.' };
}


// ============================================================
// КВИТАНЦИИ НА НЕСКОЛЬКИХ ДЕТЕЙ И ПРЕДОПЛАТЫ
// ============================================================

const RCPT_SHEET = 'КВИТАНЦИИ';
const RCPT_H = ['Номер', 'Сумма квитанции', 'Дата', 'Первый ученик', 'Месяц', 'Создана', 'Обновлена', 'Ключ', 'Распределено', 'Остаток'];
const PREPAY_SHEET = 'ПРЕДОПЛАТЫ';
const PREPAY_H = ['ID', 'Ученик', 'Группа', 'Преподаватель', 'WhatsApp родителя', 'Квитанция', 'Дата оплаты', 'Сумма предоплаты', 'Использовано', 'Остаток', 'Статус', 'Месяц внесения', 'Можно использовать с', 'Обновлено', 'Примечание', 'Ключ'];
const PP_NEW = 'не использована', PP_PART = 'частично использована', PP_USED = 'использована';

function rcptSheet_() {
  const sh = dbSheet_(RCPT_SHEET, RCPT_H, [160, 120, 100, 220, 120, 130, 130, 160, 110, 100]);
  if (!String(sh.getRange(1, 9).getValue() || '').trim()) sh.getRange(1, 9, 1, 2).setValues([['Распределено', 'Остаток']]);
  return sh;
}
function prepaySheet_() { return dbSheet_(PREPAY_SHEET, PREPAY_H, [90, 220, 90, 150, 130, 150, 100, 110, 100, 100, 150, 120, 140, 130, 200, 200]); }

/**
 * Пересобрать лист КВИТАНЦИИ по фактам: номер и сумма квитанции сохраняются,
 * «распределено» считается заново по оплатам учеников и созданным предоплатам.
 * Нужна после порчи столбцов (см. v83). Безопасна для повторного запуска.
 */
/**
 * Сколько денег по каждой квитанции действительно израсходовано:
 * оплаты в журналах, книги, оплаты выбывших учеников и созданные предоплаты.
 * Один расчёт на всю систему — чтобы пересборка реестра и проверка системы не разошлись.
 */
function rcptFactUsage_(cfg, totals, skipPrepay) {
  const used = {};
  const addUsed = function(k, v) { if (!k || isCashMarker_(k)) return; used[k] = (used[k] || 0) + Math.round(parseNum_(v)); };
  if (cfg && cfg.useDb) {
    try {
      dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
        rcptAllocateRow_(r[RO.receipt], r[RO.paid], totals, used, r[RO.split]).forEach(function(a) { addUsed(a.rec, a.amount); });
      });
    } catch (e) {}
  }
  // книги: учебник часто оплачен той же квитанцией, что и обучение
  try {
    const bs = bkOutSheet_();
    if (bs.getLastRow() >= 2) bs.getRange(2, 1, bs.getLastRow() - 1, BKOUT_H.length).getValues().forEach(function(r) {
      const pay = Math.round(parseNum_(r[BKO.pay]));
      if (pay <= 0) return;
      rcptAllocateRow_(r[BKO.receipt], pay, totals, used).forEach(function(a) { addUsed(a.rec, a.amount); });
    });
  } catch (e) {}
  // выбывшие ученики: оплата лежит в архиве, но квитанция была использована
  try {
    const as = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ARCHIVE_SHEET);
    if (as && as.getLastRow() >= 2) as.getRange(2, 1, as.getLastRow() - 1, ARCHIVE_H.length).getValues().forEach(function(r) {
      rcptAllocateRow_(r[27], r[26], totals, used).forEach(function(a) { addUsed(a.rec, a.amount); });
    });
  } catch (e) {}
  // предоплата, сделанная из квитанции, — тоже израсходованные деньги
  try {
    if (skipPrepay) return used;
    const ps = prepaySheet_();
    if (ps.getLastRow() >= 2) ps.getRange(2, 1, ps.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r) {
      if (String(r[10] || '') === PP_VOID) return;
      addUsed(normalizeReceiptNumber_(r[5]), r[7]);
    });
  } catch (e) {}
  return used;
}

function rcptRepair_(cfg) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = ss.getSheetByName(RCPT_SHEET);
  if (!sh) return { fixed: 0, message: 'Лист КВИТАНЦИИ ещё не создан.' };
  // без базы фактические оплаты не прочитать — реестр не трогаем, чтобы не обнулить его
  if (!cfg || !cfg.useDb) return { fixed: 0, message: 'Пересборка доступна в режиме БАЗА.' };
  const lastRow = sh.getLastRow(), lastCol = Math.max(sh.getLastColumn(), RCPT_H.length);
  const vals = lastRow >= 2 ? sh.getRange(2, 1, lastRow - 1, lastCol).getValues() : [];
  // что сохраняем: номер, сумма квитанции, дата, первый ученик, месяц (левые столбцы не сдвигались)
  const keep = {}, order = [];
  vals.forEach(function(r) {
    const k = normalizeReceiptNumber_(r[0]);
    if (!k || isCashMarker_(k)) return;
    if (!keep[k]) { keep[k] = { raw: String(r[0]).trim(), total: 0, date: '', student: '', month: '' }; order.push(k); }
    const e = keep[k], total = Math.round(parseNum_(r[1]));
    if (total > e.total) e.total = total;
    if (!e.date && r[2]) e.date = r[2];
    if (!e.student && r[3]) e.student = String(r[3]);
    if (!e.month && r[4]) e.month = String(r[4]);
  });
  const totals = {};
  Object.keys(keep).forEach(function(k) { totals[k] = keep[k].total; });
  const used = rcptFactUsage_(cfg, totals);
  // квитанции, которых в реестре не было, но оплаты по ним есть
  Object.keys(used).forEach(function(k) {
    if (keep[k]) return;
    keep[k] = { raw: k, total: 0, date: '', student: '', month: '' };
    order.push(k);
  });
  const now = new Date();
  const rows = order.map(function(k) {
    const e = keep[k], u = Math.round(used[k] || 0);
    const total = Math.max(e.total, u);
    return [e.raw, total, e.date || '', e.student, e.month, now, now, k, u, Math.max(0, total - u)];
  });
  // лист переписываем целиком и убираем лишние столбцы, наросшие от сдвигов
  sh.clearContents();
  sh.getRange(1, 1, 1, RCPT_H.length).setValues([RCPT_H]);
  if (rows.length) sh.getRange(2, 1, rows.length, RCPT_H.length).setValues(rows);
  try { if (sh.getMaxColumns() > RCPT_H.length) sh.deleteColumns(RCPT_H.length + 1, sh.getMaxColumns() - RCPT_H.length); } catch (e) {}
  try { PropertiesService.getScriptProperties().setProperty('RCPT_SEEDED', '1'); } catch (e) {}
  const left = rows.filter(function(r) { return r[9] > 0; });
  return { fixed: rows.length, remainders: left.length,
    message: 'Реестр квитанций пересобран: ' + rows.length + ' квитанций, с остатком — ' + left.length + '.' };
}

/**
 * Расшифровка квитанции: все зачтённые по ней суммы с указанием, кому и за что.
 * Нужна, чтобы проверить остаток, а не верить цифре на слово.
 */
function receiptBreakdown(role, password, receipt) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || (actual !== 'admin' && actual !== 'director')) return { success: false, error: 'Недоступно.' };
  const normalized = normalizeReceiptNumber_(receipt);
  if (!normalized) return { success: false, error: 'Укажите номер квитанции.' };
  seedReceiptRegistry_(cfg);
  const reg = receiptRegistry_()[normalized] || null;
  const rows = [];
  if (cfg.useDb) {
    const G = dbTable_(DB_GROUPS, DB_GROUPS_H), gm = {};
    G.rows.forEach(function(g) { gm[String(g[GR.id])] = g; });
    const totalsB = rcptTotalsMap_(), accB = {};
    dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
      const alloc = rcptAllocateRow_(r[RO.receipt], r[RO.paid], totalsB, accB, r[RO.split]);
      let mine = 0;
      alloc.forEach(function(a) { accB[a.rec] = (accB[a.rec] || 0) + a.amount; if (a.rec === normalized) mine = a.amount; });
      if (mine <= 0) return;
      const g = gm[String(r[RO.gid])] || [], dt = String(r[RO.date] || '');
      const info = rcptParseReceiptCell_(r[RO.receipt]);
      rows.push({ kind: 'обучение', who: String(r[RO.name]), where: 'Группа ' + (g[GR.num] || '?') + ' · ' + String(g[GR.teacher] || ''),
        month: String(g[GR.month] || ''), amount: mine, date: /^\d{4}-\d{2}-\d{2}$/.test(dt) ? dt.split('-').reverse().join('.') : dt,
        note: (info.recs.length > 1 ? 'в строке ещё квитанция' : '') + (info.prepaid ? (info.recs.length > 1 ? ' · ' : '') + 'плюс ' + info.prepaid + ' сом предоплатой' : '') });
    });
  }
  try {
    const bs = bkOutSheet_();
    if (bs.getLastRow() >= 2) bs.getRange(2, 1, bs.getLastRow() - 1, BKOUT_H.length).getValues().forEach(function(r) {
      const info = rcptParseReceiptCell_(r[BKO.receipt]);
      if (info.recs.indexOf(normalized) === -1) return;
      const pay = Math.round(parseNum_(r[BKO.pay]));
      if (pay <= 0) return;
      const part = info.recs.length > 1 ? Math.round(pay / info.recs.length) : pay;
      rows.push({ kind: 'книга', who: String(r[BKO.student] || ''), where: String(r[BKO.book] || ''), month: '', amount: part,
        date: r[BKO.date] instanceof Date ? Utilities.formatDate(r[BKO.date], TZ, 'dd.MM.yyyy') : String(r[BKO.date] || ''), note: '' });
    });
  } catch (e) {}
  try {
    const as = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ARCHIVE_SHEET);
    if (as && as.getLastRow() >= 2) as.getRange(2, 1, as.getLastRow() - 1, ARCHIVE_H.length).getValues().forEach(function(r) {
      const info = rcptParseReceiptCell_(r[27]);
      if (info.recs.indexOf(normalized) === -1) return;
      const paid = Math.max(0, Math.round(parseNum_(r[26])) - info.prepaid);
      if (paid <= 0) return;
      const part = info.recs.length > 1 ? Math.round(paid / info.recs.length) : paid;
      rows.push({ kind: 'выбывший ученик', who: String(r[6] || ''), where: String(r[4] || '') + ' · ' + String(r[3] || ''), month: String(r[2] || ''), amount: part, date: '', note: '' });
    });
  } catch (e) {}
  try {
    const ps = prepaySheet_();
    if (ps.getLastRow() >= 2) ps.getRange(2, 1, ps.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r) {
      if (normalizeReceiptNumber_(r[5]) !== normalized) return;
      if (String(r[10] || '') === PP_VOID) return;
      rows.push({ kind: 'предоплата', who: String(r[1] || ''), where: String(r[2] || ''), month: String(r[11] || ''),
        amount: Math.round(parseNum_(r[7])), date: String(r[6] || ''), note: 'остаток предоплаты ' + Math.round(parseNum_(r[9])) + ' сом' });
    });
  } catch (e) {}
  const used = rows.reduce(function(a, x) { return a + x.amount; }, 0);
  const total = reg ? reg.total : 0;
  return { success: true, receipt: String(receipt), total: total, used: used, remaining: Math.max(0, total - used), rows: rows,
    registryDistributed: reg ? reg.distributed : 0 };
}

/** Исправить сумму квитанции (опечатка при вводе). Меньше уже зачтённого поставить нельзя. */
function setReceiptTotal(role, password, receipt, total) {
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || (actual !== 'admin' && actual !== 'director')) return { success: false, error: 'Недоступно.' };
  const normalized = normalizeReceiptNumber_(receipt);
  seedReceiptRegistry_(cfg);
  const sh = rcptSheet_(), reg = receiptRegistry_()[normalized];
  if (!reg) return { success: false, error: 'Квитанция не найдена в реестре.' };
  const t = Math.round(parseNum_(total));
  if (!(t >= 0)) return { success: false, error: 'Укажите сумму квитанции.' };
  if (t < reg.distributed) return { success: false, error: 'Сумма квитанции не может быть меньше уже зачтённых ' + reg.distributed + ' сом.' };
  const was = reg.total;
  sh.getRange(reg.rowIndex, 2).setValue(t);
  reg.total = t;
  rcptSetDistributed_(sh, reg, reg.distributed);
  try { logChanges_(roleTitle_(actual), '', '', '(реестр квитанций)', [['Квитанция ' + receipt, 'сумма ' + was + ' сом', 'сумма ' + t + ' сом']]); } catch (e) {}
  return { success: true, message: 'Сумма квитанции ' + receipt + ' — ' + t + ' сом. Зачтено ' + reg.distributed + ', остаток ' + (t - reg.distributed) + ' сом.' };
}

/** Убрать из реестра квитанцию, по которой ничего не зачтено (номер заменили или оплату удалили). Только руководитель. */
function dropReceiptFromRegistry(role, password, receipt) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director') return { success: false, error: 'Только руководитель.' };
  const normalized = normalizeReceiptNumber_(receipt);
  if (!normalized) return { success: false, error: 'Укажите номер квитанции.' };
  const sh = rcptSheet_(), reg = receiptRegistry_()[normalized];
  if (!reg) return { success: false, error: 'Квитанция не найдена в реестре.' };
  let used = 0;
  try { used = Math.round(rcptFactUsage_(cfg, rcptTotalsMap_())[normalized] || 0); } catch (e) { used = reg.distributed; }
  if (used > 0) return { success: false, error: 'По квитанции ' + receipt + ' зачтено ' + used + ' сом — убрать нельзя. Если сумма чека меньше, нажмите «Исправить сумму».' };
  sh.deleteRow(reg.rowIndex);
  try { logChanges_(roleTitle_(actual), '', '', '(реестр квитанций)', [['Квитанция ' + receipt, 'сумма ' + reg.total + ' сом, зачтено 0', 'убрана из реестра']]); } catch (e) {}
  return { success: true, message: 'Квитанция ' + receipt + ' убрана из реестра.' };
}

/** Пересборка реестра из кабинета (кнопка в «Предоплатах») */
function recalcReceiptRegistry(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || (actual !== 'admin' && actual !== 'director')) return { success: false, error: 'Недоступно.' };
  const r = rcptRepair_(cfg);
  try { logChanges_(roleTitle_(actual), '', '', '(реестр квитанций)', [['Пересборка реестра', '', r.message]]); } catch (e) {}
  return { success: true, message: r.message };
}

/** ЗАПУСТИТЬ ПРИ НЕОБХОДИМОСТИ: пересобрать реестр квитанций по фактическим оплатам */
function repairReceiptRegistry() {
  const r = rcptRepair_(getConfig_());
  try { PropertiesService.getScriptProperties().setProperty('RCPT_REPAIR_V83', '1'); } catch (e) {}
  Logger.log(r.message);
  return r.message;
}

/**
 * Возвращает шаблон «оплата принята». Если в НАСТРОЙКИ ещё лежит старый двуязычный текст,
 * один раз заменяет его на кыргызский. Свой текст руководителя не трогается.
 */
function thanksTplKg_(cfg) {
  const tpl = String((cfg && cfg.thanksTpl) || '').trim();
  if (!tpl) return THANKS_KG_DEFAULT;
  if (!/Уважаемые родители|Оплата принята/i.test(tpl)) return tpl;
  try {
    const props = PropertiesService.getScriptProperties();
    if (props.getProperty('THANKS_KG_V89') === '1') return tpl;
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
    if (sh && sh.getLastRow() >= 2) {
      const col = sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues();
      for (let i = 0; i < col.length; i++) {
        if (String(col[i][0] || '').trim() === 'ТЕКСТ_ОПЛАТА_ПРИНЯТА') {
          sh.getRange(i + 2, 2).setNumberFormat('@').setValue(THANKS_KG_DEFAULT);
          break;
        }
      }
    }
    props.setProperty('THANKS_KG_V89', '1');
    try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  } catch (e) { Logger.log('thanksTplKg_: ' + e.message); }
  return THANKS_KG_DEFAULT;
}

function receiptRegistry_() {
  const sh = rcptSheet_(), out = {};
  if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, RCPT_H.length).getValues().forEach(function(r, i) {
    const k = normalizeReceiptNumber_(r[0]); if (k) out[k] = { total: Math.round(parseNum_(r[1])), distributed: Math.round(parseNum_(r[8])), rowIndex: i + 2, raw: String(r[0]) };
  });
  return out;
}
function rcptSetDistributed_(sh, entry, distributed) {
  distributed = Math.max(0, Math.round(distributed));
  sh.getRange(entry.rowIndex, 7).setValue(new Date());
  sh.getRange(entry.rowIndex, 9, 1, 2).setValues([[distributed, Math.max(0, entry.total - distributed)]]);
  entry.distributed = distributed;
}
/**
 * Разовое заполнение реестра по всем журналам/базе (старые квитанции, внесённые до появления реестра).
 * Выполняется автоматически один раз; дальше реестр ведётся при каждом сохранении.
 */
function seedReceiptRegistry_(cfg) {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('RCPT_SEEDED') === '1') return;
  const sums = {}, first = {};
  const add = function(rec, amount, student, month) { const k = normalizeReceiptNumber_(rec); if (!k || isCashMarker_(k)) return; sums[k] = (sums[k] || 0) + Math.round(parseNum_(amount)); if (!first[k]) first[k] = { raw: String(rec).trim(), student: student, month: month }; };
  if (cfg.useDb) {
    const gm = {}; dbTable_(DB_GROUPS, DB_GROUPS_H).rows.forEach(function(g) { gm[String(g[GR.id])] = String(g[GR.month]); });
    dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) { add(r[RO.receipt], r[RO.paid], String(r[RO.name]), gm[String(r[RO.gid])] || ''); });
  } else {
    const seen = {};
    cfg.journals.forEach(function(j) {
      if (seen[j.paymentsId]) return; seen[j.paymentsId] = true;
      let ss; try { ss = SpreadsheetApp.openById(j.paymentsId); } catch (e) { return; }
      for (let g = 1; g <= 10; g++) {
        const sh = ss.getSheetByName('Группа ' + g); if (!sh) continue;
        const data = sh.getRange(PAY_FIRST_ROW, COL_NAME, PAY_ROWS, COL_RECEIPT - COL_NAME + 1).getValues();
        for (let i = 0; i < PAY_ROWS; i++) add(data[i][COL_RECEIPT - COL_NAME], data[i][COL_PAID - COL_NAME], String(data[i][0] || ''), j.month);
      }
    });
  }
  const ps = prepaySheet_();
  if (ps.getLastRow() >= 2) ps.getRange(2, 1, ps.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r) { add(r[5], r[7], String(r[1]), String(r[11])); });
  const sh = rcptSheet_(), reg = receiptRegistry_();
  const rows = [];
  Object.keys(sums).forEach(function(k) {
    if (reg[k]) { rcptSetDistributed_(sh, reg[k], sums[k]); return; }
    rows.push([first[k].raw, sums[k], new Date(), first[k].student, first[k].month, new Date(), new Date(), k, sums[k], 0]);
  });
  if (rows.length) sh.getRange(sh.getLastRow() + 1, 1, rows.length, RCPT_H.length).setValues(rows);
  props.setProperty('RCPT_SEEDED', '1');
}

/**
 * Проверка и учёт суммы по квитанции (реестр КВИТАНЦИИ, без сканирования журналов).
 * prevReceipt/prevAmount — что стояло в строке до сохранения (чтобы не считать дважды при правке).
 * При успехе сразу записывает новое «распределено». Новая квитанция: сумма = receiptTotal или = оплата.
 */
/** Сумма оплат по квитанции во всех группах базы (все месяцы), кроме указанного ученика. null — база недоступна */
function receiptPaidFromDb_(normalized, excludeStudent, details) {
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H); if (!R) return null;
  const ex = studentKey_(excludeStudent || '');
  const totals = rcptTotalsMap_(), acc = {};
  let sum = 0;
  R.rows.forEach(function(r) {
    const alloc = rcptAllocateRow_(r[RO.receipt], r[RO.paid], totals, acc, r[RO.split]);
    let mine = 0;
    alloc.forEach(function(a) { acc[a.rec] = (acc[a.rec] || 0) + a.amount; if (a.rec === normalized) mine = a.amount; });
    if (!mine) return;
    if (ex && studentKey_(r[RO.name]) === ex) return;
    sum += mine;
    if (details) details.push(String(r[RO.name]) + ' — ' + mine + ' сом');
  });
  return sum;
}
/**
 * Сколько по квитанции уже израсходовано ВСЕМИ источниками (состав, книги, архив, предоплаты) —
 * теми же правилами, что «Пересчитать реестр» (rcptFactUsage_), — за вычетом того, что сейчас
 * держит редактируемая строка (prev: {receipt, amount, split}).
 * keepPrepay=false: вычитается и «свежая» предоплата этого ученика из переплаты по этой квитанции
 * (её пересоберёт syncPrepayForPayment_, потому что сумма или квитанция меняются).
 * keepPrepay=true: предоплата остаётся (доплата, уход с квитанции, простая правка даты).
 * details — как раньше, список «кто — сколько» по составу для текста ошибки. null — базы нет.
 */
function receiptUsedByOthers_(cfg, normalized, prev, studentName, details, keepPrepay) {
  if (!cfg || !cfg.useDb) return null;
  const totals = rcptTotalsMap_();
  const used = rcptFactUsage_(cfg, totals);
  let mine = 0;
  if (prev && prev.receipt && Math.round(parseNum_(prev.amount)) > 0) {
    rcptAllocateRow_(prev.receipt, prev.amount, totals, {}, prev.split).forEach(function(a) { if (a.rec === normalized) mine += a.amount; });
  }
  if (prev && !keepPrepay) {
    try {
      const k = studentKey_(studentName || ''), ps = prepaySheet_();
      if (k && ps.getLastRow() >= 2) ps.getRange(2, 1, ps.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r) {
        if (String(r[15] || studentKey_(r[1])) !== k || normalizeReceiptNumber_(r[5]) !== normalized) return;
        if (String(r[10] || '') === PP_VOID || Math.round(parseNum_(r[8])) > 0) return;
        if (!/^(переплата|сумма исправлена)/.test(String(r[14] || '').toLowerCase())) return;
        mine += Math.round(parseNum_(r[7]));
      });
    } catch (e) {}
  }
  if (details) { try { receiptPaidFromDb_(normalized, studentName, details); } catch (e) {} }
  return Math.max(0, Math.round((used[normalized] || 0) - mine));
}
/**
 * Привести одну квитанцию реестра к фактам: «Распределено» = сумма по всем источникам,
 * «Сумма квитанции» не меньше распределённого. Вызывается после каждого сохранения оплаты.
 */
function rcptSyncOne_(cfg, normalized) {
  if (!cfg || !cfg.useDb || !normalized || isCashMarker_(normalized)) return;
  const sh = rcptSheet_(), reg = receiptRegistry_(), e = reg[normalized];
  if (!e) return;
  const totals = {}; Object.keys(reg).forEach(function(k) { totals[k] = reg[k].total; });
  const f = Math.round(rcptFactUsage_(cfg, totals)[normalized] || 0);
  const total = Math.max(e.total, f);
  if (total !== e.total) { sh.getRange(e.rowIndex, 2).setValue(total); e.total = total; }
  if (f !== e.distributed || total !== e.total) rcptSetDistributed_(sh, e, f);
}

/** Кто и сколько оплатил по квитанции — по фактическим строкам базы (все группы и месяцы) */
function receiptInfo(role, password, receipt) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  const normalized = normalizeReceiptNumber_(receipt);
  if (!normalized) return { success: false, error: 'Укажите номер квитанции.' };
  const reg = receiptRegistry_()[normalized] || null;
  const rows = [];
  let factSum = null;
  if (cfg.useDb) {
    const G = dbTable_(DB_GROUPS, DB_GROUPS_H), gm = {}; G.rows.forEach(function(g) { gm[String(g[GR.id])] = g; });
    const totals = rcptTotalsMap_(), acc = {};
    dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
      const alloc = rcptAllocateRow_(r[RO.receipt], r[RO.paid], totals, acc, r[RO.split]);
      let mine = 0;
      alloc.forEach(function(a) { acc[a.rec] = (acc[a.rec] || 0) + a.amount; if (a.rec === normalized) mine = a.amount; });
      if (mine <= 0) return;
      const g = gm[String(r[RO.gid])] || [];
      rows.push({ student: String(r[RO.name]), group: 'Группа ' + (g[GR.num] || '?'), teacher: String(g[GR.teacher] || ''), month: String(g[GR.month] || ''), amount: mine, date: String(r[RO.date] || '') });
    });
    // «по факту» — по всем источникам (состав + книги + архив + предоплаты), как в «Пересчитать реестр»
    try { const f = rcptFactUsage_(cfg, totals); factSum = Math.round(f[normalized] || 0); } catch (e) {}
  }
  const rosterSum = rows.reduce(function(a, x) { return a + x.amount; }, 0);
  const actualSum = factSum === null ? rosterSum : factSum;
  return { success: true, receipt: String(receipt), total: reg ? reg.total : null, registryDistributed: reg ? reg.distributed : null,
    actual: actualSum, rows: rows, other: Math.max(0, actualSum - rosterSum),
    mismatch: !!(reg && reg.distributed !== actualSum) };
}
/** Привести реестр по квитанции к факту: «распределено» = сумма оплат учеников; общая сумма не меньше распределённого */
function receiptRecalc(role, password, receipt) {
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || actual === 'academic') return { success: false, error: 'Недоступно.' };
  const info = receiptInfo(role, password, receipt);
  if (!info.success) return info;
  const normalized = normalizeReceiptNumber_(receipt), sh = rcptSheet_(), reg = receiptRegistry_()[normalized];
  if (!reg) return { success: true, message: 'Квитанции ' + receipt + ' в реестре нет — она свободна.' };
  const total = Math.max(reg.total, info.actual);
  sh.getRange(reg.rowIndex, 2).setValue(total);
  sh.getRange(reg.rowIndex, 9, 1, 2).setValues([[info.actual, total - info.actual]]);
  logChanges_(roleTitle_(actual), '', '', '(реестр квитанций)', [['Квитанция ' + receipt, 'распределено ' + reg.distributed, 'распределено ' + info.actual + ' (по факту оплат)']]);
  return { success: true, message: 'Квитанция ' + receipt + ': всего ' + total + ' сом, распределено по факту ' + info.actual + ' сом, свободно ' + (total - info.actual) + ' сом.' + (info.rows.length ? ' Оплаты: ' + info.rows.map(function(x) { return x.student + ' — ' + x.amount; }).join(', ') + '.' : ' Оплат по этой квитанции в базе нет.') };
}
/** Сверить весь реестр квитанций с фактическими оплатами (руководитель) */
function receiptRecalcAll(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Только руководитель.' };
  if (!cfg.useDb) return { success: false, error: 'Доступно в режиме БАЗА.' };
  const before = receiptRegistry_();
  rcptRepair_(cfg);
  const after = receiptRegistry_(), fixes = [];
  Object.keys(after).forEach(function(k) {
    if (isCashMarker_(k)) return;
    const a = after[k], b = before[k];
    if (!b || b.distributed !== a.distributed || b.total !== a.total) fixes.push(a.raw + ': ' + (b ? b.distributed : '—') + ' → ' + a.distributed + (b && b.total !== a.total ? ' (сумма ' + b.total + ' → ' + a.total + ')' : ''));
  });
  try { logChanges_('руководитель', '', '', '(сверка реестра квитанций)', [['Реестр квитанций', '', (fixes.length ? 'исправлено: ' + fixes.length + ' · ' + fixes.slice(0, 20).join('; ') : 'расхождений нет')]]); } catch (e) {}
  return { success: true, fixed: fixes.length, fixes: fixes, message: fixes.length ? 'Сверка выполнена: исправлено квитанций — ' + fixes.length + '.' : 'Сверка выполнена: расхождений нет.' };
}
function receiptCheck_(cfg, receipt, amount, receiptTotal, prev, studentName, month) {
  const normalized = normalizeReceiptNumber_(receipt);
  const prevNorm = prev && prev.receipt ? normalizeReceiptNumber_(prev.receipt) : '';
  const prevAmount = prev ? Math.round(parseNum_(prev.amount)) : 0;
  // квитанцию убрали или заменили на наличные — вернуть её сумму в реестр, чтобы номер можно было использовать снова
  if ((!normalized || isCashMarker_(normalized)) && prevNorm && !isCashMarker_(prevNorm)) {
    try {
      seedReceiptRegistry_(cfg);
      const sh0 = rcptSheet_(), reg0 = receiptRegistry_();
      if (reg0[prevNorm]) {
        let d = reg0[prevNorm].distributed - prevAmount;
        if (cfg.useDb) { const a = receiptUsedByOthers_(cfg, prevNorm, prev, studentName, null, true); if (a !== null) d = a; }
        rcptSetDistributed_(sh0, reg0[prevNorm], Math.max(0, d));
      }
    } catch (e) {}
  }
  if (!normalized || isCashMarker_(normalized)) return { ok: true };
  seedReceiptRegistry_(cfg);
  const sh = rcptSheet_(), reg = receiptRegistry_();
  const rt = Math.round(parseNum_(receiptTotal));
  // правка строки с другой квитанцией — прежняя квитанция освобождается в реестре (по фактам, а не вычитанием),
  // но ТОЛЬКО после успешной проверки новой: раньше это делалось до проверки, и неудавшееся сохранение
  // оставляло старую квитанцию «без единой зачтённой оплаты»
  const releasePrev = function() {
    if (prevNorm && prevNorm !== normalized && reg[prevNorm] && !isCashMarker_(prevNorm)) {
      let d = reg[prevNorm].distributed - prevAmount;
      if (cfg.useDb) { try { const a = receiptUsedByOthers_(cfg, prevNorm, prev, studentName, null, true); if (a !== null) d = a; } catch (e) {} }
      rcptSetDistributed_(sh, reg[prevNorm], Math.max(0, d));
    }
  };
  let entry = reg[normalized];
  let distributedOthers = entry ? entry.distributed - (prevNorm === normalized ? prevAmount : 0) : 0;
  if (distributedOthers < 0) distributedOthers = 0;
  // режим БАЗА: «уже распределено» — по ВСЕМ фактам (состав, книги, архив, предоплаты), теми же
  // правилами, что «Пересчитать реестр». Раньше считался только состав групп — предоплаты, книги
  // и архив выпадали из «распределено», и появлялись ложные остатки по квитанциям.
  // Свежую предоплату из переплаты вычитаем только если сумма меняется (её пересоберёт sync);
  // при повторном сохранении с той же суммой (правка даты) она остаётся зачтённой.
  let details = [];
  if (cfg.useDb) {
    try {
      const sameRow = !!prev && prevNorm === normalized;
      const keepPrepay = !sameRow || amount === prevAmount;
      // prev передаём всегда: если в старой ячейке было несколько номеров и новый — один из них,
      // вклад этой же строки в новую квитанцию должен вычесться, иначе ложная «квитанция исчерпана»
      const actual = receiptUsedByOthers_(cfg, normalized, prev, studentName, details, keepPrepay);
      if (actual !== null) { distributedOthers = actual; if (entry) entry.distributed = actual + (sameRow ? prevAmount : 0); }
    } catch (e) {}
  }
  let total;
  if (entry) {
    total = entry.total;
    if (rt > total) { total = rt; entry.total = rt; sh.getRange(entry.rowIndex, 2).setValue(rt); }
  } else total = rt > 0 ? rt : amount;
  let remaining = total - distributedOthers, raised = false;
  if (amount > remaining && cfg.useDb && rt <= total) {
    // сумму квитанции не вписали, а плательщики по ней — та же семья (реестр семей / общий WhatsApp):
    // считаем, что квитанция общая, и увеличиваем её сумму до фактически принятой
    try {
      const payers = []; receiptPaidFromDb_(normalized, studentName, payers);
      if (payers.length && studentName) {
        const R = dbTable_(DB_ROSTER, DB_ROSTER_H), S = dbStudents_(); let phone = '';
        R.rows.forEach(function(r) { if (!phone && studentKey_(r[RO.name]) === studentKey_(studentName)) { const st = S.byId[String(r[RO.sid])] || []; phone = String(st[ST.wa] || ''); } });
        const rel = deferralRelated_(cfg, month || cfg.currentMonth, studentName, phone).map(function(x) { return studentKey_(x.name); });
        const payerKeys = payers.map(function(x) { return studentKey_(x.split(' — ')[0]); });
        // поднимаем сумму только если квитанция целиком «съедена» родственниками (типичный случай: первому ребёнку
        // записали сумму его оплаты как сумму чека). Если по чеку остался хвост, суммы не трогаем — иначе чек «раздувается»
        if (payerKeys.some(function(k) { return rel.indexOf(k) !== -1; }) && total === distributedOthers) { total = distributedOthers + amount; if (entry) { entry.total = total; sh.getRange(entry.rowIndex, 2).setValue(total); } remaining = amount; raised = true; }
      }
    } catch (e) {}
  }
  if (amount > remaining) {
    return { error: 'По квитанции ' + receipt + ' всего ' + total + ' сом, уже распределено ' + distributedOthers + ' сом' + (details.length ? ' (' + details.join(', ') + ')' : '') + ', осталось ' + Math.max(remaining, 0) + ' сом. Можно принять не более ' + Math.max(remaining, 0) + ' сом — оплата не сохранена.', total: total, distributed: distributedOthers, remaining: Math.max(remaining, 0) };
  }
  releasePrev();
  if (!entry) {
    sh.appendRow([String(receipt).trim(), total, new Date(), studentName || '', month || '', new Date(), new Date(), normalized, distributedOthers + amount, total - distributedOthers - amount]);
  } else rcptSetDistributed_(sh, entry, distributedOthers + amount);
  return { ok: true, total: total, distributed: distributedOthers + amount, remaining: remaining - amount, raised: raised };
}

/** Остаток по квитанции из реестра */
function receiptRemaining_(cfg, receipt) {
  const normalized = normalizeReceiptNumber_(receipt);
  if (!normalized || isCashMarker_(normalized)) return 0;
  seedReceiptRegistry_(cfg);
  const e = receiptRegistry_()[normalized];
  return e ? Math.max(0, e.total - e.distributed) : 0;
}

/** Кто и когда внёс оплату + пометка «исправлена», если сумму/квитанцию правили после внесения */
function payStamp_(sh, r, role, wasPaid, wasRec, wasDate, nowPaid, nowRec, nowDate) {
  try {
    const who = role === 'director' ? 'Руководитель' : 'Кассир';
    const changed = wasPaid > 0 && (wasPaid !== nowPaid || String(wasRec) !== String(nowRec) || String(wasDate) !== String(nowDate));
    const fix = changed ? ('было ' + wasPaid + ' сом' + (wasRec ? ' · ' + wasRec : '') + ' · правка ' + nowStamp_()) : String(r[RO.payFix] || '');
    dbSetCells_(sh, r.rowIndex, { 15: who, 16: nowStamp_(), 17: fix });
    r[RO.payBy] = who; r[RO.payAt] = nowStamp_(); r[RO.payFix] = fix;
  } catch (e) { Logger.log('payStamp_: ' + e.message); }
}

/**
 * Лента последних оплат для администратора и руководителя.
 * days: 1 (сегодня) / 7 / 30 / 0 — весь месяц. query — фамилия, квитанция или сумма.
 */
function getRecentPayments(role, password, days, query, month) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || (actual !== 'admin' && actual !== 'director')) return { success: false, error: 'Недоступно.' };
  if (!cfg.useDb) return { success: false, error: 'Раздел работает в режиме БАЗА.' };
  const m = String(month || cfg.currentMonth);
  const back = Math.max(0, Math.round(parseNum_(days)));
  const from = back ? new Date(Date.now() - back * 86400000) : null;
  const q = String(query || '').trim().toLowerCase();
  const groups = dbGroupsOfMonth_(m), R = dbTable_(DB_ROSTER, DB_ROSTER_H), S = dbStudents_();
  const byGid = {};
  R.rows.forEach(function(r) { const k = String(r[RO.gid]); (byGid[k] = byGid[k] || []).push(r); });
  // чек из WhatsApp — по номеру квитанции
  const chek = {};
  try {
    const ib = inboxSheet_();
    if (ib.getLastRow() >= 2) ib.getRange(2, 1, ib.getLastRow() - 1, INBOX_H.length).getValues().forEach(function(x) {
      const k = normalizeReceiptNumber_(x[IB.receipt]); if (!k) return;
      const link = String(x[IB.drive] || '') || String(x[IB.file] || '');
      if (link && !chek[k]) chek[k] = link;
    });
  } catch (e) {}
  const items = [];
  let sum = 0, cash = 0, bank = 0;
  groups.forEach(function(g) {
    const rows = byGid[String(g.row[GR.id])] || [];
    const gTitle = 'Группа ' + g.row[GR.num], tShort = String(g.row[GR.teacher]);
    rows.forEach(function(r) {
      const paid = Math.round(parseNum_(r[RO.paid]));
      if (paid <= 0) return;
      const dt = String(r[RO.date] || '');
      const dRu = /^\d{4}-\d{2}-\d{2}$/.test(dt) ? dt.split('-').reverse().join('.') : dt;
      const when = inboxWhen_(r[RO.payAt]) || inboxWhen_(dRu);
      if (from && (!when || when < from)) return;
      const receipt = String(r[RO.receipt] || '');
      const isCash = isCashMarker_(normalizeReceiptNumber_(receipt));
      const it = { student: String(r[RO.name]), group: gTitle, teacher: tShort, teacherFull: teacherFullName_(cfg, tShort),
        month: m, paymentRow: Number(r[RO.num]) + PAY_FIRST_ROW - 1,
        amount: paid, tuition: Math.round(parseNum_(r[RO.tuition])), receipt: receipt, cash: isCash,
        date: dRu, by: String(r[RO.payBy] || ''), at: String(r[RO.payAt] || ''), fix: String(r[RO.payFix] || ''),
        chek: chek[normalizeReceiptNumber_(receipt)] || '', ts: when ? when.getTime() : 0 };
      if (q) {
        const hay = [it.student, it.receipt, it.group, it.teacher, it.teacherFull, String(it.amount)].join(' ').toLowerCase();
        if (hay.indexOf(q) === -1) return;
      }
      sum += paid; if (isCash) cash++; else bank++;
      items.push(it);
    });
  });
  items.sort(function(a, b) { return b.ts - a.ts; });
  const total = items.length;
  return { success: true, month: m, days: back, query: String(query || ''),
    items: items.slice(0, 300), total: total, shown: Math.min(total, 300), sum: sum, cash: cash, bank: bank };
}

/** Полное имя преподавателя по короткому — для ленты оплат */
function teacherFullName_(cfg, short) {
  try {
    const t = (cfg.teachers || []).filter(function(x) { return nameKey_(x.short) === nameKey_(short); })[0];
    return t ? (t.full || t.short) : String(short || '');
  } catch (e) { return String(short || ''); }
}

/** Квитанции, по которым деньги получены, но часть суммы никому не зачислена */
function getReceiptRemainders(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || (actual !== 'admin' && actual !== 'director')) return { success: false, error: 'Недоступно.' };
  seedReceiptRegistry_(cfg);
  // разовая пересборка реестра: после порчи столбцов (v83) и после ложных остатков (v90)
  let repaired = '';
  try {
    const props = PropertiesService.getScriptProperties();
    if (props.getProperty('RCPT_REPAIR_V90') !== '1') { repaired = rcptRepair_(cfg).message; props.setProperty('RCPT_REPAIR_V90', '1'); }
  } catch (e) {}
  const sh = rcptSheet_();
  const rows = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, RCPT_H.length).getValues() : [];
  // «зачислено» — по всем фактам (состав + книги + архив + предоплаты), а не по счётчику в листе
  let fact = null;
  if (cfg.useDb) {
    try {
      const totals = {};
      rows.forEach(function(r) { const k = normalizeReceiptNumber_(r[0]); if (k) totals[k] = Math.round(parseNum_(r[1])); });
      fact = rcptFactUsage_(cfg, totals);
    } catch (e) { fact = null; }
  }
  const byReceipt = {};
  if (cfg.useDb) {
    try {
      const G = dbTable_(DB_GROUPS, DB_GROUPS_H), R = dbTable_(DB_ROSTER, DB_ROSTER_H);
      const gm = {}; G.rows.forEach(function(g) { gm[String(g[GR.id])] = g; });
      R.rows.forEach(function(r) {
        const k = normalizeReceiptNumber_(r[RO.receipt]); if (!k) return;
        const g = gm[String(r[RO.gid])]; if (!g) return;
        if (nameKey_(g[GR.month]) !== nameKey_(cfg.currentMonth)) return;
        (byReceipt[k] = byReceipt[k] || []).push({ name: String(r[RO.name]), group: 'Группа ' + g[GR.num], teacher: String(g[GR.teacher]) });
      });
    } catch (e) {}
  }
  const items = [];
  let sum = 0, healed = 0;
  rows.forEach(function(r, i) {
    const k = normalizeReceiptNumber_(r[0]); if (!k || isCashMarker_(k)) return;
    const total = Math.round(parseNum_(r[1]));
    let dist = Math.round(parseNum_(r[8]));
    if (fact) {
      const f = Math.round(fact[k] || 0);
      if (f !== dist) {
        dist = f;
        try { sh.getRange(i + 2, 9, 1, 2).setValues([[f, Math.max(0, total - f)]]); healed++; } catch (e) {}
      }
    }
    const left = total - dist;
    if (left <= 0) return;
    const d = r[2] instanceof Date ? Utilities.formatDate(r[2], TZ, 'dd.MM.yyyy') : String(r[2] || '');
    const cand = byReceipt[k] || [];
    const first = String(r[3] || '');
    if (first && !cand.some(function(c) { return studentKey_(c.name) === studentKey_(first); })) cand.push({ name: first, group: '', teacher: '' });
    items.push({ receipt: String(r[0]), total: total, distributed: dist, remaining: left, date: d,
      month: String(r[4] || ''), student: first, candidates: cand.slice(0, 8), credited: dist > 0 });
    sum += left;
  });
  items.sort(function(a, b) { return b.remaining - a.remaining; });
  const real = items.filter(function(x) { return x.credited; });
  return { success: true, items: items, count: items.length, sum: sum,
    realCount: real.length, realSum: real.reduce(function(a, x) { return a + x.remaining; }, 0),
    repaired: repaired, healed: healed };
}

/** Записать остаток по квитанции в предоплату выбранного ученика */
function prepayFromReceipt(role, password, receipt, student) {
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || (actual !== 'admin' && actual !== 'director')) return { success: false, error: 'Недоступно.' };
  const name = String(student || '').trim();
  if (!name) return { success: false, error: 'Выберите ученика.' };
  const normalized = normalizeReceiptNumber_(receipt);
  if (!normalized) return { success: false, error: 'Не указан номер квитанции.' };
  seedReceiptRegistry_(cfg);
  const sh = rcptSheet_(), reg = receiptRegistry_()[normalized];
  if (!reg) return { success: false, error: 'Квитанция не найдена в реестре.' };
  const left = reg.total - reg.distributed;
  if (left <= 0) return { success: false, error: 'По этой квитанции остатка уже нет.' };
  if (reg.distributed <= 0) return { success: false, error: 'По квитанции ' + receipt + ' нет ни одной зачтённой оплаты. Сначала проведите оплату ученику — остаток появится сам.' };
  let group = '', teacher = '', wa = '', month = cfg.currentMonth, date = '';
  if (cfg.useDb) {
    try {
      const R = dbTable_(DB_ROSTER, DB_ROSTER_H), G = dbTable_(DB_GROUPS, DB_GROUPS_H), S = dbStudents_();
      const gm = {}; G.rows.forEach(function(g) { gm[String(g[GR.id])] = g; });
      const hit = R.rows.filter(function(r) {
        const g = gm[String(r[RO.gid])];
        return g && nameKey_(g[GR.month]) === nameKey_(cfg.currentMonth) && studentKey_(r[RO.name]) === studentKey_(name);
      })[0];
      if (hit) {
        const g = gm[String(hit[RO.gid])];
        group = 'Группа ' + g[GR.num]; teacher = String(g[GR.teacher]); month = String(g[GR.month]);
        date = String(hit[RO.date] || '');
        const st = S.byId[String(hit[RO.sid])] || []; wa = String(st[ST.wa] || '');
      }
    } catch (e) {}
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) date = date.split('-').reverse().join('.');
  addPrepayment_(name, group, teacher, wa, String(receipt), date || Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy'), left, month, roleTitle_(actual));
  rcptSetDistributed_(sh, reg, reg.total);
  cacheDrop_('prepays');
  return { success: true, amount: left, student: name,
    message: 'Остаток ' + left + ' сом по квитанции ' + receipt + ' записан в предоплату ученика ' + name + '.' };
}

function addPrepayment_(student, group, teacher, wa, receipt, date, amount, month, origin) {
  const sh = prepaySheet_();
  const id = 'П-' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + String(Math.floor(Math.random() * 90 + 10));
  const next = nextMonthName_(month) || '';
  sh.appendRow([id, student, group, teacher, phoneKey_(wa), receipt, date, amount, 0, amount, PP_NEW, month, next, new Date(), String(origin || ''), studentKey_(student)]);
  logChanges_('кассир', group, '', student, [['Предоплата', '', amount + ' сом · квитанция ' + receipt]]);
  return id;
}

const PP_VOID = 'аннулирована';
/**
 * Согласовать предоплату с исправленной оплатой: при правке суммы оплаты по той же квитанции
 * неиспользованная предоплата уменьшается/аннулируется (или создаётся, если переплата появилась),
 * а сумма квитанции в реестре приводится к фактической. Частично использованные предоплаты не трогаются.
 */
function syncPrepayForPayment_(cfg, student, group, teacher, wa, receipt, date, newExcess, month, who) {
  newExcess = Math.max(0, Math.round(parseNum_(newExcess)));
  const normalized = normalizeReceiptNumber_(receipt);
  const sh = prepaySheet_(), k = studentKey_(student);
  const rows = [];
  if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r, i) {
    if (!String(r[0] || '')) return;
    if (String(r[15] || studentKey_(r[1])) !== k) return;
    if (normalized && normalizeReceiptNumber_(r[5]) !== normalized) return;
    if (!normalized && String(r[5] || '').trim()) return;
    const nt = String(r[14] || '').toLowerCase();
    if (!/^(переплата|сумма исправлена)/.test(nt)) return;   // только предоплаты, созданные из переплаты по этой оплате
    rows.push({ rowIndex: i + 2, amount: Math.round(parseNum_(r[7])), used: Math.round(parseNum_(r[8])), remaining: Math.round(parseNum_(r[9])), status: String(r[10]) });
  });
  const fresh = rows.filter(function(x) { return x.used === 0 && x.status !== PP_VOID && x.status !== PP_USED; });
  const oldExcess = fresh.reduce(function(a, x) { return a + x.amount; }, 0);
  const partial = rows.filter(function(x) { return x.used > 0; });
  let note = '';
  if (!fresh.length) {
    if (newExcess) addPrepayment_(student, group, teacher, wa, receipt, date, newExcess, month, 'переплата по оплате');
    if (partial.length && !newExcess) note = 'Предоплата по этой квитанции уже частично использована — её нужно скорректировать вручную на вкладке «Предоплаты».';
    if (newExcess) { try { rcptSyncOne_(cfg, normalized); } catch (e) {} }
    return { changed: !!newExcess, note: note };
  }
  if (oldExcess === newExcess) return { changed: false, note: '' };
  const stamp = nowStamp_();
  fresh.forEach(function(x, i) {
    if (i === 0 && newExcess > 0) {
      sh.getRange(x.rowIndex, 8, 1, 4).setValues([[newExcess, 0, newExcess, PP_NEW]]);
      sh.getRange(x.rowIndex, 14, 1, 2).setValues([[new Date(), 'сумма исправлена ' + x.amount + ' → ' + newExcess + ' сом · ' + who + ' · ' + stamp]]);
    } else {
      sh.getRange(x.rowIndex, 8, 1, 4).setValues([[x.amount, 0, 0, PP_VOID]]);
      sh.getRange(x.rowIndex, 14, 1, 2).setValues([[new Date(), 'аннулирована: сумма оплаты исправлена · ' + who + ' · ' + stamp]]);
    }
  });
  // реестр квитанций: сумма квитанции была завышена на разницу; «распределено» — по фактам
  if (normalized && !isCashMarker_(normalized)) {
    try {
      const rs = rcptSheet_(), reg = receiptRegistry_()[normalized];
      if (reg) {
        const delta = oldExcess - newExcess;
        if (cfg && cfg.useDb) {
          const total = Math.max(0, reg.total - delta);
          rs.getRange(reg.rowIndex, 2).setValue(total);
          rcptSyncOne_(cfg, normalized);   // распределено = факты, сумма не меньше распределённого
        } else {
          const total = Math.max(0, reg.total - delta), distributed = Math.max(0, Math.min(total, reg.distributed - delta));
          rs.getRange(reg.rowIndex, 2).setValue(total);
          rs.getRange(reg.rowIndex, 7).setValue(new Date());
          rs.getRange(reg.rowIndex, 9, 1, 2).setValues([[distributed, Math.max(0, total - distributed)]]);
        }
      }
    } catch (e) {}
  }
  logChanges_(who, group, '', student, [['Предоплата (правка оплаты)', oldExcess + ' сом', newExcess ? newExcess + ' сом' : 'аннулирована']]);
  return { changed: true, note: newExcess ? 'Предоплата исправлена: ' + oldExcess + ' → ' + newExcess + ' сом.' : 'Ошибочная предоплата ' + oldExcess + ' сом аннулирована, сумма квитанции в реестре исправлена.' };
}
/** Аннулировать неиспользованную предоплату: администратор — заявка руководителю, руководитель — сразу */
function voidPrepayment(role, password, id, reason) {
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  if (!String(reason || '').trim()) return { success: false, error: 'Укажите причину.' };
  if (actual !== 'director') {
    const sh0 = prepaySheet_();
    let rec = null; if (sh0.getLastRow() >= 2) sh0.getRange(2, 1, sh0.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(x) { if (String(x[0]) === String(id)) rec = x; });
    if (!rec) return { success: false, error: 'Предоплата не найдена.' };
    if (Math.round(parseNum_(rec[8])) > 0) return { success: false, error: 'Предоплата уже частично использована — обратитесь к руководителю.' };
    createRequest_('предоплата', 'кассир', String(rec[11] || cfg.currentMonth), String(rec[2] || ''), '', String(rec[1]) + ' · ' + Math.round(parseNum_(rec[7])) + ' сом · кв. ' + rec[5], 'аннулировать · ' + String(reason).trim(), JSON.stringify({ prepayId: String(id), reason: String(reason).trim() }));
    return { success: true, pending: true, message: 'Заявка на аннулирование предоплаты ' + Math.round(parseNum_(rec[7])) + ' сом (' + rec[1] + ') отправлена руководителю. Предоплата останется активной до его решения.' };
  }
  return voidPrepayment_(id, reason, 'руководитель');
}
function voidPrepayment_(id, reason, who) {
  const sh = prepaySheet_();
  if (sh.getLastRow() < 2) return { success: false, error: 'Предоплата не найдена.' };
  const vals = sh.getRange(2, 1, sh.getLastRow() - 1, PREPAY_H.length).getValues();
  let ri = 0, r = null; vals.forEach(function(x, i) { if (String(x[0]) === String(id)) { ri = i + 2; r = x; } });
  if (!r) return { success: false, error: 'Предоплата не найдена.' };
  const used = Math.round(parseNum_(r[8])), amount = Math.round(parseNum_(r[7]));
  if (String(r[10]) === PP_VOID) return { success: false, error: 'Уже аннулирована.' };
  if (used > 0) return { success: false, error: 'Предоплата уже использована на ' + used + ' сом — аннулировать нельзя. Сначала отмените зачёт в оплате ученика.' };
  sh.getRange(ri, 8, 1, 4).setValues([[amount, 0, 0, PP_VOID]]);
  sh.getRange(ri, 14, 1, 2).setValues([[new Date(), 'аннулирована · ' + who + ' · ' + nowStamp_() + (reason ? ' · ' + String(reason).trim() : '')]]);
  const normalized = normalizeReceiptNumber_(r[5]);
  let regNote = '';
  if (normalized && !isCashMarker_(normalized)) {
    try {
      const rs = rcptSheet_(), reg = receiptRegistry_()[normalized];
      if (reg) { const total = Math.max(0, reg.total - amount), distributed = Math.max(0, Math.min(total, reg.distributed - amount)); rs.getRange(reg.rowIndex, 2).setValue(total); rs.getRange(reg.rowIndex, 7).setValue(new Date()); rs.getRange(reg.rowIndex, 9, 1, 2).setValues([[distributed, Math.max(0, total - distributed)]]); regNote = ' Сумма квитанции ' + r[5] + ' в реестре исправлена: ' + reg.total + ' → ' + total + ' сом.'; }
    } catch (e) {}
  }
  logChanges_(who, String(r[2]), '', String(r[1]), [['Предоплата аннулирована', amount + ' сом · ' + r[5], String(reason || '')]]);
  return { success: true, message: 'Предоплата ' + amount + ' сом ученика ' + r[1] + ' аннулирована.' + regNote };
}

/** {ключ ученика: доступный остаток предоплат} */
function prepayAvailableMap_() {
  const sh = prepaySheet_(), map = {};
  if (sh.getLastRow() < 2) return map;
  sh.getRange(2, 1, sh.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r) {
    const rem = Math.round(parseNum_(r[9])); if (rem > 0) { const k = String(r[15] || studentKey_(r[1])); map[k] = (map[k] || 0) + rem; }
  });
  return map;
}

/** Список предоплат (вкладка «Предоплаты») */
function getPrepayments(role, password) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  const sh = prepaySheet_(), items = [];
  // сколько по каждой квитанции уже ушло ученикам — предоплата не может быть больше остатка
  let rcTotal = {}, rcCredited = {};
  try {
    const reg = receiptRegistry_();
    Object.keys(reg).forEach(function(k) { rcTotal[k] = reg[k].total; });
    rcCredited = rcptFactUsage_(cfg, rcTotal, true);
  } catch (e) {}
  if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r) {
    if (!String(r[0] || '')) return;
    const rk = normalizeReceiptNumber_(r[5]);
    const free = (rk && rcTotal[rk] !== undefined && !isCashMarker_(rk)) ? Math.round(rcTotal[rk] - (rcCredited[rk] || 0)) : null;
    const amt = Math.round(parseNum_(r[7]));
    const impossible = (free !== null && String(r[10]) !== PP_VOID && amt > free + 1);
    items.push({ impossible: impossible, freeByReceipt: free,
      id: String(r[0]), student: String(r[1]), group: String(r[2]), teacher: String(r[3]), wa: String(r[4]), receipt: String(r[5]),
      date: r[6] instanceof Date ? Utilities.formatDate(r[6], TZ, 'dd.MM.yyyy') : String(r[6] || ''), amount: Math.round(parseNum_(r[7])), used: Math.round(parseNum_(r[8])), remaining: Math.round(parseNum_(r[9])),
      status: String(r[10]), month: String(r[11]), from: String(r[12]), note: String(r[14] || ''), canVoid: Math.round(parseNum_(r[8])) === 0 && String(r[10]) !== 'аннулирована' });
  });
  items.reverse();
  return { success: true, items: items, totalRemaining: items.reduce(function(a, x) { return a + x.remaining; }, 0) };
}

/**
 * Зачесть предоплату ученика в оплату текущей группы/месяца (по подтверждению администратора).
 * Списывает не больше остатка к оплате; старые предоплаты используются первыми.
 */
function applyPrepayment(role, password, month, teacherName, groupName, paymentRow) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  let name, balance, applyFn, wa = '';
  if (cfg.useDb) {
    const c = staffCtxDb_(password, month, teacherName, groupName, role);
    if (c.error) return c.error;
    const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
    if (!r) return { success: false, error: 'В этой строке нет ученика.' };
    name = String(r[RO.name]); balance = Math.round(parseNum_(r[RO.tuition])) - Math.round(parseNum_(r[RO.paid]));
    const st = dbStudents_().byId[String(r[RO.sid])] || []; wa = String(st[ST.wa] || '');
    applyFn = function(amount, note) { const rec = String(r[RO.receipt] || '').trim(); const w0 = Math.round(parseNum_(r[RO.paid]));
      const nd = String(r[RO.date] || '') || isoToday_(), nr = (rec ? rec + '; ' : '') + 'ПРЕДОПЛАТА ' + note;
      dbSetCells_(ro.sh, r.rowIndex, { 7: w0 + amount, 8: nr, 9: nd, 14: nowStamp_() });
      payStamp_(ro.sh, r, c.role, w0, rec, String(r[RO.date] || ''), w0 + amount, nr, nd); };
  } else {
    const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
    if (ctx.error) return ctx.error;
    const sh = ctx.sheet, row = ctx.paymentRow;
    name = ctx.studentName;
    balance = balanceOf_(sh.getRange(row, COL_TUITION).getValue(), sh.getRange(row, COL_PAID).getValue());
    wa = String(sh.getRange(14 + (row - PAY_FIRST_ROW), 17).getDisplayValue() || '').trim();
    applyFn = function(amount, note) {
      sh.getRange(row, COL_PAID).setValue(Math.round(parseNum_(sh.getRange(row, COL_PAID).getValue())) + amount);
      const rec = String(sh.getRange(row, COL_RECEIPT).getDisplayValue() || '').trim();
      sh.getRange(row, COL_RECEIPT).setValue((rec ? rec + '; ' : '') + 'ПРЕДОПЛАТА ' + note);
      if (!String(sh.getRange(row, COL_DATE).getDisplayValue() || '').trim()) sh.getRange(row, COL_DATE).setValue(new Date()).setNumberFormat('dd.MM.yyyy');
      SpreadsheetApp.flush();
    };
  }
  if (balance <= 0) return { success: false, error: 'У ученика нет остатка к оплате — предоплата не нужна.' };
  const sh = prepaySheet_();
  if (sh.getLastRow() < 2) return { success: false, error: 'Предоплат нет.' };
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, PREPAY_H.length).getValues();
  const k = studentKey_(name);
  let need = balance, used = 0; const usedFrom = [];
  for (let i = 0; i < rows.length && need > 0; i++) {
    const r = rows[i]; if (String(r[15] || studentKey_(r[1])) !== k) continue;
    const rem = Math.round(parseNum_(r[9])); if (rem <= 0) continue;
    const take = Math.min(rem, need);
    const newUsed = Math.round(parseNum_(r[8])) + take, newRem = rem - take;
    sh.getRange(i + 2, 9, 1, 3).setValues([[newUsed, newRem, newRem > 0 ? PP_PART : PP_USED]]); sh.getRange(i + 2, 14).setValue(new Date());
    usedFrom.push({ id: String(r[0]), month: String(r[11]), take: take, receipt: String(r[5]) });
    need -= take; used += take;
  }
  if (!used) return { success: false, error: 'У ученика ' + name + ' нет доступной предоплаты.' };
  applyFn(used, usedFrom.map(function(u) { return u.take + ' сом (' + u.month + ')'; }).join(', '));
  const left = (prepayAvailableMap_()[k] || 0);
  logChanges_('кассир', groupName, '', name, [['Зачёт предоплаты', '', used + ' сом за ' + month]]);
  return { success: true, used: used, remainingPrepay: left, fromMonths: usedFrom.map(function(u) { return u.month; }).filter(function(v, i, a) { return a.indexOf(v) === i; }).join(', '), student: name, phone: wa, message: 'Зачтено ' + used + ' сом предоплаты. ' + (left ? 'Остаток предоплаты: ' + left + ' сом.' : 'Предоплата использована полностью.') };
}

/** Сообщение родителю о зачёте предоплаты */
function prepayMessage_(role, password, month, name, phone, amount, fromMonths, left) {
  const cfg = getConfig_();
  const msgs = readMessages_(), m = msgs['ПРЕДОПЛАТА_ЗАЧТЕНА'];
  if (!m) return { error: { success: false, error: 'В листе СООБЩЕНИЯ нет текста ПРЕДОПЛАТА_ЗАЧТЕНА.' } };
  const lang = (m.lang === 'RU' || m.lang === 'KG') ? m.lang : cfg.msgLang;
  const tpl = String(lang === 'RU' ? (m.ru || m.kg) : (m.kg || m.ru)).replace(/\\n/g, '\n');
  const mm = monthFromName_(month);
  const text = fillTemplate_(tpl, { 'ученик': name, 'ай': mm ? MONTHS_KG[mm.m - 1] : month, 'месяц': mm ? MONTHS_RU_NOM[mm.m - 1] + ' ' + mm.y : month, 'сумма': String(amount), 'месяц_внесения': String(fromMonths || '').toLowerCase(), 'остаток_предоплаты': String(left || 0) });
  return { text: text, phone: phone };
}
function previewPrepayMessage(role, password, month, name, phone, amount, fromMonths, left) {
  if (!staffRole_(getConfig_(), password)) return { success: false, error: 'Неверный пароль.' };
  if (!phone) return { success: false, error: 'У ученика не указан WhatsApp родителя.' };
  const b = prepayMessage_(role, password, month, name, phone, amount, fromMonths, left);
  if (b.error) return b.error;
  return { success: true, text: b.text, phone: phone, student: name };
}
function sendPrepayMessage(role, password, month, name, phone, amount, fromMonths, left) {
  const actual = staffRole_(getConfig_(), password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const b = prepayMessage_(role, password, month, name, phone, amount, fromMonths, left);
  if (b.error) return b.error;
  const r = sendWhatsapp_(phone, b.text);
  logNotification_([new Date(), '', '', name, phone, 'предоплата зачтена · ' + (actual === 'director' ? 'руководитель' : 'кассир'), '', r.ok ? 'отправлено' : 'ошибка', r.ok ? b.text.substr(0, 300) : r.error]);
  if (!r.ok) return { success: false, error: r.error };
  return { success: true, message: 'Сообщение отправлено родителю ' + name + ' (' + phone + ').' };
}


/** Остаток по квитанции → предоплата ученика (по выбору администратора после сохранения оплаты) */
function receiptRemainderToPrepay(role, password, month, teacherName, groupName, paymentRow) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  let name, wa, receipt, date, groupTitle = groupName, teacherShort;
  if (cfg.useDb) {
    const c = staffCtxDb_(password, month, teacherName, groupName, role);
    if (c.error) return c.error;
    const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
    if (!r) return { success: false, error: 'В этой строке нет ученика.' };
    const st = dbStudents_().byId[String(r[RO.sid])] || [];
    name = String(r[RO.name]); wa = String(st[ST.wa] || ''); receipt = String(r[RO.receipt] || '').trim(); date = String(r[RO.date] || ''); teacherShort = c.teacher.short;
  } else {
    const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
    if (ctx.error) return ctx.error;
    name = ctx.studentName; wa = String(ctx.sheet.getRange(14 + (ctx.paymentRow - PAY_FIRST_ROW), 17).getDisplayValue() || '').trim();
    receipt = String(ctx.sheet.getRange(ctx.paymentRow, COL_RECEIPT).getDisplayValue() || '').trim(); date = String(ctx.sheet.getRange(ctx.paymentRow, COL_DATE).getDisplayValue() || ''); teacherShort = ctx.teacher.short;
  }
  const normalized = normalizeReceiptNumber_(receipt);
  if (!normalized || isCashMarker_(normalized)) return { success: false, error: 'У этой оплаты нет номера квитанции.' };
  seedReceiptRegistry_(cfg);
  const sh = rcptSheet_(), reg = receiptRegistry_()[normalized];
  if (!reg) return { success: false, error: 'Квитанция не найдена в реестре.' };
  const remaining = reg.total - reg.distributed;
  if (remaining <= 0) return { success: false, error: 'По квитанции ' + receipt + ' остатка нет.' };
  addPrepayment_(name, groupTitle, teacherShort, wa, receipt, date, remaining, month);
  rcptSetDistributed_(sh, reg, reg.total);
  return { success: true, amount: remaining, message: 'Остаток ' + remaining + ' сом по квитанции ' + receipt + ' записан как предоплата ученика ' + name + '.' };
}


/**
 * Связанные ученики (одна семья): тот же WhatsApp родителя или связь через семейную скидку.
 * Возвращает только тех, у кого есть остаток к оплате в этом месяце.
 */
function linkedStudents_(cfg, month, name, phone, self) {
  const out = [];
  let snap = null;
  try { snap = loadSnapshot_(month); } catch (e) {}
  if (!snap || !snap.groups) return out;
  const pk = phoneKey_(phone), nk = studentKey_(name);
  const fam = {};
  const famEntries = readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE && e.type === DISCOUNT_TYPES.family && e.basisKey; });
  // семья = первый ребёнок (основание) + все дети, у которых он указан основанием
  let firstKey = nk;
  famEntries.forEach(function(e) { if (studentKey_(e.student) === nk) firstKey = e.basisKey; });
  if (firstKey !== nk) fam[firstKey] = true;
  famEntries.forEach(function(e) { if (e.basisKey === firstKey && studentKey_(e.student) !== nk) fam[studentKey_(e.student)] = true; });
  // сколько учеников с таким же WhatsApp: если номер стоит у многих (общий/тестовый) — по телефону не связываем
  let phoneCount = 0;
  if (pk) snap.groups.forEach(function(g) { (g.st || []).forEach(function(x) { if (x.n && phoneKey_(x.w) === pk) phoneCount++; }); });
  const phoneOk = pk && phoneCount >= 2 && phoneCount <= 3;
  snap.groups.forEach(function(g) {
    (g.st || []).forEach(function(x) {
      const xk = studentKey_(x.n);
      if (!x.n || xk === nk) return;
      if (self && g.t === self.teacher && g.g === self.group && Number(x.row) === Number(self.row)) return;
      const isFam = !!fam[xk];
      const samePhone = phoneOk && phoneKey_(x.w) === pk;
      if (!isFam && !samePhone) return;
      const bal = Number(x.b) || 0;
      if (bal <= 0) return;
      out.push({ name: x.n, teacher: g.t, teacherFull: g.tf || g.t, group: g.g, groupTitle: g.gt || g.g, balance: bal, paymentRow: Number(x.row), month: month, reason: isFam ? 'семья (по скидке)' : 'возможно, та же семья: тот же WhatsApp', fam: isFam });
    });
  });
  out.sort(function(a, b) { return (b.fam ? 1 : 0) - (a.fam ? 1 : 0); });
  return out;
}

/**
 * Оплатить связанного ученика из остатка той же квитанции.
 * Добавляет amount к его оплате (не больше остатка к оплате) и ставит ту же квитанцию и дату.
 */
function payLinkedFromReceipt(role, password, month, teacherName, groupName, paymentRow, receipt, amount, date) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  amount = Math.round(parseNum_(amount));
  if (!(amount > 0)) return { success: false, error: 'Укажите сумму.' };
  let curPaid, curReceipt, tuition;
  if (cfg.useDb) {
    const c = staffCtxDb_(password, month, teacherName, groupName, role);
    if (c.error) return c.error;
    const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
    if (!r) return { success: false, error: 'В этой строке нет ученика.' };
    curPaid = Math.round(parseNum_(r[RO.paid])); curReceipt = String(r[RO.receipt] || '').trim(); tuition = Math.round(parseNum_(r[RO.tuition]));
  } else {
    const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
    if (ctx.error) return ctx.error;
    curPaid = Math.round(parseNum_(ctx.sheet.getRange(ctx.paymentRow, COL_PAID).getValue())); curReceipt = String(ctx.sheet.getRange(ctx.paymentRow, COL_RECEIPT).getDisplayValue() || '').trim(); tuition = Math.round(parseNum_(ctx.sheet.getRange(ctx.paymentRow, COL_TUITION).getValue()));
  }
  const balance = tuition - curPaid;
  if (balance <= 0) return { success: false, error: 'У ученика нет остатка к оплате.' };
  const take = Math.min(amount, balance);
  let res;
  if (curPaid > 0 && curReceipt && normalizeReceiptNumber_(curReceipt) !== normalizeReceiptNumber_(receipt)) {
    // у ученика уже есть оплата другой квитанцией — это доплата: прежняя квитанция сохраняется, новая дописывается через «; »
    // (раньше здесь была ошибка «внесите доплату вручную», и остаток семейной квитанции повисал)
    res = addPayment(password, month, teacherName, groupName, paymentRow, { amount: take, receipt: receipt, date: date || isoToday_(), receiptTotal: 0 });
  } else {
    res = savePaymentRow(password, month, teacherName, groupName, paymentRow, { paid: curPaid + take, receipt: receipt, date: date || isoToday_() });
  }
  if (!res.success) return res;
  res.taken = take;
  res.message = 'Оплачено ' + take + ' сом по квитанции ' + receipt + '.';
  return res;
}


/**
 * Доплата к частично оплаченной строке: добавляет amount к оплате, новая квитанция дописывается через «; ».
 * Контроль суммы — по новой квитанции.
 */
function addPayment(password, month, teacherName, groupName, paymentRow, payload) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  payload = payload || {};
  const amount = Math.round(parseNum_(payload.amount));
  const receipt = String(payload.receipt || '').trim(), date = String(payload.date || '').trim();
  if (!(amount > 0)) return { success: false, error: 'Укажите сумму доплаты.' };
  if (!receipt) return { success: false, error: 'Укажите номер квитанции (или НАЛИЧНЫЕ).' };
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { success: false, error: 'Укажите дату оплаты.' };
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(20000);
    let name, tuition, paid, oldReceipt, write, linkFn = null;
    if (cfg.useDb) {
      const c = staffCtxDb_(password, month, teacherName, groupName);
      if (c.error) return c.error;
      const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
      if (!r) return { success: false, error: 'В этой строке нет ученика.' };
      name = String(r[RO.name]); tuition = Math.round(parseNum_(r[RO.tuition])); paid = Math.round(parseNum_(r[RO.paid])); oldReceipt = String(r[RO.receipt] || '').trim();
      write = function(newPaid, newRec, addRec, addAmount) { const w0 = Math.round(parseNum_(r[RO.paid])), wr0 = String(r[RO.receipt] || ''), wd0 = String(r[RO.date] || '');
        // разбивка: что было + сколько пришло новой квитанцией
        let base = rcptSplitParse_(r[RO.split]);
        const prevSum = Object.keys(base).reduce(function(a, k) { return a + base[k]; }, 0);
        if (prevSum !== w0) {
          base = {};
          const prev = rcptParseReceiptCell_(wr0);
          if (prev.recs.length === 1 && w0 > 0) base[prev.recs[0]] = w0;
        }
        const ak = normalizeReceiptNumber_(addRec || '');
        if (ak && !isCashMarker_(ak) && addAmount > 0) base[ak] = (base[ak] || 0) + Math.round(addAmount);
        const splitText = Object.keys(base).length ? rcptSplitFormat_(base) : '';
        dbSetCells_(ro.sh, r.rowIndex, { 7: newPaid, 8: newRec, 9: date, 14: nowStamp_(), 18: splitText });
        payStamp_(ro.sh, r, c.role, w0, wr0, wd0, newPaid, newRec, date);
        r[RO.paid] = newPaid; r[RO.receipt] = newRec; r[RO.date] = date; r[RO.split] = splitText;
        const out = rosterPayload_(r, c.group.row); out.studentName = name; return out; };
      // если после доплаты по квитанции остались деньги — кому из семьи их можно зачесть
      linkFn = function() { const st = dbStudents_().byId[String(r[RO.sid])] || []; return linkedStudents_(cfg, month, name, String(st[ST.wa] || ''), { teacher: c.teacher.short, group: c.groupName, row: Number(paymentRow) }); };
    } else {
      const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
      if (ctx.error) return ctx.error;
      const sh = ctx.sheet, row = ctx.paymentRow;
      name = ctx.studentName; tuition = Math.round(parseNum_(sh.getRange(row, COL_TUITION).getValue())); paid = Math.round(parseNum_(sh.getRange(row, COL_PAID).getValue())); oldReceipt = String(sh.getRange(row, COL_RECEIPT).getDisplayValue() || '').trim();
      write = function(newPaid, newRec) { sh.getRange(row, COL_PAID).setValue(newPaid); sh.getRange(row, COL_RECEIPT).setNumberFormat('@').setValue(newRec); const p = date.split('-'); sh.getRange(row, COL_DATE).setValue(new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]))).setNumberFormat('dd.MM.yyyy'); SpreadsheetApp.flush(); const out = readPaymentRow_(sh, row); out.studentName = name; return out; };
    }
    const balance = tuition - paid;
    if (balance <= 0) return { success: false, error: 'У ученика нет остатка к оплате.' };
    if (amount > balance) return { success: false, error: 'Доплата ' + amount + ' сом больше остатка ' + balance + ' сом. Переплату оформляйте через обычное сохранение — она уйдёт в предоплату.' };
    const rc = receiptCheck_(cfg, receipt, amount, payload.receiptTotal, null, name, month);
    if (rc.error) return { success: false, receiptLimit: true, error: rc.error };
    const newRec = oldReceipt && normalizeReceiptNumber_(oldReceipt) !== normalizeReceiptNumber_(receipt) ? oldReceipt + '; ' + receipt : receipt;
    const out = write(paid + amount, newRec, receipt, amount);
    try { rcptSyncOne_(cfg, normalizeReceiptNumber_(receipt)); } catch (e) {}
    out.success = true; out.message = 'Доплата ' + amount + ' сом принята. Оплачено ' + (paid + amount) + ' из ' + tuition + ' сом.'; out.receiptRemaining = Math.max(0, Math.round(rc.remaining || 0)); out.receipt = receipt;
    if (out.receiptRemaining > 0 && linkFn) { try { out.linked = linkFn(); } catch (e) { out.linked = []; } }
    return out;
  } catch (e) {
    return { success: false, error: 'Ошибка: ' + e.message };
  } finally { try { lock.releaseLock(); } catch (e) {} }
}


// ============================================================
// ВКЛАДКА «СКИДКИ» + СЕМЕЙНЫЕ ГРУППЫ ДЛЯ ПОДСКАЗОК
// ============================================================

/** Основа фамилии для сравнения: «Буранбеков» = «Буранбекова», «Бердибек уулу …» → «бердибек» */
function surnameStem_(name) {
  let w = String(name || '').trim().toLowerCase().replace(/ё/g, 'е').split(/\s+/)[0] || '';
  w = w.replace(/(ова|ева|ина|ына)$/, function(m) { return m.slice(0, -1); });
  return w;
}

/**
 * Список скидок и семейных групп для кабинета.
 * items: все активные/ожидающие записи (+ первые дети семей как строки с 0%).
 * families: [{key, first, members:[{name, percent, pos}]}]
 */
// ---------- сообщение семье (состав / расчёт со скидками) ----------
/** Ученик по ФИО в базе текущего месяца: группа, преподаватель, цена, скидка, к оплате, WhatsApp */
function studentInfoByName_(cfg, name) {
  const k = studentKey_(name);
  if (!k) return null;
  if (cfg.useDb) {
    try {
      const groups = dbGroupsOfMonth_(cfg.currentMonth), R = dbTable_(DB_ROSTER, DB_ROSTER_H), S = dbStudents_();
      const gById = {}; groups.forEach(function(g) { if (String(g.row[GR.status]) !== 'скрыта') gById[String(g.row[GR.id])] = g.row; });
      for (let i = 0; i < R.rows.length; i++) {
        const r = R.rows[i]; if (studentKey_(r[RO.name]) !== k) continue;
        const g = gById[String(r[RO.gid])]; if (!g) continue;
        const st = S.byId[String(r[RO.sid])] || [];
        const tcfg = findTeacherCfg_(cfg, g[GR.teacher]) || { short: String(g[GR.teacher]) };
        return { name: String(r[RO.name]), group: 'Группа ' + g[GR.num], teacher: tcfg.short, price: Math.round(parseNum_(g[GR.price])), disc: Math.round(parseNum_(r[RO.disc])), tuition: Math.round(parseNum_(r[RO.tuition])), phone: phoneKey_(st[ST.wa] || '') };
      }
    } catch (e) {}
    return null;
  }
  try {
    const snap = loadSnapshot_(cfg.currentMonth);
    if (snap && snap.groups) for (let i = 0; i < snap.groups.length; i++) { const g = snap.groups[i]; for (let j = 0; j < (g.st || []).length; j++) { const x = g.st[j]; if (studentKey_(x.n) === k) return { name: String(x.n), group: g.gt || g.g, teacher: g.t, price: Math.round(parseNum_(g.price)), disc: Math.round(parseNum_(x.d)), tuition: Math.round(parseNum_(x.t)), phone: phoneKey_(x.wa || x.p || '') }; } }
  } catch (e) {}
  return null;
}
/** Семьи из реестра: {key: {key, first, members:[entries по порядку]}} — та же логика, что во вкладке Скидки */
function familiesFromList_(list) {
  const fams = {};
  list.forEach(function(e) {
    if (!e.famKey) return;
    const k = canonicalFamilyKey_(list, e.famKey);
    if (!fams[k]) {
      const firstEntry = list.filter(function(x) { return x.famKey === k; }).sort(function(a, b) { return (a.famKey === a.basisKey ? 0 : 1) - (b.famKey === b.basisKey ? 0 : 1); })[0];
      fams[k] = { key: k, first: String((firstEntry && firstEntry.famName) || e.famName || '').split(' — ')[0].split(' (')[0].trim(), members: [] };
    }
    e.famCanon = k; fams[k].members.push(e);
  });
  Object.keys(fams).forEach(function(k) { fams[k].members = orderFamilyEntries_(fams[k].members); });
  return fams;
}
function famGenitive_(surname) {
  const w = String(surname || '').trim(), l = w.toLowerCase();
  if (/(ов|ев|ёв|ин|ын)$/.test(l)) return w + 'ых';
  if (/(ова|ева|ёва|ина|ына)$/.test(l)) return w.slice(0, -1) + 'ых';
  return w;
}
function fmtSom_(n) { return String(Math.round(parseNum_(n))).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
/** Текст и получатели семейного сообщения. kind: 'состав' | 'расчёт' */
function familyMessage_(role, password, famKey, kind) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { error: { success: false, error: 'Неверный пароль.' } };
  const list = readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE || e.status === DS_PENDING; });
  const fams = familiesFromList_(list), f = fams[String(famKey || '')];
  if (!f) return { error: { success: false, error: 'Семья не найдена в реестре скидок.' } };
  const msgs = readMessages_(), key = kind === 'расчёт' ? 'СЕМЬЯ_РАСЧЁТ' : 'СЕМЬЯ_СОСТАВ', m = msgs[key];
  if (!m) return { error: { success: false, error: 'В листе СООБЩЕНИЯ нет текста ' + key + '.' } };
  const lang = (m.lang === 'RU' || m.lang === 'KG') ? m.lang : cfg.msgLang;
  const tpl = String(lang === 'RU' ? (m.ru || m.kg) : (m.kg || m.ru)).replace(/\\n/g, '\n');
  // дети по порядку: первый + члены
  const kids = [];
  const fi = studentInfoByName_(cfg, f.first);
  kids.push({ pos: 1, name: f.first, group: fi ? fi.group : '', teacher: fi ? fi.teacher : '', price: fi ? fi.price : 0, percent: 0, tuition: fi ? fi.price : 0, phone: fi ? fi.phone : '', type: '', until: '' });
  f.members.forEach(function(e, i) {
    const d = discountStudentData_(cfg, e), si = studentInfoByName_(cfg, e.student);
    kids.push({ pos: i + 2, name: e.student, group: e.group || (si ? si.group : ''), teacher: e.teacher || (si ? si.teacher : ''), price: d.price || (si ? si.price : 0), percent: e.percent, tuition: e.status === DS_ACTIVE ? d.tuition : (d.price || (si ? si.price : 0)), phone: d.phone || (si ? si.phone : ''), type: e.type === DISCOUNT_TYPES.family ? '' : e.type, until: e.until || '', pending: e.status !== DS_ACTIVE });
  });
  const ordKg = ['', '1-бала', '2-бала', '3-бала', '4-бала', '5-бала', '6-бала', '7-бала'], ordRu = ['', '1-й ребёнок', '2-й ребёнок', '3-й ребёнок', '4-й ребёнок', '5-й ребёнок', '6-й ребёнок', '7-й ребёнок'];
  const ord = function(p) { return (lang === 'RU' ? ordRu : ordKg)[p] || (p + (lang === 'RU' ? '-й' : '-бала')); };
  const where = function(k) { return k.group ? ' (' + k.group + (k.teacher ? ', ' + k.teacher : '') + ')' : ''; };
  const linesPlain = kids.map(function(k) { return '• ' + ord(k.pos) + ' — ' + k.name + where(k); });
  const linesCalc = kids.map(function(k) {
    let d;
    if (k.pos === 1) d = lang === 'RU' ? 'полная стоимость ' + fmtSom_(k.price) + ' сом' : 'толук баасы ' + fmtSom_(k.price) + ' сом';
    else if (k.type) d = (lang === 'RU' ? 'скидка ' + k.percent + '% (' + k.type + (k.until ? ', до ' + k.until : '') + '): ' : 'жеңилдик ' + k.percent + '% (' + k.type + (k.until ? ', ' + k.until + ' чейин' : '') + '): ') + fmtSom_(k.tuition) + ' сом';
    else d = (lang === 'RU' ? 'скидка ' + k.percent + '%: ' : 'жеңилдик ' + k.percent + '%: ') + fmtSom_(k.tuition) + ' сом' + (k.pending ? (lang === 'RU' ? ' (ожидает подтверждения)' : ' (ырастоону күтүүдө)') : '');
    return '• ' + ord(k.pos) + ' — ' + k.name + where(k) + ' — ' + d;
  });
  const full = kids.reduce(function(a, k) { return a + (k.price || 0); }, 0), withDisc = kids.reduce(function(a, k) { return a + (k.tuition || 0); }, 0);
  const n = kids.length, cnt = lang === 'RU' ? (n + ' ' + (n === 1 ? 'ребёнок' : (n >= 2 && n <= 4) ? 'ребёнка' : 'детей')) : (n + ' бала');
  const mm = monthFromName_(cfg.currentMonth), monthRu = mm ? MONTHS_RU_NOM[mm.m - 1] + ' ' + mm.y : cfg.currentMonth, monthKg = mm ? MONTHS_KG[mm.m - 1] + ' ' + mm.y : cfg.currentMonth;
  const famName = famGenitive_(f.first.split(' ')[0]);
  const text = fillTemplate_(tpl, { 'семья': famName, 'кол_детей': cnt, 'дети': linesPlain.join('\n'), 'дети_расчёт': linesCalc.join('\n'), 'итого_полная': fmtSom_(full), 'итого_со_скидкой': fmtSom_(withDisc), 'экономия': fmtSom_(full - withDisc), 'реквизиты': cfg.requisites, 'месяц': monthRu, 'ай': monthKg, 'Ай': monthKg.charAt(0).toUpperCase() + monthKg.slice(1) });
  // получатели: уникальные номера всех детей
  const seen = {}, recipients = [];
  kids.forEach(function(k) { const ph = phoneKey_(k.phone); if (!ph) return; if (!seen[ph]) { seen[ph] = { phone: ph, names: [] }; recipients.push(seen[ph]); } seen[ph].names.push(k.name); });
  const noPhone = kids.filter(function(k) { return !phoneKey_(k.phone); }).map(function(k) { return k.name; });
  return { cfg: cfg, actual: actual, fam: f, famName: famName, kids: kids, text: text, recipients: recipients, noPhone: noPhone, kind: kind, key: key, full: full, withDisc: withDisc };
}
function previewFamilyMessage(role, password, famKey, kind) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const b = familyMessage_(role, password, famKey, kind);
  if (b.error) return b.error;
  return { success: true, family: b.famName, text: b.text, recipients: b.recipients, noPhone: b.noPhone, full: b.full, withDisc: b.withDisc };
}
function sendFamilyMessage(role, password, famKey, kind) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const b = familyMessage_(role, password, famKey, kind);
  if (b.error) return b.error;
  if (!b.recipients.length) return { success: false, error: 'Ни у одного ребёнка семьи не указан WhatsApp.' };
  const who = b.actual === 'director' ? 'руководитель' : 'кассир';
  let ok = 0; const errs = [];
  b.recipients.forEach(function(rc) {
    const r = sendWhatsapp_(rc.phone, b.text);
    logNotification_([new Date(), who, '', 'Семья ' + b.fam.first + ' [' + b.fam.key + ']', rc.phone, 'семья · ' + b.kind, '', r.ok ? 'отправлено' : 'ошибка', r.ok ? b.text.substr(0, 300) : r.error]);
    if (r.ok) ok++; else errs.push(rc.phone + ': ' + r.error);
    Utilities.sleep(500);
  });
  logChanges_(who, '', '', 'Семья ' + b.fam.first, [['Сообщение семье', '', b.kind + ' · получателей: ' + ok]]);
  return { success: ok > 0, sent: ok, error: ok ? '' : ('Не отправлено. ' + errs.join('; ')), message: 'Сообщение семье ' + b.famName + ' отправлено: ' + ok + ' из ' + b.recipients.length + (errs.length ? '. Ошибки: ' + errs.join('; ') : '.') };
}
/** Когда семье последний раз отправляли сообщение: {famKey: 'dd.MM.yyyy HH:mm · вид'} */
function familyLastSent_() {
  const out = {};
  try {
    const ls = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Уведомления');
    if (!ls || ls.getLastRow() < 2) return out;
    const from = Math.max(2, ls.getLastRow() - 3000);
    ls.getRange(from, 1, ls.getLastRow() - from + 1, 8).getValues().forEach(function(r) {
      const t = String(r[5] || ''); if (t.indexOf('семья') !== 0 || String(r[7]) !== 'отправлено') return;
      const mk = String(r[3] || '').match(/\[(.+)\]$/); if (!mk) return;
      out[mk[1]] = (r[0] instanceof Date ? Utilities.formatDate(r[0], TZ, 'dd.MM.yyyy HH:mm') : String(r[0])) + ' · ' + t.replace('семья · ', '');
    });
  } catch (e) {}
  return out;
}

function getDiscountsList(role, password) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  const list = readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE || e.status === DS_PENDING; });
  const fmt = function(d) { return d instanceof Date ? Utilities.formatDate(d, TZ, 'dd.MM.yyyy') : String(d || ''); };
  const fams = {};
  list.forEach(function(e) {
    if (!e.famKey) return;
    const k = canonicalFamilyKey_(list, e.famKey);
    if (!fams[k]) {
      const firstEntry = list.filter(function(x) { return x.famKey === k; }).sort(function(a, b) { return (a.famKey === a.basisKey ? 0 : 1) - (b.famKey === b.basisKey ? 0 : 1); })[0];
      fams[k] = { key: k, first: String((firstEntry && firstEntry.famName) || e.famName || '').split(' — ')[0].split(' (')[0].trim(), members: [] };
    }
    e.famCanon = k;
    fams[k].members.push(e);
  });
  Object.keys(fams).forEach(function(k) { fams[k].members = orderFamilyEntries_(fams[k].members); });
  const items = [];
  Object.keys(fams).forEach(function(k) {
    const f = fams[k];
    items.push({ id: 'first-' + k, student: f.first, group: '', teacher: '', type: DISCOUNT_TYPES.family, cat: 'family', percent: 0, pos: 1, basis: '', famKey: k, comment: 'первый ребёнок семьи — платит полностью', created: '', createdBy: '', status: DS_ACTIVE });
  });
  list.forEach(function(e) {
    let pos = 0;
    const fk = e.famCanon || e.famKey;
    if (fk && fams[fk]) pos = 2 + fams[fk].members.indexOf(e);
    items.push({ id: e.id, student: e.student, group: e.group, teacher: e.teacher, type: e.type, cat: e.type === DISCOUNT_TYPES.family ? 'family' : e.type === DISCOUNT_TYPES.teacher ? 'teacher' : (e.type === DISCOUNT_TYPES.orphan ? 'orphan' : (e.type === DISCOUNT_TYPES.special ? 'special' : 'legacy')),
      percent: e.percent, pos: pos, famPos: e.famPos || 0, famKey: (fk && fams[fk]) ? fk : '', famFirst: (fk && fams[fk]) ? fams[fk].first : '', until: e.until || '', basis: e.type === DISCOUNT_TYPES.family ? ((fk && fams[fk]) ? fams[fk].first : e.basis) : e.basis, comment: e.comment || e.note || '', created: fmt(e.created), createdBy: e.createdBy, status: e.status, month: e.month });
  });
  const lastSent = familyLastSent_();
  const families = Object.keys(fams).map(function(k) {
    const f = fams[k];
    return { key: k, first: f.first, stem: surnameStem_(f.first), lastSent: lastSent[k] || '', members: f.members.map(function(e, i) { return { name: e.student, percent: e.percent, pos: i + 2, group: e.group, stem: surnameStem_(e.student), type: e.type === DISCOUNT_TYPES.family ? '' : e.type, until: e.until || '' }; }) };
  });
  return { success: true, items: items, families: families };
}


/**
 * Уточнение старой скидки (импортированной из журнала без основания): категория, основание, первый ребёнок.
 * payload: {cat:'family'|'teacher'|'orphan'|'special', percent, basisName, basisGroup, basisTeacher, teacher, comment}
 */
function classifyDiscount(role, password, id, payload) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  payload = payload || {};
  const all = readDiscounts_(), e = all.filter(function(x) { return x.id === String(id); })[0];
  if (!e) return { success: false, error: 'Запись о скидке не найдена.' };
  const list = all.filter(function(x) { return x.id !== e.id; });
  const sh = discountSheet_(true);
  const who = actual === 'director' ? 'руководитель' : 'кассир';
  let type, basis = '', basisKey = '', percent = Math.round(parseNum_(payload.percent)) || e.percent, comment = String(payload.comment || '').trim();
  const famPos = famPosFromPayload_(payload);
  if (payload.cat === 'family') {
    type = DISCOUNT_TYPES.family;
    const bn0 = String(payload.basisName || '').trim();
    if (!bn0) return { success: false, error: 'Укажите первого ребёнка семьи.' };
    const rs = resolveFamilyFirst_(list, bn0), bn = rs.first;
    if (rs.key === studentKey_(e.student)) return { success: false, error: 'Первый ребёнок не может совпадать с самим учеником.' };
    if (FAMILY_PERCENTS.indexOf(percent) === -1) percent = 20;
    basis = bn + (!rs.redirected && payload.basisGroup ? ' — ' + payload.basisGroup : '') + (!rs.redirected && payload.basisTeacher ? ' (' + payload.basisTeacher + ')' : ''); basisKey = rs.key;
  } else if (payload.cat === 'teacher') {
    type = DISCOUNT_TYPES.teacher; percent = 50;
    const bt = String(payload.teacher || '').trim();
    if (!bt) return { success: false, error: 'Выберите преподавателя.' };
    basis = bt; basisKey = nameKey_(bt);
    if (actual !== 'director') return { success: false, error: 'Скидку 50% (ребёнок преподавателя) подтверждает руководитель — уточните её из кабинета руководителя.' };
  } else if (payload.cat === 'orphan' || payload.cat === 'special') {
    type = payload.cat === 'orphan' ? DISCOUNT_TYPES.orphan : DISCOUNT_TYPES.special; percent = 100; basis = type;
    if (!comment) return { success: false, error: 'Укажите причину в комментарии.' };
    if (actual !== 'director') return { success: false, error: 'Скидку 100% подтверждает руководитель — уточните её из кабинета руководителя.' };
  } else return { success: false, error: 'Выберите категорию скидки.' };
  let famName = '', famKey = '', until = '';
  if (type !== DISCOUNT_TYPES.family) {
    const fl = famLinkFromPayload_(payload, e.student, list); if (fl.error) return { success: false, error: fl.error };
    const ul = untilFromPayload_(payload); if (ul.error) return { success: false, error: ul.error };
    famName = fl.famName; famKey = fl.famKey; until = ul.until;
  }
  sh.getRange(e.rowIndex, 6, 1, 5).setValues([[percent, type, basis, basisKey, comment]]);
  sh.getRange(e.rowIndex, 19, 1, 4).setValues([[famName, famKey, until, famPos || '']]);
  sh.getRange(e.rowIndex, 17).setValue(new Date());
  sh.getRange(e.rowIndex, 18).setValue('уточнено ' + who + ' ' + Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy'));
  if (e.percent !== percent) {
    const applied = cfg.useDb ? applyDiscountToDb_(cfg, cfg.currentMonth, { student: e.student, percent: percent }) : applyDiscountToJournal_(cfg, cfg.currentMonth, { student: e.student, percent: percent, phone: e.phone });
  }
  logChanges_(who, e.group, '', e.student, [['Скидка уточнена', e.type + ' ' + e.percent + '%', type + ' ' + percent + '%' + (basis ? ' · ' + basis : '')]]);
  try { if (cfg.useDb) applyRegisteredDiscountsDb_(cfg, cfg.currentMonth); } catch (err) {}
  return { success: true, message: 'Скидка уточнена: ' + type + ', ' + percent + '%' + (basis ? ' · ' + basis : '') + '.' + (until ? ' Действует до ' + until + ' включительно.' : '') + (famName ? ' Ученик учтён в составе семьи.' : '') };
}


// ============================================================
// КАБИНЕТЫ, ГРАФИК ЗАНЯТИЙ, НАПОМИНАНИЯ О ЗАНЯТИИ
// ============================================================

const ROOM_SHEET = 'КАБИНЕТЫ';
const ROOM_H = ['Месяц', 'Преподаватель', 'Группа', 'Кабинет', 'Обновлено', 'Ключ'];
function roomSheet_() { return dbSheet_(ROOM_SHEET, ROOM_H, [120, 160, 90, 80, 130, 200]); }
function roomKey_(month, teacherShort, groupName) { return nameKey_(month) + '|' + nameKey_(teacherShort) + '|' + nameKey_(groupName); }
function getRooms_() {
  return cacheGet_('rooms', function() {
    const sh = roomSheet_(), out = {};
    if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, ROOM_H.length).getValues().forEach(function(r, i) { if (r[5]) out[String(r[5])] = { room: String(r[3] || '').trim(), rowIndex: i + 2 }; });
    return out;
  });
}
function getRoom_(month, teacherShort, groupName) { const e = getRooms_()[roomKey_(month, teacherShort, groupName)]; return e ? e.room : ''; }
function setRoom_(month, teacherShort, groupName, room) {
  cacheDrop_('rooms');
  const sh = roomSheet_(), key = roomKey_(month, teacherShort, groupName), e = getRooms_()[key];
  if (e) sh.getRange(e.rowIndex, 4, 1, 2).setValues([[room, new Date()]]);
  else sh.appendRow([month, teacherShort, groupName, room, new Date(), key]);
  cacheDrop_('rooms');
}

/** «Пн - Ср - Пт» → [1,3,5] (Пн=1 … Вс=7) */
function parseDays_(str) {
  const map = { 'пн': 1, 'вт': 2, 'ср': 3, 'чт': 4, 'пт': 5, 'сб': 6, 'вс': 7 };
  const out = [];
  String(str || '').toLowerCase().split(/[^а-яё]+/).forEach(function(t) { const k = t.slice(0, 2); if (map[k] !== undefined && out.indexOf(map[k]) === -1) out.push(map[k]); });
  return out;
}
/** «16.30 - 17.30» / «8:30-9:50» → {start, end} в минутах */
function parseTime_(str) {
  const m = String(str || '').match(/(\d{1,2})[.:](\d{2})\s*[-–—]\s*(\d{1,2})[.:](\d{2})/);
  if (!m) return null;
  return { start: Number(m[1]) * 60 + Number(m[2]), end: Number(m[3]) * 60 + Number(m[4]) };
}
function timesOverlap_(a, b) { return !!(a && b && a.start < b.end && b.start < a.end); }

/** Все группы месяца с днями/временем/кабинетом (из снимка + КАБИНЕТЫ) */
function scheduleGroups_(cfg, month) {
  const snap = loadSnapshot_(month) || { groups: [] };
  const rooms = getRooms_();
  return (snap.groups || []).filter(function(g) { return g.n > 0; }).map(function(g) {
    const r = rooms[roomKey_(month, g.t, g.g)];
    return { teacher: g.t, teacherFull: g.tf || g.t, group: g.g, title: g.gt || g.g, level: g.lvl || '', days: g.days || '', time: g.time || '', n: g.n, room: r ? r.room : '', dayNums: parseDays_(g.days), t: parseTime_(g.time) };
  });
}

/** Конфликты кабинета: те же дни, пересекающееся время, тот же кабинет, другая группа */
function roomConflicts_(cfg, month, teacherShort, groupName, room, days, time) {
  const out = [];
  if (!room) return out;
  const myDays = parseDays_(days), myT = parseTime_(time);
  if (!myDays.length || !myT) return out;
  scheduleGroups_(cfg, month).forEach(function(g) {
    if (nameKey_(g.teacher) === nameKey_(teacherShort) && nameKey_(g.group) === nameKey_(groupName)) return;
    if (String(g.room) !== String(room)) return;
    const common = g.dayNums.filter(function(d) { return myDays.indexOf(d) !== -1; });
    if (!common.length || !timesOverlap_(myT, g.t)) return;
    out.push({ teacher: g.teacher, teacherFull: g.teacherFull, group: g.group, title: g.title, days: g.days, time: g.time, room: g.room, commonDays: common.map(function(d) { return ['', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][d]; }).join(', ') });
  });
  return out;
}

function setRoomChecked_(cfg, month, teacherShort, groupName, room, days, time) {
  if (room && cfg.rooms.indexOf(room) === -1) return { error: 'Кабинет «' + room + '» не входит в список кабинетов (НАСТРОЙКИ → КАБИНЕТЫ).' };
  if (room) {
    if (!parseTime_(time) || !parseDays_(days).length) {
      if (time && days && !/не назнач/i.test(time) && !/не назнач/i.test(days)) return { error: 'Не удалось разобрать дни или время («' + days + '», «' + time + '») — проверка кабинета невозможна. Формат: «Пн - Ср - Пт», «16.30 - 17.30».' };
    }
    const conf = roomConflicts_(cfg, month, teacherShort, groupName, room, days, time);
    if (conf.length) {
      const c = conf[0];
      return { error: 'Кабинет ' + room + ' в это время занят: ' + c.teacherFull + ' — ' + c.title + ' (' + c.days + ', ' + c.time + '; совпадают: ' + c.commonDays + '). Выберите другой кабинет или время.', conflicts: conf };
    }
  }
  setRoom_(month, teacherShort, groupName, room);
  return { ok: true };
}

/** График занятий центра (вкладка «График») */
function getSchedule(role, password, month) {
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const groups = scheduleGroups_(cfg, month);
  groups.forEach(function(g) { g.conflict = false; });
  for (let i = 0; i < groups.length; i++) for (let j = i + 1; j < groups.length; j++) {
    const a = groups[i], b = groups[j];
    if (!a.room || a.room !== b.room || !a.t || !b.t) continue;
    if (a.dayNums.some(function(d) { return b.dayNums.indexOf(d) !== -1; }) && timesOverlap_(a.t, b.t)) { a.conflict = true; b.conflict = true; }
  }
  return { success: true, month: month, rooms: cfg.rooms, groups: groups.map(function(g) { return { teacher: g.teacher, teacherFull: g.teacherFull, group: g.group, title: g.title, level: g.level, days: g.days, time: g.time, n: g.n, room: g.room, dayNums: g.dayNums, start: g.t ? g.t.start : null, end: g.t ? g.t.end : null, conflict: g.conflict }; }) };
}

// ---------- напоминания о занятии ----------
/** ЗАПУСТИТЬ ОДИН РАЗ: ежедневный триггер напоминаний в ЧАС_НАПОМИНАНИЯ (Бишкек) */
function createRemindersTrigger() {
  const cfg = getConfig_();
  ScriptApp.getProjectTriggers().forEach(function(t) { if (t.getHandlerFunction() === 'lessonReminders') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('lessonReminders').timeBased().everyDays(1).atHour(cfg.remindHour).nearMinute(5).inTimezone('Asia/Bishkek').create();
  const msg = 'Триггер напоминаний установлен: ежедневно около ' + cfg.remindHour + ':05 (Бишкек). Рассылка идёт только при НАПОМИНАНИЯ_О_ЗАНЯТИИ = ДА.';
  Logger.log(msg); return msg;
}

// ---------- режимы напоминаний (общий ВКЛ/ВЫКЛ + свой у группы) ----------
const RMODE_SHEET = 'РЕЖИМЫ_НАПОМИНАНИЙ';
const RMODE_H = ['Месяц', 'Преподаватель', 'Группа', 'Режим', 'Кем', 'Обновлено', 'Ключ'];
function rmodeSheet_() { return dbSheet_(RMODE_SHEET, RMODE_H, [120, 160, 90, 90, 120, 130, 200]); }
function groupReminderModes_() {
  return cacheGet_('rmodes', function() {
    const sh = rmodeSheet_(), out = {};
    if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, RMODE_H.length).getValues().forEach(function(r) { if (r[6]) out[String(r[6])] = String(r[3] || '').trim() === 'on' ? 'on' : 'off'; });
    return out;
  });
}
/** Действующий режим напоминаний группы: своя настройка, иначе общая (НАПОМИНАНИЯ_О_ЗАНЯТИИ) */
function reminderModeFor_(cfg, month, teacherShort, groupName, modes) {
  modes = modes || groupReminderModes_();
  const k = roomKey_(month, teacherShort, groupName);
  if (modes[k]) return modes[k];
  return cfg.remindersOn ? 'on' : 'off';
}
function clearGroupReminderModes_() { const sh = rmodeSheet_(); if (sh.getLastRow() >= 2) sh.deleteRows(2, sh.getLastRow() - 1); cacheDrop_('rmodes'); }
/** Есть ли кому напоминать: общий ВКЛ или хотя бы одна группа со своим ВКЛ */
function remindersAnyOn_(cfg) {
  if (cfg.remindersOn) return true;
  try { const m = groupReminderModes_(); return Object.keys(m).some(function(k) { return m[k] === 'on'; }); } catch (e) { return false; }
}
/** Сколько групп месяца занимаются сегодня (режим БАЗА) */
function groupsTodayCount_(month) {
  try { const t = isoToday_(); return dbGroupsOfMonth_(month).filter(function(g) { return String(g.row[GR.status]) !== 'скрыта' && groupDates_(g.row).indexOf(t) !== -1; }).length; } catch (e) { return null; }
}
function ensureRemindersTrigger_() {
  const has = ScriptApp.getProjectTriggers().some(function(t) { return t.getHandlerFunction() === 'lessonReminders'; });
  if (!has) { try { createRemindersTrigger(); return ' Ежедневный триггер установлен.'; } catch (e) { return ' Не удалось установить триггер: ' + e.message; } }
  return '';
}
/** Общий переключатель напоминаний (пишет НАПОМИНАНИЯ_О_ЗАНЯТИИ). mode: 'on' | 'off'; applyAll — сбросить режимы групп */
function setReminderMode(role, password, mode, applyAll) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const on = String(mode || '') === 'on';
  if (applyAll === true || String(applyAll) === 'true') clearGroupReminderModes_();
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
  if (!sh) return { success: false, error: 'Лист НАСТРОЙКИ не найден.' };
  let done = false;
  if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) {
    if (String(r[0]).trim() === 'НАПОМИНАНИЯ_О_ЗАНЯТИИ') { sh.getRange(i + 2, 2).setNumberFormat('@').setValue(on ? 'ДА' : 'НЕТ'); done = true; }
  });
  if (!done) sh.appendRow(['НАПОМИНАНИЯ_О_ЗАНЯТИИ', on ? 'ДА' : 'НЕТ', 'ДА — утром в день занятия родителям уходит напоминание (текст НАПОМИНАНИЕ_ЗАНЯТИЕ в листе СООБЩЕНИЯ)']);
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  const triggerInfo = on ? ensureRemindersTrigger_() : '';
  const who = actual === 'director' ? 'руководитель' : 'кассир';
  logChanges_(who, 'все группы', '', '(напоминания о занятии)', [['Напоминания о занятии', '', on ? 'ВКЛ' : 'ВЫКЛ']]);
  return { success: true, on: on, message: on ? 'Напоминания ВКЛ: утром в день занятия (около ' + cfg.remindHour + ':05 по Бишкеку) родители всех групп получат напоминание.' + triggerInfo : 'Напоминания ВЫКЛ: автоматическая рассылка напоминаний о занятии остановлена для всех групп.' };
}
/** Режим напоминаний только для данной группы. mode: 'on' | 'off' */
function setGroupReminderMode(role, password, month, teacherName, groupName, mode) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const t = findTeacherCfg_(cfg, teacherName) || { short: String(teacherName || '') };
  groupName = String(groupName || '').trim();
  const on = String(mode) === 'on';
  const sh = rmodeSheet_(), key = roomKey_(month, t.short, groupName);
  let rowIndex = 0;
  if (sh.getLastRow() >= 2) sh.getRange(2, 7, sh.getLastRow() - 1, 1).getValues().forEach(function(r, i) { if (String(r[0]) === key) rowIndex = i + 2; });
  const who = actual === 'director' ? 'руководитель' : 'кассир';
  if (String(mode) === 'inherit') {   // «как у всех»: снять свою настройку группы
    if (rowIndex) sh.deleteRow(rowIndex);
    cacheDrop_('rmodes');
    logChanges_(who, groupName, '', '(напоминания о занятии)', [['Напоминания о занятии', '', 'как у всех (' + (cfg.remindersOn ? 'ВКЛ' : 'ВЫКЛ') + ')']]);
    return { success: true, on: cfg.remindersOn, own: false, message: groupName + ' (' + t.short + ') снова следует общему режиму: ' + (cfg.remindersOn ? 'ВКЛ' : 'ВЫКЛ') + '.' };
  }
  if (rowIndex) sh.getRange(rowIndex, 4, 1, 3).setValues([[on ? 'on' : 'off', who, new Date()]]);
  else sh.appendRow([month, t.short, groupName, on ? 'on' : 'off', who, new Date(), key]);
  cacheDrop_('rmodes');
  if (on) { try { ensureRemindersTrigger_(); } catch (e) {} }
  logChanges_(who, groupName, '', '(напоминания о занятии)', [['Напоминания о занятии', '', on ? 'ВКЛ' : 'ВЫКЛ']]);
  return { success: true, on: on, own: true, message: (on ? 'ВКЛ' : 'ВЫКЛ') + ' — напоминания только для ' + groupName + ' (' + t.short + '). Общий режим не изменён.' };
}
/** Кнопка администратора «Напомнить сейчас»: разослать напоминание ученикам группы, у которой сегодня занятие (повторно в тот же день не дублирует) */
function sendRemindersNow(role, password, month, teacherName, groupName) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const t = findTeacherCfg_(cfg, teacherName) || { short: String(teacherName || '') };
  const r = runLessonReminders_({ month: month, only: { teacher: t.short, group: String(groupName || '').trim() }, who: actual === 'director' ? 'руководитель' : 'кассир' });
  if (r.error) return { success: false, error: r.error };
  if (!r.groups) return { success: false, error: 'У этой группы сегодня нет занятия — напоминание не отправляется.' };
  if (!r.total && !r.skipped) return { success: false, error: 'В группе нет учеников с номером WhatsApp.' };
  return { success: true, sent: r.total, skipped: r.skipped, message: 'Напоминание отправлено: ' + r.total + (r.skipped ? ' · уже получали сегодня: ' + r.skipped : '') + '.' };
}

/** Напоминания родителям: всем ученикам групп, у которых сегодня занятие (один раз в день на ученика). Триггер. */
function lessonReminders() {
  const cfg = getConfig_();
  if (!remindersAnyOn_(cfg)) { Logger.log('Напоминания выключены (НАПОМИНАНИЯ_О_ЗАНЯТИИ = НЕТ и нет групп с режимом ВКЛ).'); return; }
  runLessonReminders_({});
}
/** opts: {month, only:{teacher,group} — одна группа без учёта режима, who} */
function runLessonReminders_(opts) {
  opts = opts || {};
  const cfg = getConfig_();
  const month = opts.month || cfg.currentMonth, todayIso = isoToday_();
  const modes = groupReminderModes_();
  const only = opts.only || null;
  const okGroup = function(teacherShort, groupName) {
    if (only) return nameKey_(teacherShort) === nameKey_(only.teacher) && nameKey_(groupName) === nameKey_(only.group);
    return reminderModeFor_(cfg, month, teacherShort, groupName, modes) === 'on';
  };
  const msgs = readMessages_(), m = msgs['НАПОМИНАНИЕ_ЗАНЯТИЕ'];
  if (!m) { Logger.log('Нет текста НАПОМИНАНИЕ_ЗАНЯТИЕ'); return { error: 'Нет текста НАПОМИНАНИЕ_ЗАНЯТИЕ в листе СООБЩЕНИЯ.' }; }
  const lang = (m.lang === 'RU' || m.lang === 'KG') ? m.lang : cfg.msgLang;
  const tpl = String(lang === 'RU' ? (m.ru || m.kg) : (m.kg || m.ru)).replace(/\\n/g, '\n');
  const sent = {};
  try {
    const ls = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Уведомления');
    if (ls && ls.getLastRow() >= 2) {
      const from = Math.max(2, ls.getLastRow() - 2000);
      ls.getRange(from, 1, ls.getLastRow() - from + 1, 9).getValues().forEach(function(r) {
        if (!(r[0] instanceof Date) || Utilities.formatDate(r[0], TZ, 'yyyy-MM-dd') !== todayIso) return;
        if (String(r[5] || '').indexOf('напоминание') === 0 && String(r[7]) === 'отправлено') sent[nameKey_(r[1]) + '|' + nameKey_(r[2]) + '|' + studentKey_(r[3])] = true;
      });
    }
  } catch (e) {}
  const rooms = getRooms_();
  const fd = fullDateText_(new Date(), '');
  let total = 0, skipped = 0;
  const groupsToday = [];
  if (cfg.useDb) {
    dbGroupsOfMonth_(month).forEach(function(g) {
      if (String(g.row[GR.status]) === 'скрыта') return;
      if (groupDates_(g.row).indexOf(todayIso) === -1) return;
      const tcfg = findTeacherCfg_(cfg, g.row[GR.teacher]) || { short: String(g.row[GR.teacher]), full: '' };
      if (!okGroup(tcfg.short, 'Группа ' + g.row[GR.num])) return;
      const ro = dbRosterOfGroup_(String(g.row[GR.id])), S = dbStudents_();
      groupsToday.push({ teacher: tcfg.short, teacherFull: tcfg.full || tcfg.short, group: 'Группа ' + g.row[GR.num], meta: groupMetaDb_(g.row, tcfg),
        students: ro.rows.map(function(r) { const st = S.byId[String(r[RO.sid])] || []; return { name: String(r[RO.name]), phone: String(st[ST.wa] || '') }; }) });
    });
  } else {
    getJournalsForMonth_(cfg, month).forEach(function(j) {
      if (!j.attendanceId) return;
      let ss; try { ss = SpreadsheetApp.openById(j.attendanceId); } catch (e) { return; }
      const tcfg = findTeacherCfg_(cfg, j.teacher) || { short: j.teacher, full: '' };
      for (let g = 1; g <= 10; g++) {
        const sh = ss.getSheetByName('Группа ' + g); if (!sh || isHidden_(sh)) continue;
        const vals = sh.getRange('A1:U29').getValues(), disp = sh.getRange('A1:U29').getDisplayValues(), tz = sheetTz_(sh);
        let has = false;
        for (let k = 0; k < 12; k++) { const v = vals[ATT_DATES_ROW - 1][ATT_FIRST_COL - 1 + k]; if (v instanceof Date && Utilities.formatDate(v, tz, 'yyyy-MM-dd') === todayIso) { has = true; break; } }
        if (!has) continue;
        if (!okGroup(tcfg.short, 'Группа ' + g)) continue;
        const students = [];
        for (let i = 0; i < 16; i++) { const n = String(disp[13 + i][1] || '').trim(); if (n) students.push({ name: n, phone: String(disp[13 + i][16] || '').trim() }); }
        groupsToday.push({ teacher: tcfg.short, teacherFull: tcfg.full || tcfg.short, group: 'Группа ' + g, meta: groupMetaFromGrid_(disp, g, sh), students: students });
      }
    });
  }
  groupsToday.forEach(function(gr) {
    const room = (rooms[roomKey_(month, gr.teacher, gr.group)] || {}).room || '';
    gr.students.forEach(function(st) {
      if (!st.phone) return;
      const key = nameKey_(gr.teacher) + '|' + nameKey_(gr.group) + '|' + studentKey_(st.name);
      if (sent[key]) { skipped++; return; }
      const text = fillTemplate_(tpl, { 'ученик': st.name, 'дата': fd.date, 'дата_кг': fd.dateKg, 'день': fd.weekday, 'день_кг': fd.weekdayKg, 'время': gr.meta.time && !/не назнач/i.test(gr.meta.time) ? gr.meta.time : '', 'группа': gr.meta.title, 'уровень': gr.meta.level, 'преподаватель': gr.teacherFull, 'преподаватель_ио': nameWithoutSurname_(gr.teacherFull), 'кабинет': room });
      const r = sendWhatsapp_(st.phone, text);
      logNotification_([new Date(), gr.teacher, gr.group, st.name, st.phone, only ? 'напоминание · ' + (opts.who || 'вручную') : 'напоминание · авто', '', r.ok ? 'отправлено' : 'ошибка', r.ok ? text.substr(0, 300) : r.error]);
      if (r.ok) total++;
      Utilities.sleep(700);
    });
  });
  Logger.log('Напоминания за ' + todayIso + ': отправлено ' + total + ' (групп с занятием: ' + groupsToday.length + ').');
  return { total: total, skipped: skipped, groups: groupsToday.length };
}


// ============================================================
// ОТСРОЧКИ ОПЛАТЫ (уведомления не уходят до указанной даты включительно)
// ============================================================
const DEFER_SHEET = 'ОТСРОЧКИ';
const DEFER_H = ['Месяц', 'Преподаватель', 'Группа', 'Ученик', 'До даты', 'Примечание', 'Кем', 'Создана', 'Ключ'];
function deferSheet_() { return dbSheet_(DEFER_SHEET, DEFER_H, [120, 160, 90, 220, 100, 220, 120, 130, 220]); }
function deferKey_(month, teacherShort, groupName, name) { return nameKey_(month) + '|' + nameKey_(teacherShort) + '|' + nameKey_(groupName) + '|' + studentKey_(name); }
/** {ключ ученика: {until:'yyyy-mm-dd', note, rowIndex}} для группы месяца */
function deferralsFor_(month, teacherShort, groupName) {
  const prefix = nameKey_(month) + '|' + nameKey_(teacherShort) + '|' + nameKey_(groupName) + '|';
  const out = cacheGet_('defer:' + prefix, function() {
    const sh = deferSheet_(), o = {};
    if (sh.getLastRow() < 2) return o;
    sh.getRange(2, 1, sh.getLastRow() - 1, DEFER_H.length).getValues().forEach(function(r, i) {
      const k = String(r[8] || ''); if (k.indexOf(prefix) !== 0) return;
      const until = r[4] instanceof Date ? Utilities.formatDate(r[4], TZ, 'yyyy-MM-dd') : String(r[4] || '').trim();
      if (!until) return;
      o[k.slice(prefix.length)] = { until: until, note: String(r[5] || ''), rowIndex: i + 2, by: String(r[6] || '') };
    });
    return o;
  });
  out.__excl = exclusionsFor_(month, teacherShort, groupName);
  return out;
}

/** Установить или снять отсрочку (until = 'yyyy-mm-dd' или '' для снятия) */
function setDeferral(role, password, month, teacherName, groupName, paymentRow, until, note) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  until = String(until || '').trim(); note = String(note || '').trim();
  if (until && !/^\d{4}-\d{2}-\d{2}$/.test(until)) return { success: false, error: 'Неверная дата.' };
  if (until && until < isoToday_()) return { success: false, error: 'Дата отсрочки уже прошла.' };
  let name, phone, balance, tshort;
  if (cfg.useDb) {
    const c = staffCtxDb_(password, month, teacherName, groupName, role);
    if (c.error) return c.error;
    const ro = dbRosterOfGroup_(c.gid), r = rosterByPayRow_(ro, paymentRow);
    if (!r) return { success: false, error: 'В этой строке нет ученика.' };
    const st = dbStudents_().byId[String(r[RO.sid])] || [];
    name = String(r[RO.name]); phone = String(st[ST.wa] || ''); balance = Math.round(parseNum_(r[RO.tuition])) - Math.round(parseNum_(r[RO.paid])); tshort = c.teacher.short; month = c.month;
  } else {
    const ctx = openAdminPaymentRow_(password, month, teacherName, groupName, paymentRow);
    if (ctx.error) return ctx.error;
    name = ctx.studentName; phone = String(ctx.sheet.getRange(14 + (ctx.paymentRow - PAY_FIRST_ROW), 17).getDisplayValue() || '').trim();
    balance = balanceOf_(ctx.sheet.getRange(ctx.paymentRow, COL_TUITION).getValue(), ctx.sheet.getRange(ctx.paymentRow, COL_PAID).getValue()); tshort = ctx.teacher.short; month = ctx.month;
  }
  cacheDrop_('defer:' + nameKey_(month) + '|' + nameKey_(tshort) + '|' + nameKey_(groupName) + '|');
  const sh = deferSheet_(), key = deferKey_(month, tshort, groupName, name), map = deferralsFor_(month, tshort, groupName), ex = map[studentKey_(name)];
  const who = actual === 'director' ? 'руководитель' : 'кассир';
  const related = deferralRelated_(cfg, month, name, phone);
  if (!until) {
    if (ex) sh.deleteRow(ex.rowIndex);
    cacheDrop_('defer:' + nameKey_(month) + '|' + nameKey_(tshort) + '|' + nameKey_(groupName) + '|');
    related.forEach(function(x) { deferralWrite_(month, x.teacher, x.group, x.name, '', '', who); logChanges_(who, x.group, '', x.name, [['Отсрочка оплаты', '', 'снята вместе с ' + name + ' (' + x.why + ')']]); });
    logChanges_(who, groupName, '', name, [['Отсрочка оплаты', ex ? 'до ' + ex.until : '', 'снята']]);
    return { success: true, removed: true, related: related, message: 'Отсрочка снята — уведомления пойдут в обычном режиме.' + (related.length ? ' Снята также у: ' + related.map(function(x) { return x.name + ' (' + x.group + ')'; }).join(', ') + '.' : '') };
  }
  const p = until.split('-'), d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  if (ex) sh.getRange(ex.rowIndex, 5, 1, 4).setValues([[d, note, who, new Date()]]);
  else sh.appendRow([month, tshort, groupName, name, d, note, who, new Date(), key]);
  try { sh.getRange(ex ? ex.rowIndex : sh.getLastRow(), 5).setNumberFormat('dd.MM.yyyy'); } catch (e) {}
  cacheDrop_('defer:' + nameKey_(month) + '|' + nameKey_(tshort) + '|' + nameKey_(groupName) + '|');
  logChanges_(who, groupName, '', name, [['Отсрочка оплаты', ex ? 'до ' + ex.until : '', 'до ' + until + (note ? ' · ' + note : '')]]);
  related.forEach(function(x) { deferralWrite_(month, x.teacher, x.group, x.name, until, (note ? note + ' · ' : '') + 'вместе с ' + name + ' (' + x.why + ')', who); logChanges_(who, x.group, '', x.name, [['Отсрочка оплаты', '', 'до ' + until + ' · вместе с ' + name + ' (' + x.why + ')']]); });
  const relNote = related.length ? ' Отсрочка распространена на всю семью: ' + related.map(function(x) { return x.name + ' (' + x.group + ', ' + x.teacher + ')'; }).join(', ') + ' — уведомления об оплате им тоже не уйдут.' : '';
  return { success: true, until: until, name: name, phone: phone, balance: Math.max(balance, 0), related: related, message: 'Отсрочка до ' + until.split('-').reverse().join('.') + ' сохранена: уведомления об оплате не уйдут до этой даты включительно.' + relNote };
}

/** Дети той же семьи (реестр скидок) и ученики с тем же WhatsApp родителя — во всех группах месяца, кроме самого ученика */
function deferralRelated_(cfg, month, name, phone) {
  const out = [], seen = {}; seen[studentKey_(name)] = 1;
  if (!cfg.useDb) return out;
  const fam = {};
  try { const fams = familiesFromList_(readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE; })); Object.keys(fams).forEach(function(k) { const f = fams[k], names = [f.first].concat(f.members.map(function(e) { return e.student; })); if (names.some(function(n) { return studentKey_(n) === studentKey_(name); })) names.forEach(function(n) { fam[studentKey_(n)] = 1; }); }); } catch (e) {}
  const ph = phoneKey_(phone || '');
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H), S = dbStudents_(), gById = {};
  dbGroupsOfMonth_(month).forEach(function(g) { if (String(g.row[GR.status]) !== 'скрыта') gById[String(g.row[GR.id])] = g.row; });
  R.rows.forEach(function(r) {
    const g = gById[String(r[RO.gid])]; if (!g) return;
    const k = studentKey_(r[RO.name]); if (seen[k]) return;
    const st = S.byId[String(r[RO.sid])] || [], sp = phoneKey_(st[ST.wa] || '');
    if (!(fam[k] || (ph && sp && sp === ph))) return;
    seen[k] = 1;
    const t = findTeacherCfg_(cfg, g[GR.teacher]) || { short: String(g[GR.teacher]) };
    out.push({ name: String(r[RO.name]), teacher: t.short, group: 'Группа ' + g[GR.num], why: fam[k] ? 'семья' : 'общий WhatsApp', tuition: Math.round(parseNum_(r[RO.tuition])), paid: Math.round(parseNum_(r[RO.paid])) });
  });
  return out;
}
/** Поставить/снять отсрочку одной строкой в листе ОТСРОЧКИ без проверок (для распространения на семью) */
function deferralWrite_(month, tshort, groupName, name, until, note, who) {
  const sh = deferSheet_(), key = deferKey_(month, tshort, groupName, name);
  let ex = null; if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, DEFER_H.length).getValues().forEach(function(r, i) { if (String(r[8]) === key) ex = { rowIndex: i + 2 }; });
  cacheDrop_('defer:' + nameKey_(month) + '|' + nameKey_(tshort) + '|' + nameKey_(groupName) + '|');
  if (!until) { if (ex) sh.deleteRow(ex.rowIndex); return; }
  const p = until.split('-'), d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  if (ex) sh.getRange(ex.rowIndex, 5, 1, 4).setValues([[d, note, who, new Date()]]);
  else sh.appendRow([month, tshort, groupName, name, d, note, who, new Date(), key]);
  try { sh.getRange(ex ? ex.rowIndex : sh.getLastRow(), 5).setNumberFormat('dd.MM.yyyy'); } catch (e) {}
}
function deferMessage_(cfg, month, name, until, balance, note) {
  const msgs = readMessages_(), m = msgs['ОТСРОЧКА_ОПЛАТЫ'];
  if (!m) return null;
  const lang = (m.lang === 'RU' || m.lang === 'KG') ? m.lang : cfg.msgLang;
  const tpl = String(lang === 'RU' ? (m.ru || m.kg) : (m.kg || m.ru)).replace(/\\n/g, '\n');
  const mm = monthFromName_(month), p = until.split('-');
  const fd = fullDateText_(new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])), '');
  return fillTemplate_(tpl, { 'ученик': name, 'ай': mm ? MONTHS_KG[mm.m - 1] : month, 'месяц': mm ? MONTHS_RU_NOM[mm.m - 1] + ' ' + mm.y : month, 'остаток': String(balance), 'дата': fd.date, 'дата_кг': fd.dateKg, 'реквизиты': cfg.requisites, 'примечание': note || '' });
}
function previewDeferMessage(role, password, month, name, phone, until, balance, note) {
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  if (!phone) return { success: false, error: 'У ученика не указан WhatsApp родителя.' };
  const text = deferMessage_(cfg, month, name, until, balance, note);
  if (!text) return { success: false, error: 'В листе СООБЩЕНИЯ нет текста ОТСРОЧКА_ОПЛАТЫ.' };
  return { success: true, text: text, phone: phone, student: name };
}
function sendDeferMessage(role, password, month, name, phone, until, balance, note) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const text = deferMessage_(cfg, month, name, until, balance, note);
  if (!text) return { success: false, error: 'В листе СООБЩЕНИЯ нет текста ОТСРОЧКА_ОПЛАТЫ.' };
  const r = sendWhatsapp_(phone, text);
  logNotification_([new Date(), '', '', name, phone, 'отсрочка до ' + until + ' · ' + (actual === 'director' ? 'руководитель' : 'кассир'), '', r.ok ? 'отправлено' : 'ошибка', r.ok ? text.substr(0, 300) : r.error]);
  if (!r.ok) return { success: false, error: r.error };
  return { success: true, message: 'Сообщение об отсрочке отправлено родителю ' + name + ' (' + phone + ').' };
}


/**
 * Преподаватель выбирает кабинет группы. До КАБИНЕТ_СВОБОДНО_ДО — сохраняется сразу (с проверкой пересечений),
 * после — уходит заявка администратору (пересечение проверяется и при подаче заявки).
 */
function setTeacherRoom(teacherName, password, groupName, room, month) {
  const cfg = getConfig_();
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;
  month = String(month || '').trim() || cfg.currentMonth;
  groupName = String(groupName || '').trim(); room = String(room || '').trim();
  if (!isValidGroupName_(groupName)) return { success: false, error: 'Неверная группа.' };
  if (room && cfg.rooms.indexOf(room) === -1) return { success: false, error: 'Кабинет «' + room + '» не входит в список кабинетов.' };
  // текущие дни/время группы
  let days = '', time = '';
  if (cfg.useDb) { const g = dbGroup_(month, auth.teacher.name, groupName); if (!g) return { success: false, error: 'Группа не найдена.' }; days = String(g.row[GR.days] || ''); time = String(g.row[GR.time] || ''); }
  else { const ctx = teacherContext_(teacherName, password, groupName, month); if (ctx.error) return ctx.error; const m = groupMetaFromGrid_(ctx.sheet.getRange('A1:U29').getDisplayValues(), Number(groupName.replace(/\D/g, '')), ctx.sheet); days = m.days; time = m.time; }
  const cur = getRoom_(month, auth.teacher.name, groupName);
  if (cur === room) return { success: true, room: room, message: 'Кабинет не изменился.' };
  if (room) {
    const conf = roomConflicts_(cfg, month, auth.teacher.name, groupName, room, days, time);
    if (conf.length) { const c = conf[0]; return { success: false, error: 'Кабинет ' + room + ' в это время занят: ' + c.teacherFull + ' — ' + c.title + ' (' + c.days + ', ' + c.time + '). Выберите другой.', conflicts: conf }; }
  }
  const free = isoToday_() <= cfg.roomFreeUntil;
  if (free) {
    setRoom_(month, auth.teacher.name, groupName, room);
    logChanges_(auth.teacher.name, groupName, '', '(кабинет)', [['Кабинет', cur || '—', room || '—']]);
    return { success: true, room: room, message: room ? 'Кабинет ' + room + ' закреплён за группой.' : 'Кабинет снят.' };
  }
  const req = createRequest_('кабинет', auth.teacher.name, month, groupName, '', cur ? 'кабинет ' + cur : '—', room ? 'кабинет ' + room : '—', JSON.stringify({ room: room, days: days, time: time }));
  return { success: true, pending: true, request: req, room: cur, message: 'Заявка на смену кабинета отправлена руководителю. Кабинет изменится после подтверждения.' };
}


// ============================================================
// РЕЖИМ УВЕДОМЛЕНИЙ ПО ГРУППАМ (АВТО / ВРУЧНУЮ для конкретного журнала)
// ============================================================
const NMODE_SHEET = 'РЕЖИМЫ_УВЕДОМЛЕНИЙ';
const NMODE_H = ['Месяц', 'Преподаватель', 'Группа', 'Режим', 'Кем', 'Обновлено', 'Ключ'];
function nmodeSheet_() { return dbSheet_(NMODE_SHEET, NMODE_H, [120, 160, 90, 90, 120, 130, 200]); }
function groupNoticeModes_() {
  return cacheGet_('nmodes', function() {
    const sh = nmodeSheet_(), out = {};
    if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, NMODE_H.length).getValues().forEach(function(r, i) { if (r[6]) out[String(r[6])] = String(r[3] || '').trim() === 'auto' ? 'auto' : 'manual'; });
    return out;
  });
}
/** Действующий режим группы: своя настройка, иначе общая (АВТО_УВЕДОМЛЕНИЯ) */
function noticeModeFor_(cfg, month, teacherShort, groupName, modes) {
  modes = modes || groupNoticeModes_();
  const k = roomKey_(month, teacherShort, groupName);
  if (modes[k]) return modes[k];
  return cfg.autoNotices ? 'auto' : 'manual';
}
function clearGroupNoticeModes_() { const sh = nmodeSheet_(); if (sh.getLastRow() >= 2) sh.deleteRows(2, sh.getLastRow() - 1); cacheDrop_('nmodes'); }

/** Режим АВТО/ВРУЧНУЮ только для данной группы */
function setGroupNoticeMode(role, password, month, teacherName, groupName, mode) {
  { const __r = staffRole_(getConfig_(), password); if (__r === 'academic') return ACADEMIC_DENY; }
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const t = findTeacherCfg_(cfg, teacherName) || { short: String(teacherName || '') };
  groupName = String(groupName || '').trim();
  const auto = String(mode) === 'auto';
  const sh = nmodeSheet_(), key = roomKey_(month, t.short, groupName);
  let rowIndex = 0;
  if (sh.getLastRow() >= 2) sh.getRange(2, 7, sh.getLastRow() - 1, 1).getValues().forEach(function(r, i) { if (String(r[0]) === key) rowIndex = i + 2; });
  const who = actual === 'director' ? 'руководитель' : 'кассир';
  if (String(mode) === 'inherit') {   // «как у всех»: снять свою настройку группы
    if (rowIndex) sh.deleteRow(rowIndex);
    cacheDrop_('nmodes');
    logChanges_(who, groupName, '', '(режим уведомлений)', [['Режим уведомлений', '', 'как у всех (' + (cfg.autoNotices ? 'АВТО' : 'ВРУЧНУЮ') + ')']]);
    return { success: true, auto: cfg.autoNotices, own: false, message: groupName + ' (' + t.short + ') снова следует общему режиму: ' + (cfg.autoNotices ? 'АВТО' : 'ВРУЧНУЮ') + '.' };
  }
  if (rowIndex) sh.getRange(rowIndex, 4, 1, 3).setValues([[auto ? 'auto' : 'manual', who, new Date()]]);
  else sh.appendRow([month, t.short, groupName, auto ? 'auto' : 'manual', who, new Date(), key]);
  cacheDrop_('nmodes');
  if (auto) { try { const has = ScriptApp.getProjectTriggers().some(function(tr) { return tr.getHandlerFunction() === 'autoPaymentNotices'; }); if (!has) createAutoNoticesTrigger(); } catch (e) {} }
  logChanges_(who, groupName, '', '(режим уведомлений)', [['Режим уведомлений', '', auto ? 'АВТО' : 'ВРУЧНУЮ']]);
  return { success: true, auto: auto, own: true, message: (auto ? 'АВТО' : 'ВРУЧНУЮ') + ' — только для ' + groupName + ' (' + t.short + '). Общий режим не изменён.' };
}




// ============================================================
// КАБИНЕТ «ПРИЁМ»: заявки новых учеников, очередь по уровням, зачисление
// ============================================================

// ---------- тексты бланков по умолчанию (правятся в листе БЛАНКИ) ----------
const CONTRACT_KG_DEFAULT = 'Билим берүү кызматтарын көрсөтүү боюнча\nКЕЛИШИМ № ______\n\nТалас шаары {год}-жылдын «{день}» {месяц}\n\nУставдын жана Кыргыз Республикасынын Билим берүү жана илим министрлиги тарабынан берилген № E2019-0007 Лицензиясынын (2019-жылдын 31-январында берилген, мөөнөтсүз) негизинде иш алып барган директор Кадырбекова Ф.К. атынан, мындан ары «Аткаруучу» деп аталуучу «"Планета" Билим берүү борбору» ЖЧКсы, бир тараптан, жана\n\nАта-эненин/Мыйзамдуу өкүлдүн Аты-жөнү: {родитель}\nПаспорт (сериясы, номери): {паспорт}, берилген күнү: {выдан}, жарактуу мөөнөтү: {срок}\nДареги / Адрес: {адрес}\nТелефон 1: {телефон}    Телефон 2: {телефон2}\n\nмындан ары «Буюртмачы» деп аталуучу, жашы жете элек окуучунун: {ученик} (мындан ары — «Окуучу») кызыкчылыгында иш алып баруучу, экинчи тараптан, биргелешип «Тараптар» деп аталгандар төмөнкүлөр боюнча ушул Келишимди түзүштү:\n\n1. КЕЛИШИМДИН ПРЕДМЕТИ\n1.1. Аткаруучу Окуучуга «Англис тили» курсу боюнча билим берүү кызматтарын көрсөтүүгө, ал эми Буюртмачы ал кызматтарга акы төлөөгө милдеттенет. Толук курстун узактыгы: 3 жылга чейин.\n1.2. Окутуу деңгээлдер (уровень) боюнча жүргүзүлөт. Окуучуга биринчи (сыноо) сабагы акысыз берилет. Окууну уланткан учурда бул сабак төлөнүүчү абонементтин эсебине кирбейт.\n\n2. ТАРАПТАРДЫН УКУКТАРЫ ЖАНА МИЛДЕТТЕРИ\n2.1. Аткаруучу милдеттүү: окутууну сапаттуу жүргүзүүгө, ыңгайлуу шарттарды түзүүгө, Буюртмачыга сабактардын графигиндеги өзгөрүүлөр тууралуу өз убагында кабарлоого.\n2.2. Буюртмачы жана Окуучу милдеттүү: окуу акысын өз убагында төлөөгө, сабактарга кечикпей келүүгө, үй тапшырмаларын аткарууга жана Аткаруучунун мүлкүнө аяр мамиле кылууга.\n2.3. Аткаруучу Борбордун кеңсесинде унутулган же жоголгон жеке буюмдар, кийим-кече жана баалуулуктар үчүн жоопкерчилик тартпайт.\n\n3. КЫЗМАТТАРДЫН БААСЫ ЖАНА ТӨЛӨӨ ТАРТИБИ\n3.1. Окуу үчүн төлөм 1 абонемент (12 сабак) үчүн 100% алдын ала төлөө (предоплата) түрүндө жүргүзүлөт.\n3.2. Абонементтин баасы Окуучунун деңгээлине жараша болот жана Аткаруучунун Прайс-баракчасына ылайык аныкталат. Кийинки (жогорку) деңгээлге өткөндө окуу акысы учурдагы Прайс-баракчага ылайык өзгөрөт.\n3.3. Топко кошулуу: Эгерде Окуучу иштеп жаткан топко 1-сабактан эмес кошулса, Буюртмачы учурдагы абонементтеги калган сабактар үчүн гана төлөйт. Кийинки циклден баштап 12 сабактын толук баасы төлөнөт.\n3.4. Окуу куралдары: Китептер Буюртмачы тарабынан өзүнчө сатылып алынат (200 сомдон 2400 сомго чейин) жана Окуучунун жеке менчигинде калат.\n3.5. Төлөмдүн кечигиши: Өзгөчө учурларда Окуучу жаңы абонементтин 3 сабагына карызга кире алат. Төлөм жок болгон учурда 4-сабакка Окуучу киргизилбейт.\n3.6. Калтырылган сабактар калыбына келтирилбейт жана алар үчүн төлөм кайтарылбайт.\n\n4. АТТЕСТАЦИЯ ЖАНА СЕРТИФИКАТТАРДЫ БЕРҮҮ\n4.1. Ар бир деңгээл аяктагандан кийин Окуучу жыйынтыктоочу тест тапшырат. Анын жыйынтыгы боюнча сертификат берилет: 100% — «Артыкчылык менен»; 80–99% — ийгиликтүү аяктагандыгы тууралуу; 60–79% — катышкандыгы тууралуу; 60%дан төмөн — Окуучу кийинки деңгээлге өткөрүлбөйт.\n\n5. БАШКА ШАРТТАР\n5.1. Окуу материалдары Аткаруучунун интеллектуалдык менчиги болуп саналат.\n5.2. Буюртмачы Окуучунун катышуусундагы сүрөт жана видеоматериалдарды жарнамалык максаттарда колдонууга макулдугун берет.\n5.3. Буюртмачынын демилгеси менен окуу мөөнөтүнөн мурда токтотулган учурда, колдонулбаган сабактар үчүн акча кайтарылбайт.\n5.4. Форс-мажордук жагдайларда Тараптар жоопкерчиликтен бошотулат.\n5.5. Келишим кол коюлган учурдан тартып күчүнө кирет.\n\n6. ТАРАПТАРДЫН РЕКВИЗИТТЕРИ ЖАНА КОЛ ТАМГАЛАРЫ\nБУЮРТМАЧЫ (Ата-энеси/Өкүлү):\nАты-жөнү: {родитель}\nТелефон 1: {телефон}    Телефон 2: {телефон2}\nКол тамгасы: ______________________\n\nАТКАРУУЧУ:\n«"Планета" Билим берүү борбору» ЖЧКсы\nКР Билим берүү министрлигинин Лицензиясы: № E2019-0007\nЮридикалык дареги: Талас ш., Рыскулов көч., 36\nОкутуу дареги: Талас ш., Рыскулов көч., 36\nИНН: 01405201810093    ОКПО: 29121977\nДиректор: _______________ / Кадырбекова Ф.К. /\nМ.О.';

const FORM_ANKETA_DEFAULT = 'АНКЕТА ОКУУЧУНУН / АНКЕТА УЧЕНИКА\n{центр} · {дата}\n\n1. Окуучунун аты-жөнү / ФИО ученика: {ученик}\n2. Туулган күнү / Дата рождения: ____________________   Жашы / Возраст: {возраст}\n3. Мектеби / Школа: {школа}      Классы / Класс: {класс}      Смена: {смена}\n4. Мурда курстарда окуганбы? / Учился ли раньше на курсах: ☐ ооба / да   ☐ жок / нет\n   Эгер ооба — кайда жана канча убакыт / Если да — где и как долго: ____________________\n5. Тесттин жыйынтыгы боюнча деңгээл / Уровень по тесту: {уровень}\n6. Каалаган убакыт / Удобное время занятий: ____________________\n\nАТА-ЭНЕСИ / РОДИТЕЛЬ\n7. Аты-жөнү / ФИО: {родитель}\n8. WhatsApp: {телефон}      Кошумча телефон / Доп. телефон: {телефон2}\n9. Жашаган дареги / Адрес проживания: ____________________________________\n10. Кайдан уктуңуз? / Откуда узнали о центре:\n    ☐ тааныштар / знакомые   ☐ Instagram   ☐ жарнама / вывеска   ☐ башка / другое: __________\n\nДЕНСООЛУГУ ЖАНА ЭСКЕРТҮҮЛӨР / ЗДОРОВЬЕ И ПРИМЕЧАНИЯ\n11. Эскертүү керекпи? / Есть ли что-то, что нужно знать преподавателю: ______________________\n\nМАКУЛДУК / СОГЛАСИЕ\nБорбордун эрежелери менен таанышып чыктым, окуу акысын өз убагында төлөөгө милдеттенем.\nС правилами центра ознакомлен(а), обязуюсь своевременно вносить оплату.\n\nАта-энеси / Родитель: ____________________  Колу / Подпись: ____________  Күнү / Дата: {дата}\nКабыл алды / Принял(а): ____________________';
const INTAKE_SHEET = 'ПРИЁМ';
const INTAKE_H = ['ID', 'Дата обращения', 'ФИО ученика', 'Возраст', 'Школа', 'Класс', 'Смена', 'Родитель (ФИО)', 'WhatsApp родителя', 'Телефон 2',
  'Учился раньше', 'Удобное время', 'Уровень', 'Дата теста', 'Статус', 'Анкета', 'Договор', 'Договор выдан', 'Шаги',
  'Группа', 'Преподаватель', 'Месяц', 'Перезвонить', 'Комментарий', 'Кем принят', 'Обновлено',
  'Паспорт (серия, номер)', 'Паспорт выдан', 'Паспорт действует до', 'Адрес', 'Ключ'];
const IN = { id: 0, created: 1, name: 2, age: 3, school: 4, cls: 5, shift: 6, parent: 7, wa: 8, phone2: 9,
  studied: 10, time: 11, level: 12, testDate: 13, status: 14, form: 15, contract: 16, contractOut: 17, steps: 18,
  group: 19, teacher: 20, month: 21, callback: 22, note: 23, by: 24, updated: 25,
  passport: 26, passIssued: 27, passValid: 28, addr: 29, key: 30 };
const IN_NEW = 'новая', IN_TEST = 'тест сдан', IN_QUEUE = 'в очереди', IN_ENROLLED = 'зачислен', IN_REFUSED = 'отказ';
const INTAKE_STEPS = ['Школа, класс, смена', 'Учился ли раньше', 'Тест на уровень', 'Анкета заполнена', 'Договор подписан', 'Группа или очередь'];

function intakeSheet_() { return dbSheet_(INTAKE_SHEET, INTAKE_H, [90, 110, 200, 60, 140, 60, 70, 180, 130, 130, 90, 120, 130, 100, 100, 80, 110, 110, 120, 90, 140, 120, 110, 220, 110, 130, 200]); }
function intakeAllowed_(role) { return role === 'reception' || role === 'director'; }   // приём новых ведут ресепшн и руководитель; кассир только принимает оплаты
function readIntake_() {
  const sh = intakeSheet_();
  if (sh.getLastRow() < 2) return { sh: sh, rows: [] };
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, INTAKE_H.length).getValues();
  rows.forEach(function(r, i) { r.rowIndex = i + 2; });
  return { sh: sh, rows: rows.filter(function(r) { return String(r[IN.id] || '').trim(); }) };
}
function intakeDate_(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'dd.MM.yyyy') : String(v || '').trim(); }
function intakePublic_(r) {
  return { id: String(r[IN.id]), created: intakeDate_(r[IN.created]), name: String(r[IN.name] || ''), age: String(r[IN.age] || ''),
    school: String(r[IN.school] || ''), cls: String(r[IN.cls] || ''), shift: String(r[IN.shift] || ''), parent: String(r[IN.parent] || ''),
    wa: String(r[IN.wa] || ''), phone2: String(r[IN.phone2] || ''), studied: String(r[IN.studied] || ''), time: String(r[IN.time] || ''),
    level: String(r[IN.level] || ''), testDate: intakeDate_(r[IN.testDate]), status: String(r[IN.status] || IN_NEW),
    form: String(r[IN.form] || ''), contract: String(r[IN.contract] || 'нет'), contractOut: intakeDate_(r[IN.contractOut]),
    steps: String(r[IN.steps] || ''), group: String(r[IN.group] || ''), teacher: String(r[IN.teacher] || ''), month: String(r[IN.month] || ''),
    callback: intakeDate_(r[IN.callback]), note: String(r[IN.note] || ''), by: String(r[IN.by] || ''),
    passport: String(r[IN.passport] || ''), passIssued: intakeDate_(r[IN.passIssued]), passValid: intakeDate_(r[IN.passValid]), addr: String(r[IN.addr] || '') };
}
/** Список заявок, очередь по уровням и счётчики для кабинета «Приём» */
function getIntake(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !intakeAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const t = readIntake_();
  const items = t.rows.map(intakePublic_);
  const today = isoToday_();
  const toIso = function(d) { const p = String(d || '').split('.'); return p.length === 3 ? p[2] + '-' + p[1] + '-' + p[0] : ''; };
  let overdue = 0, todayCalls = 0, contractsOut = 0;
  items.forEach(function(x) {
    x.callIso = toIso(x.callback);
    if (x.status === IN_ENROLLED || x.status === IN_REFUSED) return;
    if (x.callIso && x.callIso < today) { x.overdue = true; overdue++; }
    else if (x.callIso === today) { x.today = true; todayCalls++; }
    if (x.contract === 'выдан') contractsOut++;
  });
  // очередь по уровням: кто ждёт группу
  const queue = {};
  items.forEach(function(x) {
    if (x.status !== IN_QUEUE && x.status !== IN_TEST) return;
    const lv = x.level || 'уровень не указан';
    if (!queue[lv]) queue[lv] = { level: lv, count: 0, shift1: 0, shift2: 0, students: [] };
    queue[lv].count++;
    if (String(x.shift).indexOf('1') === 0) queue[lv].shift1++; else if (String(x.shift).indexOf('2') === 0) queue[lv].shift2++;
    queue[lv].students.push({ id: x.id, name: x.name, cls: x.cls, shift: x.shift, wa: x.wa, time: x.time, since: x.created });
  });
  const levels = Object.keys(queue).map(function(k) { const q = queue[k]; q.ready = q.count >= cfg.groupMin; return q; })
    .sort(function(a, b) { return b.count - a.count; });
  return { success: true, role: actual, month: cfg.currentMonth, groupMin: cfg.groupMin, steps: INTAKE_STEPS,
    levelsList: priceLevels_(), items: items, queue: levels,
    teachers: cfg.teachers.filter(function(t) { return String(t.status).toLowerCase() !== 'не работает'; }).map(function(t) { return { short: t.short, full: t.full }; }),
    dayOptions: cfg.dayOptions, timeOptions: cfg.timeOptions,
    stats: { total: items.length, overdue: overdue, today: todayCalls, contractsOut: contractsOut,
      queued: items.filter(function(x) { return x.status === IN_QUEUE; }).length,
      enrolled: items.filter(function(x) { return x.status === IN_ENROLLED && nameKey_(x.month) === nameKey_(cfg.currentMonth); }).length } };
}
/** Создать или изменить заявку. data — поля из формы; id пустой = новая */
function saveIntakeLead(role, password, id, data) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !intakeAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  data = data || {};
  const name = String(data.name || '').trim();
  if (!name) return { success: false, error: 'Введите ФИО ученика.' };
  const wa = normalizeWhatsapp_(data.wa);
  if (wa.error) return { success: false, error: wa.error };
  const t = readIntake_(), sh = t.sh, who = roleTitle_(actual), stamp = nowStamp_();
  const set = function(r) {
    r[IN.name] = name; r[IN.age] = String(data.age || ''); r[IN.school] = String(data.school || ''); r[IN.cls] = String(data.cls || '');
    r[IN.shift] = String(data.shift || ''); r[IN.parent] = String(data.parent || ''); r[IN.wa] = wa.value; r[IN.phone2] = String(data.phone2 || '');
    r[IN.studied] = String(data.studied || ''); r[IN.time] = String(data.time || ''); r[IN.level] = String(data.level || '');
    r[IN.testDate] = String(data.testDate || ''); r[IN.status] = String(data.status || r[IN.status] || IN_NEW);
    r[IN.form] = String(data.form || r[IN.form] || ''); r[IN.contract] = String(data.contract || r[IN.contract] || 'нет');
    r[IN.contractOut] = String(data.contractOut || r[IN.contractOut] || ''); r[IN.steps] = String(data.steps === undefined ? (r[IN.steps] || '') : data.steps);
    r[IN.callback] = String(data.callback || ''); r[IN.note] = String(data.note || ''); r[IN.updated] = stamp;
    r[IN.passport] = String(data.passport || ''); r[IN.passIssued] = String(data.passIssued || ''); r[IN.passValid] = String(data.passValid || ''); r[IN.addr] = String(data.addr || '');
    return r;
  };
  id = String(id || '').trim();
  if (id) {
    const ex = t.rows.filter(function(r) { return String(r[IN.id]) === id; })[0];
    if (!ex) return { success: false, error: 'Заявка не найдена.' };
    const row = set(ex.slice(0, INTAKE_H.length));
    sh.getRange(ex.rowIndex, 1, 1, INTAKE_H.length).setValues([row]);
    logChanges_(who, '', '', name, [['Заявка изменена', '', String(row[IN.status])]]);
    return { success: true, id: id, message: 'Сохранено.' };
  }
  const newId = 'З-' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss');
  const row = set(new Array(INTAKE_H.length).fill(''));
  row[IN.id] = newId; row[IN.created] = Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy'); row[IN.by] = who; row[IN.key] = newId;
  if (!row[IN.status]) row[IN.status] = IN_NEW;
  sh.appendRow(row);
  logChanges_(who, '', '', name, [['Новая заявка', '', name + (row[IN.level] ? ' · ' + row[IN.level] : '')]]);
  return { success: true, id: newId, message: 'Заявка создана.' };
}
/** Быстрая правка одного поля: статус, договор, шаги, дата звонка */
function setIntakeField(role, password, id, field, value) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !intakeAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const map = { status: IN.status, contract: IN.contract, contractOut: IN.contractOut, steps: IN.steps, callback: IN.callback, note: IN.note, form: IN.form, level: IN.level, testDate: IN.testDate };
  const col = map[String(field)];
  if (col === undefined) return { success: false, error: 'Неизвестное поле.' };
  const t = readIntake_(), ex = t.rows.filter(function(r) { return String(r[IN.id]) === String(id); })[0];
  if (!ex) return { success: false, error: 'Заявка не найдена.' };
  t.sh.getRange(ex.rowIndex, col + 1).setValue(String(value === undefined ? '' : value));
  if (field === 'contract' && String(value) === 'выдан' && !String(ex[IN.contractOut] || '').trim()) t.sh.getRange(ex.rowIndex, IN.contractOut + 1).setValue(Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy'));
  t.sh.getRange(ex.rowIndex, IN.updated + 1).setValue(nowStamp_());
  return { success: true, message: 'Сохранено.' };
}
/** Подходящие группы по уровню: свободные места и сколько занятий уже прошло */
function intakeGroups(role, password, level, month) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !intakeAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  if (!cfg.useDb) return { success: true, groups: [], note: 'Подбор группы работает в режиме БАЗА.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const lvKey = priceKey_(level || ''), today = isoToday_(), out = [];
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H), byGid = {};
  R.rows.forEach(function(r) { byGid[String(r[RO.gid])] = (byGid[String(r[RO.gid])] || 0) + 1; });
  dbGroupsOfMonth_(month).forEach(function(g) {
    const row = g.row;
    if (String(row[GR.status]) === 'скрыта') return;
    const count = byGid[String(row[GR.id])] || 0, free = Math.max(0, (cfg.capacity || 16) - count);
    const dates = groupDates_(row), held = dates.filter(function(x) { return x && x <= today; }).length;
    const lv = String(row[GR.level] || '');
    const match = lvKey && priceKey_(lv) === lvKey;
    if (!match || !free) return;
    out.push({ name: 'Группа ' + row[GR.num], teacher: String(row[GR.teacher] || ''), level: lv, days: String(row[GR.days] || ''), time: String(row[GR.time] || ''),
      room: getRoom_(month, String(row[GR.teacher] || ''), 'Группа ' + row[GR.num]), students: count, free: free, held: held,
      canCatchUp: held <= 3, hint: held <= 3 ? 'пройдено ' + held + ' из 12 — можно догнать' : 'пройдено ' + held + ' из 12 — догонять поздно' });
  });
  out.sort(function(a, b) { return a.held - b.held || b.free - a.free; });
  return { success: true, month: month, groups: out };
}
/** Зачислить заявку в группу: карточка ученика + место в составе + пометка NEW преподавателю */
function enrollLead(role, password, id, month, teacherShort, groupName) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !intakeAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  if (!cfg.useDb) return { success: false, error: 'Зачисление работает в режиме БАЗА.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const t = readIntake_(), ex = t.rows.filter(function(r) { return String(r[IN.id]) === String(id); })[0];
  if (!ex) return { success: false, error: 'Заявка не найдена.' };
  const name = String(ex[IN.name] || '').trim();
  const g = dbGroup_(month, teacherShort, groupName);
  if (!g) return { success: false, error: 'Группа не найдена за ' + month + '.' };
  const lock = LockService.getScriptLock();
  let locked = false; try { locked = lock.tryLock(15000); } catch (e) {}
  if (!locked) return { success: false, error: 'База занята — повторите через несколько секунд.' };
  try {
    delete __dbMemo[DB_STUDENTS]; delete __dbMemo[DB_ROSTER];
    const gid = String(g.row[GR.id]), ro = dbRosterOfGroup_(gid), S = dbStudents_(), stamp = nowStamp_();
    if (ro.rows.some(function(r) { return studentKey_(r[RO.name]) === studentKey_(name); })) return { success: false, error: 'Такой ученик уже есть в группе.' };
    const used = {}; ro.rows.forEach(function(r) { used[Number(r[RO.num])] = true; });
    let num = 1; while (used[num] && num < (cfg.capacity || 16)) num++;
    if (used[num]) return { success: false, error: 'В группе нет свободных мест.' };
    let st = S.byName[nameKey_(name)], sid;
    if (st) { sid = String(st[ST.id]); const upd = { 9: stamp }; if (!String(st[ST.wa]) && ex[IN.wa]) upd[2] = String(ex[IN.wa]); if (String(st[ST.status]) === 'выбыл') upd[6] = 'учится'; dbSetCells_(S.sh, st.rowIndex, upd); }
    else {
      sid = nextId_('У-', S.rows, ST.id);
      dbAppendRow_(S.sh, [sid, name, String(ex[IN.wa] || ''), '', '', String(ex[IN.phone2] || ''), 'учится', stamp, roleTitle_(actual) + ' (приём)', stamp,
        [String(ex[IN.school] || ''), String(ex[IN.cls] || '') ? String(ex[IN.cls]) + ' класс' : '', String(ex[IN.shift] || '')].filter(Boolean).join(' · '),
        '', String(ex[IN.contract] || ''), String(ex[IN.parent] || ''), nameKey_(name)]);
    }
    const price = Math.round(parseNum_(g.row[GR.price])), key = gid + '|' + sid;
    dbAppendRow_(ro.sh, [gid, sid, num, name, 0, 12, tuitionCalc_(price, 0, 12), 0, '', '', '', '', '', 'новый ученик · приём ' + stamp, stamp, key]);
    dbAppendRow_(dbTable_(DB_ATT, DB_ATT_H).sh, [gid, sid, name].concat(new Array(12).fill('')).concat([stamp, key]));
    markNewStudent_(gid, sid, name, teacherShort, groupName, month, roleTitle_(actual));
    const row = ex.slice(0, INTAKE_H.length);
    row[IN.status] = IN_ENROLLED; row[IN.group] = groupName; row[IN.teacher] = teacherShort; row[IN.month] = month; row[IN.updated] = stamp; row[IN.callback] = '';
    t.sh.getRange(ex.rowIndex, 1, 1, INTAKE_H.length).setValues([row]);
    logChanges_(roleTitle_(actual), groupName, num, name, [['Зачислен из приёма', '', groupName + ' · ' + teacherShort + ' · ' + month]]);
    return { success: true, message: name + ' зачислен(а) в ' + groupName + ' (' + teacherShort + ', ' + month + '), строка ' + num + '. Преподаватель увидит пометку «новый».' };
  } finally { if (locked) lock.releaseLock(); }
}

/** Открыть новую группу из очереди: создать группу у преподавателя и зачислить выбранных учеников */
function openGroupFromQueue(role, password, level, teacherShort, month, ids, days, time) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !intakeAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  if (!cfg.useDb) return { success: false, error: 'Открытие группы работает в режиме БАЗА.' };
  month = String(month || '').trim() || cfg.currentMonth;
  teacherShort = String(teacherShort || '').trim();
  const t = findTeacherCfg_(cfg, teacherShort);
  if (!t) return { success: false, error: 'Выберите преподавателя.' };
  ids = (ids || []).map(String);
  if (!ids.length) return { success: false, error: 'Выберите учеников.' };
  const lock = LockService.getScriptLock();
  let locked = false; try { locked = lock.tryLock(20000); } catch (e) {}
  if (!locked) return { success: false, error: 'База занята — повторите через несколько секунд.' };
  let groupName = '';
  try {
    delete __dbMemo[DB_GROUPS];
    const G = dbTable_(DB_GROUPS, DB_GROUPS_H);
    const used = {};
    G.rows.forEach(function(r) { if (nameKey_(r[GR.month]) === nameKey_(month) && nameKey_(r[GR.teacher]) === nameKey_(t.short)) used[Number(r[GR.num])] = true; });
    let num = 1; while (used[num] && num < 20) num++;
    if (used[num]) return { success: false, error: 'У преподавателя нет свободных номеров групп.' };
    groupName = 'Группа ' + num;
    const price = (function() { const p = priceFor_(readPrices_(), level); return p === null ? 0 : p; })();
    const gid = nextId_('Г-', G.rows, 0), key = nameKey_(month) + '|' + nameKey_(t.short) + '|' + num;
    dbAppendRow_(G.sh, [gid, month, t.short, num, 'Группа - ' + num, String(level || ''), String(days || ''), String(time || ''), price, cfg.defaultCoef]
      .concat(new Array(12).fill('')).concat(['активна', nowStamp_(), 'открыта из очереди (приём)', key]));
    logChanges_(roleTitle_(actual), groupName, '', '(новая группа)', [['Открыта группа', '', groupName + ' · ' + t.short + ' · ' + (level || '') + ' · ' + month]]);
  } finally { if (locked) lock.releaseLock(); }
  // зачисление выбранных
  const done = [], failed = [];
  ids.forEach(function(id) {
    const r = enrollLead(role, password, id, month, t.short, groupName);
    if (r && r.success) done.push(id); else failed.push((r && r.error) || 'ошибка');
  });
  return { success: true, group: groupName, teacher: t.short, month: month, enrolled: done.length,
    message: groupName + ' открыта у ' + (t.full || t.short) + ' (' + month + '), зачислено: ' + done.length +
      (failed.length ? '. Не удалось: ' + failed.length : '') + '. Преподаватель увидит новых учеников с пометкой «новый».' };
}

// ---------- пометка «новый ученик» для преподавателя ----------
const NEWST_SHEET = 'НОВЫЕ_УЧЕНИКИ';
const NEWST_H = ['ID группы', 'ID ученика', 'ФИО', 'Преподаватель', 'Группа', 'Месяц', 'Добавлен', 'Кем', 'Ознакомлен', 'Ключ'];
function newstSheet_() { return dbSheet_(NEWST_SHEET, NEWST_H, [90, 90, 200, 150, 90, 120, 130, 120, 130, 200]); }
function markNewStudent_(gid, sid, name, teacherShort, groupName, month, who) {
  try { newstSheet_().appendRow([gid, sid, name, teacherShort, groupName, month, nowStamp_(), who, '', gid + '|' + sid]); cacheDrop_('newst'); } catch (e) {}
}
function newStudents_() {
  return cacheGet_('newst', function() {
    const sh = newstSheet_(), out = {};
    if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, NEWST_H.length).getValues().forEach(function(r, i) {
      if (String(r[8] || '').trim()) return;   // уже ознакомлен
      out[String(r[9] || (r[0] + '|' + r[1]))] = { added: String(r[6] || ''), by: String(r[7] || ''), rowIndex: i + 2 };
    });
    return out;
  });
}
/** Преподаватель нажал «Ознакомлен(а)» — пометка снимается */
function ackNewStudent(teacherName, password, groupName, sid, month) {
  const auth = checkTeacher_(teacherName, password);
  if (!auth.success) return auth;
  const cfg = getConfig_();
  month = String(month || '').trim() || cfg.currentMonth;
  const g = dbGroup_(month, auth.teacher.name, groupName);
  if (!g) return { success: false, error: 'Группа не найдена.' };
  const key = String(g.row[GR.id]) + '|' + String(sid);
  const sh = newstSheet_();
  if (sh.getLastRow() >= 2) {
    const vals = sh.getRange(2, NEWST_H.length, sh.getLastRow() - 1, 1).getValues();
    for (let i = 0; i < vals.length; i++) if (String(vals[i][0]) === key) { sh.getRange(i + 2, 9).setValue(nowStamp_()); break; }
  }
  cacheDrop_('newst');
  return { success: true, message: 'Отмечено.' };
}

// ---------- бланки: договор и анкета ----------
const FORMS_SHEET = 'БЛАНКИ';
const FORMS_H = ['Код', 'Название', 'Текст бланка (подстановки в фигурных скобках)'];
function formsSheet_() {
  const sh = dbSheet_(FORMS_SHEET, FORMS_H, [120, 220, 900]);
  if (sh.getLastRow() < 2) sh.getRange(2, 1, 2, 3).setValues([['ДОГОВОР', 'Договор об оказании образовательных услуг (кыргызча)', CONTRACT_KG_DEFAULT], ['АНКЕТА', 'Анкета ученика', FORM_ANKETA_DEFAULT]]);
  return sh;
}
function formsGet_(code) {
  const sh = formsSheet_();
  if (sh.getLastRow() < 2) return '';
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, 3).getValues();
  for (let i = 0; i < rows.length; i++) if (String(rows[i][0]).trim().toUpperCase() === String(code).toUpperCase()) return String(rows[i][2] || '');
  return '';
}
/** Бланк с подставленными данными заявки — страница для печати */
function printForm(role, password, code, id) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !intakeAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  let x = {};
  if (id) { const t = readIntake_(), ex = t.rows.filter(function(r) { return String(r[IN.id]) === String(id); })[0]; if (ex) x = intakePublic_(ex); }
  const d = new Date();
  const map = { ученик: x.name || '', возраст: x.age || '', школа: x.school || '', класс: x.cls || '', смена: x.shift || '',
    родитель: x.parent || '', телефон: x.wa || '', телефон2: x.phone2 || '', уровень: x.level || '',
    паспорт: x.passport || '__________', выдан: x.passIssued || '__________', срок: x.passValid || '__________', адрес: x.addr || '__________________________',
    день: Utilities.formatDate(d, TZ, 'dd'), месяц: Utilities.formatDate(d, TZ, 'MM'), год: Utilities.formatDate(d, TZ, 'yyyy'),
    дата: Utilities.formatDate(d, TZ, 'dd.MM.yyyy'), центр: 'Образовательный центр «Планета»' };
  let text = formsGet_(code) || '';
  Object.keys(map).forEach(function(k) { text = text.split('{' + k + '}').join(map[k]); });
  return { success: true, title: code === 'АНКЕТА' ? 'Анкета ученика' : 'Договор', text: text };
}







// ============================================================
// УВАЖИТЕЛЬНЫЕ ПРОПУСКИ: болезнь, отъезд и т.п. по сообщению родителя
// Обычные пропуски (без сообщения) сюда не попадают и ни на что не влияют.
// ============================================================
const ABS_SHEET = 'ОТСУТСТВИЯ';
const ABS_H = ['ID', 'Месяц', 'Преподаватель', 'Группа', 'ID ученика', 'Ученик', 'Причина', 'Не ходит с', 'Ожидаем', 'Комментарий',
  'Статус', 'Кто внёс', 'Когда', 'Подтвердил', 'Вернулся', 'Пропущено занятий', 'Занятий стало', 'Ключ'];
const AB = { id: 0, month: 1, teacher: 2, group: 3, sid: 4, name: 5, reason: 6, from: 7, until: 8, note: 9,
  status: 10, by: 11, when: 12, okBy: 13, back: 14, missed: 15, lessons: 16, key: 17 };
const AB_WAIT = 'ожидает подтверждения', AB_OK = 'подтверждено', AB_DONE = 'вернулся', AB_CANCEL = 'отменено';
const ABS_REASONS = ['болезнь', 'отъезд', 'семейные обстоятельства', 'другое'];

function absSheet_() { return dbSheet_(ABS_SHEET, ABS_H, [110, 120, 180, 90, 90, 200, 150, 110, 110, 240, 150, 130, 130, 130, 110, 90, 90, 200]); }
function absRows_() {
  const sh = absSheet_();
  if (sh.getLastRow() < 2) return { sh: sh, rows: [] };
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, ABS_H.length).getValues();
  rows.forEach(function(r, i) { r.rowIndex = i + 2; });
  return { sh: sh, rows: rows.filter(function(r) { return String(r[AB.id] || ''); }) };
}
function absDate_(v) { return v instanceof Date ? Utilities.formatDate(v, TZ, 'yyyy-MM-dd') : String(v || '').trim(); }
/** Действующие пропуски месяца: ключ «преподаватель|группа|ID ученика» */
function absActiveMap_(month) {
  return cacheGet_('abs_' + nameKey_(month), function() {
    const out = {};
    absRows_().rows.forEach(function(r) {
      const st = String(r[AB.status] || '');
      if (st !== AB_WAIT && st !== AB_OK) return;
      if (nameKey_(r[AB.month]) !== nameKey_(month)) return;
      out[[nameKey_(r[AB.teacher]), nameKey_(r[AB.group]), String(r[AB.sid])].join('|')] =
        { id: String(r[AB.id]), reason: String(r[AB.reason] || ''), from: absDate_(r[AB.from]), until: absDate_(r[AB.until]),
          status: st, note: String(r[AB.note] || ''), by: String(r[AB.by] || '') };
    });
    return out;
  });
}
function absFor_(month, teacher, group, sid) {
  return absActiveMap_(month)[[nameKey_(teacher), nameKey_(group), String(sid)].join('|')] || null;
}
function absDrop_(month) { cacheDrop_('abs_' + nameKey_(month)); }

/** Внести уважительный пропуск. Роли: преподаватель (свой ученик), администратор, руководитель */
function addAbsence(who, password, month, teacherName, groupName, sid, data) {
  const cfg = getConfig_();
  let role = '', byName = '';
  const staff = staffRole_(cfg, password);
  if (staff === 'admin' || staff === 'director') { role = staff; byName = roleTitle_(staff); }
  else {
    const auth = checkTeacher_(who, password);
    if (!auth.success) return { success: false, error: 'Нет доступа.' };
    role = 'teacher'; byName = auth.teacher.name; teacherName = auth.teacher.name;
  }
  if (!cfg.useDb) return { success: false, error: 'Работает в режиме БАЗА.' };
  month = String(month || '').trim() || cfg.currentMonth;
  data = data || {};
  const g = dbGroup_(month, teacherName, groupName);
  if (!g) return { success: false, error: 'Группа не найдена.' };
  const ro = dbRosterOfGroup_(String(g.row[GR.id]));
  const r = ro.rows.filter(function(x) { return String(x[RO.sid]) === String(sid); })[0];
  if (!r) return { success: false, error: 'Ученик не найден в группе.' };
  if (absFor_(month, teacherName, groupName, sid)) return { success: false, error: 'У ученика уже есть действующая запись об отсутствии.' };
  const reason = String(data.reason || '').trim().toLowerCase();
  if (ABS_REASONS.indexOf(reason) === -1) return { success: false, error: 'Выберите причину: ' + ABS_REASONS.join(', ') + '.' };
  const from = String(data.from || '').trim() || isoToday_();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) return { success: false, error: 'Неверная дата начала.' };
  const until = String(data.until || '').trim();   // пусто = срок неизвестен
  if (until && !/^\d{4}-\d{2}-\d{2}$/.test(until)) return { success: false, error: 'Неверная ожидаемая дата.' };
  const id = 'О-' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + String(Math.floor(Math.random() * 90 + 10));
  const status = role === 'director' ? AB_OK : AB_WAIT;
  absSheet_().appendRow([id, month, teacherName, groupName, String(sid), String(r[RO.name] || ''), reason, from, until, String(data.note || ''),
    status, byName, nowStamp_(), role === 'director' ? byName : '', '', '', '', id]);
  absDrop_(month);
  logChanges_(byName, groupName, Number(r[RO.num]), String(r[RO.name] || ''),
    [['Уважительный пропуск', '', reason + ' с ' + from.split('-').reverse().join('.') + (until ? ' до ' + until.split('-').reverse().join('.') : ' · срок неизвестен') + ' · ' + status]]);
  // сколько занятий группы попадает в период (предварительно)
  const dates = groupDates_(g.row).filter(Boolean);
  const inRange = dates.filter(function(d) { return d >= from && (!until || d <= until); }).length;
  return { success: true, id: id, status: status, lessonsInRange: inRange, phone: (dbStudents_().byId[String(sid)] || [])[ST.wa] || '',
    message: String(r[RO.name] || '') + ': отмечено отсутствие (' + reason + ')' + (until ? ' до ' + until.split('-').reverse().join('.') : ', срок неизвестен') +
      '. Отметки не требуются, уведомления об оплате не отправляются.' +
      (status === AB_WAIT ? ' Пересчёт абонемента — после подтверждения руководителем.' : ' Пересчёт будет при возвращении ученика.') };
}
/** Руководитель подтверждает или отменяет запись */
function setAbsenceStatus(role, password, id, value, reason) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director' && !(actual === 'admin' && String(value) === 'cancel')) return { success: false, error: 'Подтверждает руководитель.' };
  const t = absRows_(), r = t.rows.filter(function(x) { return String(x[AB.id]) === String(id); })[0];
  if (!r) return { success: false, error: 'Запись не найдена.' };
  const st = String(value) === 'cancel' ? AB_CANCEL : AB_OK;
  t.sh.getRange(r.rowIndex, AB.status + 1).setValue(st);
  t.sh.getRange(r.rowIndex, AB.okBy + 1).setValue(roleTitle_(actual) + ' ' + nowStamp_());
  if (String(value) === 'cancel' && reason) t.sh.getRange(r.rowIndex, AB.note + 1).setValue(String(r[AB.note] || '') + ' · отменено: ' + reason);
  absDrop_(String(r[AB.month]));
  logChanges_(roleTitle_(actual), String(r[AB.group]), '', String(r[AB.name]),
    [['Уважительный пропуск', String(r[AB.status]), st]]);
  return { success: true, status: st, message: String(r[AB.name]) + ': ' + (st === AB_OK ? 'отсутствие подтверждено.' : 'запись отменена.') };
}
/** Ученик вернулся: закрываем период, пересчитываем абонемент, переплату — в предоплаты */
function returnAbsence(who, password, id, backDate) {
  const cfg = getConfig_();
  let byName = '';
  const staff = staffRole_(cfg, password);
  if (staff === 'admin' || staff === 'director') byName = roleTitle_(staff);
  else { const auth = checkTeacher_(who, password); if (!auth.success) return { success: false, error: 'Нет доступа.' }; byName = auth.teacher.name; }
  const t = absRows_(), r = t.rows.filter(function(x) { return String(x[AB.id]) === String(id); })[0];
  if (!r) return { success: false, error: 'Запись не найдена.' };
  const st = String(r[AB.status] || '');
  if (st === AB_DONE) return { success: false, error: 'По этой записи ученик уже отмечен как вернувшийся.' };
  const month = String(r[AB.month]), teacher = String(r[AB.teacher]), group = String(r[AB.group]), sid = String(r[AB.sid]);
  const back = String(backDate || '').trim() || isoToday_();
  const from = absDate_(r[AB.from]);
  const g = dbGroup_(month, teacher, group);
  if (!g) return { success: false, error: 'Группа не найдена.' };
  const gid = String(g.row[GR.id]), ro = dbRosterOfGroup_(gid);
  const row = ro.rows.filter(function(x) { return String(x[RO.sid]) === sid; })[0];
  if (!row) return { success: false, error: 'Ученик не найден в группе.' };
  // занятия группы, попавшие в период отсутствия (день возвращения уже считается посещением)
  const missed = groupDates_(g.row).filter(Boolean).filter(function(d) { return d >= from && d < back; }).length;
  const minMissed = Math.max(1, Math.round(parseNum_(cfg.absMinLessons || 2)) || 2);
  let recalc = null;
  if (st === AB_OK && missed >= minMissed) {
    const price = Math.round(parseNum_(g.row[GR.price])), disc = parseNum_(row[RO.disc]);
    const lessons = Math.max(1, 12 - missed);
    const tuition = tuitionCalc_(price, disc, lessons);
    const paid = Math.round(parseNum_(row[RO.paid]));
    dbSetCells_(ro.sh, row.rowIndex, { 5: lessons, 6: tuition, 14: nowStamp_() });
    let toPrepay = 0;
    if (paid > tuition) {
      toPrepay = paid - tuition;
      const stu = dbStudents_().byId[sid] || [];
      try {
        if (typeof kassaOn_ === 'function' && kassaOn_()) {
          toPrepay = kassaRebalanceRow_(sid, String(row[RO.gid]), 'пересчёт за пропуск: ' + String(r[AB.reason] || ''));
        } else {
          addPrepayment_(String(row[RO.name]), group, teacher, String(stu[ST.wa] || ''), String(row[RO.receipt] || ''),
            absDate_(row[RO.date]) || isoToday_(), toPrepay, month, 'пересчёт за пропуск по причине: ' + String(r[AB.reason] || ''));
          dbSetCells_(ro.sh, row.rowIndex, { 7: tuition, 14: nowStamp_() });
        }
      } catch (e) { toPrepay = 0; }
    }
    recalc = { lessons: lessons, tuition: tuition, missed: missed, prepay: toPrepay, balance: Math.max(0, tuition - Math.min(paid, tuition)) };
  }
  t.sh.getRange(r.rowIndex, AB.status + 1).setValue(AB_DONE);
  t.sh.getRange(r.rowIndex, AB.back + 1).setValue(back);
  t.sh.getRange(r.rowIndex, AB.missed + 1).setValue(missed);
  if (recalc) t.sh.getRange(r.rowIndex, AB.lessons + 1).setValue(recalc.lessons);
  absDrop_(month);
  logChanges_(byName, group, Number(row[RO.num]), String(row[RO.name]),
    [['Вернулся после пропуска', String(r[AB.reason] || ''), back.split('-').reverse().join('.') + ' · пропущено ' + missed +
      (recalc ? ' · абонемент ' + recalc.lessons + ' занятий, к оплате ' + money_(recalc.tuition) + ' сом' + (recalc.prepay ? ', в предоплату ' + money_(recalc.prepay) : '') : ' · пересчёт не требуется')]]);
  return { success: true, missed: missed, recalc: recalc, student: String(row[RO.name]), group: group, teacher: teacher, month: month,
    phone: (dbStudents_().byId[sid] || [])[ST.wa] || '',
    message: String(row[RO.name]) + ': возвращение отмечено ' + back.split('-').reverse().join('.') + '. Пропущено занятий: ' + missed +
      (recalc ? '. Абонемент пересчитан: ' + recalc.lessons + ' занятий, к оплате ' + money_(recalc.tuition) + ' сом' +
        (recalc.prepay ? '. Переплата ' + money_(recalc.prepay) + ' сом записана в предоплаты' : '') + '.'
        : (st === AB_WAIT ? '. Пересчёт не сделан: запись не подтверждена руководителем.' : '. Пересчёт не требуется — пропущено меньше ' + minMissed + ' занятий.')) };
}
/** Список для кабинета: действующие и недавно закрытые записи */
function getAbsences(role, password, month) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'admin' && actual !== 'director' && actual !== 'academic') return { success: false, error: 'Недоступно.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const today = isoToday_(), items = [];
  absRows_().rows.forEach(function(r) {
    if (nameKey_(r[AB.month]) !== nameKey_(month)) return;
    const st = String(r[AB.status] || '');
    const until = absDate_(r[AB.until]);
    items.push({ id: String(r[AB.id]), teacher: String(r[AB.teacher]), group: String(r[AB.group]), sid: String(r[AB.sid]), name: String(r[AB.name]),
      reason: String(r[AB.reason] || ''), from: absDate_(r[AB.from]), until: until, note: String(r[AB.note] || ''), status: st,
      by: String(r[AB.by] || ''), when: String(r[AB.when] || ''), okBy: String(r[AB.okBy] || ''), back: absDate_(r[AB.back]),
      missed: Math.round(parseNum_(r[AB.missed])), lessons: Math.round(parseNum_(r[AB.lessons])),
      overdue: !!(until && until < today && (st === AB_WAIT || st === AB_OK)) });
  });
  items.reverse();
  return { success: true, month: month, role: actual, reasons: ABS_REASONS, items: items,
    stats: { wait: items.filter(function(x) { return x.status === AB_WAIT; }).length,
      active: items.filter(function(x) { return x.status === AB_OK; }).length,
      overdue: items.filter(function(x) { return x.overdue; }).length } };
}

// ============================================================
// СВОЯ СТОИМОСТЬ ГРУППЫ (задаёт руководитель, действует на один месяц)
// ============================================================
const GPRICE_SHEET = 'ЦЕНА_ГРУППЫ';
const GPRICE_H = ['Месяц', 'Преподаватель', 'Группа', 'Цена за 12 занятий', 'Причина', 'Кем', 'Когда', 'Ключ'];
function gpriceSheet_() { return dbSheet_(GPRICE_SHEET, GPRICE_H, [130, 200, 110, 130, 260, 130, 140, 220]); }
function gpriceKey_(month, teacher, group) { return [nameKey_(month), nameKey_(teacher), nameKey_(group)].join('|'); }
function gpriceMap_() {
  return cacheGet_('gprice', function() {
    const sh = gpriceSheet_(), out = {};
    if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, GPRICE_H.length).getValues().forEach(function(r) {
      const k = String(r[7] || gpriceKey_(r[0], r[1], r[2]));
      const p = Math.round(parseNum_(r[3]));
      if (p > 0) out[k] = { price: p, reason: String(r[4] || ''), by: String(r[5] || ''), when: String(r[6] || '') };
    });
    return out;
  });
}
/** Своя цена группы или null */
function gpriceFor_(month, teacher, group) {
  const m = gpriceMap_()[gpriceKey_(month, teacher, group)];
  return m || null;
}

/** Найти учеников, у кого оплачено больше стоимости, и перенести разницу в предоплаты.
 *  Нужен один раз после ручного снижения цены — дальше это делается автоматически. */
function fixOverpaidToPrepay(role, password, month) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  if (typeof kassaOn_ === 'function' && kassaOn_()) {
    const cfg0 = getConfig_(); if (staffRole_(cfg0, password) !== 'director') return { success: false, error: 'Только руководитель.' };
    const items = kassaFixOverpaid_(String(month || cfg0.currentMonth));
    return { success: true, count: items.length, items: items, message: items.length ? 'Переплаты переведены в авансы через кассу: ' + items.length + '.' : 'Переплат нет.' };
  }
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  if (!cfg.useDb) return { success: false, error: 'Работает в режиме БАЗА.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const S = dbStudents_(), today = isoToday_(), out = [];
  const gm = {};
  dbGroupsOfMonth_(month).forEach(function(g) { gm[String(g.row[GR.id])] = g.row; });
  const R = dbTable_(DB_ROSTER, DB_ROSTER_H);
  R.rows.forEach(function(r) {
    const g = gm[String(r[RO.gid])];
    if (!g) return;
    const tuition = Math.round(parseNum_(r[RO.tuition])), paid = Math.round(parseNum_(r[RO.paid]));
    const extra = paid - tuition;
    if (extra <= 0) return;
    const name = String(r[RO.name] || ''), groupName = 'Группа ' + g[GR.num], teacher = String(g[GR.teacher] || '');
    const st = S.byId[String(r[RO.sid])] || [];
    const dt = r[RO.date], dstr = dt instanceof Date ? Utilities.formatDate(dt, TZ, 'yyyy-MM-dd') : (String(dt || '') || today);
    try {
      addPrepayment_(name, groupName, teacher, String(st[ST.wa] || ''), String(r[RO.receipt] || ''), dstr, extra, month, 'переплата после изменения цены');
      dbSetCells_(R.sh, r.rowIndex, { 7: tuition, 14: nowStamp_() });
      out.push({ name: name, group: groupName, teacher: teacher, extra: extra });
    } catch (e) {}
  });
  cacheDrop_('prepays');
  return { success: true, count: out.length, items: out,
    message: out.length
      ? 'Переплата перенесена в предоплаты у ' + out.length + ': ' + out.map(function(o) { return o.name + ' ' + money_(o.extra); }).join(', ') + '.'
      : 'Учеников с переплатой не найдено — переносить нечего.' };
}

/** Руководитель задаёт цену группы; price = 0 или '' — вернуть цену по прайсу */
function setGroupPrice(role, password, month, teacherName, groupName, price, reason) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director') return { success: false, error: 'Стоимость группы меняет только руководитель.' };
  if (!cfg.useDb) return { success: false, error: 'Работает в режиме БАЗА.' };
  month = String(month || '').trim() || cfg.currentMonth;
  teacherName = String(teacherName || '').trim();
  groupName = String(groupName || '').trim();
  const g = dbGroup_(month, teacherName, groupName);
  if (!g) return { success: false, error: 'Группа не найдена за ' + month + '.' };
  const gid = String(g.row[GR.id]);
  const p = Math.round(parseNum_(price));
  const back = !p;
  if (!back) {
    if (p < 0 || p > 100000) return { success: false, error: 'Цена должна быть от 1 до 100 000 сом.' };
    if (!String(reason || '').trim()) return { success: false, error: 'Укажите причину — она попадёт в журнал изменений.' };
  }
  const listPrice = (function() { const x = priceFor_(readPrices_(), g.row[GR.level]); return x === null ? 0 : x; })();
  const was = Math.round(parseNum_(g.row[GR.price]));
  const sh = gpriceSheet_(), key = gpriceKey_(month, teacherName, groupName);
  let rowIndex = 0;
  if (sh.getLastRow() >= 2) sh.getRange(2, 8, sh.getLastRow() - 1, 1).getValues().forEach(function(r, i) { if (String(r[0]) === key) rowIndex = i + 2; });
  if (back) { if (rowIndex) sh.deleteRow(rowIndex); }
  else {
    const row = [month, teacherName, groupName, p, String(reason || '').trim(), 'руководитель', nowStamp_(), key];
    if (rowIndex) sh.getRange(rowIndex, 1, 1, GPRICE_H.length).setValues([row]); else sh.appendRow(row);
  }
  cacheDrop_('gprice');
  const newPrice = back ? listPrice : p;
  // цена в группе и стоимость ученикам
  dbSetCells_(g.sh, g.rowIndex, { 8: newPrice, 23: nowStamp_() });
  recomputeGroupTuition_(gid, newPrice);
  // кто ушёл в переплату после пересчёта — переплату сразу записываем в предоплаты
  const over = [];
  const S = dbStudents_(), today = isoToday_();
  const ro2 = dbRosterOfGroup_(gid);
  ro2.rows.forEach(function(r) {
    const tuition = Math.round(parseNum_(r[RO.tuition])), paid = Math.round(parseNum_(r[RO.paid]));
    const bal = tuition - paid;
    if (bal >= 0) return;
    const extra = -bal, name = String(r[RO.name] || '');
    const st = S.byId[String(r[RO.sid])] || [];
    const rec = String(r[RO.receipt] || ''), dt = r[RO.date];
    const dstr = dt instanceof Date ? Utilities.formatDate(dt, TZ, 'yyyy-MM-dd') : (String(dt || '') || today);
    let ok = false;
    try {
      if (typeof kassaOn_ === 'function' && kassaOn_()) {
        ok = kassaRebalanceRow_(String(r[RO.sid]), String(gid), 'снижение цены группы: ' + money_(was) + ' → ' + money_(newPrice)) > 0;
      } else {
        addPrepayment_(name, groupName, teacherName, String(st[ST.wa] || ''), rec, dstr, extra, month, 'снижение цены группы: ' + money_(was) + ' → ' + money_(newPrice));
        // оплата в строке становится равной стоимости — остаток 0, разница живёт в предоплатах
        dbSetCells_(ro2.sh, r.rowIndex, { 7: tuition, 14: nowStamp_() });
        ok = true;
      }
    } catch (e) {}
    over.push({ name: name, extra: extra, toPrepay: ok });
  });
  logChanges_('руководитель', groupName, '', teacherName,
    [['Стоимость группы', money_(was) + ' сом', money_(newPrice) + ' сом' + (back ? ' (по прайсу)' : ' · ' + String(reason || '').trim()) + ' · ' + month]]);
  return { success: true, price: newPrice, listPrice: listPrice, own: !back, over: over,
    message: back
      ? groupName + ' (' + teacherName + '): цена вернулась к прайсу — ' + money_(listPrice) + ' сом. Стоимость пересчитана.'
      : groupName + ' (' + teacherName + ', ' + month + '): своя цена ' + money_(p) + ' сом. Стоимость пересчитана ученикам' +
        (over.length ? '. Переплата записана в предоплаты (' + over.length + '): ' + over.map(function(o) { return o.name + ' ' + money_(o.extra); }).join(', ') : '') + '.' };
}

// ============================================================
// ПРАВО ПРАВИТЬ ДАТЫ ЗАНЯТИЙ (разрешает руководитель)
// ============================================================
const DPERM_SHEET = 'ПРАВКА_ДАТ';
const DPERM_H = ['Месяц', 'Преподаватель', 'Группа', 'Разрешено', 'Кем', 'Когда', 'Ключ'];
function dpermSheet_() { return dbSheet_(DPERM_SHEET, DPERM_H, [130, 200, 110, 110, 140, 140, 220]); }
function dpermKey_(month, teacher, group) { return [nameKey_(month), nameKey_(teacher), nameKey_(group || '')].join('|'); }
function dpermMap_() {
  return cacheGet_('dperm', function() {
    const sh = dpermSheet_(), out = {};
    if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, DPERM_H.length).getValues().forEach(function(r) {
      const k = String(r[6] || dpermKey_(r[0], r[1], r[2]));
      const v = String(r[3] || '').trim().toLowerCase();
      if (!v) return;
      out[k] = v === 'да' || v === 'yes' || v === 'true';
    });
    return out;
  });
}
/** true — разрешено руководителем, false — запрещено, null — по общему правилу */
function datesPermFor_(month, teacher, group) {
  const m = dpermMap_();
  const g = dpermKey_(month, teacher, group);
  if (m[g] !== undefined) return m[g];
  const t = dpermKey_(month, teacher, '');
  if (m[t] !== undefined) return m[t];
  return null;
}
/** Список преподавателей и групп с текущим правом (кабинет руководителя) */
function getDatesPerms(role, password, month) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const map = dpermMap_(), out = [];
  const byTeacher = {};
  if (cfg.useDb) {
    dbGroupsOfMonth_(month).forEach(function(g) {
      const t = String(g.row[GR.teacher] || ''), name = 'Группа ' + g.row[GR.num];
      (byTeacher[t] = byTeacher[t] || []).push({ group: name, level: String(g.row[GR.level] || ''), days: String(g.row[GR.days] || ''), time: String(g.row[GR.time] || ''),
        perm: map[dpermKey_(month, t, name)] === undefined ? null : map[dpermKey_(month, t, name)] });
    });
  }
  cfg.teachers.forEach(function(t) {
    if (String(t.status || '').toLowerCase() === 'не работает') return;
    const groups = byTeacher[t.short] || [];
    out.push({ short: t.short, full: t.full || t.short, groups: groups,
      perm: map[dpermKey_(month, t.short, '')] === undefined ? null : map[dpermKey_(month, t.short, '')] });
    delete byTeacher[t.short];
  });
  Object.keys(byTeacher).forEach(function(t) {
    out.push({ short: t, full: t, groups: byTeacher[t], perm: map[dpermKey_(month, t, '')] === undefined ? null : map[dpermKey_(month, t, '')] });
  });
  return { success: true, month: month, months: cfg.months, editUntilLesson: cfg.editUntilLesson || 3, teachers: out };
}
/** value: 'allow' | 'deny' | 'default'. group пустая — правило для всех групп преподавателя */
function setDatesPerm(role, password, month, teacher, group, value) {
  { const __c = closedErr_(month); if (__c) return __c; }   // закрытый месяц не редактируется
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  month = String(month || '').trim() || cfg.currentMonth;
  teacher = String(teacher || '').trim();
  group = String(group || '').trim();
  if (!teacher) return { success: false, error: 'Не указан преподаватель.' };
  const key = dpermKey_(month, teacher, group), sh = dpermSheet_();
  let rowIndex = 0;
  if (sh.getLastRow() >= 2) sh.getRange(2, 7, sh.getLastRow() - 1, 1).getValues().forEach(function(r, i) { if (String(r[0]) === key) rowIndex = i + 2; });
  const v = String(value || 'default');
  if (v === 'default') {
    if (rowIndex) sh.deleteRow(rowIndex);
  } else {
    const row = [month, teacher, group, v === 'allow' ? 'да' : 'нет', 'руководитель', nowStamp_(), key];
    if (rowIndex) sh.getRange(rowIndex, 1, 1, DPERM_H.length).setValues([row]); else sh.appendRow(row);
  }
  cacheDrop_('dperm');
  logChanges_('руководитель', group || '(все группы)', '', teacher,
    [['Правка дат занятий', '', (v === 'allow' ? 'разрешена' : v === 'deny' ? 'запрещена' : 'по общему правилу') + ' · ' + month]]);
  return { success: true, message: (group ? group + ' · ' : 'Все группы · ') + teacher + ': правка дат ' +
    (v === 'allow' ? 'разрешена' : v === 'deny' ? 'запрещена' : 'по общему правилу (до ' + (cfg.editUntilLesson || 3) + '-го занятия)') + '.' };
}

// ============================================================
// ВХОДЯЩИЕ ОПЛАТЫ: чек из WhatsApp (GREEN-API) → карточка для администратора
// Отдельный модуль. doPost принимает уведомления GREEN-API, ничего не меняет в оплатах сам.
// ============================================================
const INBOX_SHEET = 'ВХОДЯЩИЕ';
const INBOX_H = ['ID', 'Получено', 'Телефон', 'Имя в WhatsApp', 'Тип', 'Файл', 'Квитанция', 'Сумма из чека', 'Дата оплаты',
  'Ученик', 'Группа', 'Преподаватель', 'Месяц', 'Статус', 'Комментарий', 'ID сообщения',
  'Зачтено, сумма', 'Кто зачёл', 'Когда зачтено', 'Чек на Диске', 'Ключ'];
const IB = { id: 0, got: 1, phone: 2, chat: 3, type: 4, file: 5, receipt: 6, sum: 7, date: 8,
  student: 9, group: 10, teacher: 11, month: 12, status: 13, note: 14, msgId: 15,
  done: 16, by: 17, at: 18, drive: 19, key: 20 };
const IB_NEW = 'новая', IB_DONE = 'зачтено', IB_SKIP = 'отклонено';
const INBOX_FILES_FOLDER = 'ЧЕКИ — журнал Планета';

function inboxSheet_() { return dbSheet_(INBOX_SHEET, INBOX_H, [110, 130, 130, 180, 90, 260, 160, 100, 100, 200, 90, 150, 120, 100, 220, 200, 110, 130, 130, 260, 200]); }
function inboxAllowed_(role) { return role === 'admin' || role === 'director'; }

/** Папка на Диске для копий квитанций: «ЧЕКИ — журнал Планета» рядом с таблицей, внутри — папка месяца. */
function inboxFilesFolder_(month) {
  let parent;
  try {
    const it = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId()).getParents();
    parent = it.hasNext() ? it.next() : DriveApp.getRootFolder();
  } catch (e) { parent = DriveApp.getRootFolder(); }
  const ri = parent.getFoldersByName(INBOX_FILES_FOLDER);
  const root = ri.hasNext() ? ri.next() : parent.createFolder(INBOX_FILES_FOLDER);
  const name = String(month || '').trim() || 'без месяца';
  const si = root.getFoldersByName(name);
  return si.hasNext() ? si.next() : root.createFolder(name);
}

/**
 * Скачать квитанцию из WhatsApp и положить копию на Диск. Возвращает ссылку или ''.
 * Ссылки GREEN-API живут недолго — без копии старый чек через месяц уже не откроется.
 * НАСТРОЙКИ · ДОСТУП_К_ЧЕКАМ = «только владелец» — не открывать доступ по ссылке.
 */
function inboxSaveFileToDrive_(cfg, url, fileName, phone, receipt, month) {
  if (!String(url || '').trim()) return '';
  try {
    const resp = UrlFetchApp.fetch(String(url), { muteHttpExceptions: true, followRedirects: true });
    if (resp.getResponseCode() !== 200) return '';
    const blob = resp.getBlob();
    const ct = String(blob.getContentType() || '');
    const ext = /pdf/i.test(ct) ? '.pdf' : /png/i.test(ct) ? '.png' : /jpe?g/i.test(ct) ? '.jpg' : '';
    let base = String(fileName || '').replace(/[\\\/:*?"<>|]/g, ' ').trim();
    if (!base) base = String(receipt || phone || 'чек') + (ext || '.jpg');
    else if (ext && base.toLowerCase().slice(-ext.length) !== ext) base += ext;
    const name = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd HH-mm') + ' · ' + String(phone || '') + ' · ' + base;
    const file = inboxFilesFolder_(month).createFile(blob.setName(name));
    let access = 'по ссылке';
    try { access = String((cfg && cfg.settings && cfg.settings['ДОСТУП_К_ЧЕКАМ']) || 'по ссылке').trim().toLowerCase(); } catch (e) {}
    if (access.indexOf('только') !== 0) {
      try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) {}
    }
    return file.getUrl();
  } catch (e) { Logger.log('inboxSaveFileToDrive_: ' + e.message); return ''; }
}

/** Дата из ячейки «Получено» / «Когда зачтено» («09.09.2026 16:22») → Date или null */
function inboxWhen_(v) {
  if (v instanceof Date) return v;
  const s = String(v || '').trim();
  if (!s) return null;
  const m = s.match(/^(\d{1,2})[.\-\/](\d{1,2})[.\-\/](\d{4})(?:[\sT]+(\d{1,2}):(\d{2}))?/);
  if (m) return new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]), Number(m[4] || 0), Number(m[5] || 0));
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

/** Номер квитанции из имени файла: «P0909045715333.pdf» → «P0909045715333» */
function inboxReceiptFromName_(name) {
  let s = String(name || '').replace(/\.[a-z0-9]+$/i, '').trim();
  if (!s) return '';
  // имена вида «865d67ea-43ba-4889-bb2d-3d3769320191» (UUID из WhatsApp) и «IMG-20260910-WA0012» — не номера чеков
  s = s.replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/ig, ' ').replace(/\b(IMG|VID|PTT|WA|DOC|Screenshot|Снимок)[-_ ]?\d{6,}[-_ ]?\w*/ig, ' ');
  let m = s.match(/(?:^|[^A-Za-zА-Яа-я0-9])([PРpр]\d{13})(?![0-9A-Za-z])/);            // МБанк: Р + 13 цифр
  if (m) return 'P' + m[1].slice(1);
  m = s.match(/\b(KGNP\/\d{10,25})\b/i); if (m) return m[1];                           // «KGNP/…»
  m = s.match(/(?:^|[^0-9A-Za-zА-Яа-я])(\d{9,20})(?![0-9])/);                             // просто длинное число без букв рядом
  if (m && '996755494494'.indexOf(m[1]) !== -1) return '';                                    // номер центра из текста перевода — не квитанция
  return m ? m[1] : '';
}
/** Сумма из подписи к файлу или текста сообщения: «2300», «2 300 сом», «2,300.00 KGS» */
function inboxSumFromText_(text) {
  const t = String(text || '').replace(/\u00a0/g, ' ');
  const m = t.match(/(\d[\d\s.,]{2,12})\s*(?:сом|kgs|с\b|₸|som)/i) || t.match(/итого[^\d]{0,10}(\d[\d\s.,]{2,12})/i);
  if (!m) return 0;
  let v = m[1].replace(/\s/g, '');
  if (/,\d{2}$/.test(v)) v = v.replace(/\./g, '').replace(',', '.');
  else v = v.replace(/,/g, '');
  const n = Math.round(parseFloat(v));
  return isNaN(n) || n <= 0 || n > 500000 ? 0 : n;
}

/** Похоже ли сообщение на банковский чек. Возвращает {ok, receipt, sum, why} */
function inboxLooksLikePayment_(cfg, type, fileName, text) {
  const name = String(fileName || ''), t = (String(text || '') + ' ' + name).toLowerCase();
  const receipt = inboxReceiptFromName_(name) || inboxReceiptFromName_(text);
  const sum = inboxSumFromText_(text);
  const BANK = ['mbank', 'мбанк', 'м-банк', 'optima', 'оптима', 'одengi', 'о!деньги', 'odengi', 'элсом', 'elsom', 'демир', 'demir',
    'kicb', 'кыргызкоммерц', 'рск', 'rsk', 'айыл', 'ayil', 'bakai', 'бакай', 'компаньон', 'companion', 'финка', 'finca',
    'керемет', 'keremet', 'balance.kg', 'мегаком', 'о деньги'];
  const PAY = ['квитанц', 'чек', 'оплат', 'оплач', 'перевод', 'перевел', 'перевёл', 'перевела', 'итого', 'kgs', 'сом',
    'төлө', 'төлөм', 'акча', 'receipt', 'payment', 'transfer'];
  let extra = [];
  try { extra = String(cfg.settings['СЛОВА_ОПЛАТЫ'] || '').split(',').map(function(s) { return s.trim().toLowerCase(); }).filter(Boolean); } catch (e) {}
  const has = function(list) { return list.some(function(w) { return t.indexOf(w) !== -1; }); };
  const bankWord = has(BANK) || has(extra), payWord = has(PAY);
  const isPdf = /\.pdf$/i.test(name);
  const numberLike = !!receipt;

  if (type === 'documentMessage') {
    if (isPdf && (numberLike || bankWord || payWord)) return { ok: true, receipt: receipt, sum: sum, why: '' };
    if (!isPdf && numberLike && (bankWord || payWord)) return { ok: true, receipt: receipt, sum: sum, why: '' };
    return { ok: false, why: 'файл не похож на квитанцию' };
  }
  if (type === 'imageMessage') {
    if (numberLike || bankWord || payWord || sum) return { ok: true, receipt: receipt, sum: sum, why: '' };
    let mode = 'принимать';
    try { mode = String(cfg.settings['ФОТО_БЕЗ_ПОДПИСИ'] || 'принимать').trim().toLowerCase(); } catch (e) {}
    if (mode.indexOf('пропуск') === 0) return { ok: false, why: 'фото без подписи' };
    return { ok: true, receipt: '', sum: 0, why: 'фото без подписи — проверьте, это чек или нет' };
  }
  // обычный текст: нужна и сумма, и слово про оплату (иначе это просто переписка)
  if (sum && (payWord || bankWord || numberLike)) return { ok: true, receipt: receipt, sum: sum, why: 'оплата без файла — чек не приложен' };
  if (numberLike && (payWord || bankWord)) return { ok: true, receipt: receipt, sum: sum, why: 'номер квитанции без файла' };
  return { ok: false, why: 'обычное сообщение' };
}

/** Найти учеников по номеру родителя в текущем месяце: [{name, group, teacher, tuition, paid, balance, row}] */
function inboxFindStudents_(cfg, phone, month) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits || !cfg.useDb) return [];
  month = String(month || cfg.currentMonth);
  const S = dbStudents_(), ids = {};
  S.rows.forEach(function(r) {
    [r[ST.wa], r[ST.dad], r[ST.mom], r[ST.stu]].forEach(function(p) {
      const d = String(p || '').replace(/\D/g, '');
      if (d && (d === digits || d.slice(-9) === digits.slice(-9))) ids[String(r[ST.id])] = true;
    });
  });
  if (!Object.keys(ids).length) return [];
  const gm = {};
  dbGroupsOfMonth_(month).forEach(function(g) { gm[String(g.row[GR.id])] = g.row; });
  const out = [];
  dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
    if (!ids[String(r[RO.sid])]) return;
    const g = gm[String(r[RO.gid])];
    if (!g) return;
    const tuition = Math.round(parseNum_(r[RO.tuition])), paid = Math.round(parseNum_(r[RO.paid]));
    const dt = r[RO.date];
    out.push({ sid: String(r[RO.sid]), name: String(r[RO.name] || ''), group: 'Группа ' + g[GR.num], teacher: String(g[GR.teacher] || ''),
      month: month, row: T_FIRST_ROW + Number(r[RO.num]) - 1, tuition: tuition, paid: paid, balance: tuition - paid,
      receipt: String(r[RO.receipt] || ''), payDate: dt instanceof Date ? Utilities.formatDate(dt, TZ, 'dd.MM.yyyy') : String(dt || '') });
  });
  return out;
}

/** Приём уведомлений GREEN-API. Адрес: <ссылка веб-приложения>/exec?wh=<INBOX_TOKEN> */
function doPost(e) {
  const ok = ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  try {
    let token = '';
    try { token = String(getConfig_().settings['КЛЮЧ_ВЕБХУКА'] || '').trim(); } catch (err) {}
    if (!token) token = String(PropertiesService.getScriptProperties().getProperty('INBOX_TOKEN') || '').trim();
    if (token && String((e && e.parameter && e.parameter.wh) || '') !== token) return ok;   // ключ задан и не совпал — игнорируем
    const body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    if (String(body.typeWebhook || '') !== 'incomingMessageReceived') return ok;
    const md = body.messageData || {}, sd = body.senderData || {};
    const chatId = String(sd.chatId || '');
    if (chatId.indexOf('@c.us') === -1) return ok;              // группы не берём
    const phone = chatId.replace(/\D/g, '');
    const type = String(md.typeMessage || '');
    let fileUrl = '', fileName = '', text = '';
    if (type === 'documentMessage' || type === 'imageMessage') {
      const f = md.fileMessageData || {};
      fileUrl = String(f.downloadUrl || ''); fileName = String(f.fileName || ''); text = String(f.caption || '');
    } else if (type === 'textMessage') {
      text = String((md.textMessageData || {}).textMessage || '');
    } else if (type === 'extendedTextMessage') {
      text = String((md.extendedTextMessageData || {}).text || '');
    } else return ok;
    const cfg = getConfig_();
    // в очередь попадают только банковские чеки — переписка и прочие файлы проходят мимо
    inboxAddMessage_(cfg, inboxSheet_(), String(body.idMessage || ''), phone,
      String(sd.senderName || sd.chatName || ''), type, fileUrl, fileName, text, nowStamp_());
    cacheDrop_('inbox');
  } catch (err) { Logger.log('doPost: ' + err.message); }
  return ok;
}


/** Добавить одно сообщение в лист ВХОДЯЩИЕ, если это чек. Возвращает 'added' | 'dup' | 'skip' */
function inboxAddMessage_(cfg, sh, msgId, phone, chatName, type, fileUrl, fileName, text, when) {
  const check = inboxLooksLikePayment_(cfg, type, fileName, text);
  if (!check.ok) return 'skip';
  if (msgId && sh.getLastRow() >= 2) {
    const ids = sh.getRange(2, IB.msgId + 1, sh.getLastRow() - 1, 1).getValues();
    for (let i = 0; i < ids.length; i++) if (String(ids[i][0]) === String(msgId)) return 'dup';
  }
  const found = inboxFindStudents_(cfg, phone, cfg.currentMonth);
  const one = found.length === 1 ? found[0] : null;
  const id = 'В-' + Utilities.formatDate(new Date(), TZ, 'yyMMddHHmmss') + String(Math.floor(Math.random() * 90 + 10));
  // копия квитанции сразу уходит на Диск: ссылка WhatsApp через месяц уже не откроется
  const drive = inboxSaveFileToDrive_(cfg, fileUrl, fileName, phone, check.receipt, cfg.currentMonth);
  // номер и сумма из самого чека (PDF или фото) — чтобы кассиру оставалось только подтвердить
  let rec = String(check.receipt || ''), sum = check.sum || '', dateIn = '', ocrNote = '';
  const recReal = /^[PР]\d{13}$/.test(normalizeReceiptNumber_(rec)) || /^KGNP\d{10,}$/.test(normalizeReceiptNumber_(rec));
  if (drive && (!recReal || !sum) && typeof ksFileText_ === 'function') {
    try {
      const p = ksParseReceiptText_(ksFileText_(ksDriveIdFromUrl_(drive)));
      const realNo = function(n) { const k = normalizeReceiptNumber_(n); return /^[PР]\d{13}$/.test(k) || /^KGNP\d{10,}$/.test(k); };
      if (p.no && (!rec || (realNo(p.no) && !realNo(rec)))) rec = p.no;   // номер с самого чека важнее номера из имени файла
      if (p.sum && (!sum || realNo(p.no))) sum = p.sum;
      if (p.date) dateIn = p.date;
      ocrNote = (p.no || p.sum) ? 'распознано' + (p.bank ? ' (' + p.bank + ')' : '') : 'распознать не удалось';
    } catch (e) { ocrNote = 'распознать не удалось: ' + String(e.message).slice(0, 60); }
  }
  sh.appendRow([id, when || nowStamp_(), phone, String(chatName || ''), type, fileUrl || '', rec, sum, dateIn,
    found.map(function(f) { return f.name; }).join(' / '), one ? one.group : '', one ? one.teacher : '', cfg.currentMonth,
    IB_NEW, [check.why, found.length ? '' : 'ученик по номеру не найден', ocrNote].filter(Boolean).join(' · '), String(msgId || ''),
    '', '', '', drive, id]);
  return 'added';
}

/** Забрать уже пришедшие сообщения из GREEN-API за последние N часов и вытащить из них чеки */
function inboxFetchRecent(role, password, hours) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !inboxAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const props = PropertiesService.getScriptProperties();
  const base = String(props.getProperty('GREEN_API_URL') || 'https://api.green-api.com').replace(/\/+$/, '');
  const gid = String(props.getProperty('GREEN_API_ID') || '').trim();
  const token = String(props.getProperty('GREEN_API_TOKEN') || '').trim();
  if (!gid || !token) return { success: false, error: 'GREEN-API не настроен: нужны свойства скрипта GREEN_API_ID и GREEN_API_TOKEN.' };
  const h = Math.min(24, Math.max(1, Math.round(parseNum_(hours)) || 24));
  const url = base + '/waInstance' + gid + '/lastIncomingMessages/' + token + '?minutes=' + (h * 60);
  let list = [];
  try {
    const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    if (resp.getResponseCode() !== 200) return { success: false, error: 'GREEN-API ответил ' + resp.getResponseCode() + '. Проверьте ID и токен инстанса.' };
    list = JSON.parse(resp.getContentText() || '[]');
    if (!Array.isArray(list)) list = [];
  } catch (e) { return { success: false, error: 'Не удалось получить сообщения: ' + e.message }; }
  const sh = inboxSheet_();
  let added = 0, dup = 0, skip = 0;
  list.forEach(function(m) {
    try {
      const chatId = String(m.chatId || '');
      if (chatId.indexOf('@c.us') === -1) { skip++; return; }
      const type = String(m.typeMessage || '');
      let fileUrl = '', fileName = '', text = '';
      if (type === 'documentMessage' || type === 'imageMessage') {
        fileUrl = String(m.downloadUrl || ''); fileName = String(m.fileName || ''); text = String(m.caption || '');
      } else if (type === 'textMessage' || type === 'extendedTextMessage') {
        text = String(m.textMessage || m.extendedTextMessage || '');
      } else { skip++; return; }
      const when = m.timestamp ? Utilities.formatDate(new Date(Number(m.timestamp) * 1000), TZ, 'dd.MM.yyyy HH:mm') : nowStamp_();
      const res = inboxAddMessage_(cfg, sh, m.idMessage, chatId.replace(/\D/g, ''), m.senderName || m.chatName || '', type, fileUrl, fileName, text, when);
      if (res === 'added') added++; else if (res === 'dup') dup++; else skip++;
    } catch (e) { skip++; }
  });
  cacheDrop_('inbox');
  return { success: true, hours: h, scanned: list.length, added: added, dup: dup, skip: skip,
    message: 'Просмотрено сообщений: ' + list.length + ' за ' + h + ' ч. Добавлено чеков: ' + added +
      (dup ? '. Уже были в очереди: ' + dup : '') + (skip ? '. Не чеки: ' + skip : '') + '.' };
}

/** Список входящих для администратора: карточки с найденными учениками */
function getInbox(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !inboxAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const sh = inboxSheet_();
  const rows = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, INBOX_H.length).getValues() : [];
  // какие номера квитанций уже стоят в оплатах — такие чеки в очереди показывать не нужно
  const usedRec = {};
  try {
    const G2 = dbTable_(DB_GROUPS, DB_GROUPS_H), gm = {};
    G2.rows.forEach(function(g) { gm[String(g[GR.id])] = g; });
    dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
      const raw = String(r[RO.receipt] || '').trim();
      if (!raw) return;
      const g = gm[String(r[RO.gid])] || [], dt = r[RO.date];
      raw.split(/[;,]/).forEach(function(p) {
        const k = normalizeReceiptNumber_(p);
        if (!k) return;
        (usedRec[k] = usedRec[k] || []).push({ student: String(r[RO.name] || ''), group: 'Группа ' + (g[GR.num] || '?'),
          teacher: String(g[GR.teacher] || ''), month: String(g[GR.month] || ''), amount: Math.round(parseNum_(r[RO.paid])),
          date: dt instanceof Date ? Utilities.formatDate(dt, TZ, 'dd.MM.yyyy') : String(dt || '') });
      });
    });
  } catch (e) {}
  const items = [], done = [];
  rows.forEach(function(r, i) {
    if (String(r[IB.status] || IB_NEW) !== IB_NEW) return;
    const found = inboxFindStudents_(cfg, r[IB.phone], cfg.currentMonth);
    const rec = normalizeReceiptNumber_(String(r[IB.receipt] || ''));
    const hit = rec && usedRec[rec] ? usedRec[rec] : null;
    const item = { id: String(r[IB.id]), got: String(r[IB.got] || ''), phone: String(r[IB.phone] || ''), chat: String(r[IB.chat] || ''),
      file: String(r[IB.file] || ''), receipt: String(r[IB.receipt] || ''), sum: Math.round(parseNum_(r[IB.sum])),
      note: String(r[IB.note] || ''), students: found, rowIndex: i + 2, paidRows: hit || [] };
    if (hit) done.push(item); else items.push(item);
  });
  items.reverse(); done.reverse();
  const closed = rows.filter(function(r) { return String(r[IB.status]) === IB_DONE; }).length;
  const removed = rows.filter(function(r) { return String(r[IB.status]) === IB_SKIP; }).length;
  let hook = '';
  try {
    const key = String(cfg.settings['КЛЮЧ_ВЕБХУКА'] || '').trim();
    let url = '';
    try { url = ScriptApp.getService().getUrl(); } catch (err) { url = ''; }
    hook = url ? url + (key ? '?wh=' + key : '') : (key ? 'ссылка вашего веб-приложения /exec?wh=' + key : 'ссылка вашего веб-приложения, которая заканчивается на /exec');
  } catch (err) {}
  return { success: true, month: cfg.currentMonth, items: items, alreadyPaid: done, hook: hook, total: rows.length,
    stats: { waiting: items.length, already: done.length, done: closed, removed: removed } };
}

/** Зачесть входящий чек: обычное сохранение оплаты + пометка «зачтено» */
function inboxAccept(role, password, id, sid, amount, receipt, date) {
  if (typeof kassaOn_ === 'function' && kassaOn_()) return KASSA_ONLY_;   // режим кассы: этот путь закрыт
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !inboxAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const sh = inboxSheet_();
  const rows = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, INBOX_H.length).getValues() : [];
  let rowIndex = 0, rec = null;
  rows.forEach(function(r, i) { if (String(r[IB.id]) === String(id)) { rowIndex = i + 2; rec = r; } });
  if (!rec) return { success: false, error: 'Запись не найдена.' };
  const found = inboxFindStudents_(cfg, rec[IB.phone], cfg.currentMonth);
  const st = found.filter(function(f) { return String(f.sid) === String(sid); })[0] || (found.length === 1 ? found[0] : null);
  if (!st) return { success: false, error: 'Выберите ученика.' };
  const paidNow = Math.round(parseNum_(amount));
  if (!paidNow || paidNow < 0) return { success: false, error: 'Укажите сумму из чека.' };
  const res = savePaymentRow(password, st.month, st.teacher, st.group, st.row,
    { paid: st.paid + paidNow, receipt: String(receipt || rec[IB.receipt] || ''), date: String(date || '') || isoToday_(), receiptTotal: paidNow });
  if (!res || !res.success) return res || { success: false, error: 'Не удалось сохранить оплату.' };
  sh.getRange(rowIndex, IB.student + 1, 1, 5).setValues([[st.name, st.group, st.teacher, st.month, IB_DONE]]);
  sh.getRange(rowIndex, IB.note + 1).setValue('зачтено ' + roleTitle_(actual) + ' ' + nowStamp_() + (rec[IB.note] ? ' · ' + rec[IB.note] : ''));
  sh.getRange(rowIndex, IB.done + 1, 1, 3).setValues([[paidNow, roleTitle_(actual), nowStamp_()]]);
  sh.getRange(rowIndex, IB.date + 1).setValue(String(date || '') || isoToday_());
  if (!String(rec[IB.drive] || '').trim()) {
    const link = inboxSaveFileToDrive_(cfg, rec[IB.file], '', rec[IB.phone], rec[IB.receipt], st.month);
    if (link) sh.getRange(rowIndex, IB.drive + 1).setValue(link);
  }
  cacheDrop_('inbox');
  return { success: true, message: st.name + ': оплата ' + money_(paidNow) + ' сом сохранена (' + st.group + ', ' + st.teacher + ').' };
}
function money_(n) { return String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

/** Убрать из очереди все чеки, номера которых уже стоят в оплатах */
function inboxDismissPaid(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !inboxAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const list = getInbox(role, password);
  if (!list.success) return list;
  const pay = {};
  (list.alreadyPaid || []).forEach(function(x) { pay[String(x.id)] = (x.paidRows || [])[0] || {}; });
  const ids = Object.keys(pay);
  if (!ids.length) return { success: true, count: 0, message: 'Переносить нечего: таких чеков нет.' };
  const sh = inboxSheet_();
  const rows = sh.getRange(2, 1, sh.getLastRow() - 1, INBOX_H.length).getValues();
  let n = 0;
  rows.forEach(function(r, i) {
    if (ids.indexOf(String(r[IB.id])) === -1) return;
    const p = pay[String(r[IB.id])] || {};
    // квитанция действительно стоит в оплатах — это зачтённый чек, а не мусор
    sh.getRange(i + 2, IB.student + 1, 1, 5).setValues([[String(p.student || r[IB.student] || ''), String(p.group || r[IB.group] || ''),
      String(p.teacher || r[IB.teacher] || ''), String(p.month || r[IB.month] || ''), IB_DONE]]);
    sh.getRange(i + 2, IB.done + 1, 1, 3).setValues([[Math.round(parseNum_(p.amount)) || '', roleTitle_(actual), nowStamp_()]]);
    if (p.date) sh.getRange(i + 2, IB.date + 1).setValue(String(p.date));
    sh.getRange(i + 2, IB.note + 1).setValue('квитанция уже проведена в оплатах · ' + roleTitle_(actual) + ' ' + nowStamp_());
    if (!String(r[IB.drive] || '').trim()) {
      const link = inboxSaveFileToDrive_(cfg, r[IB.file], '', r[IB.phone], r[IB.receipt], p.month || r[IB.month]);
      if (link) sh.getRange(i + 2, IB.drive + 1).setValue(link);
    }
    n++;
  });
  cacheDrop_('inbox');
  return { success: true, count: n, message: 'Перенесено в «Зачисленные»: ' + n + ' ' + (n === 1 ? 'чек' : 'чеков') + ' — эти квитанции уже проведены в оплатах.' };
}

/** Убрать входящий чек из очереди (не оплата, дубль, разберёмся позже) */
function inboxDismiss(role, password, id, why) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !inboxAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const sh = inboxSheet_();
  const rows = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, INBOX_H.length).getValues() : [];
  let rowIndex = 0;
  rows.forEach(function(r, i) { if (String(r[IB.id]) === String(id)) rowIndex = i + 2; });
  if (!rowIndex) return { success: false, error: 'Запись не найдена.' };
  sh.getRange(rowIndex, IB.status + 1).setValue(IB_SKIP);
  sh.getRange(rowIndex, IB.note + 1).setValue(String(why || '') + ' · ' + roleTitle_(actual) + ' ' + nowStamp_());
  sh.getRange(rowIndex, IB.by + 1, 1, 2).setValues([[roleTitle_(actual), nowStamp_()]]);
  cacheDrop_('inbox');
  return { success: true, message: 'Чек в ящике «Убранные».' };
}

/**
 * Отметить входящий чек зачтённым: ученик, группа, сумма, кто зачёл и когда.
 * Чек не удаляется — он переходит в ящик «Зачисленные» и остаётся там навсегда.
 */
function inboxSettle(role, password, id, info) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !inboxAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const sh = inboxSheet_();
  const rows = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, INBOX_H.length).getValues() : [];
  let rowIndex = 0, rec = null;
  rows.forEach(function(r, i) { if (String(r[IB.id]) === String(id)) { rowIndex = i + 2; rec = r; } });
  if (!rowIndex) return { success: false, error: 'Запись не найдена.' };
  const o = info || {};
  const month = String(o.month || rec[IB.month] || cfg.currentMonth);
  sh.getRange(rowIndex, IB.student + 1, 1, 5).setValues([[String(o.student || rec[IB.student] || ''),
    String(o.group || rec[IB.group] || ''), String(o.teacher || rec[IB.teacher] || ''), month, IB_DONE]]);
  sh.getRange(rowIndex, IB.done + 1, 1, 3).setValues([[Math.round(parseNum_(o.amount)) || '', roleTitle_(actual), nowStamp_()]]);
  if (o.receipt && !String(rec[IB.receipt] || '').trim()) sh.getRange(rowIndex, IB.receipt + 1).setValue(String(o.receipt));
  if (o.date) sh.getRange(rowIndex, IB.date + 1).setValue(String(o.date));
  if (!String(rec[IB.drive] || '').trim()) {
    const link = inboxSaveFileToDrive_(cfg, rec[IB.file], '', rec[IB.phone], rec[IB.receipt], month);
    if (link) sh.getRange(rowIndex, IB.drive + 1).setValue(link);
  }
  cacheDrop_('inbox');
  return { success: true, message: 'Чек перенесён в «Зачисленные».' };
}

/**
 * Ящик «Зачисленные» (box = 'done') или «Убранные» (box = 'skip') за период.
 * days: 7 / 30 / 100 / 365, 0 — за всё время. query — фамилия, номер квитанции или телефон.
 * Только чтение: оплаты и чеки не меняются.
 */
function getInboxArchive(role, password, box, days, query) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !inboxAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const want = String(box || 'done') === 'skip' ? IB_SKIP : IB_DONE;
  const back = Math.max(0, Math.round(parseNum_(days)));
  const from = back ? new Date(Date.now() - back * 86400000) : null;
  const q = String(query || '').trim().toLowerCase();
  const sh = inboxSheet_();
  const rows = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, INBOX_H.length).getValues() : [];
  const items = [];
  let sum = 0;
  rows.forEach(function(r) {
    if (String(r[IB.status] || '') !== want) return;
    const when = inboxWhen_(r[IB.at]) || inboxWhen_(r[IB.got]);
    if (from && when && when < from) return;
    const it = { id: String(r[IB.id]), got: String(r[IB.got] || ''), phone: String(r[IB.phone] || ''), chat: String(r[IB.chat] || ''),
      receipt: String(r[IB.receipt] || ''), sum: Math.round(parseNum_(r[IB.sum])), amount: Math.round(parseNum_(r[IB.done])),
      student: String(r[IB.student] || ''), group: String(r[IB.group] || ''), teacher: String(r[IB.teacher] || ''),
      month: String(r[IB.month] || ''), by: String(r[IB.by] || ''), at: String(r[IB.at] || ''), payDate: String(r[IB.date] || ''),
      note: String(r[IB.note] || ''), file: String(r[IB.file] || ''), drive: String(r[IB.drive] || ''),
      ts: when ? when.getTime() : 0 };
    if (q) {
      const hay = [it.student, it.chat, it.phone, it.receipt, it.group, it.teacher, it.note].join(' ').toLowerCase();
      if (hay.indexOf(q) === -1) return;
    }
    sum += it.amount;
    items.push(it);
  });
  items.sort(function(a, b) { return b.ts - a.ts; });
  const total = items.length;
  return { success: true, box: want === IB_SKIP ? 'skip' : 'done', days: back, query: String(query || ''),
    items: items.slice(0, 400), total: total, shown: Math.min(total, 400), sum: sum };
}

/** Вернуть чек из «Зачисленных» или «Убранных» обратно в «Новые». Оплату в журнале не трогает. */
function inboxReturnToNew(role, password, id) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual || !inboxAllowed_(actual)) return { success: false, error: 'Недоступно.' };
  const sh = inboxSheet_();
  const rows = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, INBOX_H.length).getValues() : [];
  let rowIndex = 0, rec = null;
  rows.forEach(function(r, i) { if (String(r[IB.id]) === String(id)) { rowIndex = i + 2; rec = r; } });
  if (!rowIndex) return { success: false, error: 'Запись не найдена.' };
  sh.getRange(rowIndex, IB.status + 1).setValue(IB_NEW);
  sh.getRange(rowIndex, IB.done + 1, 1, 3).setValues([['', '', '']]);
  sh.getRange(rowIndex, IB.note + 1).setValue('возвращено в очередь · ' + roleTitle_(actual) + ' ' + nowStamp_());
  cacheDrop_('inbox');
  return { success: true, message: 'Чек вернулся в «Новые».' };
}

/**
 * ЗАПУСТИТЬ ОДИН РАЗ (можно повторять): сохранить на Диск копии чеков, пришедших раньше.
 * Ссылки WhatsApp живут недолго, поэтому часть старых файлов уже не скачается — это нормально.
 */
function inboxArchiveFiles() {
  const cfg = getConfig_();
  const sh = inboxSheet_();
  const rows = sh.getLastRow() >= 2 ? sh.getRange(2, 1, sh.getLastRow() - 1, INBOX_H.length).getValues() : [];
  const t0 = Date.now();
  let saved = 0, failed = 0, left = 0;
  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (!String(r[IB.file] || '').trim() || String(r[IB.drive] || '').trim()) continue;
    if (Date.now() - t0 > 240000) { left++; continue; }
    const link = inboxSaveFileToDrive_(cfg, r[IB.file], '', r[IB.phone], r[IB.receipt], r[IB.month] || cfg.currentMonth);
    if (link) { sh.getRange(i + 2, IB.drive + 1).setValue(link); saved++; } else failed++;
  }
  cacheDrop_('inbox');
  const msg = 'Копий чеков сохранено на Диск: ' + saved +
    (failed ? '. Не скачались (старые ссылки WhatsApp уже недоступны): ' + failed : '') +
    (left ? '. Осталось на следующий запуск: ' + left + ' — запустите функцию ещё раз.' : '');
  Logger.log(msg);
  return msg;
}

/** ЗАПУСТИТЬ ОДИН РАЗ: создаёт лист ВХОДЯЩИЕ и печатает ключ для адреса GREEN-API */
function setupInboxWebhook() {
  const props = PropertiesService.getScriptProperties();
  let token = String(props.getProperty('INBOX_TOKEN') || '').trim();
  if (!token) {
    token = String(Date.now()).slice(-6) + Math.random().toString(36).slice(2, 8);
    props.setProperty('INBOX_TOKEN', token);
  }
  try { inboxSheet_(); } catch (e) { Logger.log('лист ВХОДЯЩИЕ: ' + e.message); }
  let url = '';
  try { url = ScriptApp.getService().getUrl(); } catch (e) { url = ''; }   // адрес может быть недоступен — не страшно
  const msg = url
    ? 'Адрес для GREEN-API (webhookUrl):\n' + url + '?wh=' + token
    : 'Ключ: ' + token + '\nАдрес для GREEN-API соберите сами: возьмите ссылку вашего веб-приложения (Развернуть → Управление развертываниями → «URL веб-приложения», заканчивается на /exec) и допишите к ней:  ?wh=' + token +
      '\nПолучится:  https://script.google.com/macros/s/…/exec?wh=' + token;
  const tail = '\n\nВ консоли GREEN-API: Инстансы → ваш инстанс → Настройки → webhookUrl = адрес выше,' +
    '\nвключите «Входящие сообщения и файлы» (incomingWebhook = yes).' +
    '\nЛист ВХОДЯЩИЕ готов. Чеки появятся в кассе → «Чеки».';
  Logger.log(msg + tail);
  return msg + tail;
}

/** Показать ключ и адрес ещё раз (если потеряли) */
function showInboxWebhook() { return setupInboxWebhook(); }

// ============================================================
// ЭКСПОРТ КОНТАКТОВ УЧЕНИКОВ В VCF (кабинет руководителя)
// Отдельный модуль: читает лист УЧЕНИКИ и состав групп, ничего не меняет в базе.
// ============================================================
const VCF_PREFIX = 'У';   // как начинается имя контакта: «У — Иманбекова Раяна»

/** Телефон родителя в формате +996XXXXXXXXX; '' — если номера нет или он некорректен */
function vcfPhone_(row) {
  const cand = [row[ST.wa], row[ST.dad], row[ST.mom], row[ST.stu]];
  for (let i = 0; i < cand.length; i++) {
    const r = normalizeWhatsapp_(cand[i]);
    if (r && r.value) return '+' + r.value;
  }
  return '';
}
/** «Мамытов Айдай» + «Мамытов Эльхан» → «Мамытов Айдай / Эльхан» */
function vcfMergeNames_(names) {
  const uniq = [];
  names.forEach(function(n) { n = String(n || '').replace(/\s+/g, ' ').trim(); if (n && uniq.indexOf(n) === -1) uniq.push(n); });
  if (uniq.length <= 1) return uniq[0] || '';
  const fam = uniq.map(function(n) { return n.split(' ')[0]; });
  const same = fam.every(function(f) { return f.toLowerCase() === fam[0].toLowerCase(); });
  if (!same) return uniq.join(' / ');
  const rest = uniq.map(function(n) { const p = n.split(' '); return p.slice(1).join(' ') || p[0]; });
  return fam[0] + ' ' + rest.join(' / ');
}
function vcfEsc_(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n'); }

/**
 * Собрать контакты. scope: 'month' — ученики в группах выбранного месяца (по умолчанию),
 * 'all' — все ученики со статусом «учится». Возвращает статистику и текст VCF.
 */
function exportContacts(role, password, scope, month) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director') return { success: false, error: 'Экспорт контактов доступен только руководителю.' };
  if (!cfg.useDb) return { success: false, error: 'Экспорт работает в режиме БАЗА (лист УЧЕНИКИ).' };
  scope = String(scope || 'month');
  month = String(month || '').trim() || cfg.currentMonth;

  const S = dbStudents_();
  // кто сейчас учится: состав групп выбранного месяца
  const inMonth = {}, groupsOf = {};
  if (scope === 'month') {
    const gm = {};
    dbGroupsOfMonth_(month).forEach(function(g) { gm[String(g.row[GR.id])] = g.row; });
    dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
      const g = gm[String(r[RO.gid])];
      if (!g) return;
      const sid = String(r[RO.sid]);
      inMonth[sid] = true;
      (groupsOf[sid] = groupsOf[sid] || []).push('Группа ' + g[GR.num] + ' · ' + String(g[GR.teacher] || ''));
    });
  }
  let total = 0, noPhone = 0;
  const byPhone = {};
  S.rows.forEach(function(r) {
    const status = String(r[ST.status] || '').toLowerCase();
    if (status === 'выбыл') return;
    const sid = String(r[ST.id]);
    if (scope === 'month' && !inMonth[sid]) return;
    const name = String(r[ST.name] || '').trim();
    if (!name) return;
    total++;
    const phone = vcfPhone_(r);
    if (!phone) { noPhone++; return; }
    if (!byPhone[phone]) byPhone[phone] = { phone: phone, names: [], groups: [] };
    byPhone[phone].names.push(name);
    (groupsOf[sid] || []).forEach(function(g) { if (byPhone[phone].groups.indexOf(g) === -1) byPhone[phone].groups.push(g); });
  });

  const phones = Object.keys(byPhone).sort();
  let merged = 0;
  const cards = phones.map(function(p) {
    const c = byPhone[p];
    if (c.names.length > 1) merged += c.names.length - 1;
    const title = VCF_PREFIX + ' — ' + vcfMergeNames_(c.names);
    const note = (c.names.length > 1 ? 'Ученики: ' + c.names.join(', ') : '') + (c.groups.length ? (c.names.length > 1 ? ' · ' : '') + c.groups.join(', ') : '');
    return ['BEGIN:VCARD', 'VERSION:3.0',
      'N;CHARSET=UTF-8:' + vcfEsc_(title) + ';;;;',
      'FN;CHARSET=UTF-8:' + vcfEsc_(title),
      'ORG;CHARSET=UTF-8:' + vcfEsc_('Образовательный центр «Планета»'),
      'TEL;TYPE=CELL:' + c.phone,
      note ? 'NOTE;CHARSET=UTF-8:' + vcfEsc_(note) : '',
      'END:VCARD'].filter(Boolean).join('\r\n');
  });
  const vcf = cards.join('\r\n') + '\r\n';
  const stamp = Utilities.formatDate(new Date(), TZ, 'yyyy-MM-dd');
  return { success: true, month: month, scope: scope,
    stats: { total: total, unique: phones.length, merged: merged, noPhone: noPhone },
    fileName: 'planeta-contacts-' + (scope === 'month' ? nameKey_(month).replace(/\s+/g, '') : 'all') + '-' + stamp + '.vcf',
    vcf: vcf };
}

/** Список учеников без номера — чтобы было понятно, кого дозаполнить */
function contactsMissingPhones(role, password, scope, month) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  scope = String(scope || 'month');
  month = String(month || '').trim() || cfg.currentMonth;
  const S = dbStudents_(), out = [];
  const inMonth = {}, gname = {};
  if (scope === 'month') {
    const gm = {};
    dbGroupsOfMonth_(month).forEach(function(g) { gm[String(g.row[GR.id])] = g.row; });
    dbTable_(DB_ROSTER, DB_ROSTER_H).rows.forEach(function(r) {
      const g = gm[String(r[RO.gid])]; if (!g) return;
      inMonth[String(r[RO.sid])] = true;
      gname[String(r[RO.sid])] = 'Группа ' + g[GR.num] + ' · ' + String(g[GR.teacher] || '');
    });
  }
  S.rows.forEach(function(r) {
    if (String(r[ST.status] || '').toLowerCase() === 'выбыл') return;
    const sid = String(r[ST.id]);
    if (scope === 'month' && !inMonth[sid]) return;
    if (vcfPhone_(r)) return;
    out.push({ name: String(r[ST.name] || ''), group: gname[sid] || '' });
  });
  out.sort(function(a, b) { return a.name.localeCompare(b.name, 'ru'); });
  return { success: true, items: out };
}

// ============================================================
// ЗНАЧОК ПРИЛОЖЕНИЯ: положить логотип на Диск и прописать ссылку в НАСТРОЙКИ
// ============================================================
/** ЗАПУСТИТЬ ОДИН РАЗ: создаёт файл логотипа на Диске, открывает доступ по ссылке
 *  и записывает ссылку в НАСТРОЙКИ · ЛОГОТИП_URL. После этого значок вкладки и ярлыка — логотип «Планета». */
function installAppIcon() {
  const props = PropertiesService.getScriptProperties();
  let url = '';
  try {
    const old = props.getProperty('APP_ICON_ID');
    if (old) { try { DriveApp.getFileById(old).setTrashed(true); } catch (e) {} }
    const blob = Utilities.newBlob(Utilities.base64Decode(APP_ICON_B64), 'image/png', 'planeta-icon.png');
    const file = DriveApp.createFile(blob);
    try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) {}
    props.setProperty('APP_ICON_ID', file.getId());
    url = 'https://drive.google.com/thumbnail?id=' + file.getId() + '&sz=w256';
  } catch (e) {
    const msg = 'Не удалось создать файл значка: ' + e.message;
    Logger.log(msg);
    return msg;
  }
  // записать ссылку в НАСТРОЙКИ
  try {
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
    let done = false;
    if (sh && sh.getLastRow() >= 2) {
      sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) {
        if (String(r[0]).trim() === 'ЛОГОТИП_URL') { sh.getRange(i + 2, 2).setValue(url); done = true; }
      });
    }
    if (!done && sh) sh.appendRow(['ЛОГОТИП_URL', url, 'Ссылка на логотип: значок вкладки, ярлыка приложения и шапки кабинета']);
    CacheService.getScriptCache().remove(CONFIG_CACHE_KEY);
  } catch (e) {}
  // проверяем, что картинка действительно открывается всем
  let check = 'не проверено';
  try {
    const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
    const code = resp.getResponseCode(), type = String(resp.getHeaders()['Content-Type'] || '');
    check = code === 200 && type.indexOf('image') === 0 ? 'доступна (' + type + ')' : 'НЕ доступна: код ' + code + ', тип ' + type;
  } catch (e) { check = 'НЕ доступна: ' + e.message; }
  const msg = 'Значок установлен.\nСсылка: ' + url + '\nПроверка ссылки: ' + check +
    '\n\nДальше: Развернуть → Управление развертываниями → карандаш → Новая версия → Развернуть.' +
    '\nЗатем откройте журнал, нажмите Ctrl+Shift+R и создайте ярлык заново (старый ярлык помнит прежний значок).';
  Logger.log(msg);
  return msg;
}

/** Проверка: какой значок сейчас отдаётся странице и открывается ли он. Запустить и посмотреть Журнал выполнения. */
function checkAppIcon() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('APP_ICON_ID');
  const fromSettings = String(getConfig_().settings['ЛОГОТИП_URL'] || '').trim();
  const url = id ? 'https://drive.google.com/thumbnail?id=' + id + '&sz=w256' : toImageUrl_(fromSettings);
  let check = 'ссылки нет — запустите installAppIcon';
  if (url) {
    try {
      const resp = UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
      check = resp.getResponseCode() + ' · ' + String(resp.getHeaders()['Content-Type'] || '');
    } catch (e) { check = 'ошибка: ' + e.message; }
  }
  const msg = 'Файл значка на Диске: ' + (id || 'нет') + '\nЛОГОТИП_URL в настройках: ' + (fromSettings || 'пусто') +
    '\nСсылка для значка: ' + (url || 'нет') + '\nОтвет сервера: ' + check;
  Logger.log(msg);
  return msg;
}
const APP_ICON_B64 = 'iVBORw0KGgoAAAANSUhEUgAAAMAAAADABAMAAACg8nE0AAAAMFBMVEX+/v/29vk/X44BNHIDM3EBM3MBM3IBM3EAM3IEMm8BMnEBMnAAMnEAMnABMXABJ2ajTBh9AAA6HUlEQVR42pW7e3gUx5U2/lb1zIiL0FSPxF2a6WlJGAOSBkng2IAYhMBZO8CYi+NgwAJjshsnMbazSb5sEtvJt7vZxBd8yY1wEWA7G8RlDLaTgBCDAF8AiZYEGCOpp2ckxFUz1RIIaS5dvz+E99tN/Pye76u/5jlPdXXNOVXnnPe8p0k9z3W59EOTjESBZSnd7qiYZyA0u+tPo1eTesOzL79DkZ59pyL3PWKVW+rO52KpqKJ3+WHUKRWOzTmZwdLGwD6oZbWBjD3PGUbjI8JoDaQP5sGyp6ViR0p6LVe7YhFyOL5if0f0rMf0cvNqrGjnKenp9z7OMvtueLu5rCfi1//hN+osdfiki4z2nM3xtbsyc3wncs8+amS5z99zqeTzKW39Ewqi3enx9VMM1+WJt6U0Fb4JZN+A9AOrd2xoXjgsZN6/wH3Z6ezrJ8mD18bceSD/2J11WVfuyZx5fUH/Irtr+J1xZNhnQlyjmfVN9rrSEtexyfW7b30uXf+s5HZPP3d9lEA+15acY/deH3eFAhgXjlatlH4QvZd7eS2V3J/33lsvN/VltbhC+KeWQo/9+PALir1leMSXc3+EZOWPO56RkUqNNQ+hY2SgLNJ356vbs8Jm3ojxVyYUDlyms0ecn1iXkXPVGGdK7CoVFrk6YItekr6upM46xWmy5gNPQiFWIEXH5x8qMoq00Zt9clyPdpevKqjtaxvfe2bSSCK4mvnXceE7UyMePmVYf8f9gRv3Tm9k7f3oW3Ru0mfdUC6aPkfSY5sw+irpnDvmyg9OS9/MitTeSvubj9p93pQrO0vus0Z+Xj+ldU3f5WX5ZxXr+2ra6q+YkxjjIaxv5gtVl299Lgaujpfyr+RdLRiZ9XnG1tFZjmh8WaN0tfIzX2vxiBFWAZrGacBc7WNzmC79my5yihs7nfFJ5z6/PZoU2A63cj7+cn6ow99MiKdzugSRL0f4qAOXC/jNK43jOj6+OpplXigedyNl21t4ISNjUqiyn190luWc5VfJ2ETRVJNc+UiGMfkTT/xihfSYhevZoZHRzxzzjQTtcI87Xd5MzrJPbdOOjWGylc8npHb5BmzHm0cFT5z5eOEDw1IaYlcuTRk+7jPmmjpM/uzTz5fs5/DaRkc/A7VGRAr7DN2XEmBXWdju+dTmphftxpoasaiwTqQqw9FenF/fJrwWRbEjXNhVaZxnuZub/Y1YeRpAosbx7W8D5584PI+7XWGQ4ylIdGlzh1R0sAhU0QFh9OBBzacBUAHYaKOppii1NS9wrKlpk7TKadEtTGq0J0+7+jC/vs1RhB8Xp+rq2OZ8CA7gOcLwkzNiAZ/xHJ/ekUSR3d2QRkfbPdzXa6l6/sHlPP17wKcBsOwKaWIxK1RZZ6z/fcbj9t3Oyz8jfyXH0rFOH0T+pIFJwbWjQp9qe9j8MBccdwdhcsYF676Mn3sif8US1MATDGg+aDpVLJ+9cUZTWkoDlj0NENLTQQ0lNPjZQ0ftlcW9h/yOaGbvqSMSllbpeaEFliKdrrv03puvxTkIiwMAZMQBIrvaEovfDKb7FkmsKaTUrmgpnhhtTUbhplap5tOsqAIpjWz6Cgm7ErPtzDEPOJBYuMOq50k2g/rQrh8v1HOMxh//y9vqT8NchhhaH/E4IItYR/a7f/7WtWD64HUOJYmkD/mkzcCyyxIlQKR0mYR0mVFA4ZwrYEtlWrZ1SkW37qdZyDbSxQWGUWFoMryvnd7lCXOGOP77iAMi9tzUw5oDaSXijHKc/zxaY5RKVm2Bj4Sz8tORtnRZcRPRpdfv5HyW32cbn456jf2etE30uD65w9xzXOGp7OI45R/3Fv6Zs4EB/P2Q4z1vnJ/xm4Ku7GET7svsHuG+ZeEaoe74iJ7kBfXs9awb13wjCG2PHKlsMlrytNyE5T5jT/bM1zCatHe10Kia+enTuyeHTXCwu9oHcPc3YXGIWPaZPzUdLSo7Q/VR9MM1ec1LlKXNWoVB2SR3+dezSqMF1dL0bKFDXBk59pyjoP6+NLlwzvdg07Ic5aF+albWvjM1DEAeGJCHDQADrowBInMARL4zwAaAO8cLnnl/6rh7/3jr3qwpnx8simDcYG6zZ+qSkENtps6cCp0WWHkNKBN5hZmOkDuiHF2Ms+ekPuJKp43iH71TFGYAi8sq4wBcrwAk4gUDxqkyJwCJPX/4P0AM++hLSFBaWEz2p7nUcnpTI5qUWVRpd9E9DdLjuTXx0DbDutRVaKsKl823qGcUaz4be/7dojDjgOl6VYuDwPUKAAxv9ZoQFzsiXieYILHnT19I1yXEKBudV2wdLIIeTSqjkZ/P6D1+zcFowH9kF24yM299XXw2dhYANhT1+mB9/dPaojA4IOf3oITD6Xr5/SCAgbkXPYBzAml0Mc4EYs8/varaAfssYysw03ADpZIC39kNOrqmuA1aMEGyjoGLy4Dc4IYCerOqXAG83bWTwwyAy33s0WVxwHzlvMEBwPZoC2Pm1aXfnBP1cgYSy/7weV+2BfrkvN6EvRRo6mg02uQ/zN6XcuAIPdLlr27SND4iWrne+sOaegO2NIPE2ZbSMDjgeuVkYEQxAYpX/osfIEDVU6unm8LZiPN7L3o5BIlN290UuEVS73t8fuvgUokqUPr8dnWaqmwBzceRet0Hi1vYa+vbMkHJLekDEH5/VxwgcPWs/HTbm0ac0U/ewfcAATwnde3zMB7/hwkPvXPRCyZwcdb4Ua7g+nUNHQ3K1NY8A4ChVXQdgF6QolHMp79GCWiwy1fhYY5GGmdA+s5KtwkiXK/MOKGcKQHMovkBZAAAsUJY0cIhXnqYnl910csZnK0jq1PLwQvnO435SQCw4NLcpdSaY6N+NXULNlBkKrCV+PbFo6RDiMEbk00B4XrlLenQnZVxQD75xhd3rHWV7bd7FZBoNUJ6xUUvB896fu9RCpHsWgHM0JUsA6JqaYOSotmMumFPbbO4ZFUlzxo2ByVgUsh8ellYgLleGf3P8zOfGjBB8la6jbsuIm17RFrQAuGc+bi9oGZFMyMw47N+opiMNlvzQhV2XQnYkaivoFBMiew2lqUbj6XNnMqEzS1FaIlolj2fLRjLAVL8wQit6Hd1Ec5p70BYUrD2GKe9Hx/Jmet8KmIQYi749bFFz7/tBgfZtn/7UY/rrEX/bM9rtVznXu5KFETdsFE1L7210CKUTuiy6UJDIjLdqf9hsgmQ4hM/BKTAwQhnRV8NHVPi4ADQIG7y1vJmAnE/zGpsWP0zDjh/9G66tJe4kPukRbJK8qYYE21RN2U6hZJ+Xufcl3D4Uzbqs2zHOthfd8WdgPzJg99GEX5cIkjvyVcVpZ1pDADWOPy9p/FVp9PZYyHOMgpWewnMq7PWoXhrng1U7VWl9ypDu+rqDUMDTdpbG/A9pvtfpipgVcoBNTG1mHPQnq+/aHulA4E4nHlfzzdgM30AgUj99bzmPDX6Jc6vHVGy6NGx/3rRCeHs/M+wVInMqIEsvam83sZG3USTW6GdFGio20D3+wxL1VXdcht/XGaAkKKnaqbrT4a7l3GYL/YRjz9tABAg7yzlq/nDM9cCYvZG+kuKb634GRiPzXpV+LiknK9QJxmriPtrgyyv1zKodBEJZZJuzbAB0SpLMW98+KybwSmfeBBSfqbv6RKArNgH1BGuAQRiHu7da9cfWqRA8HS6nMzbumGv1wRa/xQ7Irulop0hv69GrjCq09szT0ygg931XnfdmbUVirvG3cF0V7CNmhzmKw8r4Kwvg8WBopWIbW+JlvgAATJx7jHbYkUUPgvS+SdpfoWr+vitZieQNWtjWm+p1dbkbPbTWPCoJXl42yZ6Irb+MqX0ZFSBX4m6XNa06R4nUFy+T/w003D27zJBvlWDHerSL0Jl9CiJ1yuhuWuZELvrORIMyxe9RGC2/kkh7KkHPhzhCLnVHG8dIlosSpHWz1iVgUtBw3CF5/XKx3/3nMlBT/xTKLUmHQ9t2g6Qx0GLEHSnARCgrF8dblyYdX4RY87Xdxqq8UYqVPWYkwlr1g+gGBLmVVc7wkkYrCc942HqL8FyJEP+TIDlg2GazeMEiioVEt3Zj1Dba06WtxI9quGz+FDmZT0c67IyQyNvP8t557s9CZK2xfFQ1ARaPyyTixVkbyY3nZ1w9CozDInCtiOlNrsNW73NrUGEErtMDnqy2JdXOKum9LF3ODedHNkxS48cNwBA8GCJk7n9klhLEIfzfeqTlnMs8gBiVhC9xlRUvsfLU+FEBcu10hQooWy57ZZ/lTABbv1LsRMoWpmfeq9D2rg1nsUJORlEjPmpumTIyB2jWwO9HzX02hc5IWb/vFRrKLIke38Lgeh8HExypM9azg4/YEh7iUHrGhYzUxjT0D1PUmDcuyvCQU9sW+gXaBZlmUsgxtZCgBaUoC0OAKKgglKruiIGyADPmj5/NtD/qrXIyUj83bOk7FKN4IKDIBqkZzSqJPUWfhPNdegwAOXpEgFWNL/ewNfqv2ac2RQGGxMEcXlRGrt7ipLbppxQE8DS/60BnX+CW2k1QNHfbArni69oWF5CXAFACCttAfSC0GjJiTxmcwsY+GxlnJHeE4FWJQiEQ4ObOcxTNUi1R/IMdsziAKDZLvgrdlrq6RBhEPb00f0BMED5qZOZnX8qas5u5vhzGZiJACRKp9keTZvVBfnfQZfPB/tjJncWfb3FCTSgcbY5nIMAsFHBs27OaAEAGAmOSDXFjH9YBIiZT+YtbFcz34bFXzKFNftJH0T+rXvPhMwS6i/z+SQV2pQXirrTN1w9hnn1rRcxMBi5RB7Z9vVf3Rg7/PDgXzDug8dgtZRcz8j64FpvZID8rxEunVn7+x7oKg0mOIbZhhXuN2OeC31/nPHbAdCPksixKWQckY2mm3ONebSqyn9nfbEmqTWK7pm6i3OMw/Pfaa8IKRNHPiC/xtiYNERMREV70Ddkg0j9+iNe5n972fZCDejbXXiQJJFEune1DFwFEJ0QMsJdHb2vWwVrQ1R1K9L0yFLLqu5cdl0THBjjqI20bUobZWzbRk7MDSXxpuywRYgScXEAEGcPPUWW1mGzDyZD3FkhsfM0CPKPwY2AmBlE1c6RiCTId99X0jsayZko5kjatAbn9Ajb3trMOcjkC11LLQAzZi92gvQ+Pxobm0dFzziJ/UAzp+a5HU0BajgfDU6pa2+GuU18HqdNaWQemhzngOtKX7staWg31ciGzQ7k0jo3JPAjTRLMxNd3mRwQF7PrPmEANL8QYmy/M/MGj3do5VBiDABCE+FXPMsujTyjCQbnJtxszF4k1x2cHOYAiScNYWZrnF0ek1ybGNQp1f04kgdfvNndH9nOAcAZe35aXQ1o8rAPbMz6R43CZFJbYy3Ubw6p6LL6rtuD1rYQbjeb4Es0+teJh3e5wzIA4Zz1rTHuqDT6Vmrawe2Cw1aVMuC17LQikjJ2NjtNATmOWDz/J6dnAIKZCKSgj5kp70vq6m2AAHAr/veh9jBgHgHvzcSwhj41zhGX4wC3zY2UbCmDu966qYTLdGoZUAA3jnk+uGcX505VjgPEqT9X8O3T4ASnlqAxb+t+J4L7FBMA0Ev9OJx8PxXCAwsynETQM3X5nrDJgLjLS9BTA6vIXWfrPocuf5Mgu1UVqah1oKR95tg8J4jVVxImTg4QmWlOkN5rj1LrQWmwB5WdtZnNxDT9ZXnBQHDGaWB5+VvHOPndf8TjYJwIIr+yzClQ4tnas2eA44406dL6lykMANzwKbfd/1ICkNuLLnqdnAEsFvYIkTfiz8yyHXmAnM+/Eh26CHYNCOI0IDfoNQzih3pcBocg3p4P9joBHugV0kMff0NL8yoaIKdQUG8pOSx9pLXgWQ5P3t4P1r75QhyAHAfgGvv9avHhCwAkn2jKbDaJ6b/r9EY0IHGvCH8RSV152q8f+1nrUdA7t45snZ7VISHrVmWIQoW/AFoqqgwuM0F+ZNkDC1Z3ehmGkHHs6nP5U2+cOXPm8LzGJsIgQACMOHzmzJlV+fnjYmEMxVGivvLJkpXajPdABH4JX3k0Py36stTZ5AxVUg2Kym96X/0hAzFPOtJlK0a+9+ZrcS7HASIAwghDxkZHNSBzmgYSf9hnII7/VryQx144/8tNiL/bXMeZJ2fYJnNz9WvImGao5AxUPQp/ujP1r80cwyeMe4HKNau/Vcvy43fBvSz4XYxMWIwTr+BDUH9Ih4yDyGMvpL/6yzwJ6a9mRjiGT3h4jnlINle/WSw0G6hlpfzoU/oTnLMxkocaSZb9o3892jji3rAAyN0SxZDCAKF/UXERcRAW5yCTL4gZrl8oiMVCgWAzQ++l5KeJqvr0OyycP53CMoAoGPAnk5inNiLklwIhjy1QFdAAWRZfQHtAvovxAQACAERcluF0bF747+8SgEEd/giBEDXazHKqfjNl3WMolOqIqiqAS9sFSLJqjjvkPa31zDD/9z9vF8iarsryXVWToewdYuhFcQ7ZpX7FIMD73083ZKHHoIduPLDXCbHFIIyur124vl05akspl7qICiDyGoR796JC4FhJYY+3+HenO8GcqQ68uUlwCP5f5RzEARAGGfd8iOUEuG776S6y87vNartyH8A4ONCqXJIm1Ltxm9bVOXrzAEDhAAtS/VJdE9+bvT8dIgLmxv4FVbM79KsvuVTVK8syA5Fl2aWq3l/EOjre3rzAAPhg8GEiJ7hi0ALZ99CzQN/jfLo7vLRrjgNJ8qNFH8glahbtdrs5+d1y82Z7y3LsW6Y0ftr+nomBW780TxNh//NdOwwdUwAi9iDkjF0Diz68xyTmW/3pNefgpqIPk7KyCOlNCLyyOFpPrRzbsq0bW8y4FR4Pk5CVyXS7EtJp0f5iVr7hPZBk0kz+ftMSdnizIHEMWw8gcagmwsCzq8jR38Z/IwUggPsmvH0Lim6s13ypO4xj9/4dN0v1gnU1bmrrAFeoB2elIwLjeFsuObFBD1XPaAk9M5wTiBe5cXhjWGUyqCL3fA9A8isjFEbivHb+k3R7aPlfGMzaQPxr+zLbJ/lvAniUAa9niahi1M+lC3UaWtceUkSH+vprjDkeH8X3W6noGqG5y5MgwsXBAoCIcTXfMpDikIEWCzy+Lb2ERZHyORg4Xm/sgMvRpaN3mhYFODghMi/u3bUmRKl6yRE7YrIQOMAYrS+1Qrk7RWnUDyFgf6tCcfNky4FGS9Dis10MHEIhSFjTrPcOnP5VrK+t5Fk4san37dwHVupp40SJUd4M3rcHMnjZHOS2U8PhXddidT30ELj5TI2nAzAKKmimX2QAcIRO3IjK2xfH3Z16XssEFQAI8VkOkP1LFinAc623q8ER969qO0oHt7st0baWEPARGKXQB+w7gwp9HJ6WZ1k6/Q0O8iisfCtaUA+3DeRcDcBYRV+yVtu2Uhwt2wH7XS/B6ba2Fi52tll5oX9kBLjuD4UkqUZSqWVMMqgTwg6hGZ0YPmqfzW5RBqgZAoA9QQFVcVOjANjUDMCm2ySfDbYDS9JPhiMABEGHMztlamtCQPpg4K2vAcDGUIV40/Lt0x20Mv0rADPdOywFKZMIajFdNJ6t2VwDjL0NxKK6OyWi4AAYeYYgN0gtd4iQo5rPnQ8AKI2ywNFczVwZ1RQsMQBcG96K40YpTXNFa+zTGAREvZKKNtiYTBVZF66yEc2vAY5qGI9WVEUdETfP1MCBx1Z2UUXxds9egnyRHvJyaFY6LsN/a0lDbJlcKbReRkDmNlgI1iLcTjyihACcaKmP9GSqHzTSqSBxqf+Lgmj7JBVwd2YZ8IETS1lVEZXoBEfI0pXemAAIMB41uaq6qibpS9trglgBAJ5Ze5NJZamklkiGQwMSv/1aN/zz6HgHFSmDd42p5hzkmTXQVegJGB7al/rWUK7+TCBZYUChpc5machLR+rW6FaXwQ+el3LdFhwQAmF7mW8G1QI4xieCEHKNFVC3/pFFEjQH/mLJ0ncDeFSNFcCATT9ghZXxgwAw5sT8Rrpzwx4DcXNueKhidMJd0xGtbyhdMkqDYgdjgP3IfqW10Wc1Vs61tvOhWGEZ8FeDUq0St1j28OGcEOTyeqnSTa1iKppMxsEyDH8OyV9Tl6PAMA973RyAWOtFJ308pUdMV7jrYTsAvGMSCnfQmLFNCfuOXmFCCNPtVuuMAxa1DJrr0xRAADSREimqRHND0dxnQJDBe9utUne0SnNbGFUYBANAjJNMWWd3CDXc5NWDiwHg9c4n9FK6rLBNSVKtagMYav9ACtoLoot6KSwiaR4ugLG9WjfqGyxgktstT4eA402n6kfIsL4bDSmkbeRODkAMn8266xomNPsfeSOp2R+JEwhQ+zrFSJc3Ybsyg4FBvP5RBFQ3WouoqhLkJa7XAI7lMYVSWJtVXQnFIQCESkSH1UIpUKkTx93I2f++keuZbaQP0xrAAjaCAcm3LWvf4IpoS52SAjjgVOBeVe2TKKggLsfrr4ExUiXPmm11OSYo1A0FAGPkeLM/ByFqQLM8VUNRp8RXVVlYP6nMrimYqNT8pBoAYSsdZWWdlWOB1C3xLACosDmggSqchEgWAA5n3MywVCgGveQWV2rAgNOrFu/M1a1N7lD10T3tjzAAosdSVSgP0HM2dJYaITcAjtvd/iooR7Tyqvq++6sBboKi7ohPo0ZWai7vAxggyblWt7XH/5HlfftENgCkCyjSWtWsxZa711pavhcAiFO1gElUmRZo5AcpkgBHwKUk1Um35q6YUNftTgNIbNUuGhWAj4a5zWQGBycbd+gNQH1pfYLuQMq3CRxUnKhx+/Rf62pHiqe3LAMA9BuI0tSJOajTOxY9HAAhAITrMlUeeuPV7sqUFCAEyWF7oNRc1uZQ4YQGBRx4ApafTuyqyK1GdWZ0BwBY5BKCSuo5tZ7YcwwxFO91zc1S9YljaUWxa/Z+A0AigNQ8KzdUrjxgWe2AQIzlHasrWANCJxzV/MLpB5CGlyjSytCkEwkBPwQAibO0vePAoVxj7mEFC4eOkQqjSTfVHsl/WbH2VysQAAjhsLR2GtmmOofOgo3YKrf5GqhDvQkr9i0QMgjS3BQ1ELKMXfwEAPJMidu2LiAV4+1KFFg5vk4AQEcgCmmG7Za/Pt2GRzcbIEA/N8KwyUnfbS9cBgCQ3NP6pepoJQ1TL6S24UNHvIi5u9QUutX1Q861gs453gjFcOfu0KbTo3ehPkKKizVln1go+S5PwIsABmlHmWDUW23FCnV7vJcB0H6dDjn8ClV16Qh8MAGBZjKqobKjoAqpuuqh4Ii4Pr2ykloNSO1wlwxlvrFQtXHIPcpK1SVV31EmACA9HT4WMo7TxpfncWMjiBAilM8t1FOrVFHRBADQfGY/T+Qf2pzaG6wb+ktR1UaMbVp03xNWMac9ACBCs3GG9IZHtiVX7Et694A7CZcNjYT9FdQg/vMjqR0ATIs+aviaqIenvUIAAvCJrSLV0LGuJbk4GQSAdJtINgV1NZmkz7rcxKAAgIk1daEVIRVKsBbansCQ1upzOVEaxOnk4cNJqxtO1GiRygnqlnJyKkox905WFuidPwS/SJ8ZyMhmg7x5V8AhiJMAGHmM094AEJeBOIjTdJpO/sRPOb3z8NBEFpe505x4jJPf7PqOcntEtIHsVlDAHVlOMb77f1KVXoNYf89ffpH8/reRGPt3QpmTLe7Qqpqnbuy3qdAjpQAwmP8/J3Eg/0soUvFlwi+ZSei6JDtlm26Dgv3+QQjEYn+3lv5lL/gyofUlQtLWu0DPq6FWg1EWvQu8yN8q5Ms2+wVU+9v1/lZwtJc5q+xPUcuylC+eEH8zJ/6lL4jzL5OKv5OMcrVaBqVd7gKehf+rQfD/MKxD/dQdUiwbAEhDwPdvtsS/REVxfKnwS54FsjoIhWJzU+Xu/l7a9N/nZFxh5t+vJTj9n9OGhORvZsYAshClN0ANEtNVIDncKWj6v+ucYDo30yb7n2YgXk5T/6cBYmiMHMv/57MyZE62htfGkp3RgC0ELxmyUWLrVjAOME4gps8CJ3+oFXfBt8wFADIRQP8KTiAYv9tgATwB4PYSDgBEgHE4NgCo7jnmDlN3k01RkG7trwCQXHHFP8IOveWhhl4s/TkA+7+buS1p0pBlHxEnbN7TQyfFN5YmTcFW1M4c+fSKWqD6p0BG7bUdh5dHPFz2hXIqvc8CSeo3Cnpac6kBSEUChADmsz47oCBStW6+ATBgC7f5Cum6gBO3VuSLFTYAQFVq9u3ACtNaHoe/Fj4fN8Guxcn6ZZcLvKNvx3Me+DwBIGnpBuP+Bgpdw80QAIgWwG1ZtORskPqUoUJ7G3q571BNKrg6lZaW+AECcQGhxTmms29/21EsrxqiB0X8wM3gRMO4PrJwaWG7AUKEVOBtOVsD6lZ9vOu/miUo1eube30guUOChdaxiTt7mtrEUSvSEJQ4BJCgtm1cmSfSpH30zTEhAMjAnt5ggChctmoYDQ4CIJrIUwLWegqAoeqOYAI+aDEL7bxgQvxmFwBssjHjAVzhaarQnbrVP+Qz48GUGzdq9nhOZ9dm714+tDPrZpYjOpsTR3XHdSgmAAEDJzzbqGgHSpVHEQcM+BhpcqxRHLAZABckW88bXZOjljYZUDAneZdPfthCXVTkhEbLZXtThg8C6K/m1Mrbx2Kpw9RWwwQAX4hemugHjRSkUhEbA1Dr4yCRcmVLwhCZ84YcQ+kfT/cQvUnNQxMlOUNHll9u2d/WpDygNO0hkl1jABxb32UVewpzSomB3TuHTr0Fo6rQqKQWbM1KJxjwOtoNKWkkI0Rhkv7MxqHtinyuwTIaw2qNMWqobnp6apk0MrwDlUhZ8K0FgAuorqEJFczdzhI7BDD2TkuJYWyRNOq3rOxUHgCBYLYndq5deBSD60YcYABZ3bDvNAUC8EKVMwAAp33B03lRzdnFlHybP2UIAPE/Hz5b3KDk2jmkTAmAY4nJ0fGo+jCl0Sg7NmTqvfv0yHSHTT5ohPM9boADcCWXLXUjGtRFO73hAgD4NcBAOmRZlyM+Pi4DAEtRuwXl98dS5lOfBz+uARiZayhg2EENgHnOxr3gHLOdTFlZibR/+tnsgWqAI92rAAgshtpZfXPNkA0YhdKq5IsekWy2zpUerwEDs9KKZ1/MHp571FZFXgOQGW4CDMtFnWDprqkzgkBiI3YZaDBQltVCdJkA2EhvdGIfDWrQF//Zdjce9BXDSLemrWLgjUm/UkKbwGEta4qSkrJPz4Yi2XUAA+z6Urc9C0U0OwXitxECDN6fX3LaqDh0lNaMEl4ASPgAWgsLlymCien71wzdPi1gR7GBD/bZQxUfCVmAoDceDQic1Uu00dm7GefEYx1JBC0WbaU6jYUMFwPA0estbY+A5NJeQWoADKYJGbkCFCBKAFOO7R/KTGEkZwQVJBU3jiwKAsAzkJSDBzkUafnIYOJbAN55BQ03Uw2HGNVZveW0AgAE3Lvr/UdRvO/mr+p3CzDw4XAer4WOpJIdXbZj/nQOAPMAaIsMKGDRWzsDAMNgBStOp4sto/Hz5Kya+wEC02n1hGYr+6g/FpXiR1t/y4A/Ngvn/mrSvAiLy/qq7wCAaJ0DANIorYoBDQwA2AqFBqIBwFBG0lUpcI5VpbA/kh8sA5Hex2qYAMKBuKGFHItp1KiweqsmfQTgrZ88ssx8w1P6vI0nfcFHAUBIfAYkpM8HsG0ZszgAMtP64BG0AkZhmgsevg4QclZP7jdUoZQoAcGFwNg+EYrZ0x2nPDbkXENmTxoMQI60E3qb5LvOzpbdApgpznRkh+b3nHeP6uryd5hgAITyqf9AYPEBn6Zn4aGtVu00ApSEDMXSETWa07bP5gOOtd7TUOWzBBSjmiWbLHme5fz6DelxRQkIT6kmvAwMqIVC5hgtxT675SrIX1UNEBB0B4TbKO5bVulRdhIliwuIFrWv2Fih52PRDJDXGGPIogrOEt95queXFaCBfb+a4NoRkg0RvCeC0jEiDHC8/sbWR0Yzab0jpzrLyaWhasulxHeXaGy9i/MIVUcBwNhbaKKXpdO+NhyY+AjnHLBzGGWK7xaoqnvdin9oa+C6X1fRixiMSSAQSJdtMxoX1/jX1MyHmgYgIOS86RQ99e5el+PGnpMcgGNZT9TnTpdKgCUlNwPmtyfkKarB4qNKqRFxN8BgFE4hMlC6bYWR6Yr6KtKzp20EcMvXklxmZOl7l+3enKgZusn7DuZ2pfMtQ6QS5YvmQgAMUgDpGZEWULsN4zkh30gHDesWt691U7dlVMD9wpXVgCjf1KhUTO+FayGdgWHVAPefCUh7kWMtiNvw/veVIRp/TmciG8GcR5au1W7hdA0A23rdqoyJYljJP3EBAbrAvoxmPA89RI38gmNGb7U+FJVnLOzOCayZxkLGgWcJYYl/cu3lSJ+JhuXZIY52DgB5J1nL3ujSHi383loWIq8B8F0ixqulXgQCkM74gLw/4hW988m33Ps7qJKq96ZiLlUQ4PpWbsFFo+q2WNJ6DTCvOfdZowJam/XpyyH/maYjAAd5L9mYxFk9tf/X+FUqBTDy3SWetWtHJ6Mt0nmkmQBjO9zHUb5z2nLZTo2oYqntv3c/pYFcG75DxgOWGvItPj4Xv3UCKEJ+EKjV0o3aD6p+WQNg5KlDHEg1GukkY0EwTvDo3svBSPVf/eULs4AAh4lvd7W1rJpVtU293xZcagWX0rJOhQBi12JXVldIzYXIygxNgwAUba8seB0DEjUXXgWANzf9YIOjGogtTO8R1No9lhO4VZra6O94/FJeI5atA04kLtHSbcrB0kabDe4aVrs83JP7IOPsd56afI7QhHrhCcFgHP8ZRK0Xid9vupvccuAF/BB4niHj+9U4V00GTUF6a7uqDydvcbsjP6AJgBBBvLeStuWHkbKxutmvv9We39k95grAPXA2z4ukTqizwhAE4q2j8ub/EP/VsEzwBVUUg/zcz/GD09cAjP0ubZptLnPkfrt8xKgbJU4+9pDfVsAO+OH/s0LOWO220Oxo75zfzn8GtDfBe5QOq2Z99i+aFo57hnn6BP8SIEXEXbKOuBqd8BQoIx+jIV1NSv73PmkGPJ6a9uiEbo9Tsyi1tpyrn4MoG/1vawkEkCVR19s929JhMmkteDQWjv8XprkLMwgjzrscZDzWoQDsQ6PDqK1V3oftuVEHOTef2ajRCbbU0UZ/w0SyQZZS516Rtn5zlHUPR4m7htzsTT0tWeMOJiaH//8h2xe4T/1J9T+3jDJgT0LaluckpDdh6Turragy8aRCW+Sb5S+9K2Wk+zYwgMMUOUYHrNP/mT8u/H+2TWTZpaqqymSiqqrqlWUG8QWi1Z/Ln3rAAJLLKf2XEoixI9I/bpidiCo04ttGi8U57E9sBtjGZ0E6/zjq7OeubcNPv5mnx9kQXUlkl5r/i1hPR3tjB0BaGzs69Ku/cKlemQ0hWjmuPz/9jB/gSAY4MKaGVrjrbfWG3svXkZ/fBp0ezhtjlV5xZxH8bsUvjuZ82FcS53epXCbTH62FiC8EcfLcY8Q05zHEMeIAw/X7ERccjBMWJ/IrVY/Mv9lyxCnI71ac/Ws5ouNP+qssnUq3Sn0evxSDJe4w4fxN9RzrwzeHmgzAAfnVjkszystnfqMKwvdVQAAPznwSmLSgvHx5Y8dVGYRDxCFizy881RjAEhCyEj6fD+1BP3nZDNm6Kwx/uyPPZtCr32bg9OTKY2qcQ5hDvdujVm7eq+R/37nlGKRh/nPglFROeH3+kYKxxWfPLBRPA04iOHFyEosXdHwwIuzE8I/BvTG1rQAEv5xPJ6j+elvuLafahB81c8RH1BaFTQZZENfkCEEnVqzLM46JwNTA3YqdsM7CVeAYdRQPWJ6ggPmqSxacCSLC2Q8f5BxjIj5JPgEj1Z6cPl+jC4FKvy5rVr40lQDOgnFhCBNxOb/jZIYTAolfoTQe26EcrC4dqgioOS4oiZsstNIX/RYHVjZeVWVOBHHGsrdzmKcC50ZRK8Et4iUoo5ZldOEjC1HmG7GagcfjDEQQ9dVLGxa9y4B3X5zxgTIt1KjRBgxBqDCqKxypPpKqrsb9JgiWP9B41euEkyP2AiBDKsLL7ZueNTy2ejKHIgqroTqNPEAImSAODiFPbn9rhk6DgHNTz+kAjJ5HKKo8IQBAHW888cA/pONVOTlWHBjLv4cNj+oumQPEBMtbkZbSfhGOomvbUhGiUaVSSRgfFEhA06+bh8go16vnZihl5Q+PeZbgOmDzo+9s2eI6iwIEQhgs/8ieVjb6CdvEuYKNWWF7URr9UGPECwhBzFNF0pljCinLQ/SBo3mNtF43jAKLWZ6OsDRyrxOAqXZc3hYw1O8lm9bCvPaqvRL7JurJtJ5ODN0rTDoVqvdF4vMo4cwU6bLyts/++V/3XvQyAATPx24WN+RYO2yJjx45atF8allb3W4rFNZ9CLwEsMntVRcr+ySxpS/wTacQB8DU5w7QA50bDg6VMJfo28V8P/Sl6H8TJk6+HO9HqulbC2brLwGi6J10xNvgzwTcXoVHVlCPZWBtNIcq2twQbq8l4P0P/4cP86ZPQjzYzZjYPJpphuW28IdpJxgAvMNuyjc58W2/aTIuCKmruVT2SDuGo3oTQE4FJMsQ+3t5tW7k1ft3Sq6OSm7mXo3Hx/XdD/sznKPvXI7HPLX4+OpPrtvXBTHsHycPv9CP3jEta7TrkUHyv7ThDHfyGM+6sN/8C9yu7viNxwz2yX3533ht2IDrCTvGRMWVdGHXojFHZxQ46RpbSgu9nQIo0cR/nH8WyJoZlNPWBwKNgV9WA52PA34jSiRfHRvi4G7o7Ynowmoh+GsM7IDszgpa+4603tzPOcv7BkcPC1dfixo7rKrSLSAbqkLrts2RVBArP/2rpn1uTsgdc6f+nXenhvzT3G5OBm5f3dSojGeButstxzg1u1YBVSZcN/PWTuNk4PavL9sSXtGS+yuZE9J7oZPxUyUhJSqEY80e30c21OXoc1oBd5cIg9y3moGzmXmzFtVAs3mGrwacM3NfHoWy7jvb2NrvASA1Pkk7+khhe1tWlklIkhv36POOuxHqNSHcf3xkq4RRIXStMVTbH8S5WRRI50qljNLKuSDfw1MtJkTnHw3F5gc7ZgkZ4IHtUtl7ya+nSod80YacRtBO4im+USKcY+duH6srxzfGpk4tcRLyYv7Z7E9vLvFXxWpC0TbBUiepWh131LW3H+4KHYfglQ/s9TAen93tmF+4lEtn/lkjZuc31vKcud49au5Q9msJn3CnE3ZqxMHHIM79tic7SPBNgzvlFSU0yyd22upyUBWygzNQ/YgrVcWrnky5RYhkEzzUbEJ0/lEukQ1/3sIQcQqxe603m8RdlR8MfUGRgvaIvOCCe/FBDnICLMeTEjO/9+1iwMxbGbtuZaP3MD+zwUCCIHqK5nXFrGCsQbFNnJCS4nnp6wNOID6rmjQazaPTI1czOF9P3/bBeWtvYtMQn4wVe3EWcvd2gKAs5XfM/e2r+5ZFAHJy+ygBnlHc/B3lkO53iNWWSqUnUPPdvNQbucJGoBu9w556CRCdtWA3iftI7jPPwuzcR6z1vQ+Hvqi0+5JIZfql37wG5H3D7yqW8zF8g9sJFK3UzoWCdJoo2ZUlKuosfCws6qB+bJrfhJ0fGU+5fQ2JlsLjjCE286N0xhNbWvNGryUi/pd5ao3ACttQhaej274sewXv32WCvBhXK+PoOXf4DZMTevI7OIxSf2WhpAntqA0LlXsYzd0W2ZBV45uypn4PjYvit6eErr9kgrU+9Px0awWyby9yQrxlsHVjDs5qGUoeT96kVdYfTl0WnJAVwdFZ2YbjxwdfcEIUPZqKi4UFJxTYFmkZBKnDMBbSAtv8GsRp9OmKnHauCbof/Y85Gbcm/rUkOzHUp0RaHzX1PGr75VApawRUiGOh35Q4nXkbWuVIypOxpcTkoCffLmty/lJPhQ6nokox0ucWhJib1qip2Tap8bQVSpFGpeEhNSA99ZIJcnX2Pw2+wQzprWYCURsqwbSDEgUISGD5KUjJ1K4IJyySJ0pftp7eFRZA0UqYllRE51LPHImdEfZAKOVL2a5POHY5twmXFY84QoM4mbItvG/WC+Cs8+w/eNOIfn+SE3jxhZsNL43pBCCIeHfU2maKkdtBzJOJa4ZT/sbJsQBcJwfx3Fd0rey4teZIo6Ivvawn8adsGjUWjIgULU4jQpypaCoZ7q/+uC7KwWMT95xdrnyIfhlm56OvKGbacg/1XXNT7UHyBaczb3fTa8k9Pb+abIKQvJVaukjnEs9y7zxvFS/NSNXHtawm29SCzcQvXpsOGHL6pmsuR0dq+GpvGOTq7Pc399v+U7/fKZyzbFeXlDUNGXnN6xKd1/QXJ8hrS5B5+UZ7a5hx5/CTd1r5qk2jApGs7h7Jd+CehG04CwRLqWQpWl2D0sitXK5l4d1lU47NO17YzJhwtnzt6xgTLVjtYegMVUcxsYZDADu97Ho4s4QRsgKQ7mvb9VNwmN0rtaKWXqWwMtcxKKVbyGB6moSOIov2K9SnKBGlFMZpSeSu6mxdalsrfe0lDi46T4ceIYkpzSaPz36DwJEaqnjxHfetP2hwUfTY5h7lW2+7OQgpvrzdy537OzpCrYY7aViKPrqRe9DL6WCXEren8wwoAI0dsJLFeyfW4NdrvASIPX/m6aJI9TAnROefS+JJxkEAuxjZ+GExQE7mNtY8WVtiMgj55GdNze0xSPldzrEf2K3CNGIzSkiLkUOfT6nL/U0zljXuVZA0Ag1dbldcYNiCZidAYtkfPiZ1LZCB+Kz3rG3Bu98evveLZRFg3NrTekPt5LCTM9qzskwRBxvldFDxGsk0bKX5qi1joRej6IlKSk+sSEct2okZ0D2pj1JGwIF/X/0zBkFi2XX6v90+xuDsfPwfjw71j4yo/dqeYkbINIuMrJscZpyZRR9sbTSs2fGubKTQKqEstc+1aLZuMYvTCVT36+F5jXZ3o5Qs01r1S/q59ysOqL8uksEEYtmOGrqawYzNrHF3BwAQE4d3RuJO+UVM+XBymHGYk08Mb3WZjY0syaemkSeywdSm179becSf76QFNaqxasERq+0yBahoV7RJPY/AZ332ge7lDIg9//A+ewucaPmaMRsA8AQ9+IKTmHk//XF5URicQD73GIprQ+jjRKXW3uzpaaUHeShxF9qUWzZrja46UhRIKtk99mVJ6kuN3vFdwxV9suri5DDAYmLhhWqvAdHZsxkA7A1Hp5mCUQ35Mc44Ea6er26EuXTLLNQ1WlrMB+7qMJQovNsgCh1kwwYrOtG+RUuCgqShGNJ0ebkr7MaW1T962xNnHCDyK8vcHHD1LGng9I5DDYNgW99rQwjN9cpbuxPnlaw93svXWbC00UvLB/XBVFFkg05zT/gp2xa17DUTkwHJUtKgBvXBaTB3zae4tmFVROYAccae88kAiWUTAINqmAGTf/5C2Bxav/xBg6O+dfl5i09S04rQrcjtTDSjRlOsGxb5QYktt9v9hyZQKNDpdEEcz3ZkMxbDc75vPr2rJDzU3CsLDjnusjhhcTkOwuKQ42Dc9cqCj7zvZZZnRqHWPBAULBb1Mog7g5ILgF8xpKnmuIOeLYOmJ06Ugbg6hcO6PIJdtJLD7wxO9fz42DucYIAwPgAMsPgAMIABAAOE8aH1h6msv7zz5B2WGXdmdA8fNPnKpmTm4Gjhd3uVA+OpwpuoKpzLKHVrWCEAh3+Zlm4PGfGJsei9W1Zc9Drv9i0D/G/4UFPt+fXnLZalCimQajjpNzSJjC0t2mswP6tep7hDroCXIpNPaM92Q3IbAem0r7F6BPb12vy0MXJ+2KGsm99Zqv9M/nJeGfLkjvLvE5/UAFRuVhOpI40oaYEiMcwJOnSga53pFhS9vUbH+svpoqiqFZU2S5h5Rl+VsC5lHcIJG4CXF6yOeNnf8OBEBojr1XMzCw1PGu7EJcPfpNYG7cXB5PUO0ZR/kK4MbUsTOKNMKqgaXnSyLD7/QOXHbJDlXTvZnWzpNrWvnH/y4pRiZ1d9CbfObD8M8AHId7+zZgMYkEdM7Br96CsTncPjvZD2lu0+c9tcfGPi+aVJNK24LBwnLoya9desj+edkhbMSp786q2eyM3OLDL1XM64yyMccsswd+vKowWlt++Qkqe9K9xL9/5g5OcY9oUJBog8gUXXzWrYlCzu7Y6ZwU9vN4zoiospn0x96q2r5ZODzLIsc9Sp+RVyM7EtTRlI2agGC0aZBcxocqn5LbGKjzosdfwHjyNd3Zz+4XJe953EvS5xF6NlfL/aKseDVRD1nhutq+o0byQLirFPaWoHDE2xKKBIKRi9xE9rjnT7baGm7yQNu0KLqGYYsX1nixkdhOPty9NqDP9WJ8/f/LsTC6oaO/RYLBaLdXScH7fgvu+9XZ/1XsrYNTPN4e5YoiGqUHtRYzLZQlHqkyjSvoYUz9XJY0XGg+50vQZMb2GK/+3BJgp36ZVUT7Zlq0QqW/DsCX19vibfDzXIK4DauAz6nziiXtLiG5A8PnhLbmvB4qBi0PypLYYFqhjLki2GgowpjsEHt9iSxK4rILqvd3++1RWyeCliPsmKy8nz37U0VGuq/mnvDEu9eR62+xdkGX2zs13aWZ9IKme0PYL1nKioRVlLkBoUbW3UbSjUsE5TAJ0Tcaajeak0O9I/QXDfNdvtuGLd7mtiw5VP2wv7xn7lAJmVO2pszpV98KSzDsh7p02+lCdPOJ1j3R5zvaj3r4Wh7utsAE/cKb7/ztniq0IxLfviO+A8LlQCMCuLXk3Lnd1S/rMXrdEHb7OwK+OzUW1jrmVduiDw+ZhUXnJmLCLj0J34TakzXjpMH0xurJA/9mhzFDIuPHihfWHEO2xsSmNOo/fKVdV5Oa/Xc4UKTj29WcQiEFSfNz7Z6ZJWhcTAvJQQA/gMWfPCcsSSRIHZlfG5I1v0j2+/MrpHHPvBpMYbD3/02PvT9/v2OJLyxfMHbi482b3s8l8yPla+Vm+P3xBxVvEJybKnqelm9123qK/bMD1XrgzIEm2BGduZ21QJBXa6L2op8BROnagg3WQdGFk3szkBLH36WOel0Gj4Ghe3ybfQPiLvjEY2JFLwzaNLL0nQ0sBl+4oATRrFCrQgABiKG5ezoRvSA3HD9dmdb9asr7/PcYcTZ0SYrnHjr6Hk4mfFxycY043Gq/388zE2MvWcS1zV7jl39KsGe/DtOJt1pKr+evc1qfBK5lU76O1P+ssnJsd8GqcizucdVIThYvfc4GmbJw74QFCH1lGGalEFTJEaYbVQqUpK2ebVNfo0e1LzZ16Y527j3FaVlf1B2JCYu3bJG7DKLcN/VkMSlqEUd+R36D7S2yFN1PJAgRIrK6BJfdn+Ab8RGncVAxlX5QgDBm6MeWzgiqu7+L1x825cjWWfhdczonFiub1z+PGvFOZdcdwjjPH2Ke32c8TuGsgP2z/3cLt7nE9LTujPtnuuxvI7XQJwRi7eScWypPFscP2tduedJ7Ouuy/GvVJJvHwlabKufmYfd//Rwdk3rpxVXaxFUcZN+3DcKTpx5N7xRy9MnBu/LF/ePedjb7/t0lhl3MewXBg34bGOxz9x9CVj8/sgCSsKN3Xc+wh9cDpCyu37bXXi9AGfYnR0+nQLl1sp0k3B6dIhv4ZOKEuZwkEaH3YVBWf5MmN5EUgKdx/AqSbI3iNBLEWk3N+YNrZOlTBS1Q2Whi8AyAwN0v3nL00J35pX5jXHff7jwaSa7FsXzp9++yNqwXtvl9owtsfqac/ula/2DJLPMiaMHO78s+viV+ssHiW9FrGufcXwOK58BjEpeuf4KPcB+5T4CIwYyBpxrL9qTPSfOsX/B/sormz75FcyAAAAAElFTkSuQmCC';

// ============================================================
// ПРОВЕРКА ЗДОРОВЬЯ СИСТЕМЫ (кабинет руководителя) + пересборка реестра квитанций
// ============================================================

/** Полная проверка: листы, настройки, триггеры, GREEN-API, снимок, реестры, расписание. Только чтение. */
function systemHealthCheck(role, password) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (actual !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  const items = [];
  const add = function(level, area, text, fix, action) { items.push({ level: level, area: area, text: text, fix: fix || '', action: action || '' }); };
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetNames = ss.getSheets().map(function(sh) { return sh.getName(); });
  const has = function(n) { return sheetNames.indexOf(n) !== -1; };

  // --- листы ---
  [CFG_SETTINGS, CFG_TEACHERS, 'ЖУРНАЛЫ'].forEach(function(n) { if (!has(n)) add('error', 'Листы', 'Нет обязательного листа «' + n + '»', 'запустите setupConfigSheets'); });
  [['СКИДКИ', 'реестр скидок'], [MSG_SHEET, 'тексты сообщений'], ['ЗАПРОСЫ', 'заявки преподавателей'], [PRICE_SHEET, 'прайс'], [RCPT_SHEET, 'реестр квитанций'], [PREPAY_SHEET, 'предоплаты'], [ROOM_SHEET, 'кабинеты'], ['Уведомления', 'журнал уведомлений'], ['Изменения', 'журнал правок']].forEach(function(x) { if (!has(x[0])) add('info', 'Листы', 'Лист «' + x[0] + '» (' + x[1] + ') ещё не создан — появится при первом использовании'); });
  if (cfg.useDb) [DB_STUDENTS, DB_GROUPS, DB_ROSTER, DB_ATT].forEach(function(n) { if (!has(n)) add('error', 'База', 'Режим БАЗА включён, но нет листа «' + n + '»', 'запустите importFromJournals'); });

  // --- схема служебных листов: «Ключ» обязан быть последним, иначе столбцы поедут ---
  try {
    [[DB_ROSTER, DB_ROSTER_H], [DB_GROUPS, DB_GROUPS_H], [DB_STUDENTS, DB_STUDENTS_H], [DB_ATT, DB_ATT_H],
     [RCPT_SHEET, RCPT_H], [PREPAY_SHEET, PREPAY_H], [INBOX_SHEET, INBOX_H]].forEach(function(x) {
      const name = x[0], H = x[1], ik = H.indexOf('Ключ');
      if (ik !== -1 && ik !== H.length - 1) {
        add('error', 'Схема листов', 'В описании листа «' + name + '» столбец «Ключ» стоит не последним — лист будет расти пустыми столбцами при каждом обращении, а данные поедут вправо', 'ошибка в коде: «Ключ» должен быть последним в списке столбцов');
      }
      if (!has(name)) return;
      const sh0 = ss.getSheetByName(name);
      const head = sh0.getRange(1, 1, 1, Math.max(sh0.getLastColumn(), 1)).getValues()[0].map(function(v) { return String(v || '').trim(); });
      for (let i = 0; i < H.length; i++) {
        if (head[i] && head[i] !== H[i]) { add('warn', 'Схема листов', 'В листе «' + name + '» столбец ' + (i + 1) + ' называется «' + head[i] + '», а должен быть «' + H[i] + '»', 'данные могли сдвинуться — не редактируйте служебные листы вручную'); break; }
      }
      if (head.length > H.length && head.slice(H.length).some(function(v) { return v; })) {
        add('warn', 'Схема листов', 'В листе «' + name + '» столбцов больше, чем нужно (' + head.length + ' вместо ' + H.length + ')', 'лишние столбцы справа можно удалить');
      }
    });
  } catch (e) {}

  // --- реестр квитанций сходится с фактическими оплатами ---
  try {
    if (cfg.useDb && has(RCPT_SHEET)) {
      const reg = receiptRegistry_(), totals = {};
      Object.keys(reg).forEach(function(k) { totals[k] = reg[k].total; });
      const fact = rcptFactUsage_(cfg, totals);
      let bad = 0, worst = '', over = 0;
      Object.keys(reg).forEach(function(k) {
        if (isCashMarker_(k)) return;
        const f = Math.round(fact[k] || 0);
        if (Math.abs(f - reg[k].distributed) > 1) { bad++; if (!worst) worst = reg[k].raw + ' (в реестре ' + reg[k].distributed + ', по факту ' + f + ')'; }
        if (reg[k].distributed > reg[k].total + 1) over++;
      });
      if (bad) add('warn', 'Квитанции', 'Реестр расходится с оплатами по ' + bad + ' квитанц. Например: ' + worst, 'Предоплаты → «Пересчитать реестр»');
      if (over) add('warn', 'Квитанции', 'У ' + over + ' квитанц. зачтено больше, чем сумма квитанции', 'проверьте кнопкой «Из чего сложилось» в «Предоплатах»');
      if (!bad && !over) add('ok', 'Квитанции', 'Реестр квитанций сходится с оплатами');
      // предоплата не может превышать то, что осталось от квитанции после зачёта ученикам
      const credited = rcptFactUsage_(cfg, totals, true);
      let ghost = 0, ghostSum = 0, ghostWho = '';
      try {
        const ps = prepaySheet_();
        if (ps.getLastRow() >= 2) ps.getRange(2, 1, ps.getLastRow() - 1, PREPAY_H.length).getValues().forEach(function(r) {
          if (String(r[10] || '') === PP_VOID) return;
          const k = normalizeReceiptNumber_(r[5]);
          if (!k || isCashMarker_(k) || totals[k] === undefined) return;
          const free = Math.round(totals[k] - (credited[k] || 0));
          const amt = Math.round(parseNum_(r[7]));
          if (amt > free + 1) { ghost++; ghostSum += amt - Math.max(0, free); if (!ghostWho) ghostWho = String(r[1] || '') + ' — ' + amt + ' сом по квитанции ' + String(r[5] || ''); }
        });
      } catch (e) {}
      if (ghost) add('error', 'Предоплаты', 'Предоплат больше, чем осталось от квитанций: ' + ghost + ' шт. на ' + ghostSum + ' сом. Например: ' + ghostWho, 'аннулируйте такую предоплату в «Предоплатах» и запишите правильный остаток заново');
    }
  } catch (e) {}

  // --- настройки ---
  if (!cfg.currentMonth) add('error', 'Настройки', 'Не задан ТЕКУЩИЙ_МЕСЯЦ');
  if (!monthFromName_(cfg.currentMonth)) add('error', 'Настройки', 'ТЕКУЩИЙ_МЕСЯЦ «' + cfg.currentMonth + '» не распознан (ожидается «Сентябрь 2026»)');
  const today = isoToday_(), mm = monthFromName_(cfg.currentMonth);
  if (mm) { const cur = today.slice(0, 7), set = mm.y + '-' + String(mm.m).padStart(2, '0'); if (cur > set) add('warn', 'Настройки', 'Календарный месяц (' + cur + ') уже позже ТЕКУЩИЙ_МЕСЯЦ (' + cfg.currentMonth + ')', 'откройте следующий месяц'); }
  if (!cfg.teachers.length) add('error', 'Преподаватели', 'Лист ПРЕПОДАВАТЕЛИ пуст');
  const weak = cfg.teachers.filter(function(t) { return !/^\d{2,10}$/.test(String(t.password || '')); });
  if (weak.length) add('warn', 'Преподаватели', 'Коды доступа не из 2–10 цифр у: ' + weak.map(function(t) { return t.short; }).join(', '));
  const dupPw = {}; cfg.teachers.forEach(function(t) { (dupPw[t.password] = dupPw[t.password] || []).push(t.short); });
  Object.keys(dupPw).forEach(function(k) { if (k && dupPw[k].length > 1) add('warn', 'Преподаватели', 'Одинаковый код доступа у: ' + dupPw[k].join(', '), 'смените код одному из них'); });
  if (!cfg.settings['ПАРОЛЬ_АДМИНИСТРАТОРА'] || !cfg.settings['ПАРОЛЬ_РУКОВОДИТЕЛЯ']) add('error', 'Настройки', 'Не заданы коды кассира и руководителя');
  if (cfg.settings['ПАРОЛЬ_АДМИНИСТРАТОРА'] === cfg.settings['ПАРОЛЬ_РУКОВОДИТЕЛЯ']) add('warn', 'Настройки', 'Коды кассира и руководителя совпадают');
  if (!cfg.requisites) add('warn', 'Настройки', 'Пустые РЕКВИЗИТЫ — в уведомлениях не будет реквизитов оплаты');

  // --- журналы (режим журналов) ---
  if (!cfg.useDb) {
    const js = getJournalsForMonth_(cfg, cfg.currentMonth);
    if (!js.length) add('error', 'Журналы', 'В листе ЖУРНАЛЫ нет строк за ' + cfg.currentMonth);
    js.forEach(function(j) {
      if (!j.attendanceId) add('warn', 'Журналы', j.teacher + ': не назначен журнал посещений (NEW) — кабинет преподавателя только для чтения', 'заполните столбец NEW в листе ЖУРНАЛЫ');
      if (j.attendanceError) add('error', 'Журналы', j.teacher + ': ' + j.attendanceError);
    });
    const known = {}; cfg.teachers.forEach(function(t) { known[nameKey_(t.short)] = true; });
    js.forEach(function(j) { if (!known[nameKey_(j.teacher)]) add('error', 'Журналы', 'В ЖУРНАЛЫ есть преподаватель «' + j.teacher + '», которого нет в ПРЕПОДАВАТЕЛИ'); });
    const next = nextMonthName_(cfg.currentMonth);
    if (next && !getJournalsForMonth_(cfg, next).length && mm && Number(today.slice(8, 10)) >= 15) add('info', 'Журналы', 'Журналы за ' + next + ' ещё не заведены — без них преподаватели не смогут перенести группы', 'создайте файлы и впишите ссылки в ЖУРНАЛЫ');
  }

  // --- триггеры ---
  const trig = {}; ScriptApp.getProjectTriggers().forEach(function(t) { trig[t.getHandlerFunction()] = true; });
  if (!trig['refreshAll']) add('warn', 'Триггеры', 'Нет триггера обновления снимка (refreshAll) — сводка и скидки не обновляются сами', 'запустите createAutoRefreshTrigger');
  if (!trig['autoPaymentNotices'] && (cfg.autoNotices || Object.keys(groupNoticeModes_()).some(function(k) { return groupNoticeModes_()[k] === 'auto'; }))) add('error', 'Триггеры', 'Режим АВТО включён, но триггера autoPaymentNotices нет — уведомления не уйдут', 'запустите createAutoNoticesTrigger');
  if (!trig['weeklyBackup']) add('warn', 'Триггеры', 'Нет еженедельной резервной копии', 'запустите createBackupTrigger');
  if (remindersAnyOn_(cfg) && !trig['lessonReminders']) add('error', 'Триггеры', 'Напоминания включены, но триггера lessonReminders нет', 'запустите createRemindersTrigger');

  // --- GREEN-API ---
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('GREEN_API_ID') || !props.getProperty('GREEN_API_TOKEN')) add('error', 'WhatsApp', 'GREEN-API не настроен (свойства скрипта) — сообщения не отправляются');
  else {
    try {
      const url = String(props.getProperty('GREEN_API_URL') || 'https://api.green-api.com').replace(/\/+$/, '');
      const r = UrlFetchApp.fetch(url + '/waInstance' + props.getProperty('GREEN_API_ID') + '/getStateInstance/' + props.getProperty('GREEN_API_TOKEN'), { muteHttpExceptions: true });
      const st = JSON.parse(r.getContentText() || '{}').stateInstance || '';
      if (r.getResponseCode() !== 200) add('error', 'WhatsApp', 'GREEN-API ответил кодом ' + r.getResponseCode());
      else if (st !== 'authorized') add('error', 'WhatsApp', 'Инстанс GREEN-API не авторизован (состояние: ' + st + ')', 'отсканируйте QR в кабинете GREEN-API');
      else add('ok', 'WhatsApp', 'GREEN-API авторизован, отправка работает');
    } catch (e) { add('warn', 'WhatsApp', 'Не удалось проверить GREEN-API: ' + e.message); }
  }
  // ошибки отправки за сегодня
  try {
    const ls = ss.getSheetByName('Уведомления');
    if (ls && ls.getLastRow() >= 2) {
      const from = Math.max(2, ls.getLastRow() - 500); let errs = 0;
      ls.getRange(from, 1, ls.getLastRow() - from + 1, 9).getValues().forEach(function(r) { if (r[0] instanceof Date && Utilities.formatDate(r[0], TZ, 'yyyy-MM-dd') === today && String(r[7]) === 'ошибка') errs++; });
      if (errs) add('warn', 'WhatsApp', 'Сегодня ' + errs + ' сообщений не доставлено (см. лист «Уведомления»)');
    }
  } catch (e) {}

  // --- снимок и данные ---
  let snap = null; try { snap = loadSnapshot_(cfg.currentMonth); } catch (e) {}
  if (!snap) add('warn', 'Сводка', 'Снимок за ' + cfg.currentMonth + ' не построен', 'нажмите «Обновить данные»');
  else {
    if (!cfg.useDb && snap.generatedAt) { const age = (Date.now() - new Date(snap.generatedAt).getTime()) / 60000; if (age > 60) add('warn', 'Сводка', 'Снимок устарел на ' + Math.round(age / 60) + ' ч — триггер обновления не работает?'); }
    if (snap.errors && snap.errors.length) add('warn', 'Сводка', 'Ошибки при сборе: ' + snap.errors.slice(0, 5).join('; ') + (snap.errors.length > 5 ? ' …' : ''));
    const noPhone = [], noDates = [], noLevel = [];
    const exclAll = exclusionsAll_(cfg.currentMonth);
    (snap.groups || []).forEach(function(g) {
      if (!g.n) return;
      (g.st || []).forEach(function(x) { if (x.n && !x.w && !exclAll[nameKey_(g.t) + '|' + nameKey_(g.g) + '|' + studentKey_(x.n)]) noPhone.push(x.n); });
      if (!g.held && !(g.days && g.time)) noDates.push(g.t + ' — ' + (g.gt || g.g));
      if (!g.lvl || /не назнач|не выбран/i.test(g.lvl)) noLevel.push(g.t + ' — ' + (g.gt || g.g));
    });
    if (noPhone.length) add('warn', 'Данные', 'Учеников без WhatsApp родителя: ' + noPhone.length + ' (уведомления им не уходят)', '', 'nophone');
    if (noLevel.length) add('warn', 'Данные', 'Группы без уровня (стоимость 0): ' + noLevel.slice(0, 6).join('; ') + (noLevel.length > 6 ? ' …' : ''));
    if (noDates.length) add('info', 'Данные', 'Группы без расписания: ' + noDates.slice(0, 6).join('; ') + (noDates.length > 6 ? ' …' : ''));
    // один номер у многих учеников
    const pc = {}; (snap.groups || []).forEach(function(g) { (g.st || []).forEach(function(x) { const k = phoneKey_(x.w); if (k) pc[k] = (pc[k] || 0) + 1; }); });
    const shared = Object.keys(pc).filter(function(k) { return pc[k] >= 4; });
    if (shared.length) add('warn', 'Данные', 'Один номер WhatsApp у 4+ учеников: ' + shared.map(function(k) { return k + ' (' + pc[k] + ')'; }).join(', ') + ' — вероятно, тестовые номера');
    // конфликты кабинетов
    try { const sch = getSchedule(role, password, cfg.currentMonth); const conf = (sch.groups || []).filter(function(g) { return g.conflict; }); if (conf.length) add('error', 'Кабинеты', 'Конфликты кабинетов: ' + conf.map(function(g) { return g.teacher + ' ' + g.title + ' (каб. ' + g.room + ')'; }).join('; ')); } catch (e) {}
  }
  // реестр квитанций: отрицательные остатки
  try { const reg = receiptRegistry_(); const bad = Object.keys(reg).filter(function(k) { return reg[k].distributed > reg[k].total; }); if (bad.length) add('warn', 'Квитанции', 'В реестре ' + bad.length + ' квитанций с превышением (правки вручную?)', 'нажмите «Пересобрать реестр квитанций»'); } catch (e) {}
  // прайс
  try { const pr = readPrices_(); if (!Object.keys(pr).length) add('warn', 'Прайс', 'Лист ПРАЙС пуст — стоимость берётся из журналов', 'запустите ensurePriceSheet'); } catch (e) {}
  // заявки без ответа
  try { const pend = readRequests_().filter(function(r) { return r.status === RQ_PENDING; }); if (pend.length) add('info', 'Заявки', 'Заявок преподавателей без решения: ' + pend.length); } catch (e) {}
  try { const pd = readDiscounts_().filter(function(e) { return e.status === DS_PENDING; }); if (pd.length) add('info', 'Скидки', 'Скидок 50/100 % ждут подтверждения руководителя: ' + pd.length); } catch (e) {}
  try { const leg = readDiscounts_().filter(function(e) { return e.status === DS_ACTIVE && [DISCOUNT_TYPES.family, DISCOUNT_TYPES.teacher, DISCOUNT_TYPES.orphan, DISCOUNT_TYPES.special].indexOf(e.type) === -1; }); if (leg.length) add('info', 'Скидки', 'Скидок без основания (импорт): ' + leg.length, 'вкладка «Скидки» → «Требуют уточнения»'); } catch (e) {}

  const mig = PropertiesService.getScriptProperties().getProperty('AUTO_MIGRATE_RESULT') || '';
  if (mig) add(/^ОШИБКА/.test(mig) ? 'error' : 'ok', 'База', 'Автопереход на базу: ' + mig.split('\n').join(' · '));
  else if (!cfg.useDb) add('info', 'База', 'Переход на базу запланирован — выполнится автоматически через минуту после открытия сайта');
  const counts = { error: 0, warn: 0, info: 0, ok: 0 };
  items.forEach(function(i) { counts[i.level] = (counts[i.level] || 0) + 1; });
  return { success: true, checkedAt: Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm'), mode: cfg.useDb ? 'БАЗА' : 'ЖУРНАЛЫ', month: cfg.currentMonth, items: items, counts: counts };
}

/** Пересобрать реестр квитанций по фактическим данным (после ручных правок в журналах) */
function rebuildReceiptRegistry(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  const sh = rcptSheet_();
  const reg = receiptRegistry_();
  // запоминаем суммы квитанций (их нельзя восстановить из журналов)
  const totals = {}; Object.keys(reg).forEach(function(k) { totals[k] = reg[k].total; });
  if (sh.getLastRow() >= 2) sh.deleteRows(2, sh.getLastRow() - 1);
  PropertiesService.getScriptProperties().deleteProperty('RCPT_SEEDED');
  seedReceiptRegistry_(cfg);
  const reg2 = receiptRegistry_();
  let restored = 0;
  Object.keys(totals).forEach(function(k) { const e = reg2[k]; if (e && totals[k] > e.total) { sh.getRange(e.rowIndex, 2).setValue(totals[k]); sh.getRange(e.rowIndex, 10).setValue(totals[k] - e.distributed); restored++; } });
  return { success: true, message: 'Реестр пересобран: квитанций ' + Object.keys(reg2).length + (restored ? ', восстановлено сумм квитанций: ' + restored : '') + '.' };
}


// ============================================================
// ПЕРЕХОД НА БАЗУ ИЗ КАБИНЕТА РУКОВОДИТЕЛЯ (импорт, сверка, переключение)
// ============================================================
function dbMigrateImport(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  if (cfg.useDb) return { success: false, error: 'Режим БАЗА уже включён — импорт из журналов больше не нужен.' };
  try {
    const msg = importFromJournals(cfg.currentMonth);
    return { success: true, message: msg };
  } catch (e) { return { success: false, error: 'Импорт прерван: ' + e.message }; }
}
function dbMigrateVerify(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  try {
    if (!cfg.useDb) buildMonitoringSnapshot(cfg.currentMonth);
    const msg = verifyImport(cfg.currentMonth);
    const m = String(msg).match(/Расхождений: (\d+)/);
    return { success: true, message: msg, diffs: m ? Number(m[1]) : -1 };
  } catch (e) { return { success: false, error: 'Сверка прервана: ' + e.message }; }
}
/** Переключить источник данных: 'БАЗА' или 'ЖУРНАЛЫ' */
function setDataSource(role, password, mode) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  mode = String(mode || '').trim().toUpperCase() === 'БАЗА' ? 'БАЗА' : 'ЖУРНАЛЫ';
  if (mode === 'БАЗА') {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss.getSheetByName(DB_GROUPS) || !ss.getSheetByName(DB_ROSTER)) return { success: false, error: 'База не создана — сначала выполните импорт.' };
    const groups = dbGroupsOfMonth_(cfg.currentMonth);
    if (!groups.length) return { success: false, error: 'В базе нет групп за ' + cfg.currentMonth + ' — сначала выполните импорт.' };
  }
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
  let done = false;
  if (sh && sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) { if (String(r[0]).trim() === 'ИСТОЧНИК_ДАННЫХ') { sh.getRange(i + 2, 2).setNumberFormat('@').setValue(mode); done = true; } });
  if (!done && sh) sh.appendRow(['ИСТОЧНИК_ДАННЫХ', mode, 'ЖУРНАЛЫ — кабинеты работают с журналами Google Таблиц; БАЗА — с листами УЧЕНИКИ / ГРУППЫ / СОСТАВ / ПОСЕЩЕНИЯ этой таблицы']);
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  try { backupNow('переключение на ' + mode); } catch (e) {}
  logChanges_('руководитель', '', '', '(источник данных)', [['ИСТОЧНИК_ДАННЫХ', cfg.useDb ? 'БАЗА' : 'ЖУРНАЛЫ', mode]]);
  return { success: true, mode: mode, message: 'Источник данных: ' + mode + '. Всем пользователям нужно обновить страницу (Ctrl+Shift+R).' };
}


/**
 * Автоматический переход на базу одной кнопкой: импорт текущего месяца → сверка → резервная копия → ИСТОЧНИК_ДАННЫХ = БАЗА
 * → ежедневный триггер смены месяца. Журналы Google Таблиц остаются архивом.
 */
function migrateToDbNow(role, password) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  const out = [];
  try {
    if (cfg.useDb) return { success: false, error: 'Режим БАЗА уже включён.' };
    out.push('1) ' + importFromJournals(cfg.currentMonth).split('\n')[0]);
    let diffs = -1;
    try { buildMonitoringSnapshot(cfg.currentMonth); const v = verifyImport(cfg.currentMonth); const m = String(v).match(/Расхождений: (\d+)/); diffs = m ? Number(m[1]) : -1; out.push('2) Сверка: расхождений ' + (diffs < 0 ? '?' : diffs) + (diffs > 0 ? ' — база повторяет журналы на момент импорта; расхождения означают формулы, затёртые в журналах (подробности во вкладке «Проверка системы» → «Сверить»)' : '')); }
    catch (e) { out.push('2) Сверка не выполнена: ' + e.message); }
    const sw = setDataSource(role, password, 'БАЗА');
    if (!sw.success) return { success: false, error: out.join('\n') + '\n3) ' + sw.error };
    out.push('3) ' + sw.message);
    createMonthSwitchTrigger();
    out.push('4) Смена месяца — автоматически 1-го числа (триггер установлен).');
    return { success: true, message: out.join('\n') };
  } catch (e) { return { success: false, error: (out.join('\n') + '\nОшибка: ' + e.message).trim() }; }
}

/** ЗАПУСТИТЬ ОДИН РАЗ (ставится автоматически при переходе на базу): ежедневная проверка смены месяца в 00:30 */
function createMonthSwitchTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) { if (t.getHandlerFunction() === 'autoMonthSwitch') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('autoMonthSwitch').timeBased().everyDays(1).atHour(0).nearMinute(30).inTimezone('Asia/Bishkek').create();
  return 'Триггер смены месяца установлен (ежедневно 00:30, Бишкек).';
}

/**
 * 1-го числа: ТЕКУЩИЙ_МЕСЯЦ = календарный месяц (только в режиме БАЗА).
 * Группы в новый месяц переносят преподаватели кнопкой «Перенести» (или руководитель — openNewMonth для всех сразу).
 */
function autoMonthSwitch() {
  const cfg = getConfig_();
  if (!cfg.useDb) return;
  try { autoTransferGroups_(); } catch (e) { Logger.log('autoTransferGroups_: ' + e.message); }
  const now = new Date();
  const calName = (function() { const n = MONTHS_RU_NOM[now.getMonth()]; return n.charAt(0).toUpperCase() + n.slice(1) + ' ' + now.getFullYear(); })();
  if (nameKey_(calName) === nameKey_(cfg.currentMonth)) return;
  const cur = monthFromName_(cfg.currentMonth);
  if (cur && (now.getFullYear() * 100 + now.getMonth() + 1) <= (cur.y * 100 + cur.m)) return;   // текущий месяц ещё не наступил
  const st = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
  if (st && st.getLastRow() >= 2) st.getRange(2, 1, st.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) { if (String(r[0]).trim() === 'ТЕКУЩИЙ_МЕСЯЦ') st.getRange(i + 2, 2).setValue(calName); });
  try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
  try { backupNow('начало месяца ' + calName); } catch (e) {}
  logChanges_('система', '', '', '(смена месяца)', [['ТЕКУЩИЙ_МЕСЯЦ', cfg.currentMonth, calName]]);
  Logger.log('Текущий месяц: ' + calName);
}


// ============================================================
// АВТОМАТИЧЕСКИЙ ПЕРЕХОД НА БАЗУ (один раз, без участия пользователя)
// ============================================================
/** При первом открытии сайта: если ещё журналы — через минуту запустить переход */
function scheduleAutoMigration_() {
  const props = PropertiesService.getScriptProperties();
  if (props.getProperty('AUTO_MIGRATED') === '1') return;
  if (getConfig_().useDb) { props.setProperty('AUTO_MIGRATED', '1'); return; }
  if (props.getProperty('AUTO_MIGRATE_SCHEDULED') === '1') return;
  ScriptApp.newTrigger('autoMigrateOnce').timeBased().after(60 * 1000).create();
  props.setProperty('AUTO_MIGRATE_SCHEDULED', '1');
}

/** Выполняется триггером один раз: импорт → сверка → копия → БАЗА → триггер смены месяца */
function autoMigrateOnce() {
  const props = PropertiesService.getScriptProperties();
  ScriptApp.getProjectTriggers().forEach(function(t) { if (t.getHandlerFunction() === 'autoMigrateOnce') ScriptApp.deleteTrigger(t); });
  if (props.getProperty('AUTO_MIGRATED') === '1') return;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return;
  const out = [];
  try {
    const cfg = getConfig_();
    if (cfg.useDb) { props.setProperty('AUTO_MIGRATED', '1'); return; }
    out.push('1) ' + importFromJournals(cfg.currentMonth).split('\n')[0]);
    let diffs = -1;
    try { buildMonitoringSnapshot(cfg.currentMonth); const v = verifyImport(cfg.currentMonth); const m = String(v).match(/Расхождений: (\d+)/); diffs = m ? Number(m[1]) : -1; out.push('2) Сверка с журналами: расхождений ' + (diffs < 0 ? '?' : diffs) + (diffs > 0 ? ' (затёртые формулы в журналах; база берёт реальные значения)' : '')); }
    catch (e) { out.push('2) Сверка не выполнена: ' + e.message); }
    try { out.push('3) ' + backupNow('переход на базу')); } catch (e) { out.push('3) Копия не создана: ' + e.message); }
    const sh = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CFG_SETTINGS);
    let done = false;
    if (sh && sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, 1).getDisplayValues().forEach(function(r, i) { if (String(r[0]).trim() === 'ИСТОЧНИК_ДАННЫХ') { sh.getRange(i + 2, 2).setNumberFormat('@').setValue('БАЗА'); done = true; } });
    if (!done && sh) sh.appendRow(['ИСТОЧНИК_ДАННЫХ', 'БАЗА', 'ЖУРНАЛЫ — кабинеты работают с журналами Google Таблиц; БАЗА — с листами УЧЕНИКИ / ГРУППЫ / СОСТАВ / ПОСЕЩЕНИЯ этой таблицы']);
    try { CacheService.getScriptCache().remove(CONFIG_CACHE_KEY); } catch (e) {}
    out.push('4) Источник данных: БАЗА.');
    try { createMonthSwitchTrigger(); out.push('5) Смена месяца — автоматически 1-го числа.'); } catch (e) { out.push('5) Триггер смены месяца не установлен: ' + e.message); }
    try { const has = ScriptApp.getProjectTriggers().some(function(t) { return t.getHandlerFunction() === 'refreshAll'; }); if (!has) createAutoRefreshTrigger(); } catch (e) {}
    logChanges_('система', '', '', '(переход на базу)', [['ИСТОЧНИК_ДАННЫХ', 'ЖУРНАЛЫ', 'БАЗА']]);
    props.setProperty('AUTO_MIGRATED', '1');
    props.setProperty('AUTO_MIGRATE_RESULT', Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm') + '\n' + out.join('\n'));
    Logger.log(out.join('\n'));
  } catch (e) {
    props.setProperty('AUTO_MIGRATE_RESULT', 'ОШИБКА ' + Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm') + ': ' + e.message + '\n' + out.join('\n'));
    props.deleteProperty('AUTO_MIGRATE_SCHEDULED');   // попробуем снова при следующем открытии сайта
    Logger.log('autoMigrateOnce: ' + e.message);
  } finally { try { lock.releaseLock(); } catch (e) {} }
}


// ============================================================
// УЧЕНИКИ БЕЗ WHATSAPP: список + исключение из уведомлений
// ============================================================
const EXCL_SHEET = 'НЕ_УВЕДОМЛЯТЬ';
const EXCL_H = ['Месяц', 'Преподаватель', 'Группа', 'Ученик', 'Кем', 'Когда', 'Ключ'];
function exclSheet_() { return dbSheet_(EXCL_SHEET, EXCL_H, [120, 160, 90, 220, 120, 130, 220]); }
function exclusionsAll_(month) {
  return cacheGet_('excl:' + nameKey_(month), function() {
    const sh = exclSheet_(), out = {};
    if (sh.getLastRow() >= 2) sh.getRange(2, 1, sh.getLastRow() - 1, EXCL_H.length).getValues().forEach(function(r, i) { const k = String(r[6] || ''); if (k && k.indexOf(nameKey_(month) + '|') === 0) out[k.slice(nameKey_(month).length + 1)] = i + 2; });
    return out;
  });
}
function exclusionsFor_(month, teacherShort, groupName) {
  const all = exclusionsAll_(month), out = {}, prefix = nameKey_(teacherShort) + '|' + nameKey_(groupName) + '|';
  Object.keys(all).forEach(function(k) { if (k.indexOf(prefix) === 0) out[k.slice(prefix.length)] = true; });
  return out;
}

/** Список учеников без WhatsApp родителя за текущий месяц (с отметкой «исключён») */
function getNoPhoneStudents(role, password) {
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  const snap = loadSnapshot_(cfg.currentMonth) || { groups: [] };
  const excl = exclusionsAll_(cfg.currentMonth), items = [];
  (snap.groups || []).forEach(function(g) {
    (g.st || []).forEach(function(x) {
      if (!x.n || x.w) return;
      const k = nameKey_(g.t) + '|' + nameKey_(g.g) + '|' + studentKey_(x.n);
      items.push({ name: x.n, teacher: g.t, teacherFull: g.tf || g.t, group: g.g, groupTitle: g.gt || g.g, paymentRow: Number(x.row), balance: Number(x.b) || 0, excluded: !!excl[k] });
    });
  });
  items.sort(function(a, b) { return (a.excluded - b.excluded) || String(a.teacher).localeCompare(String(b.teacher), 'ru') || String(a.name).localeCompare(String(b.name), 'ru'); });
  return { success: true, month: cfg.currentMonth, items: items };
}

/** Исключить ученика из уведомлений (или вернуть) */
function setNoticeExclusion(role, password, teacherName, groupName, studentName, excluded) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  const t = findTeacherCfg_(cfg, teacherName) || { short: String(teacherName || '') };
  const key = nameKey_(cfg.currentMonth) + '|' + nameKey_(t.short) + '|' + nameKey_(groupName) + '|' + studentKey_(studentName);
  const sh = exclSheet_();
  let rowIndex = 0;
  if (sh.getLastRow() >= 2) sh.getRange(2, 7, sh.getLastRow() - 1, 1).getValues().forEach(function(r, i) { if (String(r[0]) === key) rowIndex = i + 2; });
  const who = actual === 'director' ? 'руководитель' : 'кассир';
  if (excluded === true || String(excluded) === 'true') { if (!rowIndex) sh.appendRow([cfg.currentMonth, t.short, groupName, studentName, who, new Date(), key]); }
  else if (rowIndex) sh.deleteRow(rowIndex);
  cacheDrop_('excl:' + nameKey_(cfg.currentMonth));
  logChanges_(who, groupName, '', studentName, [['Уведомления', excluded ? 'уходят' : 'исключён', excluded ? 'исключён из уведомлений' : 'уведомления снова уходят']]);
  return { success: true, excluded: excluded === true || String(excluded) === 'true' };
}


/**
 * Смена пароля роли из кабинета: руководитель меняет свой пароль и пароль администратора;
 * администратор — только свой. Нужен текущий пароль роли, новый вводится дважды.
 */
function changeStaffPassword(role, password, target, oldPassword, newPassword, newPassword2) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  target = String(target || '') === 'admin' ? 'admin' : 'director';
  if (actual !== 'director' && target !== actual) return { success: false, error: 'Пароль руководителя может менять только руководитель.' };
  const key = target === 'director' ? 'ПАРОЛЬ_РУКОВОДИТЕЛЯ' : 'ПАРОЛЬ_АДМИНИСТРАТОРА';
  const cur = String(cfg.settings[key] || '').trim();
  if (!codeMatches_(cur, oldPassword)) return { success: false, error: 'Текущий код указан неверно.' };
  newPassword = String(newPassword || '').trim();
  if (newPassword !== String(newPassword2 || '').trim()) return { success: false, error: 'Новый код введён по-разному.' };
  { const __e = codeRules_('staff', newPassword); if (__e) return { success: false, error: __e }; }
  if (codeMatches_(cur, newPassword)) return { success: false, error: 'Новый код совпадает с текущим.' };
  if (codeTaken_(cfg, newPassword, target, '')) return { success: false, error: 'Такой код уже используется другим пользователем — выберите другой.' };
  writeSetting_(key, codeHash_(newPassword));
  logChanges_(actual === 'director' ? 'руководитель' : 'кассир', '', '', '(пароль ' + (target === 'director' ? 'руководителя' : 'кассира') + ')', [['Пароль', '••••', 'изменён']]);
  return { success: true, message: 'Пароль ' + (target === 'director' ? 'руководителя' : 'кассира') + ' изменён. Используйте его при следующем входе.' };
}


// ============================================================
// Д4. ВХОДЯЩИЕ СООБЩЕНИЯ РОДИТЕЛЕЙ (GREEN-API receiveNotification) — вкладка «Сообщения», ответы у преподавателя
// ============================================================
const DLG_SHEET = 'ДИАЛОГИ';
const DLG_H = ['Время', 'Номер', 'Ученики', 'Направление', 'Текст', 'Тип', 'Прочитано', 'ID', 'Кем', 'Ссылка'];
function dlgSheet_() {
  const sh = dbSheet_(DLG_SHEET, DLG_H, [140, 130, 260, 90, 500, 110, 90, 140, 120, 300]);
  if (!String(sh.getRange(1, 10).getValue() || '').trim()) sh.getRange(1, 10).setValue('Ссылка');
  return sh;
}

/** ЗАПУСТИТЬ ОДИН РАЗ: приём входящих каждые 5 минут */
function createIncomingTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) { if (t.getHandlerFunction() === 'pollIncoming') ScriptApp.deleteTrigger(t); });
  ScriptApp.newTrigger('pollIncoming').timeBased().everyMinutes(5).create();
  return 'Приём входящих WhatsApp включён (каждые 5 минут).';
}

/** Телефон → ученики текущего месяца */
function studentsByPhone_(cfg) {
  return cacheGet_('byphone:' + nameKey_(cfg.currentMonth), function() {
    const snap = loadSnapshot_(cfg.currentMonth) || { groups: [] }, map = {};
    (snap.groups || []).forEach(function(g) { (g.st || []).forEach(function(x) { const k = phoneKey_(x.w); if (!k || !x.n) return; (map[k] = map[k] || []).push({ name: x.n, teacher: g.t, group: g.g, groupTitle: g.gt || g.g }); }); });
    return map;
  });
}

/** Забрать входящие из очереди GREEN-API (триггер) */
function pollIncoming() {
  const props = PropertiesService.getScriptProperties();
  const url = String(props.getProperty('GREEN_API_URL') || 'https://api.green-api.com').replace(/\/+$/, '');
  const id = String(props.getProperty('GREEN_API_ID') || '').trim(), token = String(props.getProperty('GREEN_API_TOKEN') || '').trim();
  if (!id || !token) return;
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(5000)) return;
  const started = Date.now();
  try {
    const cfg = getConfig_(), byPhone = studentsByPhone_(cfg), sh = dlgSheet_();
    let got = 0;
    while (Date.now() - started < 240000) {
      let r; try { r = UrlFetchApp.fetch(url + '/waInstance' + id + '/receiveNotification/' + token + '?receiveTimeout=5', { muteHttpExceptions: true }); } catch (e) { break; }
      if (r.getResponseCode() !== 200) break;
      const txt = r.getContentText(); if (!txt || txt === 'null') break;
      let n; try { n = JSON.parse(txt); } catch (e) { break; }
      if (!n || !n.receiptId) break;
      try {
        const b = n.body || {};
        if (b.typeWebhook === 'incomingMessageReceived') {
          const chat = String((b.senderData || {}).chatId || ''), digits = chat.replace(/@.*$/, '').replace(/\D/g, '');
          const md = b.messageData || {}, type = String(md.typeMessage || '');
          let text = '', url = '';
          if (md.textMessageData) text = String(md.textMessageData.textMessage || '');
          else if (md.extendedTextMessageData) text = String(md.extendedTextMessageData.text || '');
          else if (md.fileMessageData) {
            const f = md.fileMessageData; url = String(f.downloadUrl || '');
            const mime = String(f.mimeType || ''); const kind = /^image\//.test(mime) || type === 'imageMessage' ? '[изображение]' : (/^audio\//.test(mime) || type === 'audioMessage') ? '[голосовое сообщение]' : (/^video\//.test(mime) || type === 'videoMessage') ? '[видео]' : '[документ ' + String(f.fileName || '') + ']';
            text = (f.caption ? String(f.caption) + ' ' : '') + kind;
          }
          else if (md.quotedMessage && md.quotedMessage.textMessage) text = String(md.quotedMessage.textMessage);
          else text = '[' + type + ']';
          if (chat.indexOf('@g.us') === -1 && digits) {
            const sts = byPhone[digits] || [];
            const when = b.timestamp ? new Date(Number(b.timestamp) * 1000) : new Date();
            sh.appendRow([when, digits, sts.map(function(x) { return x.name + ' (' + x.groupTitle + ', ' + x.teacher + ')'; }).join('; '), 'вх', text, type, '', String(b.idMessage || ''), String((b.senderData || {}).senderName || ''), url]);
            got++;
          }
        }
      } catch (e) { Logger.log('pollIncoming parse: ' + e.message); }
      try { UrlFetchApp.fetch(url + '/waInstance' + id + '/deleteNotification/' + token + '/' + n.receiptId, { method: 'delete', muteHttpExceptions: true }); } catch (e) {}
    }
    if (got) { cacheDrop_('dlgs'); Logger.log('Входящих сохранено: ' + got); }
  } finally { try { lock.releaseLock(); } catch (e) {} }
}

function readDialogRows_() {
  const sh = dlgSheet_(); if (sh.getLastRow() < 2) return [];
  const from = Math.max(2, sh.getLastRow() - 3000);
  return sh.getRange(from, 1, sh.getLastRow() - from + 1, DLG_H.length).getValues().map(function(r, i) {
    return { rowIndex: from + i, when: r[0] instanceof Date ? r[0] : new Date(r[0]), phone: String(r[1] || ''), students: String(r[2] || ''), dir: String(r[3] || ''), text: String(r[4] || ''), type: String(r[5] || ''), read: !!String(r[6] || ''), id: String(r[7] || ''), by: String(r[8] || ''), url: String(r[9] || '') };
  }).filter(function(x) { return x.phone; });
}
/** Исходящие из журнала «Уведомления» по номеру (последние 3000 строк) */
function readOutgoing_(phoneDigits) {
  const ss = SpreadsheetApp.getActiveSpreadsheet(), sh = ss.getSheetByName('Уведомления');
  if (!sh || sh.getLastRow() < 2) return [];
  const from = Math.max(2, sh.getLastRow() - 3000), out = [];
  sh.getRange(from, 1, sh.getLastRow() - from + 1, 9).getValues().forEach(function(r) {
    if (phoneKey_(r[4]) !== phoneDigits || String(r[7]) !== 'отправлено') return;
    out.push({ when: r[0] instanceof Date ? r[0] : new Date(r[0]), dir: 'исх', text: String(r[8] || ''), type: String(r[5] || ''), student: String(r[3] || ''), teacher: String(r[1] || ''), group: String(r[2] || '') });
  });
  return out;
}
const fmtDt_ = function(d) { return d instanceof Date && !isNaN(d) ? Utilities.formatDate(d, TZ, 'dd.MM HH:mm') : ''; };

/** Список диалогов (по номеру): последнее сообщение, непрочитанные */
function getDialogs(role, password) {
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  const rows = readDialogRows_(), byPhone = studentsByPhone_(cfg), map = {};
  rows.forEach(function(r) {
    const d = map[r.phone] = map[r.phone] || { phone: r.phone, students: r.students, last: null, lastText: '', unread: 0, count: 0 };
    d.count++; if (!r.read) d.unread++;
    if (!d.last || r.when > d.last) { d.last = r.when; d.lastText = r.text; }
    if (!d.students && byPhone[r.phone]) d.students = byPhone[r.phone].map(function(x) { return x.name + ' (' + x.groupTitle + ', ' + x.teacher + ')'; }).join('; ');
  });
  const list = Object.keys(map).map(function(k) { const d = map[k]; return { phone: d.phone, students: d.students, last: fmtDt_(d.last), lastTs: d.last ? d.last.getTime() : 0, lastText: d.lastText.substr(0, 120), unread: d.unread, count: d.count }; });
  list.sort(function(a, b) { return (b.unread > 0) - (a.unread > 0) || b.lastTs - a.lastTs; });
  const hasTrigger = ScriptApp.getProjectTriggers().some(function(t) { return t.getHandlerFunction() === 'pollIncoming'; });
  return { success: true, items: list, unreadTotal: list.reduce(function(a, x) { return a + x.unread; }, 0), polling: hasTrigger };
}

/** Переписка по номеру: входящие + исходящие, отмечает входящие прочитанными */
function getDialog(role, password, phone) {
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  const digits = phoneKey_(phone);
  const inc = readDialogRows_().filter(function(r) { return r.phone === digits; });
  const out = readOutgoing_(digits);
  const sh = dlgSheet_();
  inc.forEach(function(r) { if (!r.read) sh.getRange(r.rowIndex, 7).setValue(new Date()); });
  if (inc.some(function(r) { return !r.read; })) cacheDrop_('dlgs');
  const msgs = inc.map(function(r) { return { when: fmtDt_(r.when), ts: r.when.getTime(), dir: 'вх', text: r.text, by: r.by, url: r.url, kind: fileKind_(r.type, r.url) }; })
    .concat(out.map(function(r) { return { when: fmtDt_(r.when), ts: r.when.getTime(), dir: 'исх', text: r.text, type: r.type, student: r.student }; }))
    .sort(function(a, b) { return a.ts - b.ts; });
  const sts = (studentsByPhone_(cfg)[digits] || []);
  return { success: true, phone: digits, students: sts, messages: msgs.slice(-200) };
}

/** Ответ родителю из вкладки «Сообщения» */
function replyDialog(role, password, phone, text) {
  const cfg = getConfig_();
  const actual = staffRole_(cfg, password);
  if (!actual) return { success: false, error: 'Неверный пароль.' };
  text = String(text || '').trim();
  if (!text) return { success: false, error: 'Введите текст.' };
  const digits = phoneKey_(phone);
  const r = sendWhatsapp_(digits, text);
  const sts = (studentsByPhone_(cfg)[digits] || []);
  logNotification_([new Date(), sts[0] ? sts[0].teacher : '', sts[0] ? sts[0].group : '', sts.map(function(x) { return x.name; }).join('; '), digits, 'ответ · ' + (actual === 'director' ? 'руководитель' : 'кассир'), '', r.ok ? 'отправлено' : 'ошибка', r.ok ? text.substr(0, 300) : r.error]);
  if (!r.ok) return { success: false, error: r.error };
  return { success: true, message: 'Отправлено.' };
}

/** Для кабинета преподавателя: последний ответ родителя (7 дней) по каждому ученику группы */
/** Строки переписки для опроса раз в минуту: общий кэш на 50 с, чтобы десять открытых кабинетов не читали лист по очереди */
function readDialogRowsCached_() {
  const hit = cacheGetBig_('dlgrows');
  if (hit) { try { return JSON.parse(hit).map(function(r) { r.when = new Date(r.when); return r; }); } catch (e) {} }
  const rows = readDialogRows_();
  try { cachePutBig_('dlgrows', JSON.stringify(rows.map(function(r) { const o = {}; Object.keys(r).forEach(function(k) { o[k] = r[k]; }); o.when = r.when.getTime(); o.text = String(r.text || '').slice(0, 300); return o; })), 50); } catch (e) {}
  return rows;
}
function repliesForStudents_(students) {
  const out = {};
  try {
    const since = Date.now() - 7 * 86400000;
    const rows = readDialogRowsCached_().filter(function(r) { return r.when.getTime() >= since; });
    if (!rows.length) return out;
    const byPhone = {}; rows.forEach(function(r) { (byPhone[r.phone] = byPhone[r.phone] || []).push(r); });
    students.forEach(function(st) {
      const k = phoneKey_(st.phone); if (!k || !byPhone[k]) return;
      const list = byPhone[k].slice().sort(function(a, b) { return b.when - a.when; });
      out[studentKey_(st.name)] = { count: list.length, last: fmtDt_(list[0].when), ts: list[0].when.getTime(), text: list[0].text.substr(0, 300), unread: list.filter(function(r) { return !r.read; }).length, phone: k };
    });
  } catch (e) {}
  return out;
}


// ============================================================
// ОТЧЁТ ЗА МЕСЯЦ (лист «ОТЧЁТ <месяц>» + ссылки PDF / Excel) — только руководитель
// ============================================================
function buildMonthReport(role, password, month) {
  const cfg = getConfig_();
  if (staffRole_(cfg, password) !== 'director') return { success: false, error: 'Доступно только руководителю.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const snap = loadSnapshot_(month);
  if (!snap || !snap.groups) return { success: false, error: 'Нет данных за ' + month + '.' };
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const name = 'ОТЧЁТ ' + month;
  let sh = ss.getSheetByName(name);
  if (sh) sh.clear(); else sh = ss.insertSheet(name);
  const T = snap.totals || {}, rows = [];
  const money = function(v) { return Math.round(Number(v) || 0); };
  rows.push(['ОБРАЗОВАТЕЛЬНЫЙ ЦЕНТР «ПЛАНЕТА» — ОТЧЁТ ЗА ' + month.toUpperCase(), '', '', '', '', '', '', '']);
  rows.push(['Сформирован: ' + Utilities.formatDate(new Date(), TZ, 'dd.MM.yyyy HH:mm') + ' · источник: ' + (cfg.useDb ? 'база' : 'журналы'), '', '', '', '', '', '', '']);
  rows.push(['', '', '', '', '', '', '', '']);
  rows.push(['1. СВОДКА ПО ЦЕНТРУ', '', '', '', '', '', '', '']);
  rows.push(['Преподавателей', T.teachers || 0, 'Групп с учениками', T.groupsActive || 0, 'Учеников', T.n || 0, 'Заполненность, %', T.fill || 0]);
  rows.push(['Начислено, сом', money(T.acc), 'Оплачено, сом', money(T.paid), 'Долг, сом', money(T.debt), 'Собираемость, %', T.pct || 0]);
  rows.push(['Оплатили полностью', T.full || 0, 'Частично', T.part || 0, 'Не оплатили', T.none || 0, 'Средний чек, сом', money(T.avg)]);
  rows.push(['ФОТ ожидаемый, сом', money(T.efot), 'ФОТ фактический, сом', money(T.ffot), '% ФОТ', T.fotPct || 0, '', '']);
  rows.push(['', '', '', '', '', '', '', '']);
  rows.push(['2. ПО ПРЕПОДАВАТЕЛЯМ', '', '', '', '', '', '', '']);
  rows.push(['Преподаватель', 'Группы', 'Ученики', 'Начислено', 'Оплачено', 'Долг', 'ФОТ ожид.', 'ФОТ факт.']);
  (snap.teachers || []).forEach(function(t) { rows.push([t.tf || t.t, t.groupsActive + ' / ' + t.groupsTotal, t.n, money(t.acc), money(t.paid), money(t.debt), money(t.efot), money(t.ffot)]); });
  rows.push(['ИТОГО', T.groupsActive + ' / ' + T.groupsTotal, T.n || 0, money(T.acc), money(T.paid), money(T.debt), money(T.efot), money(T.ffot)]);
  rows.push(['', '', '', '', '', '', '', '']);
  rows.push(['3. ПО ГРУППАМ', '', '', '', '', '', '', '']);
  rows.push(['Преподаватель', 'Группа', 'Уровень', 'Ученики', 'Цена', 'Начислено', 'Оплачено', 'Долг']);
  (snap.groups || []).filter(function(g) { return g.n > 0; }).forEach(function(g) { rows.push([g.t, g.gt || g.g, g.lvl || '', g.n, money(g.price), money(g.acc), money(g.paid), money(g.debt)]); });
  rows.push(['', '', '', '', '', '', '', '']);
  rows.push(['4. ДОЛЖНИКИ', '', '', '', '', '', '', '']);
  rows.push(['Ученик', 'Группа', 'Преподаватель', 'WhatsApp', 'Стоимость', 'Оплачено', 'Долг', 'Квитанция']);
  const debt = [];
  (snap.groups || []).forEach(function(g) { (g.st || []).forEach(function(x) { if (x.n && Number(x.b) > 0) debt.push([x.n, g.gt || g.g, g.t, x.w || '', money(x.tu), money(x.p), money(x.b), x.r || '']); }); });
  debt.sort(function(a, b) { return b[6] - a[6]; });
  debt.forEach(function(r) { rows.push(r); });
  rows.push(['ИТОГО должников: ' + debt.length, '', '', '', '', '', debt.reduce(function(a, r) { return a + r[6]; }, 0), '']);
  rows.push(['', '', '', '', '', '', '', '']);
  rows.push(['5. ПОСТУПЛЕНИЯ ПО ДНЯМ', '', '', '', '', '', '', '']);
  rows.push(['Дата', 'Оплат', 'Сумма', '', '', '', '', '']);
  const byDay = {};
  (snap.groups || []).forEach(function(g) { (g.st || []).forEach(function(x) { const p = Number(x.p) || 0; if (p <= 0) return; const m = String(x.dt || '').match(/^(\d{2})\.(\d{2})\.(\d{4})/); const k = m ? m[3] + '-' + m[2] + '-' + m[1] : 'без даты'; (byDay[k] = byDay[k] || { c: 0, s: 0 }); byDay[k].c++; byDay[k].s += p; }); });
  Object.keys(byDay).sort().forEach(function(k) { rows.push([k === 'без даты' ? k : k.split('-').reverse().join('.'), byDay[k].c, money(byDay[k].s), '', '', '', '', '']); });
  sh.getRange(1, 1, rows.length, 8).setValues(rows);
  // оформление
  sh.getRange(1, 1).setFontSize(14).setFontWeight('bold');
  [4, 10, 15, 15 + (snap.groups || []).filter(function(g) { return g.n > 0; }).length + 3].forEach(function() {});
  rows.forEach(function(r, i) { const v = String(r[0] || ''); if (/^\d\. /.test(v)) sh.getRange(i + 1, 1, 1, 8).setFontWeight('bold').setBackground('#e3ecf7'); if (v === 'ИТОГО' || v.indexOf('ИТОГО') === 0) sh.getRange(i + 1, 1, 1, 8).setFontWeight('bold'); if (v === 'Преподаватель' || v === 'Ученик' || v === 'Дата') sh.getRange(i + 1, 1, 1, 8).setFontWeight('bold').setBackground('#f5f8fc'); });
  sh.setColumnWidths(1, 8, 130); sh.setColumnWidth(1, 240); sh.setFrozenRows(2);
  SpreadsheetApp.flush();
  const id = ss.getId(), gid = sh.getSheetId();
  return { success: true, name: name, sheetUrl: 'https://docs.google.com/spreadsheets/d/' + id + '/edit#gid=' + gid,
    pdfUrl: 'https://docs.google.com/spreadsheets/d/' + id + '/export?format=pdf&gid=' + gid + '&portrait=false&fitw=true&gridlines=false',
    xlsxUrl: 'https://docs.google.com/spreadsheets/d/' + id + '/export?format=xlsx&gid=' + gid,
    message: 'Отчёт «' + name + '» сформирован: ' + (snap.teachers || []).length + ' преподавателей, ' + (snap.groups || []).filter(function(g) { return g.n > 0; }).length + ' групп, должников ' + debt.length + '.' };
}


/** Служебные триггеры ставятся сами (один раз в сутки проверка): приём входящих, обновление, копии, смена месяца, напоминания */
function ensureTriggers_() {
  const props = PropertiesService.getScriptProperties();
  const stamp = String(props.getProperty('TRIGGERS_CHECKED') || '');
  const today = isoToday_();
  if (stamp === today) return;
  const have = {}; ScriptApp.getProjectTriggers().forEach(function(t) { have[t.getHandlerFunction()] = true; });
  const gp = props.getProperty('GREEN_API_ID') && props.getProperty('GREEN_API_TOKEN');
  if (gp && !have['pollIncoming']) ScriptApp.newTrigger('pollIncoming').timeBased().everyMinutes(5).create();
  if (!have['refreshAll']) ScriptApp.newTrigger('refreshAll').timeBased().everyMinutes(10).create();
  if (!have['weeklyBackup']) ScriptApp.newTrigger('weeklyBackup').timeBased().onWeekDay(ScriptApp.WeekDay.SUNDAY).atHour(3).inTimezone('Asia/Bishkek').create();
  const cfg = getConfig_();
  if (cfg.useDb && !have['autoMonthSwitch']) ScriptApp.newTrigger('autoMonthSwitch').timeBased().everyDays(1).atHour(0).nearMinute(30).inTimezone('Asia/Bishkek').create();
  if (gp && !have['autoPaymentNotices']) ScriptApp.newTrigger('autoPaymentNotices').timeBased().everyDays(1).atHour(cfg.autoHour).nearMinute(5).inTimezone('Asia/Bishkek').create();
  if (gp && remindersAnyOn_(cfg) && !have['lessonReminders']) ScriptApp.newTrigger('lessonReminders').timeBased().everyDays(1).atHour(cfg.remindHour).nearMinute(5).inTimezone('Asia/Bishkek').create();
  props.setProperty('TRIGGERS_CHECKED', today);
}

/** Ответы родителей для открытой группы (опрос из кабинета преподавателя раз в минуту) */
function getTeacherReplies(teacherName, password, groupName, month) {
  const cfg = getConfig_();
  let students = [];
  if (cfg.useDb) {
    const ctx = teacherCtxDb_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    const ro = dbRosterOfGroup_(ctx.gid), S = dbStudents_();
    students = ro.rows.map(function(r) { const st = S.byId[String(r[RO.sid])] || []; return { name: String(r[RO.name]), phone: String(st[ST.wa] || '') }; });
  } else {
    const ctx = teacherContext_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    const disp = ctx.sheet.getRange('A14:U29').getDisplayValues();
    students = disp.map(function(r) { return { name: String(r[1] || '').trim(), phone: String(r[16] || '').trim() }; }).filter(function(x) { return x.name; });
  }
  return { success: true, replies: repliesForStudents_(students) };
}


// ============================================================
// ПЕРЕПИСКА ПРЕПОДАВАТЕЛЯ С РОДИТЕЛЕМ (окно чата по ученику)
// ============================================================
function teacherStudentPhone_(cfg, teacherName, password, groupName, row, month) {
  row = Number(row);
  if (cfg.useDb) {
    const ctx = teacherCtxDb_(teacherName, password, groupName, month);
    if (ctx.error) return { error: ctx.error };
    const ro = dbRosterOfGroup_(ctx.gid), r = ro.rows.filter(function(x) { return Number(x[RO.num]) === row - T_FIRST_ROW + 1; })[0];
    if (!r) return { error: { success: false, error: 'В этой строке нет ученика.' } };
    const st = dbStudents_().byId[String(r[RO.sid])] || [];
    return { ctx: ctx, name: String(r[RO.name]), phone: String(st[ST.wa] || ''), teacher: ctx.auth.teacher.name, group: groupName };
  }
  const ctx = teacherContext_(teacherName, password, groupName, month);
  if (ctx.error) return { error: ctx.error };
  const d = ctx.sheet.getRange(row, 1, 1, 21).getDisplayValues()[0];
  return { ctx: ctx, name: String(d[1] || '').trim(), phone: String(d[16] || '').trim(), teacher: ctx.auth.teacher.name, group: groupName };
}
/** Переписка с родителем ученика: входящие + все наши сообщения на этот номер */
function getTeacherDialog(teacherName, password, groupName, row, month) {
  const cfg = getConfig_();
  const b = teacherStudentPhone_(cfg, teacherName, password, groupName, row, month);
  if (b.error) return b.error;
  if (!b.phone) return { success: false, error: 'У ученика не указан WhatsApp родителя.' };
  const digits = phoneKey_(b.phone);
  const inc = readDialogRows_().filter(function(r) { return r.phone === digits; });
  const out = readOutgoing_(digits);
  const msgs = inc.map(function(r) { return { when: fmtDt_(r.when), ts: r.when.getTime(), dir: 'вх', text: r.text, url: r.url, kind: fileKind_(r.type, r.url) }; })
    .concat(out.map(function(r) { return { when: fmtDt_(r.when), ts: r.when.getTime(), dir: 'исх', text: r.text, type: r.type }; }))
    .sort(function(a, b2) { return a.ts - b2.ts; });
  return { success: true, student: b.name, phone: digits, messages: msgs.slice(-100) };
}
/** Ответ преподавателя родителю (свободный текст) */
function replyTeacherDialog(teacherName, password, groupName, row, text, month) {
  const cfg = getConfig_();
  const b = teacherStudentPhone_(cfg, teacherName, password, groupName, row, month);
  if (b.error) return b.error;
  if (!b.phone) return { success: false, error: 'У ученика не указан WhatsApp родителя.' };
  text = String(text || '').trim();
  if (!text) return { success: false, error: 'Введите текст.' };
  if (text.length > 1000) return { success: false, error: 'Слишком длинное сообщение (до 1000 символов).' };
  const r = sendWhatsapp_(b.phone, text);
  logNotification_([new Date(), b.teacher, b.group, b.name, phoneKey_(b.phone), 'ответ · преподаватель', '', r.ok ? 'отправлено' : 'ошибка', r.ok ? text.substr(0, 300) : r.error]);
  if (!r.ok) return { success: false, error: r.error };
  return { success: true, message: 'Отправлено.' };
}


function fileKind_(type, url) {
  if (!url) return '';
  if (type === 'imageMessage' || /\.(jpe?g|png|webp|gif)(\?|$)/i.test(url)) return 'image';
  if (type === 'audioMessage' || /\.(oga|ogg|mp3|m4a|opus)(\?|$)/i.test(url)) return 'audio';
  if (type === 'videoMessage' || /\.(mp4|mov)(\?|$)/i.test(url)) return 'video';
  return 'doc';
}

/**
 * Распознать квитанцию с картинки (OCR через Drive API — включите «Drive API» в Сервисах редактора).
 * Возвращает найденные номер квитанции, сумму и дату.
 */
function recognizeReceipt(role, password, url) {
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  url = String(url || '').trim();
  if (!/^https?:\/\//.test(url)) return { success: false, error: 'Нет ссылки на изображение.' };
  let blob;
  try { const r = UrlFetchApp.fetch(url, { muteHttpExceptions: true }); if (r.getResponseCode() !== 200) return { success: false, error: 'Не удалось скачать изображение (код ' + r.getResponseCode() + ').' }; blob = r.getBlob(); } catch (e) { return { success: false, error: 'Не удалось скачать изображение: ' + e.message }; }
  let text = '';
  try {
    if (typeof Drive === 'undefined') return { success: false, error: 'Распознавание не включено: в редакторе Apps Script слева «Сервисы» → «+» → Drive API → Добавить. После этого повторите.' };
    const meta = { title: 'ocr_' + Date.now() + '.jpg', mimeType: blob.getContentType() || 'image/jpeg' };
    let file;
    if (Drive.Files.insert) file = Drive.Files.insert(meta, blob, { ocr: true, ocrLanguage: 'ru', convert: true });
    else file = Drive.Files.create({ name: meta.title, mimeType: 'application/vnd.google-apps.document' }, blob, { ocrLanguage: 'ru' });
    const id = file.id;
    try { text = DocumentApp.openById(id).getBody().getText(); } catch (e) { text = ''; }
    try { if (Drive.Files.remove) Drive.Files.remove(id); else Drive.Files.delete(id); } catch (e) { try { DriveApp.getFileById(id).setTrashed(true); } catch (e2) {} }
  } catch (e) { return { success: false, error: 'Ошибка распознавания: ' + e.message }; }
  const flat = text.replace(/\s+/g, ' ');
  // номер квитанции: буква P/Р + 13 цифр (MBank) либо «№/Квитанция/Транзакция» + 8–16 цифр
  let receipt = '';
  let m = flat.match(/[PРpр]\s?(\d{13})/); if (m) receipt = 'P' + m[1];
  if (!receipt) { m = flat.match(/(?:№|N|No|Квитанци[яи]|Транзакци[яи]|Чек|Receipt|ID)[^\d]{0,12}(\d{8,16})/i); if (m) receipt = m[1]; }
  if (!receipt) { m = flat.match(/\b(\d{12,16})\b/); if (m) receipt = m[1]; }
  // сумма: число с пробелами/запятой рядом с KGS/сом/с
  let amount = 0;
  const amts = []; const re = /(\d{1,3}(?:[ \u00a0]\d{3})*(?:[.,]\d{2})?)\s?(?:KGS|сом|c|с)\b/gi; let a;
  while ((a = re.exec(flat)) !== null) { const v = Math.round(parseFloat(a[1].replace(/[ \u00a0]/g, '').replace(',', '.'))); if (v > 0) amts.push(v); }
  if (amts.length) amount = Math.max.apply(null, amts);
  // дата
  let date = '';
  m = flat.match(/(\d{2})[.\/](\d{2})[.\/](\d{4})/); if (m) date = m[3] + '-' + m[2] + '-' + m[1];
  return { success: true, receipt: receipt, amount: amount, date: date, text: text.substr(0, 1500), mbank: /mbank|мбанк|м банк|MBANK/i.test(flat) };
}


// ============================================================
// ГРАФИК ЗАНЯТИЙ ГРУППЫ (карточка + рассылка родителям)
// ============================================================
const WD_RU = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'], WD_KG = ['Жек', 'Дүй', 'Шей', 'Шар', 'Бей', 'Жум', 'Ише'];
function scheduleText_(cfg, month, groupTitle, meta, teacherFull, room, datesIso) {
  const msgs = readMessages_(), m = msgs['ГРАФИК_ГРУППЫ'];
  const lang = m && (m.lang === 'RU' || m.lang === 'KG') ? m.lang : cfg.msgLang;
  const tpl = m ? String(lang === 'RU' ? (m.ru || m.kg) : (m.kg || m.ru)).replace(/\\n/g, '\n') : '📅 {группа} · {месяц}\n{дни} · {время}\n{список}';
  const mm = monthFromName_(month);
  const wd = lang === 'RU' ? WD_RU : WD_KG;
  const list = datesIso.map(function(iso, i) { if (!iso) return (i + 1) + '. —'; const p = iso.split('-'); const d = new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2])); return (i + 1) + '. ' + wd[d.getDay()] + ' ' + p[2] + '.' + p[1]; }).join('\n');
  const na = function(v) { return !v || /не назнач|не выбран/i.test(v); };
  return fillTemplate_(tpl, { 'группа': groupTitle, 'месяц': mm ? MONTHS_RU_NOM[mm.m - 1] + ' ' + mm.y : month, 'Ай': mm ? MONTHS_KG[mm.m - 1].charAt(0).toUpperCase() + MONTHS_KG[mm.m - 1].slice(1) : month, 'год': mm ? String(mm.y) : '', 'уровень': na(meta.level) ? '' : meta.level, 'дни': na(meta.days) ? '' : meta.days.replace(/\s*-\s*/g, ' · '), 'время': na(meta.time) ? '' : meta.time, 'кабинет': room || '', 'кабинет_строка': room ? ' · ' + (lang === 'RU' ? 'кабинет ' : 'кабинет ') + room : '', 'преподаватель': teacherFull, 'список': list });
}

/** Данные для карточки графика (преподаватель) */
function getGroupSchedule(teacherName, password, groupName, month) {
  const cfg = getConfig_();
  let meta, datesIso, students, teacherFull, ctxMonth;
  if (cfg.useDb) {
    const ctx = teacherCtxDb_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    meta = groupMetaDb_(ctx.group.row, ctx.auth.teacher); datesIso = groupDates_(ctx.group.row); ctxMonth = ctx.month; teacherFull = ctx.auth.teacher.full || ctx.auth.teacher.name;
    const ro = dbRosterOfGroup_(ctx.gid), S = dbStudents_();
    students = ro.rows.map(function(r) { const st = S.byId[String(r[RO.sid])] || []; return { name: String(r[RO.name]), phone: String(st[ST.wa] || '') }; });
  } else {
    const ctx = teacherContext_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    const disp = ctx.sheet.getRange('A1:U29').getDisplayValues(), vals = ctx.sheet.getRange('A1:U29').getValues(), tz = sheetTz_(ctx.sheet);
    meta = groupMetaFromGrid_(disp, Number(groupName.replace(/\D/g, '')), ctx.sheet); ctxMonth = ctx.journal.month; teacherFull = ctx.auth.teacher.full || ctx.auth.teacher.name;
    datesIso = []; for (let k = 0; k < 12; k++) { const v = vals[ATT_DATES_ROW - 1][ATT_FIRST_COL - 1 + k]; datesIso.push(v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : ''); }
    students = []; for (let i = 0; i < 16; i++) { const n = String(disp[13 + i][1] || '').trim(); if (n) students.push({ name: n, phone: String(disp[13 + i][16] || '').trim() }); }
  }
  const room = getRoom_(ctxMonth, teacherName, groupName) || getRoom_(ctxMonth, (findTeacherCfg_(cfg, teacherName) || {}).short || teacherName, groupName);
  const text = scheduleText_(cfg, ctxMonth, meta.title || groupName, meta, teacherFull, room, datesIso);
  return { success: true, month: ctxMonth, title: meta.title || groupName, level: meta.level, days: meta.days, time: meta.time, room: room, teacher: teacherFull, dates: datesIso, text: text, recipients: students.filter(function(x) { return x.phone; }).length, missing: datesIso.filter(function(x) { return !x; }).length };
}

/** Разослать график всем родителям группы (преподаватель) */
function sendGroupSchedule(teacherName, password, groupName, month) {
  const cfg = getConfig_();
  const sc = getGroupSchedule(teacherName, password, groupName, month);
  if (!sc.success) return sc;
  if (sc.missing) return { success: false, error: 'Назначьте все 12 дат занятий — не заполнено: ' + sc.missing + '.' };
  let students;
  if (cfg.useDb) { const ctx = teacherCtxDb_(teacherName, password, groupName, month); const ro = dbRosterOfGroup_(ctx.gid), S = dbStudents_(); students = ro.rows.map(function(r) { const st = S.byId[String(r[RO.sid])] || []; return { name: String(r[RO.name]), phone: String(st[ST.wa] || '') }; }); }
  else { const ctx = teacherContext_(teacherName, password, groupName, month); const disp = ctx.sheet.getRange('A14:U29').getDisplayValues(); students = disp.map(function(r) { return { name: String(r[1] || '').trim(), phone: String(r[16] || '').trim() }; }).filter(function(x) { return x.name; }); }
  const tshort = (findTeacherCfg_(cfg, teacherName) || { short: teacherName }).short;
  let sent = 0, failed = 0; const seen = {};
  students.forEach(function(st) {
    if (!st.phone) return;
    const k = phoneKey_(st.phone); if (seen[k]) return; seen[k] = true;   // один номер — одно сообщение
    const r = sendWhatsapp_(st.phone, sc.text);
    logNotification_([new Date(), tshort, groupName, st.name, k, 'график занятий', '', r.ok ? 'отправлено' : 'ошибка', r.ok ? sc.text.substr(0, 300) : r.error]);
    if (r.ok) sent++; else failed++;
    Utilities.sleep(600);
  });
  logChanges_(tshort, groupName, '', '(график)', [['График занятий', '', 'разослан: ' + sent + (failed ? ', ошибок ' + failed : '')]]);
  return { success: true, sent: sent, failed: failed, message: 'График отправлен: ' + sent + ' родител' + (sent === 1 ? 'ю' : 'ям') + (failed ? ', не доставлено: ' + failed : '') + '.' };
}
/** Карточка графика для администратора/руководителя (без отправки) */
function getGroupScheduleStaff(role, password, month, teacherName, groupName) {
  const cfg = getConfig_();
  if (!staffRole_(cfg, password)) return { success: false, error: 'Неверный пароль.' };
  month = String(month || '').trim() || cfg.currentMonth;
  const t = findTeacherCfg_(cfg, teacherName) || { short: String(teacherName || ''), full: String(teacherName || '') };
  let meta, datesIso;
  if (cfg.useDb) { const g = dbGroup_(month, t.short, groupName); if (!g) return { success: false, error: 'Группа не найдена.' }; meta = groupMetaDb_(g.row, t); datesIso = groupDates_(g.row); }
  else { const c = staffCtx_(role, password, month, teacherName, groupName); if (c.error) return c.error; const disp = c.sheet.getRange('A1:U29').getDisplayValues(), vals = c.sheet.getRange('A1:U29').getValues(), tz = sheetTz_(c.sheet); meta = groupMetaFromGrid_(disp, Number(groupName.replace(/\D/g, '')), c.sheet); datesIso = []; for (let k = 0; k < 12; k++) { const v = vals[ATT_DATES_ROW - 1][ATT_FIRST_COL - 1 + k]; datesIso.push(v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : ''); } }
  const room = getRoom_(month, t.short, groupName);
  return { success: true, month: month, title: meta.title || groupName, level: meta.level, days: meta.days, time: meta.time, room: room, teacher: t.full || t.short, dates: datesIso, text: scheduleText_(cfg, month, meta.title || groupName, meta, t.full || t.short, room, datesIso), recipients: 0, missing: datesIso.filter(function(x) { return !x; }).length };
}


/**
 * Назначить все 12 дат сразу. В окне правок — записывает; после — заявки администратору по каждой изменённой дате.
 * datesIso: массив из 12 строк 'yyyy-mm-dd' (пустая — не менять).
 */
function saveTeacherLessonDates(teacherName, password, groupName, datesIso, month) {
  const cfg = getConfig_();
  if (!Array.isArray(datesIso) || datesIso.length !== 12) return { success: false, error: 'Нужно 12 дат.' };
  const clean = datesIso.map(function(d) { d = String(d || '').trim(); return /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : ''; });
  for (let i = 1; i < 12; i++) if (clean[i] && clean[i - 1] && clean[i] <= clean[i - 1]) return { success: false, error: 'Занятие №' + (i + 1) + ' (' + clean[i] + ') должно быть позже занятия №' + i + '.' };
  let cur, windowOk, write, ctxTeacher, ctxMonth;
  if (cfg.useDb) {
    const ctx = teacherCtxDb_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    cur = groupDates_(ctx.group.row); windowOk = groupEditWindowDb_(cfg, ctx.group.row).ok !== false; ctxTeacher = ctx.auth.teacher.name; ctxMonth = ctx.month;
    write = function(arr) { const upd = {}; for (let k = 0; k < 12; k++) if (arr[k] !== cur[k]) upd[10 + k] = arr[k]; upd[23] = nowStamp_(); dbSetCells_(ctx.group.sh, ctx.group.rowIndex, upd); };
  } else {
    const ctx = teacherContext_(teacherName, password, groupName, month);
    if (ctx.error) return ctx.error;
    if (!ctx.editable) return { success: false, error: 'Журнал посещений не назначен.' };
    const vals = ctx.sheet.getRange('A1:U29').getValues(), tz = sheetTz_(ctx.sheet);
    cur = []; for (let k = 0; k < 12; k++) { const v = vals[ATT_DATES_ROW - 1][ATT_FIRST_COL - 1 + k]; cur.push(v instanceof Date ? Utilities.formatDate(v, tz, 'yyyy-MM-dd') : ''); }
    windowOk = groupEditWindow_(cfg, ctx.sheet).ok !== false; ctxTeacher = ctx.auth.teacher.name; ctxMonth = ctx.journal.month;
    write = function(arr) { const row = []; for (let k = 0; k < 12; k++) { if (!arr[k]) { row.push(''); continue; } const p = arr[k].split('-'); row.push(new Date(Number(p[0]), Number(p[1]) - 1, Number(p[2]))); } ctx.sheet.getRange(ATT_DATES_ROW, ATT_FIRST_COL, 1, 12).setValues([row]).setNumberFormat('dd.MM'); SpreadsheetApp.flush(); };
  }
  const target = clean.map(function(d, k) { return d || cur[k]; });
  const changed = []; for (let k = 0; k < 12; k++) if (target[k] !== cur[k]) changed.push(k);
  if (!changed.length) return { success: true, message: 'Даты не изменились.', unchanged: true };
  const fmt = function(d) { return d ? d.split('-').reverse().join('.') : '—'; };
  if (!windowOk) {
    changed.forEach(function(k) { createRequest_('дата', ctxTeacher, ctxMonth, groupName, k + 1, fmt(cur[k]), fmt(target[k]), ''); });
    return { success: true, pending: true, count: changed.length, message: 'Окно правок закрыто: ' + changed.length + ' изменений отправлены руководителю на подтверждение.' };
  }
  write(target);
  logChanges_(ctxTeacher, groupName, '', '(даты занятий)', changed.map(function(k) { return ['Занятие №' + (k + 1), fmt(cur[k]), fmt(target[k])]; }));
  return { success: true, count: changed.length, message: 'Назначено дат: ' + changed.length + '. Все 12 занятий заполнены.' };
}
