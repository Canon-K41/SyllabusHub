export const gradeToGPA: { [key: string]: number } = {
  'Ｓ': 4.0,
  'Ａ': 3.0,
  'Ｂ': 2.0,
  'Ｃ': 1.0,
  'Ｆ': 0.0,
  'Ｒ': 0.0,
  'Ｗ': 0.0,
  '?': 0.0,
};

export const gradeColors: { [key: string]: { bg: string, text: string } } = {
  'Ｓ': { bg: '#FFE5CC', text: '#FF8C00' },
  'Ａ': { bg: '#E5F9E5', text: '#00FF00' },
  'Ｂ': { bg: '#E5F2FF', text: '#0000FF' },
  'Ｃ': { bg: '#F2E5F2', text: '#800080' },
  'Ｆ': { bg: '#FFE5E5', text: '#FF0000' },
  'Ｒ': { bg: '#FAEBD7', text: '#FFD700' },
  'Ｗ': { bg: '#F2F2F2', text: '#808080' },
  '?': { bg: '#F2F2F2', text: '#808080' },
  null: { bg: '#F2F2F2', text: '#808080' }
};

export const statusColors = {
  '履修取消': '#FFA500',
  '履修中': '#4169E1',
  '単位修得済': '#32CD32',
  '単位未修得': '#FF0000',
};


export const COLORS = ['#FFA500', '#32CD32', '#1E90FF', '#9370DB', '#FF4500', '#FFD700', '#A9A9A9'];
