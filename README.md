# WA Dispatcher 📱

**WhatsApp Рассылочный Менеджер** — мобильное приложение для автоматизации рассылок в WhatsApp. Управляйте группами и отправляйте массовые сообщения с легкостью!

## 🚀 Особенности

- ✅ **Управление группами** — Организуйте группы в папки
- ✅ **Рассылки** — Создавайте и отправляйте сообщения в несколько групп одновременно
- ✅ **История рассылок** — Отслеживайте статус и аналитику
- ✅ **Управление контактами** — Полный контроль над адресатами
- ✅ **Настройки** — Персонализируйте приложение под себя
- ✅ **Поддержка WhatsApp** — Интеграция с WhatsApp Web/Business API

## 📋 Требования

- Node.js >= 16.0.0
- npm >= 8.0.0
- React Native CLI
- Android SDK (для Android)
- Xcode (для iOS)

## 🛠️ Установка

### 1. Клонируйте репозиторий

```bash
git clone https://github.com/jabirail/wa-dispatcher.git
cd wa-dispatcher
```

### 2. Установите зависимости

```bash
npm install
```

### 3. Установите pods (только для iOS)

```bash
cd ios
pod install
cd ..
```

## 🏃 Запуск приложения

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Запуск Metro Bundler

```bash
npm start
```

## 📁 Структура проекта

```
src/
├── components/          # Переиспользуемые компоненты
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Header.tsx
│   └── index.ts
├── navigation/          # Навигация приложения
│   └── RootNavigator.tsx
├── screens/             # Экраны приложения
│   ├── HomeScreen.tsx
│   ├── GroupsScreen.tsx
│   ├── BroadcastsScreen.tsx
│   ├── SettingsScreen.tsx
│   └── index.ts
├── services/            # Сервисы и API
│   ├── whatsapp.service.ts
│   └── storage.service.ts
├── store/               # Zustand хранилище
│   └── useAppStore.ts
├── types/               # TypeScript типы
│   └── index.ts
├── utils/               # Утилиты и константы
│   ├── constants.ts
│   └── helpers.ts
└── App.tsx              # Главный компонент
```

## 🔧 Конфигурация

### WhatsApp API

Для подключения WhatsApp API отредактируйте файл `.env`:

```env
WHATSAPP_API_URL=https://api.whatsapp.com
WHATSAPP_API_KEY=your_api_key_here
```

## 📚 Типы данных

### Group

```typescript
interface Group {
  id: string;
  name: string;
  participantsCount: number;
  icon?: string;
  folderId?: string;
}
```

### Broadcast

```typescript
interface Broadcast {
  id: string;
  name: string;
  message: Message;
  groups: Group[];
  status: 'draft' | 'sending' | 'completed' | 'paused';
  totalRecipients: number;
  sentCount: number;
  failedCount: number;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}
```

## 🧪 Тестирование

```bash
npm test
```

## 🎨 Стили и Темы

Приложение поддерживает светлую и тёмную темы. Цвета определены в `src/utils/constants.ts`.

## 📞 Поддержка

Если у вас есть вопросы или предложения, пожалуйста, создайте Issue в репозитории.

## 📄 Лицензия

MIT License

## 👨‍💻 Автор

**Jabirail** — разработчик проекта

---

**Спасибо за использование WA Dispatcher!** 🙏
