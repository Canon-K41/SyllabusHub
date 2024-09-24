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
    allDay: boolean,
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

### 予定テーブル
| カラム名       | データ型       | 説明             |
| -------------- | -------------- | ---------------- |
| schedule_id    | INT            | 主キー           |
| user_id        | INT            | 外部キー (ユーザーID) |
| title          | VARCHAR(255)   | タイトル         |
| content        | TEXT           | 内容             |
| start_time     | TIMESTAMP      | 開始時間         |
| end_time       | TIMESTAMP      | 終了時間         |
| created_at     | TIMESTAMP      | 作成日時         |
| updated_at     | TIMESTAMP      | 更新日時         |
| date           | DATE           | 日付             |

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
