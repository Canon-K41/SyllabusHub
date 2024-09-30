# データの型やDBの設計についてのメモ

## カレンダーに渡すデータ
- カレンダーに渡すデータは以下のような形式であること
```typescript
events: [
  {
    id: string,
    title: string,
    start: string, //(20[2-9][0-9]|2100)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])
    end: string, //(20[2-9][0-9]|2100)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])
    url: string,
    extendedProps: {
      description: string,
      place: string, 
    }
  }
]
```
## 3. データベース設計
成績テーブルを授業とユーザーの中間テーブルとしても設計するか、それともそれぞれ独立したテーブルとして設計するか検討する必要がある。
ChashAPIに画像データを保存させるためならURLではなく画像データを保存する必要がある。
画像はservise workerでキャッシュするため
Indexを設定することで検索速度を向上させることができる。
開始日時は`(20[2-9][0-9]|2100)-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])`
![imae01]:(./test.png)

### ユーザーテーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| user_id        | INT            | 主キー           |
| email          | VARCHAR(255)   | メールアドレス (一意制約) |
| password_hash  | VARCHAR(255)   | パスワードハッシュ|
| username       | VARCHAR(100)   | ユーザー名 (一意制約) |
| role           | VARCHAR(50)    | ロール           |
| university_id  | INT            | 外部キー (大学ID) |
| profile_image  | VARCHAR(255)   | プロフィール画像URL |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 大学テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| university_id  | INT            | 主キー           |
| name           | VARCHAR(255)   | 大学名           |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### 授業テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| class_id       | INT            | 主キー           |
| title          | VARCHAR(255)   | 授業タイトル     |
| instructor_id  | INT            | 外部キー (担当員ID) |
| university_id  | INT            | 外部キー (大学ID) |
| description    | TEXT           | 授業の説明       |
| URL            | VARCHAR(255)   | 授業のURL        |
| start             | VARCHAR(64)      | 開始日時                 |
| end               | VARCHAR(64) | 終了日時                 |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

### ユーザーと授業の中間テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| user_id        | INT            | 外部キー (ユーザーID) |
| class_id       | INT            | 外部キー (授業ID) |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |

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


### 過去問テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| past_exam_id   | INT            | 主キー           |
| class_id       | INT            | 外部キー (授業ID) |
| title          | VARCHAR(255)   | タイトル         |
| yaer           | INT            | 年度             |
| semester       | VARCHAR(50)    | 学期             |
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

## serviseWokerの設計
### serviseWokerで保存するデータ
- **静的リソース**:
  - HTMLファイル
  - CSSファイル
  - JavaScriptファイル
  - 画像ファイル
  - フォントファイル
- **用途**:
  - オフライン時にアプリが動作するようにするため。

### キャッシュの設計
静的ファイルや静的

## IndexedDBの設計
データは基本IndexedDBに保存してIndexedDB経由でページに表示する。
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
#### calendarSettingsストア
主キーはkey
```json
{ key: 'slotDuration', value: 00:30:00},
{ key: 'slotLabelInterval', value: 00:01:00},
{ key: 'slotMinTime', value: '09:00:00' },
{ key: 'slotMaxTime', value: '21:00:00' },
```
#### eventsストア
主キーはid
id = Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
```json
{
    id: 'm1n3jmm8491nl',
    title: '授業1', 
    start: '2021-09-01T09:00:00', 
    end:'2021-09-01T10:30:00', 
    url: 'https://example.com', 
    extendedProps: {description: '授業1の説明', place: '教室1'} 
},
                                .
                                .
                                .
```
#### classesストア
主キーはclass_id
```json
{
    class_id: 1, 
    title: '授業1', 
    instructor: 'bom', 
    university: 'Kyush', 
    description: '授業1の説明', 
    url: 'https://example.com', 
    start: '2021-09-01T09:00:00', 
    end: '2021-09-01T10:30:00', 
    rrule: {
             freq: 'weekly', 
            interval: 1, 
            count: 12,
            byweekday: [1, 3, 5], 
            dtstart: '2021-09-01T09:00:00', 
            until: '2021-12-31T09:00:00', 
            exdata: ['ex1', 'ex2']
            }
},
                                .
                                .
                                .
 


