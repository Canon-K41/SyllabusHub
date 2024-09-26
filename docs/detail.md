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
│   ├── icons // PWAのアイコン
│   │   ├── icon-72x72.png
│   │   └── ... // 他のアイコンファイル
│   └── ... // その他の公開ファイル
│
├── src
│   ├── app
│   │   ├── layout.tsx // レイアウトコンポーネント
│   │   ├── page.tsx // ログインページ
│   │   ├── help
│   │   │   └── page.tsx // ヘルプページ
│   │   ├── [user_id]
│   │       ├── page.tsx // ユーザーホームページ
│   │       ├── calendar
│   │       │   ├── page.tsx // カレンダーページ
│   │       │   ├── settings // カレンダー設定
│   │       │       └── page.tsx // カレンダー設定ページ
│   │       └── userSettings // ユーザー設定
│   │           └── page.tsx // ユーザー設定ページ
|   ├── assets
│   │   ├── HomeIcon.svg // ホームアイコン
│   |   └── ... // 他のアセットファイル
│   │
│   ├── components
│   │   ├── Calendar
│   │   │   ├── Calendar.tsx // カレンダーコンポーネント
│   │   │   ├── ClassForm.tsx // 授業の追加・編集フォーム
│   │   │   └── ClassList.tsx // 授業のリスト表示
│   │   ├── layout
│   │       ├── Header.tsx // ヘッダーコンポーネント
│   │       └── Sidebar.tsx // サイドバーコンポーネント
│   ├── hooks
│   │   ├── useWindowResize.ts // ウィンドウリサイズフック
│   │   ├── useResizeObserver.ts // リサイズオブザーバーフック
│   │   └── useFetchEvents.ts // イベント取得フック
│   ├── lib
│   │   └── supabase.ts // Supabaseクライアント
│   ├── styles
│   │   └── global.css // グローバルスタイル
│   ├── utils
│   │   └── indexedDB.ts // IndexedDBユーティリティ
│   ├── api
│       ├── events.ts // イベントAPI
│       └── user.ts // ユーザーAPI
│   
├── .gitignore // Gitで無視するファイルのリスト
├── .eslintrc.json // ESLintの設定ファイル
├── README.md // プロジェクトの説明書
├── next-env.d.ts // Next.jsの型定義ファイル
├── next.config.mjs // Next.jsの設定ファイル
├── package-lock.json // npmの依存関係のロックファイル
├── package.json // npmの依存関係とスクリプト
├── postcss.config.mjs // PostCSSの設定ファイル
├── tailwind.config.js // Tailwind CSSの設定ファイル
└── tsconfig.json // TypeScriptの設定ファイル
```

#### 4. API設計

##### 4.1. 認証API
- **POST /api/auth/register**
  - リクエストボディ: ` email: string, password: string `
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

