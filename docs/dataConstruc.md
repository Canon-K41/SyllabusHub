# データの型やDBの設計についてのメモ

## カレンダーに渡すデータ
- カレンダーに渡すデータは以下のような形式であること
```typescript
events: [
  {
    id: number,
    title: string,
    start: string, //(20[2-9][0-9]|2100)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])
    end: string, //(20[2-9][0-9]|2100)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])
    url: string,
    backgroundColor: string, //color code
    borderColor: string, //color code
    textColor: string, //color code
    editable: boolean,
    overlap: boolean,
    eventDrop: function,  //callback update event info
    extendedProps: {
      location: string, 
    }
  }
]
```
## 3. データベース設計
成績テーブルを授業とユーザーの中間テーブルとしても設計するか、それともそれぞれ独立したテーブルとして設計するか検討する必要がある。
ChashAPIに画像データを保存させるためならURLではなく画像データを保存する必要がある。
![imae01]:(./test.png)

### ユーザーテーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| user_id        | INT            | 主キー           |
| email          | VARCHAR(255)   | メールアドレス   |
| password_hash  | VARCHAR(255)   | パスワードハッシュ|
| username       | VARCHAR(255)   | ユーザー名       |
| role           | VARCHAR(50)    | ロール           |
| university     | VARCHAR(255)   | 大学名           |
| profile_image  | VARCHAR(255)   | プロフィール画像URL |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### ユーザーと授業の中間テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| user_id        | INT            | 外部キー (ユーザーID) |
| class_id       | INT            | 外部キー (授業ID) |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 授業テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| class_id       | INT            | 主キー           |
| title          | VARCHAR(255)   | 授業タイトル     |
| description    | TEXT           | 授業の説明       |
| URL            | VARCHAR(255)   | 授業URL          |
| instructor_id  | INT            | 外部キー (担当員ID) |
| semester       | VARCHAR(50)    | 学期             |
| date           | DATE           | 日付             |
| start_time     | TIME           | 開始時間         |
| end_time       | TIME           | 終了時間         |
| location       | VARCHAR(255)   | 授業場所         |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |
| university     | VARCHAR(255)   | 開講大学         |

### 授業とカテゴリーの中間テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| class_id       | INT            | 外部キー (授業ID) |
| category_id    | INT            | 外部キー (カテゴリーID) |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### カテゴリーテーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| category_id    | INT            | 主キー           |
| name           | VARCHAR(255)   | カテゴリー名     |
| description    | TEXT           | カテゴリーの説明 |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 担当員とカテゴリーの中間テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| instructor_id  | INT            | 外部キー (担当員ID) |
| category_id    | INT            | 外部キー (カテゴリーID) |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### ユーザーとスケジュールの中間テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| user_id        | INT            | 外部キー (ユーザーID) |
| event_id       | INT            | 外部キー (イベントID) |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 予定テーブル
| カラム名          | データ型       | 説明                     |
| ----------------- | -------------- | ------------------------ |
| event_id                | INT            | 主キー                   |
| user_id           | INT            | 外部キー (ユーザーID)    |
| class_id          | INT            | 外部キー (授業ID), NULL許可 |
| title             | VARCHAR(255)   | タイトル                 |
| content           | TEXT           | 内容                     |
| start             | TIMESTAMP      | 開始日時                 |
| end               | TIMESTAMP      | 終了日時                 |
| url               | VARCHAR(255)   | イベントのURL            |
| backgroundColor   | VARCHAR(7)     | 背景色 (カラーコード)    |
| borderColor       | VARCHAR(7)     | 枠線の色 (カラーコード)  |
| textColor         | VARCHAR(7)     | 文字の色 (カラーコード)  |
| editable          | BOOLEAN        | 編集可能かどうか         |
| overlap           | BOOLEAN        | 重複可能かどうか         |
| eventDrop         | TEXT           | イベント更新のコールバック|
| location          | VARCHAR(255)   | 場所                     |
| created_at        | TIMESTAMP      | 作成日時                 |
| updated_at        | TIMESTAMP      | 更新日時                 |
| date              | DATE           | 日付                     |

