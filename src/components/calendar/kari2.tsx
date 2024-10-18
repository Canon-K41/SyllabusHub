import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Component() {
  const days = ["月", "火", "水", "木", "金"]
  const timeSlots = ["1限 (9:00-10:30)", "2限 (10:40-12:10)", "3限 (13:00-14:30)", "4限 (14:40-16:10)", "5限 (16:20-17:50)"]
  
  const schedule = {
    "月": ["数学", "英語", "", "物理", ""],
    "火": ["歴史", "", "化学", "文学", ""],
    "水": ["", "経済学", "プログラミング", "", "統計学"],
    "木": ["社会学", "", "", "心理学", ""],
    "金": ["生物学", "哲学", "", "", "体育"]
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">大学時間割</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/6">時間</TableHead>
            {days.map((day) => (
              <TableHead key={day} className="w-1/6 text-center">{day}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {timeSlots.map((timeSlot, index) => (
            <TableRow key={timeSlot}>
              <TableCell className="font-medium">{timeSlot}</TableCell>
              {days.map((day) => (
                <TableCell key={`${day}-${index}`} className="text-center">
                  {schedule[day][index]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
