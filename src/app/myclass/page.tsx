'use client';
import ClassesTable from "@/ui/myclass/ClassesTable";
import HomeworkList from "@/ui/home/HomeworkList";

export default function MyClassPage() {
  const homework = [
        {
            "href": "https://moodle.s.kyushu-u.ac.jp/mod/quiz/view.php?id=1382470",
            "classInfo": "2024年度後期・月(3,4)木(3,4)・電気情報工学基礎実験（佐々　滉太）",
            "homeworkTitle": "[テーマ1]小テスト(3組)(10月17日)",
            "deadline": "2024年 10月 17日 17:00 "
        },
        {
            "href": "https://moodle.s.kyushu-u.ac.jp/mod/quiz/view.php?id=1380964",
            "classInfo": "2024年度後期・火2・応用確率論（白井　朋之）",
            "homeworkTitle": "小テストQuiz B",
            "deadline": "2024年 10月 18日 00:00 "
        },
        {
            "href": "https://moodle.s.kyushu-u.ac.jp/mod/assign/view.php?id=1396145",
            "classInfo": "2024年度秋学期・水3金4・電磁気学Ⅰ（EC）（木山　治樹）",
            "homeworkTitle": "第4回レポート課題提出",
            "deadline": "2024年 10月 18日 00:00 "
        },
        {
            "href": "https://moodle.s.kyushu-u.ac.jp/mod/quiz/view.php?id=1368741",
            "classInfo": "2024年度秋学期・火3金1・プログラミング演習Ⅱ（興　雄司）",
            "homeworkTitle": "数・変数・関数  小テスト (第４回) ",
            "deadline": "2024年 10月 18日 13:45 "
        },
        {
            "href": "https://moodle.s.kyushu-u.ac.jp/mod/quiz/view.php?id=1382471",
            "classInfo": "2024年度後期・月(3,4)木(3,4)・電気情報工学基礎実験（佐々　滉太）",
            "homeworkTitle": "[テーマ1]小テスト(4組)(10月21日)",
            "deadline": "2024年 10月 21日 17:00 "
        }
  ];
  return (
    <>
      <HomeworkList homework={homework} />
      <ClassesTable />
    </>
  );
}
