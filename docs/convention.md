# Конвеншн ОСАГО v2.0

## Оглавление

[//]: # 'якоря на кирилице не работают в webStorm но работают в гите'

1. [Общая структура проекта](#Общая-структура-проекта)
2. [Структура client](#Структура-client)
3. [Схема структуры директории client](#Схема-структуры-директории-client)
4. [Слои](#Слои)
5. [Сегменты](#Сегменты)
6. [Структура server](#Структура-server)
7. [Типизация](#Типизация)
8. [Наименования](#Наименования)
9. [Компоненты](#Компоненты)
10. [Переменные](#Переменные)
11. [Общие компоненты](#Общие-компоненты)
12. [Экспорты](#Экспорты)
13. [Функции](#Функции)
14. [Стили](#Стили)
15. [Тесты](#Тесты)
16. [API BFF](#API-BFF)
17. [Текстовые константы](#Текстовые-константы)
18. [Storybook](#Storybook)
19. [Общие организационные моменты](#общие-организационные-моменты)

## Общая структура проекта

```sh
└── src                     # корневой каталог с исходниками проекта
    ├── __mocks__/          # моки данных
    ├── client/             # клиентская логика
    ├── constants/          # общие константы для сервера и клиента
    ├── generatedDTO/       # типы автоматически сгенерированные openapi-typescript
    ├── pages/              # некстовые пейджи, содержат импорты клиентских пейджей
    ├── server/             # серверная логика
    └── types/              # глобальные типы и типы слоя получения данных
```

## Структура client

Директория **client** строится по структуре [FSD](https://feature-sliced.design/ru/). Модули одного уровня могут
взаимодействовать только с модулями уровня ниже.

### Схема структуры директории client

```sh
└── src
    └── client
        ├── app/                    # Layer: Application
        |                           #
        ├── processes/              # Layer: Processes (optional)
        |   ├── {some-process}/     #     Slice: (e.g. CartPayment process)
        |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
        |   |   └── model/          #         Segment: Business Logic
        |   ...                     #
        |                           #
        ├── pageModules/            # Layer: Pages
        |   ├── {some-page}/        #     Slice: (e.g. ProfilePage page)
        |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
        |   |   ├── model/          #         Segment: Business Logic
        |   |   ├── assets/         #         Segment: Images, icons etc.
        |   |   ├── ui/             #         Segment: UI logic
        |   |   ├── types.ts        #         File: Reused types in slice
        |   |   └── index.ts        #         File: Named reexport
        |   ...                     #
        |                           #
        ├── widgets/                # Layer: Widgets
        |   ├── {some-widget}/      #     Slice: (e.g. Header widget)
        |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
        |   |   ├── model/          #         Segment: Business Logic
        |   |   ├── assets/         #         Segment: Images, icons etc.
        |   |   ├── ui/             #         Segment: UI logic
        |   |   ├── types.ts        #         File: Reused types in slice
        |   |   └── index.ts        #         File: Named reexport
        |  ...                      #
        |                           #
        ├── features/               # Layer: Features
        |   ├── {some-feature}/     #     Slice: (e.g. AuthByPhone feature)
        |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
        |   |   ├── model/          #         Segment: Business Logic
        |   |   ├── assets/         #         Segment: Images, icons etc.
        |   |   ├── ui/             #         Segment: UI logic
        |   |   ├── types.ts        #         File: Reused types in slice
        |   |   └── index.ts        #         File: Named reexport
        |   ...                     #
        |                           #
        ├── entities/               # Layer: Business entities
        |   ├── {some-entity}/      #     Slice: (e.g. entity User)
        |   |   ├── lib/            #         Segment: Infrastructure-logic (helpers/utils)
        |   |   ├── model/          #         Segment: Business Logic
        |   |   ├── assets/         #         Segment: Images, icons etc.
        |   |   ├── ui/             #         Segment: UI logic
        |   |   ├── types.ts        #         File: Reused types in slice
        |   |   └── index.ts        #         File: Named reexport
        |   └── interface.ts        #         File: reused interfaces in layer entities
        |   ...                     #
        |                           #
        └── shared/                 # Layer: Reused resources
            ├── api/                #         Segment: Logic of API requests
            ├── config/             #         Segment: Application configuration
            ├── lib/                #         Segment: Infrastructure-application logic
            ├── assets/             #         Segment: Reused images, icons etc.
            └── ui/                 #         Segment: UIKit of the application
```

### Слои

- **app** - инициализирующий слой, запускает конфиги, оборачивает приложение провайдерами. Содержит глобальный стор.

- **pageModules** - пейджи приложения. Наименование изменили чтоб не путаться с некстовой директорией pages.

- **widgets** - самостоятельные модули. Композиция сущностей и фич в единые блоки.

- **features** - взаимодействия с пользователем, действия которые несут бизнес-ценность для пользователя.

- **entities** - сущности. Отдельные самостоятельные сущности, со своей встроенной бизнес логикой.

- **shared** - общий переиспользуемый код, не относящийся к бизнес логике.

- **types** - общие типы, которые не относятся к сущности или невозможно однозначно определить нужному сегменту (
  библиотечные типы, некоторые типы форм)

#### Укрупненный пример структуры слоя сущности

```sh
...
|
└── entities/
    └── {someEntity}/                                         # Слайс: {someEntity}
    |   ├── model/                                            #   Сегмент: работы со стором и методами для взаимодействия с ним
    |   |   ├── {someEntity}.query.ts                         #     Взаимодействие с апи
    |   |   ├── {someEntity}.selectors.ts                     #     Селекторы
    |   |   └── {someEntity}.slice.ts                         #     Слайсы
    |   ├── ui/                                               #   Сегмент: UI логики
    |       ├──{EntityUIComponentVariant1}/                   #     Папка компонента {EntityUIComponentVariant1}
    |   |   |   ├── {EntityUIComponentVariant1}.tsx           #       Компонент {EntityUIComponentVariant1}
    |   |   |   ├── {EntityUIComponentVariant1}.module.scss   #       Стили компонента {EntityUIComponentVariant1}
    |   |   |   └── {EntityUIComponentVariant1}.texts.ts      #       Внутри константа {EntityUIComponentVariant1}Texts с объектом текстовок
    |   |   ├──{EntityUIComponentVariant2}/                   #     Папка компонента {EntityUIComponentVariant2}
    |   |   |   ├── {EntityUIComponentVariant2}.tsx           #       Компонент {EntityUIComponentVariant2}
    |   |   |   ├── {EntityUIComponentVariant2}.module.scss   #       Стили компонента {EntityUIComponentVariant2}
    |   |   |   └── {EntityUIComponentVariant2}.texts.ts      #       Внутри константа {EntityUIComponentVariant2}Texts с объектом текстовок
    |   |  ...                                                #
    |   |   └── index.ts                                      #     публичный апи сегмент ui логики
    |   ├── {lib}/                                            #   Сегмент: утилит
    |  ...                                                    #
    |   |                                                     #
    |   └── index.ts                                          #   Публичный апи слайса {someEntity}
   ...                                                        #
    └── interface.ts                                          # Общие типы для всех сущностей (EntityInterface, EntityUIInterface,EntityHookInterface) для всех сущностей

```

#### Пример организации публичного апи сегмента ui внутри сущности (файл entities/{someEntity}/ui/index.ts)

```typescript
export { SomeEntityComponent } from './SomeEntityComponent';
```

#### Пример организации работы с апи внутри сегмента model для сущности (файл entities/{someEntity}/model/{someEntity}.query.ts)

```typescript
import { baseRTKApi } from 'shared/api/baseApi';
import type { ISomeDataResult } from '../../types';

export const queries = baseRTKApi.injectEndpoints({
  endpoints: (build) => ({
    getSomeData: build.query<ISomeDataResult, ISomeQueryArgs>({
      query: (params) => ({
        url: BFF_API_ROUTES.getSomeData,
        params: { params },
      }),
    }),
    postSomeData: build.mutation<ISomeDataResult, ISomeQueryArgs>({
      query: (params) => ({
        url: BFF_API_ROUTES.postSomeData,
        params: { params },
      }),
    }),
  }),
});

export const useGetSomeData = queries.useLazyGetSomeDataQuery;
export const usePostSomeData = queries.usePostSomeDataMutation;
```

#### Пример организации селекторов внутри сегмента model для сущности (файл entities/{someEntity}/model/{someEntity}.selectors.ts)

```typescript
import type { SliceStateFromReducer } from 'shared/types';
import { someSlice } from './some.slice.ts';

type TSomeState = SliceStateFromReducer<typeof someSlice>;

export const someSelector = (state: TSomeState) => store.data;
export const anotherSelector = (state: TSomeState) => store.data;
```

#### Пример организации слайсев внутри сегмента model для сущности (файл entities/{someEntity}/model/{someEntity}.slices.ts)

```typescript
import {createSlice} from '@reduxjs/toolkit';

import type {SomeEntityState} from '../../types';

const initialState: SomeEntityState = {
  ...
};

export const someEntitySlice = createSlice({
  name: 'someEntity',
  initialState,
  reducers: {
    ...
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      queries.endpoints.getSomeEntityData.matchFulfilled,
      (state, {payload}: PayloadAction<SomeEntityState[SomeData]>) => ({
        ...state,
        info: payload,
      }),
    );

    builder.addMatcher(
      queries.endpoints.postSomeEntityData.matchFulfilled,
      (state, {payload}: PayloadAction<SomeEntityState[AnotherData]>) => ({
        ...state,
        info: payload,
      }),
    );
    // ...
  },
})

```

#### Пример организации публичного апи слоя entities (файл entities/index.ts)

```typescript
export * from './model/someEntity.query';
export * from './model/someEntity.selectors';
export * from './model/someEntity.slices';
export type { TSomeType } from './types';
export * from './ui';
```

### Сегменты

Каждый слой содержит набор компонентов которые внутри разделяются на сегменты

- **ui** - содержит визуальную часть компонентов. Компоненты складываются вширь. Внутрь могут складываться только если
  родительский компонует в себе список дочерних (например Cards который внутри мапает Card)

- **lib** - аналог utils, складываем хуки, отдельные методы

- **assets** - картинки

- **api** - базовый конфиг для api, для ручек которые нельзя использовать в RTKquery, например SSR. Используется в
  shared
  слое.

- **config** - константы

- **model** - компонует в себе бизнес логику, слайсы, селекторы. Используется в entities слое.

#### Укрупненный пример сегмента ui компонентов

```sh
...
|
└──{some-layer}/
    ├── ui/                                         # Сегмент: UI логики
    |   ├── {SomeComponent}/                        #    Компонент {SomeComponent}  - максимальный уровень вложенности
    |   |   ├── {SomeComponent}.tsx                 #   компонент {SomeComponent}
    |   |   ├── {SomeComponent}.module.scss         #   стили компонента {SomeComponent}
    |   |   ├── {SomeComponent}.texts.ts            #   внутри константа {SomeComponent}Texts с объектом текстовок
    |   |   └── {SomeComponent}.config.ts|tsx       #   константы. Если их много, можно вынести в отдельный сегмент config
    |  ...                                          #
    ├── {other-segment}/
   ...
```

#### Укрупненный пример сегмента lib и ui с вложенными компонентами

**Договоренности:**

- Максимальная вложенность внутри сегмента - 1 (то есть компоненты в компоненты не вкладываем, все компоненты лежат в
  ui)

```sh
...
|
└──{some-slice}/
    ├── ui/                                                    # Сегмент: UI логики
    |   ├── {SomeNestedComponent}/                             #    Компонент {SomeNestedComponent} - максимальный уровень вложенности
    |   |   ├── {SomeNestedComponent}.tsx                      #        Компонент {SomeNestedComponent}
    |   |   ├── {SomeNestedComponent}.module.scss              #        Стили компонента {SomeNestedComponent}
    |   |   ├── {SomeNestedComponent}.texts.ts                 #        Внутри константа {SomeNestedComponent}Texts с объектом текстовок
    |   |   └── {SomeNestedComponent}.config.ts|tsx            #        Константы. Если их много, можно вынести в отдельный сегмент config
    |   |                                                      #
    |   ├── {OtherNestedComponent}/                            #    Компонент {OtherNestedComponent}  - максимальный уровень вложенности
    |   |   ├── {OtherNestedComponent}.tsx                     #          Компонент {OtherNestedComponent}
    |   |   ├── {OtherNestedComponent}.module.scss             #          Стили компонента {OtherNestedComponent}
    |   |   ├── {OtherNestedComponent}.texts.ts                #          Внутри константа {OtherNestedComponent}Texts с объектом текстовок
    |   |   └── {OtherNestedComponent}.config.ts|tsx           #          Константы. Если их много, можно вынести в отдельный сегмент config
    |   |                                                      #
    |   ├── {SomeComponent}/                                   #    Компонент {SomeComponent}  - максимальный уровень вложенности
    |   |   ├── {SomeComponent}.tsx                            #          Компонент {SomeComponent}
    |   |   ├── {SomeComponent}.module.scss                    #          Стили компонента {SomeComponent}
    |   |   ├── {SomeComponent}.texts.ts                       #          Внутри константа {SomeComponent}Texts с объектом текстовок
    |   |   └── {SomeComponent}.config.ts|tsx                  #          Константы. Если их много, можно вынести в отдельный сегмент config
    |  ...                                                     #
    ├── {lib}/                                                 # Сегмент: утилит
    |   ├── use{SomeHook}.ts|tsx                               #
    |   ├── {helper}.ts|tsx                                    #
    |   └── __tests__                                          #    Все тесты помещаем в папку __tests__ - максимальный уровень вложенности
    |       ├── use{SomeHook}.spec.ts|tsx                      #
    |       └── {helper}.spec.ts|tsx                           #
    |                                                          #
    ├── {other-segment}/                                       #
    |
   ...
```

## Структура server

```sh
└── src                         # корневой каталог с исходниками проекта
    ├── server                  #   серверная логика
    |   ├── constants/          #
    |   ├── controllers/        #
    |   ├── middlewares/        #
    |   ├── routes/             #
    |   ├── services/           #
    |   ├── utils/              #
    |   └── index.ts            #     инициализация сервера и подключение мидлварь
   ...                          #
```

## Типизация

- Не используем жесткий каст типов(as тип), явное и неявное any и @ts-ignore. В случае, если это необходимая ситуация,
  то пишем TODO, FIXME с номером задачи на исправление. Когда тот самый крайний случай и необходимо использовать каст
  типов, то делаем это
  через [unsafeCoerce](https://github.com/sravni/osagoinsurance-frontend/blob/cc7cf3efcf32dfbdf8765e00afefc55fd2f0d422/src/client/shared/lib/unsafeCoerce/unsafeCoerce.ts)

- Типы разделены на общие по использованию и хранятся в соответствующих директориях: **src/client/server**

- На стороне сервера используется генерация со свагера сервисов.

- Нельзя использовать типы в клиенте из типов слоя получения данных (сгенерированные для BFF)

- Типы для утилит хранятся на уровне модуля, где эти типы используются

- Типы entities которые используются на других слоях, для работы с этой сущностью, выносятся в index.ts (public API)
  именованным экспортом

- Типы слоя получения данных. Автосгенерированные типы лежат на уровне src. Там же создаются разбитые по сущностям
  неймспейсы, которые содержат в себе типы и интерфейсы на основе сгенерированных, а так-же самописные, для которых
  недоступна автогенерация. Данные типы используются на БФФ и в кверях. Если какие-то данные изменены на БФФ (какой то
  маппинг, либо компоновка из нескольких запросов), то типы также заносятся в нужный неймспейс.

## Наименования

### Компоненты

Наименования компонентов в разделе [компоненты](#Укрупненный-пример-сегмента-ui-компонентов)

### Переменные

- Называть переменные необходимо начиная с существительных
- Называть функции необходимо начиная с глаголов(не модальных) и не с зарезервированных слов для boolean-переменных
- В названиях переменных и функций используем camelCase
- Имена логических переменных и функций начинаем с префиксов 'is', 'has' или 'should'
- Имена констант пишем в UPPER_CASE кроме текстовых в отдельных файлах (допущение сделано так как веб шторм не дает
  возможность создавать 'file and code templates' с преобразованием PascalCase в UPPER_CASE)
- Про текстовые константы [тут](#Текстовые-константы)

```typescript
const variableForSomething; //OK

const getForFunction; // не ОК

function loadAllData() {} // OK

function listOfData() {} // не ОК

function checkShouldShowForwardingPropositions() {} // OK

function shouldShowForwardingPropositions() {} // не ОК
```

- Необходимо стараться не смешивать названия переменных/функций и бизнес-логику.

```typescript
const studentsItems; // Это боль

const studentsArray; // Это боль

const teacherPermissionsObject; // Это тоже боль

const studentsList; // Это сойдет, но можно лучше

const students; // Это ОК

const teacherPermissions; // Это ОК
```

- Не стоит использовать сокращения в функциях map, reduce и прочих. Не стоит использовать сокращения в случае, если Вы
  хотите вызвать некий метод у переменной в ее хэндлере

```typescript
const result = entities.map((e, i) => {}); // не ОК

const res = entities.map((entity, i) => {}); // ОК
```

- Мы используем arguments destructing только тогда, когда количество полей в объекте - аргументе функции не превышает
  пяти. Начиная с крупных объектов, мы
  используем

```typescript
const { entity1, entity2, entity3, entity4, entity5, entityN } = props;
```

- В случае глубокой вложенности мы не используем глубокий destructuring.

```typescript
const {
  entity1: {
    entity2: {
      entity3: { entity4: entity5 },
    },
  },
} = props; // так не делаем
```

- Максимальный уровень вложенности для использования этого паттерна - 1 уровня.
- Мы не используем магических значений и вложенные тернарники

## Общие компоненты

Общие компоненты, утилиты, константы с проектом КАСКО выносятся в отдельный
проект [COSAGO](https://github.com/sravni/cosago-library)

## Экспорты

1. Не используем дефолтные экспорты (кроме случаев когда нельзя обойтись, с пейджами и тд).
2. Используем именованные реэкспорты, исключения только при экспорте большого количество элементов (например типы,
   картинки)
3. Файлы index.ts только для реэкспорта и public API. В index.ts не пишем код

## Функции

1. Функции которые используются в зависимостях в хуках или передаются в компоненты "дорогие" к ререндерам **должны иметь
   обёртку useCallback.** При необходимости
   компонент оборачивается в React.Memo.
2. функции которые **не используют** стейт, реф и т.д., выносятся в utils компонента, либо
   в общие utils, если функция переиспользуется за пределами компонента и покрываются тестами. В некоторых случаях можно
   данные передать в
   параметрах, для удобства тестирования
3. функции которые **используют** элементы компонента, оставляем в компоненте, но пытаемся максимально разгрузить
   функционал

## Стили

1. Модульность. Стили для компонента
2. Импортируемое имя для библиотеки ClassNames - ‘cn’ (import cn from 'classnames';)
3. Адаптивность делаем с помощью брейкпоинтов в стилях. Не используем тернарники для классов.

```typescript
// не ОК
// component.tsx
className={isMobile ? styles.mobile : styles.desktop}

//ok
// component.tsx
className={styles.component}

// component.module.scss
@import '~@sravni/design-system-theme/lib/scss/core/variables';

.component {
  some desktop styles
  @media screen and (min-width: $breakpoint-desktop) {
      some mobile styles
  }
}
```

4. Не разбиваем (пока что) отдельно классы для отображения и расположения. Если будут кейсы когда надо разделить,
   собираемся, смотрим на корректном примере
5. Хелперы. Если на элементе есть класс, то все управление из класса, если класса нет, то можно юзать.

## Тесты

- Файлы тестов храним в папке \_\_tests\_\_ рядом с компонентами

```sh
-lib
  - useGetLink.ts
  - __tests__
    - useGetLink.spec.ts
```

- Для удобства написания тесто и для создания единого стиля введем ряд ключевых терминов:
  - WHEN - начало всех кейсов, какое-то входное условие, которое инициирует цепочку бизнес логики.
  - AND - объединяет два условия в кейсе, очень часто используется в “describe”, потому что одно условие удовлетворяет
    нескольким кейсам
  - NOT - вспомогательный термин, указывающий что действие не должно происходить, чаще всего используется после MUST
  - MUST - описывает поведение ожидаемое для тестируемого кейса

### Пример теста

```typescript
// 'WHEN "addToken" is called' - начальное условие для группы тестов
describe('WHEN "addToken" is called', () => {
  const defaultConfig = {
    headers: {
      defaultHeader: 'test',
    },
  };

  // AND userStore.token " is not provided - дополнительное условие, при котором надо проверить выполнение кода" "MUST return incoming config" - действие которое проверяется в тесте
  it('AND "userStore.token" is not provided, MUST return incoming config', () => {
    expect(addToken({ headers: { ...defaultConfig.headers } })).toEqual(defaultConfig);
  });

  // AND "userStore.token" is provided - дополнительное условие, которое сохраняется вернум более чем для одного тестового случая.
  describe('AND "userStore.token" is provided', () => {
    beforeEach(() => {
      userStore.setToken('2');
    });

    it('MUST add user token in incoming config', () => {
      expect(addToken({ headers: { ...defaultConfig.headers } })).toEqual({
        headers: {
          ...defaultConfig.headers,
          Authorization: 'Bearer 2',
        },
      });
    });

    it('AND config not provided, MUST create new config with token header', () => {
      expect(addToken()).toEqual({
        headers: {
          Authorization: 'Bearer 2',
        },
      });
    });
  });
});
```

### Результат выполнения такого теста

```
- WHEN "addToken" is called
  - AND "userStore.token" is not provided, MUST return incoming config
  - AND "userStore.token" is provided
  - MUST add user token in incoming config
  - AND config not provided, MUST create new config with token header
```

## API BFF

- Роуты с методами находятся в **server/routes/api.js**

- Роуты оперируют контроллерами **server/controllers**

- Контроллеры оперируют сервисами **server/services**

- При необходимости, контроллеры добавляют дополнительную логику.

- Контроллеры и сервисы разбиваются по сущностям к которым они относятся

**Структура сервисов:**

```sh
- services
    - cross
        - crossCalculations
            - \_\_tests\_\_
                - getCrossCalculations.spec.ts
                - postCrossCalculations.spec.ts
            - crossCalculationsServices.ts
        - crossOrders
            - \_\_tests\_\_
                - getCrossCalculations.spec.ts
                - postCrossCalculations.spec.ts
            - crossOrdersServices.ts
    [Header.stories.ts](..%2F..%2F..%2Fstories%2FHeader.stories.ts)- types.ts
    - index.ts
```

## Текстовые константы

- Текстовые константы хранятся на уровне модуля.

- Все текстовые константы выносятся из компонента в отдельный файл

- Наименование файла: **ModuleName.texts.ts**

- Наименование константы: **ModuleNameTexts**

- В данных константах находятся объекты, которые имеют значение только типа **string**, если необходимо какое либо
  вычисление, то данный метод выносится в **lib**.

```typescript
const SomeComponentTexts = {
  btnPay: 'Оплатить',
};
```

## Storybook

- Сторисы пишем на все компоненты которые содержат сегмент ui в слайсах shared, entity, features
- Для всех пропсов в интерфейсе пишем коммент с описанием каждого пропса

### Пример сториса

#### Компонент

```tsx
import React from 'react';
import './button.css';

// комменты в пропсах позволят
interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button = ({ primary = false, size = 'medium', backgroundColor, label, ...props }: ButtonProps) => {
  return (
    <button
      type="button"
      className={['storybook-button', `storybook-button--${size}`, mode].join(' ')}
      {...props}
    >
      {label}
    </button>
  );
};
```

#### Сторис компонента

```tsx
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Button> = {
  title: 'Shared/Button',
  component: Button,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'Button',
  },
};
```

### Мок стора

//TODO: добавить примеры https://sravni-corp.atlassian.net/browse/OS-6490

## Общие организационные моменты

- TODO и FIXME пишем сразу с номером задачи на исправление
