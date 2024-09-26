### 詳細設計

#### 1. プロジェクト構成
- **フロントエンド**: React, TypeScript, Tailwind CSS
- **バックエンド**: Next.js, Supabase
- **データストレージ**: IndexedDB(ユーザのアップロード),CashAPI(静的ファイルとデータの保管)
- **ホスティング**: Vercel
- **PWA**: Progressive Web Appとして実装
- **iconライブラリ** [iconLibraly](https://tabler.io/icons)

#### 2. ディレクトリ構成
```
/my-class-schedule
├── public
│   ├── manifest.json // PWAのメタデータ
│   ├── service-worker.js // オフライン対応のService Worker
│   │── icons // PWAのアイコン
│   │   ├── icon-72x72.png
│   │   └── ...
│   └── ...
│
├── src
│   ├── app
│   │   ├── layout.tsx // レイアウトコンポーネント
│   │   ├── page.tsx // ページコンポーネント
│   │   ├── login
│   │   │   └── page.ts  // ログインページ
│   │   ├── register
│   │   │   └── page.tsx // ユーザー登録ページ
│   │   └── classes
│   │       ├── page.tsx // 授業管理ページ
│   │       └── [id]
│   │          └── page.tsx // 授業詳細ページ
│   ├── components
│   │   └── Clalendar
│   │       ├── Calendar.tsx // カレンダーコンポーネント
│   │       ├── ClassForm.tsx   // 授業の追加・編集フォーム
│   │       └── ClassList.tsx  // 授業のリスト表示
│   ├── services
│   │   ├── authService.ts // 認証サービス
│   │   └── classService.ts // 授業サービス
│   ├── styles
│   │   └── global.css // グローバルスタイル
│   ├── utils
│   │   └── indexedDB.ts // IndexedDBユーティリティ
│   └── App.tsx
├── .gitignore
├── .eslintrc.json
├── README.md
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

#### 4. API設計

##### 4.1. 認証API
- **POST /api/auth/register**
  - リクエストボディ: `{ email: string, password: string }`
  - レスポンス: `{ success: boolean, message: string }`

- **POST /api/auth/login**
  - リクエストボディ: `{ email: string, password: string }`
  - レスポンス: `{ success: boolean, token: string }`

##### 4.2. 授業管理API
- **GET /api/classes**
  - リクエストヘッダー: `Authorization: Bearer <token>`
  - レスポンス: `{ classes: Class[] }`

- **POST /api/classes**
  - リクエストヘッダー: `Authorization: Bearer <token>`
  - リクエストボディ: `{ title: string, description: string, category: string, start_time: string, end_time: string }`
  - レスポンス: `{ success: boolean, class: Class }`

- **PUT /api/classes/:id**
  - リクエストヘッダー: `Authorization: Bearer <token>`
  - リクエストボディ: `{ title?: string, description?: string, category?: string, start_time?: string, end_time?: string }`
  - レスポンス: `{ success: boolean, class: Class }`

- **DELETE /api/classes/:id**
  - リクエストヘッダー: `Authorization: Bearer <token>`
  - レスポンス: `{ success: boolean }`

#### 5. フロントエンド設計

##### 5.1. コンポーネント設計
- **Calendar.tsx**: カレンダー表示と操作を担当
- **ClassForm.tsx**: 授業の追加・編集フォーム
- **ClassList.tsx**: 授業のリスト表示

##### 5.2. サービス設計
- **authService.ts**: 認証関連のAPI呼び出しを担当
- **classService.ts**: 授業管理関連のAPI呼び出しを担当

##### 5.3. IndexedDBユーティリティ
- **indexedDB.ts**: IndexedDBを操作するためのユーティリティ関数

#### 6. PWA設計
- **manifest.json**: アプリのメタデータを定義
- **service-worker.js**: オフライン対応のためのService Worker

