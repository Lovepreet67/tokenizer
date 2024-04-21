const COLORS = {
  primaryBlack: '#000',
  secondaryBlack: '#222',
  green: '#00ff00',
  blue: '#93DEFF',
  red: '#f00',
  offWhite: '#F5F5F5',
  error: '#FF6347',
  primaryGrey: '#777',
  getRandomColor: () => {
    const colors = [
      'hsl(0, 70%, 70%)',
      'hsl(30, 70%, 70%)',
      'hsl(60, 70%, 70%)',
      'hsl(90, 70%, 70%)',
      'hsl(120, 70%, 70%)',
      'hsl(150, 70%, 70%)',
      'hsl(180, 70%, 70%)',
      'hsl(210, 70%, 70%)',
      'hsl(240, 70%, 70%)',
      'hsl(270, 70%, 70%)',
      'hsl(300, 70%, 70%)',
      'hsl(330, 70%, 70%)',
    ];

    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  },
};

export {COLORS};