### 過去問テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| past_exam_id   | INT            | 主キー           |
| class_id       | INT            | 外部キー (授業ID) |
| title          | VARCHAR(255)   | タイトル         |
| tags           | VARCHAR(255)   | タグ             |
| image_url      | VARCHAR(255)   | 画像URL          |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 課題テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| assignment_id  | INT            | 主キー           |
| class_id       | INT            | 外部キー (授業ID) |
| title          | VARCHAR(255)   | タイトル         |
| description    | TEXT           | 課題の説明       |
| due_date       | DATE           | 提出期限         |
| status         | VARCHAR(50)    | 提出状況 (未提出、提出済み) |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### コメントテーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| comment_id     | INT            | 主キー           |
| user_id        | INT            | 外部キー (ユーザーID) |
| target_type    | VARCHAR(50)    | 対象タイプ (授業、過去問) |
| target_id      | INT            | 対象ID (授業ID、過去問ID) |
| content        | TEXT           | コメント内容     |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 成績テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| grade_id       | INT            | 主キー           |
| user_id        | INT            | 外部キー (ユーザーID) |
| class_id       | INT            | 外部キー (授業ID) |
| grade          | VARCHAR(50)    | 成績             |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 通知テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| notification_id| INT            | 主キー           |
| user_id        | INT            | 外部キー (ユーザーID) |
| assignment_id  | INT            | 外部キー (課題ID) NULL可|
| title          | VARCHAR(255)   | 通知タイトル     |
| message        | TEXT           | 通知メッセージ   |
| read_status    | BOOLEAN        | 既読ステータス   |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 担当員テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| instructor_id  | INT            | 主キー           |
| name           | VARCHAR(255)   | 名前             |
| email          | VARCHAR(255)   | メールアドレス   |
| rating_comment | TEXT           | 評価コメント     |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

## CashAPIの設計
### Cache APIで保存するデータ
- **静的リソース**:
  - HTMLファイル
  - CSSファイル
  - JavaScriptファイル
  - 画像ファイル
  - フォントファイル
- **用途**:
  - オフライン時にアプリが動作するようにするため。
  - ページの読み込み速度を向上させるため。
  - データと静的ソースは分けて保存するため。気を付けて

### キャッシュの設計
静的ファイルや静的

## IndexedDBの設計
JavaScriptのオブジェクトデータベースであるIndexedDBを使ってデータを保存する。
### IndexedDBで保存するデータ
- **構造化データ**:
  - ユーザーデータ（ユーザーテーブル）
  - 授業データ（授業テーブル）
  - 中間テーブルのデータ（ユーザーと授業の中間テーブル、授業とカテゴリーの中間テーブルなど）
  - カテゴリーデータ（カテゴリーテーブル）
  - 予定データ（予定テーブル）
  - 過去問データ（過去問テーブル）
  - 課題データ（課題テーブル）
  - コメントデータ（コメントテーブル）
  - 成績データ（成績テーブル）
  - 通知データ（通知テーブル）
  - 担当員データ（担当員テーブル）
- **用途**:
  - ユーザーの設定情報やアプリケーションデータをクライアントサイドに保存するため。
  - 大量のデータを保存して、後で検索やフィルタリングを行うため。
  - トランザクションを使ってデータの整合性を保つため。

### IndexedDBの設計
- **データベース名**: `SyllabusHubDB`
- **オブジェクトストア**:
#### ユーザーのJavaScriptオブジェクト
ユーザーデータを保存するオブジェクトストア 
使用ユーザーのデータのみを保存する
```javascript
const user = {
    user_id: 1,
    email: "user@example.com",
    password_hash: "hashed_password",
    username: "example_user",
    role: "student",
    university: "Example University",
    profile_image: "https://example.com/profile.jpg",
    created_at: "2023-01-01T10:00:00",
    updated_at: "2023-01-01T10:00:00"
};
```
#### スケジュール表示用のJavaScriptオブジェクト
スケジュール表示用のデータを保存するオブジェクトストア
使用ユーザーのデータのみを保存する
```javascript
const schedule = [
  {
    event_id: 1,
    user_id: 1,
    class_id: 101,
    title: "Math Class",
    content: "Algebra and Geometry",
    start: "2023-10-01T10:00:00",
    end: "2023-10-01T12:00:00",
    url: "https://example.com/math-class",
    backgroundColor: "#ff0000",
    borderColor: "#000000",
    textColor: "#ffffff",
    editable: true,
    overlap: false,
    eventDrop: "function() { console.log('Event dropped'); }",
    location: "Room 101",
    created_at: "2023-09-01T10:00:00",
    updated_at: "2023-09-01T10:00:00",
    date: "2023-10-01"
  },
  // 他のイベントも同様に追加
];
```
#### 通知のJavaScriptオブジェクト
通知データを保存するオブジェクトストア
使用ユーザーのデータのみを保存する
```javascript
const notifications = [
  {
    notification_id: 1,
    user_id: 1,
    assignment_id: 101,
    title: "New Assignment",
    content: "You have a new assignment due next week.",
    read: false,
    created_at: "2023-10-01T10:00:00",
    updated_at: "2023-10-01T10:00:00"
  },
  // 他の通知も同様に追加
];
```
#### 課題のJavaScriptオブジェクト
課題データを保存するオブジェクトストア
使用ユーザーのデータのみを保存する
```javascript
const assignments = [
    {
        assignment_id: 1,
        class_id: 101,
        title: "Math Assignment",
        description: "Solve the problems on page 10.",
        due_date: "2023-10-10",
        status: "Not Submitted",
        created_at: "2023-10-01T10:00:00",
        updated_at: "2023-10-01T10:00:00"
    },
    // 他の課題も同様に追加
];
```
#### カテゴリーのJavaScriptオブジェクト
カテゴリーデータを保存するオブジェクトストア
すべでのカテゴリーを保存する
```javascript
const categories = [
    {
        category_id: 1,
        name: "Math",
        description: "Mathematics",
        created_at: "2023-10-01T10:00:00",
        updated_at: "2023-10-01T10:00:00"
    },
    // 他のカテゴリーも同様に追加
];
```

#### 成績のJavaScriptオブジェクト
成績データを保存するオブジェクトストア
一旦はユーザーのデータのみを保存する
```javascript
const grades = [
    {
        grade_id: 1,
        user_id: 1,
        class_id: 101,
        grade: "A",
        comments: "Excellent performance",
        created_at: "2023-10-01T10:00:00",
        updated_at: "2023-10-01T10:00:00"
    },
    // 他の成績も同様に追加
];
```
#### 授業のJavaScriptオブジェクト
授業データを保存するオブジェクトストア
一旦はユーザーのデータのみを保存する
```javascript
const classes = [
    {
        class_id: 101,
        title: "Math Class",
        description: "Algebra and Geometry",
        URL: "https://example.com/math-class",
        instructor_id: 201,
        semester: "Fall 2023",
        date: "2023-10-01",
        start_time: "10:00:00",
        end_time: "12:00:00",
        location: "Room 101",
        created_at: "2023-09-01T10:00:00",
        updated_at: "2023-09-01T10:00:00",
        university: "Example University"
    },
    // 他の授業も同様に追加
];
``` 

#### 過去問のJavaScriptオブジェクト
過去問データを保存するオブジェクトストア
微妙
```javascript
const past_exams = [
    {
        past_exam_id: 1,
        class_id: 101,
        title: "Math Exam",
        tags: "Algebra, Geometry",
        image_url: "https://example.com/math-exam.jpg",
        created_at: "2023-10-01T10:00:00",
        updated_at: "2023-10-01T10:00:00"
    },
    // 他の過去問も同様に追加
];
```


#### コメントのJavaScriptオブジェクト
コメントデータを保存するオブジェクトストア
わからん
```javascript
const comments = [
    {
        comment_id: 1,
        user_id: 1,
        target_type: "class",
        target_id: 101,
        content: "This class is very interesting.",
        created_at: "2023-10-01T10:00:00",
        updated_at: "2023-10-01T10:00:00"
    },
    // 他のコメントも同様に追加
];
```


